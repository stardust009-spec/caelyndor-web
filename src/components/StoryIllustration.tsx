"use client";

import { useEffect, useState } from "react";
import { assetImage } from "@/data/assets";

type StoryIllustrationProps = {
  slug: string;
  /** Número de capítulo con dos dígitos ("06"), o una clave no numérica ("bonus"). */
  number: string;
  title: string;
  /** Etiqueta pequeña opcional sobre la imagen (p. ej. "Ilustración extra"). */
  caption?: string;
};

function RotateDeviceIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="8" y="2" width="8" height="14" rx="1.6" transform="rotate(-32 12 9)" />
      <path d="M4.5 15.5a8 8 0 0 0 13 3.2" />
      <polyline points="17.8 14.2 17.8 18.8 13.2 18.8" />
    </svg>
  );
}

export function StoryIllustration({ slug, number, title, caption }: StoryIllustrationProps) {
  // Cadena de formatos: se intenta webp, luego jpg y png; si ninguno existe,
  // el bloque no se renderiza (el autor todavía no subió el arte del capítulo).
  const candidates = [
    assetImage(`relato-${slug}-ilustracion-${number}.webp`),
    assetImage(`relato-${slug}-ilustracion-${number}.jpg`),
    assetImage(`relato-${slug}-ilustracion-${number}.png`)
  ];
  const [candidateIndex, setCandidateIndex] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) {
      return;
    }

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("keydown", onKey);
    document.body.classList.add("story-lightbox-open");

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.classList.remove("story-lightbox-open");
    };
  }, [open]);

  if (candidateIndex >= candidates.length) {
    return null;
  }

  const src = candidates[candidateIndex];
  const isChapter = /^\d+$/.test(number);
  const scope = isChapter ? `del capítulo ${Number(number)}` : "extra";
  const alt = `Ilustración ${scope} de «${title}»`;

  return (
    <figure className="story-illustration">
      {caption ? <figcaption className="story-illustration__caption">{caption}</figcaption> : null}
      <button
        type="button"
        className="story-illustration__thumb"
        onClick={() => setOpen(true)}
        aria-label={`Ampliar la ilustración ${scope} a pantalla completa`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setCandidateIndex((current) => current + 1)}
        />
        <span className="story-illustration__expand" aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 3 21 3 21 9" />
            <polyline points="9 21 3 21 3 15" />
            <line x1="21" y1="3" x2="14" y2="10" />
            <line x1="3" y1="21" x2="10" y2="14" />
          </svg>
        </span>
      </button>

      {open ? (
        <div
          className="story-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          onClick={() => setOpen(false)}
        >
          <button type="button" className="story-lightbox__close" aria-label="Cerrar pantalla completa">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="story-lightbox__img" src={src} alt={alt} onClick={(event) => event.stopPropagation()} />
          <div className="story-lightbox__rotate" aria-hidden="true">
            <RotateDeviceIcon />
            <span>Gira tu teléfono para verla en grande</span>
          </div>
        </div>
      ) : null}
    </figure>
  );
}
