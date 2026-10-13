import test from "node:test";
import assert from "node:assert/strict";
import {
  COMPLETION_THRESHOLD,
  evaluateReading,
  minReadingSeconds
} from "../src/lib/server/readingValidation";

// Relato de 10 minutos: mínimo 180 s (30 %), vía accesible a los 600 s.
const base = { highestProgress: 100, elapsedSeconds: 0, seenPercent: 100, readingMinutes: 10 };

test("el umbral de avance es 96 %", () => {
  assert.equal(COMPLETION_THRESHOLD, 96);
  assert.deepEqual(evaluateReading({ ...base, highestProgress: 95, elapsedSeconds: 9999 }), {
    met: false,
    pendingSeconds: null
  });
  assert.deepEqual(evaluateReading({ ...base, highestProgress: 96, elapsedSeconds: 9999 }), { met: true });
});

test("con tramos suficientes basta el 30 % del tiempo estimado", () => {
  assert.equal(minReadingSeconds(10), 180);
  assert.deepEqual(evaluateReading({ ...base, elapsedSeconds: 179, seenPercent: 70 }), {
    met: false,
    pendingSeconds: 1
  });
  assert.deepEqual(evaluateReading({ ...base, elapsedSeconds: 180, seenPercent: 70 }), { met: true });
});

test("saltar al final sin ver los tramos no cuenta antes del tiempo completo", () => {
  assert.deepEqual(evaluateReading({ ...base, elapsedSeconds: 300, seenPercent: 10 }), {
    met: false,
    pendingSeconds: 300
  });
});

test("vía accesible: con el tiempo estimado completo no se exigen tramos", () => {
  assert.deepEqual(evaluateReading({ ...base, elapsedSeconds: 600, seenPercent: 0 }), { met: true });
});

test("los relatos muy cortos tienen un piso de 30 s", () => {
  assert.equal(minReadingSeconds(1), 30);
  assert.equal(minReadingSeconds(0), 30);
});
