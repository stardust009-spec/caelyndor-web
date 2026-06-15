import type { Metadata } from "next";
import { BookShowcase } from "@/components/BookShowcase";
import { JsonLd } from "@/components/JsonLd";
import { SectionIntro } from "@/components/SectionIntro";
import { bookCoverSrc, books } from "@/data/books";
import { SITE_AUTHOR, SITE_NAME, SITE_URL } from "@/lib/site";

const description =
  "Saga, spin-offs e historias paralelas reunidas como un archivo vivo del mundo de Caelyndor.";

export const metadata: Metadata = {
  title: "Biblioteca de Caelyndor",
  description,
  alternates: { canonical: "/libros" },
  openGraph: {
    title: "Biblioteca de Caelyndor",
    description,
    url: `${SITE_URL}/libros`,
    siteName: SITE_NAME,
    locale: "es_CL",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Biblioteca de Caelyndor",
    description,
    images: ["/libros/opengraph-image.jpg"]
  }
};

const booksJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Biblioteca de Caelyndor",
  itemListElement: books.map((book, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "Book",
      name: book.title,
      ...(book.subtitle ? { alternativeName: book.subtitle } : {}),
      author: { "@type": "Person", name: SITE_AUTHOR },
      inLanguage: "es",
      image: bookCoverSrc(book),
      description: book.caption
    }
  }))
};

export default function BooksPage() {
  return (
    <section className="page-section books-page">
      <JsonLd data={booksJsonLd} />
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
