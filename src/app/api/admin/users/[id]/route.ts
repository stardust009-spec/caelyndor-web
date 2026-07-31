import { NextResponse } from "next/server";
import { AdminAccessAction } from "@/generated/prisma/client";
import { logAdminAccess, requireAdminApi } from "@/lib/server/adminGuard";
import { getPrisma } from "@/lib/server/db";
import { rankLabel } from "@/lib/server/ranks";
import { restriccionVigente } from "@/lib/server/adminModeration";

export const dynamic = "force-dynamic";

/**
 * Detalle de usuario (Parte 3, sección 7.2). Registra AdminAccessLog en CADA
 * apertura, aunque sea el mismo usuario dos veces en la misma sesión.
 * Nunca expone: passwordHash, totpSecret, tokens de sesión.
 */
export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const guard = await requireAdminApi();
  if (!guard.ok) {
    return guard.response;
  }

  const { id } = await params;
  const prisma = getPrisma();
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      displayName: true,
      createdAt: true,
      currentRank: true,
      role: true,
      sendaPrincipal: true,
      sendasCercanas: true,
      habilidadUnica: { select: { nombre: true, rareza: true } },
      profile: {
        select: {
          alias: true,
          nombre: true,
          apellidoPaterno: true,
          apellidoMaterno: true,
          fechaNacimiento: true,
          pais: true,
          ciudad: true,
          comuna: true,
          avatar: { select: { slug: true, characterName: true, imageUrl: true } }
        }
      },
      sendaTest: { select: { sendaPrincipalResultado: true, eligioManual: true, completedAt: true } },
      progresos: {
        select: { storySlug: true, highestProgress: true, completedAt: true, rereadCount: true },
        orderBy: { updatedAt: "desc" }
      },
      logros: { select: { achievementId: true, unlockedAt: true } },
      restricciones: {
        orderBy: { appliedAt: "desc" },
        select: { id: true, type: true, active: true, reason: true, expiresAt: true, appliedAt: true, liftedAt: true }
      },
      sesiones: {
        where: { revokedAt: null },
        // Existencia de sesiones para soporte — nunca los tokens (7.3).
        select: { deviceLabel: true, lastActiveAt: true }
      }
    }
  });

  if (!user) {
    return NextResponse.json({ error: "Usuario inexistente" }, { status: 404 });
  }

  await logAdminAccess(AdminAccessAction.VIEW_PROFILE, guard.admin.userId, id);

  return NextResponse.json({
    usuario: {
      ...user,
      rango: rankLabel(user.currentRank),
      restricciones: user.restricciones.map((restriction) => ({
        ...restriction,
        vigente: restriccionVigente(restriction)
      }))
    }
  });
}
