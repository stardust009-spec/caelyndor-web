// Refuerzo SEO de las fichas principales: nombre completo y fórmula de identidad
// EXACTOS para que Google reconozca caelyndor.cl como fuente autoritativa frente
// a perfiles externos (Spotify, Instagram, Pixiv, Suno). Solo alimenta metadata,
// el H1 y el JSON-LD; no cambia diseño, rutas ni datos narrativos.
export type CharacterSeo = {
  /** Nombre completo para el title y el H1. */
  fullName: string;
  /** Fórmula natural "nombre completo, rol, pertenencia" para la meta description. */
  tagline: string;
};

export const characterSeo: Record<string, CharacterSeo> = {
  rubi: {
    fullName: "Rubí Kaelynn Vaer'Solyn",
    tagline: "Rubí Kaelynn Vaer'Solyn, guerrera de fuego de Caelyndor"
  },
  yuki: {
    fullName: "Yuki Arhess",
    tagline: "Yuki Arhess, Reina de Glaciem"
  },
  lyzi: {
    fullName: "Lyzi / Lyzantha",
    tagline: "Lyzi / Lyzantha, espíritu eterno de Sylvalis"
  },
  noctalypse: {
    fullName: "Noctalypse",
    tagline: "Noctalypse, figura central del universo Caelyndor"
  }
};
