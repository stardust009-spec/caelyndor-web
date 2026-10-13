import "server-only";
import { stories, type Story, type StoryRegion } from "@/data/stories";

/** Vista mínima de un relato para la lógica de progresión (sin párrafos). */
export type StoryMeta = {
  slug: string;
  title: string;
  /** true = cuenta para rangos (default cuando el campo falta en stories.ts). */
  canonical: boolean;
  /** Vacío si el relato no tiene región asignada. */
  regions: StoryRegion[];
  arc?: string;
  secret: boolean;
  nocturnal: boolean;
};

function toMeta(story: Story): StoryMeta {
  return {
    slug: story.slug,
    title: story.title,
    canonical: story.countsTowardProgression !== false,
    regions: story.region === undefined ? [] : Array.isArray(story.region) ? story.region : [story.region],
    arc: story.arc,
    secret: story.secret === true,
    nocturnal: story.nocturnal === true
  };
}

let cache: Map<string, StoryMeta> | null = null;

/** Mapa slug -> metadata, derivado del contenido real en src/data/stories.ts. */
export function getStoryMetaMap(): ReadonlyMap<string, StoryMeta> {
  if (!cache) {
    cache = new Map(stories.map((story) => [story.slug, toMeta(story)]));
  }
  return cache;
}

/** Valida que el slug corresponda a un relato que existe de verdad. */
export function storyExists(slug: string): boolean {
  return getStoryMetaMap().has(slug);
}

/** Tiempo estimado de lectura (para la validación del completado). */
export function getStoryReadingMinutes(slug: string): number {
  return stories.find((story) => story.slug === slug)?.readingMinutes ?? 0;
}

/** Slugs de relatos canónicos (los que cuentan para rangos y Cronista). */
export function getCanonicalSlugs(): ReadonlySet<string> {
  const set = new Set<string>();
  for (const meta of getStoryMetaMap().values()) {
    if (meta.canonical) {
      set.add(meta.slug);
    }
  }
  return set;
}
