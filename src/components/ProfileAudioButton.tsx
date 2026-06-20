"use client";

import { PauseIcon, PlayIcon } from "@/components/MusicIcons";
import { useMusicPlayer } from "@/components/MusicPlayerContext";
import type { CharacterProfileAudio } from "@/data/characters";
import type { MusicTrack } from "@/data/music";

type ProfileAudioButtonProps = {
  audio: CharacterProfileAudio;
  characterName: string;
  characterSlug: string;
  /** Imagen principal del personaje, usada como portada si el audio no trae una propia. */
  fallbackCover: string;
};

export function ProfileAudioButton({
  audio,
  characterName,
  characterSlug,
  fallbackCover
}: ProfileAudioButtonProps) {
  const { currentTrack, isPlaying, handleToggle } = useMusicPlayer();

  const trackId = `profile-${characterSlug}`;
  const isThisPlaying = currentTrack?.id === trackId && isPlaying;

  // Adapter: convertimos profileAudio al Track del reproductor global existente
  // sin duplicar lógica. Media Session se actualiza solo desde MusicPlayerContext.
  const track: MusicTrack = {
    id: trackId,
    title: audio.title,
    subtitle: audio.subtitle ?? "Caelyndor",
    fileName: audio.src,
    src: audio.src,
    category: "especial",
    coverImage: audio.cover ?? fallbackCover,
    artist: audio.subtitle ?? "Caelyndor",
    album: "Crónicas de personaje",
    description: audio.title,
    shareSlug: `${characterSlug}-profile-summary`,
    related: [characterName]
  };

  return (
    <button
      type="button"
      className="detail-hero__chronicle"
      onClick={() => handleToggle(track)}
      aria-label={`${isThisPlaying ? "Pausar" : "Escuchar"} crónica de ${characterName}`}
      aria-pressed={isThisPlaying}
    >
      <span className="detail-hero__chronicle-icon" aria-hidden="true">
        {isThisPlaying ? <PauseIcon size={14} /> : <PlayIcon size={14} />}
      </span>
      <span>{isThisPlaying ? "Pausar crónica" : "Escuchar crónica"}</span>
    </button>
  );
}
