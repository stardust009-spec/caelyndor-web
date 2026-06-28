"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import { useDownloadStats } from "@/components/useDownloadStats";
import type { Wallpaper } from "@/data/wallpapers";

function invocations(count: number | null) {
  if (count === null) {
    return "Invocaciones –";
  }
  return count === 1 ? "1 invocación" : `${count} invocaciones`;
}

export function DownloadCard({ wallpaper }: { wallpaper: Wallpaper }) {
  const ids = [wallpaper.png.fileId, wallpaper.mp4?.fileId].filter(
    (id): id is string => Boolean(id)
  );
  const { counts, registerDownload } = useDownloadStats(ids);

  return (
    <article
      className="wallpaper-card"
      style={{ "--wallpaper-accent": wallpaper.accent } as CSSProperties}
    >
      <a
        className="wallpaper-card__preview"
        href={wallpaper.png.url}
        onClick={() => registerDownload(wallpaper.png.fileId)}
        rel="noopener"
        aria-label={`Descargar ${wallpaper.title} en imagen estática`}
      >
        <Image
          src={wallpaper.preview}
          alt={`Vista previa del fondo ${wallpaper.title}`}
          fill
          sizes="(max-width: 760px) 92vw, 380px"
        />
      </a>

      <div className="wallpaper-card__copy">
        <h3>{wallpaper.title}</h3>

        <div className="wallpaper-card__downloads">
          <div className="wallpaper-card__download">
            <a
              className="wallpaper-card__button"
              href={wallpaper.png.url}
              onClick={() => registerDownload(wallpaper.png.fileId)}
              rel="noopener"
            >
              <span aria-hidden="true">✦</span> Invocar imagen
            </a>
            <span className="wallpaper-card__count" aria-live="polite">
              {invocations(counts[wallpaper.png.fileId] ?? null)}
            </span>
          </div>

          {wallpaper.mp4 ? (
            <div className="wallpaper-card__download">
              <a
                className="wallpaper-card__button wallpaper-card__button--motion"
                href={wallpaper.mp4.url}
                onClick={() => registerDownload(wallpaper.mp4!.fileId)}
                rel="noopener"
              >
                <span aria-hidden="true">❉</span> Invocar en movimiento
              </a>
              <span className="wallpaper-card__count" aria-live="polite">
                {invocations(counts[wallpaper.mp4.fileId] ?? null)}
              </span>
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
}
