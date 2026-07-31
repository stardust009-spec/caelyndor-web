import test from "node:test";
import assert from "node:assert/strict";
import { CSV_DELIMITER, UTF8_BOM, escapeCsvField, toCsv, type CsvColumn } from "../src/lib/csv";

test("campos simples pasan sin tocar", () => {
  assert.equal(escapeCsvField("Noctalypse"), "Noctalypse");
  assert.equal(escapeCsvField("Santiago"), "Santiago");
  assert.equal(escapeCsvField(42), "42");
});

test("null y undefined quedan como celda vacía", () => {
  assert.equal(escapeCsvField(null), "");
  assert.equal(escapeCsvField(undefined), "");
});

test("el separador dentro de un campo obliga a entrecomillar", () => {
  assert.equal(escapeCsvField("Santiago; Chile"), '"Santiago; Chile"');
});

test("las comillas se duplican y el campo se entrecomilla", () => {
  assert.equal(escapeCsvField('El "Velo"'), '"El ""Velo"""');
});

test("saltos de línea dentro de un campo no rompen la fila", () => {
  assert.equal(escapeCsvField("linea1\nlinea2"), '"linea1\nlinea2"');
});

test("inyección de fórmulas: se neutraliza el prefijo peligroso", () => {
  // Un alias así pasa la moderación (no es lenguaje ofensivo) pero Excel lo
  // ejecutaría al abrir el archivo si no se neutraliza.
  // Lleva apóstrofo (neutraliza la fórmula) Y entrecomillado con las comillas
  // internas duplicadas, porque el campo contiene comillas.
  assert.equal(escapeCsvField('=HYPERLINK("http://malo")'), `"'=HYPERLINK(""http://malo"")"`);
  assert.equal(escapeCsvField("+1+1"), "'+1+1");
  assert.equal(escapeCsvField("-2+3"), "'-2+3");
  assert.equal(escapeCsvField("@SUM(A1)"), "'@SUM(A1)");
  assert.equal(escapeCsvField("\tconTab"), "'\tconTab");
});

test("un guion legítimo a mitad de campo no se toca", () => {
  assert.equal(escapeCsvField("Villa Alemana-Norte"), "Villa Alemana-Norte");
});

test("el archivo lleva BOM, encabezados y CRLF", () => {
  type Fila = { alias: string; ciudad: string | null };
  const columnas: CsvColumn<Fila>[] = [
    { header: "alias", value: (f) => f.alias },
    { header: "ciudad", value: (f) => f.ciudad ?? "" }
  ];
  const csv = toCsv([{ alias: "Lyzi", ciudad: "Ñuñoa" }], columnas);

  assert.ok(csv.startsWith(UTF8_BOM), "debe empezar con BOM para que Excel lea UTF-8");
  const lineas = csv.slice(UTF8_BOM.length).split("\r\n");
  assert.equal(lineas[0], `alias${CSV_DELIMITER}ciudad`);
  assert.equal(lineas[1], `Lyzi${CSV_DELIMITER}Ñuñoa`);
  assert.equal(lineas[2], "", "termina con CRLF");
});

test("una exportación vacía sigue trayendo los encabezados", () => {
  const csv = toCsv([] as { a: string }[], [{ header: "a", value: (f) => f.a }]);
  assert.equal(csv, `${UTF8_BOM}a\r\n`);
});

test("el export no filtra campos fuera del propósito declarado", () => {
  // Contrato de minimización: si alguien añade una columna con nombre real,
  // apellidos o fecha de nacimiento, este test debe hacerle ruido.
  type Fila = { alias: string; email: string; nombre: string };
  const columnas: CsvColumn<Fila>[] = [
    { header: "alias", value: (f) => f.alias },
    { header: "email", value: (f) => f.email }
  ];
  const csv = toCsv([{ alias: "Rubi", email: "r@x.cl", nombre: "Nombre Real" }], columnas);
  assert.ok(!csv.includes("Nombre Real"), "solo salen las columnas declaradas");
});
