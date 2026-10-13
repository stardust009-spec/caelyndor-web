import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "@/styles/quiz.css";
import { stories } from "@/data/stories";
import { Cuestionario } from "@/components/quiz/Cuestionario";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const story = stories.find((item) => item.slug === slug);
  return {
    title: story ? `Prueba del conocimiento — ${story.title}` : "Prueba del conocimiento",
    robots: { index: false, follow: false }
  };
}

export default async function QuizPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const story = stories.find((item) => item.slug === slug);
  if (!story) {
    notFound();
  }
  return (
    <section className="page-section">
      <div className="container">
        <Cuestionario slug={story.slug} accent={story.accent} />
      </div>
    </section>
  );
}
