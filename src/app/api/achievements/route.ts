import { NextResponse } from "next/server";
import { currentUserId } from "@/auth";
import { getPrisma } from "@/lib/server/db";
import { ACHIEVEMENT_CATALOG } from "@/lib/server/achievementCatalog";

export const dynamic = "force-dynamic";

/**
 * Catálogo de logros + estado de desbloqueo del usuario actual.
 * Sin sesión devuelve solo el catálogo (estado null).
 */
export async function GET() {
  const userId = await currentUserId();

  const unlockedBySlug = new Map<string, Date>();
  if (userId) {
    const rows = await getPrisma().userAchievement.findMany({
      where: { userId },
      select: { achievementId: true, unlockedAt: true }
    });
    for (const row of rows) {
      unlockedBySlug.set(row.achievementId, row.unlockedAt);
    }
  }

  return NextResponse.json({
    logros: ACHIEVEMENT_CATALOG.map((logro) => ({
      slug: logro.slug,
      title: logro.title,
      description: logro.description,
      category: logro.category,
      estado: userId
        ? {
            desbloqueado: unlockedBySlug.has(logro.slug),
            unlockedAt: unlockedBySlug.get(logro.slug) ?? null
          }
        : null
    }))
  });
}
