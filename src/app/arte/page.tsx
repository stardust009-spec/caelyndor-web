import type { Metadata } from "next";
import { GalleryGrid } from "@/components/GalleryGrid";
import { SectionIntro } from "@/components/SectionIntro";
import { galleryItems } from "@/data/gallery";

export const metadata: Metadata = {
  title: "Arte"
};

export default function ArtPage() {
  return (
    <section className="page-section">
      <div className="container">
        <SectionIntro
          eyebrow="Galería"
          title="Arte"
          text="Portadas, personajes, interiores y arte conceptual. TODO: sumar lightbox simple cuando haya arte final y necesidades de navegación por imagen."
        />
        <GalleryGrid items={galleryItems} />
      </div>
    </section>
  );
}
