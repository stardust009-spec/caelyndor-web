// Constantes compartidas de SEO/identidad del sitio. El host canónico es el
// apex con www (caelyndor.cl redirige 308 -> www), así que canonicals, sitemap,
// robots y JSON-LD usan siempre www para no apuntar a una URL que redirige.
export const SITE_URL = "https://www.caelyndor.cl";
export const SITE_NAME = "Caelyndor";
export const SITE_AUTHOR = "Claudio";
export const SITE_DESCRIPTION =
  "Caelyndor es un universo de fantasía oscura: relatos, personajes, libros, música, magia y crónicas épicas, reunidos como un archivo vivo del mundo.";

/** Construye una URL absoluta canónica a partir de una ruta relativa ("/personajes"). */
export function absoluteUrl(path = "/") {
  return path === "/" ? SITE_URL : `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
