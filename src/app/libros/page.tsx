import type { Metadata } from "next";
import { BookShowcase } from "@/components/BookShowcase";
import { SectionIntro } from "@/components/SectionIntro";

export const metadata: Metadata = {
  title: "Biblioteca de Caelyndor",
  description:
    "Saga, spin-offs e historias paralelas reunidas como un archivo vivo del mundo de Caelyndor.",
  openGraph: {
    title: "Biblioteca de Caelyndor",
    description:
      "Saga, spin-offs e historias paralelas reunidas como un archivo vivo del mundo de Caelyndor.",
    url: "https://www.caelyndor.cl/libros",
    siteName: "CAELYNDOR",
    locale: "es_CL",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Biblioteca de Caelyndor",
    description:
      "Saga, spin-offs e historias paralelas reunidas como un archivo vivo del mundo de Caelyndor.",
    images: ["/libros/opengraph-image.jpg"]
  }
};

export default function BooksPage() {
  return (
    <section className="page-section books-page">
      <div className="container">
        <SectionIntro
          eyebrow="Biblioteca"
          title="Biblioteca de Caelyndor"
          text="Saga, spin-offs e historias paralelas reunidas como un archivo vivo del mundo. Cada libro abre una puerta distinta: algunas conducen al corazón de la saga; otras, a rincones donde la magia respira con voz propia."
        />
        <BookShowcase />
      </div>
    </section>
  );
}
