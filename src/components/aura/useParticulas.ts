"use client";

import { useCallback, useEffect, useMemo, useRef, type RefObject } from "react";

/**
 * Motor mínimo de partículas sobre <canvas> para el Ritual y el despertar
 * del don: motas de ambiente, estallidos y estelas que viajan a un punto.
 * Coordenadas relativas al propio canvas. Con "reducir movimiento" no se
 * emite nada (la escena sigue funcionando sin partículas).
 */

type Particula = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  vida: number;
  max: number;
  r: number;
  color: string;
  gravedad: number;
  ambiente: boolean;
  /** Destino de una estela (si existe, la partícula vuela hacia él). */
  tx?: number;
  ty?: number;
  fuerza?: number;
};

const TAU = Math.PI * 2;
const MOTAS = 46;

function mota(ancho: number, alto: number, color: string, repartida: boolean): Particula {
  return {
    x: Math.random() * ancho,
    y: repartida ? Math.random() * alto : alto + 8,
    vx: (Math.random() - 0.5) * 10,
    vy: -(8 + Math.random() * 16),
    vida: repartida ? Math.random() * 6 : 0,
    max: 7 + Math.random() * 8,
    r: 0.5 + Math.random() * 1.2,
    color,
    gravedad: 0,
    ambiente: true
  };
}

export type ParticulasApi = {
  estallido: (x: number, y: number, color: string, cantidad?: number, velocidad?: number) => void;
  estela: (x0: number, y0: number, x1: number, y1: number, color: string, cantidad?: number) => void;
  /** Lluvia suave desde arriba (despertar legendario). */
  lluvia: (color: string, cantidad?: number) => void;
};

export function useParticulas(
  canvasRef: RefObject<HTMLCanvasElement | null>,
  colorAmbiente = "#cfe6ff"
): ParticulasApi {
  const lista = useRef<Particula[]>([]);
  const reducido = useRef(false);
  const medidas = useRef({ ancho: 0, alto: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) {
      return;
    }
    reducido.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function ajustar() {
      const rect = canvas!.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      medidas.current = { ancho: rect.width, alto: rect.height };
      canvas!.width = Math.round(rect.width * dpr);
      canvas!.height = Math.round(rect.height * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    ajustar();
    const observer = new ResizeObserver(ajustar);
    observer.observe(canvas);

    if (!reducido.current) {
      for (let i = 0; i < MOTAS; i += 1) {
        lista.current.push(mota(medidas.current.ancho, medidas.current.alto, colorAmbiente, true));
      }
    }

    let frame = 0;
    let ultimo = performance.now();

    function tick(ahora: number) {
      const dt = Math.min(0.05, (ahora - ultimo) / 1000);
      ultimo = ahora;
      const { ancho, alto } = medidas.current;
      ctx!.clearRect(0, 0, ancho, alto);
      ctx!.globalCompositeOperation = "lighter";

      const particulas = lista.current;
      for (let i = particulas.length - 1; i >= 0; i -= 1) {
        const p = particulas[i];
        p.vida += dt;
        if (p.vida < 0) {
          // Estela escalonada: esta partícula aún no sale.
          continue;
        }

        if (p.ambiente) {
          if (p.vida > p.max || p.y < -8) {
            particulas[i] = mota(ancho, alto, colorAmbiente, false);
            continue;
          }
        } else if (p.vida > p.max) {
          particulas.splice(i, 1);
          continue;
        }

        if (p.tx !== undefined && p.ty !== undefined) {
          const dx = p.tx - p.x;
          const dy = p.ty - p.y;
          const distancia = Math.hypot(dx, dy);
          if (distancia < 10) {
            particulas.splice(i, 1);
            continue;
          }
          const fuerza = p.fuerza ?? 1600;
          p.vx += (dx / distancia) * fuerza * dt;
          p.vy += (dy / distancia) * fuerza * dt;
          const freno = Math.pow(0.08, dt);
          p.vx *= freno;
          p.vy *= freno;
        } else if (!p.ambiente) {
          const freno = Math.pow(0.2, dt);
          p.vx *= freno;
          p.vy = p.vy * freno + p.gravedad * dt;
        }

        p.x += p.vx * dt;
        p.y += p.vy * dt;

        const t = p.vida / p.max;
        const alpha = p.ambiente ? Math.sin(Math.PI * t) * 0.55 : 1 - t * t;
        ctx!.fillStyle = p.color;
        ctx!.globalAlpha = alpha * 0.22;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r * 3.2, 0, TAU);
        ctx!.fill();
        ctx!.globalAlpha = alpha;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, TAU);
        ctx!.fill();
      }

      ctx!.globalAlpha = 1;
      frame = window.requestAnimationFrame(tick);
    }
    frame = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      lista.current = [];
    };
  }, [canvasRef, colorAmbiente]);

  const estallido = useCallback<ParticulasApi["estallido"]>((x, y, color, cantidad = 60, velocidad = 340) => {
    if (reducido.current) {
      return;
    }
    for (let i = 0; i < cantidad; i += 1) {
      const angulo = Math.random() * TAU;
      const v = velocidad * (0.2 + Math.random() * 0.95);
      lista.current.push({
        x,
        y,
        vx: Math.cos(angulo) * v,
        vy: Math.sin(angulo) * v,
        vida: 0,
        max: 0.8 + Math.random() * 1.4,
        r: 0.8 + Math.random() * 2.2,
        color,
        gravedad: 40,
        ambiente: false
      });
    }
  }, []);

  const estela = useCallback<ParticulasApi["estela"]>((x0, y0, x1, y1, color, cantidad = 26) => {
    if (reducido.current) {
      return;
    }
    for (let i = 0; i < cantidad; i += 1) {
      const angulo = Math.random() * TAU;
      const v = 90 + Math.random() * 220;
      lista.current.push({
        x: x0 + (Math.random() - 0.5) * 60,
        y: y0 + (Math.random() - 0.5) * 16,
        vx: Math.cos(angulo) * v,
        vy: Math.sin(angulo) * v,
        vida: -i * 0.012,
        max: 2.6,
        r: 0.8 + Math.random() * 1.8,
        color,
        gravedad: 0,
        ambiente: false,
        tx: x1,
        ty: y1,
        fuerza: 1500 + Math.random() * 900
      });
    }
  }, []);

  const lluvia = useCallback<ParticulasApi["lluvia"]>((color, cantidad = 90) => {
    if (reducido.current) {
      return;
    }
    const { ancho } = medidas.current;
    for (let i = 0; i < cantidad; i += 1) {
      lista.current.push({
        x: Math.random() * ancho,
        y: -10 - Math.random() * 120,
        vx: (Math.random() - 0.5) * 30,
        vy: 60 + Math.random() * 120,
        vida: 0,
        max: 2.5 + Math.random() * 2,
        r: 0.8 + Math.random() * 1.6,
        color,
        gravedad: 60,
        ambiente: false
      });
    }
  }, []);

  // Objeto estable entre renders: quien lo use en dependencias de efectos
  // no debe ver un valor nuevo en cada render.
  return useMemo(() => ({ estallido, estela, lluvia }), [estallido, estela, lluvia]);
}
