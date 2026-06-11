import type { Metadata } from "next";
import { PortalCard } from "@/components/PortalCard";
import { SectionIntro } from "@/components/SectionIntro";

export const metadata: Metadata = {
  title: "Archivo"
};

const archiveItems = [
  { title: "Mundo", text: "Cosmología, mapas y reglas generales del universo.", href: "/archivo/mundo" },
  { title: "Reinos", text: "Casas, territorios, fronteras y conflictos.", href: "/archivo/reinos" },
  { title: "Bestiario", text: "Criaturas, presencias y amenazas clasificables.", href: "/archivo/bestiario" },
  { title: "Sistema mágico", text: "Afinidades, límites, costes y excepciones.", href: "/archivo/sistema-magico" },
  { title: "Glosario", text: "Términos, nombres propios y lenguaje canónico.", href: "/archivo/glosario" },
  { title: "Documentos internos", text: "Cartas, fragmentos y registros diegéticos.", href: "/archivo/documentos-internos" }
];

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
