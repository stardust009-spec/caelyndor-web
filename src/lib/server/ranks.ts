import { RangoAura } from "@/generated/prisma/client";

/**
 * Tabla autoritativa de rangos según relatos canónicos distintos completados.
 * "Cronista de Caelyndor" no es un rango: es el logro dinámico
 * cronista-de-caelyndor (todos los canónicos disponibles en cada momento).
 */
export const RANK_THRESHOLDS: ReadonlyArray<{ min: number; rank: RangoAura; label: string }> = [
  { min: 100, rank: RangoAura.MAESTRO_DEL_AURA, label: "Maestro del Aura" },
  { min: 50, rank: RangoAura.MAESTRIA_AVANZADA, label: "Maestría avanzada" },
  { min: 25, rank: RangoAura.SEGUNDA_ESPECIALIZACION, label: "Segunda Especialización" },
  { min: 5, rank: RangoAura.PRIMERA_ESPECIALIZACION, label: "Primera Especialización" },
  { min: 1, rank: RangoAura.NOVATO_DEL_AURA, label: "Novato del Aura" },
  { min: 0, rank: RangoAura.AURA_LATENTE, label: "Aura Latente" }
];

export function computeRank(completedCanonical: number): RangoAura {
  for (const tier of RANK_THRESHOLDS) {
    if (completedCanonical >= tier.min) {
      return tier.rank;
    }
  }
  return RangoAura.AURA_LATENTE;
}

export function rankLabel(rank: RangoAura): string {
  return RANK_THRESHOLDS.find((tier) => tier.rank === rank)?.label ?? rank;
}

/** Próximo rango y cuántos relatos faltan (null si ya es el máximo). */
export function nextRankInfo(completedCanonical: number): {
  rank: RangoAura;
  label: string;
  needed: number;
  current: number;
} | null {
  const next = [...RANK_THRESHOLDS]
    .reverse()
    .find((tier) => tier.min > completedCanonical);
  if (!next) {
    return null;
  }
  return { rank: next.rank, label: next.label, needed: next.min, current: completedCanonical };
}

/** Umbral para el despertar de la Habilidad Única. */
export const HU_UNLOCK_THRESHOLD = 25;
/** Umbral para desbloquear el Ritual de Afinación (test de Senda). */
export const SENDA_TEST_UNLOCK_THRESHOLD = 1;
