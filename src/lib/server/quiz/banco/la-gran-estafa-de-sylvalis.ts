import type { PreguntaQuiz } from "../logica";

/**
 * Banco · La Gran Estafa de Sylvalis. Párrafos = índice en `paragraphs` de
 * src/data/stories.ts (texto publicado). Ids estables: no reutilizar.
 */

const OBRA = "la-gran-estafa-de-sylvalis";
const TORNEO = "gran-torneo-etilico-de-glaciem";
const solo = [OBRA] as const;

export const BANCO_LA_GRAN_ESTAFA: readonly PreguntaQuiz[] = [
  // ——— Explícitas ———
  {
    id: "estafa-e01", obra: OBRA, tipo: "explicita", dificultad: 1,
    enunciado: "¿A quién se llevan los gansos como garantía de la deuda?",
    opciones: ["A Lyzi", "A Yuki", "A Noctalypse", "Al mapache"], correcta: 0,
    explicacion: "Lyzi se ofrece como garantía y el Jefe Ganso la acepta como sirvienta hasta que «la colorada» pague.",
    fuente: { obra: OBRA, parrafo: 24, cita: "Denos tiempo para reunir el efectivo —dijo con su voz melodiosa—. Yo seré la garantía." },
    requiere: solo
  },
  {
    id: "estafa-e02", obra: OBRA, tipo: "explicita", dificultad: 1,
    enunciado: "¿Qué propone Rubí para conseguir el dinero rápido?",
    opciones: ["Robar un banco", "Vender su espada", "Apostar en la taberna", "Pedirle prestado a Yuki"], correcta: 0,
    explicacion: "Apenas termina su duelo teatral, Rubí declara: «Ahora bien… robemos un banco».",
    fuente: { obra: OBRA, parrafo: 39, cita: "Listo. Se acabó el duelo. Ahora bien… robemos un banco." },
    requiere: solo
  },
  {
    id: "estafa-e03", obra: OBRA, tipo: "explicita", dificultad: 1,
    enunciado: "¿Qué animal les da el dato de la reliquia robada?",
    opciones: ["Un mapache", "Un zorro", "Un cuervo", "Un ganso desertor"], correcta: 0,
    explicacion: "Un mapache asoma desde un tronco hueco: «Hablen sin mirarme… Tengo el dato».",
    fuente: { obra: OBRA, parrafo: 51, cita: "Un mapache, con su antifaz natural, asomó la cabeza sin mirarlos directamente." },
    requiere: solo
  },
  {
    id: "estafa-e04", obra: OBRA, tipo: "explicita", dificultad: 1,
    enunciado: "¿En qué escapa Noctalypse de la casa de remates?",
    opciones: ["En un cerdito rosado", "En un avecestruz", "En la carreta de fuego", "Sobre su propia sombra"], correcta: 0,
    explicacion: "Noct aparece con la reliquia bajo el brazo, montado en un cerdito rosado que corre como un rayo.",
    fuente: { obra: OBRA, parrafo: 160, cita: "Sombrío, impecable, con la reliquia bajo el brazo y montado en… un cerdito rosado." },
    requiere: solo
  },
  {
    id: "estafa-e05", obra: OBRA, tipo: "explicita", dificultad: 1,
    enunciado: "¿Qué encuentran al llegar al Lago Plateado para rescatar a Lyzi?",
    opciones: ["A Lyzi convertida en jefa de los gansos", "A Lyzi encerrada en una jaula", "El lago congelado", "A los gansos huyendo"], correcta: 0,
    explicacion: "Lyzi, todavía con su delantal, da órdenes a decenas de gansos con chaleco que la obedecen.",
    fuente: { obra: OBRA, parrafo: 221, cita: "A su alrededor, decenas de gansos con chaleco obedecían cada elegante gesto de sus colas." },
    requiere: solo
  },
  {
    id: "estafa-e06", obra: OBRA, tipo: "explicita", dificultad: 2,
    enunciado: "¿Cuánto paga la iglesia por recuperar la reliquia?",
    opciones: ["Veintiocho millones de florines", "Dieciocho millones de florines", "Cuarenta millones de florines", "Dos mil ochocientos florines"], correcta: 0,
    explicacion: "El mapache lo dice sin rodeos: veintiocho millones de florines.",
    fuente: { obra: OBRA, parrafo: 56, cita: "—Veintiocho millones de florines." },
    requiere: solo
  },
  {
    id: "estafa-e07", obra: OBRA, tipo: "explicita", dificultad: 2,
    enunciado: "¿Qué reparto ofrece el mapache?",
    opciones: ["60 % para él y 40 % para el grupo", "Mitad y mitad", "40 % para él y 60 % para el grupo", "90 % para él y 10 % para el grupo"], correcta: 0,
    explicacion: "Rubí pide no menos del cuarenta y el mapache responde: «Cuarenta para ustedes, sesenta para mí».",
    fuente: { obra: OBRA, parrafo: 61, cita: "—Lista. Se nota. Cuarenta para ustedes, sesenta para mí." },
    requiere: solo
  },
  {
    id: "estafa-e08", obra: OBRA, tipo: "explicita", dificultad: 2,
    enunciado: "¿Cómo se llaman las gafas tácticas de Yuki?",
    opciones: ["Ex Glaciem–Max", "Glaciem Prime", "Ojos de Escarcha", "Lentes del Norte"], correcta: 0,
    explicacion: "En la taberna, Yuki llega con «sus enormes lentes, las Ex Glaciem–Max».",
    fuente: { obra: OBRA, parrafo: 76, cita: "con sus enormes lentes, las Ex Glaciem–Max, reflejando media taberna como dos lunas pulidas." },
    requiere: solo
  },
  {
    id: "estafa-e09", obra: OBRA, tipo: "explicita", dificultad: 2,
    enunciado: "¿Qué le pide preparar el Jefe Ganso a Lyzi para su partida de póker?",
    opciones: ["Té de manzanilla", "Chocolate caliente", "Hidromiel", "Té de canela"], correcta: 0,
    explicacion: "Lyzi lo cuenta por telepatía: el jefe le pidió té de manzanilla para su partida de póker.",
    fuente: { obra: OBRA, parrafo: 36, cita: "El jefe me pidió preparar té de manzanilla para su partida de póker." },
    requiere: solo
  },
  {
    id: "estafa-e10", obra: OBRA, tipo: "explicita", dificultad: 2,
    enunciado: "¿Por qué no le arriendan caballos a Rubí?",
    opciones: ["Hay un cartel con su cara que dice «MALA PAGA»", "No le alcanza el dinero", "Los caballos le temen a su fuego", "El establo estaba cerrado"], correcta: 0,
    explicacion: "El encargado tiene un cartel con su cara y, en letras grandes, «MALA PAGA».",
    fuente: { obra: OBRA, parrafo: 135, cita: "¡Dice que hay un cartel con mi cara y en letras grandes “MALA PAGA”!" },
    requiere: solo
  },
  {
    id: "estafa-e11", obra: OBRA, tipo: "explicita", dificultad: 2,
    enunciado: "¿Qué criaturas monta Rubí al derribar el muro de la casa de remates?",
    opciones: ["Avecestruces", "Caballos de fuego", "Grifos", "Lagartos de Cindralith"], correcta: 0,
    explicacion: "Rubí entra montada en «Un Avecestruz. Sí, A-veces-truz», bestias que solo existen en Sylvalis.",
    fuente: { obra: OBRA, parrafo: 151, cita: "Rubí, montada sobre una bestia que solo podría existir en Sylvalis. Un Avecestruz." },
    requiere: solo
  },
  {
    id: "estafa-e12", obra: OBRA, tipo: "explicita", dificultad: 2,
    enunciado: "¿Cómo le avisa Yuki a Noct que puede avanzar?",
    opciones: ["Con código Morse helado por la ventilación", "Por telepatía", "Con una señal de humo", "Golpeando las tuberías"], correcta: 0,
    explicacion: "Yuki envía ráfagas intermitentes de aire frío por la ventilación: código Morse helado que deletrea EN ADELANTE.",
    fuente: { obra: OBRA, parrafo: 132, cita: "Era código Morse helado, un pulso de aire frío que solo un miembro de su equipo podría sentir." },
    requiere: solo
  },
  {
    id: "estafa-e13", obra: OBRA, tipo: "explicita", dificultad: 2,
    enunciado: "¿Qué delata a Yuki dentro de la casa de remates?",
    opciones: ["Unas nobles de Glaciem la reconocen y avisan a los guardias", "El mapache la traiciona", "Sus gafas brillan demasiado", "Rubí grita su nombre"], correcta: 0,
    explicacion: "En el baño, un par de nobles de Glaciem la reconocen y salen directo hacia los guardias.",
    fuente: { obra: OBRA, parrafo: 143, cita: "Fue allí donde un par de nobles de Glaciem la reconocieron." },
    requiere: solo
  },
  {
    id: "estafa-e14", obra: OBRA, tipo: "explicita", dificultad: 3,
    enunciado: "¿Con qué golpean los gansos a Yuki?",
    opciones: ["Con lumas de goma", "Con sus alas", "Con bastones de madera", "Con abanicos"], correcta: 0,
    explicacion: "Los gansos gánsteres llevan «amenazantes lumas de goma en las alas» y con una le dan en la cabeza.",
    fuente: { obra: OBRA, parrafo: 9, cita: "Un seco ¡paf! resonó cuando una luma de goma impactó en su cabeza." },
    requiere: solo
  },
  {
    id: "estafa-e15", obra: OBRA, tipo: "explicita", dificultad: 3,
    enunciado: "¿Qué artículo de la Ley de Protección de Fauna Mágica le muestran a Yuki?",
    opciones: ["El artículo 7", "El artículo 3", "El artículo 12", "El artículo 28"], correcta: 0,
    explicacion: "El ganso del maletín despliega el papiro: «Art. 7: “Toda agresión contra aves y/o criaturas mágicas…”».",
    fuente: { obra: OBRA, parrafo: 17, cita: "Art. 7: “Toda agresión contra aves y/o criaturas mágicas parcialmente civilizadas con chaleco será penada con multa y humillación pública”." },
    requiere: solo
  },
  {
    id: "estafa-e16", obra: OBRA, tipo: "explicita", dificultad: 3,
    enunciado: "¿Qué bebe Rubí durante el briefing en la taberna?",
    opciones: ["Cerveza de calabaza", "Hidromiel", "Vino de canela", "Sidra de manzana"], correcta: 0,
    explicacion: "Rubí derrama «un poco de su cerveza de calabaza» al reírse de Yuki; la del hidromiel es Yuki.",
    fuente: { obra: OBRA, parrafo: 77, cita: "Rubí estalló en una carcajada que hizo temblar la mesa, derramando un poco de su cerveza de calabaza." },
    requiere: solo
  },
  {
    id: "estafa-e17", obra: OBRA, tipo: "explicita", dificultad: 3,
    enunciado: "¿Qué porcentaje del brillo ambiental eliminan las gafas de Yuki?",
    opciones: ["El 98 %", "El 90 %", "El 75 %", "El 100 %"], correcta: 0,
    explicacion: "Según Yuki, su equipo táctico «elimina el noventa y ocho por ciento del brillo ambiental».",
    fuente: { obra: OBRA, parrafo: 79, cita: "Detecta corrientes mágicas y elimina el noventa y ocho por ciento del brillo ambiental." },
    requiere: solo
  },
  {
    id: "estafa-e18", obra: OBRA, tipo: "explicita", dificultad: 3,
    enunciado: "¿Qué frase tenía lista Rubí para el asalto?",
    opciones: [
      "«¡Esto es un asalto, manos al cielo y alas al suelo!»",
      "«¡Nadie se mueve, que esto es un atraco!»",
      "«¡El fuego cobra, ustedes pagan!»",
      "«¡Las monedas o las plumas!»"
    ], correcta: 0,
    explicacion: "Rubí se queja de que el plan de Noct es aburrido: ella ya tenía el grito listo.",
    fuente: { obra: OBRA, parrafo: 48, cita: "Yo ya tenía el grito listo: “¡Esto es un asalto, manos al cielo y alas al suelo!”." },
    requiere: solo
  },
  {
    id: "estafa-e19", obra: OBRA, tipo: "explicita", dificultad: 3,
    enunciado: "¿Cómo se llama el contable de los gansos?",
    opciones: ["Meyer Lanskizo", "Bugsy Plumetti", "Lucky Luciano Griazniati", "Cara Cortada"], correcta: 0,
    explicacion: "«Finalmente, el contable del grupo, Meyer Lanskizo, ajustó su maletín de cuero…».",
    fuente: { obra: OBRA, parrafo: 230, cita: "Finalmente, el contable del grupo, Meyer Lanskizo, ajustó su maletín de cuero" },
    requiere: solo
  },
  {
    id: "estafa-e24", obra: OBRA, tipo: "explicita", dificultad: 3,
    enunciado: "¿Cómo se llama el ganso sentimental que se seca una lágrima con el borde del ala?",
    opciones: ["Bugsy Plumetti", "Meyer Lanskizo", "Cara Cortada", "Lucky Luciano Griazniati"], correcta: 0,
    explicacion: "«Otro, un tipo más sentimental llamado Bugsy Plumetti, se secó una lágrima mal disimulada con el borde de su ala».",
    fuente: { obra: OBRA, parrafo: 228, cita: "Otro, un tipo más sentimental llamado Bugsy Plumetti, se secó una lágrima mal disimulada con el borde de su ala." },
    requiere: solo
  },
  {
    id: "estafa-e20", obra: OBRA, tipo: "explicita", dificultad: 3,
    enunciado: "¿Cómo llaman los gansos a Lyzi cuando le agradecen?",
    opciones: ["Nona Lyzi", "Madrina Lyzi", "Jefa Kitsune", "Doña Colas"], correcta: 0,
    explicacion: "El sindicato entero grazna: «Nona Lyzi… gracias por tanto».",
    fuente: { obra: OBRA, parrafo: 224, cita: "—Nona Lyzi… gracias por tanto —graznaron en un coro de voces ásperas pero devotas." },
    requiere: solo
  },
  {
    id: "estafa-e21", obra: OBRA, tipo: "explicita", dificultad: 3,
    enunciado: "¿Cuántas luciérnagas doradas envía Lyzi a la mano de Rubí dormida?",
    opciones: ["Dos", "Una", "Siete", "Nueve"], correcta: 0,
    explicacion: "«Y con un último soplo delicado, envió dos luciérnagas a posarse suavemente sobre la mano de Rubí dormida».",
    fuente: { obra: OBRA, parrafo: 265, cita: "envió dos luciérnagas a posarse suavemente sobre la mano de Rubí dormida." },
    requiere: solo
  },
  {
    id: "estafa-e22", obra: OBRA, tipo: "explicita", dificultad: 3,
    enunciado: "Según el anciano campesino, ¿cuánto le faltaba a Noct para llegar a la iglesia?",
    opciones: ["Unas cinco horas", "Media hora", "Dos días", "Una hora"], correcta: 0,
    explicacion: "«—Como a cinco horas, joven», responde el anciano antes de ofrecerle su carretilla.",
    fuente: { obra: OBRA, parrafo: 192, cita: "—Como a cinco horas, joven." },
    requiere: solo
  },
  {
    id: "estafa-e23", obra: OBRA, tipo: "explicita", dificultad: 3,
    enunciado: "¿Cuánto esperaron Yuki, Rubí y Joe a Noct frente a la iglesia?",
    opciones: ["Una hora", "Diez minutos", "Toda la noche", "Tres horas"], correcta: 0,
    explicacion: "Yuki lo reprocha: «Una hora, Rubí. Una hora entera esperando».",
    fuente: { obra: OBRA, parrafo: 182, cita: "—Una hora, Rubí. Una hora entera esperando, contigo jugando a lanzar piedritas…" },
    requiere: solo
  },

  // ——— Implícitas ———
  {
    id: "estafa-i01", obra: OBRA, tipo: "implicita", dificultad: 1,
    enunciado: "¿Por qué los gansos llaman «la colorada» a Rubí?",
    opciones: ["Por su cabello rojo", "Porque se sonroja al mentir", "Por su capa carmesí", "Porque así la apodó Lyzi"], correcta: 0,
    explicacion: "«Colorada» es como se le dice a una pelirroja: los gansos la apodan por su cabello rojo, el rasgo que primero salta a la vista de Rubí.",
    fuente: { obra: OBRA, parrafo: 11, cita: "—¡GRAZ! ¡LA COLORADA! ¡DEBE MUCHA PLATITA!" },
    requiere: solo
  },
  {
    id: "estafa-i02", obra: OBRA, tipo: "implicita", dificultad: 2,
    enunciado: "¿Por qué Yuki se limita a responder «Entendido» ante la ley que muestran los gansos?",
    opciones: [
      "Porque la ley castiga cualquier agresión contra ellos",
      "Porque Rubí seguía dormida",
      "Porque los gansos eran demasiados",
      "Porque reconoció el sello de Glaciem"
    ], correcta: 0,
    explicacion: "El artículo 7 pena con multa y humillación pública toda agresión contra criaturas «con chaleco»: defenderse a golpes queda descartado.",
    fuente: { obra: OBRA, parrafo: 17, cita: "Toda agresión contra aves y/o criaturas mágicas parcialmente civilizadas con chaleco será penada con multa y humillación pública" },
    requiere: solo
  },
  {
    id: "estafa-i03", obra: OBRA, tipo: "implicita", dificultad: 2,
    enunciado: "¿Por qué Rubí insiste en el 40 % si con el 10 % bastaría para liberar a Lyzi?",
    opciones: [
      "Porque arrastra otras deudas e intereses pendientes",
      "Porque quiere comprar un caballo propio",
      "Porque no confía en el mapache",
      "Porque quiere pagarle una deuda a Yuki"
    ], correcta: 0,
    explicacion: "Ella misma lo admite: los intereses de los gansos y las «pequeñas» cuentas pendientes que la persiguen.",
    fuente: { obra: OBRA, parrafo: 67, cita: "¿quién paga los intereses de esos gansos? ¿O las “pequeñas” cuentas pendientes que me persiguen?" },
    requiere: solo
  },
  {
    id: "estafa-i04", obra: OBRA, tipo: "implicita", dificultad: 2,
    enunciado: "En la casa de remates, ¿qué hiere de verdad el orgullo de Yuki?",
    opciones: [
      "Ver a nobles que juraron lealtad a su corona pujando por objetos saqueados",
      "Tener que pagar la entrada",
      "Que nadie la reconozca",
      "Que el mapache le diga «mami»"
    ], correcta: 0,
    explicacion: "«Nobles que habían jurado lealtad a su corona ahora pujaban en un sótano criminal… Cada detalle era un puñal a su orgullo».",
    fuente: { obra: OBRA, parrafo: 110, cita: "Nobles que habían jurado lealtad a su corona ahora pujaban en un sótano criminal por objetos saqueados." },
    requiere: solo
  },
  {
    id: "estafa-i05", obra: OBRA, tipo: "implicita", dificultad: 2,
    enunciado: "¿Quién sale realmente ganando con el asunto de la reliquia?",
    opciones: ["El Sucio Joe", "Rubí", "Los cardenales", "Noctalypse"], correcta: 0,
    explicacion: "La iglesia descubre que la reliquia es falsa, Joe deja una nota de agradecimiento y Yuki concluye que fueron «las víctimas de la estafa dentro de la estafa».",
    fuente: { obra: OBRA, parrafo: 211, cita: "¡fuimos las víctimas de la estafa dentro de la estafa!" },
    requiere: solo
  },
  {
    id: "estafa-i06", obra: OBRA, tipo: "implicita", dificultad: 3,
    enunciado: "¿Qué revela el gesto de Lyzi con las luciérnagas doradas al final?",
    opciones: [
      "Que ayudó a Rubí en secreto a saldar sus deudas",
      "Que quería quedarse con el dinero",
      "Que los gansos se lo ordenaron",
      "Que fue un hechizo accidental"
    ], correcta: 0,
    explicacion: "Tras disolver los billetes, convierte dos luciérnagas en un fajo que alcanzaba «para que ningún ganso volviera a graznarle por la espalda»: una bondad que no necesita palabras.",
    fuente: { obra: OBRA, parrafo: 266, cita: "No era una fortuna. Alcanzaba, eso sí, para que ningún ganso volviera a graznarle por la espalda." },
    requiere: solo
  },
  {
    id: "estafa-i07", obra: OBRA, tipo: "implicita", dificultad: 3,
    enunciado: "Según el final, ¿quién parece estar contando esta historia?",
    opciones: ["Lyzi, tiempo después", "Yuki, en su diario", "Noctalypse, a sus alumnos", "El Sucio Joe, en una taberna"], correcta: 0,
    explicacion: "La historia la cierra «una voz dulce tiempo después» hablando a «pequeños guardianes de la historia», y firma con una sola letra: L.",
    fuente: { obra: OBRA, parrafo: 271, cita: "—Y así, pequeños guardianes de la historia —concluyó una voz dulce tiempo después—, […] L." },
    requiere: solo
  },

  // ——— Conexiones (se activan cuando el Torneo esté publicado) ———
  {
    id: "estafa-c01", obra: OBRA, tipo: "conexion", dificultad: 3,
    enunciado: "Lucky Luciano Griazniati reaparece lejos del Lago Plateado. En el Gran Torneo Etílico de Glaciem, ¿qué bebe?",
    opciones: [
      "Un vaso de vodka hundido dentro de una taza de leche",
      "Hidromiel de cortesía",
      "El Doble Caballito de Medianoche",
      "Cerveza enana"
    ], correcta: 0,
    explicacion: "Un mozo le trae vodka y una taza de leche; Lucky empuja el vaso dentro de la leche «con una precisión ceremonial» y se lo toma con ambas alas.",
    fuente: { obra: TORNEO, parrafo: 360, cita: "Lucky empujó el vaso de vodka dentro de la leche con una precisión ceremonial." },
    requiere: [OBRA, TORNEO],
    spoilers: [TORNEO]
  },
  {
    id: "estafa-c02", obra: OBRA, tipo: "conexion", dificultad: 2,
    enunciado: "En el Gran Torneo Etílico de Glaciem, ¿qué hace Lucky Luciano antes de beber su primer trago?",
    opciones: ["Enciende un puro", "Grazna el himno del sindicato", "Le pide permiso a Lyzi", "Se quita el sombrero"], correcta: 0,
    explicacion: "Fue el único que no bebió de inmediato: estaba ocupado encendiendo un puro con una calma «tan vieja, tan callejera».",
    fuente: { obra: TORNEO, parrafo: 354, cita: "Lucky Luciano Griazniati fue el único que no bebió de inmediato. El ganso estaba ocupado encendiendo un puro." },
    requiere: [OBRA, TORNEO],
    spoilers: [TORNEO]
  }
];
