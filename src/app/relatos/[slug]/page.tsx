import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { ReadingProgress } from "@/components/ReadingProgress";
import { StoryPlaylist } from "@/components/StoryPlaylist";
import { StoryStats } from "@/components/StoryStats";
import { assetImage } from "@/data/assets";
import { getStoryBySlug, stories } from "@/data/stories";
import { SITE_AUTHOR, SITE_NAME, SITE_URL } from "@/lib/site";

type StoryPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return stories.map((story) => ({ slug: story.slug }));
}

export async function generateMetadata({ params }: StoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const story = getStoryBySlug(slug);

  if (!story) {
    return { title: "Relato" };
  }

  return {
    title: story.title,
    description: story.teaser,
    alternates: { canonical: `/relatos/${story.slug}` },
    openGraph: {
      type: "article",
      title: `${story.title} | ${SITE_NAME}`,
      description: story.teaser,
      url: `${SITE_URL}/relatos/${story.slug}`,
      siteName: SITE_NAME,
      images: ["/opengraph-image.jpg"]
    },
    twitter: {
      card: "summary_large_image",
      title: `${story.title} | ${SITE_NAME}`,
      description: story.teaser,
      images: ["/opengraph-image.jpg"]
    }
  };
}

export default async function StoryPage({ params }: StoryPageProps) {
  const { slug } = await params;
  const story = getStoryBySlug(slug);

  if (!story) {
    notFound();
  }

  const storyUrl = `${SITE_URL}/relatos/${story.slug}`;
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: story.title,
      description: story.teaser,
      image: assetImage(`relato-${story.slug}.png`),
      inLanguage: "es",
      wordCount: story.wordCount,
      author: { "@type": "Person", name: SITE_AUTHOR },
      publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
      mainEntityOfPage: { "@type": "WebPage", "@id": storyUrl },
      url: storyUrl,
      about: story.characters.map((name) => ({ "@type": "Person", name }))
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Relatos", item: `${SITE_URL}/relatos` },
        { "@type": "ListItem", position: 2, name: story.title, item: storyUrl }
      ]
    }
  ];

  return (
    <article
      className="page-section story-page"
      style={{ "--story-accent": story.accent } as CSSProperties}
    >
      <JsonLd data={jsonLd} />
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
          <StoryStats slug={story.slug} title={story.title} shareDescription={story.teaser} registerView />
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
