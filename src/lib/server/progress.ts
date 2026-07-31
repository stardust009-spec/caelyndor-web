import "server-only";
import type { Prisma, RangoAura } from "@/generated/prisma/client";
import { getPrisma, TX_OPTIONS } from "./db";
import { computeRank, nextRankInfo, rankLabel } from "./ranks";
import { getStoryMetaMap } from "./storyContent";
import { evaluateAchievements } from "./achievements";

/** El relato se considera completado al alcanzar este highestProgress. */
export const COMPLETION_THRESHOLD = 95;
/** Con el relato ya completado, volver por debajo de esto arma una relectura. */
const REREAD_RESET_THRESHOLD = 5;

export type ProgressUpdateResult = {
  storySlug: string;
  currentProgress: number;
  highestProgress: number;
  completed: boolean;
  /** true solo la primera vez que este update cruza el umbral de completado. */
  newlyCompleted: boolean;
  rank: RangoAura;
  rankLabel: string;
  /** Relatos canónicos distintos completados. */
  completedCanonicalCount: number;
  nextRank: { label: string; needed: number; current: number } | null;
  newAchievements: string[];
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
  progress: number
): Promise<ProgressUpdateResult> {
  const prisma = getPrisma();
  const value = Math.max(0, Math.min(100, Math.round(progress)));

  return prisma.$transaction(async (tx) => {
    const existing = await tx.storyProgress.upsert({
      where: { userId_storySlug: { userId, storySlug } },
      create: { userId, storySlug, currentProgress: value, highestProgress: value },
      update: { currentProgress: value },
      select: {
        id: true,
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

    // Completado irreversible: solo cruza una vez.
    const completedNowCount = await tx.storyProgress.updateMany({
      where: { id: existing.id, completedAt: null, highestProgress: { gte: COMPLETION_THRESHOLD } },
      data: { completedAt: new Date() }
    });
    const newlyCompleted = completedNowCount.count === 1;

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

    if (claimedReward) {
      // El rango es derivado: se recalcula, no se acepta desde el cliente.
      await tx.user.update({ where: { id: userId }, data: { currentRank: rank } });
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
      rank,
      rankLabel: rankLabel(rank),
      completedCanonicalCount,
      nextRank: next ? { label: next.label, needed: next.needed, current: next.current } : null,
      newAchievements,
      notification
    };
  }, TX_OPTIONS);
}
