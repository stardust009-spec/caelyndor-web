"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import Image from "next/image";
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
import { MusicTrackCard } from "@/components/MusicTrackCard";
import { musicAlbums, type AlbumTrack } from "@/data/albums";
import type { MusicCategory, MusicTrack } from "@/data/music";

type MusicArchiveProps = {
  tracks: MusicTrack[];
};

type MusicFilter = "todos" | MusicCategory;
type MusicTab = "recent" | "top" | "album";
type RepeatMode = "off" | "all" | "one";
type OpenPanel = "volume" | "queue" | null;
type MusicStats = Record<string, { plays: number; liked: boolean }>;
type PlayerTheme = "default" | "carolina" | "yuki" | "rubi" | "lyzi" | "noct";

const filters: { label: string; value: MusicFilter }[] = [
  { label: "Todos", value: "todos" },
  { label: "Personajes", value: "personaje" },
  { label: "Regiones", value: "region" },
  { label: "Dúos", value: "duo" },
  { label: "Arcos", value: "arco" },
  { label: "Especiales", value: "especial" }
];

const musicHeroBanner = "/images/music/cronicas-caelyndor-music-hero.jpg";
export const FALLBACK_MUSIC_COVER = "/images/music-covers/fallback_missing_cover.png";
const statsStorageKey = "caelyndor_music_stats";
const queueStorageKey = "caelyndor_music_queue";
const shuffleStorageKey = "caelyndor_music_shuffle";
const repeatStorageKey = "caelyndor_music_repeat_mode";
const volumeStorageKey = "caelyndor_music_volume";

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

function readJson<T>(key: string, fallback: T): T {
  try {
    const stored = window.localStorage.getItem(key);
    return stored ? (JSON.parse(stored) as T) : fallback;
  } catch {
    return fallback;
  }
}

function readString<T extends string>(key: string, fallback: T, allowed: readonly T[]): T {
  try {
    const stored = window.localStorage.getItem(key);
    return stored && allowed.includes(stored as T) ? (stored as T) : fallback;
  } catch {
    return fallback;
  }
}

function readNumber(key: string, fallback: number) {
  try {
    const stored = window.localStorage.getItem(key);
    const value = stored ? Number(stored) : fallback;
    return Number.isFinite(value) ? value : fallback;
  } catch {
    return fallback;
  }
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

function normalizeTrackTitle(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[¿?()]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function getPlayerTheme(track: MusicTrack | null): PlayerTheme {
  if (!track) {
    return "default";
  }

  const related = track.related ?? [];
  const title = track.title;

  if (related.includes("Carolina Varthalion") || title.includes("Carolina Varthalion")) {
    return "carolina";
  }

  if (related.some((value) => value.includes("Yuki")) || title.includes("Yuki")) {
    return "yuki";
  }

  if (related.some((value) => value.includes("Rubí")) || title.includes("Rubí")) {
    return "rubi";
  }

  if (related.includes("Lyzi") || title.includes("Lyzi")) {
    return "lyzi";
  }

  if (related.includes("Noctalypse") || title.includes("Noctalypse")) {
    return "noct";
  }

  return "default";
}

function createRandomQueue(tracks: MusicTrack[], count = 10, excludeTrackId?: string) {
  const candidates = tracks.filter((track) => track.id !== excludeTrackId);
  const shuffled = [...candidates];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
  }

  return shuffled.slice(0, count).map((track) => track.id);
}

export function MusicArchive({ tracks }: MusicArchiveProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const albumSliderRef = useRef<HTMLDivElement>(null);
  const volumePanelRef = useRef<HTMLDivElement>(null);
  const queuePanelRef = useRef<HTMLDivElement>(null);
  const [currentTrack, setCurrentTrack] = useState<MusicTrack | null>(tracks[0] ?? null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState<MusicTab>("recent");
  const [activeFilter, setActiveFilter] = useState<MusicFilter>("todos");
  const [selectedAlbumSlug, setSelectedAlbumSlug] = useState(musicAlbums[0]?.slug ?? "");
  const [selectedAlbumTrack, setSelectedAlbumTrack] = useState<string | null>(null);
  const [canScrollAlbumLeft, setCanScrollAlbumLeft] = useState(false);
  const [canScrollAlbumRight, setCanScrollAlbumRight] = useState(true);
  const [lyricsTrackKey, setLyricsTrackKey] = useState<string | null>(null);
  const [erroredTracks, setErroredTracks] = useState<Record<string, boolean>>({});
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.82);
  const [stats, setStats] = useState<MusicStats>({});
  const [queue, setQueue] = useState<string[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [shuffle, setShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState<RepeatMode>("off");
  const [openPanel, setOpenPanel] = useState<OpenPanel>(null);
  const [storageReady, setStorageReady] = useState(false);
  const [albumHeroOffset, setAlbumHeroOffset] = useState({ x: 0, y: 0 });

  const trackById = useMemo(() => new Map(tracks.map((track) => [track.id, track])), [tracks]);
  const trackByNormalizedTitle = useMemo(
    () => new Map(tracks.map((track) => [normalizeTrackTitle(track.title), track])),
    [tracks]
  );
  const selectedAlbum = musicAlbums.find((album) => album.slug === selectedAlbumSlug) ?? musicAlbums[0];

  const orderedTracks = useMemo(() => {
    if (activeTab !== "top") {
      return tracks;
    }

    return [...tracks].sort((first, second) => {
      const firstPlays = stats[first.id]?.plays ?? 0;
      const secondPlays = stats[second.id]?.plays ?? 0;
      return secondPlays - firstPlays;
    });
  }, [activeTab, stats, tracks]);

  const filteredTracks = useMemo(() => {
    if (activeFilter === "todos") {
      return orderedTracks;
    }

    return orderedTracks.filter((track) => track.category === activeFilter);
  }, [activeFilter, orderedTracks]);

  const queueTracks = queue.map((id) => trackById.get(id)).filter((track): track is MusicTrack => Boolean(track));
  const currentIndex = currentTrack ? tracks.findIndex((track) => track.id === currentTrack.id) : -1;
  const currentVisibleIndex = currentTrack ? filteredTracks.findIndex((track) => track.id === currentTrack.id) : -1;
  const hasPrevious = history.length > 0 || currentIndex > 0;
  const hasNext =
    repeatMode !== "off" ||
    queue.length > 0 ||
    shuffle ||
    currentVisibleIndex < filteredTracks.length - 1 ||
    currentIndex < tracks.length - 1;
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  const isMuted = volume === 0;
  const currentLiked = currentTrack ? (stats[currentTrack.id]?.liked ?? false) : false;
  const currentPlayerTheme = getPlayerTheme(currentTrack);

  useEffect(() => {
    setStats(readJson<MusicStats>(statsStorageKey, {}));
    const storedQueue = readJson<string[]>(queueStorageKey, []).filter((id) => trackById.has(id));
    setQueue(storedQueue.length > 0 ? storedQueue : createRandomQueue(tracks, 10, tracks[0]?.id));
    setShuffle(readJson<boolean>(shuffleStorageKey, false));
    setRepeatMode(readString<RepeatMode>(repeatStorageKey, "off", ["off", "all", "one"]));
    const storedVolume = Math.min(1, Math.max(0, readNumber(volumeStorageKey, 0.82)));
    setVolume(storedVolume);
    setStorageReady(true);
  }, [trackById, tracks]);

  useEffect(() => {
    if (storageReady) {
      window.localStorage.setItem(statsStorageKey, JSON.stringify(stats));
    }
  }, [stats, storageReady]);

  useEffect(() => {
    if (storageReady) {
      window.localStorage.setItem(queueStorageKey, JSON.stringify(queue));
    }
  }, [queue, storageReady]);

  useEffect(() => {
    if (storageReady) {
      window.localStorage.setItem(shuffleStorageKey, JSON.stringify(shuffle));
    }
  }, [shuffle, storageReady]);

  useEffect(() => {
    if (storageReady) {
      window.localStorage.setItem(repeatStorageKey, repeatMode);
    }
  }, [repeatMode, storageReady]);

  useEffect(() => {
    if (storageReady) {
      window.localStorage.setItem(volumeStorageKey, String(volume));
    }
  }, [storageReady, volume]);

  useEffect(() => {
    updateAlbumScrollState();
  }, [selectedAlbumSlug]);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio || !currentTrack) {
      return;
    }

    if (!isPlaying) {
      audio.pause();
      return;
    }

    audio.play().catch(() => {
      setIsPlaying(false);
      setErroredTracks((current) => ({ ...current, [currentTrack.id]: true }));
    });
  }, [currentTrack, isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
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
  }, [openPanel]);

  function incrementPlays(trackId: string) {
    setStats((current) => ({
      ...current,
      [trackId]: {
        plays: (current[trackId]?.plays ?? 0) + 1,
        liked: current[trackId]?.liked ?? false
      }
    }));
  }

  function setTrack(track: MusicTrack, options: { countPlay?: boolean; pushHistory?: boolean } = {}) {
    if (options.pushHistory && currentTrack && currentTrack.id !== track.id) {
      setHistory((current) => [...current.slice(-19), currentTrack.id]);
    }

    setCurrentTrack(track);
    setCurrentTime(0);
    setDuration(0);
    setErroredTracks((current) => ({ ...current, [track.id]: false }));
    setIsPlaying(true);

    if (options.countPlay) {
      incrementPlays(track.id);
    }
  }

  function handleToggle(track: MusicTrack) {
    if (currentTrack?.id === track.id) {
      setIsPlaying((current) => {
        if (!current) {
          incrementPlays(track.id);
        }
        return !current;
      });
      return;
    }

    setTrack(track, { countPlay: true, pushHistory: true });
  }

  function playByIndex(index: number) {
    const track = tracks[index];

    if (track) {
      setTrack(track, { countPlay: true, pushHistory: true });
    }
  }

  function getRandomVisibleTrack() {
    const candidates = filteredTracks.filter((track) => track.id !== currentTrack?.id);

    if (candidates.length > 0) {
      return candidates[Math.floor(Math.random() * candidates.length)];
    }

    return filteredTracks[0] ?? tracks[0];
  }

  function getSequentialNextTrack() {
    const nextVisible = currentVisibleIndex >= 0 ? filteredTracks[currentVisibleIndex + 1] : undefined;

    if (nextVisible) {
      return nextVisible;
    }

    if (repeatMode === "all") {
      return filteredTracks[0] ?? tracks[0];
    }

    return tracks[currentIndex + 1];
  }

  function playNext(options: { countPlay?: boolean; fromEnded?: boolean } = {}) {
    if (options.fromEnded && repeatMode === "one" && currentTrack && audioRef.current) {
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
      setIsPlaying(true);
      incrementPlays(currentTrack.id);
      void audioRef.current.play();
      return;
    }

    const [nextQueuedId, ...restQueue] = queue;
    const queuedTrack = nextQueuedId ? trackById.get(nextQueuedId) : undefined;

    if (queuedTrack) {
      setQueue(restQueue);
      setTrack(queuedTrack, { countPlay: options.countPlay, pushHistory: true });
      return;
    }

    const nextTrack = shuffle ? getRandomVisibleTrack() : getSequentialNextTrack();

    if (nextTrack) {
      setTrack(nextTrack, { countPlay: options.countPlay, pushHistory: true });
      return;
    }

    if (options.fromEnded) {
      setIsPlaying(false);
      setCurrentTime(0);
    }
  }

  function playPrevious() {
    const previousId = history.at(-1);
    const previousTrack = previousId ? trackById.get(previousId) : undefined;

    if (previousTrack) {
      setHistory((current) => current.slice(0, -1));
      setTrack(previousTrack, { countPlay: true, pushHistory: false });
      return;
    }

    playByIndex(currentIndex - 1);
  }

  function handleSeek(value: string) {
    const nextTime = Number(value);

    if (audioRef.current && Number.isFinite(nextTime)) {
      audioRef.current.currentTime = nextTime;
      setCurrentTime(nextTime);
    }
  }

  function handleLike(trackId: string) {
    setStats((current) => ({
      ...current,
      [trackId]: {
        plays: current[trackId]?.plays ?? 0,
        liked: !(current[trackId]?.liked ?? false)
      }
    }));
  }

  function handleQueue(trackId: string) {
    setQueue((current) => (current.includes(trackId) ? current.filter((id) => id !== trackId) : [...current, trackId]));
  }

  function handleSongsChip() {
    setActiveFilter("todos");
    setActiveTab("recent");
    gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function resolveAlbumTrack(albumTrack: AlbumTrack) {
    if (albumTrack.linkedTrackId) {
      const linkedTrack = trackById.get(albumTrack.linkedTrackId);

      if (linkedTrack) {
        return linkedTrack;
      }
    }

    if (albumTrack.linkedTrackTitle) {
      return trackByNormalizedTitle.get(normalizeTrackTitle(albumTrack.linkedTrackTitle));
    }

    return trackByNormalizedTitle.get(normalizeTrackTitle(albumTrack.title));
  }

  function updateAlbumScrollState() {
    const slider = albumSliderRef.current;

    if (!slider) {
      return;
    }

    setCanScrollAlbumLeft(slider.scrollLeft > 8);
    setCanScrollAlbumRight(slider.scrollLeft + slider.clientWidth < slider.scrollWidth - 8);
  }

  function scrollAlbumSlider(direction: "left" | "right") {
    const tracklist = selectedAlbum.tracklist;

    if (tracklist.length === 0) {
      return;
    }

    const currentIndex = Math.max(
      0,
      tracklist.findIndex((albumTrack) => `${selectedAlbum.slug}-${albumTrack.number}` === selectedAlbumTrack)
    );
    const nextIndex = direction === "left" ? Math.max(0, currentIndex - 1) : Math.min(tracklist.length - 1, currentIndex + 1);
    const nextTrack = tracklist[nextIndex];

    if (nextTrack) {
      selectAlbumTrack(`${selectedAlbum.slug}-${nextTrack.number}`);
    }
  }

  function selectAlbumTrack(albumTrackKey: string) {
    setSelectedAlbumTrack(albumTrackKey);
    setLyricsTrackKey(null);

    requestAnimationFrame(() => {
      document.getElementById(`album-slide-${albumTrackKey}`)?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center"
      });
      updateAlbumScrollState();
    });
  }

  function cycleRepeatMode() {
    setRepeatMode((current) => {
      if (current === "off") {
        return "all";
      }

      if (current === "all") {
        return "one";
      }

      return "off";
    });
  }

  return (
    <div className="music-archive">
      <section className="music-profile" aria-label="Archivo Sonoro de Caelyndor">
        <Image
          className="music-profile__banner"
          src={musicHeroBanner}
          alt=""
          fill
          priority
          sizes="(max-width: 760px) 100vw, 1120px"
        />
        <div className="music-profile__content">
          <p className="eyebrow">CRÓNICAS DE CAELYNDOR</p>
          <h2>Crónicas de Caelyndor</h2>
          <p className="music-profile__handle">@caelyndor_bard</p>
          <div className="music-profile__stats">
            <button type="button" onClick={handleSongsChip} aria-label={`Ver las ${tracks.length} canciones`}>
              {tracks.length} canciones
            </button>
          </div>
        </div>
        <button
          className="music-profile__play"
          type="button"
          onClick={() => {
            const track = currentTrack ?? tracks[0];
            if (track) {
              setTrack(track, { countPlay: true, pushHistory: false });
            }
          }}
          aria-label="Reproducir archivo sonoro"
        >
          <PlayIcon size={24} />
        </button>
      </section>

      <div className="music-tabs" aria-label="Orden de canciones">
        <button className={activeTab === "recent" ? "music-tab music-tab--active" : "music-tab"} type="button" onClick={() => setActiveTab("recent")}>
          Recent
        </button>
        <button className={activeTab === "top" ? "music-tab music-tab--active" : "music-tab"} type="button" onClick={() => setActiveTab("top")}>
          Top
        </button>
        <button className={activeTab === "album" ? "music-tab music-tab--active" : "music-tab"} type="button" onClick={() => setActiveTab("album")}>
          Álbum
        </button>
      </div>

      {activeTab !== "album" ? (
        <div className="music-filters music-filters--secondary" aria-label="Filtrar música">
          {filters.map((filter) => (
            <button
              className={`music-filter${activeFilter === filter.value ? " music-filter--active" : ""}`}
              key={filter.value}
              type="button"
              onClick={() => setActiveFilter(filter.value)}
              aria-pressed={activeFilter === filter.value}
            >
              {filter.label}
            </button>
          ))}
        </div>
      ) : null}

      <audio
        ref={audioRef}
        src={currentTrack?.src}
        preload="none"
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
        onEnded={() => playNext({ fromEnded: true, countPlay: true })}
        onError={() => {
          if (currentTrack) {
            setErroredTracks((current) => ({ ...current, [currentTrack.id]: true }));
          }
          setIsPlaying(false);
        }}
      >
        Tu navegador no soporta audio HTML.
      </audio>

      {activeTab === "album" && selectedAlbum ? (
        <div className="music-album" aria-labelledby="music-album-title" ref={gridRef}>
          <h2 className="sr-only" id="music-album-title">
            Álbumes
          </h2>
          <div className="music-album-gallery" aria-label="Galería de álbumes">
            {musicAlbums.map((album) => {
              const isAlbumSelected = selectedAlbum.slug === album.slug;

              return (
                <button
                  className={`music-album-card${isAlbumSelected ? " music-album-card--active" : ""}${album.tracklist.length === 0 ? " music-album-card--pending" : ""}`}
                  key={album.slug}
                  type="button"
                  onClick={() => {
                    setSelectedAlbumSlug(album.slug);
                    setSelectedAlbumTrack(null);
                    setLyricsTrackKey(null);
                    setAlbumHeroOffset({ x: 0, y: 0 });
                  }}
                  aria-pressed={isAlbumSelected}
                >
                  {album.heroImage ? (
                    <Image className="music-album-card__image" src={album.heroImage} alt="" fill sizes="(max-width: 760px) 78vw, 280px" />
                  ) : (
                    <span className="music-album-card__mark" aria-hidden="true" />
                  )}
                  <span className="music-album-card__shade" aria-hidden="true" />
                  <span className="music-album-card__copy">
                    <small>{album.status ?? "Disponible"}</small>
                    <strong>{album.title}</strong>
                    <em>{album.artist}</em>
                  </span>
                </button>
              );
            })}
          </div>

          {selectedAlbum.tracklist.length > 0 ? (
            <>
              {selectedAlbum.heroImage ? (
                <div
                  className="music-album__header"
                  onPointerMove={(event) => {
                    const rect = event.currentTarget.getBoundingClientRect();
                    const x = ((event.clientX - rect.left) / rect.width - 0.5) * -1;
                    const y = ((event.clientY - rect.top) / rect.height - 0.5) * -1;
                    setAlbumHeroOffset({ x, y });
                  }}
                  onPointerLeave={() => setAlbumHeroOffset({ x: 0, y: 0 })}
                  style={
                    {
                      "--album-parallax-x": `${albumHeroOffset.x * 1.8}%`,
                      "--album-parallax-y": `${albumHeroOffset.y * 1.2}%`
                    } as CSSProperties
                  }
                >
                  {selectedAlbum.heroVideoMp4 || selectedAlbum.heroVideoWebm ? (
                    <video
                      key={selectedAlbum.slug}
                      className="music-album__header-video"
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      poster={selectedAlbum.heroImage}
                      aria-hidden="true"
                    >
                      {selectedAlbum.heroVideoWebm ? <source src={selectedAlbum.heroVideoWebm} type="video/webm" /> : null}
                      {selectedAlbum.heroVideoMp4 ? <source src={selectedAlbum.heroVideoMp4} type="video/mp4" /> : null}
                    </video>
                  ) : (
                    <Image className="music-album__header-image" src={selectedAlbum.heroImage} alt="" fill sizes="(max-width: 760px) 100vw, 1120px" />
                  )}
                </div>
              ) : null}

              <div className="music-album__main">
                <div className="music-album__left">
                  <div className="music-album__selected-head">
                    <div>
                      <span>{selectedAlbum.tracklist.length} canciones</span>
                      <h3>{selectedAlbum.title}</h3>
                      {selectedAlbum.description ? <p>{selectedAlbum.description}</p> : null}
                    </div>
                    <div className="music-album__slider-controls" aria-label="Navegar canciones del álbum">
                      <button type="button" onClick={() => scrollAlbumSlider("left")} disabled={!canScrollAlbumLeft} aria-label="Ver canciones anteriores">
                        ‹
                      </button>
                      <button type="button" onClick={() => scrollAlbumSlider("right")} disabled={!canScrollAlbumRight} aria-label="Ver canciones siguientes">
                        ›
                      </button>
                    </div>
                  </div>

                  <div className="music-album__slider" aria-label={`Canciones de ${selectedAlbum.title}`} ref={albumSliderRef} onScroll={updateAlbumScrollState}>
                    {selectedAlbum.tracklist.map((albumTrack) => {
                      const linkedTrack = resolveAlbumTrack(albumTrack);
                      const albumTrackKey = `${selectedAlbum.slug}-${albumTrack.number}`;
                      const fallbackSelectedKey = `${selectedAlbum.slug}-${selectedAlbum.tracklist[0]?.number}`;
                      const activeAlbumTrackKey = selectedAlbumTrack ?? fallbackSelectedKey;
                      const isSelected = activeAlbumTrackKey === albumTrackKey;
                      const slideCover = linkedTrack?.coverImage ?? FALLBACK_MUSIC_COVER;

                      return (
                        <article className={`music-album-slide${isSelected ? " music-album-slide--active" : ""}`} id={`album-slide-${albumTrackKey}`} key={albumTrack.number}>
                          <button
                            className="music-album-slide__body"
                            type="button"
                            onClick={() => {
                              selectAlbumTrack(albumTrackKey);
                            }}
                            aria-pressed={isSelected}
                          >
                            <span className="music-album-slide__cover">
                              <Image
                                src={slideCover}
                                alt={linkedTrack?.coverImage ? `Carátula de ${albumTrack.title}` : `Carátula no disponible para ${albumTrack.title}`}
                                fill
                                sizes="(max-width: 760px) 68vw, 260px"
                                onError={(event) => {
                                  event.currentTarget.src = FALLBACK_MUSIC_COVER;
                                  event.currentTarget.alt = `Carátula no disponible para ${albumTrack.title}`;
                                }}
                              />
                            </span>
                            <span className="music-album-slide__meta">{albumTrack.number.toString().padStart(2, "0")}</span>
                            <strong>{albumTrack.title}</strong>
                          </button>
                        </article>
                      );
                    })}
                  </div>

                </div>

                <aside className="music-album__detail" aria-live="polite">
                  {(() => {
                    const selectedTrack =
                      selectedAlbum.tracklist.find((albumTrack) => `${selectedAlbum.slug}-${albumTrack.number}` === selectedAlbumTrack) ??
                      selectedAlbum.tracklist[0];

                    if (!selectedTrack) {
                      return null;
                    }

                    const detailTrackKey = `${selectedAlbum.slug}-${selectedTrack.number}`;
                    const isLyricsOpen = lyricsTrackKey === detailTrackKey;
                    const linkedTrack = resolveAlbumTrack(selectedTrack);

                    return (
                      <>
                        <div className="music-album__info">
                          <span>{selectedTrack.number.toString().padStart(2, "0")}</span>
                          <h3>{selectedTrack.title}</h3>
                          <p>{selectedTrack.description}</p>
                          <div className="music-album__actions">
                            {linkedTrack ? (
                              <button type="button" onClick={() => handleToggle(linkedTrack)}>
                                {currentTrack?.id === linkedTrack.id && isPlaying ? "Pausar" : "Reproducir"}
                              </button>
                            ) : (
                              <strong>Próximamente</strong>
                            )}
                            <button
                              type="button"
                              onClick={() => setLyricsTrackKey(isLyricsOpen ? null : detailTrackKey)}
                              aria-expanded={isLyricsOpen}
                              aria-controls="album-detail-lyrics"
                            >
                              {isLyricsOpen ? "Ocultar lyrics" : "Lyrics"}
                            </button>
                          </div>
                          <div className={`music-album__lyrics-drawer${isLyricsOpen ? " music-album__lyrics-drawer--open" : ""}`} id="album-detail-lyrics">
                            <div className="music-album__lyrics-scroll">
                              {(selectedTrack.lyrics ?? "Lyrics pendientes de cargar.").split("\n").map((line, index) => (
                                <p key={`${selectedTrack.number}-${index}`}>{line}</p>
                              ))}
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })()}
                </aside>
              </div>
            </>
          ) : (
            <section className="music-album__empty" aria-live="polite">
              <p className="eyebrow">{selectedAlbum.status ?? "Próximamente"}</p>
              <h3>{selectedAlbum.title}</h3>
              <p>Este álbum aún está en preparación.</p>
            </section>
          )}
        </div>
      ) : (
        <div className="music-grid" aria-live="polite" ref={gridRef}>
          {filteredTracks.map((track) => (
            <MusicTrackCard
              key={track.id}
              track={track}
              isActive={currentTrack?.id === track.id}
              isPlaying={currentTrack?.id === track.id && isPlaying}
              hasError={Boolean(erroredTracks[track.id])}
              onToggle={handleToggle}
              fallbackCover={FALLBACK_MUSIC_COVER}
              plays={stats[track.id]?.plays ?? 0}
              liked={stats[track.id]?.liked ?? false}
              queued={queue.includes(track.id)}
              onLike={handleLike}
              onQueue={handleQueue}
            />
          ))}
        </div>
      )}

      {currentTrack ? (
        <aside
          className={`music-player${currentPlayerTheme !== "default" ? ` music-player--${currentPlayerTheme}` : ""}`}
          aria-label="Reproductor de música"
        >
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
                onClick={() => setShuffle((current) => !current)}
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
                onClick={() => {
                  setIsPlaying((current) => {
                    if (!current && currentTrack) {
                      incrementPlays(currentTrack.id);
                    }
                    return !current;
                  });
                }}
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
              onClick={() => {
                if (currentTrack) {
                  handleLike(currentTrack.id);
                }
              }}
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
                      <button className="music-player__clear-queue" type="button" onClick={() => setQueue([])}>
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
                            <button type="button" onClick={() => setQueue((current) => current.filter((id) => id !== track.id))} aria-label={`Quitar ${track.title} de la cola`}>
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
      ) : null}
    </div>
  );
}
