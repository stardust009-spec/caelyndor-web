import type { TimelineGroup } from "@/data/timeline";

export function Timeline({ groups }: { groups: TimelineGroup[] }) {
  return (
    <div className="timeline">
      {groups.map((group) => (
        <section className="timeline__group" key={group.id} aria-labelledby={group.id}>
          <div className="timeline__era">
            <p className="eyebrow">{group.type}</p>
            <h2 id={group.id}>{group.title}</h2>
          </div>
          <div className="timeline__events">
            {group.events.map((event) => (
              <article className="timeline__event" key={event.title}>
                <p className="timeline__marker">{event.scope}</p>
                <h3>{event.title}</h3>
                <p>{event.description}</p>
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
