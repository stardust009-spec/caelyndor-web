import Image from "next/image";
import type { Book } from "@/data/books";

export function BookCard({ book }: { book: Book }) {
  return (
    <article className="book-card">
      <Image
        src={book.cover}
        alt={`Portada placeholder de ${book.title}`}
        width={520}
        height={720}
        loading="lazy"
      />
      <div>
        <p className="eyebrow">{book.seriesType}</p>
        <h3>{book.title}</h3>
        <p className="book-card__subtitle">{book.subtitle}</p>
        <p className="status-pill">{book.status}</p>
        <p>{book.synopsis}</p>
        <p className="muted">Orden de lectura: {book.readingOrder}</p>
      </div>
    </article>
  );
}
