/**
 * Generación de CSV. Módulo puro (sin BD ni Next) para poder testearlo.
 *
 * Dos decisiones que no son cosméticas:
 *
 * 1. Neutralización de fórmulas. Un campo que empieza con = + - @ (o tab/CR)
 *    lo interpreta Excel/Sheets como fórmula al abrir el archivo. Como el
 *    alias lo escribe el usuario y el moderador solo filtra lenguaje —no
 *    sintaxis de fórmulas—, alguien podría registrarse como `=HYPERLINK(...)`
 *    y ejecutar algo en la máquina de quien abre el export. Se antepone un
 *    apóstrofo, que Excel trata como "esto es texto" y no muestra.
 *
 * 2. Separador `;` + BOM UTF-8. Excel en configuración regional española usa
 *    `;` como separador de listas: un CSV con comas le cae todo en una sola
 *    columna. Y sin BOM lee el UTF-8 como Latin-1, rompiendo los acentos
 *    (Ñuñoa, Peñalolén, Concepción). Ambas cosas son necesarias para que el
 *    archivo se abra bien con doble clic, que es el caso de uso pedido.
 */

/** Caracteres que Excel/Sheets interpretan como inicio de fórmula. */
const FORMULA_PREFIXES = ["=", "+", "-", "@", "\t", "\r"];

export const CSV_DELIMITER = ";";
/** Byte Order Mark: le dice a Excel que el archivo es UTF-8. */
export const UTF8_BOM = "﻿";

export function escapeCsvField(value: unknown): string {
  if (value === null || value === undefined) {
    return "";
  }
  let text = String(value);

  if (FORMULA_PREFIXES.some((prefix) => text.startsWith(prefix))) {
    text = `'${text}`;
  }

  // Comillas dobles: se duplican. Si hay separador, salto de línea o comillas,
  // el campo entero va entrecomillado.
  const needsQuotes =
    text.includes(CSV_DELIMITER) || text.includes('"') || text.includes("\n") || text.includes("\r");
  if (needsQuotes) {
    return `"${text.replace(/"/g, '""')}"`;
  }
  return text;
}

export type CsvColumn<T> = {
  /** Encabezado tal como aparece en la primera fila del archivo. */
  header: string;
  value: (row: T) => unknown;
};

export function toCsv<T>(rows: readonly T[], columns: readonly CsvColumn<T>[]): string {
  const lines: string[] = [];
  lines.push(columns.map((column) => escapeCsvField(column.header)).join(CSV_DELIMITER));
  for (const row of rows) {
    lines.push(columns.map((column) => escapeCsvField(column.value(row))).join(CSV_DELIMITER));
  }
  // CRLF: es lo que espera Excel y lo que dice el RFC 4180.
  return UTF8_BOM + lines.join("\r\n") + "\r\n";
}
