import test from "node:test";
import assert from "node:assert/strict";
import { Senda } from "../src/generated/prisma/client";
import {
  SENDA_QUESTIONS,
  scoreSendaTest,
  validateAnswers,
  type SendaTestAnswers
} from "../src/lib/server/sendaScoring";

function answersAll(optionId: string): SendaTestAnswers {
  return Object.fromEntries(SENDA_QUESTIONS.map((question) => [question.id, optionId]));
}

test("el ritual tiene 6 preguntas y cada opción reparte pesos válidos", () => {
  assert.equal(SENDA_QUESTIONS.length, 6);
  for (const question of SENDA_QUESTIONS) {
    assert.ok(question.options.length >= 4);
    for (const option of question.options) {
      const total = Object.values(option.weights).reduce((sum, weight) => sum + (weight ?? 0), 0);
      assert.ok(total >= 2, `${question.id}/${option.id} reparte muy poco peso`);
    }
  }
});

test("validateAnswers rechaza respuestas incompletas o ajenas al catálogo", () => {
  assert.equal(validateAnswers({}), false);
  assert.equal(validateAnswers({ conflicto: "a" }), false);
  assert.equal(validateAnswers({ ...answersAll("a"), conflicto: "zz" }), false);
  assert.equal(validateAnswers({ ...answersAll("a"), extra: "a" }), false);
  assert.equal(validateAnswers(answersAll("a")), true);
});

test("elecciones consistentes producen una Senda dominante coherente", () => {
  // Todas las opciones "a": perfil directo/protector (LLAMA o TIERRA arriba).
  const scoreA = scoreSendaTest(answersAll("a"));
  const perfilesDirectos: Senda[] = [Senda.LLAMA, Senda.TIERRA, Senda.TRUENO, Senda.HIELO];
  assert.ok(perfilesDirectos.includes(scoreA.principal));
  assert.equal(scoreA.cercanas.length, 2);
  assert.notEqual(scoreA.cercanas[0], scoreA.principal);
  assert.notEqual(scoreA.cercanas[1], scoreA.principal);

  // El scoring es determinista.
  const again = scoreSendaTest(answersAll("a"));
  assert.deepEqual(again, scoreA);
});

test("las Sendas singulares pueden emerger con elecciones consistentes", () => {
  // Opciones orientadas a CONEXION en todas las preguntas donde existe.
  const respuestas: SendaTestAnswers = {
    conflicto: "d",
    proteger: "e",
    conocimiento: "b",
    preferencia: "c",
    sacrificio: "d",
    crisis: "e"
  };
  const score = scoreSendaTest(respuestas);
  assert.equal(score.principal, Senda.CONEXION);
});
