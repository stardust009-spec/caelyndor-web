import type { Metadata } from "next";
import { SectionIntro } from "@/components/SectionIntro";
import { StoryCard } from "@/components/StoryCard";
import { stories } from "@/data/stories";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const description =
  "Mini relatos y noveletas del universo de Caelyndor: escenas de convivencia, caos doméstico y heridas pequeñas entre las grandes, para leer con calma y sin spoilers de la saga troncal.";

export const metadata: Metadata = {
  title: "Relatos",
  description,
  alternates: { canonical: "/relatos" },
  openGraph: {
    type: "website",
    title: "Relatos | Caelyndor",
    description,
    url: `${SITE_URL}/relatos`,
    siteName: SITE_NAME,
    images: ["/opengraph-image.jpg"]
  },
  twitter: {
    card: "summary_large_image",
    title: "Relatos | Caelyndor",
    description,
    images: ["/opengraph-image.jpg"]
  }
};

export default function StoriesPage() {
  return (
    <section className="page-section">
      <div className="container">
        <SectionIntro
          eyebrow="Mini relatos"
          title="Relatos"
          text="Historias breves del universo de Caelyndor: escenas de convivencia, caos doméstico y heridas pequeñas entre las grandes. Para leer con calma, sin spoilers de la saga troncal."
        />
        <div className="story-grid">
          {stories.map((story) => (
            <StoryCard key={story.slug} story={story} />
          ))}
        </div>
      </div>
    </section>
  );
}
