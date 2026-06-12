import Link from "next/link";
import type { CSSProperties } from "react";
import { CharacterPortrait } from "@/components/CharacterPortrait";
import type { Character } from "@/data/characters";

export function CharacterCard({ character }: { character: Character }) {
  const style = {
    "--character-accent": character.accent,
    "--portrait-position": character.portraitPosition ?? "50% 18%",
    "--portrait-scale": character.portraitScale ?? 1
  } as CSSProperties;

  return (
    <article className="entity-card" style={style}>
      <div className="character-card__media">
        <CharacterPortrait
          className="character-card__image"
          src={character.image}
          name={character.name}
          width={640}
          height={760}
          loading="lazy"
        />
      </div>
      <div className="entity-card__body">
        <div className="entity-card__content">
          <p className="eyebrow">{character.affinity}</p>
          <h3>{character.name}</h3>
          <p className="entity-card__role">{character.role}</p>
          <p>{character.description}</p>
          {character.anatomyNote ? (
            <p className="entity-card__canon-note">
              <span>Rasgo anatómico</span>
              {character.anatomyNote.short}
            </p>
          ) : null}
        </div>
        <Link className="text-link entity-card__link" href={`/personajes/${character.slug}`}>
          Seguir su huella
        </Link>
      </div>
    </article>
  );
}
