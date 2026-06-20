"use client";

import Image from "next/image";
import Link from "next/link";
import { PauseIcon, PlayIcon } from "@/components/MusicIcons";
import { FALLBACK_MUSIC_COVER, useMusicPlayer } from "@/components/MusicPlayerContext";
import { ShareButton } from "@/components/ShareButton";
import { trackShareDescription, type MusicTrack } from "@/data/music";

type SharedTrackProps = {
  track: MusicTrack;
  shareSlug: string;
};

export function SharedTrack({ track, shareSlug }: SharedTrackProps) {
  const { currentTrack, isPlaying, handleToggle } = useMusicPlayer();
  const isActive = currentTrack?.id === track.id;
  const isThisPlaying = isActive && isPlaying;
  const cover = track.coverImage ?? FALLBACK_MUSIC_COVER;
  const artist = track.artist ?? "Caelyndor";
  const description = track.description ?? track.subtitle;

  return (
    <article className="shared-track">
      <div className="shared-track__cover">
        <Image
          src={cover}
          alt={track.coverImage ? `Carátula de ${track.title}` : `Carátula no disponible para ${track.title}`}
          fill
          sizes="(max-width: 760px) 80vw, 360px"
          priority
          onError={(event) => {
            event.currentTarget.src = FALLBACK_MUSIC_COVER;
            event.currentTarget.alt = `Carátula no disponible para ${track.title}`;
          }}
        />
      </div>

      <div className="shared-track__body">
        <p className="eyebrow">Crónicas de Caelyndor</p>
        <h1>{track.title}</h1>
        <p className="shared-track__meta">
          {artist}
          {track.album ? <span className="shared-track__album"> · {track.album}</span> : null}
        </p>
        {description ? <p className="shared-track__description">{description}</p> : null}

        <div className="shared-track__actions">
          <button
            className="shared-track__play"
            type="button"
            onClick={() => handleToggle(track)}
            aria-pressed={isThisPlaying}
          >
            {isThisPlaying ? <PauseIcon size={18} /> : <PlayIcon size={18} />}
            <span>{isThisPlaying ? "Pausar" : "Reproducir"}</span>
          </button>
          <ShareButton
            className="shared-track__share"
            shareSlug={shareSlug}
            title={track.title}
            description={trackShareDescription(track)}
            label="Compartir"
          />
          <Link className="shared-track__back" href="/musica">
            Volver a Música
          </Link>
        </div>
      </div>
    </article>
  );
}
