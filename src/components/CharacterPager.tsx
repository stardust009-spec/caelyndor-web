"use client";

import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { useEffect } from "react";
import type { Character } from "@/data/characters";

type CharacterPagerItem = Pick<Character, "slug" | "name" | "title" | "image" | "accent">;

type CharacterPagerProps = {
  previous?: CharacterPagerItem;
  next?: CharacterPagerItem;
};

export function CharacterPager({ previous, next }: CharacterPagerProps) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      const isTyping =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.tagName === "SELECT" ||
        target?.isContentEditable;

      if (isTyping || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
        return;
      }

      if (event.key === "ArrowLeft" && previous) {
        window.location.href = `/personajes/${previous.slug}`;
      }

      if (event.key === "ArrowRight" && next) {
        window.location.href = `/personajes/${next.slug}`;
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [previous, next]);

  if (!previous && !next) {
    return null;
  }

  return (
    <nav className="character-pager" aria-label="Navegación entre personajes">
      {previous ? <PagerLink character={previous} direction="previous" /> : null}
      {next ? <PagerLink character={next} direction="next" /> : null}
    </nav>
  );
}

function PagerLink({
  character,
  direction
}: {
  character: CharacterPagerItem;
  direction: "previous" | "next";
}) {
  const isPrevious = direction === "previous";

  return (
    <Link
      className={`character-pager__link character-pager__link--${direction}`}
      href={`/personajes/${character.slug}`}
      aria-label={`Ir al personaje ${isPrevious ? "anterior" : "siguiente"}: ${character.name}`}
      style={{ "--character-accent": character.accent } as CSSProperties}
    >
      <span className="character-pager__arrow" aria-hidden="true">
        {isPrevious ? "‹" : "›"}
      </span>
      <span className="character-pager__preview" aria-hidden="true">
        <Image
          src={character.image}
          alt=""
          width={220}
          height={280}
          loading="lazy"
          unoptimized
        />
      </span>
      <span className="character-pager__copy">
        <span>{isPrevious ? "Anterior" : "Siguiente"}</span>
        <strong>{character.name}</strong>
        <em>{character.title}</em>
      </span>
    </Link>
  );
}
