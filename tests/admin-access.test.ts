import test from "node:test";
import assert from "node:assert/strict";
import {
  ADMIN_2FA_WINDOW_MS,
  ADMIN_EMAIL_ALLOWLIST,
  esAdminAutorizado,
  ventana2faVigente
} from "../src/lib/adminAccess";

const adminEmail = ADMIN_EMAIL_ALLOWLIST[0];

test("esAdminAutorizado exige role ADMIN Y estar en la allowlist (defensa en profundidad)", () => {
  // Ambas capas presentes: autorizado.
  assert.equal(esAdminAutorizado({ role: "ADMIN", email: adminEmail }), true);

  // Solo el campo de la BD (fila corrupta/manipulada): rechazado.
  assert.equal(esAdminAutorizado({ role: "ADMIN", email: "intruso@example.com" }), false);

  // Solo la allowlist (rol normal): rechazado.
  assert.equal(esAdminAutorizado({ role: "USER", email: adminEmail }), false);

  // Un usuario normal cualquiera: rechazado.
  assert.equal(esAdminAutorizado({ role: "USER", email: "lectora@example.com" }), false);
});

test("la allowlist tiene exactamente un valor (un único admin en esta fase)", () => {
  assert.equal(ADMIN_EMAIL_ALLOWLIST.length, 1);
});

test("la ventana 2FA expira antes que la sesión general", () => {
  const now = new Date("2026-07-31T12:00:00Z");

  // Nunca verificado: sin acceso.
  assert.equal(ventana2faVigente(null, now), false);

  // Recién verificado: acceso.
  assert.equal(ventana2faVigente(new Date("2026-07-31T11:59:00Z"), now), true);

  // Dentro de la ventana de 4 h: acceso.
  assert.equal(ventana2faVigente(new Date(now.getTime() - ADMIN_2FA_WINDOW_MS + 60_000), now), true);

  // Ventana vencida: requiere reverificar aunque la sesión del sitio siga viva.
  assert.equal(ventana2faVigente(new Date(now.getTime() - ADMIN_2FA_WINDOW_MS - 1), now), false);
});
