export type GlossaryCategory = {
  slug: string;
  title: string;
  description: string;
};

export type GlossaryEntry = {
  term: string;
  categorySlug: string;
  category: string;
  definition: string;
  seeAlso?: { label: string; href: string }[];
};

export const glossaryCategories: GlossaryCategory[] = [
  {
    slug: "cosmologia-y-el-velo",
    title: "Cosmología y el Velo",
    description:
      "Los nombres que sostienen la estructura del mundo: la membrana que separa lo vivo de lo astral, las heridas que la atraviesan y las presencias que empujan desde el otro lado."
  },
  {
    slug: "regiones-y-territorios",
    title: "Regiones y territorios",
    description:
      "Reinos, fronteras y tierras heridas de Caelyndor. Cada región respira distinto, y el Archivo registra cómo se defiende, a quién obedece y qué guarda bajo su suelo."
  },
  {
    slug: "facciones-y-poderes",
    title: "Facciones y poderes",
    description:
      "Casas, órdenes y proyectos de dominio que mueven el continente. Algunas gobiernan a la luz. Otras prefieren que la luz no llegue."
  },
  {
    slug: "conceptos-del-archivo",
    title: "Conceptos del Archivo",
    description:
      "El lenguaje interno con el que los curadores clasifican el mundo: escalas, afinidades, firmas y costumbres del propio Archivo."
  }
];

export const glossaryEntries: GlossaryEntry[] = [
  {
    term: "El Velo",
    categorySlug: "cosmologia-y-el-velo",
    category: "Cosmología y el Velo",
    definition:
      "Membrana entre el mundo material y lo astral. Mientras estuvo entero, los reinos pudieron fingir que la noche tenía límites. Su integridad divide la historia de Caelyndor en un antes y un después, y su rasgadura es el eje de la saga troncal.",
    seeAlso: [
      { label: "Cronología", href: "/cronologia" },
      { label: "CAELYNDOR I: El Velo rasgado", href: "/nuevo-libro" }
    ]
  },
  {
    term: "La Rasgadura",
    categorySlug: "cosmologia-y-el-velo",
    category: "Cosmología y el Velo",
    definition:
      "El evento en que el Velo se abre. No fue una invasión ni una guerra declarada: fue una herida. Desde entonces, lo que cruza no siempre tiene nombre, y lo que tiene nombre no siempre debería pronunciarse entero.",
    seeAlso: [{ label: "Cronología", href: "/cronologia" }]
  },
  {
    term: "La Herida del Cielo",
    categorySlug: "cosmologia-y-el-velo",
    category: "Cosmología y el Velo",
    definition:
      "Centro sellado del mundo. El Archivo la registra como región y como advertencia: los sellos que la contienen son anteriores a la mayoría de los reinos que hoy presumen de antigüedad.",
    seeAlso: [{ label: "Bestiario", href: "/archivo/bestiario" }]
  },
  {
    term: "El Eclipse",
    categorySlug: "cosmologia-y-el-velo",
    category: "Cosmología y el Velo",
    definition:
      "Nombre popular de la presión que Noctalypse ejerce sobre la realidad. No es un fenómeno astronómico: es el modo en que el mundo percibe a una fuerza axial que no termina de pasar. Los registros lo describen como una ausencia que ocupa lugar.",
    seeAlso: [{ label: "Noctalypse", href: "/personajes/noctalypse" }]
  },
  {
    term: "Plano de Azhel",
    categorySlug: "cosmologia-y-el-velo",
    category: "Cosmología y el Velo",
    definition:
      "Plano onírico vinculado al Djinn Azhel. Varias anomalías del Bestiario —incluidos los gólems del sueño recombinado— proceden de sus mareas. Soñar cerca de sus bordes está clasificado como imprudencia, no como descanso.",
    seeAlso: [{ label: "Bestiario", href: "/archivo/bestiario" }]
  },
  {
    term: "Glaciem",
    categorySlug: "regiones-y-territorios",
    category: "Regiones y territorios",
    definition:
      "Reino del hielo: tundras, cordilleras heladas, mares donde los pescadores cantan sobre Uru-Uru. Lo gobierna Nayara, Regina Glaciei, con Halrik como mariscal de frontera y Valthor como memoria del trono. En Glaciem la lealtad se mide en silencio sostenido.",
    seeAlso: [
      { label: "Nayara", href: "/personajes/nayara" },
      { label: "Halrik", href: "/personajes/halrik" },
      { label: "Valthor", href: "/personajes/valthor" }
    ]
  },
  {
    term: "Cindralith",
    categorySlug: "regiones-y-territorios",
    category: "Regiones y territorios",
    definition:
      "Territorio volcánico de campos ardientes, muros cálidos y ruinas soleadas. Bajo su subsuelo duerme Rhazeth, la bestia tectónica, y sobre él se enseña etiqueta con rigor de fuego: Aelrhyssa, la Institutriz de la Llama, es su figura formativa.",
    seeAlso: [
      { label: "Aelrhyssa", href: "/personajes/aelrhyssa" },
      { label: "Bestiario", href: "/archivo/bestiario" }
    ]
  },
  {
    term: "Sylvalis",
    categorySlug: "regiones-y-territorios",
    category: "Regiones y territorios",
    definition:
      "Bosque antiguo de claros florales, rutas sagradas y árboles que recuerdan. Su corazón es el Árbol de Lüm, custodiado por los treants. Faelan lo recorre como quien cobra una deuda vieja, y los ecos de Sylvalis ya tienen música propia.",
    seeAlso: [
      { label: "Faelan", href: "/personajes/faelan" },
      { label: "Música", href: "/musica" }
    ]
  },
  {
    term: "Lunaris",
    categorySlug: "regiones-y-territorios",
    category: "Regiones y territorios",
    definition:
      "Tierras bajo luna permanente: cavernas altas, torres abandonadas, pantanos de niebla. Allí cazan los murciélagos de luna negra y croan las ranas de niebla. La noche de Lunaris no es oscuridad: es costumbre.",
    seeAlso: [{ label: "Bestiario", href: "/archivo/bestiario" }]
  },
  {
    term: "Tierra de Nadie",
    categorySlug: "regiones-y-territorios",
    category: "Regiones y territorios",
    definition:
      "Franja sin corona donde se abre la Gran Falla, la herida continental que sella a Korvess, el lobo que mató a Voltrak. La Falla no es solo una prisión: es el recordatorio del precio que costó cerrarla.",
    seeAlso: [{ label: "Bestiario", href: "/archivo/bestiario" }]
  },
  {
    term: "Continente Oscuro",
    categorySlug: "regiones-y-territorios",
    category: "Regiones y territorios",
    definition:
      "Dominio al otro lado de los mapas cómodos, en cuyas profundidades crece el Árbol del Rey Demonio. Los registros que llegan de allí pasan primero por el Velo y por Aethel Cineris, y aun así llegan incompletos.",
    seeAlso: [{ label: "Bestiario", href: "/archivo/bestiario" }]
  },
  {
    term: "Jurak'Thalon",
    categorySlug: "regiones-y-territorios",
    category: "Regiones y territorios",
    definition:
      "Rutas secas, llanuras cálidas y bordes de selva antigua. Patria del predador Lyrzal y de caravanas que aprendieron a viajar mirando dos horizontes a la vez. Khaal'Zar Omunyek trae consigo el peso de sus leyes de arena.",
    seeAlso: [
      { label: "Khaal'Zar Omunyek", href: "/personajes/khaal-zar-omunyek" },
      { label: "Música", href: "/musica" }
    ]
  },
  {
    term: "Aethel Cineris",
    categorySlug: "regiones-y-territorios",
    category: "Regiones y territorios",
    definition:
      "Sede de la Llama Inextinguible, donde el dogma se enseña como se enseña a respirar. Allí se formó Alistair Valerius, su Sexto Preceptor, entre la ley absoluta y el descubrimiento tardío de lo que cuesta proteger.",
    seeAlso: [{ label: "Alistair Valerius", href: "/personajes/alistair-valerius" }]
  },
  {
    term: "Torre Negra del Norte",
    categorySlug: "regiones-y-territorios",
    category: "Regiones y territorios",
    definition:
      "Enclave septentrional que el Archivo asocia con Tenebrys y con registros que prefieren no ser leídos dos veces. Su nombre aparece en los márgenes de más documentos de los que admite oficialmente.",
    seeAlso: [{ label: "Bestiario", href: "/archivo/bestiario" }]
  },
  {
    term: "Sol Negro",
    categorySlug: "facciones-y-poderes",
    category: "Facciones y poderes",
    definition:
      "Proyecto soberano de Kaen Varthalion, el Rey de la Ceniza: una corona construida sobre heridas convertidas en estructura. Sus piezas mayores llevan nombre de gema —el Diamante (Carolina), la Esmeralda (Valther), el Zafiro (Arvenn) y la Obsidiana Umbral (Asha'al)— y cada una sostiene un frente: percepción, conquista, información y filo.",
    seeAlso: [
      { label: "Kaen Varthalion", href: "/personajes/kaen-varthalion" },
      { label: "Carolina Varthalion", href: "/personajes/carolina-varthalion" },
      { label: "Personajes", href: "/personajes" }
    ]
  },
  {
    term: "Casa Varthalion",
    categorySlug: "facciones-y-poderes",
    category: "Facciones y poderes",
    definition:
      "Linaje del que descienden Kaen y Carolina. Su historia reciente se cuenta en dos escenarios: el trono que Kaen intenta levantar desde la ceniza y los escenarios donde Carolina convierte el glamour en una forma precisa de dominio.",
    seeAlso: [
      { label: "Kaen Varthalion", href: "/personajes/kaen-varthalion" },
      { label: "Carolina Varthalion", href: "/personajes/carolina-varthalion" }
    ]
  },
  {
    term: "La Llama Inextinguible",
    categorySlug: "facciones-y-poderes",
    category: "Facciones y poderes",
    definition:
      "Orden dogmática con sede en Aethel Cineris, organizada en preceptores. Predica que la llama disciplinada ilumina y la llama suelta consume; sus críticos señalan que la orden no siempre distingue cuál de las dos sostiene. Alistair Valerius es su Sexto Preceptor.",
    seeAlso: [{ label: "Alistair Valerius", href: "/personajes/alistair-valerius" }]
  },
  {
    term: "Alto Consejo de Glaciem",
    categorySlug: "facciones-y-poderes",
    category: "Facciones y poderes",
    definition:
      "Estructura que sostiene el trono helado. Valthor, miembro fundador, fue testigo del ascenso de Nayara, del exilio de Kaelion y del nacimiento de Yuki; su deber ha sido mantener la estructura aunque su corazón haya querido romperla.",
    seeAlso: [
      { label: "Valthor", href: "/personajes/valthor" },
      { label: "Nayara", href: "/personajes/nayara" }
    ]
  },
  {
    term: "Senda de la Fe",
    categorySlug: "facciones-y-poderes",
    category: "Facciones y poderes",
    definition:
      "Camino devocional vinculado al plano de Azhel, citado por el Evangelio del Silencio. El Archivo la trata con la cautela reservada a las fes que funcionan: lo que promete y lo que cobra todavía no están del todo separados en los registros.",
    seeAlso: [{ label: "Bestiario", href: "/archivo/bestiario" }]
  },
  {
    term: "Afinidad",
    categorySlug: "conceptos-del-archivo",
    category: "Conceptos del Archivo",
    definition:
      "Firma elemental y temática con la que el Archivo resume a una figura: Hielo / Memoria / Quietud para Yuki, Fuego / Sangre / Juramento para Rubí. No es una clasificación de poder sino de tendencia: describe hacia dónde se inclina alguien cuando el mundo lo empuja.",
    seeAlso: [{ label: "Personajes", href: "/personajes" }]
  },
  {
    term: "Nivel de amenaza",
    categorySlug: "conceptos-del-archivo",
    category: "Conceptos del Archivo",
    definition:
      "Escala con la que el Bestiario ordena el peligro, de las criaturas regionales a las catástrofes continentales. Un nivel IV señala bestia mítica; un nivel V, como Korvess, significa que la pregunta ya no es cómo vencerla sino cómo impedir que vuelva a caminar.",
    seeAlso: [{ label: "Bestiario", href: "/archivo/bestiario" }]
  },
  {
    term: "Curador del Archivo",
    categorySlug: "conceptos-del-archivo",
    category: "Conceptos del Archivo",
    definition:
      "Voz que firma una entrada del Archivo. Cada curador deja su sesgo como huella: Yuki Arhess anota con prudencia glacial, Rubí Kaelynn Vaer'Solyn con franqueza encendida, Lyzi con intuición de grieta, y Noctalypse... también firma, y el Archivo ha decidido no preguntar cómo.",
    seeAlso: [{ label: "Bestiario", href: "/archivo/bestiario" }]
  },
  {
    term: "La Forja",
    categorySlug: "conceptos-del-archivo",
    category: "Conceptos del Archivo",
    definition:
      "Espacio editorial donde se forja el libro en curso. Su estado se publica en el portal: escritura, edición, portada, maquetación e impresión, cada proceso con su propio avance. Hoy arde con CAELYNDOR I: El Velo rasgado.",
    seeAlso: [{ label: "Nuevo Libro", href: "/nuevo-libro" }]
  },
  {
    term: "Evangelio del Silencio",
    categorySlug: "conceptos-del-archivo",
    category: "Conceptos del Archivo",
    definition:
      "Cuerpo de registros citado por el Archivo para documentar entidades que no dejan testigos cómodos. Se desconoce si su nombre describe su contenido o su método de redacción. Las entradas que dependen de él se marcan con estado de archivo provisional.",
    seeAlso: [{ label: "Bestiario", href: "/archivo/bestiario" }]
  }
];

export function getGlossaryEntriesByCategory(categorySlug: string) {
  return glossaryEntries.filter((entry) => entry.categorySlug === categorySlug);
}
