"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import { useDownloadStats } from "@/components/useDownloadStats";
import type { DownloadItem } from "@/data/wallpapers";

function invocations(count: number | null) {
  if (count === null) {
    return "Invocaciones –";
  }
  return count === 1 ? "1 invocación" : `${count} invocaciones`;
}

const typeLabel: Record<DownloadItem["type"], string> = {
  wallpaper: "Wallpaper",
  skin: "Skin"
};

const orientationLabel: Record<DownloadItem["orientation"], string> = {
  desktop: "Desktop",
  mobile: "Mobile"
};

// El copy del botón cambia según tipo y orientación. Las skins evocan "otra
// faceta del personaje"; los wallpapers, invocar la imagen / el movimiento.
function downloadCopy(item: DownloadItem): { png: string; mp4: string } {
  if (item.type === "skin") {
    return { png: "Invocar esta faceta", mp4: "Despertar esta faceta" };
  }
  if (item.orientation === "mobile") {
    return { png: "Llevar al bolsillo", mp4: "Despertar en mobile" };
  }
  return { png: "Invocar imagen", mp4: "Invocar en movimiento" };
}

export function DownloadCard({ item }: { item: DownloadItem }) {
  const ids = [item.png.fileId, item.mp4?.fileId].filter(
    (id): id is string => Boolean(id)
  );
  const { counts, registerDownload } = useDownloadStats(ids);
  const labels = downloadCopy(item);
  const isMobile = item.orientation === "mobile";
  const badge = `${typeLabel[item.type]} · ${orientationLabel[item.orientation]}`;

  return (
    <article
      className={`wallpaper-card${isMobile ? " wallpaper-card--mobile" : ""}`}
      style={{ "--wallpaper-accent": item.accent } as CSSProperties}
    >
      <a
        className="wallpaper-card__preview"
        href={item.png.url}
        onClick={() => registerDownload(item.png.fileId)}
        rel="noopener"
        aria-label={`Descargar ${item.title} (${badge}) en imagen estática`}
      >
        <Image
          src={item.preview}
          alt={`Vista previa de ${item.title}`}
          fill
          sizes={isMobile ? "(max-width: 760px) 44vw, 220px" : "(max-width: 760px) 92vw, 380px"}
        />
        <span className="wallpaper-card__badge">{badge}</span>
      </a>

      <div className="wallpaper-card__copy">
        <h3>{item.title}</h3>

        <div className="wallpaper-card__downloads">
          <div className="wallpaper-card__download">
            <a
              className="wallpaper-card__button"
              href={item.png.url}
              onClick={() => registerDownload(item.png.fileId)}
              rel="noopener"
            >
              <span aria-hidden="true">✦</span> {labels.png}
            </a>
            <span className="wallpaper-card__count" aria-live="polite">
              {invocations(counts[item.png.fileId] ?? null)}
            </span>
          </div>

          {item.mp4 ? (
            <div className="wallpaper-card__download">
              <a
                className="wallpaper-card__button wallpaper-card__button--motion"
                href={item.mp4.url}
                onClick={() => registerDownload(item.mp4!.fileId)}
                rel="noopener"
              >
                <span aria-hidden="true">❉</span> {labels.mp4}
              </a>
              <span className="wallpaper-card__count" aria-live="polite">
                {invocations(counts[item.mp4.fileId] ?? null)}
              </span>
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
}
