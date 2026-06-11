import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";

const sections: Record<string, { title: string; text: string }> = {
  mundo: {
    title: "Mundo",
    text: "Ruta preparada para cosmología, mapas, regiones y reglas de mundo."
  },
  reinos: {
    title: "Reinos",
    text: "Ruta preparada para casas, territorios, jerarquías y conflictos políticos."
  },
  "sistema-magico": {
    title: "Sistema mágico",
    text: "Ruta preparada para afinidades, costes, límites y excepciones."
  },
  glosario: {
    title: "Glosario",
    text: "Ruta preparada para términos, nombres propios y lenguaje canónico."
  },
  "documentos-internos": {
    title: "Documentos internos",
    text: "Ruta preparada para cartas, fragmentos, informes y documentos diegéticos."
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
        <p className="eyebrow">Ruta preparada</p>
        <h1>{content.title}</h1>
        <p className="lead">{content.text}</p>
        <div className="placeholder-panel">
          <p>Contenido pendiente. Este espacio queda listo para fichas, listas, galerías o documentos cuando el canon esté definido.</p>
        </div>
        <Link className="button" href="/archivo">
          Volver al archivo
        </Link>
      </div>
    </section>
  );
}
