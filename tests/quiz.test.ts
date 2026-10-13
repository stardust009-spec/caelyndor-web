import test from "node:test";
import assert from "node:assert/strict";
import {
  calificar,
  elegirEvento,
  elegirPreguntas,
  minimoParaAprobar,
  modalidadDisponible,
  preguntasActivas,
  type PreguntaQuiz
} from "../src/lib/server/quiz/logica";
import { BANCO_LA_GRAN_ESTAFA } from "../src/lib/server/quiz/banco/la-gran-estafa-de-sylvalis";
import { EVENTOS_EN_ORDEN, EVENTOS_FRACASO } from "../src/data/eventosQuiz";

const ESTAFA = "la-gran-estafa-de-sylvalis";
const publicadasHoy = new Set([ESTAFA]);
let semilla = 1;
const rng = () => {
  semilla = (semilla * 16807) % 2147483647;
  return semilla / 2147483647;
};

test("integridad del banco: ids únicos, 4 alternativas, respuesta válida y fuente", () => {
  const ids = new Set<string>();
  for (const pregunta of BANCO_LA_GRAN_ESTAFA) {
    assert.ok(!ids.has(pregunta.id), `id repetido: ${pregunta.id}`);
    ids.add(pregunta.id);
    assert.equal(pregunta.opciones.length, 4, pregunta.id);
    assert.equal(new Set(pregunta.opciones).size, 4, `alternativas repetidas en ${pregunta.id}`);
    assert.ok(pregunta.correcta >= 0 && pregunta.correcta <= 3, pregunta.id);
    assert.ok(pregunta.requiere.includes(pregunta.obra), `${pregunta.id} debe requerir su propia obra`);
    assert.ok(pregunta.fuente.cita.length > 10, `${pregunta.id} sin cita`);
    assert.ok(pregunta.explicacion.length > 10, `${pregunta.id} sin explicación`);
  }
});

test("las conexiones con obras sin publicar quedan inactivas", () => {
  const conexiones = preguntasActivas(BANCO_LA_GRAN_ESTAFA, ESTAFA, "conexiones", publicadasHoy);
  assert.equal(conexiones.length, 0);
  const conTorneo = preguntasActivas(BANCO_LA_GRAN_ESTAFA, ESTAFA, "conexiones", new Set([ESTAFA, "gran-torneo-etilico-de-glaciem"]));
  assert.equal(conTorneo.length, 2);
});

test("el principal de La Gran Estafa está disponible: 8 preguntas, explícitas primero y dificultad en subida", () => {
  const activas = preguntasActivas(BANCO_LA_GRAN_ESTAFA, ESTAFA, "principal", publicadasHoy);
  assert.ok(modalidadDisponible(activas, "principal"));
  for (let vuelta = 0; vuelta < 50; vuelta += 1) {
    const elegidas = elegirPreguntas(activas, "principal", rng);
    assert.equal(elegidas.length, 8);
    assert.equal(new Set(elegidas.map((p) => p.id)).size, 8);
    assert.deepEqual(elegidas.map((p) => p.tipo), [...Array(5).fill("explicita"), ...Array(3).fill("implicita")]);
    const exp = elegidas.slice(0, 5).map((p) => p.dificultad);
    const imp = elegidas.slice(5).map((p) => p.dificultad);
    assert.deepEqual(exp, [...exp].sort());
    assert.deepEqual(imp, [...imp].sort());
  }
});

test("se aprueba con 7 de 8; las no respondidas cuentan como error", () => {
  const preguntas = BANCO_LA_GRAN_ESTAFA.slice(0, 8) as PreguntaQuiz[];
  const todas = Object.fromEntries(preguntas.map((p) => [p.id, p.correcta]));
  assert.equal(minimoParaAprobar("principal", 8), 7);
  assert.deepEqual(calificar(preguntas, todas, "principal"), { aciertos: 8, total: 8, aprobado: true });
  const sinUna = { ...todas };
  delete sinUna[preguntas[0].id];
  assert.equal(calificar(preguntas, sinUna, "principal").aprobado, true);
  const malas = { ...sinUna, [preguntas[1].id]: (preguntas[1].correcta + 1) % 4 };
  assert.deepEqual(calificar(preguntas, malas, "principal"), { aciertos: 6, total: 8, aprobado: false });
});

test("conexiones: 80 % (4 de 5)", () => {
  assert.equal(minimoParaAprobar("conexiones", 5), 4);
  assert.equal(minimoParaAprobar("conexiones", 4), 4);
});

test("eventos de fracaso: Adagio, Aria, Xirian y Rubí en orden; luego al azar sin repetir", () => {
  const todos = EVENTOS_FRACASO.map((e) => e.id);
  assert.deepEqual([1, 2, 3, 4].map((n) => elegirEvento(n, EVENTOS_EN_ORDEN, todos, null, rng)), ["adagio", "aria", "xirian", "rubi"]);
  for (let i = 0; i < 100; i += 1) {
    const evento = elegirEvento(5 + i, EVENTOS_EN_ORDEN, todos, "yuki", rng);
    assert.notEqual(evento, "yuki");
    assert.ok(todos.includes(evento));
  }
});
