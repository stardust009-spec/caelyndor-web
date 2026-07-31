"use client";

import { useEffect, useRef, useState } from "react";

type ReadingProgressProps = {
  target?: string;
  /** Slug del relato: si está presente, el progreso se sincroniza al servidor. */
  storySlug?: string;
};

/** Envía al servidor cada salto de ≥5% o cada 10 s como máximo. */
const SYNC_STEP = 5;
const SYNC_INTERVAL_MS = 10_000;

export function ReadingProgress({ target = ".story-reader", storySlug }: ReadingProgressProps) {
  const [progress, setProgress] = useState(0);
  const syncState = useRef({ lastSent: -1, lastSentAt: 0, latest: 0, disabled: false });

  // Sincronización con el backend (solo lectores con sesión; un 401 apaga el
  // envío en silencio — los visitantes anónimos no generan tráfico repetido).
  useEffect(() => {
    if (!storySlug) {
      return;
    }
    const state = syncState.current;

    async function send(value: number) {
      if (state.disabled || value <= state.lastSent) {
        return;
      }
      state.lastSent = value;
      state.lastSentAt = Date.now();
      try {
        const response = await fetch(`/api/progress/${storySlug}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ progress: value })
        });
        if (response.status === 401) {
          state.disabled = true;
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

    // Último envío al salir de la página (el umbral del 95% lo decide el servidor).
    function flush() {
      const value = Math.round(state.latest * 100);
      if (!state.disabled && value > state.lastSent) {
        navigator.sendBeacon(
          `/api/progress/${storySlug}`,
          new Blob([JSON.stringify({ progress: value })], { type: "application/json" })
        );
        state.lastSent = value;
      }
    }
    window.addEventListener("pagehide", flush);

    return () => {
      window.clearInterval(timer);
      window.removeEventListener("pagehide", flush);
      flush();
    };
  }, [storySlug]);

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

  return (
    <div className="story-progress" aria-hidden="true">
      <div className="story-progress__fill" style={{ transform: `scaleX(${progress})` }} />
    </div>
  );
}
