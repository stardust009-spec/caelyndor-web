"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { currentTrack } from "@/data/assets";

export function FloatingLyziPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.55);
  const [hasError, setHasError] = useState(false);

  async function togglePlayback() {
    const audio = audioRef.current;

    if (!audio || hasError) {
      return;
    }

    try {
      if (audio.paused) {
        audio.volume = volume;
        await audio.play();
        setIsPlaying(true);
      } else {
        audio.pause();
        setIsPlaying(false);
      }
    } catch {
      setHasError(true);
      setIsPlaying(false);
    }
  }

  function handleVolumeChange(value: string) {
    const nextVolume = Number(value);
    setVolume(nextVolume);

    if (audioRef.current) {
      audioRef.current.volume = nextVolume;
    }
  }

  return (
    <aside
      className={`floating-lyzi ${isOpen ? "floating-lyzi--open" : ""}`}
      aria-label="Widget musical de Lyzi"
    >
      <audio
        ref={audioRef}
        loop
        preload="none"
        src={currentTrack.src}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
        onError={() => {
          setHasError(true);
          setIsPlaying(false);
        }}
      />
      <div className="floating-lyzi__peek" aria-hidden="true">
        <Image
          className="floating-lyzi__peek-image"
          src="/images/ui/lyzi-chibi-peek.png"
          alt=""
          width={577}
          height={515}
          loading="lazy"
        />
      </div>
      <button
        className="floating-lyzi__bubble"
        type="button"
        aria-expanded={isOpen}
        aria-controls="floating-lyzi-panel"
        aria-label={isOpen ? "Cerrar Susurro de Sylvalis" : "Abrir Susurro de Sylvalis"}
        onClick={() => setIsOpen((value) => !value)}
      >
        Susurro de Sylvalis
      </button>
      <div
        className={`floating-lyzi__panel ${
          isOpen ? "floating-lyzi__panel--open" : "floating-lyzi__panel--closed"
        }`}
        id="floating-lyzi-panel"
        aria-hidden={!isOpen}
      >
        <p className="floating-lyzi__label">Sonando ahora</p>
        <p className="floating-lyzi__title">{currentTrack.title}</p>
        <div className="floating-lyzi__controls">
          <button
            className="floating-lyzi__play"
            type="button"
            aria-label={isPlaying ? "Pausar musica" : "Reproducir musica"}
            disabled={hasError}
            onClick={togglePlayback}
          >
            <span aria-hidden="true">{isPlaying ? "Ⅱ" : "▶"}</span>
          </button>
          <label className="floating-lyzi__volume">
            <span>Volumen</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(event) => handleVolumeChange(event.target.value)}
            />
          </label>
        </div>
        {hasError ? (
          <p className="floating-lyzi__error">Audio no disponible por ahora.</p>
        ) : null}
      </div>
    </aside>
  );
}
