import type { Metadata } from "next";
import { DownloadsBrowser } from "@/components/DownloadsBrowser";
import { SectionIntro } from "@/components/SectionIntro";
import { downloadItems } from "@/data/wallpapers";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const description =
  "Fondos de pantalla y skins del archivo visual de Caelyndor para escritorio y mobile: retratos en 4K, loops animados y la línea Sylvalis Café de Rubí, Yuki, Lyzi y Aria. Filtra por personaje y categoría.";

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
          text="Fondos de pantalla y skins del Velo, para escritorio y mobile: retratos en 4K, loops animados y otras facetas de las chicas de Caelyndor. Filtra por personaje y categoría, y llévalas a tu mundo."
        />

        <DownloadsBrowser items={downloadItems} />
      </div>
    </section>
  );
}
