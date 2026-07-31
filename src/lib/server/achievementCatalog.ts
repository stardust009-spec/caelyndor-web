import { CategoriaLogro } from "@/generated/prisma/client";
import type { StoryMeta } from "./storyContent";
import type { StoryRegion } from "@/data/stories";

/**
 * Contexto con el que se evalúa CADA condición de logro. Se construye en
 * servidor a partir de la BD + el contenido real; nunca de datos del cliente.
 */
export type LogroContexto = {
  /** Slugs canónicos completados por el usuario. */
  completadosCanonicos: ReadonlySet<string>;
  /** Todos los slugs completados (incluye no canónicos, p. ej. anexos). */
  completadosTodos: ReadonlySet<string>;
  /** Relatos distintos que el usuario ha releído al menos una vez. */
  relatosReleidos: number;
  /** true si completó el Ritual de Afinación (test de Senda). */
  ritualCompletado: boolean;
  /** true si ya eligió su Habilidad Única. */
  huElegida: boolean;
  /** Metadata de contenido: slug -> StoryMeta. */
  historias: ReadonlyMap<string, StoryMeta>;
};

export type LogroDef = {
  /** id estable en BD (= slug). */
  slug: string;
  title: string;
  description: string;
  category: CategoriaLogro;
  condition: (ctx: LogroContexto) => boolean;
};

/**
 * Arco narrativo del logro "No dejaste a nadie atrás".
 * TODO(contenido): fijar cuando los relatos tengan `arc` asignado en stories.ts.
 */
export const ARCO_NO_DEJASTE_A_NADIE: string | null = null;

function completadosDeRegion(ctx: LogroContexto, region: StoryRegion): { total: number; completados: number } {
  let total = 0;
  let completados = 0;
  for (const meta of ctx.historias.values()) {
    if (meta.region === region && meta.canonical) {
      total += 1;
      if (ctx.completadosCanonicos.has(meta.slug)) {
        completados += 1;
      }
    }
  }
  return { total, completados };
}

function todosDeRegion(region: StoryRegion) {
  return (ctx: LogroContexto) => {
    const { total, completados } = completadosDeRegion(ctx, region);
    return total > 0 && completados === total;
  };
}

function progresion(minimo: number) {
  return (ctx: LogroContexto) => ctx.completadosCanonicos.size >= minimo;
}

export const ACHIEVEMENT_CATALOG: readonly LogroDef[] = [
  // ——— Progresión general ———
  {
    slug: "primera-chispa",
    title: "Primera chispa",
    description: "Tu Aura respondió por primera vez: completaste un relato.",
    category: CategoriaLogro.PROGRESION,
    condition: progresion(1)
  },
  {
    slug: "el-aura-responde",
    title: "El Aura responde",
    description: "Cinco relatos completados; la resonancia ya no es casualidad.",
    category: CategoriaLogro.PROGRESION,
    condition: progresion(5)
  },
  {
    slug: "discipulo-de-las-cronicas",
    title: "Discípulo de las Crónicas",
    description: "Diez relatos completados.",
    category: CategoriaLogro.PROGRESION,
    condition: progresion(10)
  },
  {
    slug: "despertar-interior",
    title: "Despertar interior",
    description: "Veinticinco relatos completados: tu Aura interna está lista para la Prueba.",
    category: CategoriaLogro.PROGRESION,
    condition: progresion(25)
  },
  {
    slug: "entre-mundos-y-paginas",
    title: "Entre mundos y páginas",
    description: "Cincuenta relatos completados.",
    category: CategoriaLogro.PROGRESION,
    condition: progresion(50)
  },
  {
    slug: "maestro-de-las-cronicas",
    title: "Maestro de las Crónicas",
    description: "Cien relatos completados.",
    category: CategoriaLogro.PROGRESION,
    condition: progresion(100)
  },
  {
    slug: "cronista-de-caelyndor",
    title: "Cronista de Caelyndor",
    description:
      "Todos los relatos canónicos disponibles, leídos. Cada relato nuevo vuelve a poner esta meta en juego.",
    category: CategoriaLogro.PROGRESION,
    condition: (ctx) => {
      let totalCanonicos = 0;
      for (const meta of ctx.historias.values()) {
        if (meta.canonical) totalCanonicos += 1;
      }
      return totalCanonicos > 0 && ctx.completadosCanonicos.size >= totalCanonicos;
    }
  },

  // ——— Por universo/región ———
  {
    slug: "bajo-el-sol-de-cindralith",
    title: "Bajo el sol de Cindralith",
    description: "Todos los relatos de Cindralith completados.",
    category: CategoriaLogro.UNIVERSO,
    condition: todosDeRegion("cindralith")
  },
  {
    slug: "corazon-de-hielo",
    title: "Corazón de hielo",
    description: "Todos los relatos de Glaciem completados.",
    category: CategoriaLogro.UNIVERSO,
    condition: todosDeRegion("glaciem")
  },
  {
    slug: "el-bosque-recuerda-tu-nombre",
    title: "El bosque recuerda tu nombre",
    description: "Todos los relatos de Sylvalis completados.",
    category: CategoriaLogro.UNIVERSO,
    condition: todosDeRegion("sylvalis")
  },
  {
    slug: "tras-el-velo",
    title: "Tras el Velo",
    description: "Encontraste y completaste un relato secreto.",
    category: CategoriaLogro.UNIVERSO,
    condition: (ctx) => {
      for (const slug of ctx.completadosTodos) {
        if (ctx.historias.get(slug)?.secret) return true;
      }
      return false;
    }
  },
  {
    slug: "cartografo-de-caelyndor",
    title: "Cartógrafo de Caelyndor",
    description: "Al menos un relato completado de cada región de Caelyndor.",
    category: CategoriaLogro.UNIVERSO,
    condition: (ctx) => {
      const regiones = new Set<StoryRegion>();
      const visitadas = new Set<StoryRegion>();
      for (const meta of ctx.historias.values()) {
        if (!meta.region) continue;
        regiones.add(meta.region);
        if (ctx.completadosTodos.has(meta.slug)) {
          visitadas.add(meta.region);
        }
      }
      return regiones.size > 0 && visitadas.size === regiones.size;
    }
  },

  // ——— Por conducta ———
  {
    slug: "no-dejaste-a-nadie-atras",
    title: "No dejaste a nadie atrás",
    description: "Completaste todos los relatos de un arco.",
    category: CategoriaLogro.CONDUCTA,
    condition: (ctx) => {
      if (!ARCO_NO_DEJASTE_A_NADIE) return false;
      let total = 0;
      let completados = 0;
      for (const meta of ctx.historias.values()) {
        if (meta.arc === ARCO_NO_DEJASTE_A_NADIE) {
          total += 1;
          if (ctx.completadosTodos.has(meta.slug)) completados += 1;
        }
      }
      return total > 0 && completados === total;
    }
  },
  {
    slug: "oyente-de-ecos",
    title: "Oyente de ecos",
    description: "Releíste cinco relatos: los ecos también cuentan historias.",
    category: CategoriaLogro.CONDUCTA,
    condition: (ctx) => ctx.relatosReleidos >= 5
  },
  {
    slug: "a-la-luz-de-la-luna",
    title: "A la luz de la luna",
    description: "Completaste un relato nocturno.",
    category: CategoriaLogro.CONDUCTA,
    condition: (ctx) => {
      for (const slug of ctx.completadosTodos) {
        if (ctx.historias.get(slug)?.nocturnal) return true;
      }
      return false;
    }
  },
  {
    slug: "testigo-silencioso",
    title: "Testigo silencioso",
    description: "Encontraste una escena que no todos ven.",
    category: CategoriaLogro.CONDUCTA,
    // TODO(fase siguiente): requiere un evento de cliente específico (escena
    // oculta) aún por definir; hasta entonces la condición nunca se cumple.
    condition: () => false
  },
  {
    slug: "ritual-de-afinacion",
    title: "Ritual de Afinación",
    description: "El cristal leyó tu Aura: completaste el test de Senda.",
    category: CategoriaLogro.CONDUCTA,
    condition: (ctx) => ctx.ritualCompletado
  },
  {
    slug: "el-don-despierta",
    title: "El don despierta",
    description: "Tu Habilidad Única se reveló ante ti.",
    category: CategoriaLogro.CONDUCTA,
    condition: (ctx) => ctx.huElegida
  }
];
