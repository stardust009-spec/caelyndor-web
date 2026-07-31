/**
 * Excepciones explícitas: si un alias normalizado coincide con una entrada,
 * se aprueba sin más evaluación (prioridad sobre cualquier nivel de bloqueo).
 * Agregar aquí según se detecten falsos positivos reales en producción.
 */
export const ALLOWLIST = [
  "penelope",
  "penelop" // variantes normalizadas de nombres legítimos con secuencias bloqueadas
];
