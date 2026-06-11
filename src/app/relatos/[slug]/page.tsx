import type { CSSProperties } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getStoryBySlug, stories } from "@/data/stories";

type StoryPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return stories.map((story) => ({ slug: story.slug }));
}

export async function generateMetadata({ params }: StoryPageProps) {
  const { slug } = await params;
  const story = getStoryBySlug(slug);
  return {
    title: story ? story.title : "Relato"
  };
}

export default async function StoryPage({ params }: StoryPageProps) {
  const { slug } = await params;
  const story = getStoryBySlug(slug);

  if (!story) {
    notFound();
  }

  return (
    <article
      className="page-section story-page"
      style={{ "--story-accent": story.accent } as CSSProperties}
    >
      <div className="container">
        <Breadcrumbs
          items={[
            { href: "/relatos", label: "Relatos" },
            { href: `/relatos/${story.slug}`, label: story.title }
          ]}
        />
        <header className="story-header">
          <p className="eyebrow">Mini relato — Crónicas de Caelyndor</p>
          <h1>{story.title}</h1>
          <p className="story-header__meta">
            <span>{story.characters.join(" · ")}</span>
            <span aria-hidden="true">✦</span>
            <span>~{story.readingMinutes} min de lectura</span>
          </p>
        </header>

        <div className="story-reader">
          {story.paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        <footer className="story-footer">
          <p className="story-footer__ornament" aria-hidden="true">
            ✦ ✦ ✦
          </p>
          <p className="story-footer__note">Fin del relato. El Archivo agradece su visita.</p>
          <Link className="button" href="/relatos">
            Volver a relatos
          </Link>
        </footer>
      </div>
    </article>
  );
}
