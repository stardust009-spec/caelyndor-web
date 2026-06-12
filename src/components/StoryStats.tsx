"use client";

import { EyeIcon, HeartIcon } from "@/components/MusicIcons";
import { useStoryStats } from "@/components/useStoryStats";

type StoryStatsProps = {
  slug: string;
  title: string;
  registerView?: boolean;
};

export function StoryStats({ slug, title, registerView = false }: StoryStatsProps) {
  const { counters, liked, toggleLike } = useStoryStats(slug, registerView);

  return (
    <div className="story-stats">
      <span
        className="story-stats__views"
        aria-label={counters ? `${counters.views} lecturas de ${title}` : `Lecturas de ${title}`}
      >
        <EyeIcon size={14} /> <span>{counters ? counters.views : "–"}</span>
      </span>
      <button
        className={liked ? "story-stats__like story-stats__like--active" : "story-stats__like"}
        type="button"
        onClick={toggleLike}
        aria-label={liked ? `Quitar me gusta de ${title}` : `Dar me gusta a ${title}`}
        aria-pressed={liked}
      >
        <HeartIcon size={13} /> <span>{counters ? counters.likes : "–"}</span>
      </button>
    </div>
  );
}
