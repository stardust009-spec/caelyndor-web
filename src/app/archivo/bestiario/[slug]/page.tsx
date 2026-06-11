import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { bestiaryEntries, getBestiaryEntryBySlug } from "@/data/bestiary";

type BestiaryEntryPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return bestiaryEntries.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: BestiaryEntryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = getBestiaryEntryBySlug(slug);

  return {
    title: entry ? `${entry.name} — Bestiario` : "Bestiario"
  };
}

function threatClass(threatLevel: string) {
  if (threatLevel.startsWith("VI")) {
    return "bestiary-entry__threat bestiary-entry__threat--vi";
  }

  if (threatLevel.startsWith("V")) {
    return "bestiary-entry__threat bestiary-entry__threat--v";
  }

  return "bestiary-entry__threat";
}

export default async function BestiaryEntryPage({ params }: BestiaryEntryPageProps) {
  const { slug } = await params;
  const entry = getBestiaryEntryBySlug(slug);

  if (!entry) {
    notFound();
  }

  return (
    <article className="page-section bestiary-entry">
      <div className="container narrow">
        <Breadcrumbs
          items={[
            { href: "/archivo", label: "Archivo" },
            { href: "/archivo/bestiario", label: "Bestiario" },
            { href: `/archivo/bestiario/${entry.slug}`, label: entry.name }
          ]}
        />
        <header className="bestiary-entry__hero">
          <p className="eyebrow">{entry.category}</p>
          <h1>{entry.name}</h1>
          <p className="detail-hero__title">{entry.epithet}</p>
          <p className={threatClass(entry.threatLevel)}>{entry.threatLevel}</p>
        </header>

        {entry.image ? (
          <div className="bestiary-entry__media">
            <Image
              src={entry.image.src}
              alt={entry.image.alt}
              fill
              sizes="(max-width: 900px) 100vw, 860px"
              priority
              unoptimized
            />
          </div>
        ) : (
          <div className="bestiary-entry__sigil" aria-hidden="true">
            <span>{entry.threatLevel.split(" ")[0]}</span>
          </div>
        )}

        <section className="bestiary-entry__panel" aria-labelledby="datos-archivo">
          <h2 id="datos-archivo">Datos del Archivo</h2>
          <dl className="bestiary-entry__facts">
            <div>
              <dt>Clasificación</dt>
              <dd>{entry.classification}</dd>
            </div>
            <div>
              <dt>Región asociada</dt>
              <dd>{entry.region}</dd>
            </div>
            <div>
              <dt>Estado del archivo</dt>
              <dd>{entry.archiveStatus}</dd>
            </div>
            <div>
              <dt>Naturaleza</dt>
              <dd>{entry.nature}</dd>
            </div>
          </dl>
        </section>

        <section className="bestiary-entry__quote" aria-label="Cita del Archivo">
          <blockquote>
            <p>“{entry.quote}”</p>
            <cite>
              Cita del Archivo — {entry.curator} {entry.curatorIcon}
            </cite>
          </blockquote>
        </section>

        <section className="detail-section bestiary-entry__text" aria-labelledby="entrada-breve">
          <h2 id="entrada-breve">Entrada breve</h2>
          <p>{entry.shortEntry}</p>
        </section>

        <section className="detail-section bestiary-entry__text" aria-labelledby="descripcion-archivo">
          <h2 id="descripcion-archivo">Descripción del Archivo</h2>
          {entry.description.split("\n\n").map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </section>

        {entry.behavior ? (
          <section className="detail-section bestiary-entry__text" aria-labelledby="comportamiento">
            <h2 id="comportamiento">Comportamiento</h2>
            <ul className="bestiary-entry__behavior">
              {entry.behavior.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        ) : null}

        {entry.mainTraits ? (
          <section className="detail-section bestiary-entry__text" aria-labelledby="rasgos-principales">
            <h2 id="rasgos-principales">Rasgos principales</h2>
            <p>{entry.mainTraits}</p>
          </section>
        ) : null}

        <section className="detail-section bestiary-entry__note" aria-labelledby="nota-archivo">
          <p className="eyebrow" id="nota-archivo">
            Nota del Archivo
          </p>
          <p>{entry.archiveNote}</p>
        </section>

        <Link className="button" href="/archivo/bestiario">
          Volver al Bestiario
        </Link>
      </div>
    </article>
  );
}
