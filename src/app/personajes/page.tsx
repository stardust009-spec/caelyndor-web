import type { Metadata } from "next";
import { CharacterCard } from "@/components/CharacterCard";
import { SectionIntro } from "@/components/SectionIntro";
import { characters } from "@/data/characters";

export const metadata: Metadata = {
  title: "Personajes"
};

export default function CharactersPage() {
  const mainCharacters = characters.filter((character) => character.faction !== "Sol Negro");
  const solNegroOrder = [
    "carolina-varthalion",
    "ashaal-runeveil",
    "valther-kaelorn",
    "arvenn-lythralei",
    "kaen-varthalion"
  ];
  const solNegroCharacters = solNegroOrder
    .map((slug) => characters.find((character) => character.slug === slug))
    .filter((character): character is (typeof characters)[number] => Boolean(character));

  return (
    <section className="page-section">
      <div className="container">
        <SectionIntro
          eyebrow="Archivo vivo"
          title="Personajes"
          text="Figuras centrales y secundarias preparadas para fichas, galerías, canon visual y futuras conexiones entre arcos."
        />
        <div className="entity-grid">
          {mainCharacters.map((character) => (
            <CharacterCard key={character.slug} character={character} />
          ))}
        </div>
        {solNegroCharacters.length > 0 ? (
          <section className="faction-section" aria-label="Sol Negro">
            <SectionIntro
              eyebrow="Facción"
              title="Sol Negro"
              text="Anillos, sombras y coronas alrededor del Rey de la Ceniza."
            />
            <div className="entity-grid entity-grid--faction">
              {solNegroCharacters.map((character) => (
                <CharacterCard key={character.slug} character={character} />
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </section>
  );
}
