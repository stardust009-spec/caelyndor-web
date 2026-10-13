"use client";

import { EyeIcon, HeartIcon } from "@/components/MusicIcons";
import { ShareButton } from "@/components/ShareButton";
import { useStoryStats } from "@/components/useStoryStats";
import { useMisLecturas } from "@/components/useMisLecturas";

type StoryStatsProps = {
  slug: string;
  title: string;
  registerView?: boolean;
  /** Texto descriptivo para compartir (normalmente el teaser del relato). */
  shareDescription?: string;
};

/** ✓✓ si el lector ya completó el relato; — si no. Solo con sesión. */
function MarcaLectura({ slug, title }: { slug: string; title: string }) {
  const lecturas = useMisLecturas();
  if (!lecturas) {
    return null;
  }
  const lectura = lecturas[slug];
  if (lectura?.leido) {
    return (
      <span className="story-stats__leido story-stats__leido--si" title="Ya lo leíste" aria-label={`Ya leíste ${title}`}>
        <svg width="18" height="12" viewBox="0 0 18 12" aria-hidden="true">
          <path d="M1.5 6.5 5 10 11.5 2.5" />
          <path d="M8.3 9 9.3 10 16.5 2.5" />
        </svg>
      </span>
    );
  }
  const progreso = lectura?.progreso ?? 0;
  const pista = progreso > 0 ? `Sin terminar (llegaste al ${progreso} %)` : "Aún no lo lees";
  return (
    <span className="story-stats__leido" title={pista} aria-label={`${title}: ${pista.toLowerCase()}`}>
      —
    </span>
  );
}

export function StoryStats({ slug, title, registerView = false, shareDescription }: StoryStatsProps) {
  const { counters, liked, toggleLike } = useStoryStats(slug, registerView);

  return (
    <div className="story-stats">
      <MarcaLectura slug={slug} title={title} />
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
      <ShareButton
        className="story-stats__share"
        path={`/relatos/${slug}`}
        title={title}
        description={shareDescription}
        label="Compartir"
      />
    </div>
  );
}
