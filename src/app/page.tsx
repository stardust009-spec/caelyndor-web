import Link from "next/link";
import { FloatingLyziPlayer } from "@/components/FloatingLyziPlayer";
import { HeroVelo } from "@/components/HeroVelo";
import { PortalCard } from "@/components/PortalCard";
import { SectionIntro } from "@/components/SectionIntro";
import { StatusPanel } from "@/components/StatusPanel";
import { currentBook } from "@/data/currentBook";

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
              text="Estado editorial placeholder del libro actual, listo para actualizarse desde un único archivo de datos."
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
