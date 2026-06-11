"use client";

import Image from "next/image";
import { useState } from "react";
import { assetImage } from "@/data/assets";

type StoryCoverProps = {
  slug: string;
  title: string;
};

export function StoryCover({ slug, title }: StoryCoverProps) {
  const candidates = [
    assetImage(`relato-${slug}.png`),
    assetImage(`relato-${slug}.jpg`)
  ];
  const [candidateIndex, setCandidateIndex] = useState(0);

  if (candidateIndex >= candidates.length) {
    return (
      <div className="story-cover" aria-hidden="true">
        <div className="story-cover__frame">
          <p className="story-cover__eyebrow">Crónicas de Caelyndor</p>
          <p className="story-cover__ornament">✦</p>
          <p className="story-cover__title">{title}</p>
          <p className="story-cover__kind">Mini relato</p>
        </div>
      </div>
    );
  }

  return (
    <div className="story-cover story-cover--art">
      <Image
        src={candidates[candidateIndex]}
        alt={`Portada de ${title}`}
        fill
        sizes="(max-width: 760px) 100vw, 420px"
        unoptimized
        onError={() => setCandidateIndex((value) => value + 1)}
      />
    </div>
  );
}
