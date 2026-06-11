import { bestiaryEntries } from "@/data/bestiary";
import { characters } from "@/data/characters";
import { musicTracks } from "@/data/music";

export type GalleryCategory = "Personajes" | "Bestiario" | "Portadas musicales";

export type GalleryItem = {
  id: string;
  title: string;
  category: GalleryCategory;
  image: string;
  alt: string;
};

export const galleryCategories: GalleryCategory[] = [
  "Personajes",
  "Bestiario",
  "Portadas musicales"
];

const characterArt: GalleryItem[] = characters.map((character) => ({
  id: `personaje-${character.slug}`,
  title: character.name,
  category: "Personajes",
  image: character.image,
  alt: `Retrato canónico de ${character.name}`
}));

const bestiaryArt: GalleryItem[] = bestiaryEntries
  .filter((entry) => entry.image)
  .map((entry) => ({
    id: `bestiario-${entry.slug}`,
    title: `${entry.name} — ${entry.epithet}`,
    category: "Bestiario",
    image: entry.image!.src,
    alt: entry.image!.alt
  }));

const seenCovers = new Set<string>();
const coverArt: GalleryItem[] = musicTracks
  .filter((track) => {
    if (!track.coverImage || seenCovers.has(track.coverImage)) {
      return false;
    }
    seenCovers.add(track.coverImage);
    return true;
  })
  .map((track) => ({
    id: `portada-${track.id}`,
    title: track.title,
    category: "Portadas musicales",
    image: track.coverImage!,
    alt: `Portada de ${track.title}`
  }));

export const galleryItems: GalleryItem[] = [...characterArt, ...bestiaryArt, ...coverArt];
