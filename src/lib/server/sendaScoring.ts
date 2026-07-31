import { Senda } from "@/generated/prisma/client";

/**
 * Ritual de Afinación del Cristal: preguntas, pesos y scoring.
 * Módulo puro (sin BD) para poder testearlo con node:test.
 *
 * Cada opción suma pesos a una o más Sendas. Las Sendas singulares
 * (CONEXION, TRUENO, VACIO, FE) solo reciben pesos secundarios: emergen
 * únicamente con elecciones consistentes a lo largo del ritual.
 */
export type SendaQuestion = {
  id: string;
  /** Rasgo evaluado (sección 5 del diseño). */
  rasgo: string;
  prompt: string;
  options: readonly {
    id: string;
    label: string;
    weights: Partial<Record<Senda, number>>;
  }[];
};

export const SENDA_QUESTIONS: readonly SendaQuestion[] = [
  {
    id: "conflicto",
    rasgo: "Reacción ante el conflicto",
    prompt: "El Velo se rasga frente a ti y algo hostil cruza. ¿Qué haces primero?",
    options: [
      { id: "a", label: "Avanzo antes de que termine de cruzar.", weights: { LLAMA: 2, TRUENO: 1 } },
      { id: "b", label: "Cedo terreno y busco el ángulo que nadie vigila.", weights: { AIRE: 2, VACIO: 1 } },
      { id: "c", label: "Me planto: si quiere pasar, tendrá que moverme.", weights: { TIERRA: 2, FE: 1 } },
      { id: "d", label: "Observo su ritmo y respondo a su compás, no al mío.", weights: { AGUA: 2, CONEXION: 1 } },
      { id: "e", label: "Enfrío la situación: sin prisa no hay errores.", weights: { HIELO: 2, VIDA: 1 } }
    ]
  },
  {
    id: "proteger",
    rasgo: "Forma de proteger a otros",
    prompt: "Alguien de tu grupo queda expuesto. ¿Cómo lo proteges?",
    options: [
      { id: "a", label: "Me pongo delante y atraigo el peligro hacia mí.", weights: { TIERRA: 2, LLAMA: 1 } },
      { id: "b", label: "Lo saco de ahí antes de que el peligro lo alcance.", weights: { AIRE: 2, TRUENO: 1 } },
      { id: "c", label: "Curo, sostengo y no suelto hasta que respire tranquilo.", weights: { VIDA: 2, AGUA: 1 } },
      { id: "d", label: "Congelo la amenaza: nadie toca a los míos.", weights: { HIELO: 2, VACIO: 1 } },
      { id: "e", label: "Permanezco a su lado; mi presencia es la defensa.", weights: { FE: 2, CONEXION: 1 } }
    ]
  },
  {
    id: "conocimiento",
    rasgo: "Relación con el conocimiento",
    prompt: "Encuentras un archivo del Velo que nadie ha leído. ¿Qué haces con él?",
    options: [
      { id: "a", label: "Lo estudio entero antes de contárselo a nadie.", weights: { HIELO: 2, VACIO: 1 } },
      { id: "b", label: "Lo comparto: el conocimiento aislado se pudre.", weights: { CONEXION: 2, AGUA: 1 } },
      { id: "c", label: "Pruebo lo que dice, aunque duela: la práctica manda.", weights: { LLAMA: 2, TRUENO: 1 } },
      { id: "d", label: "Lo contrasto con lo que la tierra y los años ya enseñan.", weights: { TIERRA: 2, VIDA: 1 } },
      { id: "e", label: "Tomo lo esencial y sigo: saber cargar también es saber soltar.", weights: { AIRE: 2, FE: 1 } }
    ]
  },
  {
    id: "preferencia",
    rasgo: "Control / adaptación / vínculo / convicción",
    prompt: "¿Qué frase te describe mejor cuando todo se desordena?",
    options: [
      { id: "a", label: "Controlo lo que puedo y suelto lo que no.", weights: { HIELO: 2, TIERRA: 1 } },
      { id: "b", label: "Me adapto: el agua no discute con la roca, la rodea.", weights: { AGUA: 2, AIRE: 1 } },
      { id: "c", label: "Me sostienen mis vínculos; solos no somos nada.", weights: { CONEXION: 2, VIDA: 1 } },
      { id: "d", label: "Mi convicción no se negocia, ni siquiera conmigo.", weights: { FE: 2, LLAMA: 1 } },
      { id: "e", label: "Actúo primero; el orden llega después del rayo.", weights: { TRUENO: 2, VACIO: 1 } }
    ]
  },
  {
    id: "sacrificio",
    rasgo: "Respuesta frente al sacrificio",
    prompt: "Salvar algo va a costarte algo tuyo. ¿Qué entregas?",
    options: [
      { id: "a", label: "Mi tiempo: puedo reconstruir lo que se tarda, no lo que se pierde.", weights: { VIDA: 2, TIERRA: 1 } },
      { id: "b", label: "Mi comodidad: el frío se soporta, la culpa no.", weights: { HIELO: 2, FE: 1 } },
      { id: "c", label: "Mi lugar seguro: me muevo yo para que otros no tengan que hacerlo.", weights: { AIRE: 2, AGUA: 1 } },
      { id: "d", label: "Mi anonimato: doy la cara y que el fuego me encuentre primero.", weights: { LLAMA: 2, CONEXION: 1 } },
      { id: "e", label: "Lo que haga falta, incluso lo que aún no sé nombrar.", weights: { VACIO: 2, TRUENO: 1 } }
    ]
  },
  {
    id: "crisis",
    rasgo: "Manera de resolver una crisis",
    prompt: "La crisis estalla y todos te miran. ¿Cuál es tu primer gesto?",
    options: [
      { id: "a", label: "Reparto tareas: cada cual a lo suyo, ahora.", weights: { TRUENO: 2, HIELO: 1 } },
      { id: "b", label: "Escucho diez segundos más que los demás y decido mejor.", weights: { AGUA: 2, VACIO: 1 } },
      { id: "c", label: "Enciendo a la gente: el ánimo también es un recurso.", weights: { LLAMA: 2, VIDA: 1 } },
      { id: "d", label: "Aseguro lo esencial: agua, salida, heridos, en ese orden.", weights: { TIERRA: 2, AIRE: 1 } },
      { id: "e", label: "Uno al grupo: ninguna crisis se resuelve por separado.", weights: { CONEXION: 2, FE: 1 } }
    ]
  }
];

/** Orden de desempate estable (primarias antes que singulares). */
const TIE_ORDER: readonly Senda[] = [
  Senda.LLAMA,
  Senda.AGUA,
  Senda.HIELO,
  Senda.AIRE,
  Senda.TIERRA,
  Senda.VIDA,
  Senda.CONEXION,
  Senda.TRUENO,
  Senda.VACIO,
  Senda.FE
];

export type SendaTestAnswers = Record<string, string>;

export type SendaTestScore = {
  principal: Senda;
  cercanas: [Senda, Senda];
  puntajes: Record<Senda, number>;
};

/** true si `answers` responde exactamente las preguntas del ritual con opciones válidas. */
export function validateAnswers(answers: SendaTestAnswers): boolean {
  const ids = Object.keys(answers);
  if (ids.length !== SENDA_QUESTIONS.length) return false;
  return SENDA_QUESTIONS.every((question) => {
    const chosen = answers[question.id];
    return typeof chosen === "string" && question.options.some((option) => option.id === chosen);
  });
}

export function scoreSendaTest(answers: SendaTestAnswers): SendaTestScore {
  const puntajes = Object.fromEntries(TIE_ORDER.map((senda) => [senda, 0])) as Record<Senda, number>;

  for (const question of SENDA_QUESTIONS) {
    const option = question.options.find((candidate) => candidate.id === answers[question.id]);
    if (!option) {
      throw new Error(`Respuesta inválida para la pregunta "${question.id}".`);
    }
    for (const [senda, weight] of Object.entries(option.weights) as [Senda, number][]) {
      puntajes[senda] += weight;
    }
  }

  const ordered = [...TIE_ORDER].sort((a, b) => puntajes[b] - puntajes[a]);
  return {
    principal: ordered[0],
    cercanas: [ordered[1], ordered[2]],
    puntajes
  };
}

/** Lectura breve personalizada por Senda (resultado del ritual). */
export const SENDA_READINGS: Record<Senda, { lectura: string; fortalezas: string; riesgos: string }> = {
  LLAMA: {
    lectura: "Tu Aura arde hacia adelante: decides con el cuerpo ya en movimiento.",
    fortalezas: "Iniciativa, coraje, capacidad de encender a otros.",
    riesgos: "Quemarte por dentro antes de pedir ayuda."
  },
  AGUA: {
    lectura: "Tu Aura fluye: lees el ritmo de las cosas antes de tocarlas.",
    fortalezas: "Adaptación, escucha, paciencia táctica.",
    riesgos: "Diluirte en las corrientes de otros."
  },
  HIELO: {
    lectura: "Tu Aura enfría el ruido: donde otros ven caos, tú ves estructura.",
    fortalezas: "Precisión, control, calma bajo presión.",
    riesgos: "Congelar también lo que necesitaba calor."
  },
  AIRE: {
    lectura: "Tu Aura no acepta jaulas: encuentras la salida que nadie miró.",
    fortalezas: "Movilidad, perspectiva, ligereza para soltar.",
    riesgos: "No quedarte lo suficiente en ningún lugar."
  },
  TIERRA: {
    lectura: "Tu Aura es cimiento: los demás construyen sobre tu firmeza.",
    fortalezas: "Constancia, protección, memoria larga.",
    riesgos: "Confundir inmovilidad con fortaleza."
  },
  VIDA: {
    lectura: "Tu Aura repara: ves lo que aún puede sanar donde otros ven pérdida.",
    fortalezas: "Cuidado, regeneración, esperanza activa.",
    riesgos: "Sanar a todos menos a ti."
  },
  CONEXION: {
    lectura: "Tu Aura teje: sientes los hilos entre las personas como si fueran propios.",
    fortalezas: "Empatía, alianzas, unión en la crisis.",
    riesgos: "Cargar nudos que no te corresponden."
  },
  TRUENO: {
    lectura: "Tu Aura estalla en el instante justo: la decisión es tu elemento.",
    fortalezas: "Velocidad, resolución, autoridad natural.",
    riesgos: "Decidir por otros lo que era de ellos."
  },
  VACIO: {
    lectura: "Tu Aura habita el umbral: no temes a lo que aún no tiene nombre.",
    fortalezas: "Visión sin prejuicio, serenidad ante lo desconocido.",
    riesgos: "Alejarte tanto del ruido que nadie te encuentre."
  },
  FE: {
    lectura: "Tu Aura es convicción encendida: crees primero, y el mundo se ordena después.",
    fortalezas: "Voluntad inquebrantable, sentido, dirección.",
    riesgos: "Confundir certeza con verdad."
  }
};
