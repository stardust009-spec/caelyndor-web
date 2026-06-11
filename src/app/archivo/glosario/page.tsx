import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { GlossaryBrowser } from "@/components/GlossaryBrowser";
import { glossaryCategories, glossaryEntries } from "@/data/glossary";

export const metadata: Metadata = {
  title: "Glosario"
};

export default function GlossaryPage() {
  return (
    <section className="page-section glossary-page">
      <div className="container">
        <Breadcrumbs
          items={[
            { href: "/archivo", label: "Archivo" },
            { href: "/archivo/glosario", label: "Glosario" }
          ]}
        />
        <header className="glossary-hero">
          <p className="eyebrow">GLOSARIO</p>
          <h1>Glosario</h1>
          <p>
            Términos, nombres propios y lenguaje canónico de Caelyndor, ordenados por los
            curadores del Archivo.
          </p>
        </header>

        <GlossaryBrowser categories={glossaryCategories} entries={glossaryEntries} />
      </div>
    </section>
  );
}
