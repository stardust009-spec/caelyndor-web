/**
 * Configuración del foro (seguro para el cliente). Fase 1: solo el
 * Vestíbulo de Bienvenida; los pisos de la Torre llegan en la fase 3.
 * Ver docs/aura-parte-4.md § Foro.
 */

export const ESPACIO_VESTIBULO = "vestibulo";

export type CategoriaForo = {
  slug: string;
  nombre: string;
  descripcion: string;
  /** Solo moderación puede abrir hilos aquí (todos pueden responder). */
  soloModeracion: boolean;
};

export const CATEGORIAS_VESTIBULO: readonly CategoriaForo[] = [
  {
    slug: "presentaciones",
    nombre: "Presentaciones",
    descripcion: "Cuéntanos quién eres y qué te trajo a Caelyndor.",
    soloModeracion: false
  },
  {
    slug: "ayuda",
    nombre: "Ayuda y sugerencias",
    descripcion: "Problemas con la web o tu cuenta, e ideas para mejorar el Archivo.",
    soloModeracion: false
  },
  {
    slug: "novedades",
    nombre: "Novedades del Archivo",
    descripcion: "Anuncios del autor: relatos nuevos, música, cambios en el sitio.",
    soloModeracion: true
  }
];

export function getCategoria(slug: string | null | undefined): CategoriaForo | null {
  return CATEGORIAS_VESTIBULO.find((categoria) => categoria.slug === slug) ?? null;
}

/** Reglas del Vestíbulo (borrador: el autor puede ajustarlas aquí). */
export const REGLAS_VESTIBULO: readonly string[] = [
  "El Vestíbulo es un espacio sin spoilers: aquí no se habla de las tramas. Las teorías y conversaciones sobre relatos y libros vivirán en los pisos de la Torre.",
  "Trata a los demás cronistas con respeto. Nada de insultos, acoso ni discriminación.",
  "Los títulos de los hilos deben describir el tema sin revelar nada de la historia.",
  "Por ahora solo se permite texto: sin enlaces ni imágenes.",
  "Nada de spam, publicidad ni mensajes repetidos.",
  "Si ves algo que rompe estas reglas, usa «Reportar». La moderación puede ocultar mensajes o silenciar cuentas."
];

export const MOTIVOS_REPORTE = [
  { valor: "SPOILER", etiqueta: "Revela algo de la trama" },
  { valor: "OFENSIVO", etiqueta: "Ofensivo o irrespetuoso" },
  { valor: "SPAM", etiqueta: "Spam o publicidad" },
  { valor: "OTRO", etiqueta: "Otro motivo" }
] as const;

export type MotivoReporte = (typeof MOTIVOS_REPORTE)[number]["valor"];

export const LIMITES_FORO = {
  tituloMin: 4,
  tituloMax: 100,
  cuerpoMin: 2,
  cuerpoMax: 4000,
  detalleReporteMax: 300
} as const;

/** Detecta enlaces (no permitidos en esta etapa). */
export function contieneEnlace(texto: string): boolean {
  // Nombrar el propio sitio sí se permite (útil en Ayuda).
  const limpio = texto.replace(/\b(www\.)?caelyndor\.cl\b/gi, "");
  return /(https?:\/\/|www\.)\S+/i.test(limpio) || /\b[\w-]+\.(com|cl|net|org|io|ly|gg|me|xyz|info|app|dev)\b/i.test(limpio);
}
