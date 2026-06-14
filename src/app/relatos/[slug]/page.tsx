import type { CSSProperties } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ReadingProgress } from "@/components/ReadingProgress";
import { StoryPlaylist } from "@/components/StoryPlaylist";
import { StoryStats } from "@/components/StoryStats";
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
      <ReadingProgress />
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
          <StoryStats slug={story.slug} title={story.title} registerView />
        </header>

        {story.playlist ? <StoryPlaylist playlist={story.playlist} /> : null}

        <div className="story-reader">
          {(() => {
            const ornamentPattern = /^[✦☼✧✶*·.\s—–-]+$/;
            const firstProseIndex = story.paragraphs.findIndex(
              (paragraph) => !paragraph.startsWith("### ") && !ornamentPattern.test(paragraph)
            );

            return story.paragraphs.map((paragraph, index) => {
              if (paragraph.startsWith("### ")) {
                return (
                  <h2 className="story-reader__heading" key={index}>
                    {paragraph.slice(4)}
                  </h2>
                );
              }

              if (ornamentPattern.test(paragraph)) {
                return (
                  <p className="story-reader__ornament" key={index} aria-hidden="true">
                    ✦ ✦ ✦
                  </p>
                );
              }

              return (
                <p className={index === firstProseIndex ? "story-reader__opening" : undefined} key={index}>
                  {paragraph}
                </p>
              );
            });
          })()}
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
