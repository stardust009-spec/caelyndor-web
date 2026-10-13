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
import { AVATAR_EN_MARCO, MARCOS } from "../src/data/marcos";
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

/**
 * Mide el radio del hueco central transparente de un marco: desde el centro,
 * en 24 direcciones, hasta el primer píxel opaco (alpha > 128). Devuelve la
 * mediana, o null si el centro no es transparente.
 */
async function radioDelHueco(origen: string): Promise<number | null> {
  const { data, info } = await sharp(origen).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  const cx = width / 2;
  const cy = height / 2;
  const radios: number[] = [];
  for (let k = 0; k < 24; k += 1) {
    const angulo = (k / 24) * Math.PI * 2;
    for (let r = 0; r < Math.min(cx, cy); r += 1) {
      const x = Math.round(cx + Math.cos(angulo) * r);
      const y = Math.round(cy + Math.sin(angulo) * r);
      if (data[(y * width + x) * channels + 3] > 128) {
        radios.push(r);
        break;
      }
    }
  }
  if (radios.length < 12) return null;
  radios.sort((a, b) => a - b);
  const mediana = radios[Math.floor(radios.length / 2)];
  return mediana < width * 0.12 ? null : mediana;
}

/**
 * GPT Image no respeta medidas exactas: si el hueco del marco no mide el
 * AVATAR_EN_MARCO del lienzo, se reescala el arte (recortando o rellenando con
 * transparencia) para que el avatar calce justo en él.
 */
async function calibrarMarco(origen: string, archivo: string): Promise<ReturnType<typeof sharp>> {
  const meta = await sharp(origen).metadata();
  const lado = meta.width ?? 0;
  const radio = await radioDelHueco(origen);
  if (radio === null) {
    console.warn(`  marcos: "${archivo}" no tiene el centro transparente; se usa tal cual`);
    return sharp(origen);
  }
  const deseado = (lado * AVATAR_EN_MARCO) / 2;
  const factor = deseado / radio;
  if (Math.abs(factor - 1) < 0.03) {
    return sharp(origen);
  }
  const nuevo = Math.round(lado * factor);
  console.log(`  marcos: "${archivo}" hueco de ${radio * 2}px → reescalado ×${factor.toFixed(2)} para que el avatar calce`);
  const escalado = await sharp(origen).resize(nuevo, nuevo).png().toBuffer();
  if (nuevo > lado) {
    const borde = Math.floor((nuevo - lado) / 2);
    return sharp(escalado).extract({ left: borde, top: borde, width: lado, height: lado });
  }
  const margen = Math.floor((lado - nuevo) / 2);
  return sharp(escalado).extend({
    top: margen,
    bottom: lado - nuevo - margen,
    left: margen,
    right: lado - nuevo - margen,
    background: { r: 0, g: 0, b: 0, alpha: 0 }
  });
}

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

    const base = lote.nombre === "marcos" ? await calibrarMarco(origen, archivo) : sharp(origen);
    const preparado = await base.png().toBuffer();
    await sharp(preparado)
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
