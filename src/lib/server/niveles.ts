/**
 * EXP y niveles (docs/aura-parte-4.md § EXP). Módulo puro: sin BD, testeable.
 *
 * Curva calibrada con el contenido real: con los 14 relatos publicados y sus
 * futuros quiz (14·20 + 14·40 = 840 EXP) se llega justo al nivel 13 (Piso 3).
 * Los Pisos 4 y 5 quedan para contenido futuro: la Torre crece con la
 * biblioteca. Hoy, solo leyendo (280 EXP), el techo es el nivel 7.
 */

/** EXP por actividad. Cambiarlos no requiere migrar: el libro mayor guarda
 *  la cantidad entregada en cada entrada. */
export const EXP_POR = {
  /** Completar un relato canónico (una vez por relato; releer da 0). */
  lectura: 20,
  /** Aprobar el quiz de un relato (fase 2). */
  quiz: 40,
  /** Aprobar el desafío de conexiones de un relato (cruza obras). */
  quizConexiones: 60,
  /** Registrar el primer libro físico (fase 4). */
  primerLibro: 100
} as const;

/** EXP acumulada necesaria para estar en el nivel n (nivel 1 = 0 EXP). */
export function expParaNivel(nivel: number): number {
  const n = Math.max(1, Math.floor(nivel)) - 1;
  return 5 * n * n + 10 * n;
}

export function nivelDeExp(exp: number): number {
  let nivel = 1;
  while (expParaNivel(nivel + 1) <= exp) {
    nivel += 1;
  }
  return nivel;
}

export type ProgresoNivel = {
  nivel: number;
  exp: number;
  /** EXP con la que empezó el nivel actual. */
  desde: number;
  /** EXP necesaria para el siguiente nivel. */
  hasta: number;
};

export function progresoNivel(exp: number): ProgresoNivel {
  const total = Math.max(0, Math.floor(exp));
  const nivel = nivelDeExp(total);
  return { nivel, exp: total, desde: expParaNivel(nivel), hasta: expParaNivel(nivel + 1) };
}

/** Pisos de la Torre de los Cronistas: uno cada cinco niveles (fase 3). */
export const PISOS = [
  { piso: 1, nombre: "Aprendices" },
  { piso: 2, nombre: "Exploradores" },
  { piso: 3, nombre: "Conocedores" },
  { piso: 4, nombre: "Investigadores" },
  { piso: 5, nombre: "Cronistas veteranos" }
] as const;

export function pisoDeNivel(nivel: number): number {
  return Math.min(PISOS.length, Math.max(1, Math.ceil(nivel / 5)));
}
