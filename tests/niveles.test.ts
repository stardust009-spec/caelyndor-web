import test from "node:test";
import assert from "node:assert/strict";
import { EXP_POR, expParaNivel, nivelDeExp, pisoDeNivel, progresoNivel } from "../src/lib/server/niveles";

test("la curva arranca en nivel 1 con 0 EXP y es creciente", () => {
  assert.equal(expParaNivel(1), 0);
  assert.equal(expParaNivel(2), 15);
  assert.equal(expParaNivel(6), 175);
  assert.equal(expParaNivel(11), 600);
  for (let n = 1; n < 40; n += 1) {
    assert.ok(expParaNivel(n + 1) > expParaNivel(n));
  }
});

test("nivelDeExp respeta los bordes de cada nivel", () => {
  assert.equal(nivelDeExp(0), 1);
  assert.equal(nivelDeExp(14), 1);
  assert.equal(nivelDeExp(15), 2);
  assert.equal(nivelDeExp(174), 5);
  assert.equal(nivelDeExp(175), 6);
});

test("calibración: los 14 relatos publicados", () => {
  // Solo leyendo: nivel 7 (Piso 2).
  assert.equal(nivelDeExp(14 * EXP_POR.lectura), 7);
  // Leyendo y aprobando todos los quiz: nivel 13 (Piso 3), nunca Piso 4.
  const todo = 14 * (EXP_POR.lectura + EXP_POR.quiz);
  assert.equal(nivelDeExp(todo), 13);
  assert.equal(pisoDeNivel(nivelDeExp(todo)), 3);
});

test("progresoNivel informa el tramo del nivel actual", () => {
  assert.deepEqual(progresoNivel(80), { nivel: 4, exp: 80, desde: 75, hasta: 120 });
});

test("un piso cada cinco niveles, tope en el Piso 5", () => {
  assert.equal(pisoDeNivel(1), 1);
  assert.equal(pisoDeNivel(5), 1);
  assert.equal(pisoDeNivel(6), 2);
  assert.equal(pisoDeNivel(25), 5);
  assert.equal(pisoDeNivel(40), 5);
});
