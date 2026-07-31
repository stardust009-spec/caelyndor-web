/**
 * Patrones que imitan cuentas del sistema o del equipo (ej. "Admin_Caelyndor").
 * Se comparan por token: un alias cuyo token empiece por uno de estos patrones
 * se rechaza con reason "reserved_pattern".
 */
export const ADMIN_IMPERSONATION_PATTERNS = [
  "admin",
  "administrador",
  "moderador",
  "soporte",
  "staff",
  "aurelia",
  "caelyndor",
  "sistema",
  "oficial"
];
