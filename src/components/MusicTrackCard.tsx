import type { CSSProperties } from "react";
import Image from "next/image";
import { HeartIcon, ListMusicIcon, PauseIcon, PlayIcon } from "@/components/MusicIcons";
import type { MusicTrack } from "@/data/music";

type MusicTrackCardProps = {
  track: MusicTrack;
  isActive: boolean;
  isPlaying: boolean;
  hasError: boolean;
  fallbackCover: string;
  plays: number;
  liked: boolean;
  queued: boolean;
  onToggle: (track: MusicTrack) => void;
  onLike: (trackId: string) => void;
  onQueue: (trackId: string) => void;
};

export function MusicTrackCard({
  track,
  isActive,
  isPlaying,
  hasError,
  fallbackCover,
  plays,
  liked,
  queued,
  onToggle,
  onLike,
  onQueue
}: MusicTrackCardProps) {
  const cover = track.coverImage ?? fallbackCover;

  return (
    <article
      className={`music-card${isActive ? " music-card--active" : ""}${hasError ? " music-card--error" : ""}`}
      style={{ "--track-accent": track.accent ?? "rgba(154, 125, 255, 0.34)" } as CSSProperties}
    >
      <button
        className="music-card__cover-button"
        type="button"
        onClick={() => onToggle(track)}
        aria-label={`${isActive && isPlaying ? "Pausar" : "Reproducir"} ${track.title}`}
        aria-pressed={isActive && isPlaying}
      >
        <span className="music-cover">
          <Image
            src={cover}
            alt={track.coverImage ? `Carátula de ${track.title}` : `Carátula no disponible para ${track.title}`}
            fill
            sizes="(max-width: 760px) 46vw, 210px"
            onError={(event) => {
              event.currentTarget.src = fallbackCover;
              event.currentTarget.alt = `Carátula no disponible para ${track.title}`;
            }}
          />
        </span>
        <span className="music-card__play" aria-hidden="true">
          {isActive && isPlaying ? <PauseIcon size={18} /> : <PlayIcon size={18} />}
        </span>
        {isActive && isPlaying ? <span className="music-card__now">Sonando ahora</span> : null}
      </button>

      <div className="music-card__copy">
        <h3>{track.title}</h3>
        <p>Crónicas de Caelyndor</p>
        <div className="music-card__actions" aria-label={`Acciones para ${track.title}`}>
          <span className="music-card__plays" aria-label={`${plays} reproducciones locales`}>
            <PlayIcon size={12} /> <span>{plays}</span>
          </span>
          <button
            className={liked ? "music-card__action music-card__action--active" : "music-card__action"}
            type="button"
            onClick={() => onLike(track.id)}
            aria-label={liked ? `Quitar me gusta de ${track.title}` : `Dar me gusta a ${track.title}`}
            aria-pressed={liked}
          >
            <HeartIcon size={13} /> <span>{liked ? 1 : 0}</span>
          </button>
          <button
            className={queued ? "music-card__action music-card__action--active" : "music-card__action"}
            type="button"
            onClick={() => onQueue(track.id)}
            aria-label={queued ? `Quitar ${track.title} de la cola` : `Agregar ${track.title} a la cola`}
            aria-pressed={queued}
          >
            <ListMusicIcon size={13} /> <span>{queued ? "En cola" : "Cola"}</span>
          </button>
        </div>
        {hasError ? <p className="music-card__error">No se pudo cargar este archivo.</p> : null}
      </div>
    </article>
  );
}
