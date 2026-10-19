"use client";

import { useEffect, useRef, useState } from "react";
import { useMusicPlayer } from "@/components/MusicPlayerContext";
import { CASA_THEME_SRC } from "@/data/casa";

/** Volumen del tema de la casa: de fondo, por debajo de la voz de la escena. */
const THEME_VOLUME = 0.4;
/** Fundido al entrar y al cerrar cada vuelta del bucle (segundos). */
const FADE_IN = 3;
const FADE_OUT = 3;
/** Fundido de salida cuando el visitante enciende el reproductor de la web. */
const HANDOFF_FADE = 1.2;
const MUTED_KEY = "casa-de-lyzi.theme.muted";
const START_EVENTS = ["pointerdown", "keydown", "touchend"] as const;
/** Paso de la envolvente: un temporizador, no rAF, para que siga con la pestaña oculta. */
const TICK_MS = 40;

/**
 * Tema musical de la portada: suena en bucle desde que se entra, con fundido al empezar y al
 * terminar cada vuelta. Cuando el reproductor de la web empieza a sonar se despide con un
 * fundido y no vuelve en esta visita, para que nunca se pisen.
 */
export function CasaTheme() {
  const { isPlaying } = useMusicPlayer();
  const audioRef = useRef<HTMLAudioElement>(null);
  const retiredRef = useRef(false);
  const handoffRef = useRef<{ from: number; at: number } | null>(null);
  const [muted, setMuted] = useState(false);
  const [retired, setRetired] = useState(false);
  const mutedRef = useRef(false);
  const startRef = useRef<() => void>(() => {});

  // la envolvente de volumen: fundido de entrada y de salida en cada vuelta del bucle
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      mutedRef.current = window.localStorage.getItem(MUTED_KEY) === "1";
      setMuted(mutedRef.current);
    } catch {
      /* sin almacenamiento: suena por defecto */
    }

    audio.volume = 0;

    const tick = () => {
      const handoff = handoffRef.current;
      if (handoff) {
        const k = 1 - (performance.now() - handoff.at) / (HANDOFF_FADE * 1000);
        if (k <= 0) {
          audio.pause();
          audio.volume = 0;
          handoffRef.current = null;
        } else {
          audio.volume = handoff.from * k;
        }
      } else if (!audio.paused) {
        const t = audio.currentTime;
        const d = Number.isFinite(audio.duration) ? audio.duration : Infinity;
        const env = Math.max(0, Math.min(1, t / FADE_IN, (d - t) / FADE_OUT));
        audio.volume = mutedRef.current ? 0 : THEME_VOLUME * env;
      }
    };
    const timer = window.setInterval(tick, TICK_MS);

    const start = () => {
      if (retiredRef.current || mutedRef.current || !audio.paused) return;
      audio.currentTime = 0;
      audio.volume = 0;
      audio
        .play()
        .then(() => {
          START_EVENTS.forEach((type) => window.removeEventListener(type, start));
        })
        .catch(() => {
          /* el navegador pide un gesto antes de sonar: esperamos el primer toque o tecla */
        });
    };

    startRef.current = start;

    // primero intenta sonar al entrar; si el navegador lo bloquea, arranca con el primer gesto
    START_EVENTS.forEach((type) => window.addEventListener(type, start, { passive: true }));
    start();

    return () => {
      START_EVENTS.forEach((type) => window.removeEventListener(type, start));
      window.clearInterval(timer);
      audio.pause();
    };
  }, []);

  // el reproductor de la web toma la palabra: el tema se despide y no vuelve en esta visita
  useEffect(() => {
    if (!isPlaying || retiredRef.current) return;
    retiredRef.current = true;
    setRetired(true);
    const audio = audioRef.current;
    if (audio && !audio.paused) handoffRef.current = { from: audio.volume, at: performance.now() };
  }, [isPlaying]);

  function toggleMuted() {
    const next = !muted;
    mutedRef.current = next;
    setMuted(next);
    try {
      window.localStorage.setItem(MUTED_KEY, next ? "1" : "0");
    } catch {
      /* sin almacenamiento: vale para esta visita */
    }
    // reactivar es un gesto: el navegador ya deja sonar
    if (!next) startRef.current();
  }

  return (
    <>
      <audio ref={audioRef} src={CASA_THEME_SRC} loop preload="auto" aria-hidden="true" />
      {retired ? null : (
        <button
          type="button"
          className={`casa-theme${muted ? " casa-theme--muted" : ""}`}
          onClick={toggleMuted}
          aria-pressed={!muted}
          aria-label={muted ? "Activar la música de la casa" : "Silenciar la música de la casa"}
          title={muted ? "Activar la música de la casa" : "Silenciar la música de la casa"}
        >
          <span className="casa-theme__bars" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>
      )}
    </>
  );
}
