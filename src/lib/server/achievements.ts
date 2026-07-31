import "server-only";
import type { Prisma } from "@/generated/prisma/client";
import { ACHIEVEMENT_CATALOG, type LogroContexto } from "./achievementCatalog";
import { getStoryMetaMap } from "./storyContent";

type Tx = Prisma.TransactionClient;

/** Construye el contexto de evaluación desde la BD (nunca desde el cliente). */
export async function buildLogroContexto(tx: Tx, userId: string): Promise<LogroContexto> {
  const historias = getStoryMetaMap();

  const [progresos, user] = await Promise.all([
    tx.storyProgress.findMany({
      where: { userId, completedAt: { not: null } },
      select: { storySlug: true, rereadCount: true }
    }),
    tx.user.findUniqueOrThrow({
      where: { id: userId },
      select: { habilidadUnicaId: true, sendaTest: { select: { id: true } } }
    })
  ]);

  const completadosTodos = new Set<string>();
  const completadosCanonicos = new Set<string>();
  let relatosReleidos = 0;

  for (const progreso of progresos) {
    const meta = historias.get(progreso.storySlug);
    if (!meta) {
      // Relato retirado del contenido: la lectura completada se conserva,
      // pero no puede aportar a condiciones basadas en metadata.
      continue;
    }
    completadosTodos.add(progreso.storySlug);
    if (meta.canonical) {
      completadosCanonicos.add(progreso.storySlug);
    }
    if (progreso.rereadCount > 0) {
      relatosReleidos += 1;
    }
  }

  return {
    completadosCanonicos,
    completadosTodos,
    relatosReleidos,
    ritualCompletado: user.sendaTest !== null,
    huElegida: user.habilidadUnicaId !== null,
    historias
  };
}

/**
 * Evalúa el catálogo completo y desbloquea lo que falte. Idempotente:
 * el unique (userId, achievementId) + skipDuplicates garantizan que un
 * reintento no duplica logros. Devuelve los slugs recién desbloqueados.
 */
export async function evaluateAchievements(tx: Tx, userId: string): Promise<string[]> {
  const ctx = await buildLogroContexto(tx, userId);

  // Solo se insertan logros que existen en la BD (seed): evita fallos de FK
  // si el catálogo en código va por delante del seed desplegado.
  const seeded = new Set(
    (await tx.achievement.findMany({ select: { id: true } })).map((row) => row.id)
  );
  const owned = new Set(
    (
      await tx.userAchievement.findMany({
        where: { userId },
        select: { achievementId: true }
      })
    ).map((row) => row.achievementId)
  );

  const toUnlock = ACHIEVEMENT_CATALOG.filter(
    (logro) => seeded.has(logro.slug) && !owned.has(logro.slug) && logro.condition(ctx)
  );

  if (toUnlock.length > 0) {
    await tx.userAchievement.createMany({
      data: toUnlock.map((logro) => ({ userId, achievementId: logro.slug })),
      skipDuplicates: true
    });
  }

  return toUnlock.map((logro) => logro.slug);
}
