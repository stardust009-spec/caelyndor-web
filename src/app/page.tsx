import type { Metadata } from "next";
import Link from "next/link";
import { FloatingLyziPlayer } from "@/components/FloatingLyziPlayer";
import { HeroVelo } from "@/components/HeroVelo";
import { JsonLd } from "@/components/JsonLd";
import { PortalCard } from "@/components/PortalCard";
import { SectionIntro } from "@/components/SectionIntro";
import { StatusPanel } from "@/components/StatusPanel";
import { currentBook } from "@/data/currentBook";
import { SITE_AUTHOR, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" }
};

const homeJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: "es-CL",
    description: SITE_DESCRIPTION
  },
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE_AUTHOR,
    url: SITE_URL,
    jobTitle: "Autor y director creativo de Caelyndor"
  }
];

const featuredLinks = [
  {
    title: "Personajes",
    text: "Rostros atravesados por heridas, pactos y lealtades inestables.",
    href: "/personajes"
  },
  {
    title: "Cronología",
    text: "Eras, rupturas y guerras ordenadas para leer el mundo sin apagar su misterio.",
    href: "/cronologia"
  },
  {
    title: "Archivo",
    text: "Reinos, glosario, bestiario y documentos listos para crecer.",
    href: "/archivo"
  }
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={homeJsonLd} />
      <HeroVelo />
      <section className="section section--raised" aria-labelledby="destacados">
        <div className="container">
          <SectionIntro
            eyebrow="Umbrales"
            title="Accesos destacados"
            text="Una entrada ordenada al universo, preparada para recibir arte final, música y textos canónicos sin cambiar la arquitectura."
          />
          <div className="portal-grid">
            {featuredLinks.map((item) => (
              <PortalCard key={item.href} {...item} />
            ))}
          </div>
        </div>
      </section>
      <section className="section" aria-labelledby="forja-home">
        <div className="container split-layout">
          <div>
            <SectionIntro
              eyebrow="Producción"
              title="Ahora en la Forja"
              text="Estado editorial del libro en curso, actualizado a medida que la escritura avanza dentro de la Forja."
            />
            <Link className="text-link" href="/nuevo-libro">
              Ver avance completo
            </Link>
          </div>
          <StatusPanel book={currentBook} compact />
        </div>
      </section>
      <FloatingLyziPlayer />
    </>
  );
}
