"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type ReadingProgressProps = {
  target?: string;
  /** Slug del relato: si está presente, el progreso se sincroniza al servidor. */
  storySlug?: string;
};

/** Envía al servidor cada salto de ≥5% o cada 10 s como máximo. */
const SYNC_STEP = 5;
const SYNC_INTERVAL_MS = 10_000;

/** Un párrafo cuenta como visto si sigue en pantalla en dos revisiones
 *  seguidas (≈1 s): leer lo deja visible mucho más, arrastrar la barra no. */
const SEEN_TICK_MS = 1_000;
/** Por relato y por navegador, para sumar tramos entre visitas. */
const SEEN_STORAGE_PREFIX = "caelyndor.lectura-vista.";

function loadSeen(key: string, total: number): boolean[] {
  try {
    const stored = window.localStorage.getItem(key);
    // Si el relato cambió de largo, los índices ya no corresponden: se reinicia.
    if (stored && stored.length === total) {
      return Array.from(stored, (char) => char === "1");
    }
  } catch {
    // Sin almacenamiento (modo privado, bloqueado): se mide solo esta visita.
  }
  return new Array<boolean>(total).fill(false);
}

function saveSeen(key: string, seen: boolean[]) {
  try {
    window.localStorage.setItem(key, seen.map((value) => (value ? "1" : "0")).join(""));
  } catch {
    // Ver loadSeen.
  }
}

type RespuestaProgreso = {
  pendingSeconds?: number | null;
  newlyCompleted?: boolean;
  expGanada?: number;
  nivel?: number;
  subioNivel?: boolean;
  logrosNuevos?: string[];
  ritualPendiente?: boolean;
};

type AvisoCompletado = { exp: number; nivel: number; subioNivel: boolean; logros: string[]; ritual: boolean };

export function ReadingProgress({ target = ".story-reader", storySlug }: ReadingProgressProps) {
  const [progress, setProgress] = useState(0);
  const [aviso, setAviso] = useState<AvisoCompletado | null>(null);
  const syncState = useRef({ lastSent: -1, lastSentAt: 0, latest: 0, disabled: false });
  /** % de párrafos vistos (0-100); el servidor lo usa para validar el completado. */
  const seenPercent = useRef(0);

  // Sincronización con el backend (solo lectores con sesión; un 401 apaga el
  // envío en silencio — los visitantes anónimos no generan tráfico repetido).
  useEffect(() => {
    if (!storySlug) {
      return;
    }
    const state = syncState.current;
    let retryTimer = 0;

    function payload(value: number) {
      return JSON.stringify({ progress: value, seen: seenPercent.current });
    }

    async function send(value: number, force = false) {
      if (state.disabled || (!force && value <= state.lastSent)) {
        return;
      }
      state.lastSent = Math.max(state.lastSent, value);
      state.lastSentAt = Date.now();
      try {
        const response = await fetch(`/api/progress/${storySlug}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: payload(value)
        });
        if (response.status === 401) {
          state.disabled = true;
          return;
        }
        const data = (await response.json().catch(() => null)) as RespuestaProgreso | null;
        if (data?.newlyCompleted) {
          setAviso({
            exp: data.expGanada ?? 0,
            nivel: data.nivel ?? 1,
            subioNivel: data.subioNivel === true,
            logros: data.logrosNuevos ?? [],
            ritual: data.ritualPendiente === true
          });
        }
        // Avance suficiente pero aún falta tiempo de lectura: se reintenta
        // cuando el servidor indique, por si el lector sigue en la página.
        if (typeof data?.pendingSeconds === "number") {
          window.clearTimeout(retryTimer);
          retryTimer = window.setTimeout(
            () => void send(Math.round(state.latest * 100), true),
            (data.pendingSeconds + 1) * 1000
          );
        }
      } catch {
        // Sin red o servidor caído: el próximo tick lo reintenta.
        state.lastSent = -1;
      }
    }

    const timer = window.setInterval(() => {
      const value = Math.round(state.latest * 100);
      const due =
        value >= state.lastSent + SYNC_STEP ||
        (value > state.lastSent && Date.now() - state.lastSentAt >= SYNC_INTERVAL_MS);
      if (due) {
        void send(value);
      }
    }, 2_000);

    // Último envío al salir de la página (el umbral de completado lo decide el servidor).
    function flush() {
      const value = Math.round(state.latest * 100);
      if (!state.disabled && value > state.lastSent) {
        navigator.sendBeacon(
          `/api/progress/${storySlug}`,
          new Blob([payload(value)], { type: "application/json" })
        );
        state.lastSent = value;
      }
    }
    window.addEventListener("pagehide", flush);

    return () => {
      window.clearInterval(timer);
      window.clearTimeout(retryTimer);
      window.removeEventListener("pagehide", flush);
      flush();
    };
  }, [storySlug]);

  // Tramos realmente visitados: qué párrafos estuvieron en pantalla un rato.
  useEffect(() => {
    if (!storySlug) {
      return;
    }
    const root = document.querySelector<HTMLElement>(target);
    const items = root ? Array.from(root.querySelectorAll<HTMLElement>("p, h2")) : [];
    if (items.length === 0) {
      return;
    }

    const storageKey = SEEN_STORAGE_PREFIX + storySlug;
    const seen = loadSeen(storageKey, items.length);
    const indexOf = new Map(items.map((item, index) => [item, index]));
    const visible = new Set<number>();
    let previous = new Set<number>();

    function recount() {
      const count = seen.reduce((total, value) => total + (value ? 1 : 0), 0);
      seenPercent.current = Math.round((count / items.length) * 100);
    }
    recount();

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const index = indexOf.get(entry.target as HTMLElement);
        if (index === undefined) {
          continue;
        }
        if (entry.isIntersecting) {
          visible.add(index);
        } else {
          visible.delete(index);
        }
      }
    });
    items.forEach((item) => observer.observe(item));

    const timer = window.setInterval(() => {
      let changed = false;
      for (const index of visible) {
        if (previous.has(index) && !seen[index]) {
          seen[index] = true;
          changed = true;
        }
      }
      previous = new Set(visible);
      if (changed) {
        recount();
        saveSeen(storageKey, seen);
      }
    }, SEEN_TICK_MS);

    return () => {
      window.clearInterval(timer);
      observer.disconnect();
    };
  }, [storySlug, target]);

  useEffect(() => {
    const element = document.querySelector<HTMLElement>(target);

    if (!element) {
      return;
    }

    let frame = 0;

    function update() {
      frame = 0;
      const rect = element!.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const advanced = -rect.top;
      const value =
        total > 0 ? Math.min(1, Math.max(0, advanced / total)) : rect.top < window.innerHeight ? 1 : 0;
      setProgress(value);
      syncState.current.latest = value;
    }

    function schedule() {
      if (!frame) {
        frame = window.requestAnimationFrame(update);
      }
    }

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, [target]);

  // El aviso se cierra solo, salvo que invite al Ritual (ahí espera al lector).
  useEffect(() => {
    if (!aviso || aviso.ritual) {
      return;
    }
    const timer = window.setTimeout(() => setAviso(null), 12_000);
    return () => window.clearTimeout(timer);
  }, [aviso]);

  return (
    <>
      <div className="story-progress" aria-hidden="true">
        <div className="story-progress__fill" style={{ transform: `scaleX(${progress})` }} />
      </div>
      <div className="lectura-aviso-zona" role="status" aria-live="polite">
        {aviso && (
          <div className="lectura-aviso">
            <p className="lectura-aviso__titulo">
              ✦ Relato completado
              {aviso.exp > 0 && (
                <>
                  {" "}· <strong>+{aviso.exp} EXP</strong>
                </>
              )}
            </p>
            {aviso.subioNivel && <p className="lectura-aviso__nivel">¡Alcanzaste el nivel {aviso.nivel}!</p>}
            {aviso.logros.map((titulo) => (
              <p key={titulo}>
                Logro desbloqueado: <strong>{titulo}</strong>
              </p>
            ))}
            {aviso.ritual && (
              <Link className="lectura-aviso__ritual" href="/cuenta/ritual">
                El cristal te espera: haz el Ritual de Afinación →
              </Link>
            )}
            <button type="button" className="lectura-aviso__cerrar" aria-label="Cerrar aviso" onClick={() => setAviso(null)}>
              ×
            </button>
          </div>
        )}
      </div>
    </>
  );
}
