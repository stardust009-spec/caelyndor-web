"use client";

import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import type { Orient, OrientManifest, Point } from "@/components/casa/frameStore";
import { PauseIcon, PlayIcon } from "@/components/MusicIcons";
import { useMusicPlayer } from "@/components/MusicPlayerContext";
import {
  CASA_CINTAS,
  CASA_OBJETO_INFO,
  type CasaCinta,
  type CasaContent,
  type CasaObjeto,
  type CasaStory
} from "@/data/casa";

type Layout = { cw: number; ch: number; ox: number; oy: number; dw: number; dh: number };

type PanelProps = {
  objeto: CasaObjeto;
  content: CasaContent;
  orient: Orient;
  layout: Layout | null;
  book: OrientManifest["book"];
  leaving: boolean;
  onClose: () => void;
};

export function CasaPanel(props: PanelProps) {
  if (props.objeto === "libro") return <CasaLibro {...props} />;
  return <CasaSheet {...props} />;
}

const TITLES: Record<Exclude<CasaObjeto, "libro">, string> = {
  biblioteca: "Fichas, enciclopedia y crónicas",
  vitrola: "Lo que suena en la casa",
  cuadros: "Retratos y galería",
  mapa: "Sylvalis y el mundo",
  escritorio: "El libro en la Forja",
  baul: "Postales para llevar",
  rollito: "Rollito",
  visitas: "Firma el libro de visitas"
};

function useFocusOnMount<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    ref.current?.focus({ preventScroll: true });
  }, []);
  return ref;
}

function BackButton({ onClose }: { onClose: () => void }) {
  return (
    <button type="button" className="casa-panel__back" onClick={onClose}>
      <span aria-hidden="true">←</span> Volver a la sala
    </button>
  );
}

function CasaSheet({ objeto, content, leaving, onClose }: PanelProps) {
  const heading = useFocusOnMount<HTMLHeadingElement>();
  const info = CASA_OBJETO_INFO[objeto];
  const key = objeto as Exclude<CasaObjeto, "libro">;
  return (
    <aside
      className={`casa-panel casa-panel--${objeto}${leaving ? " casa-panel--leaving" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="casa-panel-title"
    >
      <header className="casa-panel__header">
        <BackButton onClose={onClose} />
        <p className="casa-panel__kicker">{info.name}</p>
        <h2 id="casa-panel-title" ref={heading} tabIndex={-1}>
          {TITLES[key]}
        </h2>
      </header>
      <div className="casa-panel__body">{renderBody(key, content)}</div>
    </aside>
  );
}

function renderBody(key: Exclude<CasaObjeto, "libro">, content: CasaContent): ReactNode {
  switch (key) {
    case "biblioteca":
      return <Biblioteca content={content} />;
    case "vitrola":
      return <Vitrola content={content} />;
    case "cuadros":
      return (
        <>
          <CardGrid cards={content.gallery} />
          <MoreLink href="/arte">Ver toda la galería</MoreLink>
        </>
      );
    case "mapa":
      return (
        <>
          <blockquote className="casa-quote">
            <p>{content.mapa.text}</p>
            <cite>Glosario · Sylvalis</cite>
          </blockquote>
          <ul className="casa-list casa-list--links">
            {content.archive
              .filter((item) => ["Mundo", "Reinos", "Glosario", "Bestiario"].includes(item.title))
              .map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>
                    <strong>{item.title}</strong>
                    <span>{item.text}</span>
                  </Link>
                </li>
              ))}
          </ul>
        </>
      );
    case "escritorio":
      return (
        <>
          <p className="casa-panel__lead">{content.forja.title}</p>
          <div className="casa-progress" role="img" aria-label={`Avance: ${content.forja.progress}%`}>
            <span style={{ width: `${content.forja.progress}%` }} />
          </div>
          <dl className="casa-facts">
            <div>
              <dt>Estado</dt>
              <dd>{content.forja.status}</dd>
            </div>
            <div>
              <dt>Último avance</dt>
              <dd>{content.forja.lastUpdate}</dd>
            </div>
            <div>
              <dt>Próximo hito</dt>
              <dd>{content.forja.nextMilestone}</dd>
            </div>
          </dl>
          <blockquote className="casa-quote">
            <p>{content.forja.definition}</p>
            <cite>Glosario · La Forja</cite>
          </blockquote>
          <MoreLink href="/nuevo-libro">Ver el avance completo</MoreLink>
        </>
      );
    case "baul":
      return (
        <>
          <CardGrid cards={content.downloads} wide />
          <MoreLink href="/descargas">Abrir el baúl completo</MoreLink>
        </>
      );
    case "rollito":
      return (
        <>
          <p className="casa-panel__lead">{content.rollito.bond}</p>
          <blockquote className="casa-quote">
            <p>{content.rollito.quote}</p>
            {content.rollito.story ? <cite>{content.rollito.story.title}</cite> : null}
          </blockquote>
          {content.rollito.story ? (
            <MoreLink href={`/relatos/${content.rollito.story.slug}`}>Leer el relato</MoreLink>
          ) : null}
        </>
      );
    case "visitas":
      return <Visitas />;
  }
}

function MoreLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link className="casa-more" href={href}>
      {children} <span aria-hidden="true">→</span>
    </Link>
  );
}

function CardGrid({ cards, wide = false }: { cards: CasaContent["gallery"]; wide?: boolean }) {
  return (
    <ul className={`casa-cards${wide ? " casa-cards--wide" : ""}`}>
      {cards.map((card) => (
        <li key={card.id}>
          <Link href={card.href}>
            <Image src={card.image} alt={card.title} width={wide ? 320 : 220} height={wide ? 180 : 300} sizes="(max-width: 700px) 45vw, 200px" />
            <span>{card.title}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

const TABS = ["Fichas", "Enciclopedia", "Cronología", "Libros"] as const;

function Biblioteca({ content }: { content: CasaContent }) {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Fichas");
  return (
    <>
      <div className="casa-tabs" role="tablist" aria-label="Estantes de la biblioteca">
        {TABS.map((name) => (
          <button
            key={name}
            type="button"
            role="tab"
            aria-selected={tab === name}
            className={`casa-tabs__tab${tab === name ? " casa-tabs__tab--active" : ""}`}
            onClick={() => setTab(name)}
          >
            {name}
          </button>
        ))}
      </div>
      <div role="tabpanel" aria-label={tab}>
        {tab === "Fichas" ? (
          <>
            <ul className="casa-fichas">
              {content.characters.map((character) => (
                <li key={character.slug}>
                  <Link href={`/personajes/${character.slug}`} style={{ ["--ficha-accent" as string]: character.accent }}>
                    <Image src={character.image} alt="" width={56} height={56} sizes="56px" />
                    <span>
                      <strong>{character.name}</strong>
                      <em>{character.title}</em>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <MoreLink href="/personajes">Ver todas las fichas</MoreLink>
          </>
        ) : null}
        {tab === "Enciclopedia" ? (
          <>
            <blockquote className="casa-quote">
              <p>{content.archivista}</p>
              <cite>Glosario · Curador del Archivo</cite>
            </blockquote>
            <ul className="casa-list casa-list--links">
              {content.archive.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>
                    <strong>{item.title}</strong>
                    <span>{item.text}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </>
        ) : null}
        {tab === "Cronología" ? (
          <>
            <ol className="casa-eras">
              {content.eras.map((era) => (
                <li key={era.title}>
                  <strong>{era.title}</strong>
                  <span>{era.type}</span>
                </li>
              ))}
            </ol>
            <MoreLink href="/cronologia">Recorrer la cronología</MoreLink>
          </>
        ) : null}
        {tab === "Libros" ? (
          <>
            <ul className="casa-list">
              {content.books.map((book) => (
                <li key={book.title}>
                  <strong>{book.title}</strong>
                  <span>{book.status}</span>
                </li>
              ))}
            </ul>
            <MoreLink href="/libros">Ver los libros</MoreLink>
          </>
        ) : null}
      </div>
    </>
  );
}

function Vitrola({ content }: { content: CasaContent }) {
  const { tracks, currentTrack, isPlaying, handleToggle, playCollection } = useMusicPlayer();
  const byId = useMemo(() => new Map(tracks.map((track) => [track.id, track])), [tracks]);
  return (
    <>
      <h3 className="casa-panel__subhead">Suena en la casa de Lyzi</h3>
      <ul className="casa-tracks">
        {content.lyziTracks.map((item) => {
          const track = byId.get(item.id);
          if (!track) return null;
          const playing = currentTrack?.id === item.id && isPlaying;
          return (
            <li key={item.id}>
              <button type="button" className={`casa-track${playing ? " casa-track--playing" : ""}`} onClick={() => handleToggle(track)}>
                {item.cover ? <Image src={item.cover} alt="" width={44} height={44} sizes="44px" /> : <span className="casa-track__cover" />}
                <span className="casa-track__text">
                  <strong>{item.title.replace(/^(Lyzi|Sylvalis) — /, "")}</strong>
                  <em>{item.subtitle ?? item.title.split(" — ")[0]}</em>
                </span>
                <span className="casa-track__icon" aria-label={playing ? "Pausar" : "Reproducir"}>
                  {playing ? <PauseIcon size={16} /> : <PlayIcon size={16} />}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
      <h3 className="casa-panel__subhead">Discos de la colección</h3>
      <ul className="casa-list">
        {content.albums.map((album) => {
          const collection = album.trackIds.map((id) => byId.get(id)).filter((track) => track !== undefined);
          const active = currentTrack ? album.trackIds.includes(currentTrack.id) && isPlaying : false;
          return (
            <li key={album.slug} className="casa-album">
              <span>
                <strong>{album.title}</strong>
                {album.status ? <span>{album.status}</span> : null}
              </span>
              <button
                type="button"
                className="casa-button"
                disabled={!collection.length}
                onClick={() => playCollection(collection)}
              >
                {active ? "Sonando" : "Poner el disco"}
              </button>
            </li>
          );
        })}
      </ul>
      <MoreLink href="/musica">Todo el archivo musical</MoreLink>
    </>
  );
}

function Visitas() {
  const { data: session, status } = useSession();
  const alias = session?.user?.alias ?? null;
  if (status === "authenticated") {
    return (
      <>
        <p className="casa-panel__lead">
          Tu firma ya está en el libro{alias ? `, ${alias}` : ""}. Desde tu cuenta sigues tu progreso de lectura, tus logros
          y tu avatar.
        </p>
        <MoreLink href="/cuenta">Ir a tu cuenta</MoreLink>
      </>
    );
  }
  return (
    <>
      <p className="casa-panel__lead">
        Entra o crea tu cuenta para guardar tu progreso de lectura, tus logros y tu avatar en el portal.
      </p>
      <MoreLink href="/cuenta">Firmar el libro</MoreLink>
    </>
  );
}

// ——— El libro abierto: los relatos se escriben sobre las páginas renderizadas

const HEADER_SAFE = 84; // alto del menú fijo + margen

function pageRect(points: (Point | null)[], layout: Layout) {
  const valid = points.filter((point): point is Point => point !== null);
  if (valid.length < 4) return null;
  const xs = valid.map(([x]) => layout.ox + x * layout.dw);
  const ys = valid.map(([, y]) => layout.oy + y * layout.dh);
  const left = Math.min(...xs);
  const top = Math.min(...ys);
  const width = Math.max(...xs) - left;
  const height = Math.max(...ys) - top;
  // margen interior de la hoja
  const insetX = width * 0.09;
  const insetY = height * 0.07;
  const safeTop = Math.max(top + insetY, HEADER_SAFE);
  const bottom = top + height - insetY;
  return { left: left + insetX, top: safeTop, width: width - insetX * 2, height: Math.max(80, bottom - safeTop) };
}

function storyMatches(story: CasaStory, cinta: CasaCinta) {
  const def = CASA_CINTAS.find((item) => item.key === cinta);
  if (!def || !def.match.length) return true;
  const names = story.characters.map((name) => name.toLowerCase());
  return def.match.some((fragment) => names.some((name) => name.includes(fragment)));
}

function CasaLibro({ content, orient, layout, book, leaving, onClose }: PanelProps) {
  const [cinta, setCinta] = useState<CasaCinta>("ensemble");
  const list = useMemo(() => content.stories.filter((story) => storyMatches(story, cinta)), [content.stories, cinta]);
  const [selected, setSelected] = useState<string>(content.stories[0]?.slug ?? "");
  const current = list.find((story) => story.slug === selected) ?? list[0];
  const heading = useFocusOnMount<HTMLHeadingElement>();

  const pages = useMemo(() => {
    if (!book || !layout) return null;
    const a = pageRect(book.L, layout);
    const b = pageRect(book.R, layout);
    if (!a || !b) return null;
    const sorted = orient === "V" ? [a, b].sort((p, q) => p.top - q.top) : [a, b].sort((p, q) => p.left - q.left);
    return { list: sorted[0], detail: sorted[1] };
  }, [book, layout, orient]);

  const cintaDef = CASA_CINTAS.find((item) => item.key === cinta)!;
  // cada botón se posa sobre su cinta, a medio camino entre el borde del libro y la punta
  const bookBottom = pages ? Math.max(pages.list.top + pages.list.height, pages.detail.top + pages.detail.height) : 0;
  const ribbons = CASA_CINTAS.map((item) => {
    const point = book?.ribbons[item.key];
    if (!point || !layout || !pages || orient === "V") return { ...item, style: undefined };
    const x = layout.ox + point[0] * layout.dw;
    const y = layout.oy + point[1] * layout.dh;
    return { ...item, style: { left: x, top: Math.min(bookBottom + (y - bookBottom) * 0.55, layout.ch - 60) } };
  });

  const listPage = (
    <>
      <p className="casa-page__kicker">Relatos de Caelyndor</p>
      <h2 id="casa-panel-title" ref={heading} tabIndex={-1} className="casa-page__title">
        {cinta === "ensemble" ? "Todas las cintas" : `La cinta de ${cintaDef.label}`}
      </h2>
      <ol className="casa-page__list">
        {list.map((story) => (
          <li key={story.slug}>
            <button
              type="button"
              className={story.slug === current?.slug ? "casa-page__story casa-page__story--active" : "casa-page__story"}
              onClick={() => setSelected(story.slug)}
            >
              <span className="casa-page__dot" style={{ background: story.color }} aria-hidden="true" />
              {story.title}
            </button>
          </li>
        ))}
      </ol>
    </>
  );
  const detailPage = current ? (
    <>
      <p className="casa-page__kicker">
        {current.characters.slice(0, 4).join(" · ")} · {current.minutes} min
      </p>
      <h3 className="casa-page__title casa-page__title--story">{current.title}</h3>
      <p className="casa-page__teaser">{current.teaser}</p>
      <Link className="casa-page__read" href={`/relatos/${current.slug}`}>
        Leer el relato <span aria-hidden="true">→</span>
      </Link>
    </>
  ) : (
    <p className="casa-page__teaser">Esta cinta todavía no marca ningún relato.</p>
  );

  return (
    <div
      className={`casa-libro${pages ? " casa-libro--on-pages" : ""}${leaving ? " casa-libro--leaving" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="casa-panel-title"
    >
      <div className="casa-libro__bar">
        <BackButton onClose={onClose} />
      </div>
      {pages ? (
        <>
          <div className="casa-page casa-page--list" style={pages.list}>
            {listPage}
          </div>
          <div className="casa-page casa-page--detail" style={pages.detail}>
            {detailPage}
          </div>
        </>
      ) : (
        <div className="casa-panel casa-panel--libro">
          <div className="casa-panel__body">
            {listPage}
            {detailPage}
          </div>
        </div>
      )}
      <div className="casa-cintas" role="group" aria-label="Cintas por personaje">
        {ribbons.map((item) => (
          <button
            key={item.key}
            type="button"
            className={`casa-cinta${cinta === item.key ? " casa-cinta--active" : ""}${item.style ? " casa-cinta--anchored" : ""}`}
            style={{ ...item.style, ["--cinta" as string]: item.color }}
            aria-pressed={cinta === item.key}
            onClick={() => setCinta(item.key)}
          >
            <span className="casa-cinta__swatch" aria-hidden="true" />
            <span className="casa-cinta__label">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
