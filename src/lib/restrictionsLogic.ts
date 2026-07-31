/**
 * Lógica pura de vigencia de restricciones (testeable con node:test).
 * Expiración lazy: se evalúa al momento de cada request, sin cron — una fila
 * vencida se trata como inactiva aunque siga con active=true.
 */
export function restriccionVigente(
  row: { active: boolean; expiresAt: Date | null },
  now: Date = new Date()
): boolean {
  return row.active && (row.expiresAt === null || row.expiresAt.getTime() > now.getTime());
}
