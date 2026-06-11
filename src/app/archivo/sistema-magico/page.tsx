import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { magicSections } from "@/data/magic";

export const metadata: Metadata = {
  title: "Sistema mágico"
};

export default function MagicSystemPage() {
  return (
    <section className="page-section world-page">
      <div className="container">
        <Breadcrumbs
          items={[
            { href: "/archivo", label: "Archivo" },
            { href: "/archivo/sistema-magico", label: "Sistema mágico" }
          ]}
        />
        <header className="world-hero">
          <p className="eyebrow">SISTEMA MÁGICO</p>
          <h1>Sistema mágico</h1>
          <p>
            Afinidades, costes, límites y excepciones del poder en Caelyndor. El Archivo no
            enseña a usar la magia: enseña a no sorprenderse cuando cobra.
          </p>
        </header>

        {magicSections.map((section) => (
          <section
            className="world-section"
            key={section.id}
            aria-labelledby={`${section.id}-titulo`}
          >
            <h2 id={`${section.id}-titulo`}>{section.title}</h2>
            <p className="world-section__intro">{section.intro}</p>
            <div className="world-grid">
              {section.panels.map((panel) => (
                <article className="world-card" key={panel.id}>
                  <p className="eyebrow">{panel.eyebrow}</p>
                  <h3>{panel.title}</h3>
                  <p>{panel.text}</p>
                  {panel.seeAlso && panel.seeAlso.length > 0 ? (
                    <p className="world-card__links">
                      <span>Ver también:</span>
                      {panel.seeAlso.map((link) => (
                        <Link
                          className="text-link"
                          key={`${panel.id}-${link.href}`}
                          href={link.href}
                        >
                          {link.label}
                        </Link>
                      ))}
                    </p>
                  ) : null}
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}
