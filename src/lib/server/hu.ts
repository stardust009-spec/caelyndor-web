import "server-only";
import { RarezaHu, type HabilidadUnica, type Prisma } from "@/generated/prisma/client";
import { getPrisma, TX_OPTIONS } from "./db";
import { HU_UNLOCK_THRESHOLD } from "./ranks";
import { getStoryMetaMap } from "./storyContent";
import { evaluateAchievements } from "./achievements";

/** Peso de aparición por rareza en la Prueba del Aura Interna. */
const RARITY_WEIGHT: Record<RarezaHu, number> = {
  [RarezaHu.COMUN]: 8,
  [RarezaHu.INFRECUENTE]: 4,
  [RarezaHu.RARA]: 2,
  [RarezaHu.SINGULAR]: 1
};

export type HuOfferView = {
  opciones: Pick<HabilidadUnica, "id" | "nombre" | "descripcion" | "rareza">[];
};

export type HuOfferOutcome =
  | { ok: true; oferta: HuOfferView; yaElegida: false }
  | { ok: true; elegida: Pick<HabilidadUnica, "id" | "nombre" | "descripcion" | "rareza">; yaElegida: true }
  | { ok: false; error: "locked" | "no_senda" | "empty_catalog" };

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
 * para poder refinar la "compatibilidad" después sin tocar el resto.
 * Fase 1: pool por afinidad de Senda (principal > cercanas > resto) +
 * aleatoriedad ponderada por rareza. La oferta se PERSISTE (OfertaHu) para
 * que sea estable entre requests y para que /api/hu/choose pueda validar.
 */
export async function calcularHUCompatibles(userId: string): Promise<HuOfferOutcome> {
  const prisma = getPrisma();

  return prisma.$transaction(async (tx) => {
    const user = await tx.user.findUniqueOrThrow({
      where: { id: userId },
      select: { sendaPrincipal: true, sendasCercanas: true, habilidadUnica: true }
    });

    if (user.habilidadUnica) {
      const { id, nombre, descripcion, rareza } = user.habilidadUnica;
      return { ok: true as const, elegida: { id, nombre, descripcion, rareza }, yaElegida: true as const };
    }

    const completed = await canonicalCompletedCount(tx, userId);
    if (completed < HU_UNLOCK_THRESHOLD) {
      return { ok: false as const, error: "locked" as const };
    }
    if (!user.sendaPrincipal) {
      return { ok: false as const, error: "no_senda" as const };
    }

    // Oferta ya generada: se devuelve tal cual (estable e idempotente).
    const existingOffer = await tx.ofertaHu.findUnique({ where: { userId } });
    if (existingOffer) {
      const opciones = await tx.habilidadUnica.findMany({
        where: { id: { in: existingOffer.opciones } },
        select: { id: true, nombre: true, descripcion: true, rareza: true }
      });
      return { ok: true as const, oferta: { opciones }, yaElegida: false as const };
    }

    const afinesPrincipal = await tx.habilidadUnica.findMany({
      where: { sendasAfines: { has: user.sendaPrincipal } }
    });
    const afinesCercanas = await tx.habilidadUnica.findMany({
      where: {
        sendasAfines: { hasSome: user.sendasCercanas },
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
    if (opciones.length === 0) {
      return { ok: false as const, error: "empty_catalog" as const };
    }

    await tx.ofertaHu.create({
      data: { userId, opciones: opciones.map((hu) => hu.id) }
    });

    return {
      ok: true as const,
      oferta: {
        opciones: opciones.map(({ id, nombre, descripcion, rareza }) => ({ id, nombre, descripcion, rareza }))
      },
      yaElegida: false as const
    };
  }, TX_OPTIONS);
}

export type HuChooseOutcome =
  | { ok: true; elegida: Pick<HabilidadUnica, "id" | "nombre" | "descripcion" | "rareza"> }
  | { ok: false; error: "no_offer" | "not_in_offer" | "already_chosen" };

/** Elección única de HU: valida contra la oferta persistida y fija una sola vez. */
export async function chooseHu(userId: string, huId: string): Promise<HuChooseOutcome> {
  const prisma = getPrisma();

  return prisma.$transaction(async (tx) => {
    const offer = await tx.ofertaHu.findUnique({ where: { userId } });
    if (!offer) {
      return { ok: false as const, error: "no_offer" as const };
    }
    if (!offer.opciones.includes(huId)) {
      return { ok: false as const, error: "not_in_offer" as const };
    }

    // updateMany condicional: si otro request ya eligió, count = 0.
    const updated = await tx.user.updateMany({
      where: { id: userId, habilidadUnicaId: null },
      data: { habilidadUnicaId: huId, habilidadUnicaElegidaEn: new Date() }
    });
    if (updated.count === 0) {
      return { ok: false as const, error: "already_chosen" as const };
    }

    await evaluateAchievements(tx, userId);

    const hu = await tx.habilidadUnica.findUniqueOrThrow({
      where: { id: huId },
      select: { id: true, nombre: true, descripcion: true, rareza: true }
    });
    return { ok: true as const, elegida: hu };
  }, TX_OPTIONS);
}
