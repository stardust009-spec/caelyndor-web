"use client";

import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import { musicTracks, type MusicTrack } from "@/data/music";

export const FALLBACK_MUSIC_COVER = "/images/music-covers/fallback_missing_cover.png";

export type RepeatMode = "off" | "all" | "one";
/** Conteos GLOBALES por tema (Redis vía /api/music-stats). El "me gusta" del
 *  usuario se guarda aparte, por navegador, en `likedTracks`. */
export type MusicStats = Record<string, { plays: number; likes: number }>;
export type LikedTracks = Record<string, boolean>;
export type PlayerTheme =
  | "default"
  | "carolina"
  | "ventoleve"
  | "rubiyuki"
  | "yuki"
  | "rubi"
  | "lyzi"
  | "noct"
  | "levia";

const likedStorageKey = "caelyndor.music-liked.v2";
const legacyStatsStorageKey = "caelyndor_music_stats";
const queueStorageKey = "caelyndor_music_queue";
const shuffleStorageKey = "caelyndor_music_shuffle";
const repeatStorageKey = "caelyndor_music_repeat_mode";
const volumeStorageKey = "caelyndor_music_volume";

type MusicCounter = { plays: number; likes: number };

/** Lee el set de temas que el usuario marcó (por navegador). Migra el esquema
 *  viejo `caelyndor_music_stats` (plays+liked) tomando solo los `liked`. */
function readLikedTracks(): LikedTracks {
  try {
    const stored = window.localStorage.getItem(likedStorageKey);
    if (stored) {
      return JSON.parse(stored) as LikedTracks;
    }

    const legacy = window.localStorage.getItem(legacyStatsStorageKey);
    if (legacy) {
      const parsed = JSON.parse(legacy) as Record<string, { liked?: boolean }>;
      const migrated: LikedTracks = {};
      for (const [id, value] of Object.entries(parsed)) {
        if (value?.liked) {
          migrated[id] = true;
        }
      }
      return migrated;
    }

    return {};
  } catch {
    return {};
  }
}

/** Lee los conteos globales (plays/likes) de los temas pedidos. */
async function fetchMusicCounters(ids: string[]): Promise<Record<string, MusicCounter>> {
  try {
    const response = await fetch(`/api/music-stats?ids=${ids.join(",")}`);
    if (!response.ok) {
      return {};
    }
    const data = (await response.json()) as { stats?: Record<string, MusicCounter> };
    return data.stats ?? {};
  } catch {
    // Sin red o contadores no configurados: se mantienen los valores en memoria.
    return {};
  }
}

/** Registra una acción (reproducción o me gusta) y devuelve el conteo nuevo. */
async function sendMusicAction(
  id: string,
  action: "play" | "like" | "unlike"
): Promise<MusicCounter | null> {
  try {
    const response = await fetch("/api/music-stats", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, action })
    });
    if (!response.ok) {
      return null;
    }
    const data = (await response.json()) as { stats?: Record<string, MusicCounter> };
    return data.stats?.[id] ?? null;
  } catch {
    return null;
  }
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

export function getPlayerTheme(track: MusicTrack | null): PlayerTheme {
  if (!track) {
    return "default";
  }

  const related = track.related ?? [];
  const title = track.title;
  const haystack = `${title} ${related.join(" ")}`;

  if (haystack.includes("Carolina Varthalion")) {
    return "carolina";
  }

  if (haystack.includes("Aria") || haystack.includes("Adagio") || haystack.includes("Ventoleve")) {
    return "ventoleve";
  }

  if (haystack.includes("Yuki") && haystack.includes("Rubí")) {
    return "rubiyuki";
  }

  if (haystack.includes("Yuki")) {
    return "yuki";
  }

  if (haystack.includes("Rubí")) {
    return "rubi";
  }

  if (haystack.includes("Lyzi")) {
    return "lyzi";
  }

  if (haystack.includes("Noctalypse")) {
    return "noct";
  }

  if (haystack.includes("Levia")) {
    return "levia";
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

type SetTrackOptions = { countPlay?: boolean; pushHistory?: boolean };

type MusicPlayerContextValue = {
  tracks: MusicTrack[];
  currentTrack: MusicTrack | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  stats: MusicStats;
  likedTracks: LikedTracks;
  queue: string[];
  queueTracks: MusicTrack[];
  shuffle: boolean;
  repeatMode: RepeatMode;
  erroredTracks: Record<string, boolean>;
  hasPrevious: boolean;
  hasNext: boolean;
  setTrack: (track: MusicTrack, options?: SetTrackOptions) => void;
  playCollection: (collection: MusicTrack[]) => void;
  handleToggle: (track: MusicTrack) => void;
  togglePlay: () => void;
  playNext: (options?: { countPlay?: boolean; fromEnded?: boolean }) => void;
  playPrevious: () => void;
  handleSeek: (value: string) => void;
  handleLike: (trackId: string) => void;
  handleQueue: (trackId: string) => void;
  removeFromQueue: (trackId: string) => void;
  clearQueue: () => void;
  queuePromptVisible: boolean;
  acceptQueueRefill: () => void;
  dismissQueueRefill: () => void;
  setVolume: (value: number) => void;
  toggleShuffle: () => void;
  cycleRepeatMode: () => void;
  setPlaybackPool: (trackIds: string[]) => void;
  ensureCurrentTrack: () => void;
};

const MusicPlayerContext = createContext<MusicPlayerContextValue | null>(null);

export function useMusicPlayer() {
  const context = useContext(MusicPlayerContext);

  if (!context) {
    throw new Error("useMusicPlayer debe usarse dentro de MusicPlayerProvider");
  }

  return context;
}

export function MusicPlayerProvider({ children }: { children: ReactNode }) {
  const tracks = musicTracks;
  const audioRef = useRef<HTMLAudioElement>(null);
  const mediaActionsRef = useRef<{
    resume: () => void;
    pause: () => void;
    next: () => void;
    previous: () => void;
  } | null>(null);
  const [currentTrack, setCurrentTrack] = useState<MusicTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.82);
  const [stats, setStats] = useState<MusicStats>({});
  const [likedTracks, setLikedTracks] = useState<LikedTracks>({});
  const [queue, setQueue] = useState<string[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [shuffle, setShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState<RepeatMode>("off");
  const [erroredTracks, setErroredTracks] = useState<Record<string, boolean>>({});
  const [storageReady, setStorageReady] = useState(false);
  const [playbackPool, setPlaybackPoolState] = useState<string[]>([]);
  const [queuePromptVisible, setQueuePromptVisible] = useState(false);

  const trackById = useMemo(() => new Map(tracks.map((track) => [track.id, track])), [tracks]);

  const poolTracks = useMemo(() => {
    const resolved = playbackPool
      .map((id) => trackById.get(id))
      .filter((track): track is MusicTrack => Boolean(track));
    return resolved.length > 0 ? resolved : tracks;
  }, [playbackPool, trackById, tracks]);

  const queueTracks = useMemo(
    () => queue.map((id) => trackById.get(id)).filter((track): track is MusicTrack => Boolean(track)),
    [queue, trackById]
  );

  const currentIndex = currentTrack ? tracks.findIndex((track) => track.id === currentTrack.id) : -1;
  const currentPoolIndex = currentTrack ? poolTracks.findIndex((track) => track.id === currentTrack.id) : -1;
  const hasPrevious = history.length > 0 || currentIndex > 0;
  const hasNext =
    repeatMode !== "off" ||
    queue.length > 0 ||
    shuffle ||
    currentPoolIndex < poolTracks.length - 1 ||
    currentIndex < tracks.length - 1;

  useEffect(() => {
    setLikedTracks(readLikedTracks());
    const storedQueue = readJson<string[]>(queueStorageKey, []).filter((id) => trackById.has(id));
    setQueue(storedQueue.length > 0 ? storedQueue : createRandomQueue(tracks, 10, tracks[0]?.id));
    setShuffle(readJson<boolean>(shuffleStorageKey, false));
    setRepeatMode(readString<RepeatMode>(repeatStorageKey, "off", ["off", "all", "one"]));
    const storedVolume = Math.min(1, Math.max(0, readNumber(volumeStorageKey, 0.82)));
    setVolume(storedVolume);
    setStorageReady(true);

    // Carga los conteos globales (plays/likes) desde la base de datos.
    let cancelled = false;
    void fetchMusicCounters(tracks.map((track) => track.id)).then((loaded) => {
      if (!cancelled && Object.keys(loaded).length > 0) {
        setStats(loaded);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [trackById, tracks]);

  useEffect(() => {
    if (storageReady) {
      window.localStorage.setItem(likedStorageKey, JSON.stringify(likedTracks));
      window.localStorage.removeItem(legacyStatsStorageKey);
    }
  }, [likedTracks, storageReady]);

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

  // Media Session API: portada + metadatos en el reproductor del sistema
  // (pantalla de bloqueo / notificación de Android, iOS y Chrome).
  useEffect(() => {
    if (typeof navigator === "undefined" || !("mediaSession" in navigator)) {
      return;
    }

    if (!currentTrack) {
      navigator.mediaSession.metadata = null;
      return;
    }

    const cover = currentTrack.coverImage ?? FALLBACK_MUSIC_COVER;
    const artworkSrc = cover.startsWith("/") ? new URL(cover, window.location.origin).href : cover;
    const artworkType = cover.endsWith(".png")
      ? "image/png"
      : cover.endsWith(".webp")
        ? "image/webp"
        : "image/jpeg";

    navigator.mediaSession.metadata = new MediaMetadata({
      title: currentTrack.title,
      artist: currentTrack.artist ?? "Caelyndor",
      album: currentTrack.album ?? currentTrack.subtitle ?? "Caelyndor",
      artwork: [{ src: artworkSrc, sizes: "512x512", type: artworkType }]
    });
  }, [currentTrack]);

  useEffect(() => {
    if (typeof navigator === "undefined" || !("mediaSession" in navigator)) {
      return;
    }

    navigator.mediaSession.playbackState = isPlaying ? "playing" : "paused";
  }, [isPlaying]);

  useEffect(() => {
    if (typeof navigator === "undefined" || !("mediaSession" in navigator)) {
      return;
    }

    const session = navigator.mediaSession;
    session.setActionHandler("play", () => mediaActionsRef.current?.resume());
    session.setActionHandler("pause", () => mediaActionsRef.current?.pause());
    session.setActionHandler("previoustrack", () => mediaActionsRef.current?.previous());
    session.setActionHandler("nexttrack", () => mediaActionsRef.current?.next());

    return () => {
      session.setActionHandler("play", null);
      session.setActionHandler("pause", null);
      session.setActionHandler("previoustrack", null);
      session.setActionHandler("nexttrack", null);
    };
  }, []);

  useEffect(() => {
    function handleExternalPlay(event: Event) {
      const target = event.target;

      if (
        target instanceof HTMLMediaElement &&
        target !== audioRef.current &&
        !target.muted
      ) {
        setIsPlaying(false);
      }
    }

    document.addEventListener("play", handleExternalPlay, true);
    return () => document.removeEventListener("play", handleExternalPlay, true);
  }, []);

  function incrementPlays(trackId: string) {
    setStats((current) => ({
      ...current,
      [trackId]: {
        plays: (current[trackId]?.plays ?? 0) + 1,
        likes: current[trackId]?.likes ?? 0
      }
    }));
    void sendMusicAction(trackId, "play");
  }

  function setTrack(track: MusicTrack, options: SetTrackOptions = {}) {
    if (options.pushHistory && currentTrack && currentTrack.id !== track.id) {
      const previousId = currentTrack.id;
      setHistory((current) => [...current.slice(-19), previousId]);
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

  function playCollection(collection: MusicTrack[]) {
    const [first, ...rest] = collection;

    if (!first) {
      return;
    }

    setQueue(rest.map((track) => track.id));
    setQueuePromptVisible(false);
    setTrack(first, { countPlay: true, pushHistory: true });
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

  function togglePlay() {
    setIsPlaying((current) => {
      if (!current && currentTrack) {
        incrementPlays(currentTrack.id);
      }
      return !current;
    });
  }

  function getRandomPoolTrack() {
    const candidates = poolTracks.filter((track) => track.id !== currentTrack?.id);

    if (candidates.length > 0) {
      return candidates[Math.floor(Math.random() * candidates.length)];
    }

    return poolTracks[0] ?? tracks[0];
  }

  function getSequentialNextTrack() {
    const nextInPool = currentPoolIndex >= 0 ? poolTracks[currentPoolIndex + 1] : undefined;

    if (nextInPool) {
      return nextInPool;
    }

    if (repeatMode === "all") {
      return poolTracks[0] ?? tracks[0];
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

      if (restQueue.length === 0) {
        setQueuePromptVisible(true);
      }

      return;
    }

    const nextTrack = shuffle ? getRandomPoolTrack() : getSequentialNextTrack();

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

    const fallbackTrack = tracks[currentIndex - 1];

    if (fallbackTrack) {
      setTrack(fallbackTrack, { countPlay: true, pushHistory: true });
    }
  }

  function handleSeek(value: string) {
    const nextTime = Number(value);

    if (audioRef.current && Number.isFinite(nextTime)) {
      audioRef.current.currentTime = nextTime;
      setCurrentTime(nextTime);
    }
  }

  function handleLike(trackId: string) {
    const nextLiked = !(likedTracks[trackId] ?? false);

    setLikedTracks((current) => {
      const next = { ...current };
      if (nextLiked) {
        next[trackId] = true;
      } else {
        delete next[trackId];
      }
      return next;
    });

    // Actualización optimista del conteo global.
    setStats((current) => ({
      ...current,
      [trackId]: {
        plays: current[trackId]?.plays ?? 0,
        likes: Math.max(0, (current[trackId]?.likes ?? 0) + (nextLiked ? 1 : -1))
      }
    }));

    void sendMusicAction(trackId, nextLiked ? "like" : "unlike").then((counter) => {
      if (counter) {
        setStats((current) => ({ ...current, [trackId]: counter }));
      }
    });
  }

  function handleQueue(trackId: string) {
    setQueue((current) => {
      if (current.includes(trackId)) {
        return current.filter((id) => id !== trackId);
      }

      setQueuePromptVisible(false);
      return [...current, trackId];
    });
  }

  function acceptQueueRefill() {
    setQueue(createRandomQueue(tracks, 10, currentTrack?.id));
    setQueuePromptVisible(false);
  }

  function dismissQueueRefill() {
    setQueuePromptVisible(false);
  }

  function removeFromQueue(trackId: string) {
    setQueue((current) => current.filter((id) => id !== trackId));
  }

  function clearQueue() {
    setQueue([]);
  }

  function toggleShuffle() {
    setShuffle((current) => !current);
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

  function setPlaybackPool(trackIds: string[]) {
    setPlaybackPoolState(trackIds);
  }

  function ensureCurrentTrack() {
    if (!currentTrack && tracks[0]) {
      setCurrentTrack(tracks[0]);
    }
  }

  mediaActionsRef.current = {
    resume: () => {
      if (currentTrack) {
        setIsPlaying(true);
      }
    },
    pause: () => setIsPlaying(false),
    next: () => playNext({ countPlay: true }),
    previous: () => playPrevious()
  };

  const value: MusicPlayerContextValue = {
    tracks,
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    stats,
    likedTracks,
    queue,
    queueTracks,
    shuffle,
    repeatMode,
    erroredTracks,
    hasPrevious,
    hasNext,
    setTrack,
    playCollection,
    handleToggle,
    togglePlay,
    playNext,
    playPrevious,
    handleSeek,
    handleLike,
    handleQueue,
    removeFromQueue,
    clearQueue,
    queuePromptVisible,
    acceptQueueRefill,
    dismissQueueRefill,
    setVolume,
    toggleShuffle,
    cycleRepeatMode,
    setPlaybackPool,
    ensureCurrentTrack
  };

  return (
    <MusicPlayerContext.Provider value={value}>
      {children}
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
    </MusicPlayerContext.Provider>
  );
}
