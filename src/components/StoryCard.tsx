import Link from "next/link";
import type { CSSProperties } from "react";
import { StoryCover } from "@/components/StoryCover";
import type { Story } from "@/data/stories";

export function StoryCard({ story }: { story: Story }) {
  return (
    <article className="story-card" style={{ "--story-accent": story.accent } as CSSProperties}>
      <Link className="story-card__cover-link" href={`/relatos/${story.slug}`}>
        <StoryCover slug={story.slug} title={story.title} />
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
