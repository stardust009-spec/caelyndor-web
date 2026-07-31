import { NextResponse } from "next/server";
import { currentUserId } from "@/auth";
import { unauthorized } from "@/lib/server/http";
import { getPrisma } from "@/lib/server/db";
import { nextRankInfo, rankLabel } from "@/lib/server/ranks";
import { getCanonicalSlugs, getStoryMetaMap } from "@/lib/server/storyContent";

export const dynamic = "force-dynamic";

export async function GET() {
  const userId = await currentUserId();
  if (!userId) {
    return unauthorized();
  }

  const prisma = getPrisma();
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      displayName: true,
      createdAt: true,
      currentRank: true,
      sendaPrincipal: true,
      sendasCercanas: true,
      habilidadUnica: { select: { id: true, nombre: true, descripcion: true, rareza: true } },
      habilidadUnicaElegidaEn: true,
      logros: { select: { achievementId: true, unlockedAt: true } },
      progresos: {
        where: { completedAt: { not: null } },
        select: { storySlug: true, completedAt: true, rereadCount: true }
      }
    }
  });

  if (!user) {
    return unauthorized();
  }

  const historias = getStoryMetaMap();
  const completadosCanonicos = user.progresos.filter(
    (progreso) => historias.get(progreso.storySlug)?.canonical
  ).length;

  const { logros, progresos, ...rest } = user;
  return NextResponse.json({
    ...rest,
    rankLabel: rankLabel(user.currentRank),
    relatosCompletados: completadosCanonicos,
    relatosCanonicosDisponibles: getCanonicalSlugs().size,
    proximoRango: nextRankInfo(completadosCanonicos),
    logros,
    lecturas: progresos
  });
}
