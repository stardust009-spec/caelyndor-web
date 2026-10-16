/**
 * Configuración del foro (seguro para el cliente). Fase 1: solo el
 * Vestíbulo de Bienvenida; los pisos de la Torre llegan en la fase 3.
 * Ver docs/aura-parte-4.md § Foro.
 */

export const ESPACIO_VESTIBULO = "vestibulo";

/** Imagen de vista previa al compartir el foro y sus hilos (1200×630). */
export const FORO_OG_IMAGE = "/foro/torre-de-los-cronistas-og.jpg";

export type CategoriaForo = {
  slug: string;
  nombre: string;
  descripcion: string;
  /** Texto cuando la sección aún no tiene hilos. */
  vacio: string;
  /** Solo moderación puede abrir hilos aquí (todos pueden responder). */
  soloModeracion: boolean;
};

export const CATEGORIAS_VESTIBULO: readonly CategoriaForo[] = [
  {
    slug: "presentaciones",
    nombre: "Presentaciones",
    descripcion: "Cuéntanos quién eres y qué te trajo a Caelyndor.",
    vacio: "Nadie ha dicho su nombre todavía. La primera voz puede ser la tuya.",
    soloModeracion: false
  },
  {
    slug: "novedades",
    nombre: "Novedades del Archivo",
    descripcion: "Anuncios del autor: relatos nuevos, música, cambios en el sitio.",
    vacio: "El Archivo guarda silencio por ahora. Las próximas noticias aparecerán aquí.",
    soloModeracion: true
  },
  {
    slug: "sala-de-los-ecos",
    nombre: "La Sala de los Ecos",
    descripcion:
      "Un hilo por cada canción publicada, con su enlace. Escucha, comenta y teoriza, siempre sin spoilers.",
    vacio: "La sala está en silencio. Cuando suene la primera canción, su hilo aparecerá aquí.",
    soloModeracion: true
  },
  {
    slug: "taller-de-los-bardos",
    nombre: "El Taller de los Bardos",
    descripcion: "Versos, letras y canciones propias inspiradas en Caelyndor. Sin spoilers de la trama.",
    vacio: "El taller está vacío todavía. Afina la pluma y deja el primer verso.",
    soloModeracion: false
  },
  {
    slug: "prueba-de-la-luna",
    nombre: "La Prueba de la Luna",
    descripcion: "Cada mes, un tema: fanart, relato corto o verso. Participa respondiendo al hilo del reto.",
    vacio: "La primera prueba aún no se ha anunciado. Vuelve con la próxima luna.",
    soloModeracion: true
  },
  {
    slug: "ayuda",
    nombre: "Ayuda y sugerencias",
    descripcion: "Problemas con la web o tu cuenta, e ideas para mejorar el Archivo.",
    vacio: "Sin consultas por ahora. Si algo falla o se te ocurre una idea, este es el lugar.",
    soloModeracion: false
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
  "Solo se permiten enlaces a Suno, YouTube y caelyndor.cl. Nada de imágenes por ahora.",
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

/** Dominios a los que se puede enlazar (incluye sus subdominios). */
export const DOMINIOS_PERMITIDOS = ["caelyndor.cl", "suno.com", "suno.ai", "youtube.com", "youtu.be"] as const;

export const ERROR_ENLACE = "Solo se permiten enlaces a Suno, YouTube o caelyndor.cl";

/**
 * Detecta algo con forma de enlace: con esquema, con www., o un dominio
 * desnudo con un TLD conocido (para no confundir "hola.que" con un enlace).
 */
const PATRON_ENLACE =
  /https?:\/\/[^\s<>"]+|\bwww\.[^\s<>"]+|\b(?:[a-z0-9-]+\.)+(?:com|cl|net|org|io|ly|gg|me|xyz|info|app|dev|be|ai)\b(?:[/?#][^\s<>"]*)?/gi;

/** Puntuación final que pertenece a la frase, no al enlace. */
const PUNTUACION_FINAL = /[.,;:!?¡¿)\]}'"»]+$/;

function hostDe(enlace: string): string {
  return enlace
    .replace(/^https?:\/\//i, "")
    .split(/[/?#:]/)[0]
    .toLowerCase()
    .replace(/^www\./, "");
}

function esDominioPermitido(enlace: string): boolean {
  const host = hostDe(enlace);
  return DOMINIOS_PERMITIDOS.some((dominio) => host === dominio || host.endsWith(`.${dominio}`));
}

/** ¿El texto trae algún enlace fuera de la lista permitida? */
export function contieneEnlaceNoPermitido(texto: string): boolean {
  for (const coincidencia of texto.matchAll(PATRON_ENLACE)) {
    const enlace = coincidencia[0].replace(PUNTUACION_FINAL, "");
    if (!esDominioPermitido(enlace)) return true;
  }
  return false;
}

/** ¿El texto trae cualquier enlace? Los títulos no admiten enlaces, salvo nombrar el sitio. */
export function contieneEnlace(texto: string): boolean {
  const limpio = texto.replace(/\b(www\.)?caelyndor\.cl\b/gi, "");
  return new RegExp(PATRON_ENLACE.source, "i").test(limpio);
}

export type TrozoTexto = { tipo: "texto"; valor: string } | { tipo: "enlace"; valor: string; href: string };

/** Parte el texto en trozos de texto y enlaces permitidos (los demás quedan como texto). */
export function partirEnlaces(texto: string): TrozoTexto[] {
  const trozos: TrozoTexto[] = [];
  let desde = 0;
  for (const coincidencia of texto.matchAll(PATRON_ENLACE)) {
    const enlace = coincidencia[0].replace(PUNTUACION_FINAL, "");
    const inicio = coincidencia.index ?? 0;
    if (!esDominioPermitido(enlace)) continue;
    if (inicio > desde) trozos.push({ tipo: "texto", valor: texto.slice(desde, inicio) });
    const href = /^https?:\/\//i.test(enlace) ? enlace : `https://${enlace}`;
    trozos.push({ tipo: "enlace", valor: enlace, href });
    desde = inicio + enlace.length;
  }
  if (desde < texto.length) trozos.push({ tipo: "texto", valor: texto.slice(desde) });
  return trozos;
}
