"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { AmbientLayer, cameraAt } from "@/components/casa/ambient";
import { CasaPanel } from "@/components/casa/CasaPanels";
import { FrameStore, type CasaManifest, type Orient } from "@/components/casa/frameStore";
import { useMusicPlayer } from "@/components/MusicPlayerContext";
import {
  CASA_ASSET_BASE,
  CASA_EXTERIOR,
  CASA_EXTERIOR_WINDOWS,
  CASA_OBJETOS,
  CASA_OBJETO_INFO,
  type CasaContent,
  type CasaExterior,
  type CasaObjeto
} from "@/data/casa";

// ——— Guion del recorrido (en fotogramas globales: exterior 0–239, sala 240–323)
const EXT = 240;
const ENT = 84;
const LAST = EXT + ENT - 1;

type Beat = { g0: number; g1: number; vh: number };
/** Cada tramo avanza de g0 a g1 mientras se desplazan `vh` alturas de pantalla (en %). */
const BEATS: Beat[] = [
  { g0: 0, g1: 99, vh: 190 }, // el sendero hasta el arco
  { g0: 99, g1: 176, vh: 230 }, // el jardín: pausa para las leyendas
  { g0: 176, g1: 214, vh: 110 }, // la puerta se abre
  { g0: 214, g1: 266, vh: 40 }, // el destello del umbral pasa rápido (en ambos sentidos)
  { g0: 266, g1: LAST, vh: 110 }, // la sala se revela
  { g0: LAST, g1: LAST, vh: 45 } // respiro en la sala
];
/** Fotograma del jardín al que lleva "Volver al jardín". */
const GARDEN = 140;
/** Con movimiento reducido: dos escenas fijas (el jardín y la sala), sin vuelo de cámara. */
const REDUCED_BEATS: Beat[] = [
  { g0: 140, g1: 140, vh: 120 },
  { g0: LAST, g1: LAST, vh: 60 }
];

type Mode = "idle" | "in" | "panel" | "out";
type Phase = "exterior" | "entrada" | "hub";
type Layout = { cw: number; ch: number; ox: number; oy: number; dw: number; dh: number };
type Zoom = { key: CasaObjeto; from: number; to: number; start: number; dur: number; t: number; done?: () => void };

const beatsLength = (beats: Beat[]) => beats.reduce((sum, beat) => sum + beat.vh, 0);

function frameAt(scrolledVh: number, beats: Beat[]) {
  let acc = 0;
  for (const beat of beats) {
    if (scrolledVh <= acc + beat.vh) {
      const t = beat.vh ? (scrolledVh - acc) / beat.vh : 1;
      return beat.g0 + (beat.g1 - beat.g0) * Math.min(1, Math.max(0, t));
    }
    acc += beat.vh;
  }
  return beats[beats.length - 1].g1;
}

function vhAt(g: number, beats: Beat[]) {
  let acc = 0;
  for (const beat of beats) {
    if (g <= beat.g1) {
      return beat.g1 === beat.g0 ? acc : acc + clamp((g - beat.g0) / (beat.g1 - beat.g0), 0, 1) * beat.vh;
    }
    acc += beat.vh;
  }
  return acc;
}

const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

function coverLayout(cw: number, ch: number, iw: number, ih: number): Layout {
  const scale = Math.max(cw / iw, ch / ih);
  const dw = iw * scale;
  const dh = ih * scale;
  return { cw, ch, dw, dh, ox: (cw - dw) / 2, oy: (ch - dh) / 2 };
}

/** Cierra una animación de acercamiento una sola vez (la llama el bucle o un respaldo). */
function finishZoom(zoom: Zoom) {
  zoom.t = zoom.to;
  const done = zoom.done;
  zoom.done = undefined;
  done?.();
}

const pickOrient = (): Orient => (window.innerWidth / window.innerHeight < 0.82 ? "V" : "H");

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

export function CasaDeLyzi({ content }: { content: CasaContent }) {
  const { tracks, currentTrack, isPlaying, handleToggle } = useMusicPlayer();

  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ambientRef = useRef<HTMLCanvasElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLParagraphElement>(null);
  const gardenRef = useRef<HTMLParagraphElement>(null);
  const salaRef = useRef<HTMLParagraphElement>(null);
  const extButtons = useRef<Partial<Record<CasaExterior, HTMLButtonElement | null>>>({});

  const storeRef = useRef<FrameStore | null>(null);
  const manifestRef = useRef<CasaManifest | null>(null);
  const layoutRef = useRef<Layout | null>(null);
  const orientRef = useRef<Orient>("H");
  const reducedRef = useRef(false);
  const gRef = useRef(0);
  const targetRef = useRef(0);
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
  const [orient, setOrient] = useState<Orient>("H");
  const [reduced, setReduced] = useState(false);
  const [layout, setLayout] = useState<Layout | null>(null);
  const [phase, setPhase] = useState<Phase>("exterior");
  const [legend, setLegend] = useState<{ key: CasaExterior; x: number; y: number } | null>(null);
  const [active, setActive] = useState<CasaObjeto | null>(null);
  const [mode, setMode] = useState<Mode>("idle");
  const [hovered, setHovered] = useState<CasaObjeto | null>(null);
  const [painted, setPainted] = useState(false);
  const [loadedPct, setLoadedPct] = useState(0);

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
    const onResize = () => {
      const next = pickOrient();
      if (next !== orientRef.current) {
        orientRef.current = next;
        setOrient(next);
      }
    };
    orientRef.current = pickOrient();
    setOrient(orientRef.current);
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

  // ——— motor: carga de fotogramas, dibujo y overlays (sin re-render de React por fotograma)
  useEffect(() => {
    if (!manifest) return;
    const om = manifest[orient];
    if (!om || !om.seq.exterior) {
      setFailed(true);
      return;
    }
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
    // con ahorro de datos o red lenta basta 1 de cada 4 fotogramas (el fundido entre ellos suaviza)
    const slowNetwork = Boolean(nav.connection?.saveData) || /(^|-)(2g|3g)$/.test(nav.connection?.effectiveType ?? "");
    const stride = slowNetwork ? 4 : smallDevice ? 2 : 1;
    const store = new FrameStore(CASA_ASSET_BASE, orient, om.seq, smallDevice ? 4 : 6);
    storeRef.current = store;
    drawnRef.current = "";
    if (reducedRef.current) {
      store.request("exterior", { stride: 16, priority: true });
      store.request("entrada", { stride: 16, priority: true });
    } else {
      store.request("exterior", { stride });
      store.request("entrada", { stride });
    }
    const expected = (om.seq.exterior ?? 0) + (om.seq.entrada ?? 0);
    let lastPct = -1;
    store.onFrame = () => {
      const pct = Math.round(((store.loaded("exterior") + store.loaded("entrada")) / Math.max(1, expected)) * 100);
      if (pct !== lastPct && pct % 5 === 0) {
        lastPct = pct;
        setLoadedPct(pct);
      }
      drawnRef.current = "";
      kick();
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
      const live = ambientRef.current;
      if (live && (live.width !== width || live.height !== height)) {
        live.width = width;
        live.height = height;
      }
      const next = coverLayout(rect.width, rect.height, om.w, om.h);
      layoutRef.current = next;
      setLayout(next);
      onScroll();
    };

    const onScroll = () => {
      const scrolled = window.scrollY - trackTop();
      const vh = (scrolled / window.innerHeight) * 100;
      const activeBeats = reducedRef.current ? REDUCED_BEATS : BEATS;
      targetRef.current = frameAt(clamp(vh, 0, beatsLength(activeBeats)), activeBeats);
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

    let paintedOnce = false;
    const draw = () => {
      let seq: string;
      let position: number;
      const zoom = zoomRef.current;
      if (zoom) {
        seq = `zoom-${zoom.key}`;
        position = zoom.t * (store.count(seq) - 1);
      } else {
        const g = gRef.current;
        if (g < EXT) {
          seq = "exterior";
          position = g;
        } else {
          seq = "entrada";
          position = g - EXT;
        }
      }
      const base = Math.floor(position);
      const frac = position - base;
      let index = store.nearest(seq, base);
      if (index < 0 && zoom) {
        // el acercamiento aún no llega: mantener la vista de la sala
        seq = "entrada";
        index = store.nearest(seq, ENT - 1);
      }
      if (index < 0) return;
      const next = Math.min(base + 1, store.count(seq) - 1);
      const blend = index === base && frac > 0.04 && store.isReady(seq, next) ? Math.round(frac * 8) / 8 : 0;
      const key = `${seq}:${index}:${blend}`;
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

    const overlay = () => {
      const g = gRef.current;
      const lay = layoutRef.current;
      setOpacity(titleRef.current, clamp(1 - g / 26, 0, 1));
      setOpacity(hintRef.current, clamp(1 - g / 6, 0, 1));
      const gardenIn = clamp((g - 104) / 10, 0, 1) * clamp((176 - g) / 10, 0, 1);
      setOpacity(gardenRef.current, reducedRef.current ? (g < 200 ? 1 : 0) : gardenIn);
      setOpacity(salaRef.current, zoomRef.current ? 0 : clamp((g - 292) / 18, 0, 1));
      // leyendas del jardín: siguen al objeto fotograma a fotograma
      const frame = Math.round(clamp(g, 0, EXT - 1));
      for (const key of CASA_EXTERIOR) {
        const button = extButtons.current[key];
        if (!button || !lay) continue;
        const track = om.hs[key];
        const [a, b] = CASA_EXTERIOR_WINDOWS[key];
        let opacity = 0;
        let x = 0;
        let y = 0;
        if (track && g < EXT - 1 && !zoomRef.current) {
          const point = track[frame];
          if (point) {
            [x, y] = point;
            const windowFade = reducedRef.current ? 1 : clamp((g - a + 6) / 6, 0, 1) * clamp((b + 6 - g) / 6, 0, 1);
            opacity = point[2] ? windowFade : 0;
          }
        }
        const visible = opacity > 0.25;
        const screenX = lay.ox + x * lay.dw;
        button.classList.toggle("casa-spot--flip", screenX > lay.cw * 0.62);
        button.style.opacity = String(opacity);
        button.style.transform = `translate3d(${lay.ox + x * lay.dw}px, ${lay.oy + y * lay.dh}px, 0)`;
        button.style.pointerEvents = visible ? "auto" : "none";
        button.tabIndex = visible ? 0 : -1;
        button.setAttribute("aria-hidden", visible ? "false" : "true");
      }
      const nextPhase: Phase = g < EXT - 0.5 ? "exterior" : g < LAST - 0.6 ? "entrada" : "hub";
      if (nextPhase !== phaseRef.current) {
        phaseRef.current = nextPhase;
        setPhase(nextPhase);
        if (nextPhase === "hub") {
          // precarga liviana: máscaras y el primer tramo de cada acercamiento
          for (const objeto of CASA_OBJETOS) {
            const mask = new Image();
            mask.src = `${CASA_ASSET_BASE}/${orient}/mask/${objeto}.webp`;
            store.request(`zoom-${objeto}`, { stride: 8 });
          }
        }
      }
    };

    const step = (now: number) => {
      rafRef.current = 0;
      let again = false;
      const zoom = zoomRef.current;
      if (zoom) {
        const p = zoom.dur > 0 ? clamp((now - zoom.start) / zoom.dur, 0, 1) : 1;
        zoom.t = zoom.from + (zoom.to - zoom.from) * easeInOut(p);
        if (p < 1) again = true;
        else finishZoom(zoom);
      } else {
        const diff = targetRef.current - gRef.current;
        if (Math.abs(diff) > 0.015) {
          gRef.current += reducedRef.current ? diff : diff * 0.14;
          again = true;
        } else {
          gRef.current = targetRef.current;
        }
      }
      draw();
      overlay();
      if (again) kick();
    };

    function kick() {
      if (!rafRef.current) rafRef.current = requestAnimationFrame(step);
    }
    kickRef.current = kick;

    // ——— capa viva: luciérnagas, llamas, nube y polvo (corre aunque no haya scroll)
    const liveCanvas = ambientRef.current;
    const liveCtx = liveCanvas?.getContext("2d") ?? null;
    const camExt = om.cam?.exterior;
    const camInt = om.cam?.entrada;
    const layer = manifest.ambient && camExt && camInt ? new AmbientLayer(manifest.ambient) : null;
    let liveRaf = 0;
    let liveFade = 0;
    const liveTick = (now: number) => {
      liveRaf = 0;
      if (!layer || !liveCtx || !liveCanvas || !camExt || !camInt || reducedRef.current || document.hidden) return;
      liveCtx.setTransform(1, 0, 0, 1, 0, 0);
      liveCtx.clearRect(0, 0, liveCanvas.width, liveCanvas.height);
      const lay = layoutRef.current;
      const busy = zoomRef.current !== null || modeRef.current !== "idle";
      liveFade += ((busy ? 0 : 1) - liveFade) * 0.08;
      if (lay && liveFade > 0.01 && stage.getBoundingClientRect().bottom > 0) {
        const g = gRef.current;
        const dpr = dprRef.current;
        const t = now / 1000;
        liveCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
        const aspect = om.w / om.h;
        if (g < EXT) {
          // se apaga al cruzar el umbral de luz
          const fade = 1 - clamp((g - 200) / 22, 0, 1);
          if (fade > 0.01) {
            layer.drawExterior(liveCtx, t, { cam: cameraAt(camExt, g), sensor: camExt.sensor, aspect, layout: lay, alpha: liveFade * fade });
          }
        } else {
          const fade = clamp((g - 262) / 26, 0, 1);
          if (fade > 0.01) {
            layer.drawInterior(liveCtx, t, { cam: cameraAt(camInt, g - EXT), sensor: camInt.sensor, aspect, layout: lay, alpha: liveFade * fade });
          }
        }
      }
      liveRaf = requestAnimationFrame(liveTick);
    };
    const startLive = () => {
      if (!liveRaf && layer && !reducedRef.current && !document.hidden) liveRaf = requestAnimationFrame(liveTick);
    };
    const onVisibility = () => {
      if (!document.hidden) startLive();
    };
    document.addEventListener("visibilitychange", onVisibility);

    resize();
    gRef.current = targetRef.current;
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", resize);
    kick();
    startLive();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
      if (liveRaf) cancelAnimationFrame(liveRaf);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
      store.dispose();
      if (storeRef.current === store) storeRef.current = null;
    };
  }, [manifest, orient, trackTop]);

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
      store.prioritize("entrada", [ENT - 1]);
      // arranca apenas estén todos (o a los 700 ms con los clave: el resto se funde al llegar)
      waitFor(() => store.loaded(seq) >= store.count(seq), 700).then(() => {
        if (modeRef.current !== "in") return;
        const zoom: Zoom = {
          key,
          from: 0,
          to: 1,
          t: 0,
          start: performance.now(),
          dur: reducedRef.current || options.instant ? 0 : 1000,
          done: () => setModeBoth("panel")
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
    [setModeBoth]
  );

  const finishClose = useCallback(() => {
    const zoom = zoomRef.current;
    if (!zoom || modeRef.current !== "panel") return;
    setModeBoth("out");
    const out: Zoom = {
      key: zoom.key,
      from: zoom.t,
      to: 0,
      t: zoom.t,
      start: performance.now(),
      dur: reducedRef.current ? 0 : 760,
      done: () => {
        zoomRef.current = null;
        drawnRef.current = "";
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
    }, out.dur + 900);
  }, [setModeBoth]);

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
    targetRef.current = LAST;
    gRef.current = LAST;
    const store = storeRef.current;
    store?.prioritize(`zoom-${key}`, [store.count(`zoom-${key}`) - 1]);
    store?.prioritize("entrada", [ENT - 1]);
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
    const top = trackTop() + (vhAt(GARDEN, beatsNow) / 100) * window.innerHeight;
    window.scrollTo({ top, behavior: reducedRef.current ? "auto" : "smooth" });
  };

  const playTrack = (trackId?: string) => {
    const track = tracks.find((item) => item.id === trackId);
    if (track) handleToggle(track);
  };

  const legendData = legend ? content.legends[legend.key] : null;
  const maskStyle = (key: CasaObjeto) => {
    const url = `url(${CASA_ASSET_BASE}/${orient}/mask/${key}.webp)`;
    return { WebkitMaskImage: url, maskImage: url };
  };
  const om = manifest?.[orient];
  const hubPoint = (key: CasaObjeto) => {
    const point = om?.hub[key];
    if (!point || !layout) return null;
    return { left: layout.ox + point[0] * layout.dw, top: layout.oy + point[1] * layout.dh };
  };
  const showHub = phase === "hub" && mode === "idle";
  const legendTrack = legendData?.trackId ? tracks.find((item) => item.id === legendData.trackId) : undefined;
  const legendPlaying = Boolean(legendTrack && currentTrack?.id === legendTrack.id && isPlaying);

  return (
    <div className={`casa casa--${orient === "V" ? "vertical" : "horizontal"}${reduced ? " casa--reduced" : ""}`}>
      <a className="casa-skip" href="#casa-indice">
        Saltar el recorrido e ir al índice
      </a>
      <div ref={trackRef} className="casa__track" style={{ height: `${scrollVh + 100}vh` }}>
        <div ref={stageRef} className={`casa__stage casa__stage--${mode}`} data-phase={phase}>
          {/* póster mientras llegan los fotogramas (y respaldo si no cargan) */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className={`casa__poster${painted ? " casa__poster--hidden" : ""}`}
            src={`${CASA_ASSET_BASE}/poster-${orient}.webp`}
            alt=""
            aria-hidden="true"
            fetchPriority="high"
          />
          <canvas ref={canvasRef} className="casa__canvas" aria-hidden="true" />
          <canvas ref={ambientRef} className="casa__canvas casa__ambient" aria-hidden="true" />
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

          {/* leyendas del jardín */}
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
                orient === "H" && layout
                  ? {
                      left: clamp(legend.x < layout.cw / 2 ? legend.x + 34 : legend.x - 34 - 360, 16, layout.cw - 376),
                      top: clamp(legend.y - 120, 90, layout.ch - 380)
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
          {hovered && showHub && layout ? (
            <div
              className="casa-glow"
              aria-hidden="true"
              style={{ left: layout.ox, top: layout.oy, width: layout.dw, height: layout.dh }}
            >
              <div className="casa-glow__halo">
                <div className="casa-glow__mask" style={maskStyle(hovered)} />
              </div>
              <div className="casa-glow__mask casa-glow__mask--tint" style={maskStyle(hovered)} />
            </div>
          ) : null}
          {showHub ? (
            <div className="casa__objects" aria-label="Objetos de la sala">
              {CASA_OBJETOS.map((key) => {
                const point = hubPoint(key);
                if (!point) return null;
                const info = CASA_OBJETO_INFO[key];
                return (
                  <button
                    key={key}
                    type="button"
                    className={`casa-spot casa-spot--object${hovered === key ? " casa-spot--hover" : ""}${
                      layout && point.left > layout.cw * 0.62 ? " casa-spot--flip" : ""
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

          {active && (mode === "panel" || mode === "out") && om ? (
            <CasaPanel
              key={active}
              objeto={active}
              content={content}
              orient={orient}
              layout={layout}
              book={om.book}
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
