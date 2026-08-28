"use client";

import Image from "next/image";
import { useState } from "react";

type CoverMediaProps = {
  coverImage?: string;
  /** Si existe, se reproduce en loop y sin sonido sobre la portada estática. */
  coverVideo?: string;
  alt: string;
  fallback: string;
  sizes: string;
  priority?: boolean;
};

export function CoverMedia({ coverImage, coverVideo, alt, fallback, sizes, priority }: CoverMediaProps) {
  const [imgSrc, setImgSrc] = useState(coverImage ?? fallback);

  if (coverVideo) {
    return (
      <video
        className="cover-media__video"
        src={coverVideo}
        poster={coverImage ?? fallback}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={alt}
      />
    );
  }

  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      onError={() => setImgSrc(fallback)}
    />
  );
}
