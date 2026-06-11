export type GalleryItem = {
  id: string;
  title: string;
  category: "Portadas" | "Personajes" | "Interiores" | "Arte conceptual";
  image: string;
  alt: string;
};

export const galleryItems: GalleryItem[] = [
  {
    id: "cover-study",
    title: "Estudio de portada",
    category: "Portadas",
    image: "/images/gallery/cover-study.svg",
    alt: "Placeholder de estudio de portada de Caelyndor"
  },
  {
    id: "rubi-study",
    title: "Rubí, prueba de silueta",
    category: "Personajes",
    image: "/images/gallery/character-study.svg",
    alt: "Placeholder de arte de personaje"
  },
  {
    id: "interior-gate",
    title: "Puerta interior",
    category: "Interiores",
    image: "/images/gallery/interior-gate.svg",
    alt: "Placeholder de ilustración interior"
  },
  {
    id: "veil-concept",
    title: "Concepto del Velo",
    category: "Arte conceptual",
    image: "/images/gallery/veil-concept.svg",
    alt: "Placeholder de arte conceptual del Velo"
  }
];
