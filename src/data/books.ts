export type Book = {
  id: string;
  title: string;
  subtitle: string;
  status: string;
  synopsis: string;
  cover: string;
  readingOrder: string;
  seriesType: "Saga troncal" | "Spin-off" | "Relato lateral";
};

export const books: Book[] = [
  {
    id: "velo-i",
    title: "CAELYNDOR I",
    subtitle: "El Velo rasgado",
    status: "En escritura",
    synopsis: "El primer umbral de la saga troncal: una herida en el mundo abre caminos que nadie puede cerrar sin pagar precio.",
    cover: "/images/books/book-veil.svg",
    readingOrder: "1",
    seriesType: "Saga troncal"
  },
  {
    id: "cenizas",
    title: "Cenizas de Nhal",
    subtitle: "Relato lateral",
    status: "Planeado",
    synopsis: "Una historia breve sobre un reino menor que aprende demasiado tarde a leer las señales del cielo.",
    cover: "/images/books/book-ashes.svg",
    readingOrder: "Opcional después de CAELYNDOR I",
    seriesType: "Relato lateral"
  },
  {
    id: "eclipse",
    title: "Noctalypse",
    subtitle: "Crónica de eclipse",
    status: "Archivo de ideas",
    synopsis: "Crónica de eclipse contada desde la sombra: mitos, antagonismos y documentos prohibidos del abismo que el Archivo aún no se atreve a catalogar.",
    cover: "/images/books/book-eclipse.svg",
    readingOrder: "Por definir",
    seriesType: "Spin-off"
  }
];
