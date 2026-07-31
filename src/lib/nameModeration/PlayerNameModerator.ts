/**
 * PlayerNameModerator: decide si un alias puede usarse en Caelyndor.
 * Desacoplado de formularios y UI; se ejecuta ANTES de guardar o cambiar un
 * alias, nunca después. Las listas viven en src/data/nameFilters/ y son
 * editables sin tocar esta lógica.
 *
 * Niveles de coincidencia (de más a menos estricto):
 *  1. exacta — el alias completo es un término bloqueado
 *  2. palabra completa — un token coincide con un término
 *  3. expresión compuesta — la combinación de tokens coincide con una
 *     expresión bloqueada de varias palabras
 *  4. forma compactada deliberada — compact contiene el término, SOLO si hay
 *     señales de evasión (separadores artificiales, leetspeak, repetición,
 *     homóglifos). "Penélope" contiene "pene" pero sin señales no se bloquea.
 *  5. difusa — distancia de edición <= 1 contra el alias COMPLETO, solo con
 *     señales de evasión. Nunca se aplica fuzzy general a todos los alias.
 *
 * La allowlist tiene prioridad absoluta sobre todos los niveles.
 * El `reason` es para logging interno; la UI siempre muestra el mensaje
 * genérico ("Ese nombre no puede utilizarse en Caelyndor. Elige otro.").
 */
import { normalizeName } from "./normalizer";
import { COMMON_BLOCKED } from "@/data/nameFilters/common";
import { ES_CL_BLOCKED } from "@/data/nameFilters/es-CL";
import { ALLOWLIST } from "@/data/nameFilters/allowlist";
import { ADMIN_IMPERSONATION_PATTERNS } from "@/data/nameFilters/adminImpersonation";

export type ModerationResult =
  | { allowed: true }
  | { allowed: false; reason: "blocked_term" | "reserved_pattern" | "too_short" | "too_long" };

export const ALIAS_MIN_LENGTH = 3;
export const ALIAS_MAX_LENGTH = 30;

/** Mensaje principal, único texto que ve el usuario ante un rechazo. */
export const REJECTION_MESSAGE = "Ese nombre no puede utilizarse en Caelyndor. Elige otro.";

/** Líneas de personaje opcionales (decorativas; no reemplazan el principal). */
export const REJECTION_FLAVOR_LINES = [
  "Rubí: «No. Ese nombre no pasa por esta puerta.»",
  "Yuki: «Entrada inválida. Selecciona una designación apropiada.»",
  "Lyzi: «Ese nombre enreda demasiado los hilos… probemos con otro.»"
];

function normalizeTerm(term: string): string {
  return normalizeName(term).normalized;
}

/** Términos bloqueados de una sola palabra, ya normalizados. */
const BLOCKED_TERMS: ReadonlySet<string> = new Set(
  [...Object.values(ES_CL_BLOCKED), ...Object.values(COMMON_BLOCKED)]
    .flat()
    .map(normalizeTerm)
    .filter((term) => term.length > 0 && !term.includes(" "))
);

/** Expresiones bloqueadas de varias palabras, normalizadas. */
const BLOCKED_EXPRESSIONS: readonly string[] = [
  ...Object.values(ES_CL_BLOCKED),
  ...Object.values(COMMON_BLOCKED)
]
  .flat()
  .map(normalizeTerm)
  .filter((term) => term.includes(" "));

const ALLOWED: ReadonlySet<string> = new Set(ALLOWLIST.map(normalizeTerm));

const RESERVED_PATTERNS: readonly string[] = ADMIN_IMPERSONATION_PATTERNS.map(normalizeTerm);

function editDistanceAtMostOne(a: string, b: string): boolean {
  if (a === b) return true;
  const [shorter, longer] = a.length <= b.length ? [a, b] : [b, a];
  if (longer.length - shorter.length > 1) return false;

  let i = 0;
  let j = 0;
  let edits = 0;
  while (i < shorter.length && j < longer.length) {
    if (shorter[i] === longer[j]) {
      i += 1;
      j += 1;
      continue;
    }
    edits += 1;
    if (edits > 1) return false;
    if (shorter.length === longer.length) {
      i += 1; // sustitución
    }
    j += 1; // inserción/deleción en el más largo
  }
  return edits + (longer.length - j) + (shorter.length - i) <= 1;
}

export function evaluarAlias(input: string): ModerationResult {
  const trimmed = input.trim();
  if (trimmed.length < ALIAS_MIN_LENGTH) {
    return { allowed: false, reason: "too_short" };
  }
  if (trimmed.length > ALIAS_MAX_LENGTH) {
    return { allowed: false, reason: "too_long" };
  }

  const name = normalizeName(trimmed);
  const hasEvasionSignals =
    name.signals.leetspeak ||
    name.signals.artificialSeparators ||
    name.signals.charRepetition ||
    name.signals.homoglyphs;

  // Allowlist: prioridad absoluta.
  if (ALLOWED.has(name.normalized) || ALLOWED.has(name.compact)) {
    return { allowed: true };
  }

  // Suplantación de cuentas del sistema (por token, incluye prefijos: "admin123").
  for (const token of name.tokens) {
    if (RESERVED_PATTERNS.some((pattern) => token === pattern || token.startsWith(pattern))) {
      return { allowed: false, reason: "reserved_pattern" };
    }
  }

  // Nivel 1: coincidencia exacta del alias completo.
  if (BLOCKED_TERMS.has(name.normalized) || BLOCKED_TERMS.has(name.compact)) {
    return { allowed: false, reason: "blocked_term" };
  }

  // Nivel 2: palabra completa (token).
  for (const token of name.tokens) {
    if (BLOCKED_TERMS.has(token)) {
      return { allowed: false, reason: "blocked_term" };
    }
  }

  // Nivel 3: expresión compuesta.
  for (const expression of BLOCKED_EXPRESSIONS) {
    if (name.normalized.includes(expression)) {
      return { allowed: false, reason: "blocked_term" };
    }
  }

  // Nivel 4: forma compactada deliberada — subcadena + señales de evasión.
  // La coincidencia parcial accidental (Penélope ⊃ "pene") no dispara sola.
  if (hasEvasionSignals) {
    for (const term of BLOCKED_TERMS) {
      if (name.compact.includes(term)) {
        return { allowed: false, reason: "blocked_term" };
      }
    }
  }

  // Nivel 5: difusa, solo alias completo + señales de evasión.
  if (hasEvasionSignals) {
    for (const term of BLOCKED_TERMS) {
      if (Math.abs(name.compact.length - term.length) <= 1 && editDistanceAtMostOne(name.compact, term)) {
        return { allowed: false, reason: "blocked_term" };
      }
    }
  }

  return { allowed: true };
}
