// Prepara los fotogramas de la Casa de Lyzi para la web.
//
// Toma los PNG renderizados en Blender (Obra/Dioramas/Casa de Lyzi/render/<secuencia>_<H|V>/)
// y escribe WebP + manifest.json en public/casa-de-lyzi/v1/ (carpeta ignorada por git:
// en producción se sirve desde el repo Caelyndor-Assets, ver src/data/casa.ts).
//
//   node scripts/casa-de-lyzi-frames.mjs [--src <carpeta render>] [--out <carpeta>] [--q 64]
import { readFile, readdir, mkdir, writeFile, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const args = process.argv.slice(2);
const arg = (name, fallback) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : fallback;
};

const SRC = arg("--src", "C:/Users/cbarr/Documents/Proyecto NX_03/Obra/Dioramas/Casa de Lyzi/render");
const OUT = arg("--out", path.resolve("public/casa-de-lyzi/v1"));
const QUALITY = Number(arg("--q", "64"));

const OBJETOS = ["biblioteca", "libro", "vitrola", "cuadros", "mapa", "escritorio", "baul", "rollito", "visitas"];
const RIBBONS = ["rubi", "yuki", "lyzi", "noctalypse", "ensemble"];
const r3 = (n) => Math.round(n * 1000) / 1000;

async function exists(p) {
  try {
    await stat(p);
    return true;
  } catch {
    return false;
  }
}

async function convertSequence(srcDir, outDir) {
  const files = (await readdir(srcDir)).filter((f) => /^\d{4}\.png$/.test(f)).sort();
  await mkdir(outDir, { recursive: true });
  let bytes = 0;
  // en paralelo acotado: sharp ya usa varios hilos por imagen
  const queue = [...files.entries()];
  const workers = Array.from({ length: 4 }, async () => {
    while (queue.length) {
      const [i, f] = queue.shift();
      const target = path.join(outDir, `${String(i).padStart(3, "0")}.webp`);
      const info = await sharp(path.join(srcDir, f)).webp({ quality: QUALITY, effort: 5, smartSubsample: true }).toFile(target);
      bytes += info.size;
    }
  });
  await Promise.all(workers);
  return { frames: files.length, bytes };
}

async function readData(dir) {
  return JSON.parse(await readFile(path.join(dir, "data.json"), "utf8"));
}

const manifest = { v: 1 };
let total = 0;

for (const orient of ["H", "V"]) {
  const o = { seq: {}, hs: {}, hub: {}, book: null };
  const size = orient === "H" ? [1600, 900] : [900, 1600];
  o.w = size[0];
  o.h = size[1];

  const seqs = [
    ["exterior", `exterior_${orient}`],
    ["entrada", `entrada_${orient}`],
    ...OBJETOS.map((k) => [`zoom-${k}`, `zoom_${k}_${orient}`])
  ];
  for (const [key, dirName] of seqs) {
    const dir = path.join(SRC, dirName);
    if (!(await exists(path.join(dir, "0001.png")))) {
      console.warn(`· falta ${dirName}, se omite`);
      continue;
    }
    const { frames, bytes } = await convertSequence(dir, path.join(OUT, orient, key));
    o.seq[key] = frames;
    total += bytes;
    console.log(`${orient} ${key}: ${frames} fotogramas, ${(bytes / 1024 / 1024).toFixed(2)} MB`);
  }

  // pistas de hotspots del exterior (por fotograma): [x, y, 1 si visible y no tapado]
  const extDir = path.join(SRC, `exterior_${orient}`);
  if (await exists(path.join(extDir, "data.json"))) {
    const data = await readData(extDir);
    for (const [name, track] of Object.entries(data.anchors)) {
      if (!name.startsWith("HS_")) continue;
      o.hs[name.slice(3)] = track.map(([x, y, inside, occluded]) => [r3(x), r3(y), inside && !occluded ? 1 : 0]);
    }
  }

  // posición de cada objeto en la vista final de la sala + máscaras de hover
  const hubDir = path.join(SRC, `entrada_${orient}`);
  if (await exists(path.join(hubDir, "data.json"))) {
    const data = await readData(hubDir);
    for (const [name, track] of Object.entries(data.anchors)) {
      if (!name.startsWith("HS_")) continue;
      const [x, y] = track[track.length - 1];
      o.hub[name.slice(3)] = [r3(x), r3(y)];
    }
    await mkdir(path.join(OUT, orient, "mask"), { recursive: true });
    for (const k of OBJETOS) {
      const m = path.join(hubDir, `mask_${k}.png`);
      if (!(await exists(m))) continue;
      const info = await sharp(m).webp({ quality: 40, alphaQuality: 85, effort: 5 }).toFile(path.join(OUT, orient, "mask", `${k}.webp`));
      total += info.size;
    }
  }

  // páginas y cintas del libro en el último fotograma del acercamiento
  const bookDir = path.join(SRC, `zoom_libro_${orient}`);
  if (await exists(path.join(bookDir, "data.json"))) {
    const data = await readData(bookDir);
    const last = (name) => {
      const t = data.anchors[name];
      return t ? [r3(t[t.length - 1][0]), r3(t[t.length - 1][1])] : null;
    };
    o.book = {
      L: [0, 1, 2, 3].map((i) => last(`PG_L_${i}`)),
      R: [0, 1, 2, 3].map((i) => last(`PG_R_${i}`)),
      ribbons: Object.fromEntries(RIBBONS.map((k) => [k, last(`RB_${k}`)]))
    };
  }
  manifest[orient] = o;
}

// póster liviano del primer fotograma (LCP) para cada orientación
for (const orient of ["H", "V"]) {
  const first = path.join(SRC, `exterior_${orient}`, "0001.png");
  if (await exists(first)) {
    await sharp(first).webp({ quality: 78 }).toFile(path.join(OUT, `poster-${orient}.webp`));
  }
}

await writeFile(path.join(OUT, "manifest.json"), JSON.stringify(manifest));
console.log(`Total: ${(total / 1024 / 1024).toFixed(1)} MB → ${OUT}`);
