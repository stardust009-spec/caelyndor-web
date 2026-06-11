import type { Metadata } from "next";
import { ProgressForge } from "@/components/ProgressForge";
import { SectionIntro } from "@/components/SectionIntro";
import { StatusPanel } from "@/components/StatusPanel";
import { currentBook } from "@/data/currentBook";

export const metadata: Metadata = {
  title: "Ahora en la Forja"
};

export default function NewBookPage() {
  return (
    <section className="page-section">
      <div className="container">
        <SectionIntro
          eyebrow="Nuevo libro"
          title="Ahora en la Forja"
          text="Panel público de avance para el libro actual, diseñado para actualizarse sin tocar componentes."
        />
        <div className="forge-layout">
          <StatusPanel book={currentBook} />
          <section className="forge-stages" aria-labelledby="etapas-forja">
            <h2 id="etapas-forja">Etapas</h2>
            {currentBook.stages.map((stage) => (
              <div className="forge-stage" key={stage.name}>
                <div>
                  <h3>{stage.name}</h3>
                  <p>{stage.state}</p>
                </div>
                <ProgressForge value={stage.progress} label={`Progreso de ${stage.name}`} />
              </div>
            ))}
          </section>
        </div>
        <div className="editorial-notes">
          <article>
            <p className="eyebrow">Último avance</p>
            <p>{currentBook.lastUpdate}</p>
          </article>
          <article>
            <p className="eyebrow">Próximo hito</p>
            <p>{currentBook.nextMilestone}</p>
          </article>
          <article>
            <p className="eyebrow">Notas del autor</p>
            <p>{currentBook.authorNotes}</p>
          </article>
        </div>
      </div>
    </section>
  );
}
