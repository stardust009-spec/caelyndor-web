// Fondos de pantalla descargables del archivo visual de Caelyndor.
// El preview .webp se sirve localmente desde /public/previews/wallpapers (máx. 800px);
// los archivos pesados (PNG 4K y MP4 animado) se entregan vía descarga directa de Google Drive.
// Cada descarga tiene un `fileId` kebab-case que alimenta el contador global en Redis
// (ver /api/download-stats). El patrón válido es ^[a-z0-9-]{1,120}$.

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

const drive = (id: string) => `https://drive.google.com/uc?export=download&id=${id}`;

export const wallpaperGroups: WallpaperGroup[] = [
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
      }
    ]
  }
];

/** Todos los fileId de descarga, para precargar contadores en un solo fetch. */
export const allDownloadIds: string[] = wallpaperGroups.flatMap((group) =>
  group.wallpapers.flatMap((wallpaper) =>
    [wallpaper.png.fileId, wallpaper.mp4?.fileId].filter((id): id is string => Boolean(id))
  )
);
