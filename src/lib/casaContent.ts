import "server-only";
import { musicAlbums } from "@/data/albums";
import { archiveSections } from "@/data/archiveSections";
import { books } from "@/data/books";
import type { CasaContent, CasaLegend } from "@/data/casa";
import { characters } from "@/data/characters";
import { currentBook } from "@/data/currentBook";
import { galleryItems } from "@/data/gallery";
import { glossaryEntries } from "@/data/glossary";
import { musicTracks } from "@/data/music";
import { stories } from "@/data/stories";
import { timelineGroups } from "@/data/timeline";
import { downloadItems } from "@/data/wallpapers";

const PENDIENTE = "El Cronista está reuniendo datos del Velo aún.";

/**
 * Reúne, desde los datos canónicos del portal, todo lo que la casa de Lyzi muestra.
 * Las leyendas citan textos del autor (ficha de Lyzi, relatos, glosario): si esos textos
 * cambian, la casa cambia con ellos. Devuelve sólo campos públicos (sin notas internas).
 */
export function buildCasaContent(): CasaContent {
  const lyzi = characters.find((character) => character.slug === "lyzi");
  const detail = (title: string) => lyzi?.details?.find((item) => item.title === title)?.text ?? PENDIENTE;
  const bond = (name: string) => lyzi?.bonds?.find((item) => item.name === name)?.description ?? PENDIENTE;
  const glossary = (term: string) => glossaryEntries.find((entry) => entry.term === term)?.definition ?? PENDIENTE;

  const story = (slug: string) => stories.find((item) => item.slug === slug);
  const lirios = story("lirios-para-una-sombra");
  const placer = story("el-placer-culpable-de-lyzi");
  const liriosTrack = musicTracks.find((track) => track.id === "lyzi-lirios-para-una-sombra");
  const rincon = placer?.paragraphs.find((paragraph) => paragraph.includes("rincón lleno de plantas húmedas"));

  const legends: Record<string, CasaLegend> = {
    farol: {
      kicker: "El farol de Lyzi",
      title: "Si tú me llamas",
      text: detail("Si tú me llamas"),
      source: "Ficha de Lyzi",
      links: [{ label: "Conocer a Lyzi", href: "/personajes/lyzi" }]
    },
    lirios: {
      kicker: "Lirios oscuros",
      title: lirios?.title ?? "Lirios para una sombra",
      text: lirios?.teaser ?? PENDIENTE,
      source: "Relato",
      links: lirios ? [{ label: "Leer el relato", href: `/relatos/${lirios.slug}` }] : [],
      trackId: liriosTrack?.id
    },
    tronco: {
      kicker: "El tronco hueco",
      title: "Rollito",
      text: bond("Rollito"),
      source: "Vínculos de Lyzi",
      links: []
    },
    ventana: {
      kicker: "La ventana encendida",
      title: "La casita de Lyzi",
      text: placer?.paragraphs[0] ?? PENDIENTE,
      source: placer?.title,
      links: placer ? [{ label: "Leer el relato", href: `/relatos/${placer.slug}` }] : []
    },
    macetero: {
      kicker: "El macetero",
      title: "Ternura sin invasión",
      text: detail("Ternura sin invasión"),
      source: "Ficha de Lyzi",
      links: []
    },
    puerta: {
      kicker: "La puerta",
      title: "Pasa, la casa te esperaba",
      text: lyzi?.identityPhrase ?? PENDIENTE,
      source: "Ficha de Lyzi",
      links: []
    }
  };

  const albums = musicAlbums
    .map((album) => ({
      slug: album.slug,
      title: album.title,
      status: album.status,
      trackIds: album.tracklist.map((item) => item.linkedTrackId).filter((id): id is string => Boolean(id))
    }))
    .filter((album) => album.trackIds.length > 0);

  const lyziTracks = musicTracks
    .filter((track) => /^(Lyzi|Sylvalis)\b/.test(track.title))
    .map((track) => ({ id: track.id, title: track.title, subtitle: track.subtitle, cover: track.coverImage }));

  const portraitOrder = ["personaje-rubi", "personaje-lyzi", "personaje-yuki", "personaje-noctalypse"];
  const gallery = [
    ...portraitOrder.map((id) => galleryItems.find((item) => item.id === id)).filter((item) => item !== undefined),
    ...galleryItems.filter((item) => item.category === "Bestiario").slice(0, 2)
  ].map((item) => ({ id: item.id, title: item.title, image: item.image, href: "/arte" }));

  const downloads = downloadItems
    .filter((item) => item.orientation === "desktop")
    .slice(0, 6)
    .map((item) => ({ id: item.id, title: item.title, image: item.preview, href: "/descargas" }));

  return {
    legends: legends as CasaContent["legends"],
    stories: stories.map((item) => ({
      slug: item.slug,
      title: item.title,
      teaser: item.teaser,
      characters: item.characters,
      minutes: item.readingMinutes,
      color: item.accent
    })),
    characters: characters.map((item) => ({
      slug: item.slug,
      name: item.name,
      title: item.title,
      image: item.image,
      accent: item.accent
    })),
    archive: archiveSections,
    eras: timelineGroups.map((group) => ({ title: group.title, type: group.type })),
    books: [...books]
      .sort((first, second) => first.order - second.order)
      .map((book) => ({ title: book.title, status: book.status, href: "/libros" })),
    albums,
    lyziTracks,
    gallery,
    downloads,
    forja: {
      title: currentBook.title,
      status: currentBook.status,
      progress: currentBook.progress,
      lastUpdate: currentBook.lastUpdate,
      nextMilestone: currentBook.nextMilestone,
      definition: glossary("La Forja")
    },
    mapa: { text: glossary("Sylvalis") },
    rollito: {
      bond: bond("Rollito"),
      quote: rincon ?? PENDIENTE,
      story: placer ? { slug: placer.slug, title: placer.title } : undefined
    },
    archivista: glossary("Curador del Archivo")
  };
}
