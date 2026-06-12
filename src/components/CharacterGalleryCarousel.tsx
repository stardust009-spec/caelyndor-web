"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ChroniclerNote } from "@/components/ChroniclerNote";
import { assetImage } from "@/data/assets";

// Convención de galería: [slug]-galeria-carrusel-imagen-[1-7].webp en Caelyndor-Assets.
const GALLERY_SLOTS = [1, 2, 3, 4, 5, 6, 7];

type SlotStatus = Record<number, "ok" | "fail">;

type CharacterGalleryCarouselProps = {
  slug: string;
  name: string;
};

function gallerySrc(slug: string, slot: number) {
  return assetImage(`${slug}-galeria-carrusel-imagen-${slot}.webp`);
}

export function CharacterGalleryCarousel({ slug, name }: CharacterGalleryCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<SlotStatus>({});

  // Sondea las 7 URLs por convención; solo se montan las que existen.
  useEffect(() => {
    let cancelled = false;
    setStatus({});

    GALLERY_SLOTS.forEach((slot) => {
      const probe = new window.Image();
      probe.onload = () => {
        if (!cancelled) {
          setStatus((current) => ({ ...current, [slot]: "ok" }));
        }
      };
      probe.onerror = () => {
        if (!cancelled) {
          setStatus((current) => ({ ...current, [slot]: "fail" }));
        }
      };
      probe.src = gallerySrc(slug, slot);
    });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  const slides = GALLERY_SLOTS.filter((slot) => status[slot] === "ok");
  const allResolved = GALLERY_SLOTS.every((slot) => status[slot] !== undefined);

  if (slides.length === 0) {
    return allResolved ? <ChroniclerNote /> : null;
  }

  function scrollTrack(direction: -1 | 1) {
    const track = trackRef.current;
    if (!track) {
      return;
    }
    track.scrollBy({ left: direction * track.clientWidth * 0.85, behavior: "smooth" });
  }

  return (
    <div className="character-carousel">
      {slides.length > 1 ? (
        <button
          className="character-carousel__nav character-carousel__nav--previous"
          type="button"
          aria-label={`Imagen anterior de la galería de ${name}`}
          onClick={() => scrollTrack(-1)}
        >
          ‹
        </button>
      ) : null}
      <div className="character-carousel__track" ref={trackRef}>
        {slides.map((slot) => (
          <figure className="character-carousel__slide" key={slot}>
            <Image
              src={gallerySrc(slug, slot)}
              alt={`Imagen ${slot} de la galería de ${name}`}
              width={600}
              height={750}
              loading="lazy"
              unoptimized
            />
          </figure>
        ))}
      </div>
      {slides.length > 1 ? (
        <button
          className="character-carousel__nav character-carousel__nav--next"
          type="button"
          aria-label={`Imagen siguiente de la galería de ${name}`}
          onClick={() => scrollTrack(1)}
        >
          ›
        </button>
      ) : null}
    </div>
  );
}
