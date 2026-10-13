import "server-only";
import type { Prisma, RangoAura } from "@/generated/prisma/client";
import { getPrisma, TX_OPTIONS } from "./db";
import { SENDA_TEST_UNLOCK_THRESHOLD, computeRank, nextRankInfo, rankLabel } from "./ranks";
import { getStoryMetaMap, getStoryReadingMinutes } from "./storyContent";
import { evaluateAchievements } from "./achievements";
import { ACHIEVEMENT_CATALOG } from "./achievementCatalog";
import { otorgarExp, sincronizarExpLecturas } from "./exp";
import { EXP_POR, nivelDeExp } from "./niveles";
import { obraTieneQuiz } from "./quiz/servicio";
import { COMPLETION_THRESHOLD, evaluateReading } from "./readingValidation";

export { COMPLETION_THRESHOLD };
/** Con el relato ya completado, volver por debajo de esto arma una relectura. */
const REREAD_RESET_THRESHOLD = 5;

export type ProgressUpdateResult = {
  storySlug: string;
  currentProgress: number;
  highestProgress: number;
  completed: boolean;
  /** true solo la primera vez que este update cruza el umbral de completado. */
  newlyCompleted: boolean;
  /** Avance suficiente pero falta tiempo de lectura: segundos para reintentar. */
  pendingSeconds: number | null;
  rank: RangoAura;
  rankLabel: string;
  /** Relatos canónicos distintos completados. */
  completedCanonicalCount: number;
  nextRank: { label: string; needed: number; current: number } | null;
  newAchievements: string[];
  /** Títulos de los logros recién desbloqueados (para el aviso del lector). */
  logrosNuevos: string[];
  /** EXP entregada por este update (0 salvo en el primer completado). */
  expGanada: number;
  /** Nivel tras este update (solo significativo si expGanada > 0). */
  nivel: number;
  subioNivel: boolean;
  /** Primer relato completado y el Ritual de Afinación aún no se hace. */
  ritualPendiente: boolean;
  /** El relato tiene Prueba del conocimiento (para enlazarla en el aviso). */
  quizDisponible: boolean;
  /** Aviso narrativo para el cliente cuando hay completado nuevo (sección 8). */
  notification: string | null;
};

async function countCompletedCanonical(tx: Prisma.TransactionClient, userId: string): Promise<number> {
  const historias = getStoryMetaMap();
  const rows = await tx.storyProgress.findMany({
    where: { userId, completedAt: { not: null } },
    select: { storySlug: true }
  });
  return rows.filter((row) => historias.get(row.storySlug)?.canonical).length;
}

/**
 * Aplica una actualización de progreso de lectura. Todas las decisiones
 * (completado, recompensa, rango, logros) se toman aquí, en servidor, dentro
 * de UNA transacción. Reintentar la misma request es inocuo:
 * - highestProgress solo sube (update condicional);
 * - el completado se fija una única vez (guard completedAt = null);
 * - la recompensa usa completionRewardClaimed como candado atómico;
 * - los logros usan unique + skipDuplicates.
 */
export async function applyProgressUpdate(
  userId: string,
  storySlug: string,
  progress: number,
  seenPercent: number
): Promise<ProgressUpdateResult> {
  const prisma = getPrisma();
  const value = Math.max(0, Math.min(100, Math.round(progress)));
  const seen = Math.max(0, Math.min(100, Math.round(seenPercent)));

  return prisma.$transaction(async (tx) => {
    const existing = await tx.storyProgress.upsert({
      where: { userId_storySlug: { userId, storySlug } },
      create: { userId, storySlug, currentProgress: value, highestProgress: value },
      update: { currentProgress: value },
      select: {
        id: true,
        createdAt: true,
        highestProgress: true,
        completedAt: true,
        completionRewardClaimed: true,
        rereadArmed: true
      }
    });

    // highestProgress nunca baja: update condicional, atómico frente a carreras.
    if (value > existing.highestProgress) {
      await tx.storyProgress.updateMany({
        where: { id: existing.id, highestProgress: { lt: value } },
        data: { highestProgress: value }
      });
    }

    // Máquina de relecturas (solo tras la primera lectura completa).
    if (existing.completedAt) {
      if (value <= REREAD_RESET_THRESHOLD && !existing.rereadArmed) {
        await tx.storyProgress.update({
          where: { id: existing.id },
          data: { rereadArmed: true }
        });
      } else if (value >= COMPLETION_THRESHOLD && existing.rereadArmed) {
        await tx.storyProgress.update({
          where: { id: existing.id },
          data: { rereadArmed: false, rereadCount: { increment: 1 } }
        });
      }
    }

    // Completado irreversible: solo cruza una vez, y solo si además del avance
    // hubo tiempo de lectura y tramos vistos (readingValidation.ts). El tiempo
    // se mide en servidor desde el primer progreso registrado del relato.
    const now = new Date();
    let newlyCompleted = false;
    let pendingSeconds: number | null = null;
    if (!existing.completedAt) {
      const verdict = evaluateReading({
        highestProgress: Math.max(existing.highestProgress, value),
        elapsedSeconds: (now.getTime() - existing.createdAt.getTime()) / 1000,
        seenPercent: seen,
        readingMinutes: getStoryReadingMinutes(storySlug)
      });
      if (verdict.met) {
        const completedNowCount = await tx.storyProgress.updateMany({
          where: { id: existing.id, completedAt: null, highestProgress: { gte: COMPLETION_THRESHOLD } },
          data: { completedAt: now }
        });
        newlyCompleted = completedNowCount.count === 1;
      } else {
        pendingSeconds = verdict.pendingSeconds === null ? null : Math.ceil(verdict.pendingSeconds);
      }
    }

    // Recompensa exactamente una vez: quien gana este updateMany la entrega.
    let newAchievements: string[] = [];
    let claimedReward = false;
    if (newlyCompleted || !existing.completionRewardClaimed) {
      const claim = await tx.storyProgress.updateMany({
        where: { id: existing.id, completedAt: { not: null }, completionRewardClaimed: false },
        data: { completionRewardClaimed: true }
      });
      claimedReward = claim.count === 1;
    }

    const completedCanonicalCount = await countCompletedCanonical(tx, userId);
    const rank = computeRank(completedCanonicalCount);

    let expGanada = 0;
    let expAntes = 0;
    let ritualPendiente = false;
    if (claimedReward) {
      // El rango es derivado: se recalcula, no se acepta desde el cliente.
      const usuario = await tx.user.update({
        where: { id: userId },
        data: { currentRank: rank },
        select: { sendaTest: { select: { id: true } } }
      });
      ritualPendiente = usuario.sendaTest === null && completedCanonicalCount >= SENDA_TEST_UNLOCK_THRESHOLD;
      if (getStoryMetaMap().get(storySlug)?.canonical) {
        expGanada = await otorgarExp(tx, userId, `lectura:${storySlug}`, EXP_POR.lectura);
      }
      // Lecturas anteriores a la EXP que aún no estaban en el libro mayor:
      // cuentan como "antes" de este relato para detectar la subida de nivel.
      await sincronizarExpLecturas(tx, userId);
      const { exp } = await tx.user.findUniqueOrThrow({ where: { id: userId }, select: { exp: true } });
      expAntes = exp - expGanada;
      newAchievements = await evaluateAchievements(tx, userId);
    }

    // Relecturas también pueden desbloquear "Oyente de ecos".
    if (!claimedReward && existing.completedAt && value >= COMPLETION_THRESHOLD && existing.rereadArmed) {
      newAchievements = await evaluateAchievements(tx, userId);
    }

    const row = await tx.storyProgress.findUniqueOrThrow({
      where: { id: existing.id },
      select: { currentProgress: true, highestProgress: true, completedAt: true }
    });

    const next = nextRankInfo(completedCanonicalCount);
    const notification =
      newlyCompleted && next
        ? `Relato completado. Su historia ha dejado una nueva resonancia en tu Aura. Progreso hacia ${next.label}: ${next.current} de ${next.needed} relatos.`
        : newlyCompleted
          ? "Relato completado. Su historia ha dejado una nueva resonancia en tu Aura."
          : null;

    return {
      storySlug,
      currentProgress: row.currentProgress,
      highestProgress: row.highestProgress,
      completed: row.completedAt !== null,
      newlyCompleted,
      pendingSeconds,
      rank,
      rankLabel: rankLabel(rank),
      completedCanonicalCount,
      nextRank: next ? { label: next.label, needed: next.needed, current: next.current } : null,
      newAchievements,
      logrosNuevos: newAchievements.map(
        (slug) => ACHIEVEMENT_CATALOG.find((logro) => logro.slug === slug)?.title ?? slug
      ),
      expGanada,
      nivel: nivelDeExp(expAntes + expGanada),
      subioNivel: expGanada > 0 && nivelDeExp(expAntes + expGanada) > nivelDeExp(expAntes),
      ritualPendiente,
      quizDisponible: newlyCompleted && obraTieneQuiz(storySlug),
      notification
    };
  }, TX_OPTIONS);
}
