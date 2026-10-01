import Link from "next/link";
import { CASA_ASSET_BASE } from "@/data/casa";

/** Acceso destacado del Inicio a la casa de Lyzi (la portada narrativa en /casa-de-lyzi). */
export function CasaTeaser() {
  return (
    <section className="casa-teaser" aria-labelledby="casa-teaser-title">
      <div className="container">
        <Link className="casa-teaser__card" href="/casa-de-lyzi">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="casa-teaser__image"
            src={`${CASA_ASSET_BASE}/poster-H.webp`}
            alt="La casa de Lyzi de noche, entre los árboles de Sylvalis"
            width={1280}
            height={720}
            loading="lazy"
            decoding="async"
          />
          <span className="casa-teaser__shade" aria-hidden="true" />
          <span className="casa-teaser__content">
            <span className="eyebrow">Nuevo</span>
            <h2 id="casa-teaser-title" className="casa-teaser__title">
              La casa de Lyzi
            </h2>
            <span className="casa-teaser__phrase">Ven, te cuento una historia.</span>
            <span className="button casa-teaser__cta">
              Entrar a la casa <span aria-hidden="true">→</span>
            </span>
          </span>
        </Link>
      </div>
    </section>
  );
}
