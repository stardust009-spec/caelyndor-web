/**
 * Marcos de avatar (docs/aura-parte-4.md § Marcos de avatar).
 *
 * Seguro para el cliente. Cada marco se desbloquea con un logro: no hay tabla
 * de "marcos ganados", se deriva de UserAchievement, así marco y logro nunca
 * se desincronizan. El servidor valida el equipamiento contra los logros.
 *
 * Arte: lo produce el autor. Mientras un marco no tenga arte, se dibuja un
 * anillo CSS provisional según su `nivelVisual`. El arte llega así:
 *   assets/marcos-master/<slug>.png  →  npm run aura:arte  →  public/images/marcos/<slug>.webp
 * y el script anota el slug en src/data/arteAura.ts.
 */

export type Marco = {
  slug: string;
  nombre: string;
  /** Logro que lo desbloquea (slug de achievementCatalog). */
  logro: string;
  /** Cómo se gana, en una línea, para el panel. */
  condicion: string;
  /** 1–7: estilo del anillo provisional mientras no haya arte. */
  nivelVisual: number;
};

/** Los 7 marcos de progresión (1 / 5 / 10 / 25 / 50 / 100 / todos los relatos). */
export const MARCOS: readonly Marco[] = [
  { slug: "marco-primera-chispa", nombre: "Primera Chispa", logro: "primera-chispa", condicion: "Completa tu primer relato", nivelVisual: 1 },
  { slug: "marco-el-aura-responde", nombre: "El Aura Responde", logro: "el-aura-responde", condicion: "Completa 5 relatos", nivelVisual: 2 },
  { slug: "marco-discipulo-de-las-cronicas", nombre: "Discípulo de las Crónicas", logro: "discipulo-de-las-cronicas", condicion: "Completa 10 relatos", nivelVisual: 3 },
  { slug: "marco-despertar-interior", nombre: "Despertar Interior", logro: "despertar-interior", condicion: "Completa 25 relatos", nivelVisual: 4 },
  { slug: "marco-entre-mundos-y-paginas", nombre: "Entre Mundos y Páginas", logro: "entre-mundos-y-paginas", condicion: "Completa 50 relatos", nivelVisual: 5 },
  { slug: "marco-maestro-de-las-cronicas", nombre: "Maestro de las Crónicas", logro: "maestro-de-las-cronicas", condicion: "Completa 100 relatos", nivelVisual: 6 },
  { slug: "marco-cronista-de-caelyndor", nombre: "Cronista de Caelyndor", logro: "cronista-de-caelyndor", condicion: "Lee todos los relatos publicados", nivelVisual: 7 }
];

export function getMarco(slug: string | null | undefined): Marco | null {
  return MARCOS.find((marco) => marco.slug === slug) ?? null;
}

/**
 * Geometría del arte: el avatar ocupa un círculo centrado cuyo diámetro es
 * esta fracción del lienzo del marco. Con un lienzo de 1024 px, el hueco del
 * avatar mide 640 px. Debe coincidir con la guía de arte (docs/arte-aura.md).
 */
export const AVATAR_EN_MARCO = 0.625;
