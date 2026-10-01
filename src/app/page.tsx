import type { Metadata } from "next";
import Link from "next/link";
import "@/styles/casa.css";
import { CasaDeLyzi } from "@/components/casa/CasaDeLyzi";
import { JsonLd } from "@/components/JsonLd";
import { CASA_OBJETO_INFO } from "@/data/casa";
import { buildCasaContent } from "@/lib/casaContent";
import { SITE_AUTHOR, SITE_AUTHOR_ALIASES, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

// El Inicio es la casa de Lyzi: la portada narrativa (desde el 2026-09-30). El Inicio anterior
// quedó comentado al final de este archivo, a pedido del autor, para no perderlo.

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
    alternateName: SITE_AUTHOR_ALIASES,
    url: SITE_URL,
    jobTitle: "Autor y director creativo de Caelyndor"
  }
];

/** Índice clásico al pie de la casa: todas las secciones sin tener que recorrer la escena. */
const indice = [
  { href: "/personajes", label: "Personajes", text: "Rostros atravesados por heridas, pactos y lealtades inestables." },
  { href: "/relatos", label: "Relatos", text: CASA_OBJETO_INFO.libro.hint },
  { href: "/musica", label: "Música", text: CASA_OBJETO_INFO.vitrola.hint },
  { href: "/cronologia", label: "Cronología", text: "Eras, rupturas y guerras ordenadas para leer el mundo sin apagar su misterio." },
  { href: "/archivo", label: "Archivo", text: "Reinos, glosario, bestiario y documentos listos para crecer." },
  { href: "/libros", label: "Libros", text: "La saga y sus volúmenes." },
  { href: "/arte", label: "Arte", text: CASA_OBJETO_INFO.cuadros.hint },
  { href: "/descargas", label: "Descargas", text: CASA_OBJETO_INFO.baul.hint },
  { href: "/nuevo-libro", label: "Nuevo Libro", text: CASA_OBJETO_INFO.escritorio.hint },
  { href: "/cuenta", label: "Cuenta", text: CASA_OBJETO_INFO.visitas.hint }
];

export default function HomePage() {
  const content = buildCasaContent();
  return (
    <>
      <JsonLd data={homeJsonLd} />
      <CasaDeLyzi content={content} />
      <section id="casa-indice" className="casa-indice" aria-labelledby="casa-indice-title">
        <div className="container">
          <p className="eyebrow">Índice del portal</p>
          <h2 id="casa-indice-title">Todas las puertas de la casa</h2>
          <ul className="casa-indice__grid">
            {indice.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>
                  <strong>{item.label}</strong>
                  <span>{item.text}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

// ————————————————————————————————————————————————————————————————————————————————
// INICIO ANTERIOR (hasta el 2026-09-30): héroe "El Velo rasgado", acceso a la casa de Lyzi,
// accesos destacados, "Ahora en la Forja" y el widget flotante de Lyzi. Se deja comentado a
// pedido del autor para no perderlo. Para volver a usarlo:
//   1. reemplazar el código de arriba por este (quitando los "// " del comienzo de cada línea);
//   2. devolver la casa a su ruta propia: crear src/app/casa-de-lyzi/page.tsx con el
//      componente HomePage de arriba (y metadata con canonical "/casa-de-lyzi");
//   3. quitar la redirección /casa-de-lyzi → / de next.config.ts y volver a sumar la ruta al
//      sitemap (src/app/sitemap.ts).
// ————————————————————————————————————————————————————————————————————————————————
//
// import type { Metadata } from "next";
// import Link from "next/link";
// import { CasaTeaser } from "@/components/CasaTeaser";
// import { FloatingLyziPlayer } from "@/components/FloatingLyziPlayer";
// import { HeroVelo } from "@/components/HeroVelo";
// import { JsonLd } from "@/components/JsonLd";
// import { PortalCard } from "@/components/PortalCard";
// import { SectionIntro } from "@/components/SectionIntro";
// import { StatusPanel } from "@/components/StatusPanel";
// import { currentBook } from "@/data/currentBook";
// import { SITE_AUTHOR, SITE_AUTHOR_ALIASES, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";
//
// export const metadata: Metadata = {
//   alternates: { canonical: "/" }
// };
//
// const homeJsonLd = [
//   {
//     "@context": "https://schema.org",
//     "@type": "WebSite",
//     name: SITE_NAME,
//     url: SITE_URL,
//     inLanguage: "es-CL",
//     description: SITE_DESCRIPTION
//   },
//   {
//     "@context": "https://schema.org",
//     "@type": "Person",
//     name: SITE_AUTHOR,
//     alternateName: SITE_AUTHOR_ALIASES,
//     url: SITE_URL,
//     jobTitle: "Autor y director creativo de Caelyndor"
//   }
// ];
//
// const featuredLinks = [
//   {
//     title: "Personajes",
//     text: "Rostros atravesados por heridas, pactos y lealtades inestables.",
//     href: "/personajes"
//   },
//   {
//     title: "Cronología",
//     text: "Eras, rupturas y guerras ordenadas para leer el mundo sin apagar su misterio.",
//     href: "/cronologia"
//   },
//   {
//     title: "Archivo",
//     text: "Reinos, glosario, bestiario y documentos listos para crecer.",
//     href: "/archivo"
//   }
// ];
//
// export default function HomePage() {
//   return (
//     <>
//       <JsonLd data={homeJsonLd} />
//       <HeroVelo />
//       <CasaTeaser />
//       <section className="section section--raised" aria-labelledby="destacados">
//         <div className="container">
//           <SectionIntro
//             eyebrow="Umbrales"
//             title="Accesos destacados"
//             text="Una entrada ordenada al universo, preparada para recibir arte final, música y textos canónicos sin cambiar la arquitectura."
//           />
//           <div className="portal-grid">
//             {featuredLinks.map((item) => (
//               <PortalCard key={item.href} {...item} />
//             ))}
//           </div>
//         </div>
//       </section>
//       <section className="section" aria-labelledby="forja-home">
//         <div className="container split-layout">
//           <div>
//             <SectionIntro
//               eyebrow="Producción"
//               title="Ahora en la Forja"
//               text="Estado editorial del libro en curso, actualizado a medida que la escritura avanza dentro de la Forja."
//             />
//             <Link className="text-link" href="/nuevo-libro">
//               Ver avance completo
//             </Link>
//           </div>
//           <StatusPanel book={currentBook} compact />
//         </div>
//       </section>
//       <FloatingLyziPlayer />
//     </>
//   );
// }
