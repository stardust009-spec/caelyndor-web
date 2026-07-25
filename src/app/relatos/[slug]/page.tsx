import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { ReadingProgress } from "@/components/ReadingProgress";
import { StoryIllustration } from "@/components/StoryIllustration";
import { StoryPlaylist } from "@/components/StoryPlaylist";
import { StorySeparator, type StorySeparatorVariant } from "@/components/StorySeparator";
import { StoryStats } from "@/components/StoryStats";
import { assetImage } from "@/data/assets";
import { getStoryBySlug, stories, type DominantCharacter } from "@/data/stories";
import { SITE_AUTHOR, SITE_NAME, SITE_URL } from "@/lib/site";

/* Canon de Separadores Lyzánthycos v1.0: paleta por personaje dominante.
   Fallback obligatorio: estándar neutral cian de Caelyndor. */
const LYZ_ACCENTS: Record<DominantCharacter, string> = {
  rubi: "#ff8a5f",
  yuki: "#9fd8ff",
  lyzi: "#c9a7ff",
  noctalypse: "#a08fdb",
  ensemble: "#67d9ff"
};

const SEPARATOR_PATTERNS: { variant: StorySeparatorVariant; regex: RegExp }[] = [
  { variant: "standard", regex: /^\s*(?:\*\s*){3}\s*$/ },
  { variant: "standard", regex: /^\s*✦\s+✦\s+✦\s*$/ },
  { variant: "ritual", regex: /^\s*✧\s+✦\s+✧\s*$/ },
  { variant: "extended", regex: /^\s*✦\s*·\s*✧\s*·\s*✦\s*$/ }
];

function getSeparatorVariant(line: string): StorySeparatorVariant | null {
  return SEPARATOR_PATTERNS.find(({ regex }) => regex.test(line))?.variant ?? null;
}

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

  const lyzAccent = LYZ_ACCENTS[story.dominantCharacter ?? "ensemble"] ?? LYZ_ACCENTS.ensemble;

  return (
    <article
      className="page-section story-page"
      style={{ "--story-accent": story.accent, "--lyz-accent": lyzAccent } as CSSProperties}
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
            // Ornamentos legados no cubiertos por el canon (———, ✶ ✶ ✶, etc.) caen al estándar.
            const legacyOrnamentPattern = /^[✦☼✧✶*·.\s—–-]+$/;
            const firstProseIndex = story.paragraphs.findIndex(
              (paragraph) =>
                !paragraph.startsWith("### ") &&
                !paragraph.startsWith("> ") &&
                !paragraph.startsWith("@@ilustracion:") &&
                !getSeparatorVariant(paragraph) &&
                !legacyOrnamentPattern.test(paragraph)
            );

            return story.paragraphs.map((paragraph, index) => {
              if (paragraph.startsWith("### ")) {
                return (
                  <h2 className="story-reader__heading" key={index}>
                    {paragraph.slice(4)}
                  </h2>
                );
              }

              // Ilustración horizontal de capítulo (solo en relatos que la declaran).
              // Se oculta sola si el arte todavía no está subido al repo de assets.
              if (paragraph.startsWith("@@ilustracion:")) {
                return (
                  <StoryIllustration
                    slug={story.slug}
                    number={paragraph.slice("@@ilustracion:".length).trim()}
                    title={story.title}
                    key={index}
                  />
                );
              }

              // Epígrafe de capítulo (aforismo bajo el título, estilo SubCaely del maquetado).
              if (paragraph.startsWith("> ")) {
                return (
                  <p className="story-reader__epigraph" key={index}>
                    {paragraph.slice(2)}
                  </p>
                );
              }

              const variant =
                getSeparatorVariant(paragraph) ??
                (legacyOrnamentPattern.test(paragraph) ? "standard" : null);
              if (variant) {
                return <StorySeparator variant={variant} key={index} />;
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
