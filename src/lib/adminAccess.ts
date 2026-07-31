/**
 * Segunda capa de defensa del acceso admin (Parte 3, sección 3): el campo
 * role en la BD no basta por sí solo. TODA verificación de acceso admin del
 * sistema pasa por esAdminAutorizado() — nunca se chequea role === 'admin'
 * de forma aislada en otros puntos del código.
 *
 * Módulo puro (sin BD) para poder testearlo con node:test.
 */

export const ADMIN_EMAIL_ALLOWLIST = [
  "stardust.claudio@gmail.com" // el único valor en esta lista
];

export function esAdminAutorizado(user: { role: string; email: string }): boolean {
  return user.role === "ADMIN" && ADMIN_EMAIL_ALLOWLIST.includes(user.email);
}

/** La verificación 2FA del área admin expira antes que la sesión general. */
export const ADMIN_2FA_WINDOW_MS = 4 * 60 * 60 * 1000; // 4 horas

export function ventana2faVigente(adminVerifiedAt: Date | null, now: Date = new Date()): boolean {
  if (!adminVerifiedAt) {
    return false;
  }
  return now.getTime() - adminVerifiedAt.getTime() < ADMIN_2FA_WINDOW_MS;
}
