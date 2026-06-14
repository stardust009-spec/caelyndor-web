"use client";

import { useMemo } from "react";
import { PauseIcon, PlayIcon } from "@/components/MusicIcons";
import { useMusicPlayer } from "@/components/MusicPlayerContext";
import type { StoryPlaylist as StoryPlaylistData } from "@/data/stories";

export function StoryPlaylist({ playlist }: { playlist: StoryPlaylistData }) {
  const { tracks, currentTrack, isPlaying, playCollection, togglePlay } = useMusicPlayer();

  // Resuelve los IDs a temas reales, en el orden indicado, descartando los que falten.
  const collection = useMemo(() => {
    const byId = new Map(tracks.map((track) => [track.id, track]));
    return playlist.trackIds
      .map((id) => byId.get(id))
      .filter((track): track is (typeof tracks)[number] => Boolean(track));
  }, [tracks, playlist.trackIds]);

  if (collection.length === 0) {
    return null;
  }

  const isActiveCollection = currentTrack
    ? playlist.trackIds.includes(currentTrack.id)
    : false;
  const isActivePlaying = isActiveCollection && isPlaying;

  function handleClick() {
    if (isActiveCollection) {
      togglePlay();
      return;
    }
    playCollection(collection);
  }

  const buttonLabel = isActivePlaying
    ? "Pausar la bruma"
    : isActiveCollection
      ? "Reanudar la bruma"
      : playlist.buttonLabel;

  return (
    <aside className="story-playlist" aria-label="Banda sonora del relato">
      <p className="story-playlist__ornament" aria-hidden="true">
        🌙
      </p>
      <p className="story-playlist__heading">{playlist.heading}</p>
      <p className="story-playlist__note">{playlist.note}</p>
      <button
        className={`story-playlist__button${isActivePlaying ? " story-playlist__button--playing" : ""}`}
        type="button"
        onClick={handleClick}
      >
        {isActivePlaying ? <PauseIcon size={16} /> : <PlayIcon size={16} />}
        <span>{buttonLabel}</span>
      </button>
      {isActiveCollection && currentTrack ? (
        <p className="story-playlist__now" aria-live="polite">
          {isPlaying ? "Sonando" : "En pausa"}: {currentTrack.title.replace(/^Caelyndor — /, "")}
        </p>
      ) : null}
    </aside>
  );
}
