import "server-only";
import { RarezaHu, type HabilidadUnica, type Prisma } from "@/generated/prisma/client";
import { getPrisma, TX_OPTIONS } from "./db";
import { HU_UNLOCK_THRESHOLD } from "./ranks";
import { getStoryMetaMap } from "./storyContent";
import { evaluateAchievements } from "./achievements";

/** Peso de aparición por rareza en la Prueba del Aura Interna. */
const RARITY_WEIGHT: Record<RarezaHu, number> = {
  [RarezaHu.COMUN]: 8,
  [RarezaHu.POCO_COMUN]: 4,
  [RarezaHu.EPICA]: 2,
  [RarezaHu.LEGENDARIA]: 1
};

export type HuView = Pick<HabilidadUnica, "id" | "nombre" | "descripcion" | "rareza">;

async function canonicalCompletedCount(tx: Prisma.TransactionClient, userId: string): Promise<number> {
  const historias = getStoryMetaMap();
  const rows = await tx.storyProgress.findMany({
    where: { userId, completedAt: { not: null } },
    select: { storySlug: true }
  });
  return rows.filter((row) => historias.get(row.storySlug)?.canonical).length;
}

function weightedSample(pool: HabilidadUnica[], count: number): HabilidadUnica[] {
  const chosen: HabilidadUnica[] = [];
  const candidates = [...pool];
  while (chosen.length < count && candidates.length > 0) {
    const total = candidates.reduce((sum, hu) => sum + RARITY_WEIGHT[hu.rareza], 0);
    let roll = Math.random() * total;
    let picked = candidates.length - 1;
    for (let i = 0; i < candidates.length; i += 1) {
      roll -= RARITY_WEIGHT[candidates[i].rareza];
      if (roll <= 0) {
        picked = i;
        break;
      }
    }
    chosen.push(candidates[picked]);
    candidates.splice(picked, 1);
  }
  return chosen;
}

/**
 * calcularHUCompatibles: función aislada a propósito (sección 6 del diseño)
 * para poder refinar la "compatibilidad" sin tocar el resto. Fase 1: pool por
 * afinidad de Senda (principal > cercanas > resto) + aleatoriedad ponderada
 * por rareza. Devuelve/persiste las 3 opciones en OfertaHu; NO asigna.
 */
async function calcularHUCompatibles(
  tx: Prisma.TransactionClient,
  userId: string,
  sendaPrincipal: NonNullable<Prisma.UserGetPayload<{ select: { sendaPrincipal: true } }>["sendaPrincipal"]>,
  sendasCercanas: Prisma.UserGetPayload<{ select: { sendasCercanas: true } }>["sendasCercanas"]
): Promise<HabilidadUnica[]> {
  const existingOffer = await tx.ofertaHu.findUnique({ where: { userId } });
  if (existingOffer) {
    return tx.habilidadUnica.findMany({ where: { id: { in: existingOffer.opciones } } });
  }

  const afinesPrincipal = await tx.habilidadUnica.findMany({
    where: { sendasAfines: { has: sendaPrincipal } }
  });
  const afinesCercanas = await tx.habilidadUnica.findMany({
    where: {
      sendasAfines: { hasSome: sendasCercanas },
      id: { notIn: afinesPrincipal.map((hu) => hu.id) }
    }
  });

  // Garantiza al menos una HU afín a la Senda principal si el catálogo la tiene.
  const primary = weightedSample(afinesPrincipal, 1);
  const restPool = [
    ...afinesPrincipal.filter((hu) => !primary.some((p) => p.id === hu.id)),
    ...afinesCercanas
  ];
  const rest = weightedSample(restPool, 3 - primary.length);
  let opciones = [...primary, ...rest];

  if (opciones.length < 3) {
    const filler = await tx.habilidadUnica.findMany({
      where: { id: { notIn: opciones.map((hu) => hu.id) } }
    });
    opciones = [...opciones, ...weightedSample(filler, 3 - opciones.length)];
  }

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
      select: { sendaPrincipal: true, sendasCercanas: true, habilidadUnica: true }
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
    if (!user.sendaPrincipal) {
      return { ok: false as const, error: "no_senda" as const };
    }

    const opciones = await calcularHUCompatibles(tx, userId, user.sendaPrincipal, user.sendasCercanas);
    if (opciones.length === 0) {
      return { ok: false as const, error: "empty_catalog" as const };
    }

    // Sorteo uniforme entre las 3 compatibles (el peso por rareza ya actuó
    // al componer la oferta; el sorteo final es puro azar del destino).
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
