export type StorySeparatorVariant = "standard" | "ritual" | "extended";

const SEPARATOR_TOKENS: Record<StorySeparatorVariant, string[]> = {
  standard: ["✦", "✦", "✦"],
  ritual: ["✧", "✦", "✧"],
  extended: ["✦", "·", "✧", "·", "✦"]
};

/**
 * Separador lyzánthyco (Canon v1.0): tres destellos centrados, color según
 * personaje dominante vía --lyz-accent (fallback cian #67d9ff). Texto Unicode,
 * nunca imagen, para mantenerlo editable por CSS.
 */
export function StorySeparator({ variant = "standard" }: { variant?: StorySeparatorVariant }) {
  return (
    <div className={`story-separator story-separator--${variant}`} aria-hidden="true">
      {SEPARATOR_TOKENS[variant].map((token, index) => (
        <span key={`${variant}-${index}`}>{token}</span>
      ))}
    </div>
  );
}
