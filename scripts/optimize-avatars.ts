/**
 * Genera los avatares servidos a partir de los masters en alta resolución.
 *
 *   assets/avatars-master/<slug>.{png,webp,jpg}   ← masters (no se publican)
 *          ↓  este script
 *   public/images/avatars/<slug>.webp             ← lo que sirve el sitio
 *
 * Uso:
 *   npm run avatars:optimize            genera los que falten o cambiaron
 *   npm run avatars:optimize -- --force regenera todos
 *
 * Por qué existe: los avatares se sirven con <img> plano, sin next/image, así
 * que el navegador descarga el archivo tal cual y el selector muestra los 12 a
 * la vez. Un master de 1024px pesa ~410 KB: los 12 serían ~4,8 MB para
 * pintarlos a 64px. A 256px quedan en ~20 KB cada uno.
 *
 * El tamaño de salida y la calidad viven en src/data/avatarCatalog.ts, junto a
 * los slugs que consume el seed.
 */
import { readdir, mkdir, stat, readFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import {
  AVATAR_SIZE_PX,
  AVATAR_WEBP_QUALITY,
  buildAvatarCatalog
} from "../src/data/avatarCatalog";

const MASTER_DIR = path.join(process.cwd(), "assets", "avatars-master");
const OUTPUT_DIR = path.join(process.cwd(), "public", "images", "avatars");
const EXTENSIONES = new Set([".png", ".webp", ".jpg", ".jpeg"]);
/** Aviso si un archivo generado supera esto: algo se salió de madre. */
const AVISO_KB = 60;

const force = process.argv.includes("--force");

/**
 * Placeholder para los avatares del catálogo que todavía no tienen master.
 *
 * Sin esto, el selector ofrece una opción cuyo archivo no existe: el usuario
 * ve un ícono roto y, si la elige, se le queda de identidad en el header. Con
 * el placeholder la opción se ve intencional —monograma sobre fondo oscuro,
 * claramente "arte pendiente"— en vez de rota.
 *
 * No pisa arte real: solo se genera si no hay archivo de salida. Cuando el
 * master aparece, la pasada normal lo regenera por mtime.
 */
function placeholderSvg(inicial: string): Buffer {
  const size = AVATAR_SIZE_PX;
  return Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
      <rect width="${size}" height="${size}" fill="#111522"/>
      <circle cx="${size / 2}" cy="${size / 2}" r="${size / 2 - 10}" fill="#0a0d16" stroke="#2b2f3d" stroke-width="2"/>
      <text x="50%" y="50%" dy="0.34em" text-anchor="middle"
            font-family="Georgia, 'Times New Roman', serif" font-size="${Math.round(size * 0.42)}"
            fill="#6f6878">${inicial}</text>
    </svg>`
  );
}

function kb(bytes: number): string {
  return `${(bytes / 1024).toFixed(1)} KB`;
}

async function existe(ruta: string): Promise<boolean> {
  try {
    await stat(ruta);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  if (!(await existe(MASTER_DIR))) {
    console.error(`No existe ${path.relative(process.cwd(), MASTER_DIR)}.`);
    console.error("Crea la carpeta y deja ahí los masters con el nombre <slug>.png (o .webp/.jpg).");
    process.exitCode = 1;
    return;
  }
  await mkdir(OUTPUT_DIR, { recursive: true });

  const catalogo = buildAvatarCatalog();
  const slugsEsperados = new Set(catalogo.map((entry) => entry.slug));

  const archivos = (await readdir(MASTER_DIR)).filter((nombre) =>
    EXTENSIONES.has(path.extname(nombre).toLowerCase())
  );

  if (archivos.length === 0) {
    console.error(`No hay imágenes en ${path.relative(process.cwd(), MASTER_DIR)}.`);
    process.exitCode = 1;
    return;
  }

  const procesados = new Set<string>();
  const desconocidos: string[] = [];
  const noCuadrados: string[] = [];
  let generados = 0;
  let omitidos = 0;
  let bytesEntrada = 0;
  let bytesSalida = 0;

  for (const archivo of archivos.sort()) {
    const slug = path.basename(archivo, path.extname(archivo));
    const origen = path.join(MASTER_DIR, archivo);
    const destino = path.join(OUTPUT_DIR, `${slug}.webp`);

    if (!slugsEsperados.has(slug)) {
      desconocidos.push(archivo);
      continue;
    }

    const meta = await sharp(origen).metadata();
    // Nada recorta estas imágenes en el front (no hay object-fit y la hoja
    // global aplica height:auto), así que una no cuadrada se renderiza como
    // elipse dentro del border-radius. Se avisa y no se genera.
    if (meta.width !== meta.height) {
      noCuadrados.push(`${archivo} (${meta.width}x${meta.height})`);
      continue;
    }
    if ((meta.width ?? 0) < AVATAR_SIZE_PX) {
      console.warn(
        `  aviso  ${archivo}: master de ${meta.width}px, menor que los ${AVATAR_SIZE_PX}px de salida (se ampliará y perderá nitidez)`
      );
    }

    procesados.add(slug);

    // Salta lo que ya está al día, salvo --force.
    if (!force && (await existe(destino))) {
      const [mOrigen, mDestino] = await Promise.all([stat(origen), stat(destino)]);
      if (mDestino.mtimeMs >= mOrigen.mtimeMs) {
        omitidos += 1;
        continue;
      }
    }

    const entrada = (await readFile(origen)).byteLength;
    await sharp(origen)
      .resize(AVATAR_SIZE_PX, AVATAR_SIZE_PX, { fit: "cover", position: "centre" })
      .webp({ quality: AVATAR_WEBP_QUALITY })
      .toFile(destino);
    const salida = (await stat(destino)).size;

    bytesEntrada += entrada;
    bytesSalida += salida;
    generados += 1;

    const alerta = salida / 1024 > AVISO_KB ? `  ⚠ supera ${AVISO_KB} KB` : "";
    console.log(
      `  ok  ${slug.padEnd(30)} ${kb(entrada).padStart(9)} → ${kb(salida).padStart(8)}${alerta}`
    );
  }

  // Placeholders para lo que aún no tiene master, para que el selector nunca
  // ofrezca una opción con imagen rota.
  const faltantes = [...slugsEsperados].filter((slug) => !procesados.has(slug));
  const placeholdersNuevos: string[] = [];
  const placeholdersVigentes: string[] = [];
  for (const slug of faltantes) {
    const entrada = catalogo.find((item) => item.slug === slug);
    const destino = path.join(OUTPUT_DIR, `${slug}.webp`);
    if (await existe(destino)) {
      placeholdersVigentes.push(slug);
      continue;
    }
    const inicial = (entrada?.characterName ?? slug).charAt(0).toUpperCase();
    await sharp(placeholderSvg(inicial))
      .webp({ quality: AVATAR_WEBP_QUALITY })
      .toFile(destino);
    placeholdersNuevos.push(slug);
  }

  console.log("");
  console.log(`Generados: ${generados}${omitidos ? ` · sin cambios: ${omitidos}` : ""}`);
  if (generados > 0) {
    console.log(`Peso: ${kb(bytesEntrada)} → ${kb(bytesSalida)} (${(100 - (bytesSalida / bytesEntrada) * 100).toFixed(0)}% menos)`);
  }

  if (noCuadrados.length > 0) {
    console.log("");
    console.error("NO CUADRADOS (no se generaron; se verían como elipse):");
    for (const item of noCuadrados) console.error(`  - ${item}`);
    process.exitCode = 1;
  }
  if (desconocidos.length > 0) {
    console.log("");
    console.warn("Nombres que no están en el catálogo (ignorados):");
    for (const item of desconocidos) console.warn(`  - ${item}`);
    console.warn("  Los slugs válidos salen de src/data/avatarCatalog.ts");
  }
  if (faltantes.length > 0) {
    console.log("");
    console.warn(`Faltan masters para ${faltantes.length} de ${slugsEsperados.size} avatares:`);
    for (const slug of faltantes) {
      const marca = placeholdersNuevos.includes(slug)
        ? "placeholder generado"
        : placeholdersVigentes.includes(slug)
          ? "placeholder ya presente"
          : "";
      console.warn(`  - ${slug}${marca ? `  (${marca})` : ""}`);
    }
    console.warn("  Al dejar el master, la próxima pasada reemplaza el placeholder.");
  } else {
    console.log(`Catálogo completo: hay imagen para los ${slugsEsperados.size} avatares.`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
