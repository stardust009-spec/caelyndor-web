// Fondos de pantalla descargables del archivo visual de Caelyndor.
// El preview .webp se sirve localmente desde /public/previews/wallpapers (desktop, máx. 800px;
// mobile en /mobile, máx. 400px y verticales); los archivos pesados (PNG 4K y MP4 animado)
// se entregan vía descarga directa de Google Drive.
// Cada descarga tiene un `fileId` kebab-case que alimenta el contador global en Redis
// (ver /api/download-stats, clave `descarga:{fileId}:count`). El patrón válido es ^[a-z0-9-]{1,120}$.

export type WallpaperDownload = {
  fileId: string;
  url: string;
};

export type Wallpaper = {
  id: string;
  title: string;
  /** Ruta del preview .webp dentro de /public. */
  preview: string;
  /** Color de acento de la tarjeta (token de personaje). */
  accent: string;
  png: WallpaperDownload;
  mp4?: WallpaperDownload;
};

export type WallpaperGroup = {
  character: string;
  blurb: string;
  accent: string;
  wallpapers: Wallpaper[];
};

/** Categoría = formato (escritorio / mobile). El `layout` controla el grid y la proporción de tarjeta. */
export type WallpaperCategory = {
  id: string;
  label: string;
  blurb: string;
  layout: "desktop" | "mobile";
  groups: WallpaperGroup[];
};

const drive = (id: string) => `https://drive.google.com/uc?export=download&id=${id}`;

export const wallpaperCategories: WallpaperCategory[] = [
  {
    id: "desktop",
    label: "Escritorio",
    layout: "desktop",
    blurb: "Panorámicas en 4K para monitores anchos: retratos y loops que respiran en horizontal.",
    groups: [
      {
        character: "Rubí",
        accent: "#c84b4b",
        blurb: "Brasa que no pide permiso. El corazón volcánico de Caelyndor en 4K.",
        wallpapers: [
          {
            id: "rubi-volcanic-heart",
            title: "Volcanic Heart",
            preview: "/previews/wallpapers/rubi-volcanic-heart.webp",
            accent: "#c84b4b",
            png: { fileId: "rubi-volcanic-heart-png", url: drive("1FTMYtVICqayJ9MNASCgO4bOU5cSVyghW") },
            mp4: { fileId: "rubi-volcanic-heart-mp4", url: drive("1Oi4K5FLIJOWcLCTUd4t4V0PwMATvowHX") }
          }
        ]
      },
      {
        character: "Yuki",
        accent: "#8bc6df",
        blurb: "Hielo elegante, silencio de glaciar. El último invierno hecho fondo.",
        wallpapers: [
          {
            id: "yuki-glaciem-elegant-ice",
            title: "Glaciem · Elegant Ice",
            preview: "/previews/wallpapers/yuki-glaciem-elegant-ice.webp",
            accent: "#8bc6df",
            png: { fileId: "yuki-glaciem-png", url: drive("1xQM4ohxjZJItFSVB1LZZmUHl186dgMnQ") },
            mp4: { fileId: "yuki-glaciem-mp4", url: drive("1TROW7PggnCBGcTb9lYxJq45EpbauiI1O") }
          }
        ]
      },
      {
        character: "Lyzi",
        accent: "#a77aff",
        blurb: "Nueve colas bajo la luz de las estrellas. Magia que respira en loop.",
        wallpapers: [
          {
            id: "lyzi-nine-tails-starlit",
            title: "Nine Tails Starlit",
            preview: "/previews/wallpapers/lyzi-nine-tails-starlit.webp",
            accent: "#a77aff",
            png: { fileId: "lyzi-nine-tails-png", url: drive("1UoI3MOQDoj-8mWs5k5dwwJEAmzMZTzPd") },
            mp4: { fileId: "lyzi-nine-tails-mp4", url: drive("1qjy6kEc_6kJ58YZQM6yEk774J55jKGqS") }
          }
        ]
      },
      {
        character: "Grupo",
        accent: "#9a7dff",
        blurb: "Rubí, Yuki y Lyzi juntas. Las treguas raras que el Velo guarda con cariño.",
        wallpapers: [
          {
            id: "grupo-dia-de-paz",
            title: "Día de Paz",
            preview: "/previews/wallpapers/grupo-dia-de-paz.webp",
            accent: "#9a7dff",
            png: { fileId: "grupo-dia-de-paz-png", url: drive("1X80Hsb9efADgBVuKHkO-uPPTCvA9B9mc") }
          },
          {
            id: "grupo-dia-de-banana",
            title: "Día de Banana",
            preview: "/previews/wallpapers/grupo-dia-de-banana.webp",
            accent: "#f0c050",
            png: { fileId: "grupo-dia-de-banana-png", url: drive("1wX_XbzSno2Sz3db-pH-HAM8bgDxrugNy") }
          },
          {
            id: "grupo-winter-balcony-glaciem",
            title: "Winter Balcony Glaciem",
            preview: "/previews/wallpapers/grupo-winter-balcony-glaciem.webp",
            accent: "#8bc6df",
            png: { fileId: "grupo-winter-balcony-glaciem-png", url: drive("1g1PAfFdNPL6008VBJ9s8Nh9PgXjnNeFe") }
          },
          {
            id: "grupo-dia-sin-mangas",
            title: "Día Sin Mangas",
            preview: "/previews/wallpapers/grupo-dia-sin-mangas-desktop.webp",
            accent: "#9a7dff",
            png: { fileId: "grupo-dia-sin-mangas-desktop-png", url: drive("17F2n2HSJR4GY2TB3PPRWQ8VTBbO7wdc6") }
          }
        ]
      }
    ]
  },
  {
    id: "mobile",
    label: "Mobile",
    layout: "mobile",
    blurb: "Verticales 9:16 pensados para el teléfono: lleva el Velo en el bolsillo, quieto o en movimiento.",
    groups: [
      {
        character: "Rubí",
        accent: "#c84b4b",
        blurb: "El golpe volcánico en formato retrato, listo para tu pantalla de bloqueo.",
        wallpapers: [
          {
            id: "rubi-volcanic-strike",
            title: "Volcanic Strike",
            preview: "/previews/wallpapers/mobile/rubi-volcanic-strike.webp",
            accent: "#c84b4b",
            png: { fileId: "rubi-volcanic-strike-png", url: drive("1r0w4vrBVMjLQv7OscqyV4AS_szZG2b7M") },
            mp4: { fileId: "rubi-volcanic-strike-mp4", url: drive("1FX074NCzqgajxETsiKFdlySRH7eBG3zX") }
          }
        ]
      },
      {
        character: "Yuki",
        accent: "#8bc6df",
        blurb: "Tormenta de hielo y mecanismos congelados, verticales para llevar.",
        wallpapers: [
          {
            id: "yuki-thunder-glaciem",
            title: "Thunder Glaciem",
            preview: "/previews/wallpapers/mobile/yuki-thunder-glaciem.webp",
            accent: "#8bc6df",
            png: { fileId: "yuki-thunder-glaciem-png", url: drive("1L8svDN8XLxTmUIFmz_Q-aOq5ZumLtPWN") },
            mp4: { fileId: "yuki-thunder-glaciem-mp4", url: drive("1lOGLmNNH2xLtfdxZblEZqDLK4zEDyzaT") }
          },
          {
            id: "yuki-frozen-clockwork",
            title: "Frozen Clockwork",
            preview: "/previews/wallpapers/mobile/yuki-frozen-clockwork.webp",
            accent: "#8bc6df",
            png: { fileId: "yuki-frozen-clockwork-png", url: drive("1knVXYBiRFiVt4oF6XvyWxjZic7e3Lvme") }
          }
        ]
      },
      {
        character: "Lyzi",
        accent: "#a77aff",
        blurb: "El bosque a la luz de la luna, respirando en loop dentro del teléfono.",
        wallpapers: [
          {
            id: "lyzi-moonlit-forest",
            title: "Moonlit Forest",
            preview: "/previews/wallpapers/mobile/lyzi-moonlit-forest.webp",
            accent: "#a77aff",
            png: { fileId: "lyzi-moonlit-forest-png", url: drive("1rGjIdDNZb29YDZ0JZuAaOWnCd68N90wc") },
            mp4: { fileId: "lyzi-moonlit-forest-mp4", url: drive("1-bK5h6z7FpF9IBALK8Cg8m9fYaXlN3BY") }
          }
        ]
      },
      {
        character: "Aria",
        accent: "#9ccce8",
        blurb: "La balada carmesí de Aria Ventoleve, retrato vertical para la pantalla.",
        wallpapers: [
          {
            id: "aria-crimson-ballad",
            title: "Crimson Ballad",
            preview: "/previews/wallpapers/mobile/aria-crimson-ballad.webp",
            accent: "#9ccce8",
            png: { fileId: "aria-crimson-ballad-png", url: drive("1L73F5LV4E_yoSWrztnN9Gvj2wwpc2LQl") }
          }
        ]
      },
      {
        character: "Grupo",
        accent: "#9a7dff",
        blurb: "Ecos del Velo: las chicas reunidas, formato retrato para acompañarte.",
        wallpapers: [
          {
            id: "grupo-ecos-del-velo",
            title: "Ecos del Velo",
            preview: "/previews/wallpapers/mobile/grupo-ecos-del-velo.webp",
            accent: "#9a7dff",
            png: { fileId: "grupo-ecos-del-velo-png", url: drive("1xSKuvEJdt3FCAt5aTGRVAO53JBLSqLFt") }
          },
          {
            id: "grupo-dia-sin-mangas-mobile",
            title: "Día Sin Mangas",
            preview: "/previews/wallpapers/grupo-dia-sin-mangas-mobile.webp",
            accent: "#9a7dff",
            png: { fileId: "grupo-dia-sin-mangas-mobile-png", url: drive("1ZCtx4wGv12r77IE4k2SCgXVkzBThZKT7") }
          }
        ]
      }
    ]
  }
];

/** Todos los fileId de descarga, para precargar contadores en un solo fetch. */
export const allDownloadIds: string[] = wallpaperCategories.flatMap((category) =>
  category.groups.flatMap((group) =>
    group.wallpapers.flatMap((wallpaper) =>
      [wallpaper.png.fileId, wallpaper.mp4?.fileId].filter((id): id is string => Boolean(id))
    )
  )
);

// === Modelo unificado para filtros (personaje × tipo) ===
// La página /descargas filtra por personaje y por tipo (Wallpapers / Skins).
// Para eso aplanamos los wallpaper categories existentes y sumamos las skins,
// etiquetando cada pieza con personaje, tipo y orientación. NO reescribe los
// datos de arriba; los deriva.

export type DownloadType = "wallpaper" | "skin";
export type DownloadOrientation = "desktop" | "mobile";

export type DownloadItem = {
  id: string;
  character: string;
  type: DownloadType;
  orientation: DownloadOrientation;
  /** Subcategoría temática (p. ej. la línea de skins "sylvalis-cafe"). */
  subcategory?: string;
  title: string;
  preview: string;
  accent: string;
  png: WallpaperDownload;
  mp4?: WallpaperDownload;
};

/** Orden canónico de personajes en la página y en el filtro. */
export const characterOrder = ["Rubí", "Yuki", "Lyzi", "Aria", "Grupo"];

/** Acento de color por personaje (para destacar el filtro activo). */
export const characterAccents: Record<string, string> = {
  Rubí: "#c84b4b",
  Yuki: "#8bc6df",
  Lyzi: "#a77aff",
  Aria: "#9ccce8",
  Grupo: "#9a7dff"
};

// Skins — línea "Sylvalis Café" (cada skin es PNG, con variante desktop y mobile).
export const skinItems: DownloadItem[] = [
  {
    id: "rubi-volcanic-parfait-desktop",
    character: "Rubí",
    type: "skin",
    orientation: "desktop",
    subcategory: "sylvalis-cafe",
    title: "Volcanic Parfait",
    preview: "/previews/wallpapers/skins/rubi-volcanic-parfait-desktop.webp",
    accent: "#c84b4b",
    png: { fileId: "rubi-volcanic-parfait-desktop-png", url: drive("1n8BW8pP5c6Jk9d5FxI_kIl6WuxiesNAW") }
  },
  {
    id: "rubi-volcanic-parfait-mobile",
    character: "Rubí",
    type: "skin",
    orientation: "mobile",
    subcategory: "sylvalis-cafe",
    title: "Volcanic Parfait",
    preview: "/previews/wallpapers/skins/rubi-volcanic-parfait-mobile.webp",
    accent: "#c84b4b",
    png: { fileId: "rubi-volcanic-parfait-mobile-png", url: drive("1nm5z6HK1GkEcvjlXzg_g0eHkXt98l-6C") }
  },
  {
    id: "yuki-royal-dessert-desktop",
    character: "Yuki",
    type: "skin",
    orientation: "desktop",
    subcategory: "sylvalis-cafe",
    title: "Royal Dessert",
    preview: "/previews/wallpapers/skins/yuki-royal-dessert-desktop.webp",
    accent: "#8bc6df",
    png: { fileId: "yuki-royal-dessert-desktop-png", url: drive("16fBoXp9q84Pe7MCur_SBTHuIHtoCD3Qc") }
  },
  {
    id: "yuki-royal-dessert-mobile",
    character: "Yuki",
    type: "skin",
    orientation: "mobile",
    subcategory: "sylvalis-cafe",
    title: "Royal Dessert",
    preview: "/previews/wallpapers/skins/yuki-royal-dessert-mobile.webp",
    accent: "#8bc6df",
    png: { fileId: "yuki-royal-dessert-mobile-png", url: drive("1OiHpMJ1SFM-rYo8U6q2ZNO-4Ax6jZQLr") }
  },
  {
    id: "lyzi-mystical-sweetness-desktop",
    character: "Lyzi",
    type: "skin",
    orientation: "desktop",
    subcategory: "sylvalis-cafe",
    title: "Mystical Sweetness",
    preview: "/previews/wallpapers/skins/lyzi-mystical-sweetness-desktop.webp",
    accent: "#a77aff",
    png: { fileId: "lyzi-mystical-sweetness-desktop-png", url: drive("12xuuUieJDUQVQO138bJqFJmsAJVrWluX") }
  },
  {
    id: "lyzi-mystical-sweetness-mobile",
    character: "Lyzi",
    type: "skin",
    orientation: "mobile",
    subcategory: "sylvalis-cafe",
    title: "Mystical Sweetness",
    preview: "/previews/wallpapers/skins/lyzi-mystical-sweetness-mobile.webp",
    accent: "#a77aff",
    png: { fileId: "lyzi-mystical-sweetness-mobile-png", url: drive("1l_bTSClzLcfRHVGvxaw93YWfdimnlkkp") }
  },
  {
    id: "aria-sweet-bite-desktop",
    character: "Aria",
    type: "skin",
    orientation: "desktop",
    subcategory: "velamentum-cafe",
    title: "Sweet Bite",
    preview: "/previews/wallpapers/skins/aria-sweet-bite-desktop.webp",
    accent: "#9ccce8",
    png: { fileId: "aria-sweet-bite-desktop-png", url: drive("1wjF8POAv9TbrUhHYpNwKWA2xKllU2Ul6") }
  },
  {
    id: "aria-sweet-bite-mobile",
    character: "Aria",
    type: "skin",
    orientation: "mobile",
    subcategory: "velamentum-cafe",
    title: "Sweet Bite",
    preview: "/previews/wallpapers/skins/aria-sweet-bite-mobile.webp",
    accent: "#9ccce8",
    png: { fileId: "aria-sweet-bite-mobile-png", url: drive("1Lf8qlIpMK2RsG_kXOMA368iXqBTP0MPI") }
  }
];

// Wallpapers existentes aplanados a DownloadItem (orientación = layout de la categoría).
const wallpaperItems: DownloadItem[] = wallpaperCategories.flatMap((category) =>
  category.groups.flatMap((group) =>
    group.wallpapers.map((wallpaper) => ({
      id: wallpaper.id,
      character: group.character,
      type: "wallpaper" as const,
      orientation: category.layout,
      title: wallpaper.title,
      preview: wallpaper.preview,
      accent: wallpaper.accent,
      png: wallpaper.png,
      mp4: wallpaper.mp4
    }))
  )
);

/** Catálogo completo de descargas (wallpapers + skins) para el navegador con filtros. */
export const downloadItems: DownloadItem[] = [...wallpaperItems, ...skinItems];
