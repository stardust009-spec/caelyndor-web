"use client";

import { useEffect, useState } from "react";

export type StoryStats = {
  views: number;
  liked: boolean;
};

const statsStorageKey = "caelyndor.story-stats.v1";
const viewedSessionPrefix = "caelyndor.story-viewed.";

const emptyStats: StoryStats = { views: 0, liked: false };

function readAllStats(): Record<string, StoryStats> {
  try {
    const stored = window.localStorage.getItem(statsStorageKey);
    return stored ? (JSON.parse(stored) as Record<string, StoryStats>) : {};
  } catch {
    return {};
  }
}

function persistStats(slug: string, stats: StoryStats) {
  try {
    const all = readAllStats();
    all[slug] = stats;
    window.localStorage.setItem(statsStorageKey, JSON.stringify(all));
  } catch {
    // localStorage no disponible (modo privado estricto): los contadores viven solo en memoria.
  }
}

export function useStoryStats(slug: string, registerView = false) {
  const [stats, setStats] = useState<StoryStats>(emptyStats);

  useEffect(() => {
    let current = readAllStats()[slug] ?? emptyStats;

    if (registerView) {
      const sessionKey = viewedSessionPrefix + slug;
      let alreadyViewed = false;
      try {
        alreadyViewed = window.sessionStorage.getItem(sessionKey) !== null;
        window.sessionStorage.setItem(sessionKey, "1");
      } catch {
        alreadyViewed = true;
      }

      if (!alreadyViewed) {
        current = { ...current, views: current.views + 1 };
        persistStats(slug, current);
      }
    }

    setStats(current);
  }, [slug, registerView]);

  function toggleLike() {
    const next = { views: stats.views, liked: !stats.liked };
    persistStats(slug, next);
    setStats(next);
  }

  return { ...stats, toggleLike };
}
