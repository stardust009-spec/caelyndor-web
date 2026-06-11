import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CharacterPager } from "@/components/CharacterPager";
import { characters, getAdjacentCharacters, getCharacterBySlug } from "@/data/characters";

type CharacterPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return characters.map((character) => ({ slug: character.slug }));
}

export async function generateMetadata({ params }: CharacterPageProps) {
  const { slug } = await params;
  const character = getCharacterBySlug(slug);
  return {
    title: character ? character.name : "Personaje"
  };
}

export default async function CharacterDetailPage({ params }: CharacterPageProps) {
  const { slug } = await params;
  const character = getCharacterBySlug(slug);

  if (!character) {
    notFound();
  }

  const { previous, next } = getAdjacentCharacters(slug);

  return (
    <article className="page-section character-detail">
      <div className="container">
        <Breadcrumbs
          items={[
            { href: "/personajes", label: "Personajes" },
            { href: `/personajes/${character.slug}`, label: character.name }
          ]}
        />
        <CharacterPager previous={previous} next={next} />
        <div className="detail-hero">
          <Image
            src={character.image}
            alt={`Retrato de ${character.name}`}
            width={760}
            height={900}
            priority
            unoptimized
          />
          <div>
            <p className="eyebrow">{character.affinity}</p>
            <h1>{character.name}</h1>
            <p className="detail-hero__title">{character.title}</p>
            <p className="status-pill">{character.role}</p>
            <p>{character.description}</p>
          </div>
        </div>
        <section className="detail-section" aria-labelledby="galeria-personaje">
          <h2 id="galeria-personaje">Galería</h2>
          <div className="mini-gallery">
            {character.gallery.map((image, index) => (
              <Image
                key={`${image}-${index}`}
                src={image}
                alt={`Imagen ${index + 1} de la galería de ${character.name}`}
                width={520}
                height={360}
                loading="lazy"
              />
            ))}
          </div>
        </section>
        {character.story || character.personality ? (
          <section className="detail-section" aria-labelledby="historia-personaje">
            <h2 id="historia-personaje">Historia y personalidad</h2>
            <div className="lore-notes">
              {character.story ? (
                <article>
                  <p className="eyebrow">Historia</p>
                  <p>{character.story}</p>
                </article>
              ) : null}
              {character.personality ? (
                <article>
                  <p className="eyebrow">Personalidad</p>
                  <p>{character.personality}</p>
                </article>
              ) : null}
            </div>
          </section>
        ) : null}
        <section className="detail-section" aria-labelledby="canon-visual">
          <h2 id="canon-visual">Notas / canon visual</h2>
          <ul className="note-list">
            {character.anatomyNote ? (
              <li>
                <strong>Rasgo anatómico:</strong> {character.anatomyNote.extended}
              </li>
            ) : null}
            {character.visualCanon.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </section>
        <Link className="button" href="/personajes">
          Volver a personajes
        </Link>
      </div>
    </article>
  );
}
