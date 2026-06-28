"use client";

import type { CSSProperties } from "react";
import { useMemo, useState } from "react";
import { DownloadCard } from "@/components/DownloadCard";
import {
  characterAccents,
  characterOrder,
  type DownloadItem,
  type DownloadType
} from "@/data/wallpapers";

const ALL = "Todos";
const DEFAULT_ACCENT = "#9a7dff";

type TypeFilter = typeof ALL | DownloadType;

const typeFilters: { value: TypeFilter; label: string }[] = [
  { value: ALL, label: "Todos" },
  { value: "wallpaper", label: "Wallpapers" },
  { value: "skin", label: "Skins" }
];

// Wallpapers primero, Skins después, dentro de cada personaje.
const typeOrder: DownloadType[] = ["wallpaper", "skin"];
const typeHeading: Record<DownloadType, string> = {
  wallpaper: "Wallpapers",
  skin: "Skins"
};

export function DownloadsBrowser({ items }: { items: DownloadItem[] }) {
  const [character, setCharacter] = useState<string>(ALL);
  const [type, setType] = useState<TypeFilter>(ALL);

  const visible = useMemo(
    () =>
      items.filter(
        (item) =>
          (character === ALL || item.character === character) &&
          (type === ALL || item.type === type)
      ),
    [items, character, type]
  );

  const charactersWithItems = useMemo(
    () => characterOrder.filter((name) => visible.some((item) => item.character === name)),
    [visible]
  );

  const activeAccent = character === ALL ? DEFAULT_ACCENT : characterAccents[character] ?? DEFAULT_ACCENT;

  return (
    <div className="downloads-browser" style={{ "--wallpaper-accent": activeAccent } as CSSProperties}>
      <div className="download-filters">
        <div className="download-filter-row" role="group" aria-label="Filtrar por personaje">
          <span className="download-filter-row__label">Personaje</span>
          {[ALL, ...characterOrder].map((name) => {
            const isActive = character === name;
            const accent = name === ALL ? DEFAULT_ACCENT : characterAccents[name] ?? DEFAULT_ACCENT;
            return (
              <button
                key={name}
                type="button"
                className={`download-filter${isActive ? " download-filter--active" : ""}`}
                style={{ "--filter-accent": accent } as CSSProperties}
                aria-pressed={isActive}
                onClick={() => setCharacter(name)}
              >
                {name}
              </button>
            );
          })}
        </div>

        <div className="download-filter-row" role="group" aria-label="Filtrar por categoría">
          <span className="download-filter-row__label">Categoría</span>
          {typeFilters.map((filter) => {
            const isActive = type === filter.value;
            return (
              <button
                key={filter.value}
                type="button"
                className={`download-filter${isActive ? " download-filter--active" : ""}`}
                style={{ "--filter-accent": activeAccent } as CSSProperties}
                aria-pressed={isActive}
                onClick={() => setType(filter.value)}
              >
                {filter.label}
              </button>
            );
          })}
          <p className="download-filters__count" aria-live="polite">
            {visible.length} {visible.length === 1 ? "pieza" : "piezas"}
          </p>
        </div>
      </div>

      {charactersWithItems.length === 0 ? (
        <p className="downloads-browser__empty">
          El Cronista aún no ha tejido esta faceta. Prueba otra combinación.
        </p>
      ) : (
        <div className="download-characters">
          {charactersWithItems.map((name) => {
            const accent = characterAccents[name] ?? DEFAULT_ACCENT;
            const ofCharacter = visible.filter((item) => item.character === name);

            return (
              <section
                key={name}
                className="download-character"
                aria-label={`Descargas de ${name}`}
                style={{ "--wallpaper-accent": accent } as CSSProperties}
              >
                <div className="wallpaper-group__head">
                  <h2>{name}</h2>
                </div>

                {typeOrder.map((typeKey) => {
                  const typeItems = ofCharacter.filter((item) => item.type === typeKey);
                  if (typeItems.length === 0) {
                    return null;
                  }
                  const desktop = typeItems.filter((item) => item.orientation === "desktop");
                  const mobile = typeItems.filter((item) => item.orientation === "mobile");

                  return (
                    <div className="download-type" key={typeKey}>
                      <p className="download-type__label">{typeHeading[typeKey]}</p>
                      {desktop.length > 0 ? (
                        <div className="wallpaper-grid">
                          {desktop.map((item) => (
                            <DownloadCard key={item.id} item={item} />
                          ))}
                        </div>
                      ) : null}
                      {mobile.length > 0 ? (
                        <div className="wallpaper-grid wallpaper-grid--mobile">
                          {mobile.map((item) => (
                            <DownloadCard key={item.id} item={item} />
                          ))}
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}
