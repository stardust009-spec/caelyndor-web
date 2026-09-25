import type { AmbientLight, AmbientWorld, CamFrame, CamTrack, Vec3 } from "@/components/casa/frameStore";

/**
 * Capa "viva" de la casa: luciérnagas que derivan y se encienden/apagan, llamas que titilan,
 * brillos que respiran, una nube que cruza la luna y polvo flotando en la sala.
 * Se dibuja en vivo sobre los fotogramas pre-renderizados, proyectando posiciones 3D con la
 * misma cámara de Blender de cada fotograma (exportada en el manifiesto).
 */

type Layout = { ox: number; oy: number; dw: number; dh: number };

export type AmbientView = {
  cam: CamFrame;
  sensor: number;
  /** ancho/alto del fotograma renderizado */
  aspect: number;
  layout: Layout;
  alpha: number;
};

type Projected = { x: number; y: number; depth: number; ppm: number };

function rotateByInverse(v: Vec3, cam: CamFrame): Vec3 {
  // q^-1 · v · q  (cámara → mundo invertido), con q = (w, x, y, z) de la cámara
  const w = cam[3];
  const x = -cam[4];
  const y = -cam[5];
  const z = -cam[6];
  const [vx, vy, vz] = v;
  const ix = w * vx + y * vz - z * vy;
  const iy = w * vy + z * vx - x * vz;
  const iz = w * vz + x * vy - y * vx;
  const iw = -x * vx - y * vy - z * vz;
  return [ix * w + iw * -x + iy * -z - iz * -y, iy * w + iw * -y + iz * -x - ix * -z, iz * w + iw * -z + ix * -y - iy * -x];
}

/** Proyecta un punto del mundo a píxeles CSS del escenario (misma convención que Blender). */
export function project(view: AmbientView, p: Vec3): Projected | null {
  const cam = view.cam;
  const v = rotateByInverse([p[0] - cam[0], p[1] - cam[1], p[2] - cam[2]], cam);
  const depth = -v[2];
  if (depth <= 0.05) return null;
  const half = view.sensor / 2 / cam[7];
  const tx = view.aspect >= 1 ? half : half * view.aspect;
  const ty = view.aspect >= 1 ? half / view.aspect : half;
  const nx = v[0] / depth / tx;
  const ny = v[1] / depth / ty;
  const { ox, oy, dw, dh } = view.layout;
  return { x: ox + ((nx + 1) / 2) * dw, y: oy + ((1 - ny) / 2) * dh, depth, ppm: dw / (2 * tx * depth) };
}

/** Cámara interpolada entre fotogramas (posición y lente lineales, rotación nlerp). */
export function cameraAt(track: CamTrack, position: number): CamFrame {
  const frames = track.frames;
  const last = frames.length - 1;
  const i = Math.max(0, Math.min(last, Math.floor(position)));
  const j = Math.min(last, i + 1);
  const f = Math.max(0, Math.min(1, position - i));
  const a = frames[i];
  const b = frames[j];
  const dot = a[3] * b[3] + a[4] * b[4] + a[5] * b[5] + a[6] * b[6];
  const s = dot < 0 ? -1 : 1;
  const q = [3, 4, 5, 6].map((k) => a[k] + (b[k] * s - a[k]) * f);
  const len = Math.hypot(q[0], q[1], q[2], q[3]) || 1;
  return [
    a[0] + (b[0] - a[0]) * f,
    a[1] + (b[1] - a[1]) * f,
    a[2] + (b[2] - a[2]) * f,
    q[0] / len,
    q[1] / len,
    q[2] / len,
    q[3] / len,
    a[7] + (b[7] - a[7]) * f
  ];
}

// ——— utilidades

function mulberry(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const smooth = (edge0: number, edge1: number, x: number) => {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
};

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}

// ——— partículas

type Firefly = { p: Vec3; gold: boolean; amp: Vec3; speed: Vec3; phase: Vec3; period: number; on: number; offset: number };
type Mote = { p: Vec3; speed: number; phase: number; size: number; tw: number };
type Twinkle = { p: Vec3; period: number; phase: number };

export class AmbientLayer {
  private sprites = new Map<string, HTMLCanvasElement>();
  private fireflies: Firefly[] = [];
  private motes: Mote[] = [];
  private fairy: Twinkle[] = [];
  private cloud: HTMLCanvasElement | null = null;

  constructor(private readonly world: AmbientWorld) {
    const rand = mulberry(20260924);
    for (const [x, y, z, gold] of world.exterior.fireflies) {
      this.fireflies.push({
        p: [x, y, z],
        gold: gold === 1,
        amp: [0.25 + rand() * 0.4, 0.25 + rand() * 0.4, 0.12 + rand() * 0.25],
        speed: [0.1 + rand() * 0.22, 0.08 + rand() * 0.2, 0.14 + rand() * 0.25],
        phase: [rand() * 6.28, rand() * 6.28, rand() * 6.28],
        period: 3 + rand() * 4.5,
        on: 0.35 + rand() * 0.35,
        offset: rand()
      });
    }
    const dust = world.interior.dust;
    if (dust) {
      for (let i = 0; i < 90; i += 1) {
        this.motes.push({
          p: [
            dust.min[0] + rand() * (dust.max[0] - dust.min[0]),
            dust.min[1] + rand() * (dust.max[1] - dust.min[1]),
            0.4 + rand() * (dust.max[2] - 0.6)
          ],
          speed: 0.02 + rand() * 0.05,
          phase: rand() * 6.28,
          size: 0.012 + rand() * 0.012,
          tw: 1.5 + rand() * 3
        });
      }
    }
    for (const [x, y, z] of world.interior.fairy) {
      this.fairy.push({ p: [x, y, z], period: 1.4 + rand() * 2.6, phase: rand() * 6.28 });
    }
  }

  /** Brillo radial precalculado por color (dibujar sprites es mucho más barato que gradientes). */
  private sprite(color: string, hot = false) {
    const key = `${color}:${hot ? 1 : 0}`;
    const cached = this.sprites.get(key);
    if (cached) return cached;
    const size = 64;
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    const [r, g, b] = hexToRgb(color);
    const grad = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    if (hot) {
      grad.addColorStop(0, "rgba(255,255,245,1)");
      grad.addColorStop(0.12, `rgba(${r},${g},${b},1)`);
      grad.addColorStop(0.35, `rgba(${r},${g},${b},0.35)`);
    } else {
      grad.addColorStop(0, `rgba(${r},${g},${b},0.9)`);
      grad.addColorStop(0.35, `rgba(${r},${g},${b},0.4)`);
    }
    grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);
    this.sprites.set(key, canvas);
    return canvas;
  }

  private glow(ctx: CanvasRenderingContext2D, pr: Projected, radiusM: number, alpha: number, color: string, hot = false, max = 220) {
    const r = Math.min(max, Math.max(1.2, radiusM * pr.ppm));
    if (alpha <= 0.003) return;
    ctx.globalAlpha = Math.min(1, alpha);
    ctx.drawImage(this.sprite(color, hot), pr.x - r, pr.y - r, r * 2, r * 2);
  }

  private flicker(t: number, seed: number) {
    const n = 0.55 * Math.sin(t * 9.3 + seed) + 0.3 * Math.sin(t * 17.1 + seed * 2.3) + 0.15 * Math.sin(t * 31.7 + seed * 0.7);
    const dip = Math.sin(t * 0.9 + seed * 3.1) > 0.93 ? 0.35 : 0;
    return Math.max(0.25, 0.84 + 0.16 * n - dip);
  }

  private lights(ctx: CanvasRenderingContext2D, view: AmbientView, lights: AmbientLight[], t: number, interior: boolean) {
    lights.forEach((light, index) => {
      const pr = project(view, light.p);
      if (!pr) return;
      const seed = index * 1.7 + light.p[0];
      if (light.kind === "flame") {
        const big = !interior && light.color.toLowerCase() === "#d8a8ff";
        const k = this.flicker(t, seed);
        this.glow(ctx, pr, big ? 0.7 : interior ? 0.38 : 0.45, (interior ? 0.5 : 0.42) * k * view.alpha, light.color, true);
      } else if (light.kind === "window") {
        const k = 0.85 + 0.15 * Math.sin(t * 2.1 + seed) * Math.sin(t * 4.7 + seed * 0.5);
        this.glow(ctx, pr, 1.05, 0.2 * k * view.alpha, light.color);
      } else {
        const k = 0.72 + 0.28 * (0.5 + 0.5 * Math.sin((t / 4.5) * 6.283 + seed));
        this.glow(ctx, pr, interior ? 0.18 : 0.42, (interior ? 0.36 : 0.24) * k * view.alpha, light.color);
      }
    });
  }

  drawExterior(ctx: CanvasRenderingContext2D, t: number, view: AmbientView) {
    ctx.globalCompositeOperation = "source-over";
    this.drawCloud(ctx, t, view);
    ctx.globalCompositeOperation = "lighter";
    this.lights(ctx, view, this.world.exterior.lights, t, false);
    for (const fly of this.fireflies) {
      const p: Vec3 = [
        fly.p[0] + fly.amp[0] * Math.sin(t * fly.speed[0] + fly.phase[0]),
        fly.p[1] + fly.amp[1] * Math.sin(t * fly.speed[1] + fly.phase[1]),
        fly.p[2] + fly.amp[2] * Math.sin(t * fly.speed[2] + fly.phase[2])
      ];
      const pr = project(view, p);
      if (!pr) continue;
      // parpadeo: cada luciérnaga tiene su propio ciclo de encendido
      const c = (t / fly.period + fly.offset) % 1;
      const lit = smooth(0, 0.08, c) * (1 - smooth(fly.on - 0.08, fly.on, c));
      const near = smooth(0.35, 1.2, pr.depth);
      this.glow(ctx, pr, 0.07, lit * near * 0.95 * view.alpha, fly.gold ? "#ffd98a" : "#e3f58a", true, 30);
    }
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = "source-over";
  }

  drawInterior(ctx: CanvasRenderingContext2D, t: number, view: AmbientView) {
    ctx.globalCompositeOperation = "lighter";
    this.lights(ctx, view, this.world.interior.lights, t, true);
    for (const light of this.fairy) {
      const pr = project(view, light.p);
      if (!pr) continue;
      const k = 0.55 + 0.45 * (0.5 + 0.5 * Math.sin((t / light.period) * 6.283 + light.phase));
      this.glow(ctx, pr, 0.08, 0.75 * k * view.alpha, "#ffd68f", true, 20);
    }
    for (const mote of this.motes) {
      const rise = (t * mote.speed + mote.phase) % 1.6;
      const p: Vec3 = [
        mote.p[0] + 0.12 * Math.sin(t * 0.2 + mote.phase),
        mote.p[1] + 0.12 * Math.cos(t * 0.17 + mote.phase),
        mote.p[2] + rise * 0.5 - 0.4
      ];
      const pr = project(view, p);
      if (!pr) continue;
      const k = 0.4 + 0.6 * (0.5 + 0.5 * Math.sin((t / mote.tw) * 6.283 + mote.phase));
      this.glow(ctx, pr, mote.size, 0.55 * k * view.alpha, "#fff1d6", false, 6);
    }
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = "source-over";
  }

  /** Nube suave que cruza la luna cada ~50 s (sólo cuando la luna está en cuadro). */
  private drawCloud(ctx: CanvasRenderingContext2D, t: number, view: AmbientView) {
    const moon = this.world.exterior.moon;
    if (!moon) return;
    const center = project(view, moon.p);
    if (!center) return;
    const { ox, oy, dw, dh } = view.layout;
    const margin = 0.35;
    if (center.x < ox - dw * margin || center.x > ox + dw * (1 + margin) || center.y < oy - dh * margin || center.y > oy + dh * (1 + margin)) {
      return;
    }
    if (!this.cloud) this.cloud = makeCloud();
    const cycle = 50;
    const u = (t % cycle) / cycle; // 0..1
    const drift = -4.2 + u * 8.4; // en radios de luna, de izquierda a derecha
    const p = project(view, [moon.p[0] + drift * moon.r * 1.2, moon.p[1], moon.p[2] + moon.r * 0.15]);
    if (!p) return;
    const w = moon.r * 5.2 * p.ppm;
    const h = w * 0.42;
    const fade = smooth(0, 0.1, u) * (1 - smooth(0.9, 1, u));
    ctx.globalAlpha = 0.92 * fade * view.alpha;
    ctx.drawImage(this.cloud, p.x - w / 2, p.y - h / 2, w, h);
    ctx.globalAlpha = 1;
  }
}

/** Nube procedural: óvalos difusos violeta-grises con borde iluminado por la luna. */
function makeCloud() {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 216;
  const ctx = canvas.getContext("2d")!;
  const rand = mulberry(77);
  for (let i = 0; i < 26; i += 1) {
    const x = 70 + rand() * 372;
    const y = 80 + rand() * 70 - Math.abs(x - 256) * 0.08;
    const r = 34 + rand() * 58;
    const grad = ctx.createRadialGradient(x, y - r * 0.25, 0, x, y, r);
    grad.addColorStop(0, "rgba(78, 84, 118, 0.72)");
    grad.addColorStop(0.55, "rgba(30, 32, 58, 0.62)");
    grad.addColorStop(1, "rgba(16, 18, 36, 0)");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }
  return canvas;
}
