import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { cosmologyPanels, worldRegions } from "@/data/world";

export const metadata: Metadata = {
  title: "Mundo"
};

export default function WorldPage() {
  return (
    <section className="page-section world-page">
      <div className="container">
        <Breadcrumbs
          items={[
            { href: "/archivo", label: "Archivo" },
            { href: "/archivo/mundo", label: "Mundo" }
          ]}
        />
        <header className="world-hero">
          <p className="eyebrow">MUNDO</p>
          <h1>Mundo</h1>
          <p>
            Cosmología, regiones y reglas de mundo de Caelyndor, tal como las ordena el
            Archivo: primero lo que sostiene la realidad, después los territorios que la
            habitan.
          </p>
        </header>

        <section className="world-section" aria-labelledby="cosmologia-titulo">
          <h2 id="cosmologia-titulo">Cosmología</h2>
          <div className="world-grid">
            {cosmologyPanels.map((panel) => (
              <article className="world-card" key={panel.id}>
                <p className="eyebrow">Estructura del mundo</p>
                <h3>{panel.title}</h3>
                <p>{panel.text}</p>
                {panel.seeAlso && panel.seeAlso.length > 0 ? (
                  <p className="world-card__links">
                    <span>Ver también:</span>
                    {panel.seeAlso.map((link) => (
                      <Link className="text-link" key={`${panel.id}-${link.href}`} href={link.href}>
                        {link.label}
                      </Link>
                    ))}
                  </p>
                ) : null}
              </article>
            ))}
          </div>
        </section>

        <section className="world-section" aria-labelledby="regiones-titulo">
          <h2 id="regiones-titulo">Regiones y territorios</h2>
          <div className="world-grid">
            {worldRegions.map((region) => (
              <article className="world-card" key={region.slug}>
                <p className="eyebrow">{region.kind}</p>
                <h3>{region.name}</h3>
                <p className="world-card__epithet">{region.epithet}</p>
                <p>{region.description}</p>
                {region.seeAlso && region.seeAlso.length > 0 ? (
                  <p className="world-card__links">
                    <span>Presencias en el Archivo:</span>
                    {region.seeAlso.map((link) => (
                      <Link
                        className="text-link"
                        key={`${region.slug}-${link.href}`}
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
      </div>
    </section>
  );
}
