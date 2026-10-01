// Prepara la Casa de Lyzi v2 (escenas pintadas + video IA) para la web.
//
// Toma las escenas de Astra (Propuesta_02) y los videos de Higgsfield/Kling
// (Obra/Dioramas/Casa de Lyzi/video/raw) y escribe en public/casa-de-lyzi/v2/:
//   H/t1…t4/NNN.webp      tramos de scroll (el vuelo de cámara entre escenas)
//   H/zoom-<objeto>/NNN.webp  acercamientos de la sala a cada objeto
//   loops/<id>.mp4        escenas vivas (bucle sin salto: la cola se funde con la cabeza)
//   plates/<id>.webp      escenas fijas (respaldo, movimiento reducido y fondos de objetos)
//   manifest.json
// La carpeta no se versiona: en producción vive en Caelyndor-Assets (ver src/data/casa.ts).
//
//   node scripts/casa-de-lyzi-video.mjs [--only loops|frames|plates] [--out <carpeta>]
import { spawnSync } from "node:child_process";
import { mkdir, readdir, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";

const args = process.argv.slice(2);
const arg = (name, fallback) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : fallback;
};

const RAW = arg("--raw", "C:/Users/cbarr/Documents/Proyecto NX_03/Obra/Dioramas/Casa de Lyzi/video/raw");
const PLATES = arg(
  "--plates",
  "C:/Users/cbarr/Documents/Codex/2026-09-24/c-users-cbarr-documents-proyecto-nx/outputs/Propuesta_02"
);
const OUT = arg("--out", path.resolve("public/casa-de-lyzi/v2"));
const ONLY = arg("--only", "all");

const W = 1600;
const H = 900;

/** Tramos de scroll: se toma 1 de cada `step` fotogramas (la web funde los intermedios). */
const TRANSITIONS = [
  { key: "t1", file: "T1_lejos-arco_a.mp4", step: 2 },
  { key: "t2", file: "T2_arco-jardin_a.mp4", step: 2 },
  { key: "t3", file: "T3_jardin-puerta_a.mp4", step: 2 },
  { key: "t4", file: "T4_puerta-sala_a.mp4", step: 2 }
];

/** Escenas de descanso del recorrido, en orden. `pan`: centro horizontal del encuadre en
 *  pantallas verticales al entrar y al salir del descanso (el scroll barre la escena). */
const RESTS = [
  { id: "lejos", plate: "01_lejos.png", loop: "L1_lejos_b.mp4", pan: [0.5, 0.5], fade: 60 },
  { id: "arco", plate: "02_arco.png", loop: "L2_arco_b.mp4", pan: [0.52, 0.66] },
  { id: "jardin", plate: "03_jardin.png", loop: "L3_jardin_ardilla_b.mp4", pan: [0.36, 0.68] },
  { id: "puerta", plate: "04_puerta.png", loop: "L4_puerta_b.mp4", pan: [0.42, 0.42] },
  { id: "sala", plate: "05_sala.png", loop: "L5_sala_b.mp4", pan: [0.5, 0.5] }
];

/** Primeros planos de la sala: escena fija, bucle vivo y acercamiento desde la sala. */
const CLOSEUPS = {
  biblioteca: { plate: "06_biblioteca.png", loop: "C_biblioteca_a.mp4", zoom: "Z_biblioteca_a.mp4" },
  libro: { plate: "07_libro.png", loop: "C_libro_a.mp4", zoom: "Z_libro_a.mp4" },
  vitrola: { plate: "08_vitrola.png", loop: "C_vitrola_a.mp4", zoom: "Z_vitrola_a.mp4" },
  cuadros: { plate: "09_retratos.png", loop: "C_retratos_a.mp4", zoom: "Z_retratos_a.mp4" },
  // el tapiz lleva el mapa canon de Sylvalis (el autor, 2026-09-30) montado sobre la lámina y los
  // videos de Astra/Kling: Obra/Dioramas/Casa de Lyzi/canon/ (lámina) y *_mapa_canon.mp4 (videos)
  mapa: { plate: "C:/Users/cbarr/Documents/Proyecto NX_03/Obra/Dioramas/Casa de Lyzi/canon/10_mapa_canon.png", loop: "C_mapa_canon.mp4", zoom: "Z_mapa_canon.mp4" },
  escritorio: { plate: "11_escritorio.png", loop: "C_escritorio_a.mp4", zoom: "Z_escritorio_a.mp4" },
  baul: { plate: "12_baul.png", loop: "C_baul_a.mp4", zoom: "Z_baul_a.mp4" },
  rollito: { plate: "13_rollito.png", loop: "C_rollito_a.mp4", zoom: "Z_rollito_a.mp4" },
  visitas: { plate: "14_visitas.png", loop: "C_visitas_a.mp4", zoom: "Z_visitas_a.mp4" }
};

/** Puntos clickeables, normalizados sobre cada escena (medidos en las láminas de Astra). */
const SPOTS = {
  farol: { rest: 1, p: [0.697, 0.611] },
  lirios: { rest: 2, p: [0.706, 0.871] },
  tronco: { rest: 2, p: [0.353, 0.808] },
  ventana: { rest: 2, p: [0.332, 0.34] },
  macetero: { rest: 2, p: [0.613, 0.574] },
  puerta: { rest: 3, p: [0.463, 0.472] }
};
const HUB = {
  mapa: [0.164, 0.287],
  biblioteca: [0.323, 0.383],
  baul: [0.212, 0.595],
  cuadros: [0.541, 0.202],
  rollito: [0.461, 0.409],
  libro: [0.526, 0.574],
  escritorio: [0.67, 0.5],
  vitrola: [0.804, 0.5],
  visitas: [0.598, 0.808]
};
/** Libro abierto (07): esquinas de cada página y el punto donde se posa cada cinta. */
const BOOK = {
  L: [
    [0.227, 0.021],
    [0.487, 0.021],
    [0.487, 0.622],
    [0.227, 0.622]
  ],
  R: [
    [0.493, 0.021],
    [0.76, 0.021],
    [0.76, 0.627],
    [0.493, 0.627]
  ],
  ribbons: {
    rubi: [0.416, 0.808],
    yuki: [0.453, 0.808],
    lyzi: [0.489, 0.808],
    noctalypse: [0.527, 0.808],
    ensemble: [0.562, 0.808]
  }
};

function run(cmd, list) {
  const r = spawnSync(cmd, list, { encoding: "utf8", maxBuffer: 1 << 26 });
  if (r.status !== 0) throw new Error(`${cmd} ${list.join(" ")}\n${r.stderr}`);
  return r.stdout;
}

const frameCount = (file) =>
  Number(
    run("ffprobe", ["-v", "error", "-select_streams", "v:0", "-count_frames", "-show_entries", "stream=nb_read_frames", "-of", "csv=p=0", file]).trim()
  );

async function exists(p) {
  try {
    await stat(p);
    return true;
  } catch {
    return false;
  }
}

async function dirBytes(dir) {
  let bytes = 0;
  for (const f of await readdir(dir)) bytes += (await stat(path.join(dir, f))).size;
  return bytes;
}

/** Extrae 1 de cada `step` fotogramas (siempre incluye el último) como WebP. */
async function extractFrames(src, outDir, { step, width, height, quality }) {
  await rm(outDir, { recursive: true, force: true });
  await mkdir(outDir, { recursive: true });
  const n = frameCount(src);
  const last = n - 1;
  const select = `not(mod(n\\,${step}))+eq(n\\,${last})`;
  run("ffmpeg", [
    "-loglevel", "error", "-i", src,
    "-vf", `select='${select}',scale=${width}:${height}:flags=lanczos`,
    "-fps_mode", "passthrough",
    "-c:v", "libwebp", "-quality", String(quality), "-compression_level", "5",
    "-start_number", "0", path.join(outDir, "%03d.webp")
  ]);
  const frames = (await readdir(outDir)).filter((f) => f.endsWith(".webp")).length;
  return { frames, bytes: await dirBytes(outDir) };
}

/** Bucle sin salto: descarta los primeros fotogramas (idénticos a la lámina, más nítidos que
 *  el resto) y funde la cola sobre la cabeza durante `fade` fotogramas. */
async function makeLoop(src, target, { skip = 3, fade = 24, crf = 25 } = {}) {
  const n = frameCount(src);
  const m = n - skip;
  const body = m - fade;
  const filter = [
    `[0:v]trim=start_frame=${skip},setpts=PTS-STARTPTS,split=3[a][b][c]`,
    `[a]trim=end_frame=${fade},setpts=PTS-STARTPTS[head]`,
    `[b]trim=start_frame=${fade}:end_frame=${body},setpts=PTS-STARTPTS[body]`,
    `[c]trim=start_frame=${body},setpts=PTS-STARTPTS[tail]`,
    `[tail][head]blend=all_expr='A*(1-N/${fade})+B*(N/${fade})'[mix]`,
    `[mix][body]concat=n=2:v=1:a=0,scale=${W}:${H}:flags=lanczos,format=yuv420p[out]`
  ].join(";");
  run("ffmpeg", [
    "-loglevel", "error", "-y", "-i", src, "-filter_complex", filter, "-map", "[out]",
    "-c:v", "libx264", "-preset", "slow", "-crf", String(crf), "-tune", "film", "-profile:v", "high",
    "-g", "48", "-movflags", "+faststart", "-an", target
  ]);
  return { frames: body, bytes: (await stat(target)).size };
}

async function plate(src, target) {
  run("ffmpeg", [
    "-loglevel", "error", "-y", "-i", src, "-vf", `scale=${W}:${H}:flags=lanczos`,
    "-c:v", "libwebp", "-quality", "80", "-compression_level", "6", target
  ]);
  return (await stat(target)).size;
}

const MB = (bytes) => `${(bytes / 1024 / 1024).toFixed(2)} MB`;
const manifest = {
  v: 2,
  w: W,
  h: H,
  seq: {},
  rests: RESTS.map(({ id, pan }) => ({ id, plate: `plates/${id}.webp`, loop: `loops/${id}.mp4`, pan })),
  spots: SPOTS,
  hub: HUB,
  closeups: Object.fromEntries(
    Object.keys(CLOSEUPS).map((key) => [key, { plate: `plates/${key}.webp`, loop: `loops/c-${key}.mp4` }])
  ),
  book: BOOK
};
let total = 0;
await mkdir(OUT, { recursive: true });

if (ONLY === "all" || ONLY === "frames") {
  for (const { key, file, step } of TRANSITIONS) {
    const src = path.join(RAW, file);
    const { frames, bytes } = await extractFrames(src, path.join(OUT, "H", key), { step, width: W, height: H, quality: 62 });
    manifest.seq[key] = frames;
    total += bytes;
    console.log(`${key}: ${frames} fotogramas, ${MB(bytes)}`);
  }
  for (const [key, item] of Object.entries(CLOSEUPS)) {
    const src = path.join(RAW, item.zoom);
    if (!(await exists(src))) {
      console.warn(`· falta ${item.zoom}, se omite`);
      continue;
    }
    const { frames, bytes } = await extractFrames(src, path.join(OUT, "H", `zoom-${key}`), {
      step: 3,
      width: 1280,
      height: 720,
      quality: 60
    });
    manifest.seq[`zoom-${key}`] = frames;
    total += bytes;
    console.log(`zoom-${key}: ${frames} fotogramas, ${MB(bytes)}`);
  }
}

if (ONLY === "all" || ONLY === "loops") {
  await mkdir(path.join(OUT, "loops"), { recursive: true });
  for (const rest of RESTS) {
    const src = path.join(RAW, rest.loop);
    if (!(await exists(src))) {
      console.warn(`· falta ${rest.loop}, se omite`);
      continue;
    }
    const { frames, bytes } = await makeLoop(src, path.join(OUT, "loops", `${rest.id}.mp4`), { fade: rest.fade ?? 30 });
    total += bytes;
    console.log(`loop ${rest.id}: ${frames} fotogramas, ${MB(bytes)}`);
  }
  for (const [key, item] of Object.entries(CLOSEUPS)) {
    const src = path.join(RAW, item.loop);
    if (!(await exists(src))) {
      console.warn(`· falta ${item.loop}, se omite`);
      continue;
    }
    const { frames, bytes } = await makeLoop(src, path.join(OUT, "loops", `c-${key}.mp4`), { fade: 20, crf: 26 });
    total += bytes;
    console.log(`loop c-${key}: ${frames} fotogramas, ${MB(bytes)}`);
  }
}

if (ONLY === "all" || ONLY === "plates") {
  await mkdir(path.join(OUT, "plates"), { recursive: true });
  for (const rest of RESTS) total += await plate(path.join(PLATES, rest.plate), path.join(OUT, "plates", `${rest.id}.webp`));
  for (const [key, item] of Object.entries(CLOSEUPS)) {
    total += await plate(path.resolve(PLATES, item.plate), path.join(OUT, "plates", `${key}.webp`));
  }
  // póster liviano para el primer pintado (LCP)
  run("ffmpeg", [
    "-loglevel", "error", "-y", "-i", path.join(PLATES, RESTS[0].plate), "-vf", "scale=1280:720:flags=lanczos",
    "-c:v", "libwebp", "-quality", "72", path.join(OUT, "poster-H.webp")
  ]);
}

if (ONLY === "all") {
  await writeFile(path.join(OUT, "manifest.json"), JSON.stringify(manifest));
} else {
  console.log("(manifest.json sólo se escribe con --only all)");
}
console.log(`Total: ${MB(total)} → ${OUT}`);
