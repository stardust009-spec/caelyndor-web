import test from "node:test";
import assert from "node:assert/strict";
import { ACHIEVEMENT_CATALOG, type LogroContexto } from "../src/lib/server/achievementCatalog";
import type { StoryMeta } from "../src/lib/server/storyContent";

function meta(slug: string, extra: Partial<StoryMeta> = {}): StoryMeta {
  return { slug, title: slug, canonical: true, secret: false, nocturnal: false, ...extra };
}

function ctx(overrides: Partial<LogroContexto> = {}): LogroContexto {
  return {
    completadosCanonicos: new Set(),
    completadosTodos: new Set(),
    relatosReleidos: 0,
    ritualCompletado: false,
    huElegida: false,
    historias: new Map(),
    ...overrides
  };
}

function logro(slug: string) {
  const found = ACHIEVEMENT_CATALOG.find((entry) => entry.slug === slug);
  assert.ok(found, `logro ${slug} no existe en el catálogo`);
  return found;
}

test("primera-chispa se cumple con 1 relato canónico completado", () => {
  assert.equal(logro("primera-chispa").condition(ctx()), false);
  assert.equal(
    logro("primera-chispa").condition(ctx({ completadosCanonicos: new Set(["a"]) })),
    true
  );
});

test("cronista-de-caelyndor es dinámico: publicar un relato nuevo lo revoca como meta", () => {
  const historias = new Map([
    ["a", meta("a")],
    ["b", meta("b")],
    ["anexo", meta("anexo", { canonical: false })]
  ]);
  const completo = ctx({ historias, completadosCanonicos: new Set(["a", "b"]) });
  assert.equal(logro("cronista-de-caelyndor").condition(completo), true);

  historias.set("c", meta("c"));
  assert.equal(logro("cronista-de-caelyndor").condition(completo), false);
});

test("los logros de región requieren metadata de región presente", () => {
  // Sin ningún relato con region asignada, no pueden dispararse.
  const sinRegion = ctx({
    historias: new Map([["a", meta("a")]]),
    completadosCanonicos: new Set(["a"]),
    completadosTodos: new Set(["a"])
  });
  assert.equal(logro("bajo-el-sol-de-cindralith").condition(sinRegion), false);
  assert.equal(logro("cartografo-de-caelyndor").condition(sinRegion), false);

  const conRegion = ctx({
    historias: new Map([
      ["a", meta("a", { region: "cindralith" })],
      ["b", meta("b", { region: "glaciem" })]
    ]),
    completadosCanonicos: new Set(["a", "b"]),
    completadosTodos: new Set(["a", "b"])
  });
  assert.equal(logro("bajo-el-sol-de-cindralith").condition(conRegion), true);
  assert.equal(logro("corazon-de-hielo").condition(conRegion), true);
  assert.equal(logro("cartografo-de-caelyndor").condition(conRegion), true);
});

test("oyente-de-ecos exige releer cinco relatos distintos", () => {
  assert.equal(logro("oyente-de-ecos").condition(ctx({ relatosReleidos: 4 })), false);
  assert.equal(logro("oyente-de-ecos").condition(ctx({ relatosReleidos: 5 })), true);
});

test("ritual-de-afinacion y el-don-despierta responden a sus hitos", () => {
  assert.equal(logro("ritual-de-afinacion").condition(ctx({ ritualCompletado: true })), true);
  assert.equal(logro("el-don-despierta").condition(ctx({ huElegida: true })), true);
  assert.equal(logro("el-don-despierta").condition(ctx()), false);
});

test("testigo-silencioso queda bloqueado hasta definir el evento de escena oculta", () => {
  assert.equal(
    logro("testigo-silencioso").condition(
      ctx({ completadosTodos: new Set(["a"]), relatosReleidos: 99, ritualCompletado: true, huElegida: true })
    ),
    false
  );
});
