/**
 * Catálogo de avatares: única fuente de verdad de los slugs.
 *
 * Lo consumen dos cosas que DEBEN coincidir o los avatares salen rotos:
 *  - prisma/seed.ts, que siembra las filas de AvatarOption (con su imageUrl)
 *  - scripts/optimize-avatars.ts, que genera los .webp servidos
 *
 * Agregar un personaje = agregar una línea aquí. No hace falta migración.
 */

export const AVATAR_STYLES = [
  { style: "CHIBI", suffix: "chibi", etiqueta: "chibi" },
  { style: "RETRATO_CIRCULAR", suffix: "retrato-circular", etiqueta: "retrato" }
] as const;

/** El orden de esta lista define el orden del selector (sortOrder). */
export const AVATAR_CHARACTERS = [
  "Rubí",
  "Lyzi",
  "Noctalypse",
  "Aria",
  "Adagio",
  "Fulgor",
  "Yuki"
] as const;

/** Slug del avatar que recibe todo usuario nuevo (isDefault en la BD). */
export const DEFAULT_AVATAR_SLUG = "rubi-chibi";

/** Lado en píxeles del .webp servido. Ver docs: el uso mayor es 96px (perfil),
 *  256 cubre pantallas de alta densidad con holgura. */
export const AVATAR_SIZE_PX = 256;
/** Calidad WebP. 82 deja los archivos en ~20 KB sin diferencia visible a 96px. */
export const AVATAR_WEBP_QUALITY = 82;

export type AvatarCatalogEntry = {
  slug: string;
  characterName: string;
  style: (typeof AVATAR_STYLES)[number]["style"];
  imageUrl: string;
  isDefault: boolean;
  sortOrder: number;
};

function toSlugFragment(nombre: string): string {
  return nombre
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "");
}

export function buildAvatarCatalog(): AvatarCatalogEntry[] {
  const entries: AvatarCatalogEntry[] = [];
  let sortOrder = 0;
  for (const { style, suffix } of AVATAR_STYLES) {
    for (const characterName of AVATAR_CHARACTERS) {
      const slug = `${toSlugFragment(characterName)}-${suffix}`;
      sortOrder += 1;
      entries.push({
        slug,
        characterName,
        style,
        imageUrl: `/images/avatars/${slug}.webp`,
        isDefault: slug === DEFAULT_AVATAR_SLUG,
        sortOrder
      });
    }
  }
  return entries;
}
