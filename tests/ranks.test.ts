import test from "node:test";
import assert from "node:assert/strict";
import { RangoAura } from "../src/generated/prisma/client";
import { computeRank, nextRankInfo } from "../src/lib/server/ranks";

test("computeRank sigue la tabla autoritativa 0/1/5/25/50/100", () => {
  assert.equal(computeRank(0), RangoAura.AURA_LATENTE);
  assert.equal(computeRank(1), RangoAura.NOVATO_DEL_AURA);
  assert.equal(computeRank(4), RangoAura.NOVATO_DEL_AURA);
  assert.equal(computeRank(5), RangoAura.PRIMERA_ESPECIALIZACION);
  assert.equal(computeRank(24), RangoAura.PRIMERA_ESPECIALIZACION);
  assert.equal(computeRank(25), RangoAura.SEGUNDA_ESPECIALIZACION);
  assert.equal(computeRank(49), RangoAura.SEGUNDA_ESPECIALIZACION);
  assert.equal(computeRank(50), RangoAura.MAESTRIA_AVANZADA);
  assert.equal(computeRank(100), RangoAura.MAESTRO_DEL_AURA);
  assert.equal(computeRank(500), RangoAura.MAESTRO_DEL_AURA);
});

test("nextRankInfo informa la meta siguiente correcta", () => {
  assert.deepEqual(nextRankInfo(3)?.needed, 5);
  assert.deepEqual(nextRankInfo(3)?.current, 3);
  assert.equal(nextRankInfo(3)?.label, "Primera Especialización");
  assert.equal(nextRankInfo(99)?.needed, 100);
  assert.equal(nextRankInfo(100), null);
});
