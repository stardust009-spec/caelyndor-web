"use client";

import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import { musicTracks, type MusicTrack } from "@/data/music";

export const FALLBACK_MUSIC_COVER = "/images/music-covers/fallback_missing_cover.png";

export type RepeatMode = "off" | "all" | "one";
export type MusicStats = Record<string, { plays: number; liked: boolean }>;
export type PlayerTheme =
  | "default"
  | "carolina"
  | "ventoleve"
  | "rubiyuki"
  | "yuki"
  | "rubi"
  | "lyzi"
  | "noct";

const statsStorageKey = "caelyndor_music_stats";
const queueStorageKey = "caelyndor_music_queue";
const shuffleStorageKey = "caelyndor_music_shuffle";
const repeatStorageKey = "caelyndor_music_repeat_mode";
const volumeStorageKey = "caelyndor_music_volume";

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
  queue: string[];
  queueTracks: MusicTrack[];
  shuffle: boolean;
  repeatMode: RepeatMode;
  erroredTracks: Record<string, boolean>;
  hasPrevious: boolean;
  hasNext: boolean;
  setTrack: (track: MusicTrack, options?: SetTrackOptions) => void;
  handleToggle: (track: MusicTrack) => void;
  togglePlay: () => void;
  playNext: (options?: { countPlay?: boolean; fromEnded?: boolean }) => void;
  playPrevious: () => void;
  handleSeek: (value: string) => void;
  handleLike: (trackId: string) => void;
  handleQueue: (trackId: string) => void;
  removeFromQueue: (trackId: string) => void;
  clearQueue: () => void;
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
  const [currentTrack, setCurrentTrack] = useState<MusicTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.82);
  const [stats, setStats] = useState<MusicStats>({});
  const [queue, setQueue] = useState<string[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [shuffle, setShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState<RepeatMode>("off");
  const [erroredTracks, setErroredTracks] = useState<Record<string, boolean>>({});
  const [storageReady, setStorageReady] = useState(false);
  const [playbackPool, setPlaybackPoolState] = useState<string[]>([]);

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
        liked: current[trackId]?.liked ?? false
      }
    }));
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

  const value: MusicPlayerContextValue = {
    tracks,
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    stats,
    queue,
    queueTracks,
    shuffle,
    repeatMode,
    erroredTracks,
    hasPrevious,
    hasNext,
    setTrack,
    handleToggle,
    togglePlay,
    playNext,
    playPrevious,
    handleSeek,
    handleLike,
    handleQueue,
    removeFromQueue,
    clearQueue,
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
