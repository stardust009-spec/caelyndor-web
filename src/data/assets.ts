export const ASSET_BASE =
  "https://raw.githubusercontent.com/stardust009-spec/Caelyndor-Assets/main/";

export const MUSIC_BASE =
  "https://stardust009-spec.github.io/Caelyndor-Assets/";

export const MUSIC_ASSET_BASE = MUSIC_BASE;
export const VIDEO_BASE = MUSIC_BASE;

export const LOCAL_IMAGE_BASE = "/images";
export const LOCAL_MUSIC_BASE = "/music";

export const currentTrack = {
  title: "Sacred Language of Sylvalis",
  src: `${MUSIC_BASE}Sacred%20Language%20of%20Sylvalis%20(Ethereal%20Choir%20Edit).mp3`
};

// Produccion final: copiar este MP3 a /public/music/sacred-language-of-sylvalis.mp3
// y cambiar currentTrack.src por localMusic("sacred-language-of-sylvalis.mp3").

export function assetImage(fileName: string) {
  return `${ASSET_BASE}${fileName}`;
}

export function bestiaryImage(fileName: string) {
  return `${ASSET_BASE}${encodeURIComponent(fileName.normalize("NFC"))}`;
}

export function localImage(path: string) {
  return `${LOCAL_IMAGE_BASE}/${path}`;
}

export function musicAsset(fileName: string) {
  return `${MUSIC_BASE}${encodeURIComponent(fileName.normalize("NFC"))}`;
}

export function videoAsset(fileName: string) {
  return `${VIDEO_BASE}${encodeURIComponent(fileName.normalize("NFC"))}`;
}

export function localMusic(fileName: string) {
  return `${LOCAL_MUSIC_BASE}/${fileName}`;
}
