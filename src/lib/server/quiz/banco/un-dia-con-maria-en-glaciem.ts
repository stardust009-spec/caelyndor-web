import type { PreguntaQuiz } from "../logica";

/**
 * Banco · Un día con María en Glaciem (publicado el 13-oct-2026). Párrafos =
 * índice en `paragraphs` de src/data/stories.ts. Ids estables: no reutilizar.
 * Canon del autor (13-oct-2026): Yuki deja la cuchara porque ya conocía el
 * sabor de la cola de diablo (lo probó en La empanada mágica).
 * Evitado a propósito: el «incidente textil» de los baños y la fiesta, que el
 * relato deja sin explicar.
 */

const OBRA = "un-dia-con-maria-en-glaciem";
const EMPANADA = "la-empanada-magica";
const PROTOCOLOS = "protocolos-del-corazon";
const solo = [OBRA] as const;

type Base = Omit<PreguntaQuiz, "obra" | "requiere">;
const p = (pregunta: Base): PreguntaQuiz => ({ ...pregunta, obra: OBRA, requiere: solo });
const conexion = (otra: string, pregunta: Omit<Base, "tipo" | "spoilers">): PreguntaQuiz => ({
  ...pregunta, tipo: "conexion", obra: OBRA, requiere: [OBRA, otra], spoilers: [otra]
});

export const BANCO_UN_DIA_CON_MARIA: readonly PreguntaQuiz[] = [
  // ——— Explícitas ———
  p({
    id: "maria-e01", tipo: "explicita", dificultad: 1,
    enunciado: "¿Qué puesto tiene María en el castillo?",
    opciones: ["Dama de compañía de la reina", "Ayudante de cocina", "Lavandera", "Escribana del canciller"], correcta: 0,
    explicacion: "Por eso no sonríe en el comedor real: «Las damas de compañía no debían reaccionar a cada broma de Estado».",
    fuente: { obra: OBRA, parrafo: 214, cita: "Las damas de compañía no debían reaccionar a cada broma de Estado." }
  }),
  p({
    id: "maria-e02", tipo: "explicita", dificultad: 1,
    enunciado: "¿Qué tarea le toca a Victoria ese día?",
    opciones: ["El lavadero", "Servir el comedor real", "La despensa", "El baño real"], correcta: 0,
    explicacion: "«La sonrisa de Victoria murió. —Me tocó lavadero». María le desea: «Sobrevive al lavadero».",
    fuente: { obra: OBRA, parrafo: 34, cita: "—Me tocó lavadero." }
  }),
  p({
    id: "maria-e03", tipo: "explicita", dificultad: 1,
    enunciado: "¿Dónde queda atascada Lyzi?",
    opciones: ["En un candelabro de pared", "En una chimenea", "Dentro de un armario de toallas", "En el espejo de María"], correcta: 0,
    explicacion: "Media Lyzi atravesó la piedra; la otra mitad quedó en el corredor, con las piernas colgando y las colas agitándose.",
    fuente: { obra: OBRA, parrafo: 92, cita: "Lyzi estaba atrapada en un candelabro de pared." }
  }),
  p({
    id: "maria-e04", tipo: "explicita", dificultad: 1,
    enunciado: "Una cola de Lyzi empieza a humear con las velas. ¿Qué hace María?",
    opciones: ["Le arroja el agua de un florero al candelabro", "La envuelve en su delantal", "Sopla las velas", "Llama a Yuki para que la congele"], correcta: 0,
    explicacion: "«Sin vacilar». Después deja el florero vacío en su sitio, como corresponde.",
    fuente: { obra: OBRA, parrafo: 107, cita: "encontró un florero sobre una mesa auxiliar y, sin vacilar, arrojó el agua sobre el candelabro." }
  }),
  p({
    id: "maria-e05", tipo: "explicita", dificultad: 1,
    enunciado: "¿Quién llega a almorzar con la reina?",
    opciones: ["El gobernador de Fulganova", "El embajador de Sylvalis", "El canciller Halrik", "Una comitiva de Cindralith"], correcta: 0,
    explicacion: "Vienen a negociar grano, aranceles, puentes y el precio de la madera.",
    fuente: { obra: OBRA, parrafo: 202, cita: "—El gobernador de Fulganova." }
  }),
  p({
    id: "maria-e06", tipo: "explicita", dificultad: 1,
    enunciado: "¿Qué té le tiene preparado María a Yuki después del almuerzo?",
    opciones: ["Manzanilla", "Té negro", "Té de raíz cálida", "Infusión de menta glacial"], correcta: 0,
    explicacion: "«Sé que la sopa de Ricardo le deja un gusto pesado en la lengua y prefiere algo más suave después».",
    fuente: { obra: OBRA, parrafo: 362, cita: "—Manzanilla. Sé que la sopa de Ricardo le deja un gusto pesado en la lengua" }
  }),
  p({
    id: "maria-e07", tipo: "explicita", dificultad: 1,
    enunciado: "¿Qué palabra usa Yuki al probar el té de María?",
    opciones: ["«Impecable»", "«Correcto»", "«Excelente»", "«Aceptable»"], correcta: 0,
    explicacion: "María se queda inmóvil y la anota en su cuaderno como palabra nueva.",
    fuente: { obra: OBRA, parrafo: 365, cita: "—Impecable." }
  }),
  p({
    id: "maria-e08", tipo: "explicita", dificultad: 1,
    enunciado: "¿Qué le lanza Rubí a María mientras huye de los guardias?",
    opciones: ["Un conejito, una masa dulce rellena", "Una toalla", "Una empanada", "Un pastel de carne"], correcta: 0,
    explicacion: "«¡Toma! ¡Por soportar a esa estirada!». Estaba tibio y era de manjar.",
    fuente: { obra: OBRA, parrafo: 617, cita: "sacó un conejito, una pequeña masa dulce horneada y rellena, y se lo lanzó." }
  }),
  p({
    id: "maria-e09", tipo: "explicita", dificultad: 2,
    enunciado: "Según el cuaderno de María, si a Yuki le tiembla la ceja tres veces, ¿qué significa?",
    opciones: ["Que la comida está demasiado caliente", "Que le gustó el sabor", "Que el cocinero tendrá que dar explicaciones", "Que quiere más sal"], correcta: 0,
    explicacion: "Una vez: le gustó el sabor. Tres: demasiado caliente. Arqueada y de vuelta lenta: problemas para el cocinero.",
    fuente: { obra: OBRA, parrafo: 246, cita: "—Si le tiembla tres veces, está demasiado caliente." }
  }),
  p({
    id: "maria-e10", tipo: "explicita", dificultad: 2,
    enunciado: "Según el cuaderno, si la ceja de Yuki queda arqueada y después vuelve lentamente a su sitio…",
    opciones: ["El cocinero tendrá que dar explicaciones", "Le gustó el sabor", "Está demasiado caliente", "Quiere repetir"], correcta: 0,
    explicacion: "Por eso Victoria respira aliviada cuando la ceja baja «de golpe»: no volvió lentamente.",
    fuente: { obra: OBRA, parrafo: 256, cita: "—El cocinero tendrá que dar explicaciones." }
  }),
  p({
    id: "maria-e11", tipo: "explicita", dificultad: 2,
    enunciado: "En la lista de elogios de María, ¿qué significa que Yuki diga «Excelente»?",
    opciones: ["Que ese día se jubila", "Que hizo lo que correspondía", "Que realmente destacó", "Que está satisfecha"], correcta: 0,
    explicacion: "«Correcto» = hice lo que correspondía; «Bien» = está satisfecha; «Buen trabajo» = realmente destaqué; «Excelente» = ese día me jubilo.",
    fuente: { obra: OBRA, parrafo: 376, cita: "«Excelente» = ese día me jubilo." }
  }),
  p({
    id: "maria-e12", tipo: "explicita", dificultad: 2,
    enunciado: "¿Qué hierba encuentra Ricardo en su cocina en lugar de la que pidió?",
    opciones: ["Cola de diablo, en vez de nalga de ángel", "Nalga de ángel, en vez de cola de diablo", "Sal de luna, en vez de azúcar flor", "Cola de ángel, en vez de nalga de ángel"], correcta: 0,
    explicacion: "«¡No es lo mismo una nalga que una cola!». Al final grita que traigan nalga de ángel, «¡y no me da vergüenza decirlo!».",
    fuente: { obra: OBRA, parrafo: 310, cita: "—Les dije que era hierba nalga de ángel, no cola de diablo." }
  }),
  p({
    id: "maria-e13", tipo: "explicita", dificultad: 2,
    enunciado: "Después del susto en la cocina, ¿qué pide el mayordomo con la comanda?",
    opciones: ["Repetir sopa para el gobernador de Fulganova", "Retirar la sopa de la mesa real", "Que Ricardo se presente ante la reina", "Más manzanilla para Su Majestad"], correcta: 0,
    explicacion: "María remata: «Parece que lo de la cuchara es bis».",
    fuente: { obra: OBRA, parrafo: 323, cita: "—Por favor, repetir sopa al gobernador de Fulganova." }
  }),
  p({
    id: "maria-e14", tipo: "explicita", dificultad: 2,
    enunciado: "¿Qué temperatura calcula María en el despacho de Yuki?",
    opciones: ["Dos grados, tal vez tres", "Veinte grados", "Bajo cero", "La misma que el pasillo"], correcta: 0,
    explicacion: "El frío le muerde las piernas a través de la falda al cruzar el umbral.",
    fuente: { obra: OBRA, parrafo: 356, cita: "Dos grados. Tal vez tres." }
  }),
  p({
    id: "maria-e15", tipo: "explicita", dificultad: 2,
    enunciado: "Según el informe de María, ¿cuántas toallas podría haber usado Rubí?",
    opciones: ["Ocho como mínimo: tres para el cabello y cinco «para Su Majestad»", "Tres", "Una sola, muy grande", "Doce, contando las del baño real"], correcta: 0,
    explicacion: "Yuki pregunta: «¿Ocho?». María: «Como mínimo».",
    fuente: { obra: OBRA, parrafo: 402, cita: "la señorita Rubí puede haber utilizado tres toallas limpias únicamente para el cabello. No se descarta el uso de otras cinco alegando que eran para Su Majestad." }
  }),
  p({
    id: "maria-e16", tipo: "explicita", dificultad: 2,
    enunciado: "¿Qué pide María en el café de la plaza?",
    opciones: ["Pastel de carne con papas, crema y queso. Y pan", "Un sándwich de ensalada", "Sopa del día", "Un conejito de manjar"], correcta: 0,
    explicacion: "Victoria, con su sándwich de ensalada, la mira y le dice: «Te odio».",
    fuente: { obra: OBRA, parrafo: 448, cita: "—Quiero el pastel de carne con papas, crema y queso. Y pan." }
  }),
  p({
    id: "maria-e17", tipo: "explicita", dificultad: 2,
    enunciado: "Victoria empieza: «Cuando la alegría se comparte, se multiplica y…». ¿Cómo termina María?",
    opciones: ["«Cuando el dolor llega, se divide»", "«Cuando el pan se comparte, alcanza»", "«Cuando la pena se calla, crece»", "«Cuando el vestido cierra, se celebra»"], correcta: 0,
    explicacion: "Se toman de las manos: «Tú sí que me entiendes, María».",
    fuente: { obra: OBRA, parrafo: 505, cita: "—Cuando el dolor llega, se divide." }
  }),
  p({
    id: "maria-e18", tipo: "explicita", dificultad: 2,
    enunciado: "¿A qué tienda manda Victoria al cochero que lleve a María?",
    opciones: ["A la sastrería de Constanza", "A la herrería", "A la Panadería Yukimaru", "Al Bazar de Kopuko"], correcta: 0,
    explicacion: "Antes le ordenó: «Nada de pasear. Compra el maldito vestido».",
    fuente: { obra: OBRA, parrafo: 519, cita: "—¡Cochero! Llévela a la sastrería de Constanza, por favor." }
  }),
  p({
    id: "maria-e19", tipo: "explicita", dificultad: 2,
    enunciado: "María le dice al herrero que ya tiene pareja. ¿Qué responde él?",
    opciones: ["«No soy celoso»", "«Entonces le hago un anillo»", "«Eso dicen todas»", "«Manuel no la merece»"], correcta: 0,
    explicacion: "Y al despedirse: «¡Y dígale a Manuel que sigo sin ser celoso!».",
    fuente: { obra: OBRA, parrafo: 563, cita: "—No soy celoso." }
  }),
  p({
    id: "maria-e20", tipo: "explicita", dificultad: 2,
    enunciado: "¿Cómo llama Rubí a los guardias que la persiguen?",
    opciones: ["«Soldados heladitos»", "«Pingüinos reales»", "«Escarchitas»", "«Guardias de hielo frito»"], correcta: 0,
    explicacion: "«¡No tienen el fuego para hacerme frente!». Los guardias tenían orden de la reina: recuperar los postres.",
    fuente: { obra: OBRA, parrafo: 608, cita: "—¡Nunca me atraparán, soldados heladitos!" }
  }),
  p({
    id: "maria-e21", tipo: "explicita", dificultad: 2,
    enunciado: "¿Qué ordenó aumentar Yuki, sin avisarle a María?",
    opciones: ["Su sueldo, desde ese mismo periodo", "Sus horas de trabajo", "Sus días libres", "El presupuesto del lavadero"], correcta: 0,
    explicacion: "«Pero mi sueldo es…». Halrik: «Era».",
    fuente: { obra: OBRA, parrafo: 711, cita: "—Su Majestad ordenó aumentar su remuneración desde este periodo." }
  }),
  p({
    id: "maria-e22", tipo: "explicita", dificultad: 3,
    enunciado: "¿Qué hora es cuando Ricardo descubre que la cocina va atrasada?",
    opciones: ["Las tres y diez", "Las tres y veinte", "Las doce en punto", "Las cinco"], correcta: 0,
    explicacion: "Ricardo la reta por comer «a deshoras». «Son las tres y diez, Ricardo». Y él: «…Merde».",
    fuente: { obra: OBRA, parrafo: 157, cita: "—Son las tres y diez, Ricardo." }
  }),
  p({
    id: "maria-e23", tipo: "explicita", dificultad: 3,
    enunciado: "¿Con qué frase justifica Ricardo irse antes de que termine su turno?",
    opciones: ["«Tres y veinte tiene energía de seis»", "«Un chef sabe cuándo retirarse»", "«La sopa habla por mí»", "«Mis manos están secas»"], correcta: 0,
    explicacion: "Su turno termina a las seis. Lo de las manos secas también lo dice, pero es sobre el paño que no suelta.",
    fuente: { obra: OBRA, parrafo: 303, cita: "—Siempre he considerado que tres y veinte tiene energía de seis." }
  }),
  p({
    id: "maria-e24", tipo: "explicita", dificultad: 3,
    enunciado: "El gobernador llama «circunstancial» a la diferencia en el precio de la madera. ¿Cómo la llama Yuki?",
    opciones: ["«Un incremento del once por ciento»", "«Un abuso fronterizo»", "«Una cifra provisional»", "«Un error de los informes»"], correcta: 0,
    explicacion: "Ninguno eleva la voz, «y por algún motivo, aquello hacía que la discusión pareciera más peligrosa».",
    fuente: { obra: OBRA, parrafo: 217, cita: "Yuki llamó «un incremento del once por ciento»" }
  }),
  p({
    id: "maria-e25", tipo: "explicita", dificultad: 3,
    enunciado: "¿Qué condición pone Yuki para aceptar la modificación del arancel?",
    opciones: ["Que Fulganova garantice el mantenimiento de la ruta oriental durante el invierno", "Que Fulganova repare los dos puentes", "Que baje el precio de la madera", "Que el embajador asista a la fiesta"], correcta: 0,
    explicacion: "Y aclara: «Por eso he dicho “podemos aceptar” y no “aceptamos”».",
    fuente: { obra: OBRA, parrafo: 225, cita: "si Fulganova garantiza el mantenimiento de la ruta oriental durante el invierno" }
  }),
  p({
    id: "maria-e26", tipo: "explicita", dificultad: 3,
    enunciado: "Según Victoria, ¿cuántas sirvientas despidió Yuki en menos de dos horas?",
    opciones: ["Seis", "Tres", "Diecisiete", "Ocho"], correcta: 0,
    explicacion: "«La primera lloró. La segunda no lloró, pero tampoco volvió…». El cochero para la oreja para escuchar.",
    fuente: { obra: OBRA, parrafo: 431, cita: "la vez que despidió a seis sirvientas en menos de dos horas" }
  }),
  p({
    id: "maria-e27", tipo: "explicita", dificultad: 3,
    enunciado: "¿Con qué registra el mayordomo la paga del servicio?",
    opciones: ["Una tablilla de metal plateado con líneas rúnicas", "Un libro de cuentas encuadernado en cuero", "Un pergamino con el sello azul de la corona", "Un ábaco de hielo"], correcta: 0,
    explicacion: "Toca la superficie con dos dedos y la runa junto al nombre de María se ilumina.",
    fuente: { obra: OBRA, parrafo: 652, cita: "una tablilla de metal plateado recorrida por líneas rúnicas" }
  }),
  p({
    id: "maria-e28", tipo: "explicita", dificultad: 3,
    enunciado: "¿Qué había ordenado Yuki si María NO venía a devolver el dinero?",
    opciones: ["Dejarle la bonificación al día siguiente sobre el escritorio", "Descontárselo de la próxima paga", "No darle nada", "Preguntarle en persona"], correcta: 0,
    explicacion: "Halrik imita su tono seco: «Si no viene, déjeselo mañana sobre el escritorio». La bonificación era suya de todos modos.",
    fuente: { obra: OBRA, parrafo: 749, cita: "Si no viene, déjeselo mañana sobre el escritorio" }
  }),

  // ——— Implícitas ———
  p({
    id: "maria-i01", tipo: "implicita", dificultad: 1,
    enunciado: "Cuando Yuki dice «María. A mi oficina», ¿qué teme María?",
    opciones: ["Que la van a despedir", "Que la ascenderán", "Que Rubí la acusó de algo", "Que perdió el cuaderno"], correcta: 0,
    explicacion: "Un soldado le hace una mueca de condolencia y ella piensa «Hasta aquí llegué», calcula sus ahorros y concluye: «Mi tía va a matarme».",
    fuente: { obra: OBRA, parrafo: 346, cita: "Hasta aquí llegué." }
  }),
  p({
    id: "maria-i02", tipo: "implicita", dificultad: 1,
    enunciado: "¿Por qué Victoria pide solo un sándwich de ensalada?",
    opciones: ["Porque ya compró su vestido para la fiesta y teme que no le cierre", "Porque no tiene dinero", "Porque no tiene hambre", "Porque Ricardo le prohibió comer fuera"], correcta: 0,
    explicacion: "«El vestido ya está comprado». María le dice que no va a subir de talla de aquí a mañana. Victoria: «No necesito lógica. Necesito que cierre».",
    fuente: { obra: OBRA, parrafo: 465, cita: "—No necesito lógica. Necesito que cierre." }
  }),
  p({
    id: "maria-i03", tipo: "implicita", dificultad: 1,
    enunciado: "Al final, María le pregunta a Victoria a qué hora empieza la fiesta. ¿Qué le está diciendo?",
    opciones: ["Que sí va a ir: ahora le alcanza para el vestido", "Que no va a ir", "Que la fiesta se suspendió", "Que Manuel la acompañará"], correcta: 0,
    explicacion: "Victoria mira el saco de monedas, luego a María, luego otra vez el saco. Y el grito obliga a un guardia a ponerse el yelmo.",
    fuente: { obra: OBRA, parrafo: 796, cita: "—¿A qué hora dijiste que empezaba la fiesta?" }
  }),
  p({
    id: "maria-i04", tipo: "implicita", dificultad: 2,
    enunciado: "Tras despedirse de Lyzi, María anota «Toallas: revisar inventario antes de las 20:00». ¿Por qué?",
    opciones: ["Porque Lyzi dijo que Rubí le había contado dónde estaban las toallas", "Porque Lyzi se secó con una toalla del candelabro", "Porque Victoria le pidió ayuda con el lavadero", "Porque su tía cargaba toallas"], correcta: 0,
    explicacion: "Si Rubí anda repartiendo esa información, las toallas del baño real (20:00) corren peligro. Más tarde María informa que Rubí pudo usar ocho.",
    fuente: { obra: OBRA, parrafo: 135, cita: "Ah, ya sé dónde encontrar las toallas. Rubí me lo dijo." }
  }),
  p({
    id: "maria-i05", tipo: "implicita", dificultad: 2,
    enunciado: "Yuki dice «Impecable» y María corre a su cuaderno. ¿Por qué?",
    opciones: ["Porque Yuki nunca le había dicho esa palabra: no estaba en su lista de elogios", "Porque «Impecable» significa que la despedirán", "Porque olvidó servir el azúcar", "Porque Yuki le pidió que lo anotara"], correcta: 0,
    explicacion: "Su lista iba de «Correcto» a «Excelente». Agrega una línea: «Impecable» = nuevo. Estudiar más.",
    fuente: { obra: OBRA, parrafo: 379, cita: "«Impecable» = nuevo. Estudiar más." }
  }),
  p({
    id: "maria-i06", tipo: "implicita", dificultad: 2,
    enunciado: "Al fondo de la sastrería, María mira un vestido blanco con flores bordadas en las mangas. ¿Qué vestido es, para ella?",
    opciones: ["El de su futura boda con Manuel", "Uno para la fiesta de mañana", "Un regalo para Victoria", "Un uniforme de gala del castillo"], correcta: 0,
    explicacion: "Se imagina a Manuel con su mejor ropa, a su madre llorando antes de la ceremonia y a su tía enderezándole el cuello. «Algún día».",
    fuente: { obra: OBRA, parrafo: 538, cita: "Blanco, sencillo, con pequeñas flores bordadas en las mangas." }
  }),
  p({
    id: "maria-i07", tipo: "implicita", dificultad: 2,
    enunciado: "Podría comprar el vestido usando el dinero de los viajes y los regalos. ¿Por qué no lo hace?",
    opciones: ["Porque ese dinero ya tiene destino y no quiere tocarlo", "Porque el vestido ya estaba vendido", "Porque Victoria le prohibió gastar", "Porque la sastrería estaba cerrada"], correcta: 0,
    explicacion: "«Nadie se enteraría. El dinero era suyo». Aun así: «No. Así no». María separa sus monedas en tres montones y respeta cada uno.",
    fuente: { obra: OBRA, parrafo: 546, cita: "No. Así no." }
  }),
  p({
    id: "maria-i08", tipo: "implicita", dificultad: 2,
    enunciado: "María anota «crear escuadrón anti-Rubí», muerde el conejito… y tacha la nota. ¿Qué pasó?",
    opciones: ["El conejito de manjar la ablandó: el soborno funcionó", "Se dio cuenta de que ya existía ese escuadrón", "Yuki se lo prohibió", "Se le acabó la tinta"], correcta: 0,
    explicacion: "«Era de manjar». Después comparte la otra mitad con el cochero: «No vi nada». «Yo tampoco».",
    fuente: { obra: OBRA, parrafo: 634, cita: "Era de manjar." }
  }),
  p({
    id: "maria-i09", tipo: "implicita", dificultad: 2,
    enunciado: "«Parece que lo de la cuchara es bis», dice María al ver la comanda. ¿Qué quiere decir?",
    opciones: ["Que, pese al susto, la sopa fue un éxito: el gobernador pidió repetir", "Que Yuki pidió otra cuchara", "Que Ricardo debe cocinar otra sopa para Yuki", "Que la reina quiere hablar con el chef"], correcta: 0,
    explicacion: "Ricardo ya daba su carrera por terminada. La comanda pide repetir sopa para el gobernador de Fulganova.",
    fuente: { obra: OBRA, parrafo: 326, cita: "—Parece que lo de la cuchara es bis." }
  }),
  p({
    id: "maria-i10", tipo: "implicita", dificultad: 3,
    enunciado: "Halrik dice que no era una prueba: Yuki «sabía» que María devolvería el dinero. ¿Qué descubre María?",
    opciones: ["Que Yuki también la había estado observando, como ella observa a Yuki", "Que Halrik le había contado todo a Yuki", "Que Victoria estaba al tanto", "Que el aumento era un error de la tablilla"], correcta: 0,
    explicacion: "María había pasado meses aprendiendo sus cejas, sus silencios y su manzanilla. Yuki, a su manera, había hecho lo mismo con ella.",
    fuente: { obra: OBRA, parrafo: 751, cita: "Así que Su Majestad también había estado observando." }
  }),
  p({
    id: "maria-i11", tipo: "implicita", dificultad: 3,
    enunciado: "Halrik le aconseja no agradecerle demasiado a Yuki y María responde: «Correcto». ¿Por qué él levanta la vista?",
    opciones: ["Porque María le contestó con el idioma de elogios de la propia Yuki", "Porque «Correcto» es una falta de respeto en Glaciem", "Porque esperaba un «gracias»", "Porque María se equivocó de palabra"], correcta: 0,
    explicacion: "En el cuaderno de María, «Correcto» = hice lo que correspondía. Le está poniendo nota al canciller como lo haría la reina. Por eso aprieta los labios para no reírse.",
    fuente: { obra: OBRA, parrafo: 765, cita: "Halrik levantó lentamente los ojos por encima de los lentes." }
  }),

  // ——— Conexiones (con relatos ya publicados) ———
  conexion(EMPANADA, {
    id: "maria-c01", dificultad: 3,
    enunciado: "Yuki dejó la cuchara al probar la sopa de Ricardo, y María no tenía ese gesto anotado. ¿Por qué la dejó?",
    opciones: [
      "Porque reconoció un sabor que ya había probado: cola de diablo",
      "Porque estaba demasiado caliente",
      "Porque la sopa estaba salada",
      "Porque prefería seguir negociando sin distraerse"
    ], correcta: 0,
    explicacion: "La sopa llevaba cola de diablo en vez de nalga de ángel. Yuki ya conocía ese sabor: en La empanada mágica se comió «una y tres cuartos» empanadas con Cola del Diablo y terminó viendo a Rubí como un candelero.",
    fuente: { obra: EMPANADA, parrafo: 119, cita: "—Una y tres cuartos. La evaluación sensorial requería comparación de bordes." }
  }),
  conexion(EMPANADA, {
    id: "maria-c02", dificultad: 3,
    enunciado: "María le dice a Ricardo: «Por pudor no saben pedir las cosas». En La empanada mágica, ¿quién cambió el nombre de la especia por vergüenza, y cómo la pidió?",
    opciones: ["Lyzi, que pidió «Cola de Ángel»", "Rubí, que pidió «Cola del Diablo»", "Yuki, que pidió «hierba celestial»", "Don Carlito, que la etiquetó «Ángel»"], correcta: 0,
    explicacion: "«Es que “Nalga de Ángel” sonaba feo». Don Carlito, con cataratas, le vendió Cola del Diablo.",
    fuente: { obra: EMPANADA, parrafo: 41, cita: "—Cola de Ángel —repitió Lyzi, con una dignidad cada vez más frágil—. Es que «Nalga de Ángel» sonaba feo." }
  }),
  conexion(PROTOCOLOS, {
    id: "maria-c03", dificultad: 3,
    enunciado: "Halrik imita a la perfección el tono seco de Yuki. Según Protocolos del Corazón, ¿qué hacía él a veces cuando Yuki era niña?",
    opciones: ["Se quedaba despierto junto a su habitación", "Le leía El conde vampiro y la rosa", "Le enseñaba a escribir informes", "La escoltaba a la escuela comunal"], correcta: 0,
    explicacion: "«Saberlo no impedía que alguien se quedara despierto junto a su habitación». «¿Usted?». «A veces».",
    fuente: { obra: PROTOCOLOS, parrafo: 754, cita: "Saberlo no impedía que alguien se quedara despierto junto a su habitación." }
  }),
  conexion(PROTOCOLOS, {
    id: "maria-c04", dificultad: 3,
    enunciado: "María anota «crear escuadrón anti-Rubí». En Protocolos del Corazón, Yuki ya había tomado su propia medida anti-Rubí. ¿Cuál?",
    opciones: ["Una puerta reforzada en su despacho", "Un foso de hielo en el patio", "Prohibirle la entrada a la cocina", "Un guardia personal para los postres"], correcta: 0,
    explicacion: "«La puerta estaba reforzada precisamente porque esperaba que intentaras patearla». Rubí entró por la ventana del tercer piso.",
    fuente: { obra: PROTOCOLOS, parrafo: 331, cita: "—La puerta estaba reforzada precisamente porque esperaba que intentaras patearla." }
  }),
  conexion(PROTOCOLOS, {
    id: "maria-c05", dificultad: 3,
    enunciado: "María lleva un cuaderno para leer los gestos mínimos de Yuki. En Protocolos del Corazón, ¿cuánto se mueve la comisura de Yuki cuando descubre el romance de Halrik?",
    opciones: ["Dos milímetros", "Medio centímetro", "Nada en absoluto", "Tres veces, como la ceja"], correcta: 0,
    explicacion: "«La mirada se le ensombreció apenas, no de rabia, sino de cálculo. La comisura del labio se movió dos milímetros».",
    fuente: { obra: PROTOCOLOS, parrafo: 268, cita: "La comisura del labio se movió dos milímetros." }
  })
];
