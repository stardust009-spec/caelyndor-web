"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import Image from "next/image";
import { PlayIcon } from "@/components/MusicIcons";
import { MusicTrackCard } from "@/components/MusicTrackCard";
import { FALLBACK_MUSIC_COVER, useMusicPlayer } from "@/components/MusicPlayerContext";
import { musicAlbums, type AlbumTrack } from "@/data/albums";
import type { MusicCategory, MusicTrack } from "@/data/music";

export { FALLBACK_MUSIC_COVER };

type MusicArchiveProps = {
  tracks: MusicTrack[];
};

type MusicFilter = "todos" | MusicCategory;
type MusicTab = "recent" | "top" | "album";

const filters: { label: string; value: MusicFilter }[] = [
  { label: "Todos", value: "todos" },
  { label: "Personajes", value: "personaje" },
  { label: "Regiones", value: "region" },
  { label: "Dúos", value: "duo" },
  { label: "Arcos", value: "arco" },
  { label: "Especiales", value: "especial" }
];

const musicHeroBanner = "/images/music/cronicas-caelyndor-music-hero.jpg";

function normalizeTrackTitle(value: string) {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[¿?()]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

export function MusicArchive({ tracks }: MusicArchiveProps) {
  const {
    currentTrack,
    isPlaying,
    stats,
    queue,
    erroredTracks,
    setTrack,
    handleToggle,
    handleLike,
    handleQueue,
    setPlaybackPool,
    ensureCurrentTrack
  } = useMusicPlayer();

  const gridRef = useRef<HTMLDivElement>(null);
  const albumSliderRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<MusicTab>("recent");
  const [activeFilter, setActiveFilter] = useState<MusicFilter>("todos");
  const [selectedAlbumSlug, setSelectedAlbumSlug] = useState(musicAlbums[0]?.slug ?? "");
  const [selectedAlbumTrack, setSelectedAlbumTrack] = useState<string | null>(null);
  const [canScrollAlbumLeft, setCanScrollAlbumLeft] = useState(false);
  const [canScrollAlbumRight, setCanScrollAlbumRight] = useState(true);
  const [lyricsTrackKey, setLyricsTrackKey] = useState<string | null>(null);
  const [albumHeroOffset, setAlbumHeroOffset] = useState({ x: 0, y: 0 });

  const trackById = useMemo(() => new Map(tracks.map((track) => [track.id, track])), [tracks]);
  const trackByNormalizedTitle = useMemo(
    () => new Map(tracks.map((track) => [normalizeTrackTitle(track.title), track])),
    [tracks]
  );
  const selectedAlbum = musicAlbums.find((album) => album.slug === selectedAlbumSlug) ?? musicAlbums[0];

  const orderedTracks = useMemo(() => {
    if (activeTab !== "top") {
      return tracks;
    }

    return [...tracks].sort((first, second) => {
      const firstPlays = stats[first.id]?.plays ?? 0;
      const secondPlays = stats[second.id]?.plays ?? 0;
      return secondPlays - firstPlays;
    });
  }, [activeTab, stats, tracks]);

  const filteredTracks = useMemo(() => {
    if (activeFilter === "todos") {
      return orderedTracks;
    }

    return orderedTracks.filter((track) => track.category === activeFilter);
  }, [activeFilter, orderedTracks]);

  useEffect(() => {
    ensureCurrentTrack();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setPlaybackPool(filteredTracks.map((track) => track.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredTracks]);

  useEffect(() => {
    updateAlbumScrollState();
  }, [selectedAlbumSlug]);

  function handleSongsChip() {
    setActiveFilter("todos");
    setActiveTab("recent");
    gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function resolveAlbumTrack(albumTrack: AlbumTrack) {
    if (albumTrack.linkedTrackId) {
      const linkedTrack = trackById.get(albumTrack.linkedTrackId);

      if (linkedTrack) {
        return linkedTrack;
      }
    }

    if (albumTrack.linkedTrackTitle) {
      return trackByNormalizedTitle.get(normalizeTrackTitle(albumTrack.linkedTrackTitle));
    }

    return trackByNormalizedTitle.get(normalizeTrackTitle(albumTrack.title));
  }

  function updateAlbumScrollState() {
    const slider = albumSliderRef.current;

    if (!slider) {
      return;
    }

    setCanScrollAlbumLeft(slider.scrollLeft > 8);
    setCanScrollAlbumRight(slider.scrollLeft + slider.clientWidth < slider.scrollWidth - 8);
  }

  function scrollAlbumSlider(direction: "left" | "right") {
    const tracklist = selectedAlbum.tracklist;

    if (tracklist.length === 0) {
      return;
    }

    const currentIndex = Math.max(
      0,
      tracklist.findIndex((albumTrack) => `${selectedAlbum.slug}-${albumTrack.number}` === selectedAlbumTrack)
    );
    const nextIndex = direction === "left" ? Math.max(0, currentIndex - 1) : Math.min(tracklist.length - 1, currentIndex + 1);
    const nextTrack = tracklist[nextIndex];

    if (nextTrack) {
      selectAlbumTrack(`${selectedAlbum.slug}-${nextTrack.number}`);
    }
  }

  function selectAlbumTrack(albumTrackKey: string) {
    setSelectedAlbumTrack(albumTrackKey);
    setLyricsTrackKey(null);

    requestAnimationFrame(() => {
      document.getElementById(`album-slide-${albumTrackKey}`)?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center"
      });
      updateAlbumScrollState();
    });
  }

  return (
    <div className="music-archive">
      <section className="music-profile" aria-label="Archivo Sonoro de Caelyndor">
        <Image
          className="music-profile__banner"
          src={musicHeroBanner}
          alt=""
          fill
          priority
          sizes="(max-width: 760px) 100vw, 1120px"
        />
        <div className="music-profile__content">
          <p className="eyebrow">CRÓNICAS DE CAELYNDOR</p>
          <h2>Crónicas de Caelyndor</h2>
          <p className="music-profile__handle">@caelyndor_bard</p>
          <div className="music-profile__stats">
            <button type="button" onClick={handleSongsChip} aria-label={`Ver las ${tracks.length} canciones`}>
              {tracks.length} canciones
            </button>
          </div>
        </div>
        <button
          className="music-profile__play"
          type="button"
          onClick={() => {
            const track = currentTrack ?? tracks[0];
            if (track) {
              setTrack(track, { countPlay: true, pushHistory: false });
            }
          }}
          aria-label="Reproducir archivo sonoro"
        >
          <PlayIcon size={24} />
        </button>
      </section>

      <div className="music-tabs" aria-label="Orden de canciones">
        <button className={activeTab === "recent" ? "music-tab music-tab--active" : "music-tab"} type="button" onClick={() => setActiveTab("recent")}>
          Recent
        </button>
        <button className={activeTab === "top" ? "music-tab music-tab--active" : "music-tab"} type="button" onClick={() => setActiveTab("top")}>
          Top
        </button>
        <button className={activeTab === "album" ? "music-tab music-tab--active" : "music-tab"} type="button" onClick={() => setActiveTab("album")}>
          Álbum
        </button>
      </div>

      {activeTab !== "album" ? (
        <div className="music-filters music-filters--secondary" aria-label="Filtrar música">
          {filters.map((filter) => (
            <button
              className={`music-filter${activeFilter === filter.value ? " music-filter--active" : ""}`}
              key={filter.value}
              type="button"
              onClick={() => setActiveFilter(filter.value)}
              aria-pressed={activeFilter === filter.value}
            >
              {filter.label}
            </button>
          ))}
        </div>
      ) : null}

      {activeTab === "album" && selectedAlbum ? (
        <div className="music-album" aria-labelledby="music-album-title" ref={gridRef}>
          <h2 className="sr-only" id="music-album-title">
            Álbumes
          </h2>
          <div className="music-album-gallery" aria-label="Galería de álbumes">
            {musicAlbums.map((album) => {
              const isAlbumSelected = selectedAlbum.slug === album.slug;

              return (
                <button
                  className={`music-album-card${isAlbumSelected ? " music-album-card--active" : ""}${album.tracklist.length === 0 ? " music-album-card--pending" : ""}`}
                  key={album.slug}
                  type="button"
                  onClick={() => {
                    setSelectedAlbumSlug(album.slug);
                    setSelectedAlbumTrack(null);
                    setLyricsTrackKey(null);
                    setAlbumHeroOffset({ x: 0, y: 0 });
                  }}
                  aria-pressed={isAlbumSelected}
                >
                  {album.heroImage ? (
                    <Image className="music-album-card__image" src={album.heroImage} alt="" fill sizes="(max-width: 760px) 78vw, 280px" />
                  ) : (
                    <span className="music-album-card__mark" aria-hidden="true" />
                  )}
                  <span className="music-album-card__shade" aria-hidden="true" />
                  <span className="music-album-card__copy">
                    <small>{album.status ?? "Disponible"}</small>
                    <strong>{album.title}</strong>
                    <em>{album.artist}</em>
                  </span>
                </button>
              );
            })}
          </div>

          {selectedAlbum.tracklist.length > 0 ? (
            <>
              {selectedAlbum.heroImage ? (
                <div
                  className="music-album__header"
                  onPointerMove={(event) => {
                    const rect = event.currentTarget.getBoundingClientRect();
                    const x = ((event.clientX - rect.left) / rect.width - 0.5) * -1;
                    const y = ((event.clientY - rect.top) / rect.height - 0.5) * -1;
                    setAlbumHeroOffset({ x, y });
                  }}
                  onPointerLeave={() => setAlbumHeroOffset({ x: 0, y: 0 })}
                  style={
                    {
                      "--album-parallax-x": `${albumHeroOffset.x * 1.8}%`,
                      "--album-parallax-y": `${albumHeroOffset.y * 1.2}%`
                    } as CSSProperties
                  }
                >
                  {selectedAlbum.heroVideoMp4 || selectedAlbum.heroVideoWebm ? (
                    <video
                      key={selectedAlbum.slug}
                      className="music-album__header-video"
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      poster={selectedAlbum.heroImage}
                      aria-hidden="true"
                    >
                      {selectedAlbum.heroVideoWebm ? <source src={selectedAlbum.heroVideoWebm} type="video/webm" /> : null}
                      {selectedAlbum.heroVideoMp4 ? <source src={selectedAlbum.heroVideoMp4} type="video/mp4" /> : null}
                    </video>
                  ) : (
                    <Image className="music-album__header-image" src={selectedAlbum.heroImage} alt="" fill sizes="(max-width: 760px) 100vw, 1120px" />
                  )}
                </div>
              ) : null}

              <div className="music-album__main">
                <div className="music-album__left">
                  <div className="music-album__selected-head">
                    <div>
                      <span>{selectedAlbum.tracklist.length} canciones</span>
                      <h3>{selectedAlbum.title}</h3>
                      {selectedAlbum.description ? <p>{selectedAlbum.description}</p> : null}
                    </div>
                    <div className="music-album__slider-controls" aria-label="Navegar canciones del álbum">
                      <button type="button" onClick={() => scrollAlbumSlider("left")} disabled={!canScrollAlbumLeft} aria-label="Ver canciones anteriores">
                        ‹
                      </button>
                      <button type="button" onClick={() => scrollAlbumSlider("right")} disabled={!canScrollAlbumRight} aria-label="Ver canciones siguientes">
                        ›
                      </button>
                    </div>
                  </div>

                  <div className="music-album__slider" aria-label={`Canciones de ${selectedAlbum.title}`} ref={albumSliderRef} onScroll={updateAlbumScrollState}>
                    {selectedAlbum.tracklist.map((albumTrack) => {
                      const linkedTrack = resolveAlbumTrack(albumTrack);
                      const albumTrackKey = `${selectedAlbum.slug}-${albumTrack.number}`;
                      const fallbackSelectedKey = `${selectedAlbum.slug}-${selectedAlbum.tracklist[0]?.number}`;
                      const activeAlbumTrackKey = selectedAlbumTrack ?? fallbackSelectedKey;
                      const isSelected = activeAlbumTrackKey === albumTrackKey;
                      const slideCover = linkedTrack?.coverImage ?? FALLBACK_MUSIC_COVER;

                      return (
                        <article className={`music-album-slide${isSelected ? " music-album-slide--active" : ""}`} id={`album-slide-${albumTrackKey}`} key={albumTrack.number}>
                          <button
                            className="music-album-slide__body"
                            type="button"
                            onClick={() => {
                              selectAlbumTrack(albumTrackKey);
                            }}
                            aria-pressed={isSelected}
                          >
                            <span className="music-album-slide__cover">
                              <Image
                                src={slideCover}
                                alt={linkedTrack?.coverImage ? `Carátula de ${albumTrack.title}` : `Carátula no disponible para ${albumTrack.title}`}
                                fill
                                sizes="(max-width: 760px) 68vw, 260px"
                                onError={(event) => {
                                  event.currentTarget.src = FALLBACK_MUSIC_COVER;
                                  event.currentTarget.alt = `Carátula no disponible para ${albumTrack.title}`;
                                }}
                              />
                            </span>
                            <span className="music-album-slide__meta">{albumTrack.number.toString().padStart(2, "0")}</span>
                            <strong>{albumTrack.title}</strong>
                          </button>
                        </article>
                      );
                    })}
                  </div>

                </div>

                <aside className="music-album__detail" aria-live="polite">
                  {(() => {
                    const selectedTrack =
                      selectedAlbum.tracklist.find((albumTrack) => `${selectedAlbum.slug}-${albumTrack.number}` === selectedAlbumTrack) ??
                      selectedAlbum.tracklist[0];

                    if (!selectedTrack) {
                      return null;
                    }

                    const detailTrackKey = `${selectedAlbum.slug}-${selectedTrack.number}`;
                    const isLyricsOpen = lyricsTrackKey === detailTrackKey;
                    const linkedTrack = resolveAlbumTrack(selectedTrack);

                    return (
                      <>
                        <div className="music-album__info">
                          <span>{selectedTrack.number.toString().padStart(2, "0")}</span>
                          <h3>{selectedTrack.title}</h3>
                          <p>{selectedTrack.description}</p>
                          <div className="music-album__actions">
                            {linkedTrack ? (
                              <button type="button" onClick={() => handleToggle(linkedTrack)}>
                                {currentTrack?.id === linkedTrack.id && isPlaying ? "Pausar" : "Reproducir"}
                              </button>
                            ) : (
                              <strong>Próximamente</strong>
                            )}
                            <button
                              type="button"
                              onClick={() => setLyricsTrackKey(isLyricsOpen ? null : detailTrackKey)}
                              aria-expanded={isLyricsOpen}
                              aria-controls="album-detail-lyrics"
                            >
                              {isLyricsOpen ? "Ocultar lyrics" : "Lyrics"}
                            </button>
                          </div>
                          <div className={`music-album__lyrics-drawer${isLyricsOpen ? " music-album__lyrics-drawer--open" : ""}`} id="album-detail-lyrics">
                            <div className="music-album__lyrics-scroll">
                              {(selectedTrack.lyrics ?? "Lyrics pendientes de cargar.").split("\n").map((line, index) => (
                                <p key={`${selectedTrack.number}-${index}`}>{line}</p>
                              ))}
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })()}
                </aside>
              </div>
            </>
          ) : (
            <section className="music-album__empty" aria-live="polite">
              <p className="eyebrow">{selectedAlbum.status ?? "Próximamente"}</p>
              <h3>{selectedAlbum.title}</h3>
              <p>Este álbum aún está en preparación.</p>
            </section>
          )}
        </div>
      ) : (
        <div className="music-grid" aria-live="polite" ref={gridRef}>
          {filteredTracks.map((track) => (
            <MusicTrackCard
              key={track.id}
              track={track}
              isActive={currentTrack?.id === track.id}
              isPlaying={currentTrack?.id === track.id && isPlaying}
              hasError={Boolean(erroredTracks[track.id])}
              onToggle={handleToggle}
              fallbackCover={FALLBACK_MUSIC_COVER}
              plays={stats[track.id]?.plays ?? 0}
              liked={stats[track.id]?.liked ?? false}
              queued={queue.includes(track.id)}
              onLike={handleLike}
              onQueue={handleQueue}
            />
          ))}
        </div>
      )}
    </div>
  );
}
