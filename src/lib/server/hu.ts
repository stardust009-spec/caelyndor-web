import "server-only";
import { type HabilidadUnica, type Prisma } from "@/generated/prisma/client";
import { getPrisma, TX_OPTIONS } from "./db";
import { HU_UNLOCK_THRESHOLD } from "./ranks";
import { getStoryMetaMap } from "./storyContent";
import { evaluateAchievements } from "./achievements";

export type HuView = Pick<HabilidadUnica, "id" | "nombre" | "descripcion" | "rareza">;

async function canonicalCompletedCount(tx: Prisma.TransactionClient, userId: string): Promise<number> {
  const historias = getStoryMetaMap();
  const rows = await tx.storyProgress.findMany({
    where: { userId, completedAt: { not: null } },
    select: { storySlug: true }
  });
  return rows.filter((row) => historias.get(row.storySlug)?.canonical).length;
}

/** Muestreo uniforme sin reemplazo (Fisher-Yates parcial). */
function uniformSample<T>(pool: T[], count: number): T[] {
  const arr = [...pool];
  const n = Math.min(count, arr.length);
  for (let i = 0; i < n; i += 1) {
    const j = i + Math.floor(Math.random() * (arr.length - i));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.slice(0, n);
}

/**
 * sortearOfertaHU: sorteo probabilístico PLANO de 3 HU entre las 77 del
 * catálogo, sin ningún filtro ni ponderación — ni por Senda ni por rareza.
 * Confirmado contra el tratado canónico: la HU se despierta sin atarse a
 * ningún elemento, así que quien tenga afinidad Llama tiene exactamente la
 * misma chance de sacar cualquiera de las 77 que quien tenga afinidad Aire.
 * Persiste las 3 en OfertaHu (trazabilidad de qué ofreció el sistema); NO asigna.
 */
async function sortearOfertaHU(
  tx: Prisma.TransactionClient,
  userId: string
): Promise<HabilidadUnica[]> {
  const existingOffer = await tx.ofertaHu.findUnique({ where: { userId } });
  if (existingOffer) {
    return tx.habilidadUnica.findMany({ where: { id: { in: existingOffer.opciones } } });
  }

  const catalogo = await tx.habilidadUnica.findMany();
  const opciones = uniformSample(catalogo, 3);

  if (opciones.length > 0) {
    await tx.ofertaHu.create({ data: { userId, opciones: opciones.map((hu) => hu.id) } });
  }
  return opciones;
}

export type HuRevealOutcome =
  | { ok: true; habilidad: HuView; nuevaRevelacion: boolean }
  | { ok: false; error: "locked" | "no_senda" | "empty_catalog" };

/**
 * Prueba del Aura Interna (mecánica corregida): la HU NO la elige el usuario.
 * En un único request se calculan las 3 compatibles, se persisten en OfertaHu
 * (trazabilidad de qué ofreció el sistema), se SORTEA una y se asigna directo.
 * El usuario la recibe como revelación. Idempotente: si ya tiene HU, se
 * devuelve la existente sin sortear de nuevo.
 */
export async function revealHu(userId: string): Promise<HuRevealOutcome> {
  const prisma = getPrisma();

  return prisma.$transaction(async (tx) => {
    const user = await tx.user.findUniqueOrThrow({
      where: { id: userId },
      select: { sendaPrincipal: true, habilidadUnica: true }
    });

    if (user.habilidadUnica) {
      const { id, nombre, descripcion, rareza } = user.habilidadUnica;
      return {
        ok: true as const,
        habilidad: { id, nombre, descripcion, rareza },
        nuevaRevelacion: false
      };
    }

    const completed = await canonicalCompletedCount(tx, userId);
    if (completed < HU_UNLOCK_THRESHOLD) {
      return { ok: false as const, error: "locked" as const };
    }
    // Requisito narrativo del flujo (no de la mecánica): el Ritual de Afinación
    // debe haberse completado antes de despertar la HU. El sorteo en sí ya no
    // depende de la Senda.
    if (!user.sendaPrincipal) {
      return { ok: false as const, error: "no_senda" as const };
    }

    const opciones = await sortearOfertaHU(tx, userId);
    if (opciones.length === 0) {
      return { ok: false as const, error: "empty_catalog" as const };
    }

    // Sorteo uniforme final entre las 3 opciones ofrecidas.
    const sorteada = opciones[Math.floor(Math.random() * opciones.length)];

    // updateMany condicional: si otro request reveló primero, respetamos esa.
    const updated = await tx.user.updateMany({
      where: { id: userId, habilidadUnicaId: null },
      data: { habilidadUnicaId: sorteada.id, habilidadUnicaElegidaEn: new Date() }
    });
    if (updated.count === 0) {
      const winner = await tx.user.findUniqueOrThrow({
        where: { id: userId },
        select: { habilidadUnica: true }
      });
      const hu = winner.habilidadUnica!;
      return {
        ok: true as const,
        habilidad: { id: hu.id, nombre: hu.nombre, descripcion: hu.descripcion, rareza: hu.rareza },
        nuevaRevelacion: false
      };
    }

    await evaluateAchievements(tx, userId);

    return {
      ok: true as const,
      habilidad: {
        id: sorteada.id,
        nombre: sorteada.nombre,
        descripcion: sorteada.descripcion,
        rareza: sorteada.rareza
      },
      nuevaRevelacion: true
    };
  }, TX_OPTIONS);
}
