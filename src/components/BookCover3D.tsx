"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { PointerEvent } from "react";
import { bookCoverSrc, type Book } from "@/data/books";

type BookCover3DProps = {
  book: Book;
  size?: "large" | "thumb";
  priority?: boolean;
};

export function BookCover3D({ book, size = "large", priority = false }: BookCover3DProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [coverFailed, setCoverFailed] = useState(false);
  const interactive = size === "large";

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const frame = frameRef.current;

    if (!frame) {
      return;
    }

    const rect = frame.getBoundingClientRect();
    const pointerX = (event.clientX - rect.left) / rect.width;
    const pointerY = (event.clientY - rect.top) / rect.height;
    const rotateY = (pointerX - 0.5) * 16;
    const rotateX = (0.5 - pointerY) * 12;

    frame.style.setProperty("--rx", `${rotateX.toFixed(2)}deg`);
    frame.style.setProperty("--ry", `${rotateY.toFixed(2)}deg`);
    frame.style.setProperty("--mx", `${(pointerX * 100).toFixed(1)}%`);
    frame.style.setProperty("--my", `${(pointerY * 100).toFixed(1)}%`);
  }

  function handlePointerLeave() {
    const frame = frameRef.current;

    if (!frame) {
      return;
    }

    frame.style.setProperty("--rx", "0deg");
    frame.style.setProperty("--ry", "0deg");
    frame.style.setProperty("--mx", "50%");
    frame.style.setProperty("--my", "38%");
  }

  return (
    <div
      className={`book-cover3d book-cover3d--${size} book-cover3d--${book.categoryId}`}
      ref={frameRef}
      onPointerMove={interactive ? handlePointerMove : undefined}
      onPointerLeave={interactive ? handlePointerLeave : undefined}
    >
      <div className="book-cover3d__object">
        <span className="book-cover3d__spine" aria-hidden="true" />
        {coverFailed ? (
          <div
            className="book-cover3d__fallback"
            role="img"
            aria-label={`Portada provisional de ${book.title}`}
          >
            <p className="book-cover3d__fallback-eyebrow">Crónicas de Caelyndor</p>
            <p className="book-cover3d__fallback-ornament" aria-hidden="true">
              ✦
            </p>
            <div className="book-cover3d__fallback-core">
              <p className="book-cover3d__fallback-title">{book.title}</p>
              {book.subtitle ? (
                <p className="book-cover3d__fallback-subtitle">{book.subtitle}</p>
              ) : null}
            </div>
            <p className="book-cover3d__fallback-meta">{book.metadata}</p>
          </div>
        ) : (
          <Image
            className="book-cover3d__image"
            src={bookCoverSrc(book)}
            alt={`Portada de ${book.title}`}
            fill
            sizes={size === "large" ? "(max-width: 760px) 78vw, 380px" : "96px"}
            priority={priority}
            unoptimized
            onError={() => setCoverFailed(true)}
          />
        )}
        <span className="book-cover3d__gloss" aria-hidden="true" />
      </div>
    </div>
  );
}
