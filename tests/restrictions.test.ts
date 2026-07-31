import test from "node:test";
import assert from "node:assert/strict";
import { restriccionVigente } from "../src/lib/restrictionsLogic";

const now = new Date("2026-07-31T12:00:00Z");

test("una restricción activa y permanente está vigente", () => {
  assert.equal(restriccionVigente({ active: true, expiresAt: null }, now), true);
});

test("una restricción activa con expiresAt futuro está vigente", () => {
  assert.equal(
    restriccionVigente({ active: true, expiresAt: new Date("2026-08-01T00:00:00Z") }, now),
    true
  );
});

test("una restricción vencida deja de aplicar sin cron (lazy expiry por request)", () => {
  assert.equal(
    restriccionVigente({ active: true, expiresAt: new Date("2026-07-31T11:59:59Z") }, now),
    false
  );
});

test("una restricción levantada (active=false) no aplica aunque no haya vencido", () => {
  assert.equal(
    restriccionVigente({ active: false, expiresAt: new Date("2026-09-01T00:00:00Z") }, now),
    false
  );
});
