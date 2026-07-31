/**
 * Pipeline de normalización de alias, aislado y testeable por separado.
 * No decide nada: solo produce representaciones para que el moderador evalúe.
 */

export type NormalizedName = {
  original: string;
  /** minúsculas, NFKD, sin diacríticos, leetspeak resuelto, repeticiones colapsadas. */
  normalized: string;
  /** separado por espacios/separadores artificiales (., _, -, espacios). */
  tokens: string[];
  /** todo unido sin separadores, para detectar "p.e.n.e" -> "pene". */
  compact: string;
  /** Señales de evasión detectadas (necesarias para los niveles 4 y 5). */
  signals: {
    leetspeak: boolean;
    artificialSeparators: boolean;
    charRepetition: boolean;
    homoglyphs: boolean;
  };
};

export const LEETSPEAK_MAP: Record<string, string> = {
  "0": "o",
  "1": "i",
  "3": "e",
  "4": "a",
  "5": "s",
  "7": "t",
  "@": "a",
  $: "s"
};

/**
 * Homóglifos: solo equivalencias visualmente idénticas y frecuentes en evasión
 * (cirílico/griego -> latino). Deliberadamente corto: esta es la parte con más
 * riesgo de falso positivo.
 */
const HOMOGLYPH_MAP: Record<string, string> = {
  "а": "a", // а cirílica
  "е": "e", // е
  "о": "o", // о
  "с": "c", // с
  "р": "p", // р
  "х": "x", // х
  "у": "y", // у
  "і": "i", // і
  "ο": "o", // ο griega
  "α": "a" // α griega
};

const SEPARATOR_PATTERN = /[\s._\-·]+/g;

function stripDiacritics(value: string): string {
  // Remueve TODOS los diacríticos (ñ -> n incluida). Es consistente porque
  // los términos bloqueados pasan por este mismo pipeline antes de comparar;
  // el alias mostrado conserva sus tildes normales (aquí solo se compara).
  return value.normalize("NFKD").replace(/[̀-ͯ]/g, "");
}

function applyMap(value: string, map: Record<string, string>): { result: string; applied: boolean } {
  let applied = false;
  const result = value.replace(/./g, (char) => {
    const mapped = map[char];
    if (mapped !== undefined) {
      applied = true;
      return mapped;
    }
    return char;
  });
  return { result, applied };
}

function collapseRepetition(value: string): { result: string; applied: boolean } {
  // Tres o más repeticiones del mismo carácter se colapsan a una
  // ("peeeene" -> "pene"); los dobles legítimos (ll, rr) se conservan.
  const result = value.replace(/(.)\1{2,}/g, "$1");
  return { result, applied: result !== value };
}

export function normalizeName(input: string): NormalizedName {
  const original = input;
  const lower = stripDiacritics(input.toLowerCase());

  const homoglyphs = applyMap(lower, HOMOGLYPH_MAP);
  const leet = applyMap(homoglyphs.result, LEETSPEAK_MAP);

  const rawTokens = leet.result.split(SEPARATOR_PATTERN).filter(Boolean);
  const separatorMatches = leet.result.match(SEPARATOR_PATTERN) ?? [];
  // Señal de evasión: separadores partiendo el nombre en fragmentos de 1-2
  // letras ("p.e.n.e"), no un separador ordinario ("Ana Sofia").
  const artificialSeparators =
    separatorMatches.some((separator) => /[._\-·]/.test(separator)) &&
    rawTokens.length >= 3 &&
    rawTokens.filter((token) => token.length <= 2).length >= Math.ceil(rawTokens.length / 2);

  const joined = rawTokens.join(" ");
  const repetition = collapseRepetition(joined);

  const normalized = repetition.result;
  const compact = normalized.replace(/\s+/g, "");
  const tokens = normalized.split(" ").filter(Boolean);

  return {
    original,
    normalized,
    tokens,
    compact,
    signals: {
      leetspeak: leet.applied,
      artificialSeparators,
      charRepetition: repetition.applied,
      homoglyphs: homoglyphs.applied
    }
  };
}
