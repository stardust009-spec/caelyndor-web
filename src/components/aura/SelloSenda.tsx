import type { CSSProperties } from "react";
import { SENDAS, type SendaId } from "@/data/sendas";

type SelloSendaProps = {
  senda: SendaId;
  /** Dibuja el sello trazo a trazo (si no, aparece completo). */
  trazar?: boolean;
  /** Retraso antes de empezar a trazar, en segundos. */
  retraso?: number;
  className?: string;
};

/** Sello de una Senda: trazos con brillo en su color. */
export function SelloSenda({ senda, trazar = false, retraso = 0, className }: SelloSendaProps) {
  const visual = SENDAS[senda];
  const estilo = { "--sello": visual.color, "--retraso": `${retraso}s` } as CSSProperties;
  return (
    <svg
      // La key reinicia la animación de trazo cuando cambia la Senda.
      key={senda}
      className={["sello-senda", trazar ? "sello-senda--trazar" : "", className ?? ""].join(" ").trim()}
      viewBox="0 0 100 100"
      style={estilo}
      aria-hidden="true"
    >
      {visual.sello.map((d, index) => (
        <path key={d} d={d} pathLength={1} style={{ "--i": index } as CSSProperties} />
      ))}
    </svg>
  );
}
