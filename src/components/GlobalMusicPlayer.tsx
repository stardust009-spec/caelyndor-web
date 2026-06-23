"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  HeartIcon,
  ListMusicIcon,
  PauseIcon,
  PlayIcon,
  RepeatIcon,
  RepeatOneIcon,
  ShuffleIcon,
  SkipBackIcon,
  SkipForwardIcon,
  Volume2Icon,
  VolumeXIcon,
  XIcon
} from "@/components/MusicIcons";
import {
  FALLBACK_MUSIC_COVER,
  getPlayerTheme,
  useMusicPlayer,
  type RepeatMode
} from "@/components/MusicPlayerContext";

type OpenPanel = "volume" | "queue" | null;

function formatTime(value: number) {
  if (!Number.isFinite(value)) {
    return "0:00";
  }

  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60)
    .toString()
    .padStart(2, "0");

  return `${minutes}:${seconds}`;
}

function getRepeatLabel(repeatMode: RepeatMode) {
  if (repeatMode === "all") {
    return "Repetir todo";
  }

  if (repeatMode === "one") {
    return "Repetir canción actual";
  }

  return "Repetición desactivada";
}

export function GlobalMusicPlayer() {
  const pathname = usePathname();
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    likedTracks,
    queue,
    queueTracks,
    shuffle,
    repeatMode,
    hasPrevious,
    hasNext,
    togglePlay,
    playNext,
    playPrevious,
    handleSeek,
    handleLike,
    removeFromQueue,
    clearQueue,
    queuePromptVisible,
    acceptQueueRefill,
    dismissQueueRefill,
    setVolume,
    toggleShuffle,
    cycleRepeatMode
  } = useMusicPlayer();

  const volumePanelRef = useRef<HTMLDivElement>(null);
  const queuePanelRef = useRef<HTMLDivElement>(null);
  const [openPanel, setOpenPanel] = useState<OpenPanel>(null);

  const isVisible = Boolean(currentTrack) && pathname !== "/";

  useEffect(() => {
    document.body.classList.toggle("has-music-player", isVisible);
    return () => {
      document.body.classList.remove("has-music-player");
    };
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) {
      setOpenPanel(null);
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenPanel(null);
      }
    }

    function handlePointerDown(event: PointerEvent) {
      const target = event.target as Node;

      if (openPanel && !volumePanelRef.current?.contains(target) && !queuePanelRef.current?.contains(target)) {
        setOpenPanel(null);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [isVisible, openPanel]);

  if (!isVisible || !currentTrack) {
    return null;
  }

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  const isMuted = volume === 0;
  const currentLiked = likedTracks[currentTrack.id] ?? false;
  const currentPlayerTheme = getPlayerTheme(currentTrack);

  return (
    <aside
      className={`music-player${currentPlayerTheme !== "default" ? ` music-player--${currentPlayerTheme} music-player--themed` : ""}`}
      aria-label="Reproductor de música"
    >
      {queuePromptVisible ? (
        <div className="music-player__refill" role="alertdialog" aria-label="La cola de reproducción terminó">
          <p>La cola llegó a su fin. ¿Seguimos con más?</p>
          <div className="music-player__refill-actions">
            <button
              className="music-player__refill-yes"
              type="button"
              onClick={acceptQueueRefill}
              aria-label="Sí, agregar 10 temas aleatorios a la cola"
            >
              O
            </button>
            <button
              className="music-player__refill-no"
              type="button"
              onClick={dismissQueueRefill}
              aria-label="No agregar más temas"
            >
              ✕
            </button>
          </div>
        </div>
      ) : null}
      <span className="music-player__motes" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </span>
      <div className="music-player__track">
        <span className="music-player__cover" aria-hidden="true">
          <Image
            src={currentTrack.coverImage ?? FALLBACK_MUSIC_COVER}
            alt={currentTrack.coverImage ? `Carátula de ${currentTrack.title}` : `Carátula no disponible para ${currentTrack.title}`}
            fill
            sizes="52px"
            onError={(event) => {
              event.currentTarget.src = FALLBACK_MUSIC_COVER;
              event.currentTarget.alt = `Carátula no disponible para ${currentTrack.title}`;
            }}
          />
        </span>
        <span>
          <strong>{currentTrack.title}</strong>
          <small>Crónicas de Caelyndor</small>
        </span>
      </div>

      <div className="music-player__controls">
        <div className="music-player__buttons">
          <button
            className={shuffle ? "music-player__button music-player__button--active" : "music-player__button"}
            type="button"
            onClick={toggleShuffle}
            aria-label={shuffle ? "Desactivar reproducción aleatoria" : "Activar reproducción aleatoria"}
            aria-pressed={shuffle}
          >
            <ShuffleIcon size={17} />
          </button>
          <button className="music-player__button" type="button" onClick={playPrevious} disabled={!hasPrevious} aria-label="Canción anterior">
            <SkipBackIcon size={17} />
          </button>
          <button
            className="music-player__button music-player__primary"
            type="button"
            onClick={togglePlay}
            aria-label={isPlaying ? "Pausar canción actual" : "Reproducir canción actual"}
            aria-pressed={isPlaying}
          >
            {isPlaying ? <PauseIcon size={18} /> : <PlayIcon size={18} />}
          </button>
          <button className="music-player__button" type="button" onClick={() => playNext({ countPlay: true })} disabled={!hasNext} aria-label="Canción siguiente">
            <SkipForwardIcon size={17} />
          </button>
          <button
            className={repeatMode !== "off" ? "music-player__button music-player__button--active" : "music-player__button"}
            type="button"
            onClick={cycleRepeatMode}
            aria-label={getRepeatLabel(repeatMode)}
            aria-pressed={repeatMode !== "off"}
          >
            {repeatMode === "one" ? <RepeatOneIcon size={17} /> : <RepeatIcon size={17} />}
          </button>
        </div>
        <div className="music-player__timeline">
          <span>{formatTime(currentTime)}</span>
          <span className="music-player__progress-rail" style={{ "--track-progress": `${progress}%` } as CSSProperties}>
            <span className="music-player__progress-fill" />
            <input
              className="music-player__progress-input"
              type="range"
              min="0"
              max={duration || 0}
              step="0.1"
              value={currentTime}
              onChange={(event) => handleSeek(event.target.value)}
              aria-label="Progreso de la canción"
            />
          </span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <div className="music-player__utilities">
        <button
          className={currentLiked ? "music-player__button music-player__utility music-player__button--active" : "music-player__button music-player__utility"}
          type="button"
          onClick={() => handleLike(currentTrack.id)}
          aria-label={currentLiked ? `Quitar me gusta de ${currentTrack.title}` : `Dar me gusta a ${currentTrack.title}`}
          aria-pressed={currentLiked}
        >
          <HeartIcon size={17} />
        </button>
        <div className="music-player__panel-anchor" ref={volumePanelRef}>
          <button
            className={openPanel === "volume" || volume < 1 ? "music-player__button music-player__utility music-player__button--active-soft" : "music-player__button music-player__utility"}
            type="button"
            onClick={() => setOpenPanel((current) => (current === "volume" ? null : "volume"))}
            aria-label="Abrir volumen"
            aria-expanded={openPanel === "volume"}
          >
            {isMuted ? <VolumeXIcon size={17} /> : <Volume2Icon size={17} />}
          </button>
          {openPanel === "volume" ? (
            <div className="music-player__popover music-player__popover--volume" aria-label="Control de volumen">
              <span className="music-player__volume-rail" style={{ "--volume-progress": `${volume * 100}%` } as CSSProperties}>
                <span className="music-player__volume-fill" />
                <input
                  className="music-player__volume-slider-vertical"
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={(event) => setVolume(Number(event.target.value))}
                  aria-label="Volumen"
                />
              </span>
            </div>
          ) : null}
        </div>

        <div className="music-player__panel-anchor" ref={queuePanelRef}>
          <button
            className={queue.length > 0 || openPanel === "queue" ? "music-player__button music-player__utility music-player__button--active-soft" : "music-player__button music-player__utility"}
            type="button"
            onClick={() => setOpenPanel((current) => (current === "queue" ? null : "queue"))}
            aria-label="Abrir cola de reproducción"
            aria-expanded={openPanel === "queue"}
          >
            <ListMusicIcon size={17} />
            {queue.length > 0 ? <span className="music-player__queue-count">{queue.length}</span> : null}
          </button>
          {openPanel === "queue" ? (
            <div className="music-player__popover music-player__popover--queue">
              <div className="music-player__popover-head">
                <strong>Cola</strong>
                {queueTracks.length > 0 ? (
                  <button className="music-player__clear-queue" type="button" onClick={clearQueue}>
                    Limpiar cola
                  </button>
                ) : null}
                <button type="button" onClick={() => setOpenPanel(null)} aria-label="Cerrar cola">
                  <XIcon size={15} />
                </button>
              </div>
              <div className="music-player__queue-section">
                <span className="music-player__queue-label">Sonando ahora</span>
                <div className="music-player__queue-item music-player__queue-item--active">
                  <span className="music-player__queue-cover" aria-hidden="true">
                    <Image
                      src={currentTrack.coverImage ?? FALLBACK_MUSIC_COVER}
                      alt=""
                      fill
                      sizes="38px"
                      onError={(event) => {
                        event.currentTarget.src = FALLBACK_MUSIC_COVER;
                      }}
                    />
                  </span>
                  <span>
                    <strong>{currentTrack.title}</strong>
                    <small>Crónicas de Caelyndor</small>
                  </span>
                </div>
              </div>
              {queueTracks.length > 0 ? (
                <div className="music-player__queue-section">
                  <span className="music-player__queue-label">Siguiente</span>
                  <div className="music-player__queue-list">
                    {queueTracks.map((track) => (
                      <div className={track.id === currentTrack.id ? "music-player__queue-item music-player__queue-item--active" : "music-player__queue-item"} key={track.id}>
                        <span className="music-player__queue-cover" aria-hidden="true">
                          <Image
                            src={track.coverImage ?? FALLBACK_MUSIC_COVER}
                            alt=""
                            fill
                            sizes="38px"
                            onError={(event) => {
                              event.currentTarget.src = FALLBACK_MUSIC_COVER;
                            }}
                          />
                        </span>
                        <span>
                          <strong>{track.title}</strong>
                          <small>Crónicas de Caelyndor</small>
                        </span>
                        <button type="button" onClick={() => removeFromQueue(track.id)} aria-label={`Quitar ${track.title} de la cola`}>
                          <XIcon size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="music-player__empty-queue">La cola está vacía.</p>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </aside>
  );
}
