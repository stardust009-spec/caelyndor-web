import type { Metadata } from "next";
import { MusicArchive } from "@/components/MusicArchive";
import { musicTracks } from "@/data/music";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const description =
  "El archivo sonoro de Caelyndor: temas de personajes, regiones, arcos y dúos para acompañar la lectura del universo, compuestos para sumergirte en cada escena.";

export const metadata: Metadata = {
  title: "Música",
  description,
  alternates: { canonical: "/musica" },
  openGraph: {
    type: "website",
    title: "Música | Caelyndor",
    description,
    url: `${SITE_URL}/musica`,
    siteName: SITE_NAME,
    images: ["/opengraph-image.jpg"]
  },
  twitter: {
    card: "summary_large_image",
    title: "Música | Caelyndor",
    description,
    images: ["/opengraph-image.jpg"]
  }
};

export default function MusicPage() {
  return (
    <section className="page-section page-section--music">
      <div className="container">
        <MusicArchive tracks={musicTracks} />
      </div>
    </section>
  );
}
