"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { BestiaryCategory, BestiaryEntry } from "@/data/bestiary";

type BestiaryCategoryBrowserProps = {
  categories: BestiaryCategory[];
  entries: BestiaryEntry[];
};

function threatClass(threatLevel: string) {
  if (threatLevel.startsWith("VI")) {
    return "bestiary-card__threat bestiary-card__threat--vi";
  }

  if (threatLevel.startsWith("V")) {
    return "bestiary-card__threat bestiary-card__threat--v";
  }

  return "bestiary-card__threat";
}

export function BestiaryCategoryBrowser({ categories, entries }: BestiaryCategoryBrowserProps) {
  const availableCategories = useMemo(
    () => categories.filter((category) => entries.some((entry) => entry.categorySlug === category.slug)),
    [categories, entries]
  );
  const [selectedCategorySlug, setSelectedCategorySlug] = useState(availableCategories[0]?.slug ?? "");
  const selectedCategory = availableCategories.find((category) => category.slug === selectedCategorySlug) ?? availableCategories[0];
  const categoryEntries = selectedCategory
    ? entries.filter((entry) => entry.categorySlug === selectedCategory.slug)
    : [];

  if (!selectedCategory) {
    return null;
  }

  return (
    <div className="bestiary-browser">
      <div className="bestiary-category-select">
        <label htmlFor="bestiary-category">Categoría del Bestiario</label>
        <div className="bestiary-category-select__control">
          <select
            id="bestiary-category"
            value={selectedCategory.slug}
            onChange={(event) => setSelectedCategorySlug(event.target.value)}
          >
            {availableCategories.map((category) => (
              <option key={category.slug} value={category.slug}>
                {category.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      <section className="bestiary-category-intro" aria-labelledby="bestiary-category-title">
        <h2 id="bestiary-category-title">{selectedCategory.title}</h2>
        <p>{selectedCategory.description}</p>
      </section>

      <div className="bestiary-grid">
        {categoryEntries.map((entry) => (
          <article className="bestiary-card" key={entry.slug}>
            {entry.image ? (
              <div className="bestiary-card__media">
                <Image
                  src={entry.image.src}
                  alt={entry.image.alt}
                  fill
                  sizes="(max-width: 760px) 100vw, 34vw"
                  unoptimized
                />
              </div>
            ) : (
              <div className="bestiary-card__sigil" aria-hidden="true">
                <span>{entry.threatLevel.split(" ")[0]}</span>
              </div>
            )}
            <div className="bestiary-card__header">
              <p className="eyebrow">{entry.category}</p>
              <h3>{entry.name}</h3>
              <p>{entry.epithet}</p>
            </div>
            <dl className="bestiary-meta">
              <div>
                <dt>Clasificación</dt>
                <dd>{entry.classification}</dd>
              </div>
              <div>
                <dt>Región asociada</dt>
                <dd>{entry.region}</dd>
              </div>
              <div>
                <dt>Estado del archivo</dt>
                <dd>{entry.archiveStatus}</dd>
              </div>
              <div>
                <dt>Naturaleza</dt>
                <dd>{entry.nature}</dd>
              </div>
            </dl>
            <p className={threatClass(entry.threatLevel)}>{entry.threatLevel}</p>
            <blockquote>
              <p>“{entry.quote}”</p>
              <cite>
                Cita del Archivo — {entry.curator} {entry.curatorIcon}
              </cite>
            </blockquote>
            <Link className="text-link bestiary-card__link" href={`/archivo/bestiario/${entry.slug}`}>
              Leer entrada
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
