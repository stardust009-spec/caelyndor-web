"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { GlossaryCategory, GlossaryEntry } from "@/data/glossary";

type GlossaryBrowserProps = {
  categories: GlossaryCategory[];
  entries: GlossaryEntry[];
};

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
}

export function GlossaryBrowser({ categories, entries }: GlossaryBrowserProps) {
  const availableCategories = useMemo(
    () => categories.filter((category) => entries.some((entry) => entry.categorySlug === category.slug)),
    [categories, entries]
  );
  const [selectedCategorySlug, setSelectedCategorySlug] = useState(availableCategories[0]?.slug ?? "");
  const [query, setQuery] = useState("");

  const selectedCategory =
    availableCategories.find((category) => category.slug === selectedCategorySlug) ?? availableCategories[0];

  const normalizedQuery = normalize(query.trim());
  const isSearching = normalizedQuery.length > 0;

  const visibleEntries = useMemo(() => {
    const pool = isSearching
      ? entries
      : entries.filter((entry) => entry.categorySlug === selectedCategory?.slug);

    const filtered = isSearching
      ? pool.filter(
          (entry) =>
            normalize(entry.term).includes(normalizedQuery) ||
            normalize(entry.definition).includes(normalizedQuery)
        )
      : pool;

    return [...filtered].sort((a, b) => a.term.localeCompare(b.term, "es"));
  }, [entries, isSearching, normalizedQuery, selectedCategory]);

  if (!selectedCategory) {
    return null;
  }

  return (
    <div className="glossary-browser">
      <div className="glossary-controls">
        <div className="glossary-category-select">
          <label htmlFor="glossary-category">Categoría del Glosario</label>
          <div className="glossary-category-select__control">
            <select
              id="glossary-category"
              value={selectedCategory.slug}
              onChange={(event) => setSelectedCategorySlug(event.target.value)}
              disabled={isSearching}
            >
              {availableCategories.map((category) => (
                <option key={category.slug} value={category.slug}>
                  {category.title}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="glossary-search">
          <label htmlFor="glossary-search">Buscar término</label>
          <input
            id="glossary-search"
            type="search"
            value={query}
            placeholder="Velo, Glaciem, Sol Negro…"
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
      </div>

      {isSearching ? (
        <section className="glossary-category-intro" aria-live="polite">
          <h2>Resultados de búsqueda</h2>
          <p>
            {visibleEntries.length === 0
              ? "El Archivo no encuentra ese término. Puede que aún no exista… o que prefiera no ser encontrado."
              : `${visibleEntries.length} ${visibleEntries.length === 1 ? "término coincide" : "términos coinciden"} con la búsqueda en todas las categorías.`}
          </p>
        </section>
      ) : (
        <section className="glossary-category-intro" aria-labelledby="glossary-category-title">
          <h2 id="glossary-category-title">{selectedCategory.title}</h2>
          <p>{selectedCategory.description}</p>
        </section>
      )}

      <div className="glossary-grid">
        {visibleEntries.map((entry) => (
          <article className="glossary-card" key={entry.term}>
            <p className="eyebrow">{entry.category}</p>
            <h3>{entry.term}</h3>
            <p>{entry.definition}</p>
            {entry.seeAlso && entry.seeAlso.length > 0 ? (
              <p className="glossary-card__links">
                <span>Ver también:</span>
                {entry.seeAlso.map((link) => (
                  <Link className="text-link" key={`${entry.term}-${link.href}-${link.label}`} href={link.href}>
                    {link.label}
                  </Link>
                ))}
              </p>
            ) : null}
          </article>
        ))}
      </div>
    </div>
  );
}
