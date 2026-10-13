import type { CSSProperties } from "react";
import { MARCOS_CON_ARTE } from "@/data/arteAura";
import { AVATAR_EN_MARCO, getMarco } from "@/data/marcos";

type AvatarMarcoProps = {
  /** URL del avatar (null = hueco vacío). */
  src: string | null;
  alt: string;
  marcoSlug?: string | null;
  /** Diámetro del avatar en px; el marco se dibuja alrededor, más grande. */
  size: number;
  className?: string;
};

/**
 * Avatar circular con su marco. Si el marco tiene arte (src/data/arteAura.ts)
 * se superpone la imagen; si no, un anillo CSS provisional según su nivel.
 */
export function AvatarMarco({ src, alt, marcoSlug, size, className }: AvatarMarcoProps) {
  const marco = getMarco(marcoSlug);
  const conArte = marco !== null && MARCOS_CON_ARTE.includes(marco.slug);
  const estilo = { "--avatar": `${size}px`, "--marco-lienzo": 1 / AVATAR_EN_MARCO } as CSSProperties;

  return (
    <span className={["avatar-marco", className ?? ""].join(" ").trim()} style={estilo}>
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img className="avatar-marco__avatar" src={src} alt={alt} width={size} height={size} />
      ) : (
        <span className="avatar-marco__avatar avatar-marco__avatar--vacio" aria-label={alt} />
      )}
      {marco &&
        (conArte ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img className="avatar-marco__arte" src={`/images/marcos/${marco.slug}.webp`} alt="" aria-hidden="true" />
        ) : (
          <span className={`avatar-marco__anillo avatar-marco__anillo--${marco.nivelVisual}`} aria-hidden="true" />
        ))}
    </span>
  );
}
