import type { CurrentBook } from "@/data/currentBook";
import { ProgressForge } from "@/components/ProgressForge";

export function StatusPanel({ book, compact = false }: { book: CurrentBook; compact?: boolean }) {
  return (
    <article className={`status-panel ${compact ? "status-panel--compact" : ""}`}>
      <p className="eyebrow">{book.status}</p>
      <h3>{book.title}</h3>
      <p>{book.summary}</p>
      <ProgressForge value={book.progress} />
      {!compact ? (
        <div className="status-panel__details">
          {book.stages.map((stage) => (
            <div key={stage.name}>
              <span>{stage.name}</span>
              <strong>{stage.state}</strong>
            </div>
          ))}
        </div>
      ) : null}
    </article>
  );
}
