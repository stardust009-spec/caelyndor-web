"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CasaPanel } from "@/components/casa/CasaPanels";
import { FrameStore, type CasaManifest, type CasaRest } from "@/components/casa/frameStore";
import { useMusicPlayer } from "@/components/MusicPlayerContext";
import {
  CASA_ASSET_BASE,
  CASA_EXTERIOR,
  CASA_OBJETOS,
  CASA_OBJETO_INFO,
  type CasaContent,
  type CasaExterior,
  type CasaObjeto
} from "@/data/casa";

// ——— Guion del recorrido. Posición p: 0 la casita a lo lejos · 1 el arco · 2 el jardín ·
// 3 la puerta · 4 la sala. Entre dos descansos corre un tramo (t1…t4): el vuelo de cámara
// hecho con video IA, que el scroll recorre fotograma a fotograma.
type Beat = { p0: number; p1: number; vh: number };
/** Cada tramo avanza de p0 a p1 mientras se desplazan `vh` alturas de pantalla (en %). */
const BEATS: Beat[] = [
  { p0: 0, p1: 0, vh: 35 }, // la casita a lo lejos (título)
  { p0: 0, p1: 1, vh: 150 }, // el sendero hasta el arco
  { p0: 1, p1: 1, vh: 55 }, // el arco y el farol
  { p0: 1, p1: 2, vh: 130 }, // cruzando el arco
  { p0: 2, p1: 2, vh: 95 }, // el jardín: pausa para las leyendas
  { p0: 2, p1: 3, vh: 120 }, // hasta la puerta, que se abre
  { p0: 3, p1: 3, vh: 55 }, // la puerta entreabierta
  { p0: 3, p1: 4, vh: 95 }, // el umbral de luz y la sala
  { p0: 4, p1: 4, vh: 45 } // respiro en la sala
];
const GARDEN = 2;
const HUB = 4;
/** Con movimiento reducido: las escenas fijas, sin vuelo de cámara ni bucles. */
const REDUCED_BEATS: Beat[] = [
  { p0: 0, p1: 0, vh: 50 },
  { p0: 1, p1: 1, vh: 60 },
  { p0: GARDEN, p1: GARDEN, vh: 90 },
  { p0: 3, p1: 3, vh: 60 },
  { p0: HUB, p1: HUB, vh: 60 }
];
const ZOOM_IN_MS = 1300;
const ZOOM_OUT_MS = 950;
/** Distancia (en escenas) desde la que se empieza a bajar el bucle de un descanso. */
const LOOP_PRELOAD = 0.6;

type Mode = "idle" | "in" | "panel" | "out";
type Phase = "exterior" | "entrada" | "hub";
type Layout = { cw: number; ch: number; ox: number; oy: number; dw: number; dh: number };
type Zoom = { key: CasaObjeto; from: number; to: number; start: number; dur: number; t: number; done?: () => void };
type Sample = { p: number; pan: number };

const beatsLength = (beats: Beat[]) => beats.reduce((sum, beat) => sum + beat.vh, 0);
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Posición en el recorrido y encuadre horizontal (pantallas verticales) para un scroll dado. */
function sampleAt(scrolledVh: number, beats: Beat[], rests: CasaRest[]): Sample {
  const pan = (index: number) => rests[index]?.pan ?? [0.5, 0.5];
  let acc = 0;
  for (const [i, beat] of beats.entries()) {
    if (scrolledVh <= acc + beat.vh || i === beats.length - 1) {
      const t = beat.vh ? clamp((scrolledVh - acc) / beat.vh, 0, 1) : 1;
      if (beat.p0 === beat.p1) {
        const [a, b] = pan(beat.p0);
        return { p: beat.p0, pan: lerp(a, b, t) };
      }
      return { p: lerp(beat.p0, beat.p1, t), pan: lerp(pan(beat.p0)[1], pan(beat.p1)[0], t) };
    }
    acc += beat.vh;
  }
  return { p: HUB, pan: 0.5 };
}

/** Scroll (en vh) a una fracción `where` del descanso `p`. */
function vhAtRest(p: number, beats: Beat[], where: number) {
  let acc = 0;
  for (const beat of beats) {
    if (beat.p0 === p && beat.p1 === p) return acc + beat.vh * where;
    acc += beat.vh;
  }
  return acc;
}

/** Encuadre "cover" con el centro horizontal en `cx` (sin dejar bordes vacíos). */
function coverLayout(cw: number, ch: number, iw: number, ih: number, cx = 0.5): Layout {
  const scale = Math.max(cw / iw, ch / ih);
  const dw = iw * scale;
  const dh = ih * scale;
  return { cw, ch, dw, dh, ox: clamp(cw / 2 - cx * dw, cw - dw, 0), oy: (ch - dh) / 2 };
}

/** Cierra una animación de acercamiento una sola vez (la llama el bucle o un respaldo). */
function finishZoom(zoom: Zoom) {
  zoom.t = zoom.to;
  const done = zoom.done;
  zoom.done = undefined;
  done?.();
}

const isPortrait = () => window.innerWidth / window.innerHeight < 0.82;

function waitFor(condition: () => boolean, timeout: number) {
  return new Promise<void>((resolve) => {
    const started = performance.now();
    const check = () => {
      if (condition() || performance.now() - started > timeout) resolve();
      else window.setTimeout(check, 50);
    };
    check();
  });
}

function isObjeto(value: string): value is CasaObjeto {
  return (CASA_OBJETOS as readonly string[]).includes(value);
}

function placeVideo(video: HTMLVideoElement, lay: Layout) {
  const key = `${lay.ox.toFixed(1)}:${lay.oy.toFixed(1)}:${lay.dw.toFixed(1)}:${lay.dh.toFixed(1)}`;
  if (video.dataset.place === key) return;
  video.dataset.place = key;
  video.style.width = `${lay.dw}px`;
  video.style.height = `${lay.dh}px`;
  video.style.transform = `translate3d(${lay.ox}px, ${lay.oy}px, 0)`;
}

export function CasaDeLyzi({ content }: { content: CasaContent }) {
  const { tracks, currentTrack, isPlaying, handleToggle } = useMusicPlayer();

  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLParagraphElement>(null);
  const gardenRef = useRef<HTMLParagraphElement>(null);
  const salaRef = useRef<HTMLParagraphElement>(null);
  const extButtons = useRef<Partial<Record<CasaExterior, HTMLButtonElement | null>>>({});
  const loopRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const closeVideoRef = useRef<HTMLVideoElement>(null);

  const storeRef = useRef<FrameStore | null>(null);
  const manifestRef = useRef<CasaManifest | null>(null);
  const layoutRef = useRef<Layout | null>(null);
  const reducedRef = useRef(false);
  const loopsOkRef = useRef(true);
  const gRef = useRef(0);
  const targetRef = useRef(0);
  const panRef = useRef(0.5);
  const panTargetRef = useRef(0.5);
  const zoomRef = useRef<Zoom | null>(null);
  const modeRef = useRef<Mode>("idle");
  const phaseRef = useRef<Phase>("exterior");
  const legendRef = useRef<{ key: CasaExterior; scrollY: number } | null>(null);
  const rafRef = useRef(0);
  const drawnRef = useRef("");
  const dprRef = useRef(1);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const kickRef = useRef<() => void>(() => {});

  const [manifest, setManifest] = useState<CasaManifest | null>(null);
  const [failed, setFailed] = useState(false);
  const [portrait, setPortrait] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [size, setSize] = useState<{ cw: number; ch: number } | null>(null);
  const [phase, setPhase] = useState<Phase>("exterior");
  const [legend, setLegend] = useState<{ key: CasaExterior; x: number; y: number } | null>(null);
  const [active, setActive] = useState<CasaObjeto | null>(null);
  const [mode, setMode] = useState<Mode>("idle");
  const [hovered, setHovered] = useState<CasaObjeto | null>(null);
  const [painted, setPainted] = useState(false);
  const [loadedPct, setLoadedPct] = useState(0);
  const [closeReady, setCloseReady] = useState(false);

  const beats = reduced ? REDUCED_BEATS : BEATS;
  const scrollVh = beatsLength(beats);

  const setModeBoth = useCallback((next: Mode) => {
    modeRef.current = next;
    setMode(next);
  }, []);

  // ——— orientación y preferencia de movimiento
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      reducedRef.current = media.matches;
      setReduced(media.matches);
    };
    apply();
    media.addEventListener("change", apply);
    const onResize = () => setPortrait(isPortrait());
    onResize();
    window.addEventListener("resize", onResize);
    return () => {
      media.removeEventListener("change", apply);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // ——— manifiesto
  useEffect(() => {
    let cancelled = false;
    fetch(`${CASA_ASSET_BASE}/manifest.json`)
      .then((response) => {
        if (!response.ok) throw new Error(String(response.status));
        return response.json() as Promise<CasaManifest>;
      })
      .then((data) => {
        if (cancelled) return;
        if (data.v !== 2 || !data.seq?.t1) throw new Error("manifest");
        manifestRef.current = data;
        setManifest(data);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const trackTop = useCallback(() => {
    const track = trackRef.current;
    return track ? track.getBoundingClientRect().top + window.scrollY : 0;
  }, []);

  const hubScrollY = useCallback(
    () => trackTop() + (beatsLength(reducedRef.current ? REDUCED_BEATS : BEATS) / 100) * window.innerHeight,
    [trackTop]
  );

  // ——— motor: carga de fotogramas, dibujo, bucles y overlays (sin re-render de React por fotograma)
  useEffect(() => {
    if (!manifest) return;
    const canvas = canvasRef.current;
    const stage = stageRef.current;
    if (!canvas || !stage) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    setPainted(false);
    const nav = navigator as Navigator & {
      deviceMemory?: number;
      connection?: { saveData?: boolean; effectiveType?: string };
    };
    const smallDevice = window.innerWidth < 700 || (nav.deviceMemory ?? 8) <= 4;
    // con ahorro de datos o red lenta basta 1 de cada 4 fotogramas (el fundido entre ellos
    // suaviza) y las escenas quedan fijas: los bucles de video no se bajan
    const slowNetwork = Boolean(nav.connection?.saveData) || /(^|-)(2g|3g)$/.test(nav.connection?.effectiveType ?? "");
    loopsOkRef.current = !slowNetwork;
    const stride = slowNetwork ? 4 : smallDevice ? 2 : 1;
    const store = new FrameStore(CASA_ASSET_BASE, manifest.seq, smallDevice ? 4 : 6);
    storeRef.current = store;
    drawnRef.current = "";
    const tramos = ["t1", "t2", "t3", "t4"];
    if (reducedRef.current) {
      // sólo las escenas de descanso
      tramos.forEach((seq) => store.prioritize(seq, [0]));
      store.prioritize("t4", [store.count("t4") - 1]);
    } else {
      // de grueso a fino en todos los tramos a la vez: el recorrido completo se puede
      // recorrer casi de inmediato y va ganando fluidez
      for (const step of [16, 8, 4, 2, 1]) {
        if (step < stride) break;
        for (const seq of tramos) store.request(seq, { stride: step });
      }
    }
    const expected = tramos.reduce((sum, seq) => sum + Math.ceil(store.count(seq) / stride), 0);
    let lastPct = -1;
    store.onFrame = () => {
      const loaded = tramos.reduce((sum, seq) => sum + store.loaded(seq), 0);
      const pct = Math.min(100, Math.round((loaded / Math.max(1, expected)) * 100));
      if (pct !== lastPct && pct % 5 === 0) {
        lastPct = pct;
        setLoadedPct(pct);
      }
      drawnRef.current = "";
      kick();
    };

    const layoutFor = (pan: number) => {
      const rect = stage.getBoundingClientRect();
      return coverLayout(rect.width, rect.height, manifest.w, manifest.h, pan);
    };

    const resize = () => {
      const rect = stage.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      dprRef.current = dpr;
      const width = Math.round(rect.width * dpr);
      const height = Math.round(rect.height * dpr);
      // asignar el tamaño limpia el canvas: sólo si de verdad cambió (en móvil la barra
      // del navegador dispara resize sin cambiar el escenario, que mide 100svh)
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        drawnRef.current = "";
      }
      layoutRef.current = layoutFor(panRef.current);
      setSize((current) =>
        current && current.cw === rect.width && current.ch === rect.height ? current : { cw: rect.width, ch: rect.height }
      );
      onScroll();
    };

    const onScroll = () => {
      const scrolled = window.scrollY - trackTop();
      const vh = (scrolled / window.innerHeight) * 100;
      const activeBeats = reducedRef.current ? REDUCED_BEATS : BEATS;
      const sample = sampleAt(clamp(vh, 0, beatsLength(activeBeats)), activeBeats, manifest.rests);
      targetRef.current = sample.p;
      panTargetRef.current = sample.pan;
      const open = legendRef.current;
      if (open && Math.abs(window.scrollY - open.scrollY) > 70) {
        legendRef.current = null;
        setLegend(null);
      }
      kick();
    };

    const drawImage = (image: HTMLImageElement, alpha: number) => {
      const lay = layoutRef.current;
      if (!lay) return;
      const dpr = dprRef.current;
      ctx.globalAlpha = alpha;
      ctx.drawImage(image, lay.ox * dpr, lay.oy * dpr, lay.dw * dpr, lay.dh * dpr);
      ctx.globalAlpha = 1;
    };

    /** Tramo y fotograma (fraccionario) para una posición del recorrido. */
    const tramoAt = (g: number) => {
      const k = clamp(Math.floor(g), 0, 3);
      const seq = tramos[k];
      return { seq, position: clamp(g - k, 0, 1) * (store.count(seq) - 1) };
    };

    let paintedOnce = false;
    const draw = () => {
      let { seq, position } = tramoAt(gRef.current);
      const zoom = zoomRef.current;
      if (zoom) {
        seq = `zoom-${zoom.key}`;
        position = zoom.t * (store.count(seq) - 1);
      }
      const base = Math.floor(position);
      const frac = position - base;
      let index = store.nearest(seq, base);
      if (index < 0 && zoom) {
        // el acercamiento aún no llega: mantener la vista de la sala
        seq = "t4";
        index = store.nearest(seq, store.count(seq) - 1);
      }
      if (index < 0) return;
      const next = Math.min(base + 1, store.count(seq) - 1);
      const blend = index === base && frac > 0.04 && store.isReady(seq, next) ? Math.round(frac * 8) / 8 : 0;
      const lay = layoutRef.current;
      const key = `${seq}:${index}:${blend}:${lay ? lay.ox.toFixed(1) : ""}`;
      if (key === drawnRef.current) return;
      drawnRef.current = key;
      const image = store.get(seq, index);
      if (!image) return;
      drawImage(image, 1);
      if (blend) {
        const nextImage = store.get(seq, next);
        if (nextImage) drawImage(nextImage, blend);
      }
      if (!paintedOnce) {
        paintedOnce = true;
        setPainted(true);
      }
    };

    const setOpacity = (node: HTMLElement | null, value: number) => {
      if (node) node.style.opacity = String(value);
    };

    /** Bucles de los descansos: se bajan al acercarse y suenan (mudos) sólo con la escena quieta. */
    const loops = () => {
      const g = gRef.current;
      const lay = layoutRef.current;
      const settled =
        !zoomRef.current &&
        modeRef.current === "idle" &&
        Math.abs(g - Math.round(g)) < 0.004 &&
        Math.abs(targetRef.current - g) < 0.004;
      const restNow = settled ? Math.round(g) : -1;
      const allowed = loopsOkRef.current && !reducedRef.current;
      manifest.rests.forEach((rest, i) => {
        const video = loopRefs.current[i];
        if (!video) return;
        if (lay) placeVideo(video, lay);
        if (allowed && !video.getAttribute("src") && Math.abs(g - i) <= LOOP_PRELOAD) {
          video.preload = "auto";
          video.src = `${CASA_ASSET_BASE}/${rest.loop}`;
        }
        const wanted = allowed && i === restNow && Boolean(video.getAttribute("src"));
        if (wanted && video.paused && !video.dataset.starting) {
          // al llegar, desde el principio: arranca junto a la escena del tramo que acaba de pasar
          video.dataset.starting = "1";
          video.currentTime = 0;
          video
            .play()
            .catch(() => {})
            .finally(() => {
              delete video.dataset.starting;
              kick();
            });
        } else if (!wanted && !video.paused) {
          video.pause();
        }
        const on = wanted && !video.paused && video.readyState >= 3;
        video.classList.toggle("casa__loop--on", on);
      });
    };

    const overlay = () => {
      const g = gRef.current;
      const lay = layoutRef.current;
      setOpacity(titleRef.current, clamp(1 - g / 0.2, 0, 1));
      setOpacity(hintRef.current, clamp(1 - g / 0.06, 0, 1));
      const gardenIn = clamp((g - 0.85) / 0.15, 0, 1) * clamp((3.15 - g) / 0.15, 0, 1);
      setOpacity(gardenRef.current, reducedRef.current ? (g > 0.5 && g < 3.5 ? 1 : 0) : gardenIn);
      setOpacity(salaRef.current, zoomRef.current ? 0 : clamp((g - 3.8) / 0.2, 0, 1));
      // leyendas del exterior: cada una vive en su escena de descanso
      for (const key of CASA_EXTERIOR) {
        const button = extButtons.current[key];
        const spot = manifest.spots[key];
        if (!button) continue;
        let opacity = 0;
        let x = 0;
        let y = 0;
        if (spot && lay && !zoomRef.current) {
          opacity = clamp(1 - Math.abs(g - spot.rest) / 0.05, 0, 1);
          x = lay.ox + spot.p[0] * lay.dw;
          y = lay.oy + spot.p[1] * lay.dh;
          // en vertical el encuadre barre la escena: fuera de cuadro no se ofrece
          if (x < 18 || x > lay.cw - 18) opacity = 0;
        }
        const visible = opacity > 0.25;
        button.classList.toggle("casa-spot--flip", x > (lay?.cw ?? 0) * 0.62);
        button.style.opacity = String(opacity);
        button.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        button.style.pointerEvents = visible ? "auto" : "none";
        button.tabIndex = visible ? 0 : -1;
        button.setAttribute("aria-hidden", visible ? "false" : "true");
      }
      loops();
      const nextPhase: Phase = g < 3.35 ? "exterior" : g < HUB - 0.01 ? "entrada" : "hub";
      if (nextPhase !== phaseRef.current) {
        phaseRef.current = nextPhase;
        setPhase(nextPhase);
        if (nextPhase === "hub") {
          // precarga liviana: el arranque de cada acercamiento
          for (const objeto of CASA_OBJETOS) store.request(`zoom-${objeto}`, { stride: 8 });
        }
      }
    };

    // el suavizado sigue al scroll en tiempo real (no por fotograma): igual a 60 o 120 Hz y en
    // equipos que botan fotogramas
    let running = false;
    let lastStep = 0;
    const step = (now: number) => {
      rafRef.current = 0;
      const dt = running ? Math.min(now - lastStep, 120) : 1000 / 60;
      lastStep = now;
      running = true;
      const ease = reducedRef.current ? 1 : 1 - Math.exp(-dt / 110);
      let again = false;
      const zoom = zoomRef.current;
      if (zoom) {
        // los videos de acercamiento ya traen su propia aceleración: avance lineal
        const p = zoom.dur > 0 ? clamp((now - zoom.start) / zoom.dur, 0, 1) : 1;
        zoom.t = zoom.from + (zoom.to - zoom.from) * p;
        if (p < 1) again = true;
        else finishZoom(zoom);
      } else {
        const diff = targetRef.current - gRef.current;
        if (Math.abs(diff) > 0.0005) {
          gRef.current += diff * ease;
          again = true;
        } else {
          gRef.current = targetRef.current;
        }
      }
      const panDiff = panTargetRef.current - panRef.current;
      if (Math.abs(panDiff) > 0.0005) {
        panRef.current += panDiff * ease;
        again = true;
      } else {
        panRef.current = panTargetRef.current;
      }
      // durante un acercamiento el encuadre es el de la sala
      layoutRef.current = layoutFor(zoom ? (manifest.rests[HUB]?.pan[0] ?? 0.5) : panRef.current);
      draw();
      overlay();
      if (again) kick();
      else running = false;
    };

    function kick() {
      if (!rafRef.current) rafRef.current = requestAnimationFrame(step);
    }
    kickRef.current = kick;

    // un bucle que empieza a sonar (o se queda sin datos) vuelve a evaluar las escenas
    const videos = loopRefs.current.filter((video): video is HTMLVideoElement => Boolean(video));
    for (const video of videos) {
      video.muted = true;
      video.addEventListener("playing", kick);
      video.addEventListener("canplay", kick);
      video.addEventListener("waiting", kick);
    }
    const onVisibility = () => {
      if (!document.hidden) kick();
    };
    document.addEventListener("visibilitychange", onVisibility);

    resize();
    gRef.current = targetRef.current;
    panRef.current = panTargetRef.current;
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", resize);
    kick();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
      for (const video of videos) {
        video.removeEventListener("playing", kick);
        video.removeEventListener("canplay", kick);
        video.removeEventListener("waiting", kick);
        video.pause();
      }
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
      store.dispose();
      if (storeRef.current === store) storeRef.current = null;
    };
  }, [manifest, trackTop]);

  // ——— bloqueo de scroll mientras hay un objeto abierto (el canal de la barra queda reservado
  // en toda la página para que el escenario no cambie de ancho al bloquear)
  useEffect(() => {
    document.documentElement.classList.add("casa-html");
    return () => document.documentElement.classList.remove("casa-html");
  }, []);

  useEffect(() => {
    const locked = mode !== "idle";
    document.documentElement.classList.toggle("casa-html--locked", locked);
    return () => document.documentElement.classList.remove("casa-html--locked");
  }, [mode]);

  // ——— bucle vivo del primer plano (detrás del panel del objeto abierto)
  const stopCloseVideo = useCallback(() => {
    const video = closeVideoRef.current;
    setCloseReady(false);
    if (!video) return;
    video.pause();
    video.removeAttribute("src");
    video.load();
  }, []);

  const startCloseVideo = useCallback((key: CasaObjeto) => {
    const video = closeVideoRef.current;
    const closeup = manifestRef.current?.closeups[key];
    setCloseReady(false);
    if (!video || !closeup || !loopsOkRef.current || reducedRef.current) return;
    video.muted = true;
    video.preload = "auto";
    video.src = `${CASA_ASSET_BASE}/${closeup.loop}`;
  }, []);

  // ——— abrir / cerrar objetos de la sala
  const openObjeto = useCallback(
    (key: CasaObjeto, options: { fromHash?: boolean; instant?: boolean } = {}) => {
      const store = storeRef.current;
      if (!store || modeRef.current !== "idle") return;
      returnFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      legendRef.current = null;
      setLegend(null);
      setHovered(null);
      setActive(key);
      setModeBoth("in");
      if (!options.fromHash && window.location.hash !== `#${key}`) {
        window.history.pushState({ casa: key }, "", `#${key}`);
      }
      const seq = `zoom-${key}`;
      // la vista de la sala primero (es el respaldo mientras llega el acercamiento)
      store.prioritize(seq);
      store.prioritize("t4", [store.count("t4") - 1]);
      startCloseVideo(key);
      // arranca apenas estén todos (o a los 700 ms con los clave: el resto se funde al llegar)
      waitFor(() => store.loaded(seq) >= store.count(seq), 700).then(() => {
        if (modeRef.current !== "in") return;
        const zoom: Zoom = {
          key,
          from: 0,
          to: 1,
          t: 0,
          start: performance.now(),
          dur: reducedRef.current || options.instant ? 0 : ZOOM_IN_MS,
          done: () => {
            setModeBoth("panel");
            const video = closeVideoRef.current;
            if (video?.getAttribute("src")) {
              video.currentTime = 0;
              video.play().catch(() => {});
            }
          }
        };
        zoomRef.current = zoom;
        kickRef.current();
        // respaldo: si el navegador pausa las animaciones (pestaña oculta), no quedar a medias
        window.setTimeout(() => {
          if (modeRef.current === "in" && zoomRef.current === zoom) {
            finishZoom(zoom);
            drawnRef.current = "";
            kickRef.current();
          }
        }, zoom.dur + 900);
      });
    },
    [setModeBoth, startCloseVideo]
  );

  const finishClose = useCallback(() => {
    const zoom = zoomRef.current;
    if (!zoom || modeRef.current !== "panel") return;
    setModeBoth("out");
    setCloseReady(false);
    const out: Zoom = {
      key: zoom.key,
      from: zoom.t,
      to: 0,
      t: zoom.t,
      start: performance.now() + 160, // deja que el bucle del primer plano se desvanezca
      dur: reducedRef.current ? 0 : ZOOM_OUT_MS,
      done: () => {
        zoomRef.current = null;
        drawnRef.current = "";
        stopCloseVideo();
        setActive(null);
        setModeBoth("idle");
        returnFocusRef.current?.focus({ preventScroll: true });
        kickRef.current();
      }
    };
    zoomRef.current = out;
    kickRef.current();
    window.setTimeout(() => {
      if (modeRef.current === "out" && zoomRef.current === out) finishZoom(out);
    }, out.dur + 1100);
  }, [setModeBoth, stopCloseVideo]);

  const closeObjeto = useCallback(() => {
    if (modeRef.current !== "panel") return;
    const state = window.history.state as { casa?: string } | null;
    const clearHash = () => {
      if (window.location.hash) {
        window.history.replaceState(window.history.state, "", window.location.pathname + window.location.search);
      }
    };
    if (state?.casa) {
      window.history.back();
      // si el popstate no llega (o lo intercepta el router), cerrar igual
      window.setTimeout(() => {
        if (modeRef.current === "panel") {
          clearHash();
          finishClose();
        }
      }, 450);
    } else {
      clearHash();
      finishClose();
    }
  }, [finishClose]);

  // atrás/adelante del navegador y enlaces directos (#vitrola, #libro…)
  useEffect(() => {
    const onPop = () => {
      const key = window.location.hash.slice(1);
      if (isObjeto(key)) {
        if (modeRef.current === "idle" && phaseRef.current === "hub") openObjeto(key, { fromHash: true });
      } else if (modeRef.current === "panel") {
        finishClose();
      }
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, [openObjeto, finishClose]);

  useEffect(() => {
    if (!manifest) return;
    const key = window.location.hash.slice(1);
    if (!isObjeto(key)) return;
    window.scrollTo({ top: hubScrollY(), behavior: "auto" });
    targetRef.current = HUB;
    gRef.current = HUB;
    const store = storeRef.current;
    store?.prioritize(`zoom-${key}`, [store.count(`zoom-${key}`) - 1]);
    store?.prioritize("t4", [store.count("t4") - 1]);
    const timer = window.setTimeout(() => openObjeto(key, { fromHash: true, instant: true }), 250);
    return () => window.clearTimeout(timer);
  }, [manifest, hubScrollY, openObjeto]);

  // Escape cierra lo que esté abierto
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (modeRef.current === "panel") closeObjeto();
      else if (legendRef.current) {
        legendRef.current = null;
        setLegend(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeObjeto]);

  const openLegend = (key: CasaExterior) => {
    const button = extButtons.current[key];
    const stage = stageRef.current;
    if (!button || !stage) return;
    const rect = button.getBoundingClientRect();
    const stageRect = stage.getBoundingClientRect();
    legendRef.current = { key, scrollY: window.scrollY };
    setLegend({ key, x: rect.left + rect.width / 2 - stageRect.left, y: rect.top + rect.height / 2 - stageRect.top });
  };

  const closeLegend = () => {
    legendRef.current = null;
    setLegend(null);
  };

  const enterHouse = () => {
    closeLegend();
    window.scrollTo({ top: hubScrollY(), behavior: reducedRef.current ? "auto" : "smooth" });
  };

  const skipToHub = () => {
    window.scrollTo({ top: hubScrollY(), behavior: "auto" });
  };

  const backToGarden = () => {
    const beatsNow = reducedRef.current ? REDUCED_BEATS : BEATS;
    const top = trackTop() + (vhAtRest(GARDEN, beatsNow, 0.35) / 100) * window.innerHeight;
    window.scrollTo({ top, behavior: reducedRef.current ? "auto" : "smooth" });
  };

  const playTrack = (trackId?: string) => {
    const track = tracks.find((item) => item.id === trackId);
    if (track) handleToggle(track);
  };

  // encuadres fijos: la sala (objetos clickeables) y los primeros planos (paneles, libro)
  const hubLayout = useMemo(
    () => (size && manifest ? coverLayout(size.cw, size.ch, manifest.w, manifest.h, manifest.rests[HUB]?.pan[0] ?? 0.5) : null),
    [size, manifest]
  );
  const closeLayout = useMemo(
    () => (size && manifest ? coverLayout(size.cw, size.ch, manifest.w, manifest.h, manifest.rests[HUB]?.pan[0] ?? 0.5) : null),
    [size, manifest]
  );

  const legendData = legend ? content.legends[legend.key] : null;
  const hubPoint = (key: CasaObjeto) => {
    const point = manifest?.hub[key];
    if (!point || !hubLayout) return null;
    const left = hubLayout.ox + point[0] * hubLayout.dw;
    const top = hubLayout.oy + point[1] * hubLayout.dh;
    // en vertical la sala se recorta: lo que queda fuera se abre desde el índice de abajo
    if (left < 14 || left > hubLayout.cw - 14) return null;
    return { left, top };
  };
  const showHub = phase === "hub" && mode === "idle";
  const legendTrack = legendData?.trackId ? tracks.find((item) => item.id === legendData.trackId) : undefined;
  const legendPlaying = Boolean(legendTrack && currentTrack?.id === legendTrack.id && isPlaying);
  const hoveredPoint = hovered && showHub ? hubPoint(hovered) : null;

  return (
    <div className={`casa casa--${portrait ? "vertical" : "horizontal"}${reduced ? " casa--reduced" : ""}`}>
      <a className="casa-skip" href="#casa-indice">
        Saltar el recorrido e ir al índice
      </a>
      <div ref={trackRef} className="casa__track" style={{ height: `${scrollVh + 100}vh` }}>
        <div ref={stageRef} className={`casa__stage casa__stage--${mode}`} data-phase={phase}>
          {/* póster mientras llegan los fotogramas (y respaldo si no cargan) */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className={`casa__poster${painted ? " casa__poster--hidden" : ""}`}
            src={`${CASA_ASSET_BASE}/poster-H.webp`}
            alt=""
            aria-hidden="true"
            fetchPriority="high"
          />
          <canvas ref={canvasRef} className="casa__canvas" aria-hidden="true" />
          {/* escenas vivas: un bucle de video por descanso, sobre el último fotograma del tramo */}
          {manifest?.rests.map((rest, i) => (
            <video
              key={rest.id}
              ref={(node) => {
                loopRefs.current[i] = node;
              }}
              className="casa__loop"
              muted
              loop
              playsInline
              preload="none"
              disablePictureInPicture
              aria-hidden="true"
              tabIndex={-1}
            />
          ))}
          <video
            ref={closeVideoRef}
            className={`casa__loop casa__loop--close${closeReady && mode === "panel" ? " casa__loop--on" : ""}`}
            style={
              closeLayout
                ? {
                    width: closeLayout.dw,
                    height: closeLayout.dh,
                    transform: `translate3d(${closeLayout.ox}px, ${closeLayout.oy}px, 0)`
                  }
                : undefined
            }
            muted
            loop
            playsInline
            preload="none"
            disablePictureInPicture
            aria-hidden="true"
            tabIndex={-1}
            onPlaying={() => setCloseReady(true)}
          />
          <div className="casa__vignette" aria-hidden="true" />

          <div ref={titleRef} className="casa__title">
            <p className="casa__eyebrow">La casa de Lyzi</p>
            <h1>CAELYNDOR</h1>
            <p className="casa__phrase">Toda herida deja un reino.</p>
          </div>
          <p ref={hintRef} className="casa__hint">
            {reduced ? "Desliza para ir de escena en escena" : "Desliza para acercarte"}
            <span aria-hidden="true" />
          </p>
          <p ref={gardenRef} className="casa__caption casa__caption--garden">
            El jardín de Lyzi · toca lo que brilla
          </p>
          <p ref={salaRef} className="casa__caption casa__caption--sala">
            La sala de Lyzi{showHub ? " · explora sus objetos" : ""}
          </p>

          {!painted && !failed && mode === "idle" ? (
            <p className="casa__loading" role="status">
              Abriendo el sendero… {loadedPct > 0 ? `${loadedPct}%` : ""}
            </p>
          ) : null}
          {failed ? (
            <div className="casa__failed" role="status">
              <p>La casa no pudo abrirse esta vez.</p>
              <a href="#casa-indice">Ir al índice del portal</a>
            </div>
          ) : null}

          {/* leyendas del exterior */}
          <div className="casa__hotspots" aria-label="Detalles del jardín">
            {CASA_EXTERIOR.map((key) => (
              <button
                key={key}
                ref={(node) => {
                  extButtons.current[key] = node;
                }}
                type="button"
                className={`casa-spot casa-spot--exterior${key === "puerta" ? " casa-spot--door" : ""}${legend?.key === key ? " casa-spot--open" : ""}`}
                style={{ opacity: 0 }}
                tabIndex={-1}
                aria-hidden="true"
                aria-label={content.legends[key].kicker}
                onClick={() => (legend?.key === key ? closeLegend() : openLegend(key))}
              >
                <span className="casa-spot__glint" aria-hidden="true" />
                <span className="casa-spot__label">{content.legends[key].kicker}</span>
              </button>
            ))}
          </div>

          {legend && legendData ? (
            <div
              className="casa-legend"
              role="dialog"
              aria-modal="false"
              aria-labelledby="casa-legend-title"
              style={
                !portrait && size
                  ? {
                      left: clamp(legend.x < size.cw / 2 ? legend.x + 34 : legend.x - 34 - 360, 16, size.cw - 376),
                      top: clamp(legend.y - 120, 90, size.ch - 380)
                    }
                  : undefined
              }
            >
              <button type="button" className="casa-legend__close" onClick={closeLegend} aria-label="Cerrar leyenda">
                ×
              </button>
              <p className="casa-legend__kicker">{legendData.kicker}</p>
              <h2 id="casa-legend-title">{legendData.title}</h2>
              <p className="casa-legend__text">{legendData.text}</p>
              {legendData.source ? <p className="casa-legend__source">— {legendData.source}</p> : null}
              <div className="casa-legend__actions">
                {legend.key === "puerta" ? (
                  <button type="button" className="casa-button casa-button--primary" onClick={enterHouse}>
                    Entrar a la casa
                  </button>
                ) : null}
                {legendTrack ? (
                  <button type="button" className="casa-button" onClick={() => playTrack(legendTrack.id)}>
                    {legendPlaying ? "Pausar el tema" : "Escuchar el tema"}
                  </button>
                ) : null}
                {legendData.links.map((link) => (
                  <Link key={link.href} className="casa-button" href={link.href}>
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ) : null}

          {/* la sala: objetos clickeables */}
          {hoveredPoint ? (
            <div className="casa-glow" aria-hidden="true" style={{ left: hoveredPoint.left, top: hoveredPoint.top }} />
          ) : null}
          {showHub ? (
            <div className="casa__objects" aria-label="Objetos de la sala">
              {CASA_OBJETOS.map((key) => {
                const point = hubPoint(key);
                if (!point || !hubLayout) return null;
                const info = CASA_OBJETO_INFO[key];
                return (
                  <button
                    key={key}
                    type="button"
                    className={`casa-spot casa-spot--object${hovered === key ? " casa-spot--hover" : ""}${
                      point.left > hubLayout.cw * 0.62 ? " casa-spot--flip" : ""
                    }`}
                    style={{ transform: `translate3d(${point.left}px, ${point.top}px, 0)` }}
                    aria-label={`${info.name}: ${info.hint}`}
                    onMouseEnter={() => setHovered(key)}
                    onMouseLeave={() => setHovered((current) => (current === key ? null : current))}
                    onFocus={() => setHovered(key)}
                    onBlur={() => setHovered((current) => (current === key ? null : current))}
                    onClick={() => openObjeto(key)}
                  >
                    <span className="casa-spot__glint" aria-hidden="true" />
                    <span className="casa-spot__label">
                      <strong>{info.name}</strong>
                      <em>{info.hint}</em>
                    </span>
                  </button>
                );
              })}
            </div>
          ) : null}
          {showHub ? (
            <nav className="casa-dock" aria-label="Ir a un objeto de la sala">
              {CASA_OBJETOS.map((key) => (
                <button
                  key={key}
                  type="button"
                  className={`casa-dock__item${hovered === key ? " casa-dock__item--hover" : ""}`}
                  onMouseEnter={() => setHovered(key)}
                  onMouseLeave={() => setHovered((current) => (current === key ? null : current))}
                  onClick={() => openObjeto(key)}
                >
                  {CASA_OBJETO_INFO[key].short}
                </button>
              ))}
            </nav>
          ) : null}
          {phase !== "hub" && painted ? (
            <button type="button" className="casa-skip-hub" onClick={skipToHub}>
              Ir directo a la sala
            </button>
          ) : null}
          {showHub ? (
            <button type="button" className="casa-exit" onClick={backToGarden}>
              <span aria-hidden="true">↑</span> Volver al jardín
            </button>
          ) : null}

          {active && (mode === "panel" || mode === "out") && manifest ? (
            <CasaPanel
              key={active}
              objeto={active}
              content={content}
              orient={portrait ? "V" : "H"}
              layout={closeLayout}
              book={portrait ? null : manifest.book}
              leaving={mode === "out"}
              onClose={closeObjeto}
            />
          ) : null}
          {active && mode === "in" ? (
            <p className="casa__loading casa__loading--zoom" role="status">
              {CASA_OBJETO_INFO[active].name}…
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
