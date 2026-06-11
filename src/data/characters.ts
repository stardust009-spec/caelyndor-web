import { assetImage, localImage } from "@/data/assets";

export type Character = {
  slug: string;
  name: string;
  title: string;
  role: string;
  affinity: string;
  accent: string;
  faction?: string;
  image: string;
  portraitPosition?: string;
  portraitScale?: number;
  anatomyNote?: {
    short: string;
    extended: string;
  };
  story?: string;
  personality?: string;
  description: string;
  visualCanon: string[];
  gallery: string[];
};

const defaultGallery = [
  localImage("placeholders/gallery-portrait.svg"),
  localImage("placeholders/gallery-detail.svg")
];

export const characters: Character[] = [
  {
    slug: "yuki",
    name: "Yuki",
    title: "La nieve bajo el umbral",
    role: "Contrapunto, refugio y filo silencioso",
    affinity: "Hielo / Memoria / Quietud",
    accent: "#8bc6df",
    image: assetImage("yuki_canon_portrait_v02.png"),
    description: "Guarda una calma peligrosa, como si cada palabra suya tuviera que cruzar una tormenta antes de existir.",
    visualCanon: ["Paleta de azul hielo y plata", "Silueta limpia", "Texturas frias sin caer en pureza simple"],
    gallery: defaultGallery
  },
  {
    slug: "noctalypse",
    name: "Noctalypse",
    title: "El eclipse que no termina",
    role: "Fuerza axial, mito y amenaza",
    affinity: "Sombra / Eclipse / Abismo",
    accent: "#7b5ca8",
    image: assetImage("noct_canon_portrait_v3.png"),
    portraitPosition: "50% 18%",
    portraitScale: 1.12,
    description: "Mas que enemigo, una presion sobre la realidad: el nombre que el mundo evita pronunciar entero.",
    visualCanon: ["Contraluz extremo", "Formas ceremoniales", "Ausencia como elemento visual"],
    gallery: defaultGallery
  },
  {
    slug: "rubi",
    name: "Rubí",
    title: "La brasa que recuerda",
    role: "Protagonista de fractura y voluntad",
    affinity: "Fuego / Sangre / Juramento",
    accent: "#c84b4b",
    image: assetImage("rubi_canon_portrait_v02.png"),
    description: "Una presencia marcada por perdidas antiguas y una obstinacion capaz de encender reinos dormidos.",
    visualCanon: ["Mirada de brasa contenida", "Prendas oscuras con acentos rojos", "Cicatrices tratadas como simbolos narrativos"],
    gallery: defaultGallery
  },
  {
    slug: "lyzi",
    name: "Lyzi",
    title: "La voz entre grietas",
    role: "Vinculo, intuicion y transito",
    affinity: "Astral / Eco / Velo",
    accent: "#a77aff",
    image: assetImage("lyzi_canon_portrait_v02.png"),
    description: "Camina donde los mapas fallan y oye lo que las ruinas todavia no se atreven a decir.",
    visualCanon: ["Violetas profundos", "Detalles astrales minimos", "Expresion entre ternura y amenaza"],
    gallery: defaultGallery
  },
  {
    slug: "halrik",
    name: "Halrik",
    title: "MARISCAL DE GLACIEM",
    role: "Estrategia, frontera y deber",
    affinity: "HIELO / LEALTAD / MURALLA",
    accent: "rgba(130, 170, 190, 0.30)",
    image: assetImage("halrik_canon_portrait.png"),
    portraitPosition: "50% 18%",
    portraitScale: 1.08,
    description: "Ancla militar de Glaciem, preciso en la crisis y leal hasta el peso silencioso de las órdenes imposibles.",
    visualCanon: ["Autoridad militar glacial", "Lealtad sobria y presencia de frontera", "Presencia de muralla en crisis"],
    gallery: defaultGallery
  },
  {
    slug: "alistair-valerius",
    name: "Alistair Valerius",
    title: "SEXTO PRECEPTOR DE LA LLAMA INEXTINGUIBLE",
    role: "Dogma, deber y fractura moral",
    affinity: "LLAMA / DOGMA / REDENCIÓN",
    accent: "rgba(210, 190, 170, 0.30)",
    image: assetImage("alistair_canon_portrait.png"),
    portraitPosition: "50% 18%",
    portraitScale: 1.08,
    description: "Preceptor de Aethel Cineris, formado por la necesidad y la ley absoluta; una llama disciplinada que empieza a descubrir el peso de proteger.",
    visualCanon: ["Disciplina de la llama", "Dogma ceremonial", "Fractura moral bajo control"],
    gallery: defaultGallery
  },
  {
    slug: "faelan",
    name: "Faelan",
    title: "El rumor del bosque antiguo",
    role: "Guia, frontera y memoria salvaje",
    affinity: "Bosque / Instinto / Raiz",
    accent: "#7fae8a",
    image: assetImage("faelan_canon_portrait_v2.png"),
    portraitPosition: "50% 20%",
    portraitScale: 1.1,
    description: "Se mueve como si el mundo natural todavia le debiera respuestas, y como si pudiera cobrarlas en silencio.",
    visualCanon: ["Verdes apagados", "Texturas organicas", "Presencia alerta sin rigidez"],
    gallery: defaultGallery
  },
  {
    slug: "fulgor",
    name: "Fulgor",
    title: "La chispa que hiere la noche",
    role: "Impulso, ruptura y fulminacion",
    affinity: "Rayo / Metal / Ruptura",
    accent: "#f0c75e",
    image: assetImage("fulgor_canon_portrait.png"),
    description: "Una energia dificil de contener, capaz de iluminar una verdad o partirla en fragmentos.",
    visualCanon: ["Acentos dorados", "Contrastes electricos", "Silueta con tension dinamica"],
    gallery: defaultGallery
  },
  {
    slug: "aelwyn-solrenhal",
    name: "Aelwyn Solrenhal",
    title: "El heredero de la luz cansada",
    role: "Legado, duda y resplandor fracturado",
    affinity: "Solar / Plata / Herencia",
    accent: "#d8c88f",
    image: assetImage("aelwyn_canon_portrait.png"),
    description: "Carga una luz que no siempre salva, pero que insiste en revelar lo que otros prefieren dejar cubierto.",
    visualCanon: ["Marfil y oro viejo", "Simbolos solares sobrios", "Expresion noble sin triunfalismo"],
    gallery: defaultGallery
  },
  {
    slug: "temari-calabruna",
    name: "Temari Calabruña",
    title: "La risa bajo la luna torcida",
    role: "Brujeria, juego y amenaza lateral",
    affinity: "Luna / Calabaza / Sortilegio",
    accent: "#d0834f",
    image: assetImage("temariC_canon_portrait.png"),
    description: "Su encanto parece inocente hasta que el mundo recuerda que algunas bromas tambien son maldiciones.",
    visualCanon: ["Naranjas apagados", "Silueta juguetona pero oscura", "Detalles lunares y de brujeria"],
    gallery: defaultGallery
  },
  {
    slug: "odrim-vaelkoren",
    name: "Odrim Vaelkoren",
    title: "El peso de la piedra jurada",
    role: "Custodio, resistencia y deuda antigua",
    affinity: "Piedra / Hierro / Fortaleza",
    accent: "#9a8f7b",
    image: assetImage("odrim_canon_portrait.png"),
    anatomyNote: {
      short: "12 dedos funcionales de nacimiento, seis en cada mano.",
      extended: "Posee 12 dedos funcionales de nacimiento —seis en cada mano—, una singularidad anatómica que alimenta su precisión en la digitación arcana compleja."
    },
    description: "Una voluntad tallada por derrotas viejas, mas cercana a una muralla que a una promesa facil.",
    visualCanon: ["Grises calidos", "Materialidad pesada", "Rasgos de resistencia contenida"],
    gallery: defaultGallery
  },
  {
    slug: "lira-eserine-valendia",
    name: "Lira Eserine Valendia",
    title: "La elegia de la corte velada",
    role: "Nobleza, secreto y deuda heredada",
    affinity: "Cristal / Linaje / Juramento",
    accent: "#c7a7ff",
    image: assetImage("lira_canon_portrait.png"),
    description: "Una figura de salon y sentencia, entrenada para convertir la delicadeza en una forma precisa de poder.",
    visualCanon: ["Elegancia palida", "Detalles de nobleza arcana", "Mirada contenida y ceremonial"],
    gallery: defaultGallery
  },
  {
    slug: "aria-ventoleve",
    name: "Aria Ventoleve",
    title: "La nota sobre el abismo",
    role: "Voz, altura y presagio",
    affinity: "Viento / Canto / Presagio",
    accent: "#9ccce8",
    image: assetImage("aria_canon_portrait.png"),
    description: "Su presencia parece ligera hasta que el aire alrededor decide obedecerla.",
    visualCanon: ["Lineas livianas", "Azules aereos", "Gestualidad fina y distante"],
    gallery: defaultGallery
  },
  {
    slug: "adagio-ventoleve",
    name: "Adagio Ventoleve",
    title: "El compas de la tormenta",
    role: "Contrapeso, disciplina y cadencia",
    affinity: "Viento / Ritmo / Guardia",
    accent: "#7fb4c8",
    image: assetImage("adagio_canon_portrait.png"),
    description: "Donde otros se precipitan, Adagio mide el pulso exacto antes de dejar caer la respuesta.",
    visualCanon: ["Postura serena", "Acentos frios", "Diseño sobrio con ritmo visual"],
    gallery: defaultGallery
  },
  {
    slug: "khaal-zar-omunyek",
    name: "Khaal'Zar Omunyek",
    title: "La garganta del desierto negro",
    role: "Poder extranjero, rito y hambre de dominio",
    affinity: "Arena / Sombra / Rito",
    accent: "#b47a55",
    image: assetImage("kaal_canon_portrait.png"),
    description: "Trae consigo una ley antigua, seca y feroz, como si cada palabra hubiese cruzado un desierto de huesos.",
    visualCanon: ["Tonos arena oscura", "Ornamentos rituales", "Presencia imponente y ceremonial"],
    gallery: defaultGallery
  },
  {
    slug: "xirian",
    name: "Xirian",
    title: "LA LINTERNA VIOLETA",
    role: "Misterio, ruina y luz persistente",
    affinity: "VIOLETA / CENIZA / PRESAGIO",
    accent: "rgba(170, 120, 230, 0.30)",
    image: assetImage("xirian_canon_portrait.png"),
    portraitPosition: "50% 18%",
    portraitScale: 1.08,
    description: "Una presencia apenas visible entre cenizas y señales, como una luz violeta que insiste en no apagarse del todo.",
    visualCanon: ["Luz violeta persistente", "Presagio entre cenizas", "Misterio apenas visible"],
    gallery: defaultGallery
  },
  {
    slug: "nayara",
    name: "Nayara",
    title: "REGINA GLACIEI",
    role: "Madre, reina y autoridad contenida",
    affinity: "HIELO / CORONA / DEBER",
    accent: "rgba(159, 207, 213, 0.30)",
    image: assetImage("nayara_canon_portrait.png"),
    portraitPosition: "50% 18%",
    portraitScale: 1.08,
    description: "Una presencia regia de Glaciem, capaz de sostener el deber con cálculo sereno y una ternura que rara vez se permite mostrarse.",
    visualCanon: ["Autoridad glacial", "Corona y deber", "Ternura contenida bajo compostura regia"],
    gallery: defaultGallery
  },
  {
    slug: "valthor",
    name: "Valthor",
    title: "EL SABIO DEL HIELO SILENCIOSO",
    role: "Archimago, testigo y memoria del trono",
    affinity: "HIELO / SABIDURÍA / SILENCIO",
    accent: "rgba(120, 160, 190, 0.30)",
    image: assetImage("valthor_canon_portrait.png"),
    portraitPosition: "50% 18%",
    portraitScale: 1.08,
    description: "Testigo del ascenso de Nayara, del exilio de Kaelion y del nacimiento de Yuki; un sabio antiguo que sostiene el reino con silencio y estructura.",
    story: "Valthor fue testigo del ascenso de Nayara, del exilio de Kaelion y del nacimiento de Yuki. Como miembro fundador del Alto Consejo, su deber ha sido mantener la estructura del trono, aunque su corazón haya deseado romperla en más de una ocasión. Fue él quien guió a Yuki en los protocolos post-Ritual, y quien le informó —con dolor visible— del destino de Lielle. Nadie ha llorado por más personas en silencio que él. Y, sin embargo, sigue firme.",
    personality: "Serio, aunque no siempre; sabio, paciente como el hielo que no se rompe. Observa más de lo que habla. Su compasión es estructurada, su dolor antiguo y reprimido.",
    visualCanon: ["Sabiduría glacial", "Memoria del trono", "Silencio como forma de autoridad"],
    gallery: defaultGallery
  },
  {
    slug: "aelrhyssa",
    name: "Aelrhyssa",
    title: "INSTITUTRIZ DE LA LLAMA",
    role: "Madre, institutriz y rigor afectivo",
    affinity: "FUEGO / ETIQUETA / CUSTODIA",
    accent: "rgba(210, 120, 90, 0.30)",
    image: assetImage("aelrhyssa_canon_portrait.png"),
    portraitPosition: "50% 18%",
    portraitScale: 1.08,
    description: "Figura formativa de Cindralith, elegante y severa, capaz de enseñar disciplina sin apagar el fuego que juró proteger.",
    visualCanon: ["Rigor afectivo", "Etiqueta de fuego", "Custodia elegante y severa"],
    gallery: defaultGallery
  },
  {
    slug: "zarthus",
    name: "Zarthus",
    title: "LA LLAMA QUE CONSUME",
    role: "Fuerza superior, hambre y ruptura",
    affinity: "FUEGO / DEMONIO / DEVORACIÓN",
    accent: "rgba(220, 70, 45, 0.32)",
    image: assetImage("zarthus_canon_portrait.png"),
    portraitPosition: "50% 18%",
    portraitScale: 1.08,
    description: "Entidad demoníaca de fuego consumidor, una amenaza cuya presencia vuelve evidente que no toda llama busca iluminar.",
    visualCanon: ["Fuego consumidor", "Amenaza superior", "Hambre y ruptura"],
    gallery: defaultGallery
  },
  {
    slug: "kaen-varthalion",
    name: "Kaen Varthalion",
    title: "EL REY DE LA CENIZA",
    role: "Centro soberano del Sol Negro",
    affinity: "CENIZA / OBSIDIANA / TRONO",
    accent: "rgba(170, 65, 45, 0.32)",
    faction: "Sol Negro",
    image: assetImage("kaen_canon_portrait.png"),
    portraitPosition: "50% 18%",
    portraitScale: 1.08,
    description: "Heredero Varthalion reconstruido por Xirian, marcado por Rha’gados, obsidiana y una voluntad que intenta convertir heridas en corona.",
    visualCanon: [
      "Integrante del Sol Negro.",
      "Eje soberano del Sol Negro; cabeza politica, emocional y militar del proyecto."
    ],
    gallery: defaultGallery
  },
  {
    slug: "carolina-varthalion",
    name: "Carolina Varthalion",
    title: "EL DIAMANTE DEL SOL NEGRO",
    role: "Diva imperial, actriz y operadora social",
    affinity: "DIAMANTE / ESCENA / ARAÑA",
    accent: "rgba(235, 210, 170, 0.32)",
    faction: "Sol Negro",
    image: assetImage("carolina_canon_portrait.png"),
    portraitPosition: "50% 18%",
    portraitScale: 1.06,
    description: "Una Varthalion de escenario y alta costura, capaz de convertir mirada, glamour y percepcion en una forma precisa de dominio.",
    visualCanon: [
      "Integrante del Sol Negro.",
      "Diamante del Sol Negro; rostro publico, glamour estrategico y control de percepcion."
    ],
    gallery: defaultGallery
  },
  {
    slug: "ashaal-runeveil",
    name: "Asha’al Runeveil",
    title: "LA MANO DE LA MUERTE",
    role: "Sombra operativa del rey",
    affinity: "OBSIDIANA / FILO / LEALTAD",
    accent: "rgba(90, 70, 115, 0.32)",
    faction: "Sol Negro",
    image: assetImage("ashaal_canon_portrait.png"),
    portraitPosition: "50% 18%",
    portraitScale: 1.08,
    description: "Tiefling intervenida por Xirian y convertida en filo silencioso del Sol Negro; una obediencia precisa que actua donde la luz no llega.",
    visualCanon: [
      "Integrante del Sol Negro.",
      "Obsidiana Umbral; mano derecha operativa, asesina e infiltradora de Kaen."
    ],
    gallery: defaultGallery
  },
  {
    slug: "valther-kaelorn",
    name: "Valther Kael’Orn",
    title: "LA ESMERALDA DEL SOL NEGRO",
    role: "General minotauro y fuerza imperial",
    affinity: "ESMERALDA / CONQUISTA / GENERAL",
    accent: "rgba(70, 150, 105, 0.32)",
    faction: "Sol Negro",
    image: assetImage("valther_canon_portrait.png"),
    portraitPosition: "50% 18%",
    portraitScale: 1.06,
    description: "Minotauro ritual de mando pesado, orgullo conquistador y presencia militar; una fortaleza con cuernos que decidio marchar.",
    visualCanon: [
      "Integrante del Sol Negro.",
      "Esmeralda del Sol Negro; fuerza de conquista, mando militar y autoridad territorial."
    ],
    gallery: defaultGallery
  },
  {
    slug: "arvenn-lythralei",
    name: "Arvenn Lythralei",
    title: "EL ZAFIRO DEL SOL NEGRO",
    role: "Maestro de rumores y redes",
    affinity: "ZAFIRO / RUMOR / RED",
    accent: "rgba(70, 105, 190, 0.32)",
    faction: "Sol Negro",
    image: assetImage("arvenn_canon_portrait.png"),
    portraitPosition: "50% 18%",
    portraitScale: 1.08,
    description: "Elfo de casino y corte, dueño de redes, contratos e informacion; un operador elegante atrapado entre poder, deuda y familia.",
    visualCanon: [
      "Integrante del Sol Negro.",
      "Zafiro del Sol Negro; red de inteligencia, rumores, contratos y bajos fondos."
    ],
    gallery: defaultGallery
  }
];

export function getCharacterBySlug(slug: string) {
  return characters.find((character) => character.slug === slug);
}

export function getAdjacentCharacters(slug: string) {
  const currentIndex = characters.findIndex((character) => character.slug === slug);

  if (currentIndex === -1) {
    return { previous: undefined, next: undefined };
  }

  return {
    previous: currentIndex > 0 ? characters[currentIndex - 1] : undefined,
    next: currentIndex < characters.length - 1 ? characters[currentIndex + 1] : undefined
  };
}
