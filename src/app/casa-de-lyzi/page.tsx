import type { Metadata } from "next";
import Link from "next/link";
import "@/styles/casa.css";
import { CasaDeLyzi } from "@/components/casa/CasaDeLyzi";
import { CASA_OBJETO_INFO } from "@/data/casa";
import { buildCasaContent } from "@/lib/casaContent";

export const metadata: Metadata = {
  title: "La casa de Lyzi",
  description:
    "Recorre la casa de Lyzi en Sylvalis: su biblioteca, el libro de relatos, la vitrola y los rincones donde vive el universo de Caelyndor.",
  alternates: { canonical: "/casa-de-lyzi" }
};

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

export default function CasaDeLyziPage() {
  const content = buildCasaContent();
  return (
    <>
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
