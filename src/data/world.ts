export type WorldLink = {
  label: string;
  href: string;
};

export type CosmologyPanel = {
  id: string;
  title: string;
  text: string;
  seeAlso?: WorldLink[];
};

export type WorldRegion = {
  slug: string;
  name: string;
  kind: string;
  epithet: string;
  description: string;
  seeAlso?: WorldLink[];
};

export const cosmologyPanels: CosmologyPanel[] = [
  {
    id: "el-velo",
    title: "El Velo",
    text:
      "El mundo de Caelyndor vive separado de lo astral por una membrana: el Velo. Mientras estuvo entero, los reinos pudieron fingir que la noche tenía límites y que los mapas terminaban donde terminaba el coraje. Su integridad divide la historia en un antes y un después.",
    seeAlso: [
      { label: "Glosario", href: "/archivo/glosario" },
      { label: "Cronología", href: "/cronologia" }
    ]
  },
  {
    id: "la-rasgadura",
    title: "La Rasgadura",
    text:
      "La herida que lo cambió todo. El Velo se abre y lo que cruza no siempre tiene nombre. Desde entonces el Archivo distingue dos clases de registros: los que describen el mundo, y los que describen lo que el mundo dejó entrar.",
    seeAlso: [{ label: "CAELYNDOR I: El Velo rasgado", href: "/nuevo-libro" }]
  },
  {
    id: "los-planos-y-el-cielo",
    title: "Los planos y el cielo",
    text:
      "Más allá del Velo hay geografías que no se caminan: el plano onírico del Djinn Azhel, del que proceden los gólems del sueño recombinado, y la propia Estratósfera de Caelyndor, donde habitan presencias que solo los registros más antiguos se atreven a clasificar.",
    seeAlso: [{ label: "Bestiario", href: "/archivo/bestiario" }]
  }
];

export const worldRegions: WorldRegion[] = [
  {
    slug: "glaciem",
    name: "Glaciem",
    kind: "Reino",
    epithet: "El trono sobre el hielo",
    description:
      "Tundras, cordilleras heladas y mares donde los pescadores cantan sobre Uru-Uru. Su corona pasó de Nayara, la Regina Glaciei, a su hija Yuki Arhess; Halrik sostiene la frontera como mariscal y Valthor guarda la memoria del Alto Consejo. En Glaciem la lealtad se mide en silencio sostenido.",
    seeAlso: [
      { label: "Yuki", href: "/personajes/yuki" },
      { label: "Nayara", href: "/personajes/nayara" },
      { label: "Halrik", href: "/personajes/halrik" },
      { label: "Uru-Uru", href: "/archivo/bestiario/uru-uru" }
    ]
  },
  {
    slug: "cindralith",
    name: "Cindralith",
    kind: "Reino",
    epithet: "La tierra del fuego dormido",
    description:
      "Campos volcánicos, muros cálidos y ruinas soleadas, levantados sobre un secreto incómodo: bajo su subsuelo duerme Rhazeth, la bestia tectónica. Arriba, los lagartos braseros calientan las murallas y la vida aprendió a prosperar a fuego lento.",
    seeAlso: [
      { label: "Rhazeth", href: "/archivo/bestiario/rhazeth" },
      { label: "Lagartos braseros", href: "/archivo/bestiario/lagartos-braseros" }
    ]
  },
  {
    slug: "sylvalis",
    name: "Sylvalis",
    kind: "Reino",
    epithet: "El bosque que recuerda",
    description:
      "Claros florales, rutas sagradas y árboles melíferos alrededor del Árbol de Lüm, custodiado por los treants. Faelan recorre sus fronteras como quien cobra una deuda vieja, y sus ecos ya tienen música propia en el portal.",
    seeAlso: [
      { label: "Faelan", href: "/personajes/faelan" },
      { label: "Treants de Sylvalis", href: "/archivo/bestiario/treants-de-sylvalis" },
      { label: "Música", href: "/musica" }
    ]
  },
  {
    slug: "lunaris",
    name: "Lunaris",
    kind: "Reino",
    epithet: "La noche como costumbre",
    description:
      "Tierras bajo luna permanente: cavernas altas, torres abandonadas y pantanos de niebla. Allí cazan los murciélagos de luna negra y croan las ranas de niebla. En Lunaris la oscuridad no es amenaza: es clima.",
    seeAlso: [
      { label: "Murciélagos de luna negra", href: "/archivo/bestiario/murcielagos-de-luna-negra" },
      { label: "Ranas de niebla", href: "/archivo/bestiario/ranas-de-niebla" }
    ]
  },
  {
    slug: "tierra-de-nadie",
    name: "Tierra de Nadie",
    kind: "Territorio herido",
    epithet: "La cicatriz continental",
    description:
      "La franja sin corona donde se abre la Gran Falla, prisión de Korvess, el lobo que mató a Voltrak. Ningún reino la reclama y todos la vigilan: la Falla no solo contiene, recuerda la guerra que costó cerrarla.",
    seeAlso: [
      { label: "Korvess", href: "/archivo/bestiario/korvess" },
      { label: "Voltrak", href: "/archivo/bestiario/voltrak" }
    ]
  },
  {
    slug: "jurak-thalon",
    name: "Jurak'Thalon",
    kind: "Territorio",
    epithet: "Las rutas secas",
    description:
      "Llanuras cálidas, rutas de caravana y bordes de selva antigua donde caza el predador Lyrzal. De sus leyes de arena viene Khaal'Zar Omunyek, cuya palabra parece haber cruzado un desierto de huesos antes de llegar a cualquier corte.",
    seeAlso: [{ label: "Khaal'Zar Omunyek", href: "/personajes/khaal-zar-omunyek" }]
  },
  {
    slug: "aethel-cineris",
    name: "Aethel Cineris",
    kind: "Enclave",
    epithet: "La sede de la Llama",
    description:
      "Hogar de la Llama Inextinguible, donde el dogma se enseña como se enseña a respirar. Allí se formó Alistair Valerius, su Sexto Preceptor, entre la ley absoluta y el peso tardío de proteger. Sus registros filtran lo que llega del Continente Oscuro.",
    seeAlso: [{ label: "Alistair Valerius", href: "/personajes/alistair-valerius" }]
  },
  {
    slug: "continente-oscuro",
    name: "Continente Oscuro",
    kind: "Dominio",
    epithet: "Más allá de los mapas cómodos",
    description:
      "El dominio en cuyas profundidades crece el Árbol del Rey Demonio. Lo que el Archivo sabe de él llega incompleto, citado por el Evangelio del Silencio o filtrado por Aethel Cineris. Lo que no sabe, prefiere clasificarlo como distancia.",
    seeAlso: [{ label: "Bestiario", href: "/archivo/bestiario" }]
  },
  {
    slug: "reino-de-mirelo",
    name: "Reino de Mírelo",
    kind: "Reino",
    epithet: "Los pantanos del sur",
    description:
      "Reino menor de pantanos y aguas pacientes. Sus criaturas figuran en el Bestiario y sus señales en más de un presagio: los reinos pequeños suelen leer el cielo antes que los grandes, aunque no siempre a tiempo.",
    seeAlso: [{ label: "Bestiario", href: "/archivo/bestiario" }]
  },
  {
    slug: "lirethar",
    name: "Lirethar",
    kind: "Reino caído",
    epithet: "El eco de la corona",
    description:
      "Reino élfico que dejó de existir antes del incidente del Velo. Los registros lo describen atrapado en una intención eterna —el Efecto Estática— y su última reina, Aelrhyssa, sobrevive como vigía de lo que su corona no pudo impedir.",
    seeAlso: [
      { label: "Aelrhyssa", href: "/personajes/aelrhyssa" },
      { label: "Música", href: "/musica" }
    ]
  },
  {
    slug: "torre-negra-del-norte",
    name: "Torre Negra del Norte",
    kind: "Enclave",
    epithet: "El nombre en los márgenes",
    description:
      "Enclave septentrional asociado a Tenebrys y a registros que prefieren no ser leídos dos veces. Aparece en los márgenes de más documentos de los que el Archivo admite oficialmente, y esa discreción también es un dato.",
    seeAlso: [{ label: "Tenebrys", href: "/archivo/bestiario/tenebrys" }]
  },
  {
    slug: "la-herida-del-cielo",
    name: "La Herida del Cielo",
    kind: "Territorio sellado",
    epithet: "El centro que no se visita",
    description:
      "El centro sellado del mundo, anterior a la mayoría de las coronas que hoy presumen de antigüedad. El Archivo la registra como región y como advertencia: hay lugares cuyo silencio es la única muralla que queda en pie.",
    seeAlso: [{ label: "Glosario", href: "/archivo/glosario" }]
  }
];
