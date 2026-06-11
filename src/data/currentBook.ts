export type CurrentBook = {
  title: string;
  status: string;
  summary: string;
  progress: number;
  lastUpdate: string;
  nextMilestone: string;
  authorNotes: string;
  stages: {
    name: string;
    state: string;
    progress: number;
  }[];
};

export const currentBook: CurrentBook = {
  title: "CAELYNDOR I: El Velo rasgado",
  status: "Borrador en desarrollo",
  summary: "El libro troncal se encuentra en fase de escritura estructural, con arcos principales definidos y escenas clave en expansión.",
  progress: 38,
  lastUpdate: "Se consolidó el mapa emocional del primer acto y la función narrativa del Velo.",
  nextMilestone: "Cerrar la versión preliminar del segundo acto.",
  authorNotes: "Placeholder para una nota breve sobre tono, decisiones de canon o estado creativo.",
  stages: [
    { name: "Escritura", state: "Activa", progress: 38 },
    { name: "Edición", state: "Pendiente", progress: 0 },
    { name: "Portada", state: "Exploración visual", progress: 12 },
    { name: "Maquetación", state: "Pendiente", progress: 0 },
    { name: "Impresión", state: "Pendiente", progress: 0 }
  ]
};
