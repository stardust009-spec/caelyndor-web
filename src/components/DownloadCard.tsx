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

type DownloadVariant = "desktop" | "mobile";

const copy: Record<DownloadVariant, { png: string; mp4: string }> = {
  desktop: { png: "Invocar imagen", mp4: "Invocar en movimiento" },
  mobile: { png: "Llevar al bolsillo", mp4: "Despertar en mobile" }
};

export function DownloadCard({
  wallpaper,
  variant = "desktop"
}: {
  wallpaper: Wallpaper;
  variant?: DownloadVariant;
}) {
  const ids = [wallpaper.png.fileId, wallpaper.mp4?.fileId].filter(
    (id): id is string => Boolean(id)
  );
  const { counts, registerDownload } = useDownloadStats(ids);
  const labels = copy[variant];

  return (
    <article
      className={`wallpaper-card${variant === "mobile" ? " wallpaper-card--mobile" : ""}`}
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
          sizes={
            variant === "mobile"
              ? "(max-width: 760px) 44vw, 220px"
              : "(max-width: 760px) 92vw, 380px"
          }
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
              <span aria-hidden="true">✦</span> {labels.png}
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
                <span aria-hidden="true">❉</span> {labels.mp4}
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
