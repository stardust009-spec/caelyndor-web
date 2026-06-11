import type { Metadata } from "next";
import { BookCard } from "@/components/BookCard";
import { SectionIntro } from "@/components/SectionIntro";
import { books } from "@/data/books";

export const metadata: Metadata = {
  title: "Libros"
};

export default function BooksPage() {
  return (
    <section className="page-section">
      <div className="container">
        <SectionIntro
          eyebrow="Biblioteca"
          title="Libros"
          text="Una estructura preparada para saga troncal, spin-offs y relatos laterales, con estados editoriales y orden de lectura."
        />
        <div className="book-grid">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </div>
    </section>
  );
}
