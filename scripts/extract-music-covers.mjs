import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import { constants } from "node:fs";
import path from "node:path";

const workspaceRoot = process.cwd();
const musicSourceDir = path.join(workspaceRoot, "music-source");
const musicDataPath = path.join(workspaceRoot, "src", "data", "music.ts");
const coversDir = path.join(workspaceRoot, "public", "images", "music-covers");
const coversMapPath = path.join(workspaceRoot, "src", "data", "musicCovers.ts");
const musicBase = "https://stardust009-spec.github.io/Caelyndor-Assets/";

async function loadMusicMetadata() {
  try {
    return await import("music-metadata");
  } catch {
    return null;
  }
}

function cleanExtension(format) {
  const mime = format?.toLowerCase() ?? "";

  if (mime.includes("png")) {
    return "png";
  }

  if (mime.includes("webp")) {
    return "webp";
  }

  return "jpg";
}

function getTracks(source) {
  const tracks = [];
  const blockPattern = /track\(\{([\s\S]*?)\n  \}\)/g;

  for (const match of source.matchAll(blockPattern)) {
    const block = match[1];
    const id = block.match(/id:\s*"([^"]+)"/)?.[1];
    const title = block.match(/title:\s*"([^"]+)"/)?.[1];
    const fileName = block.match(/fileName:\s*"([^"]+)"/)?.[1];

    if (id && fileName) {
      tracks.push({ id, title: title ?? id, fileName });
    }
  }

  return tracks;
}

async function fetchBuffer(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  return {
    buffer: Buffer.from(await response.arrayBuffer()),
    mimeType: response.headers.get("content-type") ?? "audio/mpeg"
  };
}

async function fileExists(filePath) {
  try {
    await access(filePath, constants.R_OK);
    return true;
  } catch {
    return false;
  }
}

async function getTrackBuffer(track) {
  const localPath = path.join(musicSourceDir, track.fileName);

  if (await fileExists(localPath)) {
    return {
      buffer: await readFile(localPath),
      mimeType: "audio/mpeg",
      source: "local",
      sourcePath: localPath
    };
  }

  const url = `${musicBase}${encodeURIComponent(track.fileName.normalize("NFC"))}`;
  const remote = await fetchBuffer(url);

  return {
    ...remote,
    source: "remote",
    sourcePath: url
  };
}

async function main() {
  const metadataLib = await loadMusicMetadata();

  if (!metadataLib) {
    console.log("music-metadata no esta instalado; instala la dependencia para leer common.picture con maxima compatibilidad.");
    console.log("Comando sugerido cuando haya red: npm.cmd install music-metadata --save-dev");
  }

  await mkdir(coversDir, { recursive: true });

  const source = await readFile(musicDataPath, "utf8");
  const tracks = getTracks(source);
  const coverMap = {};
  const withoutCover = [];
  const failures = [];
  const missingLocal = [];
  const downloaded = [];
  const saved = [];

  for (const track of tracks) {
    try {
      const { buffer, mimeType, source, sourcePath } = await getTrackBuffer(track);

      if (source === "remote") {
        missingLocal.push(track.fileName);
        downloaded.push(track.fileName);
      }

      if (!metadataLib) {
        failures.push(`${track.fileName} (music-metadata no disponible)`);
        continue;
      }

      const metadata = await metadataLib.parseBuffer(buffer, { mimeType });
      const picture = metadata.common.picture?.[0];

      if (!picture?.data?.length) {
        withoutCover.push(track.fileName);
        continue;
      }

      const extension = cleanExtension(picture.format);
      const fileName = `${track.id}.${extension}`;
      const publicPath = `/images/music-covers/${fileName}`;
      await writeFile(path.join(coversDir, fileName), picture.data);
      coverMap[track.id] = publicPath;
      saved.push(`${track.title}: ${publicPath} desde ${sourcePath}`);
    } catch (error) {
      failures.push(`${track.fileName} (${error instanceof Error ? error.message : "error desconocido"})`);
    }
  }

  const mapSource = `export const musicCovers: Record<string, string> = ${JSON.stringify(coverMap, null, 2)};\n`;
  await writeFile(coversMapPath, mapSource, "utf8");

  console.log(`Tracks procesados: ${tracks.length}`);
  console.log(`Caratulas extraidas: ${Object.keys(coverMap).length}`);
  console.log(`Tracks sin caratula embebida: ${withoutCover.length}`);
  console.log(`Tracks no encontrados localmente: ${missingLocal.length}`);
  console.log(`Tracks descargados desde GitHub: ${downloaded.length}`);
  console.log(`MP3 con error: ${failures.length}`);

  if (saved.length) {
    console.log("Portadas guardadas:");
    saved.forEach((entry) => console.log(`- ${entry}`));
  }

  if (withoutCover.length) {
    console.log("Sin portada embebida:");
    withoutCover.forEach((entry) => console.log(`- ${entry}`));
  }

  if (missingLocal.length) {
    console.log("No encontrados en music-source/:");
    missingLocal.forEach((entry) => console.log(`- ${entry}`));
  }

  if (downloaded.length) {
    console.log("Descargados desde GitHub Pages:");
    downloaded.forEach((entry) => console.log(`- ${entry}`));
  }

  if (failures.length) {
    console.log("Fallos:");
    failures.forEach((entry) => console.log(`- ${entry}`));
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
