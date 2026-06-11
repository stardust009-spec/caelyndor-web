"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { GalleryGrid } from "@/components/GalleryGrid";
import type { GalleryCategory, GalleryItem } from "@/data/gallery";

type GalleryBrowserProps = {
  items: GalleryItem[];
  categories: GalleryCategory[];
};

const ALL_FILTER = "Todo";

export function GalleryBrowser({ items, categories }: GalleryBrowserProps) {
  const [activeFilter, setActiveFilter] = useState<string>(ALL_FILTER);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const filters = useMemo(
    () => [ALL_FILTER, ...categories.filter((category) => items.some((item) => item.category === category))],
    [categories, items]
  );

  const visibleItems = useMemo(
    () => (activeFilter === ALL_FILTER ? items : items.filter((item) => item.category === activeFilter)),
    [activeFilter, items]
  );

  const selectedItem = selectedIndex !== null ? visibleItems[selectedIndex] : null;

  const closeLightbox = useCallback(() => setSelectedIndex(null), []);

  const showPrevious = useCallback(() => {
    setSelectedIndex((current) =>
      current === null ? null : (current - 1 + visibleItems.length) % visibleItems.length
    );
  }, [visibleItems.length]);

  const showNext = useCallback(() => {
    setSelectedIndex((current) => (current === null ? null : (current + 1) % visibleItems.length));
  }, [visibleItems.length]);

  useEffect(() => {
    if (selectedIndex === null) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeLightbox();
      } else if (event.key === "ArrowLeft") {
        showPrevious();
      } else if (event.key === "ArrowRight") {
        showNext();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, closeLightbox, showPrevious, showNext]);

  function handleFilterChange(filter: string) {
    setActiveFilter(filter);
    setSelectedIndex(null);
  }

  function handleSelect(item: GalleryItem) {
    const index = visibleItems.findIndex((visibleItem) => visibleItem.id === item.id);
    if (index !== -1) {
      setSelectedIndex(index);
    }
  }

  return (
    <div className="gallery-browser">
      <div className="gallery-filters" role="group" aria-label="Filtrar galería por categoría">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            className={`gallery-filter ${activeFilter === filter ? "gallery-filter--active" : ""}`}
            aria-pressed={activeFilter === filter}
            onClick={() => handleFilterChange(filter)}
          >
            {filter}
          </button>
        ))}
        <p className="gallery-count" aria-live="polite">
          {visibleItems.length} {visibleItems.length === 1 ? "obra" : "obras"}
        </p>
      </div>

      <GalleryGrid items={visibleItems} onSelect={handleSelect} />

      {selectedItem ? (
        <div
          className="gallery-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={selectedItem.title}
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              closeLightbox();
            }
          }}
        >
          <button
            type="button"
            className="gallery-lightbox__close"
            onClick={closeLightbox}
            aria-label="Cerrar visor"
          >
            ×
          </button>
          {visibleItems.length > 1 ? (
            <>
              <button
                type="button"
                className="gallery-lightbox__nav gallery-lightbox__nav--previous"
                onClick={showPrevious}
                aria-label="Imagen anterior"
              >
                ‹
              </button>
              <button
                type="button"
                className="gallery-lightbox__nav gallery-lightbox__nav--next"
                onClick={showNext}
                aria-label="Imagen siguiente"
              >
                ›
              </button>
            </>
          ) : null}
          <figure className="gallery-lightbox__figure">
            <Image
              src={selectedItem.image}
              alt={selectedItem.alt}
              width={1200}
              height={900}
              unoptimized
              priority
            />
            <figcaption>
              <p className="eyebrow">{selectedItem.category}</p>
              <p>{selectedItem.title}</p>
            </figcaption>
          </figure>
        </div>
      ) : null}
    </div>
  );
}
