import test from "node:test";
import assert from "node:assert/strict";
import { evaluarAlias } from "../src/lib/nameModeration/PlayerNameModerator";
import { normalizeName } from "../src/lib/nameModeration/normalizer";

function blocked(alias: string, reason?: string) {
  const result = evaluarAlias(alias);
  assert.equal(result.allowed, false, `"${alias}" debió rechazarse`);
  if (reason && !result.allowed) {
    assert.equal(result.reason, reason, `"${alias}" con reason inesperado`);
  }
}

function allowed(alias: string) {
  const result = evaluarAlias(alias);
  assert.equal(result.allowed, true, `"${alias}" debió aprobarse`);
}

test("coincidencia exacta con un término bloqueado", () => {
  blocked("pene", "blocked_term");
  blocked("Pichula", "blocked_term");
  blocked("CTM", "blocked_term");
  blocked("weón", "blocked_term"); // con tilde también
});

test("palabra completa dentro de un alias de varios tokens", () => {
  blocked("el pene dorado", "blocked_term");
  blocked("Sir_Culiao", "blocked_term");
});

test("falso positivo tipo Penélope: subcadena accidental NO bloquea", () => {
  allowed("Penélope");
  allowed("Penelope");
  allowed("penelope del bosque"); // token en allowlist
});

test("leetspeak: p3n3 se rechaza", () => {
  blocked("p3n3", "blocked_term");
  blocked("w30n", "blocked_term");
  blocked("pich0la", "blocked_term");
});

test("separadores artificiales: p.e.n.e se rechaza", () => {
  blocked("p.e.n.e", "blocked_term");
  blocked("p_e_n_e", "blocked_term");
});

test("repetición exagerada: peeeene se rechaza", () => {
  blocked("peeeene", "blocked_term");
  blocked("weooooon", "blocked_term");
});

test("alias legítimos sin relación con la lista pasan", () => {
  allowed("Caminante del Alba");
  allowed("Yukira");     // parecido a un personaje no es delito
  allowed("Estrella99");
  allowed("Ana Sofía");  // separador ordinario, no artificial
  allowed("Copito");     // contiene "pito"? no: token completo distinto
});

test("suplantación de cuentas del sistema se rechaza como reserved_pattern", () => {
  blocked("Admin_Caelyndor", "reserved_pattern");
  blocked("admin123", "reserved_pattern");
  blocked("Moderador Oficial", "reserved_pattern");
  blocked("soporte-tecnico", "reserved_pattern");
});

test("largo mínimo y máximo", () => {
  blocked("ab", "too_short");
  blocked("a".repeat(31), "too_long");
});

test("la allowlist tiene prioridad sobre cualquier nivel", () => {
  allowed("Penélope"); // pese a contener la secuencia "pene" compactada
});

test("el normalizador expone señales de evasión coherentes", () => {
  assert.equal(normalizeName("p.e.n.e").signals.artificialSeparators, true);
  assert.equal(normalizeName("Ana Sofía").signals.artificialSeparators, false);
  assert.equal(normalizeName("p3n3").signals.leetspeak, true);
  assert.equal(normalizeName("peeeene").signals.charRepetition, true);
  assert.equal(normalizeName("normal").signals.leetspeak, false);
});
