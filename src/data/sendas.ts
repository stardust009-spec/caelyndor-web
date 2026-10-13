/**
 * Identidad visual de las diez Sendas (nombre, color y sello).
 *
 * Seguro para el cliente: NO importa el cliente de Prisma; los ids coinciden
 * con el enum `Senda` de prisma/schema.prisma. Colores y sellos son
 * propuesta visual (no canon narrativo) y se pueden ajustar aquí.
 *
 * Los sellos son trazos en un viewBox 0 0 100 100, pensados para dibujarse
 * con stroke-dashoffset (pathLength = 1).
 */

export const SENDA_IDS = [
  "LLAMA",
  "AGUA",
  "HIELO",
  "AIRE",
  "TIERRA",
  "VIDA",
  "CONEXION",
  "TRUENO",
  "VACIO",
  "FE"
] as const;

export type SendaId = (typeof SENDA_IDS)[number];

export type SendaVisual = {
  /** "Llama", "Conexión"… */
  nombre: string;
  /** "Senda de la Llama". */
  titulo: string;
  color: string;
  /** Trazos del sello. */
  sello: string[];
  /** Las singulares/raras (CONEXION, TRUENO, VACIO, FE). */
  singular: boolean;
};

export const SENDAS: Record<SendaId, SendaVisual> = {
  LLAMA: {
    nombre: "Llama",
    titulo: "Senda de la Llama",
    color: "#ff7a45",
    singular: false,
    sello: [
      "M50 10 C63 28 77 42 75 62 C73 80 62 90 50 90 C38 90 27 80 25 62 C24 48 35 40 40 27 C44 39 47 45 52 48 C55 37 53 23 50 10 Z",
      "M50 86 C43 84 39 75 43 66 C46 59 50 56 50 50 C56 57 60 64 58 73 C57 80 54 85 50 86 Z"
    ]
  },
  AGUA: {
    nombre: "Agua",
    titulo: "Senda del Agua",
    color: "#4fb4ff",
    singular: false,
    sello: [
      "M50 10 C60 30 76 46 76 62 C76 78 64 90 50 90 C36 90 24 78 24 62 C24 46 40 30 50 10 Z",
      "M33 63 C39 57 44 57 50 63 C56 69 61 69 67 63",
      "M38 75 C42 72 46 72 50 75 C54 78 58 78 62 75"
    ]
  },
  HIELO: {
    nombre: "Hielo",
    titulo: "Senda del Hielo",
    color: "#a6ecff",
    singular: false,
    sello: [
      "M50 8 L50 92 M13.6 29 L86.4 71 M13.6 71 L86.4 29",
      "M50 30 L67.3 40 L67.3 60 L50 70 L32.7 60 L32.7 40 Z",
      "M42 15 L50 23 L58 15 M42 85 L50 77 L58 85"
    ]
  },
  AIRE: {
    nombre: "Aire",
    titulo: "Senda del Aire",
    color: "#bff5dd",
    singular: false,
    sello: [
      "M50 50 C50 44 58 44 58 50 C58 60 44 62 40 52 C34 38 52 28 64 36 C80 46 72 72 52 74 C30 76 18 56 24 38 C30 22 48 14 64 18",
      "M14 84 L44 84 M58 88 L88 88"
    ]
  },
  TIERRA: {
    nombre: "Tierra",
    titulo: "Senda de la Tierra",
    color: "#d6a86a",
    singular: false,
    sello: ["M12 22 L88 22 L50 88 Z", "M28 46 L72 46", "M50 22 L50 8 M40 12 L60 12"]
  },
  VIDA: {
    nombre: "Vida",
    titulo: "Senda de la Vida",
    color: "#74e39a",
    singular: false,
    sello: [
      "M50 90 L50 44",
      "M50 62 C36 62 24 52 22 34 C40 34 50 44 50 62",
      "M50 52 C62 52 76 42 78 24 C60 24 50 34 50 52",
      "M38 90 L62 90"
    ]
  },
  CONEXION: {
    nombre: "Conexión",
    titulo: "Senda de la Conexión",
    color: "#ff9fd8",
    singular: true,
    sello: [
      "M60 22 A10 10 0 1 1 40 22 A10 10 0 1 1 60 22",
      "M34 72 A10 10 0 1 1 14 72 A10 10 0 1 1 34 72",
      "M86 72 A10 10 0 1 1 66 72 A10 10 0 1 1 86 72",
      "M45 31 L29 63 M55 31 L71 63 M34 72 L66 72"
    ]
  },
  TRUENO: {
    nombre: "Trueno",
    titulo: "Senda del Trueno",
    color: "#ffe45e",
    singular: true,
    sello: ["M58 8 L28 54 L48 54 L40 92 L74 40 L54 40 Z", "M18 30 L26 34 M82 62 L74 66"]
  },
  VACIO: {
    nombre: "Vacío",
    titulo: "Senda del Vacío",
    color: "#a487ff",
    singular: true,
    sello: [
      "M86 50 A36 36 0 1 1 14 50 A36 36 0 1 1 86 50",
      "M80 44 A24 24 0 1 1 32 44 A24 24 0 1 1 80 44",
      "M53 64 A3 3 0 1 1 47 64 A3 3 0 1 1 53 64"
    ]
  },
  FE: {
    nombre: "Fe",
    titulo: "Senda de la Fe",
    color: "#ffdca8",
    singular: true,
    sello: [
      "M50 8 L56 42 L90 50 L56 58 L50 92 L44 58 L10 50 L44 42 Z",
      "M57 50 A7 7 0 1 1 43 50 A7 7 0 1 1 57 50",
      "M24 24 L34 34 M76 24 L66 34 M24 76 L34 66 M76 76 L66 66"
    ]
  }
};

export function isSendaId(value: unknown): value is SendaId {
  return typeof value === "string" && (SENDA_IDS as readonly string[]).includes(value);
}

/** Nombre legible de una Senda guardada en la BD ("CONEXION" → "Conexión"). */
export function sendaNombre(value: string): string {
  return isSendaId(value) ? SENDAS[value].nombre : value;
}
