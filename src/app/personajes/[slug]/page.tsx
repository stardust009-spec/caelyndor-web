import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CharacterGalleryCarousel } from "@/components/CharacterGalleryCarousel";
import { CharacterPager } from "@/components/CharacterPager";
import { CharacterPortrait } from "@/components/CharacterPortrait";
import { ChroniclerNote } from "@/components/ChroniclerNote";
import { JsonLd } from "@/components/JsonLd";
import { ProfileAudioButton } from "@/components/ProfileAudioButton";
import { ShareButton } from "@/components/ShareButton";
import { characters, getAdjacentCharacters, getCharacterBySlug } from "@/data/characters";
import { characterSeo } from "@/lib/characterSeo";
import { SITE_AUTHOR, SITE_AUTHOR_ALIASES, SITE_NAME, SITE_URL } from "@/lib/site";

type CharacterPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return characters.map((character) => ({ slug: character.slug }));
}

export async function generateMetadata({ params }: CharacterPageProps): Promise<Metadata> {
  const { slug } = await params;
  const character = getCharacterBySlug(slug);

  if (!character) {
    return { title: "Personaje" };
  }

  const seo = characterSeo[character.slug];
  const headingName = seo?.fullName ?? character.archive?.fullName ?? character.name;
  const baseDescription = character.archive?.identitySummary ?? character.description;
  const description = seo ? `${seo.tagline}. ${baseDescription}` : baseDescription;
  const url = `${SITE_URL}/personajes/${character.slug}`;

  return {
    title: headingName,
    description,
    alternates: { canonical: `/personajes/${character.slug}` },
    openGraph: {
      type: "profile",
      title: `${headingName} | ${SITE_NAME}`,
      description,
      url,
      siteName: SITE_NAME,
      images: [
        {
          url: character.image,
          alt: `Retrato de ${headingName}, personaje de ${SITE_NAME}`
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: `${headingName} | ${SITE_NAME}`,
      description,
      images: [character.image]
    }
  };
}

export default async function CharacterDetailPage({ params }: CharacterPageProps) {
  const { slug } = await params;
  const character = getCharacterBySlug(slug);

  if (!character) {
    notFound();
  }

  const { previous, next } = getAdjacentCharacters(slug);
  const archive = character.archive;

  const seo = characterSeo[character.slug];
  const headingName = seo?.fullName ?? archive?.fullName ?? character.name;
  const baseDescription = archive?.identitySummary ?? character.description;
  const description = seo ? `${seo.tagline}. ${baseDescription}` : baseDescription;
  const url = `${SITE_URL}/personajes/${character.slug}`;
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      mainEntity: {
        "@type": "Person",
        name: character.name,
        ...(headingName !== character.name ? { alternateName: headingName } : {}),
        description,
        url,
        image: character.image,
        isPartOf: { "@type": "CreativeWork", name: SITE_NAME, url: SITE_URL },
        creator: {
          "@type": "Person",
          name: SITE_AUTHOR,
          alternateName: SITE_AUTHOR_ALIASES,
          url: SITE_URL
        }
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Personajes", item: `${SITE_URL}/personajes` },
        {
          "@type": "ListItem",
          position: 2,
          name: character.name,
          item: url
        }
      ]
    }
  ];

  const archiveRows: { label: string; value: string }[] = [];

  if (archive?.fullName) archiveRows.push({ label: "Nombre completo", value: archive.fullName });
  if (archive?.commonName)
    archiveRows.push({ label: "Nombre de uso común", value: archive.commonName });
  if (archive?.apparentAge)
    archiveRows.push({ label: "Edad representada", value: archive.apparentAge });
  if (archive?.gender) archiveRows.push({ label: "Género", value: archive.gender });
  if (archive?.race) archiveRows.push({ label: "Raza", value: archive.race });
  if (archive?.originRegion)
    archiveRows.push({ label: "Región de origen", value: archive.originRegion });
  if (archive?.elementPath)
    archiveRows.push({ label: "Senda del Elemento", value: archive.elementPath });
  archiveRows.push({
    label: "Profesión / rol narrativo",
    value: archive?.professionRole ?? character.role
  });
  if (archive?.masteryLevel)
    archiveRows.push({ label: "Nivel de maestría", value: archive.masteryLevel });
  if (archive?.identitySummary)
    archiveRows.push({ label: "Resumen de identidad", value: archive.identitySummary });
  if (character.faction) archiveRows.push({ label: "Facción", value: character.faction });

  return (
    <article
      className="page-section character-detail"
      style={{ "--character-accent": character.accent } as CSSProperties}
    >
      <JsonLd data={jsonLd} />
      <div className="container">
        <Breadcrumbs
          items={[
            { href: "/personajes", label: "Personajes" },
            { href: `/personajes/${character.slug}`, label: character.name }
          ]}
        />
        <CharacterPager previous={previous} next={next} />

        <header className="detail-hero">
          <CharacterPortrait
            src={character.image}
            name={character.name}
            width={760}
            height={900}
            priority
          />
          <div>
            <p className="eyebrow">{character.affinity}</p>
            <h1>{headingName}</h1>
            <p className="detail-hero__title">{character.title}</p>
            <p className="status-pill">{character.role}</p>
            <div className="detail-hero__actions">
              {character.profileAudio?.enabled ? (
                <ProfileAudioButton
                  audio={character.profileAudio}
                  characterName={headingName}
                  characterSlug={character.slug}
                  fallbackCover={character.image}
                />
              ) : null}
              <ShareButton
                className="detail-hero__share"
                path={`/personajes/${character.slug}`}
                title={headingName}
                description={character.identityPhrase ?? character.description}
                label="Compartir"
              />
            </div>
            <p className="detail-hero__identity">
              {character.identityPhrase ?? character.description}
            </p>
            {character.narrativeAccess && character.narrativeAccess.length > 0 ? (
              <div className="detail-hero__access">
                {character.narrativeAccess.map((access) => (
                  <Link className="button" key={access.href} href={access.href}>
                    {access.label}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        </header>

        <section className="detail-section" aria-labelledby="galeria-personaje">
          <h2 id="galeria-personaje">Galería</h2>
          <CharacterGalleryCarousel slug={character.slug} name={character.name} />
        </section>

        <section
          className="detail-section detail-section--narrative"
          aria-label={`Crónica de ${character.name}`}
        >
          {character.narrativeSection ? (
            <>
              <h2>{character.narrativeSection.title}</h2>
              {character.narrativeSection.lead ? (
                <p className="narrative-lead">{character.narrativeSection.lead}</p>
              ) : null}
              <div className="narrative-body">
                {character.narrativeSection.paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </>
          ) : (
            <ChroniclerNote />
          )}
        </section>

        <section className="detail-section" aria-labelledby="detalle-personaje">
          <h2 id="detalle-personaje">Detalle</h2>
          {character.details && character.details.length > 0 ? (
            <div className="detail-cards">
              {character.details.map((detail) => (
                <article className="detail-card" key={detail.title}>
                  {detail.type ? <p className="eyebrow">{detail.type}</p> : null}
                  <h3>{detail.title}</h3>
                  <p>{detail.text}</p>
                </article>
              ))}
            </div>
          ) : (
            <ChroniclerNote />
          )}
        </section>

        <section className="detail-section" aria-labelledby="vinculos-personaje">
          <h2 id="vinculos-personaje">Vínculos</h2>
          {character.bonds && character.bonds.length > 0 ? (
            <div className="detail-cards">
              {character.bonds.map((bond) => (
                <article className="detail-card" key={bond.name}>
                  <h3>
                    {bond.href ? <Link href={bond.href}>{bond.name}</Link> : bond.name}
                  </h3>
                  <p>{bond.description}</p>
                </article>
              ))}
            </div>
          ) : (
            <ChroniclerNote />
          )}
        </section>

        <section className="detail-section" aria-labelledby="historias-personaje">
          <h2 id="historias-personaje">Historias relacionadas</h2>
          {character.relatedStories && character.relatedStories.length > 0 ? (
            <div className="detail-cards">
              {character.relatedStories.map((story) => (
                <article className="detail-card" key={story.title}>
                  <p className="eyebrow">{story.type}</p>
                  <h3>
                    {story.href ? <Link href={story.href}>{story.title}</Link> : story.title}
                  </h3>
                  <p>{story.description}</p>
                </article>
              ))}
            </div>
          ) : (
            <ChroniclerNote />
          )}
        </section>

        <details className="chronicler-archive">
          <summary>
            <span className="chronicler-archive__ornament" aria-hidden="true">
              ✦
            </span>
            Archivo del Cronista
          </summary>
          <div className="chronicler-archive__body">
            <dl className="chronicler-archive__rows">
              {archiveRows.map((row) => (
                <div key={row.label}>
                  <dt>{row.label}</dt>
                  <dd>{row.value}</dd>
                </div>
              ))}
            </dl>
            {character.story ? (
              <div className="chronicler-archive__entry">
                <p className="eyebrow">Historia</p>
                <p>{character.story}</p>
              </div>
            ) : null}
            {character.personality ? (
              <div className="chronicler-archive__entry">
                <p className="eyebrow">Personalidad</p>
                <p>{character.personality}</p>
              </div>
            ) : null}
            {character.anatomyNote ? (
              <div className="chronicler-archive__entry">
                <p className="eyebrow">Rasgo anatómico</p>
                <p>{character.anatomyNote.extended}</p>
              </div>
            ) : null}
            {archive?.designCanon ? (
              <div className="chronicler-archive__entry">
                <p className="eyebrow">Diseño / canon visual</p>
                <p>{archive.designCanon}</p>
              </div>
            ) : character.visualCanon.length > 0 ? (
              <div className="chronicler-archive__entry">
                <p className="eyebrow">Diseño / canon visual</p>
                <ul className="note-list">
                  {character.visualCanon.map((note) => (
                    <li key={note}>{note}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </details>

        <div className="character-detail__return">
          <Link className="button" href="/personajes">
            Volver a personajes
          </Link>
        </div>
      </div>
    </article>
  );
}
