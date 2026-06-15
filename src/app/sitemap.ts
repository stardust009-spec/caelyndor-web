import type { MetadataRoute } from "next";
import { characters } from "@/data/characters";
import { stories } from "@/data/stories";
import { SITE_URL } from "@/lib/site";

// Sitemap dinámico: secciones principales + cada personaje y cada relato.
// Se regenera en cada build, así que las fichas/relatos nuevos entran solos.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const sections: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/personajes`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/relatos`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/libros`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/musica`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/cronologia`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/arte`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/archivo`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/archivo/mundo`, lastModified, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/archivo/sistema-magico`, lastModified, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/archivo/glosario`, lastModified, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/archivo/bestiario`, lastModified, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/nuevo-libro`, lastModified, changeFrequency: "monthly", priority: 0.5 }
  ];

  const characterPages: MetadataRoute.Sitemap = characters.map((character) => ({
    url: `${SITE_URL}/personajes/${character.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.7
  }));

  const storyPages: MetadataRoute.Sitemap = stories.map((story) => ({
    url: `${SITE_URL}/relatos/${story.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.7
  }));

  return [...sections, ...characterPages, ...storyPages];
}
