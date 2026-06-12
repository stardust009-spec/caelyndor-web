"use client";

import Image from "next/image";
import { useState } from "react";

type CharacterPortraitProps = {
  src: string;
  name: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  loading?: "lazy" | "eager";
  decorative?: boolean;
};

export function CharacterPortrait({
  src,
  name,
  width,
  height,
  className,
  priority,
  loading,
  decorative = false
}: CharacterPortraitProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const failed = failedSrc === src;

  if (failed) {
    return (
      <div
        className={`character-portrait-fallback${className ? ` ${className}` : ""}`}
        role={decorative ? undefined : "img"}
        aria-label={decorative ? undefined : `Retrato pendiente de ${name}`}
        aria-hidden={decorative ? true : undefined}
      >
        <span className="character-portrait-fallback__ornament" aria-hidden="true">
          ✦
        </span>
        <span className="character-portrait-fallback__eyebrow">Crónicas de Caelyndor</span>
        <span className="character-portrait-fallback__name">{name}</span>
        <span className="character-portrait-fallback__note">Retrato pendiente</span>
      </div>
    );
  }

  return (
    <Image
      className={className}
      src={src}
      alt={decorative ? "" : `Retrato de ${name}`}
      width={width}
      height={height}
      priority={priority}
      loading={loading}
      unoptimized
      onError={() => setFailedSrc(src)}
    />
  );
}
