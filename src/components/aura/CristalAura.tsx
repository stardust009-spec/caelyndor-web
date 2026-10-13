"use client";

import { useId } from "react";

/**
 * Cristal facetado del Ritual. Toma su color de la custom property
 * `--cristal` (registrada con @property en aura-ritual.css, así el cambio de
 * color se anima). El estado lo maneja el contenedor vía data-estado:
 * dormido · despierto · leyendo · roto.
 */

const CONTORNO = "50,2 74,30 66,86 50,98 34,86 26,30";

const FACETAS = [
  "50,2 26,30 42,34",
  "50,2 42,34 58,34",
  "50,2 58,34 74,30",
  "26,30 42,34 40,84 34,86",
  "42,34 58,34 60,84 40,84",
  "58,34 74,30 66,86 60,84",
  "34,86 40,84 50,98",
  "40,84 60,84 50,98",
  "60,84 66,86 50,98"
];

const GRIETAS = [
  "M49 22 L53 31 L48 40 L51 47",
  "M51 47 L45 55 L50 63 L46 74",
  "M45 55 L36 60",
  "M50 63 L59 69 L57 79",
  "M53 31 L62 36"
];

export function CristalAura() {
  const id = useId().replace(/:/g, "");
  const clip = `cristal-clip-${id}`;
  const brillo = `cristal-brillo-${id}`;

  return (
    <svg className="cristal" viewBox="0 0 100 100" aria-hidden="true">
      <defs>
        <clipPath id={clip}>
          <polygon points={CONTORNO} />
        </clipPath>
        <linearGradient id={brillo} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0.75" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <g className="cristal__cuerpo">
        {FACETAS.map((puntos, index) => (
          <polygon key={puntos} points={puntos} className={`cristal__faceta cristal__faceta--${index + 1}`} />
        ))}
        <g clipPath={`url(#${clip})`}>
          <rect className="cristal__brillo" x="-30" y="-10" width="22" height="120" fill={`url(#${brillo})`} />
          {GRIETAS.map((d) => (
            <path key={d} d={d} className="cristal__grieta" pathLength={1} />
          ))}
        </g>
        <polygon points={CONTORNO} className="cristal__contorno" />
      </g>
    </svg>
  );
}
