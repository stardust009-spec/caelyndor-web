/**
 * Eventos de fracaso de los cuestionarios: cuando alguien reprueba, un
 * personaje interfiere en la sala de evaluación. Pura narrativa: no cambian
 * nada del sistema (las preguntas se re-sortean siempre), pero dejan un
 * objeto misterioso y algo de qué hablar en el foro.
 *
 * Los cuatro primeros fracasos de cada lector siguen este orden fijo
 * (EVENTOS_EN_ORDEN, escritos por el autor). Desde el quinto, sale uno al azar
 * entre todos, sin repetir el último. Seguro para el cliente.
 */

export type LineaEvento =
  | { tipo: "narracion"; texto: string }
  | { tipo: "dialogo"; quien: string; texto: string };

export type EventoFracaso = {
  id: string;
  personaje: string;
  titulo: string;
  acento: string;
  lineas: readonly LineaEvento[];
  /** Línea final, el "objeto" que deja el evento. */
  cierre: string;
};

const n = (texto: string): LineaEvento => ({ tipo: "narracion", texto });
const d = (quien: string, texto: string): LineaEvento => ({ tipo: "dialogo", quien, texto });

export const EVENTOS_FRACASO: readonly EventoFracaso[] = [
  {
    id: "adagio",
    personaje: "Adagio Ventoleve",
    titulo: "Una interferencia inesperada…",
    acento: "#7fb4c8",
    lineas: [
      d("Adagio", "Para que tu sufrimiento sea todavía más exquisito, he decidido alterar el orden de las preguntas. No me lo agradezcas."),
      n("Adagio ríe suavemente y abandona la escena.")
    ],
    cierre: "Una cuerda de violín acaba de romperse."
  },
  {
    id: "aria",
    personaje: "Aria Ventoleve",
    titulo: "Aria entra en escena",
    acento: "#e07a8f",
    lineas: [
      n("Aria aparece, observa los resultados y luego gira lentamente la cabeza hacia ti. No hacia tu personaje. Hacia ti."),
      d("Aria", "¿Acaso no pones atención o qué?"),
      d("Aria", "Uf… ya ni recuerdo el orden. Junté los papeles como pensé que eran."),
      n("Se encoge de hombros."),
      d("Aria", "Adiós.")
    ],
    cierre: "Un pétalo de rosa acaba de caer."
  },
  {
    id: "xirian",
    personaje: "Xirian",
    titulo: "Interferencia de la Urdimbre",
    acento: "#aa78e6",
    lineas: [
      d("Xirian", "Inaceptable. Crearé otra prueba."),
      n("Xirian coloca delicadamente varios hilos de urdimbre en tu mente."),
      d("Xirian", "Listo. He alterado tus recuerdos de las preguntas. Inténtalo cuando tu cerebro esté preparado."),
      n("Xirian abre su cuaderno y anota algo. Lo cierra.")
    ],
    cierre: "No sabes qué ha escrito."
  },
  {
    id: "rubi",
    personaje: "Rubí Kaelynn Vaer'Solyn",
    titulo: "Incidente en la sala de evaluación",
    acento: "#c84b4b",
    lineas: [
      n("Rubí observa la pizarra llena de preguntas y frunce el ceño."),
      d("Rubí", "¡¿OTRA VEZ REPROBASTE?! ¡¿PERO QUÉ TE PASA?!"),
      n("Se gira hacia la pizarra."),
      d("Rubí", "¡YA ME CANSÉ! ¡RUBIKICK!"),
      n("¡¡¡CRAAAAAASH!!! La pizarra se parte en dos. Una nube de tiza cubre el salón."),
      n("Rubí contempla los restos durante varios segundos."),
      d("Rubí", "…"),
      d("Rubí", "Bueno. Ahora nadie recuerda el orden de las preguntas."),
      n("Se sacude el polvo de la armadura y abandona el salón silbando.")
    ],
    cierre: "La pizarra ha dejado de existir."
  },
  {
    id: "yuki",
    personaje: "Yuki Arhess",
    titulo: "Revisión de la Reina",
    acento: "#8bc6df",
    lineas: [
      n("Yuki entra sin hacer ruido. Se ajusta las Ex Glaciem–Max y revisa tus respuestas una por una, en completo silencio."),
      n("El silencio dura demasiado."),
      d("Yuki", "Interesante."),
      n("Con un gesto, convierte la hoja de respuestas en un bloque de hielo perfectamente transparente."),
      d("Yuki", "La conservaré para estudiarla. Se descongela en siete días. Úsalos.")
    ],
    cierre: "Un carámbano acaba de caer del techo."
  },
  {
    id: "lyzi",
    personaje: "Lyzi",
    titulo: "Visita desde Sylvalis",
    acento: "#a77aff",
    lineas: [
      n("Lyzi se asoma por la puerta con una taza de té de manzanilla y una sonrisa demasiado tranquila."),
      d("Lyzi", "Ay, cariño… no pasa nada. A todos nos ha ido mal alguna vez."),
      n("Detrás de ella, Rollito avanza sobre la mesa y se come, con mucha dedicación, la página tres del cuestionario."),
      d("Lyzi", "¡Rollito, no! …Bueno. Supongo que habrá que escribir otra."),
      n("Lyzi le da unas palmaditas a Rollito, que eructa una nubecita de tinta.")
    ],
    cierre: "Huele a manzanilla y a papel masticado."
  },
  {
    id: "noctalypse",
    personaje: "Noctalypse",
    titulo: "Una sombra en el aula",
    acento: "#7b5ca8",
    lineas: [
      n("Noctalypse está apoyado en la pared del fondo. Nadie lo vio entrar."),
      d("Noctalypse", "Fallar no es el problema. El problema es leer con prisa."),
      n("Su sombra se alarga por el suelo, sube al escritorio y se traga, sin ruido, todas tus respuestas."),
      d("Noctalypse", "Mi sombra las devolverá en siete días. Probablemente desordenadas. Tiene sus manías."),
      n("Se ajusta los lentes y ya no está.")
    ],
    cierre: "La sala quedó un poco más oscura que antes."
  },
  {
    id: "fulgor",
    personaje: "Fulgor",
    titulo: "Etiqueta de dragón",
    acento: "#f0c75e",
    lineas: [
      n("Un calor repentino llena la sala. Fulgor asoma la cabeza por la ventana, que de pronto parece muy pequeña."),
      d("Fulgor", "Reprobar está permitido. Reprobar con los codos sobre la mesa, no."),
      n("Olfatea el cuestionario con gesto de crítico gastronómico."),
      d("Fulgor", "Le falta reposo. Siete días, como un buen estofado."),
      n("Con una bocanada mínima y muy elegante, flambea las hojas.")
    ],
    cierre: "Huele a pregunta flambeada."
  },
  {
    id: "lucky-luciano",
    personaje: "Lucky Luciano Griazniati",
    titulo: "Visita del sindicato",
    acento: "#d9b26a",
    lineas: [
      n("Se oyen graznidos sincronizados en el pasillo. Lucky Luciano Griazniati entra con el chaleco impecable y un puro entre el pico."),
      d("Lucky Luciano", "Graz… El cuestionario dice que le debes un intento."),
      n("Golpea la mesa una sola vez con el ala. El golpe suena pequeño; la amenaza, inmensa."),
      d("Lucky Luciano", "Volvemos en siete días. ¿Capisci?")
    ],
    cierre: "Un puro se apaga lentamente sobre tu escritorio."
  },
  {
    id: "sucio-joe",
    personaje: "El Sucio Joe",
    titulo: "Ladrón que roba a ladrón",
    acento: "#9aa3ad",
    lineas: [
      n("Un «psst, psst» sale de debajo del escritorio. Es el Sucio Joe."),
      d("Joe", "Hablen sin mirarme. Me llevé tu cuestionario y dejé una copia exacta."),
      n("Hace una pausa."),
      d("Joe", "¿O me llevé la copia y te dejé el original? Ya ni sé. Nos vemos en siete días.")
    ],
    cierre: "Encuentras una nota firmada con el dibujo de un mapache sonriente."
  }
];

/** Orden fijo de los cuatro primeros fracasos de cada lector. */
export const EVENTOS_EN_ORDEN = ["adagio", "aria", "xirian", "rubi"] as const;

export function getEvento(id: string | null | undefined): EventoFracaso | null {
  return EVENTOS_FRACASO.find((evento) => evento.id === id) ?? null;
}
