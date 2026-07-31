import "server-only";
import { RarezaHu, type HabilidadUnica, type Prisma } from "@/generated/prisma/client";
import { getPrisma, TX_OPTIONS } from "./db";
import { HU_UNLOCK_THRESHOLD } from "./ranks";
import { getStoryMetaMap } from "./storyContent";
import { evaluateAchievements } from "./achievements";

/**
 * Peso de aparición por rareza. NO es un detalle de implementación ajustable
 * a gusto: sostiene una regla del canon. El tratado del sistema de Aura
 * (Sección IV) establece que las Habilidades Legendarias son "extremadamente
 * raras" y que "se registran menos de cinco por generación".
 *
 * Con un sorteo uniforme entre las 77, una Legendaria saldría tan seguido
 * como una Común y esa rareza narrativa se evaporaría a medida que crezca la
 * base de lectores. Si alguien vuelve a este archivo pensando en
 * "simplificarlo" a uniforme: eso ya se probó y se revirtió a propósito.
 *
 * Lo que sí es deliberadamente plano es la Senda: el elemento del usuario no
 * influye en absoluto en qué HU puede tocarle (ver sortearOfertaHU).
 */
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

/** Muestreo sin reemplazo ponderado por rareza (ver RARITY_WEIGHT). */
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
 * sortearOfertaHU: compone la oferta de 3 HU sobre el catálogo COMPLETO de 77.
 *
 * Dos reglas distintas conviven aquí, y conviene no confundirlas:
 *  - Senda: NO interviene. La HU se despierta sin atarse a ningún elemento,
 *    así que quien tenga afinidad Llama tiene exactamente las mismas
 *    probabilidades que quien tenga afinidad Aire. No hay filtro ni pool por
 *    Senda; `sendasAfines` sobrevive solo como metadata de lore.
 *  - Rareza: SÍ interviene, vía RARITY_WEIGHT, porque el canon exige que las
 *    Legendarias sean excepcionales (ver el comentario de esa constante).
 *
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
  const opciones = weightedSample(catalogo, 3);

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

    // Sorteo final uniforme entre las 3 ofrecidas: el peso por rareza ya
    // actuó al componer la oferta, así que la rareza efectiva de lo asignado
    // la hereda de ahí; este último paso es puro azar del destino.
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
