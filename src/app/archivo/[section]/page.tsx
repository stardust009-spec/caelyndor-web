import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";

const sections: Record<string, { title: string; text: string }> = {
  reinos: {
    title: "Reinos",
    text: "Casas, territorios, jerarquías y conflictos políticos del continente."
  },
  "sistema-magico": {
    title: "Sistema mágico",
    text: "Afinidades, costes, límites y excepciones del poder en Caelyndor."
  },
  "documentos-internos": {
    title: "Documentos internos",
    text: "Cartas, fragmentos, informes y documentos diegéticos del Archivo."
  }
};

type ArchiveSectionPageProps = {
  params: Promise<{ section: string }>;
};

export function generateStaticParams() {
  return Object.keys(sections).map((section) => ({ section }));
}

export async function generateMetadata({ params }: ArchiveSectionPageProps) {
  const { section } = await params;
  return {
    title: sections[section]?.title ?? "Archivo"
  };
}

export default async function ArchiveSectionPage({ params }: ArchiveSectionPageProps) {
  const { section } = await params;
  const content = sections[section];

  if (!content) {
    notFound();
  }

  return (
    <section className="page-section">
      <div className="container narrow">
        <Breadcrumbs
          items={[
            { href: "/archivo", label: "Archivo" },
            { href: `/archivo/${section}`, label: content.title }
          ]}
        />
        <p className="eyebrow">Sección del Archivo</p>
        <h1>{content.title}</h1>
        <p className="lead">{content.text}</p>
        <div className="placeholder-panel">
          <p>
            Los archivistas siguen reuniendo material para esta sección. Mientras el canon
            termina de asentarse, el <Link href="/archivo/bestiario">Bestiario</Link>, el{" "}
            <Link href="/archivo/glosario">Glosario</Link> y el{" "}
            <Link href="/archivo/mundo">Mundo</Link> ya están abiertos a consulta.
          </p>
        </div>
        <Link className="button" href="/archivo">
          Volver al archivo
        </Link>
      </div>
    </section>
  );
}
