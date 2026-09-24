import type { Metadata } from "next";
import { PortalCard } from "@/components/PortalCard";
import { SectionIntro } from "@/components/SectionIntro";
import { archiveSections as archiveItems } from "@/data/archiveSections";

export const metadata: Metadata = {
  title: "Archivo"
};

export default function ArchivePage() {
  return (
    <section className="page-section">
      <div className="container">
        <SectionIntro
          eyebrow="Centro documental"
          title="Archivo"
          text="Hub general para expandir el mundo sin convertirlo en una wiki plana: cada área queda lista para recibir páginas internas."
        />
        <div className="portal-grid">
          {archiveItems.map((item) => (
            <PortalCard key={item.href} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
