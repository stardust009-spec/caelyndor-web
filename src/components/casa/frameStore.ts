/** [x, y] normalizados desde arriba-izquierda de la escena. */
export type Point = [number, number];

/** Escena de descanso: lámina fija, bucle vivo y encuadre en pantallas verticales. */
export type CasaRest = {
  id: string;
  plate: string;
  loop: string;
  /** centro horizontal del encuadre vertical al llegar y al irse (el scroll barre la escena) */
  pan: [number, number];
};

export type CasaBook = {
  /** esquinas de cada página del libro abierto */
  L: Point[];
  R: Point[];
  /** dónde se posa el botón de cada cinta */
  ribbons: Record<string, Point>;
};

export type CasaManifest = {
  v: number;
  w: number;
  h: number;
  /** fotogramas por secuencia: t1…t4 (tramos de scroll) y zoom-<objeto> */
  seq: Record<string, number>;
  rests: CasaRest[];
  /** leyendas del exterior: en qué escena de descanso y en qué punto */
  spots: Record<string, { rest: number; p: Point }>;
  hub: Record<string, Point>;
  closeups: Record<string, { plate: string; loop: string }>;
  book: CasaBook | null;
};

type Job = { seq: string; index: number };

/**
 * Carga secuencias de fotogramas WebP con concurrencia acotada y en orden grueso→fino
 * (cada 16, luego cada 8, 4, 2, 1): así el recorrido se puede dibujar casi de inmediato
 * y va ganando fluidez mientras llegan los fotogramas intermedios.
 */
export class FrameStore {
  private images = new Map<string, (HTMLImageElement | undefined)[]>();
  private ready = new Map<string, Uint8Array>();
  private requested = new Set<string>();
  private pending: Job[] = [];
  private active = 0;
  private disposed = false;
  onFrame: ((seq: string, index: number) => void) | null = null;

  constructor(
    private readonly base: string,
    private readonly counts: Record<string, number>,
    private readonly concurrency = 6
  ) {}

  count(seq: string) {
    return this.counts[seq] ?? 0;
  }

  url(seq: string, index: number) {
    return `${this.base}/H/${seq}/${String(index).padStart(3, "0")}.webp`;
  }

  request(seq: string, options: { stride?: number; priority?: boolean } = {}) {
    const { stride = 1, priority = false } = options;
    const total = this.count(seq);
    if (!total) return;
    const order: number[] = [];
    const seen = new Set<number>();
    for (const step of [16, 8, 4, 2, 1]) {
      if (step < stride) break;
      for (let index = 0; index < total; index += step) {
        if (!seen.has(index)) {
          seen.add(index);
          order.push(index);
        }
      }
    }
    if (!seen.has(total - 1)) order.push(total - 1);
    const jobs = order
      .filter((index) => !this.requested.has(`${seq}:${index}`))
      .map((index) => ({ seq, index }));
    for (const job of jobs) this.requested.add(`${job.seq}:${job.index}`);
    if (priority) this.pending.unshift(...jobs);
    else this.pending.push(...jobs);
    this.pump();
  }

  /** Adelanta fotogramas (encolados o no) al frente de la cola: para abrir un objeto o un
   *  enlace directo sin esperar a que termine de bajar el recorrido completo. */
  prioritize(seq: string, indices?: number[]) {
    const total = this.count(seq);
    if (!total) return;
    const wanted = indices ?? Array.from({ length: total }, (_, index) => index);
    const front: Job[] = [];
    for (const index of wanted) {
      if (index < 0 || index >= total || this.isReady(seq, index)) continue;
      const at = this.pending.findIndex((job) => job.seq === seq && job.index === index);
      if (at >= 0) {
        front.push(...this.pending.splice(at, 1));
      } else if (!this.requested.has(`${seq}:${index}`)) {
        this.requested.add(`${seq}:${index}`);
        front.push({ seq, index });
      }
    }
    this.pending.unshift(...front);
    this.pump();
  }

  private pump() {
    while (!this.disposed && this.active < this.concurrency && this.pending.length) {
      const job = this.pending.shift()!;
      this.active += 1;
      this.load(job).finally(() => {
        this.active -= 1;
        this.pump();
      });
    }
  }

  private async load({ seq, index }: Job) {
    const image = new Image();
    image.decoding = "async";
    image.src = this.url(seq, index);
    try {
      await image.decode();
    } catch {
      return;
    }
    if (this.disposed) return;
    const total = this.count(seq);
    let list = this.images.get(seq);
    if (!list) {
      list = new Array(total);
      this.images.set(seq, list);
    }
    list[index] = image;
    let flags = this.ready.get(seq);
    if (!flags) {
      flags = new Uint8Array(total);
      this.ready.set(seq, flags);
    }
    flags[index] = 1;
    this.onFrame?.(seq, index);
  }

  get(seq: string, index: number) {
    return this.images.get(seq)?.[index];
  }

  isReady(seq: string, index: number) {
    return Boolean(this.ready.get(seq)?.[index]);
  }

  /** Índice del fotograma ya cargado más cercano a `index` (o -1 si aún no hay ninguno). */
  nearest(seq: string, index: number) {
    const flags = this.ready.get(seq);
    if (!flags) return -1;
    const total = flags.length;
    const start = Math.max(0, Math.min(total - 1, index));
    for (let distance = 0; distance < total; distance += 1) {
      if (start - distance >= 0 && flags[start - distance]) return start - distance;
      if (start + distance < total && flags[start + distance]) return start + distance;
    }
    return -1;
  }

  loaded(seq: string) {
    const flags = this.ready.get(seq);
    if (!flags) return 0;
    let count = 0;
    for (const flag of flags) count += flag;
    return count;
  }

  dispose() {
    this.disposed = true;
    this.pending = [];
    this.onFrame = null;
  }
}
