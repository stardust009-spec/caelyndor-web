import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { DownloadCard } from "@/components/DownloadCard";
import { SectionIntro } from "@/components/SectionIntro";
import { wallpaperGroups } from "@/data/wallpapers";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const description =
  "Fondos de pantalla del archivo visual de Caelyndor: retratos en 4K y loops animados de Rubí, Yuki y Lyzi para llevar el Velo a tu pantalla. Descarga libre, imagen estática o en movimiento.";

export const metadata: Metadata = {
  title: "Descargas",
  description,
  alternates: { canonical: "/descargas" },
  openGraph: {
    type: "website",
    title: "Descargas | Caelyndor",
    description,
    url: `${SITE_URL}/descargas`,
    siteName: SITE_NAME,
    images: ["/opengraph-image.jpg"]
  },
  twitter: {
    card: "summary_large_image",
    title: "Descargas | Caelyndor",
    description,
    images: ["/opengraph-image.jpg"]
  }
};

export default function DownloadsPage() {
  return (
    <section className="page-section">
      <div className="container">
        <SectionIntro
          eyebrow="Archivo visual"
          title="Descargas"
          text="Fondos de pantalla del Velo: retratos en 4K y loops animados de las chicas de Caelyndor. Invoca la imagen estática o despierta el movimiento, y llévalas a tu mundo."
        />

        <div className="wallpaper-groups">
          {wallpaperGroups.map((group) => (
            <section
              key={group.character}
              className="wallpaper-group"
              aria-label={`Fondos de ${group.character}`}
              style={{ "--wallpaper-accent": group.accent } as CSSProperties}
            >
              <div className="wallpaper-group__head">
                <h2>{group.character}</h2>
                <p>{group.blurb}</p>
              </div>
              <div className="wallpaper-grid">
                {group.wallpapers.map((wallpaper) => (
                  <DownloadCard key={wallpaper.id} wallpaper={wallpaper} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
