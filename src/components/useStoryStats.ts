"use client";

import { useEffect, useState } from "react";

export type StoryCounters = {
  views: number;
  likes: number;
};

const likedStorageKey = "caelyndor.story-liked.v2";
const legacyStatsKey = "caelyndor.story-stats.v1";
const viewedSessionPrefix = "caelyndor.story-viewed.";

function readLikedSlugs(): Record<string, true> {
  try {
    const stored = window.localStorage.getItem(likedStorageKey);
    return stored ? (JSON.parse(stored) as Record<string, true>) : {};
  } catch {
    return {};
  }
}

function persistLiked(slug: string, liked: boolean) {
  try {
    const all = readLikedSlugs();
    if (liked) {
      all[slug] = true;
    } else {
      delete all[slug];
    }
    window.localStorage.setItem(likedStorageKey, JSON.stringify(all));
    window.localStorage.removeItem(legacyStatsKey);
  } catch {
    // localStorage no disponible: el corazón funciona solo durante la visita.
  }
}

// Agrupa las consultas de todas las cards montadas a la vez en un solo fetch.
let batch: Map<string, Array<(counters: StoryCounters) => void>> | null = null;

function requestCounters(slug: string): Promise<StoryCounters> {
  return new Promise((resolve) => {
    if (!batch) {
      batch = new Map();
      window.setTimeout(async () => {
        const current = batch!;
        batch = null;

        let stats: Record<string, StoryCounters> = {};
        try {
          const response = await fetch(
            `/api/story-stats?slugs=${[...current.keys()].join(",")}`
          );
          if (response.ok) {
            stats =
              ((await response.json()) as { stats?: Record<string, StoryCounters> }).stats ?? {};
          }
        } catch {
          // sin red o contadores no configurados: las cards muestran "–"
        }

        current.forEach((resolvers, key) => {
          const counters = stats[key];
          resolvers.forEach((resolver) => resolver(counters ?? { views: -1, likes: -1 }));
        });
      }, 0);
    }

    batch.set(slug, [...(batch.get(slug) ?? []), resolve]);
  });
}

async function sendAction(
  slug: string,
  action: "view" | "like" | "unlike"
): Promise<StoryCounters | null> {
  try {
    const response = await fetch("/api/story-stats", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug, action })
    });
    if (!response.ok) {
      return null;
    }
    const data = (await response.json()) as { stats?: Record<string, StoryCounters> };
    return data.stats?.[slug] ?? null;
  } catch {
    return null;
  }
}

export function useStoryStats(slug: string, registerView = false) {
  const [counters, setCounters] = useState<StoryCounters | null>(null);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLiked(Boolean(readLikedSlugs()[slug]));

    async function load() {
      let registerNow = false;

      if (registerView) {
        const sessionKey = viewedSessionPrefix + slug;
        try {
          registerNow = window.sessionStorage.getItem(sessionKey) === null;
          window.sessionStorage.setItem(sessionKey, "1");
        } catch {
          registerNow = false;
        }
      }

      const result = registerNow
        ? ((await sendAction(slug, "view")) ?? { views: -1, likes: -1 })
        : await requestCounters(slug);

      if (!cancelled && result.views >= 0) {
        setCounters(result);
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [slug, registerView]);

  async function toggleLike() {
    const nextLiked = !liked;
    setLiked(nextLiked);
    persistLiked(slug, nextLiked);
    setCounters((current) =>
      current
        ? { ...current, likes: Math.max(0, current.likes + (nextLiked ? 1 : -1)) }
        : current
    );

    const result = await sendAction(slug, nextLiked ? "like" : "unlike");
    if (result) {
      setCounters(result);
    }
  }

  return { counters, liked, toggleLike };
}
