import type { Metadata } from "next";
import { BestiaryCategoryBrowser } from "@/components/BestiaryCategoryBrowser";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { bestiaryCategories, bestiaryEntries } from "@/data/bestiary";

export const metadata: Metadata = {
  title: "Bestiario"
};

export default function BestiaryPage() {
  return (
    <section className="page-section bestiary-page">
      <div className="container">
        <Breadcrumbs
          items={[
            { href: "/archivo", label: "Archivo" },
            { href: "/archivo/bestiario", label: "Bestiario" }
          ]}
        />
        <header className="bestiary-hero">
          <p className="eyebrow">BESTIARIO</p>
          <h1>Bestiario</h1>
          <p>Registro de criaturas, presencias y amenazas clasificadas por el Archivo.</p>
        </header>

        <BestiaryCategoryBrowser categories={bestiaryCategories} entries={bestiaryEntries} />
      </div>
    </section>
  );
}
