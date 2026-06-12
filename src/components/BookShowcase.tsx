"use client";

import { useState } from "react";
import type { CSSProperties } from "react";
import { BookCover3D } from "@/components/BookCover3D";
import { bookCategories, getBooksByCategory } from "@/data/books";

export function BookShowcase() {
  const [activeCategoryId, setActiveCategoryId] = useState(bookCategories[0]?.id ?? "");
  const [selectedByCategory, setSelectedByCategory] = useState<Record<string, string>>({});

  const activeCategory =
    bookCategories.find((category) => category.id === activeCategoryId) ?? bookCategories[0];
  const categoryBooks = getBooksByCategory(activeCategory.id);
  const selectedId = selectedByCategory[activeCategory.id] ?? categoryBooks[0]?.id;
  const selectedBook = categoryBooks.find((book) => book.id === selectedId) ?? categoryBooks[0];

  if (!selectedBook) {
    return null;
  }

  return (
    <div
      className="book-showcase"
      style={{ "--book-accent": activeCategory.accent } as CSSProperties}
    >
      <div className="book-tabs" role="group" aria-label="Categorías de la biblioteca">
        {bookCategories.map((category) => (
          <button
            key={category.id}
            type="button"
            className={`book-tab${category.id === activeCategory.id ? " book-tab--active" : ""}`}
            aria-pressed={category.id === activeCategory.id}
            onClick={() => setActiveCategoryId(category.id)}
          >
            {category.label}
          </button>
        ))}
      </div>

      <p className="book-category-intro">{activeCategory.intro}</p>

      <section className="book-stage" aria-live="polite">
        <div className="book-stage__cover">
          <BookCover3D book={selectedBook} priority />
        </div>
        <div className="book-detail">
          <p className="eyebrow">{selectedBook.metadata}</p>
          <h2>{selectedBook.title}</h2>
          {selectedBook.subtitle ? (
            <p className="book-detail__subtitle">{selectedBook.subtitle}</p>
          ) : null}
          {selectedBook.seriesLine ? (
            <p className="book-detail__series">{selectedBook.seriesLine}</p>
          ) : null}
          <p className="status-pill">{selectedBook.status}</p>
          <p className="book-detail__caption">{selectedBook.caption}</p>
          <div className="book-detail__blurb">
            <p className="book-detail__blurb-label">Contraportada</p>
            <p>{selectedBook.blurb}</p>
          </div>
          <p className="book-detail__tone">
            <span>Tono:</span> {selectedBook.tone}
          </p>
          <button
            className="button book-detail__cta"
            type="button"
            disabled
            title="Ficha completa próximamente"
          >
            {selectedBook.ctaLabel}
          </button>
        </div>
      </section>

      <div className="book-rail" role="group" aria-label={`Libros de ${activeCategory.label}`}>
        {categoryBooks.map((book) => (
          <button
            key={book.id}
            type="button"
            className={`book-rail__item${book.id === selectedBook.id ? " book-rail__item--active" : ""}`}
            aria-pressed={book.id === selectedBook.id}
            onClick={() =>
              setSelectedByCategory((current) => ({
                ...current,
                [activeCategory.id]: book.id
              }))
            }
          >
            <span className="book-rail__cover">
              <BookCover3D book={book} size="thumb" />
            </span>
            <span className="book-rail__copy">
              <strong>{book.title}</strong>
              <small>{book.metadata}</small>
              <em>{book.caption}</em>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
