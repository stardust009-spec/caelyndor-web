import Link from "next/link";
import type { CSSProperties } from "react";
import type { Story } from "@/data/stories";

export function StoryCard({ story }: { story: Story }) {
  return (
    <article className="story-card" style={{ "--story-accent": story.accent } as CSSProperties}>
      <Link className="story-card__cover-link" href={`/relatos/${story.slug}`}>
        <div className="story-cover" aria-hidden="true">
          <div className="story-cover__frame">
            <p className="story-cover__eyebrow">Crónicas de Caelyndor</p>
            <p className="story-cover__ornament">✦</p>
            <p className="story-cover__title">{story.title}</p>
            <p className="story-cover__kind">Mini relato</p>
          </div>
        </div>
      </Link>
      <div className="story-card__body">
        <p className="eyebrow">Mini relato</p>
        <h3>
          <Link href={`/relatos/${story.slug}`}>{story.title}</Link>
        </h3>
        <p>{story.teaser}</p>
        <p className="story-card__meta">
          <span>{story.characters.join(" · ")}</span>
          <span>~{story.readingMinutes} min de lectura</span>
        </p>
        <Link className="text-link" href={`/relatos/${story.slug}`}>
          Leer relato
        </Link>
      </div>
    </article>
  );
}
