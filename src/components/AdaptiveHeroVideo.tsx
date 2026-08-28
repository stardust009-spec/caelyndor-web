"use client";

import { useEffect, useRef, useState } from "react";

type AdaptiveHeroVideoProps = {
  /** Fuente de máxima prioridad (calidad para buena conexión). */
  mp4: string;
  /** Fallback más liviano si el mp4 no carga a tiempo. */
  webm?: string;
  /** Imagen estática (webp) usada como póster mientras carga y si el video falla. */
  poster: string;
  /** Milisegundos a esperar a que el mp4 esté listo antes de saltar al webm. */
  timeoutMs?: number;
  className?: string;
};

type Source = { src: string; type: "video/mp4" | "video/webm" };

/**
 * Carga el mp4 primero; si no llega a estado reproducible dentro de `timeoutMs`
 * (conexión lenta), cambia al webm. Si el video falla del todo, muestra el
 * póster estático. Reproduce en loop y sin sonido.
 */
export function AdaptiveHeroVideo({ mp4, webm, poster, timeoutMs = 2500, className }: AdaptiveHeroVideoProps) {
  const [source, setSource] = useState<Source>({ src: mp4, type: "video/mp4" });
  const [failed, setFailed] = useState(false);
  const readyRef = useRef(false);

  // Reinicia la fuente si cambian las props (p. ej. al cambiar de álbum).
  useEffect(() => {
    readyRef.current = false;
    setFailed(false);
    setSource({ src: mp4, type: "video/mp4" });
  }, [mp4, webm]);

  // Temporizador: si el mp4 no está listo a tiempo, salta al webm (más liviano).
  useEffect(() => {
    if (source.type !== "video/mp4" || !webm) {
      return;
    }
    readyRef.current = false;
    const timer = window.setTimeout(() => {
      if (!readyRef.current) {
        setSource({ src: webm, type: "video/webm" });
      }
    }, timeoutMs);
    return () => window.clearTimeout(timer);
  }, [source, webm, timeoutMs]);

  function handleReady() {
    readyRef.current = true;
  }

  function handleError() {
    if (source.type === "video/mp4" && webm) {
      setSource({ src: webm, type: "video/webm" });
    } else {
      setFailed(true);
    }
  }

  if (failed) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img className={className} src={poster} alt="" aria-hidden="true" />;
  }

  return (
    <video
      key={source.src}
      className={className}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden="true"
      onCanPlay={handleReady}
      onLoadedData={handleReady}
      onPlaying={handleReady}
      onError={handleError}
    >
      <source src={source.src} type={source.type} />
    </video>
  );
}
