import type { Metadata } from "next";
import { SectionIntro } from "@/components/SectionIntro";
import { StoryCard } from "@/components/StoryCard";
import { stories } from "@/data/stories";

export const metadata: Metadata = {
  title: "Relatos"
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
