import { NextResponse } from "next/server";
import { z } from "zod";
import { currentUserId } from "@/auth";
import { readJsonBody, tooManyRequests, unauthorized } from "@/lib/server/http";
import { rateLimit } from "@/lib/server/rateLimit";
import { getPrisma } from "@/lib/server/db";
import { nextRankInfo, rankLabel } from "@/lib/server/ranks";
import { getCanonicalSlugs, getStoryMetaMap } from "@/lib/server/storyContent";
import { ACHIEVEMENT_CATALOG } from "@/lib/server/achievementCatalog";
import { assertNoRestriccion } from "@/lib/server/restrictions";

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
          themePreference: true,
          avatar: { select: { id: true, slug: true, characterName: true, style: true, imageUrl: true } }
        }
      },
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
    // Barra de progreso de logros (los placeholders decorativos NO cuentan).
    logrosDesbloqueados: logros.length,
    logrosTotales: ACHIEVEMENT_CATALOG.length,
    lecturas: progresos
  });
}

const patchSchema = z.object({
  nombre: z.string().trim().max(60).nullish(),
  apellidoPaterno: z.string().trim().max(60).nullish(),
  apellidoMaterno: z.string().trim().max(60).nullish(),
  /** Fecha completa (ISO); la edad se deriva, nunca se guarda como número. */
  fechaNacimiento: z.string().date().nullish(),
  pais: z.string().trim().max(60).nullish(),
  ciudad: z.string().trim().max(80).nullish(),
  comuna: z.string().trim().max(80).nullish()
});

/** Actualiza los datos personales OPCIONALES y PRIVADOS (Parte 2, sección 2). */
export async function PATCH(request: Request) {
  const userId = await currentUserId();
  if (!userId) {
    return unauthorized();
  }

  const limited = await rateLimit("profile-patch", userId, 20, 600);
  if (!limited.allowed) {
    return tooManyRequests();
  }

  const restriction = await assertNoRestriccion(userId, "accion");
  if (restriction) {
    return restriction;
  }

  const body = await readJsonBody(request, 8 * 1024);
  if (!body.ok) {
    return body.response;
  }
  const parsed = patchSchema.safeParse(body.body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
  }

  const data = parsed.data;
  const prisma = getPrisma();
  await prisma.userProfile.update({
    where: { userId },
    data: {
      ...(data.nombre !== undefined && { nombre: data.nombre }),
      ...(data.apellidoPaterno !== undefined && { apellidoPaterno: data.apellidoPaterno }),
      ...(data.apellidoMaterno !== undefined && { apellidoMaterno: data.apellidoMaterno }),
      ...(data.fechaNacimiento !== undefined && {
        fechaNacimiento: data.fechaNacimiento ? new Date(data.fechaNacimiento) : null
      }),
      ...(data.pais !== undefined && { pais: data.pais }),
      ...(data.ciudad !== undefined && { ciudad: data.ciudad }),
      ...(data.comuna !== undefined && { comuna: data.comuna })
    }
  });

  return NextResponse.json({ ok: true });
}
