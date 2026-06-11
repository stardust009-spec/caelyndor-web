import type { Metadata } from "next";
import { GalleryBrowser } from "@/components/GalleryBrowser";
import { SectionIntro } from "@/components/SectionIntro";
import { galleryCategories, galleryItems } from "@/data/gallery";

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
          text="El archivo visual de Caelyndor: retratos canónicos, criaturas del Bestiario y portadas musicales reunidos en una sola galería. Filtra por categoría o amplía cada obra."
        />
        <GalleryBrowser items={galleryItems} categories={galleryCategories} />
      </div>
    </section>
  );
}
