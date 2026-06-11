import type { Metadata } from "next";
import { SectionIntro } from "@/components/SectionIntro";
import { Timeline } from "@/components/Timeline";
import { timelineGroups } from "@/data/timeline";

export const metadata: Metadata = {
  title: "Cronología"
};

export default function TimelinePage() {
  return (
    <section className="page-section">
      <div className="container">
        <SectionIntro
          eyebrow="Tiempo herido"
          title="Cronología"
          text="Eventos agrupados por era, arco o libro, con distinción inicial entre saga troncal, relatos laterales y spin-offs."
        />
        <Timeline groups={timelineGroups} />
      </div>
    </section>
  );
}
