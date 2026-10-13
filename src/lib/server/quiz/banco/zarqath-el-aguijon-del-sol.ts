import type { PreguntaQuiz } from "../logica";

/**
 * Banco · Zarqath, el aguijón del sol. Párrafos = índice en `paragraphs` de
 * src/data/stories.ts (texto publicado). Ids estables: no reutilizar.
 * Evitado a propósito: el país de Ingrid (no se nombra). Confirmado por el
 * autor (2026-10-13): el faraón del nombre perdido es Athem (lo dice su
 * música, no el texto) y Arapas es un mercado dentro de Ashraqem.
 */

const OBRA = "zarqath-el-aguijon-del-sol";
const solo = [OBRA] as const;

type Base = Omit<PreguntaQuiz, "obra" | "requiere">;
const p = (pregunta: Base): PreguntaQuiz => ({ ...pregunta, obra: OBRA, requiere: solo });

export const BANCO_ZARQATH: readonly PreguntaQuiz[] = [
  // ——— Explícitas ———
  p({
    id: "zarqath-e01", tipo: "explicita", dificultad: 1,
    enunciado: "¿Qué le llama la atención a Yuki sobre Rubí al comienzo del relato?",
    opciones: ["Que lleva una semana sin causar un desastre", "Que no ha vuelto a entrenar", "Que se mudó a Glaciem", "Que dejó de comer picante"], correcta: 0,
    explicacion: "«No ha causado un desastre en una semana»: ni cocinas incendiadas, ni duelos con vendedores, ni la palabra patada en contexto diplomático.",
    fuente: { obra: OBRA, parrafo: 14, cita: "—No ha causado un desastre en una semana." }
  }),
  p({
    id: "zarqath-e02", tipo: "explicita", dificultad: 1,
    enunciado: "¿A quién espera Rubí con tanta impaciencia?",
    opciones: ["A Ingrid, una antigua amiga", "A su madre", "A un comerciante de Arapas", "A Noctalypse"], correcta: 0,
    explicacion: "Lyzi lo cuenta: Rubí espera a «una antigua amiga» que viene desde el otro lado de la frontera sur de Cindralith. Más adelante se dice su nombre: Ingrid.",
    fuente: { obra: OBRA, parrafo: 24, cita: "—Una antigua amiga. Viene de lejos, desde el otro lado de la frontera sur de Cindralith." }
  }),
  p({
    id: "zarqath-e03", tipo: "explicita", dificultad: 1,
    enunciado: "¿Cómo se llama la espada de Rubí?",
    opciones: ["Vulcania Ignis", "Colibrí de Glaciem", "Aguijón del Sol", "Llama Inextinguible"], correcta: 0,
    explicacion: "Con el escorpión trabado en el río, Rubí «desenvainó Vulcania Ignis».",
    fuente: { obra: OBRA, parrafo: 785, cita: "Rubí no necesitó que se lo repitieran. Desenvainó Vulcania Ignis" }
  }),
  p({
    id: "zarqath-e04", tipo: "explicita", dificultad: 1,
    enunciado: "¿Qué hace Yuki en la posada de piedra, que no tiene puertas?",
    opciones: ["Construye una puerta de hielo", "Duerme en el patio", "Pide otra habitación", "Cuelga su capa en el arco"], correcta: 0,
    explicacion: "Rubí despierta temblando frente a «una preciosa y absurda puerta de hielo azul pálido» con manilla y patrón de copos.",
    fuente: { obra: OBRA, parrafo: 425, cita: "vio, en la entrada, una preciosa y absurda puerta de hielo azul pálido" }
  }),
  p({
    id: "zarqath-e05", tipo: "explicita", dificultad: 1,
    enunciado: "¿Qué son las «vaquitas del desierto»?",
    opciones: ["Escarabajos con manchas que nadan bajo la arena", "Vacas criadas en oasis", "Lagartos de carga", "Camellos pequeños"], correcta: 0,
    explicacion: "«No son vacas. Son escarabajos»: les dicen vaquitas por las manchas y viajan bajo la arena.",
    fuente: { obra: OBRA, parrafo: 556, cita: "—Se les dice vaquitas porque tienen manchas parecidas a las vacas. […] Viajan bajo la arena." }
  }),
  p({
    id: "zarqath-e06", tipo: "explicita", dificultad: 1,
    enunciado: "¿Qué ocurre cuando Rubí enciende una llama para iluminar la tumba?",
    opciones: ["El fuego se desprende de su mano y Zarqath lo absorbe", "Zarqath huye de la luz", "La llama se apaga sola", "Se encienden las antorchas del templo"], correcta: 0,
    explicacion: "La llama «se desprendió de su palma», se estiró en un hilo naranja y se hundió en el cuerpo de Zarqath, que encendió una pinza por dentro.",
    fuente: { obra: OBRA, parrafo: 762, cita: "El fuego no se apagó: se desprendió de su palma, como si algo tirara de él desde el otro lado de la sala." }
  }),
  p({
    id: "zarqath-e07", tipo: "explicita", dificultad: 2,
    enunciado: "Según Rubí, ¿cuál es la temperatura de un día normal en Cindralith?",
    opciones: ["Cuarenta grados", "Treinta grados", "Cincuenta grados", "Veinticinco grados"], correcta: 0,
    explicacion: "«Depende. En días normales, cuarenta grados». Para Yuki, «cuarenta grados no es una temperatura. Es una acusación».",
    fuente: { obra: OBRA, parrafo: 95, cita: "—Depende. En días normales, cuarenta grados." }
  }),
  p({
    id: "zarqath-e08", tipo: "explicita", dificultad: 2,
    enunciado: "Según la leyenda, ¿cuándo se alza la Pirámide de Luz?",
    opciones: [
      "Cuando aparece alguien muy virtuoso, intachable",
      "Cuando hay luna llena sobre el desierto",
      "Cuando muere un faraón",
      "Cuando alguien sobrevive a Zarqath"
    ], correcta: 0,
    explicacion: "«La Pirámide de Luz solo se alza cuando aparece alguien muy virtuoso. Alguien intachable».",
    fuente: { obra: OBRA, parrafo: 142, cita: "—La leyenda dice que la Pirámide de Luz solo se alza cuando aparece alguien muy virtuoso. Alguien intachable." }
  }),
  p({
    id: "zarqath-e09", tipo: "explicita", dificultad: 2,
    enunciado: "¿Qué tiene de particular el fruto de los árboles amatistas?",
    opciones: ["Se endurece y queda una amatista colgando del árbol", "Es una fruta violeta muy dulce", "Explota al madurar", "Solo crece de noche"], correcta: 0,
    explicacion: "«No dan fruto normal. El fruto se endurece y queda una amatista colgando del árbol».",
    fuente: { obra: OBRA, parrafo: 189, cita: "No dan fruto normal. El fruto se endurece y queda una amatista colgando del árbol." }
  }),
  p({
    id: "zarqath-e10", tipo: "explicita", dificultad: 2,
    enunciado: "¿Qué postre pide Lyzi en la pastelería de Arapas?",
    opciones: ["Entrada al Oasis", "Sombra Verde", "Una Piedra en el Zapato", "Luna sobre Piedra"], correcta: 0,
    explicacion: "Del menú verde, sin ají escondido: «Entonces quiero ese». Sombra Verde es de Yuki y Una Piedra en el Zapato, de Rubí.",
    fuente: { obra: OBRA, parrafo: 275, cita: "—Entrada al Oasis —leyó—. Hojarasca de manjar y crema fría, vainilla clara, polvo de almendra… sin ají escondido." }
  }),
  p({
    id: "zarqath-e11", tipo: "explicita", dificultad: 2,
    enunciado: "¿De dónde es el mesero que sugirió el «menú suave para visitantes»?",
    opciones: ["De Sylvalis", "De Glaciem", "De Arapas", "De Lirethar"], correcta: 0,
    explicacion: "«—Soy de Sylvalis», de un pueblo cerca del borde oriental; vino a Arapas pensando que exageraban con la comida.",
    fuente: { obra: OBRA, parrafo: 250, cita: "—Soy de Sylvalis." }
  }),
  p({
    id: "zarqath-e12", tipo: "explicita", dificultad: 2,
    enunciado: "¿Por qué descartan viajar en águilas gigantes?",
    opciones: ["Porque es demasiado caro", "Porque las águilas no vuelan de día", "Porque Rubí les teme", "Porque el gremio lo prohíbe"], correcta: 0,
    explicacion: "Lyzi no quería «sentirse presa», pero lo que zanja el asunto es Yuki revisando las tarifas: «Demasiado caro».",
    fuente: { obra: OBRA, parrafo: 540, cita: "—Demasiado caro." }
  }),
  p({
    id: "zarqath-e13", tipo: "explicita", dificultad: 2,
    enunciado: "¿Cómo llaman a los tiburones de duna?",
    opciones: ["Qharvass", "Vaquitas", "Zarqath", "Areneros"], correcta: 0,
    explicacion: "La guía los nombra cuando aparecen las aletas: «Qharvass. Tiburones de duna».",
    fuente: { obra: OBRA, parrafo: 672, cita: "—Qharvass —dijo la guía—. Tiburones de duna." }
  }),
  p({
    id: "zarqath-e14", tipo: "explicita", dificultad: 2,
    enunciado: "¿De qué material es el aguijón de Zarqath?",
    opciones: ["Diamante negro y transparente", "Obsidiana", "Oro fundido", "Vidrio de arena"], correcta: 0,
    explicacion: "«En la punta, el aguijón era una pieza de diamante negro y transparente, facetada como una herramienta hecha para perforar montañas».",
    fuente: { obra: OBRA, parrafo: 682, cita: "el aguijón era una pieza de diamante negro y transparente" }
  }),
  p({
    id: "zarqath-e15", tipo: "explicita", dificultad: 2,
    enunciado: "¿Por qué al faraón del nombre perdido lo llamaban «del mandato áureo»?",
    opciones: [
      "Porque declaraba algo y eso se volvía verdad",
      "Porque se cubría de oro",
      "Porque conquistó todo Cindralith",
      "Porque mandaba sobre los dragones"
    ], correcta: 0,
    explicacion: "«No fue un conquistador […] Declaraba. Decía una cosa, y la cosa se volvía verdad. Por eso le pusieron mandato áureo».",
    fuente: { obra: OBRA, parrafo: 748, cita: "Declaraba. Decía una cosa, y la cosa se volvía verdad. Por eso le pusieron mandato áureo." }
  }),
  p({
    id: "zarqath-e16", tipo: "explicita", dificultad: 2,
    enunciado: "¿Qué fue lo último que declaró el faraón?",
    opciones: ["Que la muerte no lo tocaría", "Que el sol nunca se pondría", "Que su tumba jamás sería encontrada", "Que Cindralith sería eterna"], correcta: 0,
    explicacion: "«En un arrebato, delante de toda su corte, declaró que la muerte no lo tocaría».",
    fuente: { obra: OBRA, parrafo: 750, cita: "En un arrebato, delante de toda su corte, declaró que la muerte no lo tocaría." }
  }),
  p({
    id: "zarqath-e17", tipo: "explicita", dificultad: 2,
    enunciado: "Cuando Rubí deja de contenerse, ¿en qué forma se le desborda el aura?",
    opciones: ["En mariposas de llama", "En un dragón de fuego", "En lluvia de chispas", "En alas de ceniza"], correcta: 0,
    explicacion: "«El fuego que le salía del cuerpo se deshizo en mariposas, decenas de mariposas de llama».",
    fuente: { obra: OBRA, parrafo: 848, cita: "El fuego que le salía del cuerpo se deshizo en mariposas, decenas de mariposas de llama" }
  }),
  p({
    id: "zarqath-e18", tipo: "explicita", dificultad: 2,
    enunciado: "¿Qué levanta Yuki en pleno desierto para recibir a Rubí cuando cae?",
    opciones: ["Una rampa de hielo, como un tobogán", "Una cúpula de nieve", "Un lago congelado", "Una red de escarcha"], correcta: 0,
    explicacion: "Con la energía de Lyzi levanta «no una pared: una rampa. Un tobogán largo, curvo, imposible».",
    fuente: { obra: OBRA, parrafo: 866, cita: "No una pared: una rampa. Un tobogán largo, curvo, imposible" }
  }),
  p({
    id: "zarqath-e19", tipo: "explicita", dificultad: 3,
    enunciado: "Según Yuki, ¿entre qué temperaturas se mantiene Glaciem?",
    opciones: ["Entre menos seis y ocho grados", "Entre menos veinte y cero", "Entre cero y diez", "Entre menos diez y menos dos"], correcta: 0,
    explicacion: "«En Glaciem nos mantenemos entre menos seis y ocho grados». Para Rubí, «un congelador con bandera».",
    fuente: { obra: OBRA, parrafo: 98, cita: "—En Glaciem nos mantenemos entre menos seis y ocho grados —dijo Yuki." }
  }),
  p({
    id: "zarqath-e20", tipo: "explicita", dificultad: 3,
    enunciado: "Según la leyenda de la Pirámide de Luz, ¿quién cruza el cielo en su arca para ofrecer trascender?",
    opciones: ["Ra", "Fulgor", "El faraón del mandato áureo", "Solkán"], correcta: 0,
    explicacion: "«Dicen que el mismísimo Ra cruza el cielo en su arca y te ofrece trascender».",
    fuente: { obra: OBRA, parrafo: 142, cita: "Dicen que el mismísimo Ra cruza el cielo en su arca y te ofrece trascender." }
  }),
  p({
    id: "zarqath-e21", tipo: "explicita", dificultad: 3,
    enunciado: "¿Por qué pica la miel de las abejas areneras?",
    opciones: [
      "Porque su polen se mezcla con sal mineral",
      "Porque las abejas comen ají",
      "Porque la fermentan al sol",
      "Porque le agregan pimienta en el mercado"
    ], correcta: 0,
    explicacion: "Recolectan polen de las pocas flores del desierto, «pero el polen se mezcla con sal mineral. Cuando usan mucha sal […] pica».",
    fuente: { obra: OBRA, parrafo: 347, cita: "el polen se mezcla con sal mineral. Cuando usan mucha sal, aparte de darte una sed terrible, pica." }
  }),
  p({
    id: "zarqath-e22", tipo: "explicita", dificultad: 3,
    enunciado: "¿Por qué el anciano que vende miel tiene las manos llenas de quemaduras?",
    opciones: [
      "Porque el veneno de las abejas areneras produce pequeñas quemaduras",
      "Porque cocina la miel al fuego",
      "Porque trabajó en una forja",
      "Porque recoge amatistas calientes"
    ], correcta: 0,
    explicacion: "Rubí lo explica: «Las abejas areneras no tienen un veneno común. Tienen uno que produce pequeñas quemaduras».",
    fuente: { obra: OBRA, parrafo: 400, cita: "—Las abejas areneras no tienen un veneno común. Tienen uno que produce pequeñas quemaduras." }
  }),
  p({
    id: "zarqath-e23", tipo: "explicita", dificultad: 3,
    enunciado: "Dentro de la vaquita, ¿cuál de las colas de Lyzi está «emocionalmente indispuesta»?",
    opciones: ["La número ocho", "La número tres", "La número nueve", "La número uno"], correcta: 0,
    explicacion: "«—Perdón —dijo Lyzi desde la bolsa—. La número ocho está emocionalmente indispuesta».",
    fuente: { obra: OBRA, parrafo: 607, cita: "La número ocho está emocionalmente indispuesta." }
  }),
  p({
    id: "zarqath-e24", tipo: "explicita", dificultad: 3,
    enunciado: "¿Qué señal deben dar al volver, según la guía de las vaquitas?",
    opciones: ["Golpear tres veces el caparazón de la vaquita", "Encender una antorcha", "Silbar dos veces", "Clavar una bandera en la duna"], correcta: 0,
    explicacion: "«Si vuelven, golpeen tres veces el caparazón de la vaquita. Si no vuelven, no golpeen nada».",
    fuente: { obra: OBRA, parrafo: 717, cita: "Si vuelven, golpeen tres veces el caparazón de la vaquita. Si no vuelven, no golpeen nada." }
  }),
  p({
    id: "zarqath-e25", tipo: "explicita", dificultad: 3,
    enunciado: "¿Qué dos palabras gritaba Yuki al probar la coraza de Zarqath con láminas de hielo?",
    opciones: ["«Duro» y «cede»", "«Frío» y «calor»", "«Ahora» y «espera»", "«Firme» y «blando»"], correcta: 0,
    explicacion: "Si el hielo se derretía despacio, gritaba «duro»; cuando se vaporizaba apenas tocaba la coraza, «cede».",
    fuente: { obra: OBRA, parrafo: 815, cita: "Cuando el hielo se derretía despacio, gritaba una sola palabra: «duro». […] gritó otra: «cede»." }
  }),
  p({
    id: "zarqath-e26", tipo: "explicita", dificultad: 3,
    enunciado: "¿Cuántos cazarrecompensas entran con antorchas a la tumba?",
    opciones: ["Quince", "Cinco", "Ocho", "Veinte"], correcta: 0,
    explicacion: "«Entraron quince. Cazarrecompensas, por el ruido y por la forma de pisar».",
    fuente: { obra: OBRA, parrafo: 806, cita: "Entraron quince. Cazarrecompensas, por el ruido y por la forma de pisar" }
  }),
  p({
    id: "zarqath-e27", tipo: "explicita", dificultad: 3,
    enunciado: "En el Templo del Silencio, ¿de qué colores se tiñen las flores blancas al tocarlas el agua lunar?",
    opciones: ["Lila pálido y azul profundo", "Dorado y rojo", "Plateado y verde", "Rosa y violeta"], correcta: 0,
    explicacion: "«Las primeras tomaron un lila pálido, casi tímido; otras […] se tiñeron de un azul profundo».",
    fuente: { obra: OBRA, parrafo: 962, cita: "Las primeras tomaron un lila pálido, casi tímido; otras, más cercanas al centro, se tiñeron de un azul profundo" }
  }),
  p({
    id: "zarqath-e28", tipo: "explicita", dificultad: 3,
    enunciado: "¿Cómo describe Yuki el fenómeno del Templo del Silencio?",
    opciones: ["«Astronómicamente obsceno. Y precioso»", "«Un efecto óptico notable»", "«Inaceptablemente hermoso»", "«Cero poesía, pura física»"], correcta: 0,
    explicacion: "Yuki, con su cara seria de siempre: «Astronómicamente obsceno —dijo—. Y precioso».",
    fuente: { obra: OBRA, parrafo: 967, cita: "—Astronómicamente obsceno —dijo—. Y precioso." }
  }),

  p({
    id: "zarqath-e29", tipo: "explicita", dificultad: 1,
    enunciado: "¿Qué advierte Rubí al llegar al mercado de Arapas?",
    opciones: ["Que a toda la comida le ponen picante", "Que no se puede regatear", "Que hay ladrones en cada puesto", "Que se cierra al anochecer"], correcta: 0,
    explicacion: "«Cuidado aquí: a toda la comida le ponen picante. A toda». Lyzi lo comprobará más de una vez.",
    fuente: { obra: OBRA, parrafo: 162, cita: "Llegamos al mercado de Arapas. Cuidado aquí: a toda la comida le ponen picante. A toda." }
  }),
  // ——— Implícitas ———
  p({
    id: "zarqath-i01", tipo: "implicita", dificultad: 1,
    enunciado: "Para Rubí, ¿cuál fue la verdadera recompensa de toda la aventura?",
    opciones: ["Ver llegar a Ingrid sana y salva", "El oro del gremio", "Vencer a Zarqath", "Que la llamaran heroína"], correcta: 0,
    explicacion: "El oro quedó olvidado en un cajón: «Esa era la recompensa que había estado esperando toda la semana, la única que le importaba de verdad».",
    fuente: { obra: OBRA, parrafo: 888, cita: "Esa era la recompensa que había estado esperando toda la semana, la única que le importaba de verdad" }
  }),
  p({
    id: "zarqath-i02", tipo: "implicita", dificultad: 1,
    enunciado: "¿Por qué los sobrevivientes escondidos en la tumba no encendían sus antorchas?",
    opciones: [
      "Porque la luz y el fuego despiertan a Zarqath",
      "Porque se les acabó el aceite",
      "Porque el humo no tenía salida",
      "Porque esperaban la noche"
    ], correcta: 0,
    explicacion: "«Cada vez que alguien prende algo, esa cosa se mueve». Yuki lo entiende de inmediato: la luz lo despierta.",
    fuente: { obra: OBRA, parrafo: 799, cita: "—Llevamos tres días así. A oscuras. Cada vez que alguien prende algo, esa cosa se mueve." }
  }),
  p({
    id: "zarqath-i03", tipo: "implicita", dificultad: 2,
    enunciado: "¿Qué revela la frase de que Zarqath «sirve como perro suelto contra invasores»?",
    opciones: [
      "Que el imperio lo tolera porque también daña a sus enemigos",
      "Que Zarqath es la mascota de Solkán",
      "Que el gremio lo entrenó para cuidar la frontera",
      "Que los invasores lo trajeron a Cindralith"
    ], correcta: 0,
    explicacion: "A Rubí le entra mal precisamente por eso: «una amenaza podía quedarse suelta mientras mordiera en la dirección conveniente».",
    fuente: { obra: OBRA, parrafo: 474, cita: "una amenaza podía quedarse suelta mientras mordiera en la dirección conveniente." }
  }),
  p({
    id: "zarqath-i04", tipo: "implicita", dificultad: 2,
    enunciado: "¿Por qué la espada de Rubí rebota la primera vez que golpea a Zarqath?",
    opciones: [
      "Porque el río lo había enfriado y frío es impenetrable",
      "Porque Rubí no encendió la espada",
      "Porque golpeó el aguijón de diamante",
      "Porque Zarqath estaba dormido"
    ], correcta: 0,
    explicacion: "El agua lo enfrió y lo volvió lento… y duro: «Está frío —dijo Yuki—. Frío es impenetrable».",
    fuente: { obra: OBRA, parrafo: 788, cita: "—Está frío —dijo Yuki—. Frío es impenetrable." }
  }),
  p({
    id: "zarqath-i05", tipo: "implicita", dificultad: 2,
    enunciado: "¿Por qué Lyzi ilumina la evacuación con luciérnagas de aura y no con fuego?",
    opciones: [
      "Porque son frías y no dan calor que Zarqath pueda absorber",
      "Porque el fuego asusta a los niños",
      "Porque no tenían antorchas",
      "Porque las luciérnagas espantan a los Qharvass"
    ], correcta: 0,
    explicacion: "Eran «pequeñas chispas frías […] sin una pizca de calor que Zarqath pudiera oler».",
    fuente: { obra: OBRA, parrafo: 804, cita: "pequeñas chispas frías […] suaves, plateadas, sin una pizca de calor que Zarqath pudiera oler." }
  }),
  p({
    id: "zarqath-i06", tipo: "implicita", dificultad: 2,
    enunciado: "¿Qué relación hay entre la «semana sin incendios» del primer capítulo y la victoria final?",
    opciones: [
      "Rubí se tragó el fuego toda la semana y lo liberó de golpe para sobrecargar a Zarqath",
      "Ninguna: es solo una broma inicial",
      "Rubí descansó para estar fuerte en la pelea",
      "Rubí ahorró dinero para contratar ayuda"
    ], correcta: 0,
    explicacion: "Lyzi se lo nota («Llevas días tragándote fuego») y al final «toda la semana le salió de golpe»: una nova que llevó a Zarqath hasta volverse blando.",
    fuente: { obra: OBRA, parrafo: 839, cita: "Toda la semana le salió de golpe. Los días contando fechas, la rabia tragada, las chispas que no había soltado" }
  }),
  p({
    id: "zarqath-i07", tipo: "implicita", dificultad: 3,
    enunciado: "Si el fuego alimentaba a Zarqath, ¿por qué Rubí terminó llenando la cámara de fuego?",
    opciones: [
      "Para calentarlo hasta volverlo blando y vulnerable",
      "Porque perdió el control",
      "Para iluminar la salida",
      "Para cegar a los cazarrecompensas"
    ], correcta: 0,
    explicacion: "Su propio razonamiento: «Caliente, rápido. Demasiado caliente… blando». La piedra que cayó lo confirmó: la placa se hundió como cera.",
    fuente: { obra: OBRA, parrafo: 834, cita: "—Frío, imposible. Caliente, rápido. Demasiado caliente… —respiró— …blando." }
  }),
  p({
    id: "zarqath-i08", tipo: "implicita", dificultad: 3,
    enunciado: "¿Por qué clavar la espada en el cristal del dorso fue decisivo?",
    opciones: [
      "Era el regulador de presión: Zarqath ya no podía tragar ni soltar calor, y reventó",
      "Era su corazón",
      "Era el único punto sin coraza",
      "Ahí guardaba el fuego de Rubí"
    ], correcta: 0,
    explicacion: "«Era el regulador, el que dejaba entrar y salir la presión». Sin poder hacer ninguna de las dos cosas, empezó a inflarse.",
    fuente: { obra: OBRA, parrafo: 852, cita: "Era el regulador, el que dejaba entrar y salir la presión. Con la espada atravesándolo, Zarqath dejó de poder hacer las dos cosas." }
  }),
  p({
    id: "zarqath-i09", tipo: "implicita", dificultad: 3,
    enunciado: "Cuando Rubí cuenta la última declaración del faraón, ¿qué conversación del viaje recuerda Lyzi?",
    opciones: [
      "Cuando Yuki dijo que sería bonito poder saltarse la muerte",
      "Cuando Rubí prometió proteger a Ingrid",
      "Cuando hablaron del picante de Arapas",
      "Cuando la guía nombró a Zarqath"
    ], correcta: 0,
    explicacion: "«Eso es exactamente lo que tú dijiste que sería bonito», le murmura a Yuki: ella había dicho que saltarse el final común era una idea esperanzadora.",
    fuente: { obra: OBRA, parrafo: 751, cita: "—Eso es exactamente lo que tú dijiste que sería bonito —murmuró Lyzi, mirando a Yuki." }
  }),
  p({
    id: "zarqath-i10", tipo: "implicita", dificultad: 3,
    enunciado: "El relato nunca dice el nombre del faraón del mandato áureo, el que declaró que la muerte no lo tocaría. Pero en Caelyndor la música también cuenta. ¿Cómo se llamaba?",
    opciones: ["Athem", "Solkán", "Zarqath", "Lencorias"], correcta: 0,
    explicacion: "El Archivo musical lo nombra: «Cindralith — La Tumba del Faraón Athem». Y su tema propio responde a su última declaración: «Athem — Inclínate, Muerte».",
    fuente: { obra: OBRA, parrafo: 746, cita: "—El faraón del nombre perdido —dijo—. Los viejos lo llaman el faraón del mandato áureo." }
  }),
  p({
    id: "zarqath-i11", tipo: "implicita", dificultad: 3,
    enunciado: "Las tres llegan al mercado de Arapas, se informan en el gremio y, tras la tumba, «volvieron a Ashraqem», donde el gremio paga la recompensa. ¿Qué es Arapas?",
    opciones: ["Un mercado dentro de Ashraqem", "Una ciudad vecina de Ashraqem", "El nombre del gremio de Ashraqem", "Un oasis en el camino a la tumba"], correcta: 0,
    explicacion: "Desde el mercado y el gremio parten en vaquitas hacia la tumba, y al regresar «volvieron a Ashraqem»: el mercado de Arapas está dentro de Ashraqem.",
    fuente: { obra: OBRA, parrafo: 873, cita: "Volvieron a Ashraqem con la caravana entera detrás." }
  })
];
