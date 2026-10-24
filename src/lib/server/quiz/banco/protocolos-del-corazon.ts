import type { PreguntaQuiz } from "../logica";

/**
 * Banco · Protocolos del Corazón. Párrafos = índice en `paragraphs` de
 * src/data/stories.ts (texto publicado). Ids estables: no reutilizar.
 * Las conexiones apuntan a relatos ya publicados (Dragon's Kitchen, La Frase
 * Maldita, El placer culpable de Lyzi), así que el desafío queda activo.
 */

const OBRA = "protocolos-del-corazon";
const DRAGON = "dragons-kitchen-de-maghnarok";
const FRASE = "la-frase-maldita";
const LYZI = "el-placer-culpable-de-lyzi";
const solo = [OBRA] as const;

type Base = Omit<PreguntaQuiz, "obra" | "requiere">;
const p = (pregunta: Base): PreguntaQuiz => ({ ...pregunta, obra: OBRA, requiere: solo });
const conexion = (otra: string, pregunta: Omit<Base, "tipo" | "spoilers">): PreguntaQuiz => ({
  ...pregunta, tipo: "conexion", obra: OBRA, requiere: [OBRA, otra], spoilers: [otra]
});

export const BANCO_PROTOCOLOS: readonly PreguntaQuiz[] = [
  // ——— Explícitas ———
  p({
    id: "protocolos-e01", tipo: "explicita", dificultad: 1,
    enunciado: "¿Qué es lo primero que hace Aelwyn la mañana en que empieza el relato?",
    opciones: ["Deja a Temari en la escuela comunal", "Ensilla a Eclissio para ir al palacio", "Compra leña en el pueblo", "Se presenta ante la reina Yuki"], correcta: 0,
    explicacion: "«Primero dejó a Temari en la escuela comunal»; después fue a la Casa del Concejo por las llaves de su casa nueva.",
    fuente: { obra: OBRA, parrafo: 2, cita: "Primero dejó a Temari en la escuela comunal" }
  }),
  p({
    id: "protocolos-e02", tipo: "explicita", dificultad: 1,
    enunciado: "¿Cómo se llama el corcel de Aelwyn?",
    opciones: ["Eclissio", "Rugo", "Kogarashi", "Shizumaru"], correcta: 0,
    explicacion: "Eclissio resopla «con una impaciencia que parecía juicio» mientras Aelwyn pelea con el pomo helado.",
    fuente: { obra: OBRA, parrafo: 8, cita: "Eclissio, detrás de ella, soltó aire por la nariz con una impaciencia que parecía juicio." }
  }),
  p({
    id: "protocolos-e03", tipo: "explicita", dificultad: 1,
    enunciado: "¿Cuántas casas tiene Rubí?",
    opciones: ["Tres, en tres continentes distintos", "Una sola, en Cindralith", "Dos: una en Cindralith y otra en Glaciem", "Ninguna: vive en el castillo de Yuki"], correcta: 0,
    explicacion: "Es de Cindralith, Yuki la dejó vivir en Glaciem y Lyzi «también me consiguió una en Sylvalis»: tres casas, aunque prefiere estar en Glaciem con sus amigas.",
    fuente: { obra: OBRA, parrafo: 22, cita: "tener tres casas en tres continentes distintos" }
  }),
  p({
    id: "protocolos-e04", tipo: "explicita", dificultad: 1,
    enunciado: "¿Cómo le dicen en el pueblo a la Panadería Yukimaru?",
    opciones: ["La Miga Terca", "El Palo con Maña", "Bazar de la Copucha", "La Gota de Hielo"], correcta: 0,
    explicacion: "«Todos le dicen La Miga Terca», porque aunque lo calientes, el pan de la tarde sigue peleando.",
    fuente: { obra: OBRA, parrafo: 46, cita: "Esa es la Panadería Yukimaru. Pero todos le dicen La Miga Terca." }
  }),
  p({
    id: "protocolos-e05", tipo: "explicita", dificultad: 1,
    enunciado: "¿Cómo le dicen al Bazar de Kopuko?",
    opciones: ["Bazar de la Copucha", "La Miga Terca", "El Caldo del Diablo", "Makiwara no Magda"], correcta: 0,
    explicacion: "Porque uno va por clavos y sale sabiendo quién se comprometió, quién mintió y quién compró seis mantas nuevas.",
    fuente: { obra: OBRA, parrafo: 39, cita: "—Bazar de la Copucha." }
  }),
  p({
    id: "protocolos-e06", tipo: "explicita", dificultad: 1,
    enunciado: "¿Por dónde entra Rubí al despacho de Yuki?",
    opciones: ["Por una ventana del tercer piso", "Pateando la puerta reforzada", "Por la sombra de Noctalypse", "Por un pasadizo de la biblioteca"], correcta: 0,
    explicacion: "«Entraste por una ventana del tercer piso». «Exacto. Sin romper nada. Estoy evolucionando».",
    fuente: { obra: OBRA, parrafo: 326, cita: "—Entraste por una ventana del tercer piso." }
  }),
  p({
    id: "protocolos-e07", tipo: "explicita", dificultad: 1,
    enunciado: "¿Qué cargo tiene Halrik de Hyldran?",
    opciones: ["Canciller", "Capitán de la guardia", "Archivista real", "Jefe del Concejo"], correcta: 0,
    explicacion: "Aelwyn lo llama así al recibir la canasta, y el mensajero y Valthor también: «canciller».",
    fuente: { obra: OBRA, parrafo: 132, cita: "—Gracias, canciller." }
  }),
  p({
    id: "protocolos-e08", tipo: "explicita", dificultad: 1,
    enunciado: "¿Qué vale sorpresa le toca a Lyzi en su canasta?",
    opciones: ["Mantenimiento responsable de canaletas glaciales", "Una tarde en el spa La Gota de Hielo", "Cincuenta horas de lectura en la biblioteca central", "Entradas para El Caldo del Diablo"], correcta: 0,
    explicacion: "Lyzi lo lee dos veces, «como si la tinta pudiera cambiar por compasión».",
    fuente: { obra: OBRA, parrafo: 167, cita: "—Mantenimiento responsable de canaletas glaciales." }
  }),
  p({
    id: "protocolos-e09", tipo: "explicita", dificultad: 1,
    enunciado: "¿Qué vale sorpresa le toca a Aelwyn?",
    opciones: ["Una degustación educativa de agua en tres temperaturas", "Un viaje en barco por las costas de Glaciem", "Una visita guiada al Archivo Hidrográfico", "Dos horas de canto patrimonial supervisado"], correcta: 0,
    explicacion: "Rubí protesta: «¡Le estás regalando agua de la llave en vasos distintos!». Yuki responde que es agua de deshielo con certificación de origen.",
    fuente: { obra: OBRA, parrafo: 217, cita: "—Degustación educativa de agua en tres temperaturas." }
  }),
  p({
    id: "protocolos-e10", tipo: "explicita", dificultad: 1,
    enunciado: "Según el comunicado de la reina, ¿con qué serán recibidos los niños que viven a las afueras?",
    opciones: ["Con leche, miel y galletitas de nieve", "Con sopa de setas y mantas", "Con chocolate caliente y un desfile", "Con pan patrimonial y un folleto"], correcta: 0,
    explicacion: "El paje duda al leer la última parte —«¿galletitas de nieve?»—, pero la plaza responde «¡Larga vida a la Reina!».",
    fuente: { obra: OBRA, parrafo: 698, cita: "serán recibidos con leche, miel y… ¿galletitas de nieve?" }
  }),
  p({
    id: "protocolos-e11", tipo: "explicita", dificultad: 2,
    enunciado: "¿Cómo le dicen en el pueblo a la Leñería Kogarashi?",
    opciones: ["El Palo con Maña", "La Miga Terca", "Makiwara no Magda", "Bazar de la Copucha"], correcta: 0,
    explicacion: "Porque hay leña seca, húmeda, cara, «leña mentirosa y leña que te mira feo desde el canasto».",
    fuente: { obra: OBRA, parrafo: 53, cita: "en el pueblo le dicen El Palo con Maña" }
  }),
  p({
    id: "protocolos-e12", tipo: "explicita", dificultad: 2,
    enunciado: "Si la señora Mariko dice que acaba de salir una tanda «humilde», ¿qué conviene hacer?",
    opciones: ["Comprar dos, porque está buenísima", "No comprar: es pan duro de la tarde", "Pedir que la calienten otra vez", "Esperar a la segunda tanda"], correcta: 0,
    explicacion: "«Humilde significa que está buenísima pero no quiere admitirlo».",
    fuente: { obra: OBRA, parrafo: 51, cita: "Humilde significa que está buenísima pero no quiere admitirlo." }
  }),
  p({
    id: "protocolos-e13", tipo: "explicita", dificultad: 2,
    enunciado: "En la leñería, ¿qué significa que te digan que una leña está «con carácter»?",
    opciones: ["Que te va a llenar la casa de humo y tristeza", "Que es la más cara del canasto", "Que arde con llama azul", "Que la cortó la señora Magda"], correcta: 0,
    explicacion: "Rubí advierte además que no compre la de la izquierda, porque está húmeda.",
    fuente: { obra: OBRA, parrafo: 55, cita: "significa que va a llenar tu casa de humo y tristeza" }
  }),
  p({
    id: "protocolos-e14", tipo: "explicita", dificultad: 2,
    enunciado: "¿Por qué Rubí le dice a Aelwyn que no use el sendero cubierto de ramas negras?",
    opciones: ["Porque Yuki dijo que era «estructuralmente sospechoso»", "Porque ahí vive Rollito", "Porque se inunda con el deshielo", "Porque lleva al bazar de la copucha"], correcta: 0,
    explicacion: "«¿Y eso qué significa?». «Que nadie quiere averiguar qué quiso decir».",
    fuente: { obra: OBRA, parrafo: 66, cita: "—Yuki dijo que era estructuralmente sospechoso." }
  }),
  p({
    id: "protocolos-e15", tipo: "explicita", dificultad: 2,
    enunciado: "¿Qué vale sorpresa le toca a Rubí, y cómo lo describe ella?",
    opciones: ["Una visita guiada al Archivo Hidrográfico: «una amenaza con letra bonita»", "Canaletas glaciales: «servicio comunitario con moñito»", "Un viaje en barco: «frío, viento y geografía»", "Agua en tres temperaturas: «agua de la llave en vasos distintos»"], correcta: 0,
    explicacion: "Halrik lo defiende como «una actividad cultural»; Rubí insiste: «Es una amenaza con letra bonita».",
    fuente: { obra: OBRA, parrafo: 122, cita: "—“Vale por una visita guiada al Archivo Hidrográfico del Primer Deshielo” —leyó." }
  }),
  p({
    id: "protocolos-e16", tipo: "explicita", dificultad: 2,
    enunciado: "¿Qué vale le salió a Halrik?",
    opciones: ["Un viaje en barco por las costas de Glaciem", "Una tarde en el spa La Gota de Hielo", "Cincuenta horas en la biblioteca central", "Una charla sobre canaletas"], correcta: 0,
    explicacion: "Lo saca «con una rigidez admirable» y lo despacha como «nada relevante».",
    fuente: { obra: OBRA, parrafo: 236, cita: "—Solo un viaje en barco por las costas de Glaciem. Suena aburrido." }
  }),
  p({
    id: "protocolos-e17", tipo: "explicita", dificultad: 2,
    enunciado: "¿Qué consejo da Rubí sobre El Caldo del Diablo?",
    opciones: ["No aceptar leche después, porque es rendirse", "Pedirlo siempre «picante suave»", "Ir antes de la segunda ronda de campanas", "Llevar pan de La Miga Terca para acompañar"], correcta: 0,
    explicacion: "«Un puesto. Una experiencia. Una prueba de carácter. No aceptes leche después, es rendirse».",
    fuente: { obra: OBRA, parrafo: 110, cita: "No aceptes leche después, es rendirse." }
  }),
  p({
    id: "protocolos-e18", tipo: "explicita", dificultad: 2,
    enunciado: "¿Qué distingue la canasta que Halrik le entrega a Aelwyn?",
    opciones: ["Una cinta azul pálido con una pequeña cuenta dorada", "Un sello real de cera roja", "Un paño bordado con copos plateados", "Una tarjeta escrita a mano"], correcta: 0,
    explicacion: "La cinta «no pertenecía a la distribución común». Rubí lo nota: «Mi procedimiento no tiene cuenta dorada».",
    fuente: { obra: OBRA, parrafo: 129, cita: "sujeto con una cinta azul pálido que no pertenecía a la distribución común […] en el centro llevaba una pequeña cuenta dorada" }
  }),
  p({
    id: "protocolos-e19", tipo: "explicita", dificultad: 2,
    enunciado: "¿Con qué frase inaugura Yuki la Fiesta del Primer Deshielo?",
    opciones: ["«Que el primer deshielo recuerde a Glaciem que permanecer no significa quedarse inmóvil»", "«El hielo no olvida, pero aprende a correr»", "«Que el agua lleve nuestros pactos limpios a otras tierras»", "«Glaciem resiste, Glaciem comparte»"], correcta: 0,
    explicacion: "Sigue: «El hielo que ha sostenido nuestras montañas baja hoy para sostener otras tierras».",
    fuente: { obra: OBRA, parrafo: 159, cita: "—Que el primer deshielo recuerde a Glaciem que permanecer no significa quedarse inmóvil" }
  }),
  p({
    id: "protocolos-e20", tipo: "explicita", dificultad: 2,
    enunciado: "¿De dónde baja el agua del Primer Deshielo?",
    opciones: ["Del monte Arhess", "Del lago Shizumaru", "De los glaciares de Hyldran", "De la cumbre Kogarashi"], correcta: 0,
    explicacion: "El hielo del monte Arhess cede y sus aguas bajan por los cauces antiguos «hasta alimentar tres continentes».",
    fuente: { obra: OBRA, parrafo: 86, cita: "El hielo del monte Arhess había empezado a ceder." }
  }),
  p({
    id: "protocolos-e21", tipo: "explicita", dificultad: 2,
    enunciado: "¿Cuántas páginas tiene la carpeta con el plan de Yuki?",
    opciones: ["Cuatrocientas doce, sin contar apéndices", "Cuarenta y siete", "Doce, con anexos", "Mil, en siete volúmenes"], correcta: 0,
    explicacion: "Encuadernada en cuero azul oscuro, con índice, anexos y pestañas de colores. «Los apéndices son buenos», opina Lyzi.",
    fuente: { obra: OBRA, parrafo: 402, cita: "—Cuatrocientas doce. Sin contar apéndices." }
  }),
  p({
    id: "protocolos-e22", tipo: "explicita", dificultad: 2,
    enunciado: "¿Qué método recomienda Yuki porque «eso nunca falla»?",
    opciones: ["Proximidad forzada y protocolos de malentendidos", "Cartas anónimas y flores en la puerta", "Un baile obligatorio en el palacio", "Una misión diplomática conjunta"], correcta: 0,
    explicacion: "Rubí se espanta: «dijiste “proximidad forzada” como si estuvieras hablando de impuestos».",
    fuente: { obra: OBRA, parrafo: 409, cita: "—Recomiendo usar proximidad forzada y protocolos de malentendidos. Eso nunca falla." }
  }),
  p({
    id: "protocolos-e23", tipo: "explicita", dificultad: 2,
    enunciado: "¿Qué lugar propone Lyzi para encerrar a Halrik y Aelwyn?",
    opciones: ["La sala de archivo del ala este", "Una posada cerca del corte de ruta", "El establo de Eclissio", "El despacho de Yuki"], correcta: 0,
    explicacion: "Está climatizada «y tiene una cerradura antigua que a veces se traba». La posada fue idea de Rubí, descartada por tener demasiada gente.",
    fuente: { obra: OBRA, parrafo: 569, cita: "—La sala de archivo del ala este." }
  }),
  p({
    id: "protocolos-e24", tipo: "explicita", dificultad: 2,
    enunciado: "¿Qué título escribe Yuki en la página nueva del plan?",
    opciones: ["Operación Primer Deshielo: intervención afectiva limitada", "Brujas del amor: fase uno", "Protocolo de malentendidos controlados", "Tres amigas y un canciller"], correcta: 0,
    explicacion: "Lo escribe justo después de aceptar, a regañadientes, que son «tres amigas».",
    fuente: { obra: OBRA, parrafo: 586, cita: "Operación Primer Deshielo: intervención afectiva limitada." }
  }),
  p({
    id: "protocolos-e25", tipo: "explicita", dificultad: 2,
    enunciado: "¿Cómo llega Lyzi a la antesala del archivo?",
    opciones: ["Emerge de la sombra bajo la silla de Noctalypse", "Trepa por la ventana como Rubí", "Entra disfrazada de funcionaria", "Atraviesa la pared con sus colas"], correcta: 0,
    explicacion: "La oscuridad se abre «como una tela estirada bajo el agua» y Lyzi sale mareada: «Ufff… ya era hora».",
    fuente: { obra: OBRA, parrafo: 936, cita: "Lyzi emergió desde ella con las orejas un poco bajas" }
  }),
  p({
    id: "protocolos-e26", tipo: "explicita", dificultad: 2,
    enunciado: "¿Qué hace el Espejo de Shizumaru?",
    opciones: ["Suprime la voz durante diez horas a quien sostenga su reflejo directo", "Muestra a quien uno ama de verdad", "Congela a quien lo mire de frente", "Obliga a decir la verdad durante una noche"], correcta: 0,
    explicacion: "No es letal, pero impide pedir ayuda, pronunciar conjuros verbales «o declarar formalmente responsabilidades».",
    fuente: { obra: OBRA, parrafo: 1002, cita: "—El espejo suprime la voz durante diez horas a quien sostenga su reflejo directo." }
  }),
  p({
    id: "protocolos-e27", tipo: "explicita", dificultad: 2,
    enunciado: "¿Quién escolta a Temari y a los demás niños hasta el palacio?",
    opciones: ["Valthor Erethel de Glaciem", "Halrik de Hyldran", "Noctalypse", "La propia reina Yuki"], correcta: 0,
    explicacion: "Lo esperan junto a un carruaje azul y plata, apoyado en un bastón de madera pálida con runas.",
    fuente: { obra: OBRA, parrafo: 812, cita: "estaba Valthor Erethel de Glaciem" }
  }),
  p({
    id: "protocolos-e28", tipo: "explicita", dificultad: 2,
    enunciado: "Según el comunicado de la reina, ¿qué les toca a los adultos?",
    opciones: ["Arreglárselas solos", "Sopa caliente en la plaza", "Alojamiento en el ala este", "Un vale de canaletas"], correcta: 0,
    explicacion: "«Los adultos tendrán que arreglárselas solos. Fin del comunicado».",
    fuente: { obra: OBRA, parrafo: 704, cita: "—Los adultos tendrán que arreglárselas solos. Fin del comunicado." }
  }),
  p({
    id: "protocolos-e29", tipo: "explicita", dificultad: 2,
    enunciado: "Cuando la tinta se deshace sobre el papel, ¿qué sí permanece?",
    opciones: ["Los dibujos de Aelwyn", "Las runas de Halrik", "Las letras escritas con sangre", "Los sellos reales"], correcta: 0,
    explicacion: "La maldición arranca «la intención misma de hablar» de la letra, pero un círculo, una puerta y dos figuras sí se quedan.",
    fuente: { obra: OBRA, parrafo: 961, cita: "Dibujó un círculo, una puerta, dos pequeñas figuras. Eso sí permaneció." }
  }),
  p({
    id: "protocolos-e30", tipo: "explicita", dificultad: 3,
    enunciado: "¿Qué llevó Halrik en su SEGUNDA visita a la casa de Aelwyn?",
    opciones: ["Un mapa actualizado de patrullas y una lista de proveedores certificados de leña", "Una copia del permiso de residencia rural con tres sellos", "Documentos sobre su incorporación a las fuerzas especiales", "Pan, porque el proveedor certificado pasaba por su ruta"], correcta: 0,
    explicacion: "La primera trajo el permiso con tres sellos; la tercera, los documentos de las fuerzas especiales y una cláusula que «podía prestarse a confusión».",
    fuente: { obra: OBRA, parrafo: 75, cita: "La segunda vez trajo un mapa actualizado de patrullas y una lista de proveedores certificados de leña." }
  }),
  p({
    id: "protocolos-e31", tipo: "explicita", dificultad: 3,
    enunciado: "Además del pan y el vale, ¿qué contiene la canasta de Aelwyn?",
    opciones: ["Té de raíz cálida, ungüento para manos agrietadas, cerillas secas y una guía de rutas rurales", "Pan de semillas, guantes de repuesto, dos velas de emergencia y sal especiada", "Queso duro, sal gruesa, ajíes secos y una tetera de cobre", "Miel fría, mantas y un mapa de patrullas"], correcta: 0,
    explicacion: "La de Rubí traía pan de semillas, guantes, velas y sal especiada. Rubí repara en el ungüento: «¿Ungüento para manos?».",
    fuente: { obra: OBRA, parrafo: 133, cita: "pan, té de raíz cálida, ungüento para manos agrietadas, cerillas secas, una guía breve de rutas rurales y un vale sorpresa" }
  }),
  p({
    id: "protocolos-e32", tipo: "explicita", dificultad: 3,
    enunciado: "Lyzi notó que el corazón de Yuki «cantaba demasiado fuerte» cada vez que pasaba frente a cierto libro. ¿Cuál?",
    opciones: ["Genealogía milenaria de Glaciem — Tomo VI", "Cuarenta y siete protocolos de conservación de bisagras históricas del ala norte", "El conde vampiro y la rosa", "Consideraciones preliminares sobre dinámicas afectivas"], correcta: 0,
    explicacion: "«Ese lomo era hueco». El de las bisagras es otro ejemplo de título aburrido que nadie abriría.",
    fuente: { obra: OBRA, parrafo: 430, cita: "Tu corazón cantaba demasiado fuerte cada vez que pasabas frente a Genealogía milenaria de Glaciem — Tomo VI." }
  }),
  p({
    id: "protocolos-e33", tipo: "explicita", dificultad: 3,
    enunciado: "Según la corrección de Yuki, ¿qué tiene su colección de «El conde vampiro y la rosa»?",
    opciones: ["Siete volúmenes publicados, cuatro sagas, dos spinoffs y borradores firmados", "Doce volúmenes y una edición ilustrada", "Tres volúmenes y un spinoff sin firmar", "Siete volúmenes, todos prestados por Lyzi"], correcta: 0,
    explicacion: "«Los borradores de autor no cuentan… pero están firmados». Con dedicatoria.",
    fuente: { obra: OBRA, parrafo: 461, cita: "—Corrección: siete volúmenes publicados. Más cuatro sagas y dos spinoffs." }
  }),
  p({
    id: "protocolos-e34", tipo: "explicita", dificultad: 3,
    enunciado: "¿Qué dibujan Lyzi y Rubí en una esquina del plan?",
    opciones: ["Un zorrito violeta y una pequeña llama", "Un corazón azul y un copo", "Un ciempiés y un ratón", "Una corona y una espada"], correcta: 0,
    explicacion: "Lyzi: «Es un sello espiritual con forma de zorrito». Rubí añade la llama: «Ahora está bendecido».",
    fuente: { obra: OBRA, parrafo: 600, cita: "una pequeña llama dibujada junto al zorrito" }
  }),
  p({
    id: "protocolos-e35", tipo: "explicita", dificultad: 3,
    enunciado: "¿Qué compuertas debía abrir Rubí según las instrucciones de Yuki?",
    opciones: ["La tres y la cinco, llegando antes que el agua a la siete", "La uno y la siete", "Solo la cinco", "Todas las del canal norte"], correcta: 0,
    explicacion: "Lo lee de un papel arrugado: «Esto sería más fácil si las numeraran con fuego».",
    fuente: { obra: OBRA, parrafo: 612, cita: "Yuki dijo que la tres y la cinco —murmuró, mirando las palancas—, y que llegara antes que el agua a la siete." }
  }),
  p({
    id: "protocolos-e36", tipo: "explicita", dificultad: 3,
    enunciado: "¿Cómo llama oficialmente el Concejo al Festival de Nieve Dulce?",
    opciones: ["«Actividad familiar de integración estacional»", "«Jornada patrimonial de repostería»", "«Celebración de dignidad azucarada»", "«Feria de invierno supervisada»"], correcta: 0,
    explicacion: "Halrik se lo cuenta a Aelwyn mientras ella prueba un pastel de miel fría «menos dulce de lo que esperaba».",
    fuente: { obra: OBRA, parrafo: 644, cita: "que el Concejo insiste en llamar “actividad familiar de integración estacional”." }
  }),
  p({
    id: "protocolos-e37", tipo: "explicita", dificultad: 3,
    enunciado: "¿Dónde debía estar el Espejo de Shizumaru?",
    opciones: ["En el ala oeste", "En el ala este", "En el Archivo Hidrográfico", "En el despacho de Yuki"], correcta: 0,
    explicacion: "Terminó en el ala este porque el papiro con la orden se mojó «en el incidente con la terrorista roja».",
    fuente: { obra: OBRA, parrafo: 979, cita: "—No. Se suponía que debía estar en el ala oeste." }
  }),
  p({
    id: "protocolos-e38", tipo: "explicita", dificultad: 3,
    enunciado: "¿Qué gesto inventa Aelwyn para referirse a Rubí?",
    opciones: ["Dos dedos imitando cuernos y una pequeña explosión con la mano", "Una mano en llamas sobre la cabeza", "Un puño golpeando la palma", "Tres dedos en forma de corona"], correcta: 0,
    explicacion: "Halrik añade una variación con la palma inclinada para decir «probablemente Rubí».",
    fuente: { obra: OBRA, parrafo: 1032, cita: "Aelwyn inventó un gesto para Rubí: dos dedos imitando cuernos y una pequeña explosión con la mano." }
  }),
  p({
    id: "protocolos-e39", tipo: "explicita", dificultad: 3,
    enunciado: "¿Qué colación acompaña el mantenimiento de canaletas, según Yuki?",
    opciones: ["Pan patrimonial", "Galletitas de nieve", "Sopa del Caldo del Diablo", "Pastel de miel fría"], correcta: 0,
    explicacion: "Rubí pregunta si es «pan duro de La Miga Terca». Yuki lo corrige con dignidad: «Pan patrimonial».",
    fuente: { obra: OBRA, parrafo: 188, cita: "—Pan patrimonial." }
  }),
  p({
    id: "protocolos-e40", tipo: "explicita", dificultad: 3,
    enunciado: "¿Qué le dice Valthor a Halrik al pasar junto a él?",
    opciones: ["Que las leyes no sienten y que conviene no esconderse siempre detrás de ellas", "Que la reina ya sabe lo de las compuertas", "Que cuide a la comandante como a una hija", "Que el espejo del ala este es peligroso"], correcta: 0,
    explicacion: "«Las leyes no sienten. Nosotros sí». Más tarde Aelwyn le pregunta a Halrik si él se esconde detrás de las leyes.",
    fuente: { obra: OBRA, parrafo: 844, cita: "—Las leyes no sienten —dijo, sin levantar la voz—. Nosotros sí. Por eso conviene no esconderse siempre detrás de ellas." }
  }),
  p({
    id: "protocolos-e41", tipo: "explicita", dificultad: 3,
    enunciado: "¿Detrás de qué dice Aelwyn que se escondió durante años?",
    opciones: ["De un voto", "De su armadura", "De las leyes de Glaciem", "De su espada"], correcta: 0,
    explicacion: "«Yo me escondí detrás de un voto durante años». «¿Y ahora?». «Ahora no sé dónde esconderme».",
    fuente: { obra: OBRA, parrafo: 891, cita: "—Yo me escondí detrás de un voto durante años —dijo ella." }
  }),

  // ——— Implícitas ———
  p({
    id: "protocolos-i01", tipo: "implicita", dificultad: 1,
    enunciado: "Cuando Rubí murmura «Motivos administrativos» mirando a Halrik, ¿qué está insinuando?",
    opciones: ["Que Halrik visita a Aelwyn porque le interesa ella, no por trámites", "Que Halrik vigila a Aelwyn por orden de Yuki", "Que los papeles de Aelwyn están incompletos", "Que Halrik quiere comprarle la casa"], correcta: 0,
    explicacion: "Las visitas se acumulan (permisos, mapas, cláusulas) y Halrik baja la mirada «medio segundo más de lo necesario». Rubí: «Ajá».",
    fuente: { obra: OBRA, parrafo: 77, cita: "—Motivos administrativos —murmuró." }
  }),
  p({
    id: "protocolos-i02", tipo: "implicita", dificultad: 1,
    enunciado: "¿Por qué la canasta de Aelwyn tiene cinta con cuenta dorada y la de Rubí no?",
    opciones: ["Porque Halrik la preparó con un cuidado especial para ella", "Porque a los comandantes les toca el lote real", "Porque se acabaron las cintas para la de Rubí", "Porque Lyzi decoró solo esa canasta"], correcta: 0,
    explicacion: "Halrik se escuda en que «la disponibilidad de materiales decorativos varía según lote». Nadie le cree, y Aelwyn le sigue el juego: «Quizá mi lote tenía mejor clima».",
    fuente: { obra: OBRA, parrafo: 146, cita: "—La disponibilidad de materiales decorativos varía según lote." }
  }),
  p({
    id: "protocolos-i03", tipo: "implicita", dificultad: 1,
    enunciado: "Cuando Rubí le habla de Halrik y Aelwyn, Yuki responde de inmediato «Continúa». ¿Qué delata eso?",
    opciones: ["Que a Yuki le interesa el chisme tanto como a Rubí", "Que Yuki está molesta con Halrik", "Que Yuki quiere cambiar de tema", "Que Yuki no se había dado cuenta de nada"], correcta: 0,
    explicacion: "Rubí lo traduce: es «la frase más Yuki posible para decir “quiero copucha”». Lyzi lo remata: «copucha con sello real».",
    fuente: { obra: OBRA, parrafo: 353, cita: "—Eso fue la frase más Yuki posible para decir “quiero copucha”." }
  }),
  p({
    id: "protocolos-i04", tipo: "implicita", dificultad: 2,
    enunciado: "«Pobre Halrik», dice Rubí. «Pobre Aelwyn», dice Lyzi. «Pobre protocolo», dice Yuki. ¿Qué anuncian las tres?",
    opciones: ["Que ya decidieron meterse en ese romance", "Que Halrik será castigado por descuidar el festival", "Que Aelwyn tendrá que volver a Artanis", "Que la fiesta se cancelará por el deshielo"], correcta: 0,
    explicacion: "Acaban de ver a Halrik con Aelwyn y se miran entre ellas: Rubí sonríe con malicia, Lyzi «como si acabara de ver florecer una travesura», y Yuki calcula. El capítulo siguiente se llama «Tres brujas del amor».",
    fuente: { obra: OBRA, parrafo: 284, cita: "—Pobre protocolo." }
  }),
  p({
    id: "protocolos-i05", tipo: "implicita", dificultad: 2,
    enunciado: "Lyzi dice que el sentido de responsabilidad de Halrik «tiene ojos azul profundo con anillo dorado». ¿De quién habla?",
    opciones: ["De Aelwyn", "De la reina Yuki", "Del propio Halrik", "De Temari"], correcta: 0,
    explicacion: "Yuki acaba de decir que Halrik se ofrecerá a escoltar a Aelwyn «porque su sentido de responsabilidad está comprometido». Lyzi le pone cara a ese compromiso: los ojos de Aelwyn.",
    fuente: { obra: OBRA, parrafo: 539, cita: "—Su sentido de responsabilidad tiene ojos azul profundo con anillo dorado —dijo Lyzi." }
  }),
  p({
    id: "protocolos-i06", tipo: "implicita", dificultad: 2,
    enunciado: "¿Por qué Halrik describe su propio vale como aburrido justo antes de ofrecerlo?",
    opciones: ["Para poder ofrecérselo a Aelwyn sin que parezca un gesto romántico", "Porque de verdad le teme al mar", "Porque quiere el vale de canaletas de Lyzi", "Porque Yuki le prohibió aceptar regalos"], correcta: 0,
    explicacion: "Minimiza el viaje («Nada que merezca particular entusiasmo») y elogia el agua de ella («Me das envidia») para terminar en: «¿Lo quieres cambiar conmigo?».",
    fuente: { obra: OBRA, parrafo: 239, cita: "—Frío, viento, explicaciones geográficas probablemente excesivas. Nada que merezca particular entusiasmo." }
  }),
  p({
    id: "protocolos-i07", tipo: "implicita", dificultad: 2,
    enunciado: "Cuando el mensajero habla de «una máscara mala», Halrik se queda en silencio. ¿Qué está pensando?",
    opciones: ["Que la responsable es Rubí", "Que fue un atentado contra la reina", "Que Aelwyn está en peligro", "Que los guardias mienten"], correcta: 0,
    explicacion: "Una sospecha «quizá demasiado precisa» le pasa por los ojos. Los guardias ya habían visto el cabello rojo bajo la capucha.",
    fuente: { obra: OBRA, parrafo: 655, cita: "una sospecha, quizá demasiado precisa, pasara por sus ojos sin convertirse en acusación" }
  }),
  p({
    id: "protocolos-i08", tipo: "implicita", dificultad: 2,
    enunciado: "Halrik cuenta que, cuando Yuki era niña, «alguien» se quedaba despierto junto a su habitación. ¿Quién?",
    opciones: ["El propio Halrik", "Valthor", "Nayara, su madre", "Un guardia sin nombre"], correcta: 0,
    explicacion: "Aelwyn no necesita preguntar, pero lo hace: «¿Usted?». «A veces».",
    fuente: { obra: OBRA, parrafo: 756, cita: "Saberlo no impedía que alguien se quedara despierto junto a su habitación." }
  }),
  p({
    id: "protocolos-i09", tipo: "implicita", dificultad: 2,
    enunciado: "¿Qué ironía encierra el ungüento para manos?",
    opciones: ["Halrik lo puso en la canasta de Aelwyn y termina usándose en su mano raspada", "Era de Rubí y quemaba", "Lyzi lo había cambiado por miel", "Aelwyn lo regala a Temari sin abrirlo"], correcta: 0,
    explicacion: "En el festival Halrik lo llamó «una previsión razonable». En el archivo, Aelwyn le cura el nudillo con él.",
    fuente: { obra: OBRA, parrafo: 1022, cita: "Aelwyn sacó el ungüento que él mismo había puesto en su canasta y destapó el frasco." }
  }),
  p({
    id: "protocolos-i10", tipo: "implicita", dificultad: 2,
    enunciado: "La puerta está cerrada con cerrojo por dentro aunque el candado de Lyzi ya se soltó. ¿Qué concluye Rubí?",
    opciones: ["Que podían salir y eligieron no hacerlo", "Que el espejo los dejó atrapados", "Que Noct los encerró con su sombra", "Que ya se fueron por la ventana"], correcta: 0,
    explicacion: "Noct objeta que «también podría probar cautela». Rubí: «Noct, por favor. Déjame tener esto».",
    fuente: { obra: OBRA, parrafo: 1108, cita: "—Prueba que podían salir y no salieron." }
  }),
  p({
    id: "protocolos-i11", tipo: "implicita", dificultad: 3,
    enunciado: "¿Quién está detrás del oportuno comunicado sobre los niños y las galletitas de nieve?",
    opciones: ["Yuki, avisada por Lyzi en silencio para resolver lo de Temari", "El Concejo, que ya lo tenía previsto", "Halrik, que mandó un mensajero", "Valthor, por iniciativa propia"], correcta: 0,
    explicacion: "Lyzi escucha la preocupación de Aelwyn y llama a Yuki con el pensamiento: «Temari». Yuki: «Yo me encargo». Poco después suenan las trompetas. Halrik lo resume: «soluciona el problema sospechosamente».",
    fuente: { obra: OBRA, parrafo: 686, cita: "Yo me encargo." }
  }),
  p({
    id: "protocolos-i12", tipo: "implicita", dificultad: 3,
    enunciado: "¿Por qué Yuki declara que lo ocurrido «no es culpa directa de Rubí»?",
    opciones: ["Porque la cadena de accidentes fue demasiado absurda: el propio territorio parecía conspirar", "Porque Rubí no abrió ninguna compuerta", "Porque la orden de mover el espejo la dio Halrik", "Porque Noct confesó que fue su sombra"], correcta: 0,
    explicacion: "Compuertas, un papiro mojado justo en la palabra clave, un espejo en el ala equivocada y una cerradura despertada. Lyzi: «Caelyndor también está conspirando». Yuki: «El territorio, al parecer, presentó enmiendas».",
    fuente: { obra: OBRA, parrafo: 984, cita: "La cadena era demasiado absurda para ser simple incompetencia" }
  }),
  p({
    id: "protocolos-i13", tipo: "implicita", dificultad: 3,
    enunciado: "Sin voz, Halrik señala el vale de agua, luego su pecho, y hace un gesto impreciso. ¿Por qué se ríe Aelwyn?",
    opciones: ["Porque repite, sin palabras, lo que él dijo en el festival: «El agua glacial tiene un no sé qué»", "Porque el gesto significa «Rubí» en su idioma inventado", "Porque confundió el vale de agua con el del barco", "Porque intenta pedir más ungüento"], correcta: 0,
    explicacion: "En la plaza Halrik había fingido envidiar el vale de agua. Ahora, con los vales cambiados, la frase vuelve completa sin necesidad de decirla.",
    fuente: { obra: OBRA, parrafo: 1138, cita: "El agua glacial tiene un no sé qué." }
  }),
  p({
    id: "protocolos-i14", tipo: "implicita", dificultad: 3,
    enunciado: "Rubí quiere espiar y Yuki se niega «precisamente por protocolo». ¿A qué protocolo se refiere?",
    opciones: ["A su propio plan, que incluía saber cuándo fingir que no se escuchó nada", "Al reglamento de la guardia del ala este", "A la ley de Glaciem sobre los espejos malditos", "Al protocolo de bienvenida de los residentes nuevos"], correcta: 0,
    explicacion: "La carpeta de cuatrocientas doce páginas tenía una sección titulada «Interrupciones oportunas: cuándo abrir una puerta y cuándo fingir que no se escuchó nada».",
    fuente: { obra: OBRA, parrafo: 527, cita: "una sección titulada Interrupciones oportunas: cuándo abrir una puerta y cuándo fingir que no se escuchó nada" }
  }),

  // ——— Conexiones (con relatos ya publicados) ———
  conexion(DRAGON, {
    id: "protocolos-c01", dificultad: 3,
    enunciado: "Valthor, el anciano que escolta a los niños hasta el palacio, aparece también en Dragon's Kitchen de Maghnarok. ¿Cómo sigue el concurso?",
    opciones: ["Por un espejo, convencido de que lo llaman unos estafadores", "Como juez invitado en el set", "Por una carta que lee Lyzi en voz alta", "Montado en Glasyra, desde el público"], correcta: 0,
    explicacion: "Desde su biblioteca de Glaciem refunfuña contra los «estafadores de cristales de larga distancia» hasta que reconoce a Rubí con harina en la cara.",
    fuente: { obra: DRAGON, parrafo: 31, cita: "¡Malditos estafadores de cristales de larga distancia, otra vez con sus fraudes! —refunfuñó Valthor, mirando de cerca el espejo." }
  }),
  conexion(DRAGON, {
    id: "protocolos-c02", dificultad: 3,
    enunciado: "En Dragon's Kitchen, ¿por qué plato vota Valthor y con qué argumento?",
    opciones: ["Por el curado, para que Rubí aprenda de fermentación", "Por el postre, porque suena exótico", "Por la mermelada de jabalí, porque quiere experimentar", "Por la sopa, porque es lo más seguro"], correcta: 0,
    explicacion: "El voto por el postre «exótico» es de Selyra. La mermelada de jabalí la anota en sus apuntes con ganas de experimentar, pero su voto fue por el curado.",
    fuente: { obra: DRAGON, parrafo: 85, cita: "Voto por el curado. Que aprenda algo de fermentación." }
  }),
  conexion(FRASE, {
    id: "protocolos-c03", dificultad: 3,
    enunciado: "Antes de instalarse en el campo, Aelwyn ya figuraba en los planes de Yuki. En La Frase Maldita, ¿para qué pensaba enviarla?",
    opciones: ["A cobrar la recompensa por una criatura mística que ronda las islas privadas de un noble de Glaciem", "A escoltar a Temari hasta Artanis", "A vigilar el deshielo del monte Arhess", "A negociar con los gansos de Sylvalis"], correcta: 0,
    explicacion: "Yuki se lo cuenta a Noctalypse: la recompensa iría para el reino, «pero viendo a Rubí en ese estado»… Noct se alista.",
    fuente: { obra: FRASE, parrafo: 131, cita: "Pensaba mandar a Aelwyn para cobrar la recompensa para el reino" }
  }),
  conexion(LYZI, {
    id: "protocolos-c04", dificultad: 3,
    enunciado: "Lyzi pide que no le cuenten a Rollito lo maravillosa que es, porque «se pone celoso». En El placer culpable de Lyzi, ¿qué le da de comer?",
    opciones: ["Champidulces", "Galletitas de nieve", "Ratoncitos de azúcar", "Pan patrimonial"], correcta: 0,
    explicacion: "Unos dulces redondos y blandos color miel. Rollito, un ciempiés gigante, escupe uno «con una precisión humillante» mientras mira a Rubí.",
    fuente: { obra: LYZI, parrafo: 72, cita: "Toma, Rollito. Champidulces." }
  })
];
