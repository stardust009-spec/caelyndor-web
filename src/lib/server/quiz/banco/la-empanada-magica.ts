import type { PreguntaQuiz } from "../logica";

/**
 * Banco · La empanada mágica (publicada el 13-oct-2026, versión revisada por
 * el autor: abre con la receta y el encargo de Yuki). Párrafos = índice en
 * `paragraphs` de src/data/stories.ts. Ids estables: no reutilizar.
 * Evitado a propósito: quién puso los sellos de hielo del final (el texto
 * dice que ninguna lo recuerda).
 */

const OBRA = "la-empanada-magica";
const TORNEO = "gran-torneo-etilico-de-glaciem";
const solo = [OBRA] as const;

type Base = Omit<PreguntaQuiz, "obra" | "requiere">;
const p = (pregunta: Base): PreguntaQuiz => ({ ...pregunta, obra: OBRA, requiere: solo });

export const BANCO_LA_EMPANADA_MAGICA: readonly PreguntaQuiz[] = [
  // ——— Explícitas ———
  p({
    id: "empanada-e01", tipo: "explicita", dificultad: 1,
    enunciado: "¿Qué receta están preparando las tres?",
    opciones: ["Una receta tradicional de Cindralith occidental", "Un guiso real de Glaciem", "Unas galletas de Sylvalis", "Un pan patrimonial de La Miga Terca"], correcta: 0,
    explicacion: "Rubí la lee en voz alta: carne, cebolla, ají… «mucho ají». Yuki le quita la hoja antes de que termine.",
    fuente: { obra: OBRA, parrafo: 2, cita: "Según esta receta tradicional de Cindralith occidental" }
  }),
  p({
    id: "empanada-e02", tipo: "explicita", dificultad: 1,
    enunciado: "¿A quién manda Yuki a buscar lo que falta de la receta?",
    opciones: ["A Lyzi", "A Rubí", "A Noctalypse", "A Don Carlito"], correcta: 0,
    explicacion: "«Ve por lo que falta. Y trae exactamente lo que está escrito». Lyzi sale dando saltitos.",
    fuente: { obra: OBRA, parrafo: 9, cita: "Lyzi salió dando saltitos, con las nueve colas balanceándose tras ella." }
  }),
  p({
    id: "empanada-e03", tipo: "explicita", dificultad: 1,
    enunciado: "¿Qué especia pidió Lyzi en la tienda?",
    opciones: ["Cola de ángel", "Nalga de ángel", "Cola de diablo", "Sal de luna"], correcta: 0,
    explicacion: "Una especia que no existe. «Es que “nalga de ángel” sonaba feo».",
    fuente: { obra: OBRA, parrafo: 38, cita: "—Cola de ángel." }
  }),
  p({
    id: "empanada-e04", tipo: "explicita", dificultad: 1,
    enunciado: "¿Qué especia dice en realidad la etiqueta de la bolsita?",
    opciones: ["Cola de diablo", "Cola de ángel", "Nalga de ángel", "Azúcar flor"], correcta: 0,
    explicacion: "Tinta corrida, letra diminuta y una tela demasiado arrugada para inspirar confianza: «Cola de diablo».",
    fuente: { obra: OBRA, parrafo: 52, cita: "—Cola de diablo." }
  }),
  p({
    id: "empanada-e05", tipo: "explicita", dificultad: 1,
    enunciado: "¿Quién le vendió la especia a Lyzi?",
    opciones: ["Don Carlito, el de la tienda vieja", "Kopuko, el del bazar", "La señora Mariko", "Un mercader de Arapas"], correcta: 0,
    explicacion: "«Don Carlito me dijo que servía». Tiene cataratas, le tiemblan las manos y etiqueta con tinta corrida.",
    fuente: { obra: OBRA, parrafo: 57, cita: "—Don Carlito me dijo que servía." }
  }),
  p({
    id: "empanada-e06", tipo: "explicita", dificultad: 1,
    enunciado: "¿A cuántos grados puso Rubí el horno rúnico?",
    opciones: ["Doscientos veinte", "Veinte", "Ciento ochenta", "Cuatrocientos"], correcta: 0,
    explicacion: "La etiqueta pedía no pasar de veinte. Lyzi, pálida: «Eso es mucho más que veinte».",
    fuente: { obra: OBRA, parrafo: 91, cita: "—Doscientos veinte." }
  }),
  p({
    id: "empanada-e07", tipo: "explicita", dificultad: 1,
    enunciado: "Cuando entiende el peligro, ¿qué empieza a escribir Yuki?",
    opciones: ["Su testamento", "Una carta a Halrik", "Una receta corregida", "Una denuncia contra Rubí"], correcta: 0,
    explicacion: "«Mi testamento». Y después, un anexo con prohibiciones para Lyzi.",
    fuente: { obra: OBRA, parrafo: 135, cita: "—Mi testamento." }
  }),
  p({
    id: "empanada-e08", tipo: "explicita", dificultad: 2,
    enunciado: "Según la etiqueta, ¿cuál es la temperatura máxima para usar la hierba?",
    opciones: ["Veinte grados", "Doscientos veinte grados", "Cien grados", "Cero grados"], correcta: 0,
    explicacion: "«Uso recomendado: preparaciones frías, sin aceite, bajo supervisión ritual».",
    fuente: { obra: OBRA, parrafo: 87, cita: "No exponer a temperaturas superiores a veinte grados" }
  }),
  p({
    id: "empanada-e09", tipo: "explicita", dificultad: 2,
    enunciado: "Según Rubí, ¿qué vendió una vez Don Carlito como si fuera azúcar flor?",
    opciones: ["Sal de luna", "Polvo de estrella", "Cola de diablo", "Ceniza de fénix"], correcta: 0,
    explicacion: "Lyzi lo defiende: «Fue un accidente muy brillante».",
    fuente: { obra: OBRA, parrafo: 69, cita: "¡Ese hombre una vez vendió sal de luna como azúcar flor!" }
  }),
  p({
    id: "empanada-e10", tipo: "explicita", dificultad: 2,
    enunciado: "Tras el interrogatorio de Yuki, ¿cuántas empanadas admite Rubí haber comido?",
    opciones: ["Tres, pero una era chica", "Una, por cortesía", "Dos y media", "Ninguna"], correcta: 0,
    explicacion: "Primero dijo «depende de cómo definas una», luego dos, luego dos y media… y al final tres.",
    fuente: { obra: OBRA, parrafo: 113, cita: "—Tres, pero una era chica." }
  }),
  p({
    id: "empanada-e11", tipo: "explicita", dificultad: 2,
    enunciado: "¿Cuántas empanadas comió Yuki, según su propia corrección?",
    opciones: ["Una y tres cuartos", "Una, solo por cortesía", "Ninguna", "Tres"], correcta: 0,
    explicacion: "«La evaluación sensorial requería comparación de bordes». Rubí: «¡La reina también cayó!».",
    fuente: { obra: OBRA, parrafo: 119, cita: "—Una y tres cuartos. La evaluación sensorial requería comparación de bordes." }
  }),
  p({
    id: "empanada-e12", tipo: "explicita", dificultad: 2,
    enunciado: "¿Qué les pasa a las colas de Lyzi cuando empieza la alucinación?",
    opciones: ["Se desvanecen una tras otra", "Se encienden de violeta", "Se multiplican", "Se congelan"], correcta: 0,
    explicacion: "Con un sonido diminuto, «como de burbujas reventando al revés».",
    fuente: { obra: OBRA, parrafo: 153, cita: "sus nueve colas se desvanecieron una tras otra" }
  }),
  p({
    id: "empanada-e13", tipo: "explicita", dificultad: 2,
    enunciado: "Dentro de la alucinación, ¿cómo ve Lyzi a Rubí al principio?",
    opciones: ["Como un ciervo de fuego con delantal", "Como un candelero", "Como una lagartija azul", "Como una empanada gigante"], correcta: 0,
    explicacion: "Rubí se ofende: «me insultó en otro plano». Yuki: «Fue traducción simbólica».",
    fuente: { obra: OBRA, parrafo: 166, cita: "—Ahora mismo pareces un ciervo de fuego con delantal." }
  }),
  p({
    id: "empanada-e14", tipo: "explicita", dificultad: 2,
    enunciado: "¿Cómo ve Yuki a Rubí en la alucinación?",
    opciones: ["Como un candelero", "Como un ciervo de fuego", "Como una lagartija azul", "Como un pez con corona"], correcta: 0,
    explicacion: "Base dorada, tres brazos, fuego inestable y «dudoso autocontrol».",
    fuente: { obra: OBRA, parrafo: 171, cita: "—Rubí... ¿por qué te ves como un candelero?" }
  }),
  p({
    id: "empanada-e15", tipo: "explicita", dificultad: 2,
    enunciado: "¿Cómo ve Rubí a Yuki en la alucinación?",
    opciones: ["Como una lagartija azul", "Como un candelero", "Como un oso blanco", "Como un copo de nieve gigante"], correcta: 0,
    explicacion: "Pequeña, azul, fría y con escamas amarillas: «esta lagartija no viene en son de paz».",
    fuente: { obra: OBRA, parrafo: 173, cita: "¡Eres una lagartija azul!" }
  }),
  p({
    id: "empanada-e16", tipo: "explicita", dificultad: 2,
    enunciado: "¿Qué sonido hace Yuki cuando por fin acepta «rugir» como lagartija?",
    opciones: ["«Krrk»", "«Grrr»", "«Sss»", "«Blom»"], correcta: 0,
    explicacion: "Con dignidad real emite «Krrk». Rubí dictamina que «le faltó convicción».",
    fuente: { obra: OBRA, parrafo: 221, cita: "alzó el mentón con dignidad real y emitió" }
  }),
  p({
    id: "empanada-e17", tipo: "explicita", dificultad: 2,
    enunciado: "¿Qué aparece de pronto bajo los pies de Rubí?",
    opciones: ["Un sofá de gelatina", "Una alfombra de masa", "Un charco de pino", "Una escalera colgante"], correcta: 0,
    explicacion: "Blando, traslúcido y tembloroso. Cada vez que alguien cae encima hace «blom».",
    fuente: { obra: OBRA, parrafo: 236, cita: "apareció algo parecido a un sofá de gelatina: blando, traslúcido, tembloroso." }
  }),
  p({
    id: "empanada-e18", tipo: "explicita", dificultad: 2,
    enunciado: "¿Qué castigo firma Yuki contra Rubí y Lyzi?",
    opciones: ["Un exilio emocional de cuarenta y ocho horas", "Una multa en galletitas de nieve", "Una semana sin cocina", "Una visita al Archivo Hidrográfico"], correcta: 0,
    explicacion: "Toda solicitud de ternura, abracito o validación culinaria será respondida «con silencio institucional».",
    fuente: { obra: OBRA, parrafo: 255, cita: "—Firmo un exilio emocional de cuarenta y ocho horas." }
  }),
  p({
    id: "empanada-e19", tipo: "explicita", dificultad: 3,
    enunciado: "Según la etiqueta, ¿qué pasa si la hierba se expone a más de veinte grados?",
    opciones: ["Su efecto se vuelve multiplicativo", "Pierde todo su efecto", "Se convierte en nalga de ángel", "Solo cambia de sabor"], correcta: 0,
    explicacion: "«No vuelve su efecto sumatorio. Lo vuelve multiplicativo». Y ya se habían comido la primera tanda.",
    fuente: { obra: OBRA, parrafo: 122, cita: "Exponer esta hierba a más de veinte grados no vuelve su efecto sumatorio. Lo vuelve multiplicativo" }
  }),
  p({
    id: "empanada-e20", tipo: "explicita", dificultad: 3,
    enunciado: "¿Qué es lo primero extraño que describe Lyzi al entrar en la alucinación?",
    opciones: ["Un pez con corona tocando campanas dentro de una luna de madera", "Un sol con cara de empanada", "Escaleras que cantan", "Una lagartija leyendo un testamento"], correcta: 0,
    explicacion: "Luego vendrán las tazas que flotan, los árboles que crecen desde el techo y la empanada gigante en el cielo.",
    fuente: { obra: OBRA, parrafo: 154, cita: "—¿Por qué hay un pez con corona tocando campanas dentro de una luna de madera?" }
  }),
  p({
    id: "empanada-e21", tipo: "explicita", dificultad: 3,
    enunciado: "Lyzi ve una empanada gigante girando en el cielo. ¿Cómo la describe?",
    opciones: ["Como un sol culpable, con cara triste", "Como una luna llena dorada", "Como un dragón de masa", "Como un reloj que marca las horas"], correcta: 0,
    explicacion: "«Tiene cara triste. Creo que se arrepiente de habernos cocinado».",
    fuente: { obra: OBRA, parrafo: 159, cita: "Y una empanada gigante gira en el cielo como si fuera un sol culpable." }
  }),
  p({
    id: "empanada-e22", tipo: "explicita", dificultad: 3,
    enunciado: "¿Qué prohíbe el anexo al testamento de Yuki?",
    opciones: ["Que Lyzi acceda sin supervisión a condimentos con nombres anatómicos, demoníacos o ambiguamente celestiales", "Que Rubí use el horno rúnico", "Que alguien vuelva a comprar en la tienda vieja", "Que se cocinen empanadas en el castillo"], correcta: 0,
    explicacion: "Lyzi: «Acepto esa cláusula con dolor».",
    fuente: { obra: OBRA, parrafo: 146, cita: "se prohíbe a Lyzi el acceso no supervisado a condimentos con nombres anatómicos, demoníacos o ambiguamente celestiales." }
  }),
  p({
    id: "empanada-e23", tipo: "explicita", dificultad: 3,
    enunciado: "Rubí pregunta qué clase de rayas tiene el candelero. ¿Qué responde Yuki?",
    opciones: ["Como las de un borracho que no encontró las llaves a tiempo", "Como las de un tigre de Cindralith", "Como las de un mapa de patrullas", "Como las de una masa mal estirada"], correcta: 0,
    explicacion: "Rubí: «¡Eso ya no fue alucinación! ¡Eso fue una evaluación con saña!».",
    fuente: { obra: OBRA, parrafo: 188, cita: "—Como las de un borracho que no encontró las llaves a tiempo." }
  }),
  p({
    id: "empanada-e24", tipo: "explicita", dificultad: 3,
    enunciado: "¿Qué palabra se le escapa a Yuki cuando quiso decir «serio»?",
    opciones: ["Sergio", "Sereno", "Severo", "Sirio"], correcta: 0,
    explicacion: "«Esto es Sergio». Rubí cae de rodillas sobre el sofá de gelatina y Lyzi recupera la octava cola de la risa.",
    fuente: { obra: OBRA, parrafo: 274, cita: "—Esto es Sergio." }
  }),
  p({
    id: "empanada-e25", tipo: "explicita", dificultad: 3,
    enunciado: "Según la teoría de Yuki, ¿qué son las colas de Lyzi dentro de la ilusión?",
    opciones: ["El temporizador: si recupera las nueve, el efecto puede colapsar", "La salida: hay que tirar de ellas", "Un escudo contra la especia", "Las llaves del horno rúnico"], correcta: 0,
    explicacion: "Cada vez que Lyzi ríe con suficiente intensidad, una parte de su percepción vuelve al cuerpo y la ilusión pierde estabilidad.",
    fuente: { obra: OBRA, parrafo: 284, cita: "creo que Lyzi nos tiene atrapadas dentro de su ilusión, y sus colas son el temporizador" }
  }),
  p({
    id: "empanada-e26", tipo: "explicita", dificultad: 3,
    enunciado: "Completa el chiste de Rubí: «¿Qué le dijo una empanada astral a otra empanada astral?»",
    opciones: ["«Nos vemos en otro plano»", "«Te veo en el horno»", "«Qué relleno más profundo»", "«Me tienes en la masa»"], correcta: 0,
    explicacion: "Lyzi emite «un sonido roto» y la novena cola titila sin aparecer del todo.",
    fuente: { obra: OBRA, parrafo: 292, cita: "—Nos vemos en otro plano." }
  }),
  p({
    id: "empanada-e27", tipo: "explicita", dificultad: 3,
    enunciado: "Al volver a la realidad, ¿qué está abrazando Lyzi?",
    opciones: ["Una cebolla", "La bolsita de especias", "Una empanada cruda", "El testamento de Yuki"], correcta: 0,
    explicacion: "«Como si fuera un animalito rescatado». La empanada cruda la tiene Yuki, junto con su testamento.",
    fuente: { obra: OBRA, parrafo: 320, cita: "Lyzi abrazaba una cebolla como si fuera un animalito rescatado." }
  }),
  p({
    id: "empanada-e28", tipo: "explicita", dificultad: 3,
    enunciado: "¿Cómo encuentran la segunda tanda al despertar?",
    opciones: ["Cubierta con un recipiente de metal y asegurada con sellos de hielo", "Quemada dentro del horno", "Comida por completo", "Flotando sobre el mesón"], correcta: 0,
    explicacion: "Sellos de hielo «que ninguna recordaba haber puesto». Y desde abajo, la empanada todavía hace «Krrk».",
    fuente: { obra: OBRA, parrafo: 321, cita: "cubierta con un recipiente de metal y asegurada con varios sellos de hielo que ninguna recordaba haber puesto" }
  }),

  // ——— Implícitas ———
  p({
    id: "empanada-i01", tipo: "implicita", dificultad: 1,
    enunciado: "¿Qué especia pedía en realidad la receta tradicional de Cindralith occidental?",
    opciones: ["Nalga de ángel", "Cola de ángel", "Cola de diablo", "Sal de luna"], correcta: 0,
    explicacion: "Rubí lo da por hecho cuando se estira satisfecha: «Menos mal que encontraste nalga de ángel, Lyzi». Ahí empieza el desastre.",
    fuente: { obra: OBRA, parrafo: 33, cita: "—Menos mal que encontraste nalga de ángel, Lyzi." }
  }),
  p({
    id: "empanada-i02", tipo: "implicita", dificultad: 1,
    enunciado: "Cuando Yuki ve a Rubí como un candelero, Lyzi dice: «Eso significa que ya no estoy sola». ¿Qué quiere decir?",
    opciones: ["Que la especia ya les hizo efecto a las tres", "Que Noctalypse llegó a la cocina", "Que Rollito la siguió hasta ahí", "Que la empanada del horno despertó"], correcta: 0,
    explicacion: "Hasta ese momento solo Lyzi alucinaba. Ahora Yuki ve un candelero y Rubí, una lagartija azul: las tres comieron de la primera tanda.",
    fuente: { obra: OBRA, parrafo: 175, cita: "—Eso significa que ya no estoy sola..." }
  }),
  p({
    id: "empanada-i03", tipo: "implicita", dificultad: 2,
    enunciado: "Rubí protesta «¡Pero si todavía no termino!» y Yuki responde «Precisamente». ¿Qué quiere evitar Yuki?",
    opciones: ["Que Rubí siga cargando la receta de ají", "Que Rubí lea la receta en voz alta", "Que Lyzi se vaya sin la lista", "Que la masa se enfríe"], correcta: 0,
    explicacion: "Rubí iba en «¡Muchísimo ají!». Yuki le quita la hoja y se la entrega a Lyzi con una orden: traer «exactamente lo que está escrito».",
    fuente: { obra: OBRA, parrafo: 5, cita: "—Precisamente." }
  }),
  p({
    id: "empanada-i04", tipo: "implicita", dificultad: 2,
    enunciado: "Yuki dice que tenía su testamento «a medio avanzar desde esta mañana». ¿Qué revela eso?",
    opciones: ["Que ya esperaba que la tarde de cocina terminara en desastre", "Que estaba enferma", "Que pensaba abdicar", "Que lo escribe todos los días por ley"], correcta: 0,
    explicacion: "«Por si acaso»: por si alguien traía una especia sin confirmar nombre, región, preparación y compatibilidad térmica. Exactamente lo que pasó.",
    fuente: { obra: OBRA, parrafo: 137, cita: "—Lo tenía a medio avanzar desde esta mañana. Por si acaso." }
  }),
  p({
    id: "empanada-i05", tipo: "implicita", dificultad: 2,
    enunciado: "¿Por qué Yuki aclara que «incluso Lyzi» debería preocuparse?",
    opciones: ["Porque la etiqueta advierte efectos letales también para seres «no tan mortales», como una kitsune de nueve colas", "Porque Lyzi comió más que nadie", "Porque Lyzi es alérgica al ají", "Porque Don Carlito es pariente de Lyzi"], correcta: 0,
    explicacion: "Rubí pregunta qué significa «no tan mortales». La respuesta de Yuki deja claro que la advertencia alcanza a Lyzi.",
    fuente: { obra: OBRA, parrafo: 130, cita: "—Significa que incluso Lyzi debería preocuparse." }
  }),
  p({
    id: "empanada-i06", tipo: "implicita", dificultad: 2,
    enunciado: "¿Por qué Rubí se lanza a contar los peores chistes que conoce?",
    opciones: ["Porque cada carcajada de Lyzi le devuelve una cola y acerca el fin de la ilusión", "Para distraer a la empanada del horno", "Para que Yuki le levante el castigo", "Porque la especia la obliga a hablar"], correcta: 0,
    explicacion: "Yuki lo pide en serio: «ráfaga de chistes malos. Los peores». Con «Escama-lada diplomática» aparece la novena cola.",
    fuente: { obra: OBRA, parrafo: 306, cita: "La novena cola apareció completa con un PAAF más fuerte que los anteriores." }
  }),
  p({
    id: "empanada-i07", tipo: "implicita", dificultad: 3,
    enunciado: "Desde el horno, la empanada responde «Krrk». ¿Qué está haciendo?",
    opciones: ["Imitar el rugido de lagartija de Yuki, mejor que ella", "Avisar que se está quemando", "Llamar a Don Carlito", "Pedir otra mordida"], correcta: 0,
    explicacion: "Rubí: «La empanada acaba de rugir mejor que tú». La empanada sellada había desarrollado intención: ya había hablado («Otra mordida…») y ahora escucha.",
    fuente: { obra: OBRA, parrafo: 263, cita: "—La empanada acaba de rugir mejor que tú —dijo Rubí, muy despacio." }
  }),
  p({
    id: "empanada-i08", tipo: "implicita", dificultad: 3,
    enunciado: "Al final, Yuki extiende el exilio emocional a setenta y dos horas. ¿Qué lo provoca?",
    opciones: ["Que Rubí vuelva a decir «Sergio» justo después de que Yuki lo prohibiera", "Que Lyzi pida otra empanada", "Que la empanada vuelva a hablar", "Que Rubí encienda otra vez el horno"], correcta: 0,
    explicacion: "«Y nadie vuelve a decir Sergio». Rubí lo susurra de inmediato y Lyzi se muere de risa. La condena vuelve a las setenta y dos horas originales.",
    fuente: { obra: OBRA, parrafo: 326, cita: "Y nadie vuelve a decir Sergio." }
  }),

  // ——— Conexiones ———
  {
    id: "empanada-c01", obra: OBRA, tipo: "conexion", dificultad: 3,
    // Canon confirmado por el autor (13-oct-2026): las empanadas de Cindralith
    // occidental llevan nalga de ángel (la versión publicada lo deja implícito
    // en el comentario de Rubí). Se activa cuando el Torneo esté publicado.
    enunciado:
      "En el Gran Torneo Etílico de Glaciem, una confesión sobre las empanadas de Cindralith occidental desata una pelea. Esas empanadas llevan la especia que, en La empanada mágica, a Lyzi le daba vergüenza nombrar. ¿Cuál es?",
    opciones: ["Nalga de ángel", "Cola de ángel", "Cola de diablo", "Pluma de Fénix"], correcta: 0,
    explicacion:
      "La receta tradicional de Cindralith occidental pedía nalga de ángel. Lyzi dijo «Cola de ángel» porque «nalga de ángel» le sonaba feo, y Don Carlito terminó vendiéndole cola de diablo.",
    fuente: { obra: OBRA, parrafo: 41, cita: "—Cola de ángel —repitió Lyzi, con una dignidad cada vez más frágil—. Es que «nalga de ángel» sonaba feo." },
    requiere: [OBRA, TORNEO],
    spoilers: [TORNEO]
  }
];
