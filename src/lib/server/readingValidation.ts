/**
 * Regla de "relato leído" (docs/aura-parte-4.md § Lectura completada).
 * Módulo puro: sin BD ni server-only, para poder testearlo aislado.
 *
 * Las cifras son iniciales y se ajustan con datos reales.
 */

/** highestProgress mínimo para considerar el relato recorrido. */
export const COMPLETION_THRESHOLD = 96;
/** Fracción del tiempo estimado que debe pasar desde que se abrió el relato. */
export const MIN_TIME_RATIO = 0.3;
/** Piso absoluto del tiempo mínimo, para relatos muy cortos. */
export const MIN_TIME_FLOOR_SECONDS = 30;
/** Porcentaje de párrafos que deben haberse visto en pantalla. */
export const MIN_SEEN_PERCENT = 70;
/** Vía accesible: con el tiempo estimado completo no se exigen tramos. */
export const FULL_TIME_RATIO = 1;

export type ReadingEvidence = {
  /** Máximo histórico de avance (0-100). */
  highestProgress: number;
  /** Segundos desde el primer progreso registrado del relato (medido en servidor). */
  elapsedSeconds: number;
  /** Párrafos vistos en pantalla, 0-100 (lo informa el navegador). */
  seenPercent: number;
  /** Tiempo estimado de lectura del relato. */
  readingMinutes: number;
};

export type ReadingVerdict =
  | { met: true }
  /** pendingSeconds: cuánto falta para que el mismo avance cuente (null si falta avance). */
  | { met: false; pendingSeconds: number | null };

export function minReadingSeconds(readingMinutes: number): number {
  return Math.max(MIN_TIME_FLOOR_SECONDS, Math.round(readingMinutes * 60 * MIN_TIME_RATIO));
}

export function fullReadingSeconds(readingMinutes: number): number {
  return Math.max(MIN_TIME_FLOOR_SECONDS, Math.round(readingMinutes * 60 * FULL_TIME_RATIO));
}

export function evaluateReading(evidence: ReadingEvidence): ReadingVerdict {
  if (evidence.highestProgress < COMPLETION_THRESHOLD) {
    return { met: false, pendingSeconds: null };
  }

  const minimo = minReadingSeconds(evidence.readingMinutes);
  const completo = fullReadingSeconds(evidence.readingMinutes);
  const elapsed = Math.max(0, evidence.elapsedSeconds);

  if (elapsed >= completo) {
    return { met: true };
  }
  if (evidence.seenPercent >= MIN_SEEN_PERCENT) {
    return elapsed >= minimo ? { met: true } : { met: false, pendingSeconds: minimo - elapsed };
  }
  // Pocos tramos vistos: solo queda la vía del tiempo completo.
  return { met: false, pendingSeconds: completo - elapsed };
}
