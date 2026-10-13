import test from "node:test";
import assert from "node:assert/strict";
import { contieneEnlace, getCategoria } from "../src/data/foro";

test("detecta enlaces y dominios", () => {
  assert.equal(contieneEnlace("mira https://ejemplo.com"), true);
  assert.equal(contieneEnlace("entra a www.algo.net ya"), true);
  assert.equal(contieneEnlace("sígueme en mipagina.com"), true);
});

test("no bloquea texto normal ni el propio sitio", () => {
  assert.equal(contieneEnlace("Hola, soy Ana. Me encantó el relato de Lyzi..."), false);
  assert.equal(contieneEnlace("Sr. Noctalypse y la Sra. Rubí. Fin."), false);
  assert.equal(contieneEnlace("No me carga www.caelyndor.cl en el celular"), false);
  assert.equal(contieneEnlace("La web caelyndor.cl se ve linda"), false);
});

test("categorías: novedades es solo para moderación", () => {
  assert.equal(getCategoria("novedades")?.soloModeracion, true);
  assert.equal(getCategoria("presentaciones")?.soloModeracion, false);
  assert.equal(getCategoria("inventada"), null);
});
