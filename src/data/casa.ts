/**
 * La casa de Lyzi — portada narrativa del portal.
 *
 * Escenas pintadas (Astra, Propuesta 02) animadas con video IA (Higgsfield · Kling 3.0): los
 * tramos de scroll son secuencias de fotogramas WebP, los descansos y los primeros planos son
 * bucles de video, y un manifest.json dice dónde queda cada cosa clickeable. Se preparan con
 * `node scripts/casa-de-lyzi-video.mjs`. La carpeta local (public/casa-de-lyzi/) NO se versiona:
 * en producción vive en el repo Caelyndor-Assets (GitHub Pages), igual que la música, por el
 * tope de Vercel.
 */
export const CASA_ASSET_BASE = process.env.NEXT_PUBLIC_CASA_ASSETS ?? "/casa-de-lyzi/v2";

export const CASA_OBJETOS = [
  "biblioteca",
  "libro",
  "vitrola",
  "cuadros",
  "mapa",
  "escritorio",
  "baul",
  "rollito",
  "visitas"
] as const;
export type CasaObjeto = (typeof CASA_OBJETOS)[number];

export const CASA_EXTERIOR = ["farol", "lirios", "tronco", "ventana", "macetero", "puerta"] as const;
export type CasaExterior = (typeof CASA_EXTERIOR)[number];

export const CASA_OBJETO_INFO: Record<CasaObjeto, { name: string; short: string; hint: string }> = {
  biblioteca: { name: "La biblioteca", short: "Biblioteca", hint: "Fichas, enciclopedia, cronología y libros" },
  libro: { name: "El libro abierto", short: "Relatos", hint: "Relatos marcados con cintas" },
  vitrola: { name: "La vitrola", short: "Vitrola", hint: "La música de Caelyndor" },
  cuadros: { name: "Los retratos", short: "Retratos", hint: "Galería de arte" },
  mapa: { name: "El mapa de Sylvalis", short: "Mapa", hint: "El mundo y sus regiones" },
  escritorio: { name: "El escritorio", short: "Escritorio", hint: "El libro que se forja" },
  baul: { name: "El baúl de postales", short: "Baúl", hint: "Fondos y skins para llevar" },
  rollito: { name: "El rincón de Rollito", short: "Rollito", hint: "Alguien duerme enroscado" },
  visitas: { name: "El libro de visitas", short: "Visitas", hint: "Tu cuenta en el portal" }
};

/** Cintas-marcapáginas del libro: acentos del Canon de Separadores Lyzánthycos v1.0. */
export const CASA_CINTAS = [
  { key: "rubi", label: "Rubí", color: "#ff8a5f", match: ["rubí", "rubi"] },
  { key: "yuki", label: "Yuki", color: "#9fd8ff", match: ["yuki"] },
  { key: "lyzi", label: "Lyzi", color: "#c9a7ff", match: ["lyzi"] },
  { key: "noctalypse", label: "Noctalypse", color: "#a08fdb", match: ["noct"] },
  { key: "ensemble", label: "Todos", color: "#67d9ff", match: [] }
] as const;
export type CasaCinta = (typeof CASA_CINTAS)[number]["key"];

// ——— Tipos del contenido que la página (servidor) le pasa a la experiencia (cliente).
// Sólo campos públicos: nunca objetos Character/Story completos.

export type CasaLink = { label: string; href: string };

export type CasaLegend = {
  title: string;
  kicker: string;
  text: string;
  source?: string;
  links: CasaLink[];
  trackId?: string;
};

export type CasaStory = {
  slug: string;
  title: string;
  teaser: string;
  characters: string[];
  minutes: number;
  color: string;
};

export type CasaCharacter = { slug: string; name: string; title: string; image: string; accent: string };
export type CasaAlbum = { slug: string; title: string; status?: string; trackIds: string[] };
export type CasaCard = { id: string; title: string; image: string; href: string };

export type CasaContent = {
  legends: Record<CasaExterior, CasaLegend>;
  stories: CasaStory[];
  characters: CasaCharacter[];
  archive: { title: string; text: string; href: string }[];
  eras: { title: string; type: string }[];
  books: { title: string; status: string; href: string }[];
  albums: CasaAlbum[];
  gallery: CasaCard[];
  downloads: CasaCard[];
  forja: { title: string; status: string; progress: number; lastUpdate: string; nextMilestone: string; definition: string };
  mapa: { text: string };
  rollito: { bond: string; quote: string; story?: { slug: string; title: string } };
  archivista: string;
};
