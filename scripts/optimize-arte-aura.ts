/**
 * Procesa el arte de marcos de avatar y medallas de logros.
 *
 *   assets/marcos-master/<slug>.png      →  public/images/marcos/<slug>.webp    (384 px)
 *   assets/medallas-master/<logro>.png   →  public/images/medallas/<logro>.webp (192 px)
 *
 * y reescribe src/data/arteAura.ts con la lista de lo que ya tiene arte: lo
 * que no aparece ahí se sigue dibujando con su versión provisional.
 *
 * Uso:
 *   npm run aura:arte             procesa lo nuevo o cambiado
 *   npm run aura:arte -- --force  regenera todo
 *
 * Especificación del arte (lienzo, hueco del avatar, nombres): docs/arte-aura.md.
 */
import { mkdir, readdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { MARCOS } from "../src/data/marcos";
import { ACHIEVEMENT_CATALOG } from "../src/lib/server/achievementCatalog";

const raiz = process.cwd();
const force = process.argv.includes("--force");
const EXTENSIONES = new Set([".png", ".webp"]);

type Lote = {
  nombre: string;
  masters: string;
  salida: string;
  /** Lado del .webp servido (cubre pantallas 2x al tamaño mayor de uso). */
  lado: number;
  slugs: ReadonlySet<string>;
};

const LOTES: Lote[] = [
  {
    nombre: "marcos",
    masters: path.join(raiz, "assets", "marcos-master"),
    salida: path.join(raiz, "public", "images", "marcos"),
    lado: 384,
    slugs: new Set(MARCOS.map((marco) => marco.slug))
  },
  {
    nombre: "medallas",
    masters: path.join(raiz, "assets", "medallas-master"),
    salida: path.join(raiz, "public", "images", "medallas"),
    lado: 192,
    slugs: new Set(ACHIEVEMENT_CATALOG.map((logro) => logro.slug))
  }
];

async function existe(ruta: string): Promise<boolean> {
  try {
    await stat(ruta);
    return true;
  } catch {
    return false;
  }
}

/** Procesa un lote y devuelve los slugs que tienen arte publicado. */
async function procesar(lote: Lote): Promise<string[]> {
  await mkdir(lote.salida, { recursive: true });
  const archivos = (await existe(lote.masters)) ? await readdir(lote.masters) : [];

  for (const archivo of archivos.sort()) {
    if (!EXTENSIONES.has(path.extname(archivo).toLowerCase())) continue;
    const slug = path.basename(archivo, path.extname(archivo));
    if (!lote.slugs.has(slug)) {
      console.warn(`  ${lote.nombre}: "${archivo}" no corresponde a ningún slug del catálogo (se ignora)`);
      continue;
    }

    const origen = path.join(lote.masters, archivo);
    const destino = path.join(lote.salida, `${slug}.webp`);
    const meta = await sharp(origen).metadata();
    if (meta.width !== meta.height) {
      console.warn(`  ${lote.nombre}: "${archivo}" no es cuadrado (${meta.width}x${meta.height}); no se genera`);
      continue;
    }
    if (!meta.hasAlpha) {
      console.warn(`  ${lote.nombre}: "${archivo}" no tiene transparencia; el fondo tapará el avatar o la tarjeta`);
    }

    if (!force && (await existe(destino))) {
      const [mOrigen, mDestino] = await Promise.all([stat(origen), stat(destino)]);
      if (mDestino.mtimeMs >= mOrigen.mtimeMs) continue;
    }

    await sharp(origen)
      .resize(lote.lado, lote.lado, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .webp({ quality: 86, alphaQuality: 90 })
      .toFile(destino);
    const peso = (await readFile(destino)).byteLength;
    console.log(`  ${lote.nombre}: ${slug}.webp (${(peso / 1024).toFixed(1)} KB)`);
  }

  const publicados = (await readdir(lote.salida))
    .filter((nombre) => nombre.endsWith(".webp"))
    .map((nombre) => nombre.slice(0, -".webp".length))
    .filter((slug) => lote.slugs.has(slug))
    .sort();
  return publicados;
}

function lista(slugs: string[]): string {
  return slugs.length === 0 ? "[]" : `[\n${slugs.map((slug) => `  "${slug}"`).join(",\n")}\n]`;
}

async function main() {
  const [marcos, medallas] = await Promise.all(LOTES.map(procesar));
  const manifiesto = `/**
 * GENERADO por scripts/optimize-arte-aura.ts (npm run aura:arte).
 * No editar a mano: lista qué marcos y medallas ya tienen arte en public/.
 * Lo que no está aquí se dibuja con su versión provisional.
 */

export const MARCOS_CON_ARTE: readonly string[] = ${lista(marcos)};

export const MEDALLAS_CON_ARTE: readonly string[] = ${lista(medallas)};
`;
  await writeFile(path.join(raiz, "src", "data", "arteAura.ts"), manifiesto, "utf8");
  console.log(`Arte publicado: ${marcos.length}/${MARCOS.length} marcos, ${medallas.length}/${ACHIEVEMENT_CATALOG.length} medallas.`);
}

void main();
