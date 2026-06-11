import { bestiaryImage } from "@/data/assets";

export type BestiaryEntry = {
  slug: string;
  name: string;
  epithet: string;
  categorySlug: string;
  category: string;
  classification: string;
  region: string;
  archiveStatus: string;
  threatLevel: string;
  nature: string;
  curator: string;
  curatorIcon: string;
  quote: string;
  shortEntry: string;
  description: string;
  behavior?: string[];
  mainTraits?: string;
  archiveNote: string;
  image?: {
    src: string;
    alt: string;
  };
};

export type BestiaryCategory = {
  slug: string;
  title: string;
  description: string;
};

export const mythicalBeastsDescription =
  "Entidades vivas cuya escala, memoria o impacto territorial supera la clasificación de criatura común. Algunas pueden ser evitadas. Otras solo pueden ser recordadas desde lejos.";

export const abyssalEntitiesDescription =
  "Entidades, demonios, constructos, heridas vivientes y presencias cuya existencia altera territorio, percepción, cuerpo o alma. No todas son bestias en sentido estricto, pero todas exigen archivo, distancia y cuidado.";

export const regionalCreaturesDescription =
  "Fauna, guardianes, depredadores y criaturas fantásticas ligadas a regiones específicas de Caelyndor. No todas alcanzan escala mítica, pero cada una revela cómo respira, se defiende o se equivoca su territorio.";

export const bestiaryCategories: BestiaryCategory[] = [
  {
    slug: "bestias-miticas",
    title: "Bestias Míticas",
    description: mythicalBeastsDescription
  },
  {
    slug: "entidades-abisales-y-anomalias-vivientes",
    title: "Entidades Abisales y Anomalías Vivientes",
    description: abyssalEntitiesDescription
  },
  {
    slug: "criaturas-regionales-fantasticas",
    title: "Criaturas Regionales Fantásticas",
    description: regionalCreaturesDescription
  }
];

export const bestiaryEntries: BestiaryEntry[] = [
  {
    slug: "uru-uru",
    name: "Uru-Uru",
    epithet: "El Leviatán de Glaciem",
    categorySlug: "bestias-miticas",
    category: "Bestias Míticas",
    classification: "Bestia Mítica Marina",
    region: "Mares helados de Glaciem",
    archiveStatus: "Confirmado por tradición costera",
    threatLevel: "IV — Bestia Mítica",
    nature: "Territorial, oceánica, ancestral",
    curator: "Yuki Arhess",
    curatorIcon: "💙🧊",
    quote:
      "Uru-Uru no es una amenaza por crueldad. Es una frontera viva. Conviene recordarlo antes de llamar valentía a la imprudencia.",
    shortEntry:
      "Uru-Uru es el nombre popular que los pescadores de Glaciem dan al Leviatán del mar helado. No se le nombra con solemnidad académica, sino con esa familiaridad supersticiosa que nace cuando una criatura ha vivido tanto tiempo cerca de un pueblo que termina formando parte de sus canciones, advertencias y silencios.",
    description:
      "Habita las aguas más frías del continente y responde con violencia si su territorio es profanado. No es una bestia cruel por impulso ni un monstruo devorador sin pensamiento: su amenaza nace de una lógica territorial profunda. Para Uru-Uru, el mar no pertenece a una sola especie. Es un equilibrio entre muchas formas de vida.\n\nSu presencia suele anunciarse con un silencio repentino sobre el agua, hielo formando patrones circulares y bancos de peces desapareciendo sin dejar rastro. Los pescadores más viejos no enseñan a vencerlo. Enseñan a no provocarlo.",
    archiveNote: "No protege a los humanos. Protege el equilibrio del mar.",
    image: {
      src: bestiaryImage("Uru-Uru — El Leviatán de Glaciem.png"),
      alt: "Uru-Uru, el Leviatán de Glaciem"
    }
  },
  {
    slug: "korvess",
    name: "Korvess",
    epithet: "El Lobo Sellado de la Gran Falla",
    categorySlug: "bestias-miticas",
    category: "Bestias Míticas",
    classification: "Bestia Mítica Terrestre / Entidad Sellada",
    region: "Tierra de Nadie, bajo la Gran Falla",
    archiveStatus: "Sellado, vigilancia permanente",
    threatLevel: "V — Catástrofe Continental",
    nature: "Soberanía absoluta, depredación jerárquica",
    curator: "Rubí Kaelynn Vaer'Solyn",
    curatorIcon: "❤️🔥",
    quote:
      "No me gustan los tipos que creen que el mundo existe para arrodillarse. Menos cuando tienen colmillos del tamaño de una casa.",
    shortEntry:
      "Korvess es el lobo mítico sellado bajo tierra, una presencia antigua ligada directamente a la Gran Falla de Tierra de Nadie. Su nombre todavía pesa porque fue él quien mató a Voltrak, el dragón del trueno, amigo de Fulgor.",
    description:
      "Korvess no entiende el mundo como convivencia, sino como jerarquía. Su filosofía es simple y brutal: solo lo soberano merece permanecer. Todo lo demás existe por permiso, debilidad o demora en ser devorado.\n\nA diferencia de otras bestias territoriales, Korvess no defiende únicamente un dominio. Afirma una superioridad ontológica sobre las especies menores. Su prisión no debe entenderse como una jaula simple, sino como parte de una herida continental. La Gran Falla no solo lo contiene: recuerda la guerra necesaria para impedir que volviera a caminar sobre el mundo.",
    archiveNote: "Si Korvess despierta, no sería una invasión. Sería una reclamación.",
    image: {
      src: bestiaryImage("Korvess — El Lobo Sellado de la Gran Falla.png"),
      alt: "Korvess, el Lobo Sellado de la Gran Falla"
    }
  },
  {
    slug: "rhazeth",
    name: "Rhazeth",
    epithet: "La Bestia Tectónica de Cindralith",
    categorySlug: "bestias-miticas",
    category: "Bestias Míticas",
    classification: "Bestia Mítica Tectónica",
    region: "Subsuelo profundo de Cindralith",
    archiveStatus: "Dormido, inestable",
    threatLevel: "V — Catástrofe Continental",
    nature: "Tierra, magma, erosión, territorio",
    curator: "Rubí Kaelynn Vaer'Solyn",
    curatorIcon: "❤️🔥",
    quote:
      "A ver, entiendo enojarse cuando te quitan terreno… pero hundir medio continente por drama geológico es un poquito excesivo. Un poquito.",
    shortEntry:
      "Rhazeth duerme bajo Cindralith como una masa de furia geológica. No sueña con conquista ni destrucción gratuita. Sueña con tierra. Y cuando despierta, despierta enojado porque siente que el agua le ha quitado metros de mundo.",
    description:
      "Para Rhazeth, la erosión no es un fenómeno natural: es un robo. Cada costa desgastada, cada borde volcánico reducido por el mar, cada grieta lavada por lluvia o corriente es interpretada como despojo territorial. Esta percepción convierte su despertar en una crisis imposible de razonar desde parámetros humanos.\n\nSu movimiento puede alterar fronteras físicas, elevar roca antigua, abrir grietas, despertar volcanes dormidos o desplazar ciudades enteras sin reconocerlas como vida relevante. Rhazeth no odia a Cindralith. El problema es más antiguo y más terrible: Cindralith está sobre su cuerpo.",
    archiveNote: "No se recomienda negociar con una montaña que se siente robada.",
    image: {
      src: bestiaryImage("Rhazeth — La Bestia Tectónica de Cindralith.png"),
      alt: "Rhazeth, la Bestia Tectónica de Cindralith"
    }
  },
  {
    slug: "nhari",
    name: "Nhari",
    epithet: "La Serpiente Alada de Sylvalis",
    categorySlug: "bestias-miticas",
    category: "Bestias Míticas",
    classification: "Bestia Mítica Alada / Guardiana Territorial",
    region: "Sylvalis",
    archiveStatus: "Confirmado, no hostil salvo invasión",
    threatLevel: "IV — Bestia Mítica",
    nature: "Aire, bosque, autonomía sagrada",
    curator: "Lyzi / Lyzantha",
    curatorIcon: "💜🌌",
    quote:
      "Nhari no guarda Sylvalis como una prisión. Lo guarda como se guarda un sueño que aún no quiere ser tocado.",
    shortEntry:
      "Nhari es la serpiente alada de Sylvalis. No busca adoración, guerra ni dominio. Su deseo principal es simple: que la dejen vivir en paz. El problema es que muchos confunden paz con debilidad.",
    description:
      "Nhari representa la frontera entre lo sagrado y lo invadido. Puede parecer distante, incluso indiferente, mientras su territorio no sea perturbado. Pero si alguien entra con intención de apropiarse, talar, profanar o capturar aquello que pertenece al equilibrio de Sylvalis, Nhari muestra los colmillos.\n\nSu aparición suele ir precedida por cambios súbitos en la presión del bosque, corrientes de aire entre copas inmóviles y un silencio animal demasiado perfecto para ser natural. No castiga la presencia respetuosa. Castiga la invasión.",
    archiveNote: "Sylvalis permite entrar. Nhari decide si se permite salir.",
    image: {
      src: bestiaryImage("Nhari — La Serpiente Alada de Sylvalis.png"),
      alt: "Nhari, la Serpiente Alada de Sylvalis"
    }
  },
  {
    slug: "neruvain",
    name: "Neruvain",
    epithet: "La Ballena Abismal de la Gran Falla",
    categorySlug: "bestias-miticas",
    category: "Bestias Míticas",
    classification: "Bestia Mítica Abisal",
    region: "Gran Falla de Tierra de Nadie",
    archiveStatus: "Activo, imposible de neutralizar",
    threatLevel: "VI — Anomalía Existencial",
    nature: "Hambre territorial, inteligencia adaptativa",
    curator: "Rubí Kaelynn Vaer'Solyn",
    curatorIcon: "❤️🔥",
    quote: "¿Neruvain sentirá el sabor de una empanada bien hecha? Pregunto por ciencia. Y por miedo.",
    shortEntry:
      "Neruvain es la ballena abismal que emerge desde la Gran Falla cuando tiene hambre. No ruge por gloria ni destruye por odio. Devora territorio, queda satisfecha y se retira. Esa simpleza es precisamente lo que la vuelve aterradora.",
    description:
      "A diferencia de una bestia común, Neruvain no parece limitada por una ecología normal. Su hambre puede abarcar tierra, estructuras, rutas, defensas y porciones enteras del paisaje. Es inteligente, adaptativa y nunca ha sido derrotada en ningún ciclo conocido.\n\nNo se comporta como un enemigo estratégico, sino como una fuerza viva que aparece, consume y desaparece antes de que el mundo pueda convertirla en batalla. La vigilancia de Tierra de Nadie considera su aparición como protocolo máximo, no porque exista un método seguro para detenerla, sino porque al menos permite contar lo que se perdió.",
    archiveNote: "Neruvain no invade. Almuerza.",
    image: {
      src: bestiaryImage("Neruvain — La Ballena Abismal de la Gran Falla.png"),
      alt: "Neruvain, la Ballena Abismal de la Gran Falla"
    }
  },
  {
    slug: "selkaris",
    name: "Selkaris",
    epithet: "El Ave del Trueno de la Estratósfera",
    categorySlug: "bestias-miticas",
    category: "Bestias Míticas",
    classification: "Bestia Mítica Aérea / Centinela Superior",
    region: "Estratósfera de Caelyndor",
    archiveStatus: "Activo, patrulla permanente",
    threatLevel: "V — Catástrofe Continental",
    nature: "Trueno, vigilancia, frontera del cielo",
    curator: "Yuki Arhess",
    curatorIcon: "💙🧊",
    quote:
      "Selkaris funciona como límite atmosférico activo. No patrulla por capricho: impone una ley vertical sobre el mundo.",
    shortEntry:
      "Selkaris es el ave del trueno que habita las alturas imposibles. Su función no es gobernar el cielo, sino custodiarlo. Todo lo que vuela demasiado alto, o todo lo que viene desde afuera, muere.",
    description:
      "No se conoce pacto, reino ni criatura que haya reclamado autoridad sobre Selkaris. Su existencia opera como una ley natural con forma de bestia: hay una altura que no debe cruzarse.\n\nEn Caelyndor, las civilizaciones pueden mirar el cielo, estudiarlo, venerarlo o temerlo, pero no ascender sin consecuencias. Artefactos voladores, criaturas aladas, expediciones verticales y presencias externas han desaparecido bajo tormentas que no figuraban en ningún registro climático.",
    archiveNote: "Selkaris no distingue curiosidad de amenaza. A esa altura, todo intruso es intruso.",
    image: {
      src: bestiaryImage("Selkaris — El Ave del Trueno de la Estratósfera.png"),
      alt: "Selkaris, el Ave del Trueno de la Estratósfera"
    }
  },
  {
    slug: "voltrak",
    name: "Voltrak",
    epithet: "El Dragón del Trueno Caído",
    categorySlug: "bestias-miticas",
    category: "Bestias Míticas",
    classification: "Bestia Mítica Dracónica",
    region: "Cielos de tormenta / memoria dracónica",
    archiveStatus: "Muerto, legado activo",
    threatLevel: "IV — Bestia Mítica",
    nature: "Trueno, nobleza dracónica, caída histórica",
    curator: "Lyzi / Lyzantha",
    curatorIcon: "💜🌌",
    quote: "Algunas tormentas no terminan cuando muere el dragón. Siguen sonando en quienes lo recuerdan.",
    shortEntry:
      "Voltrak fue el dragón del trueno, amigo de Fulgor y una de las figuras dracónicas cuya muerte dejó cicatriz en la historia de las bestias míticas. Su caída a manos de Korvess marcó a los dragones y alteró la memoria de su especie.",
    description:
      "Aunque Voltrak ya no vive, su importancia no desaparece. Algunas bestias cambian el mundo por lo que hacen. Otras, por la herida que dejan al caer. Voltrak pertenece a esta segunda categoría.\n\nSu asesinato no fue solo una derrota individual, sino una señal brutal de que incluso los dragones podían ser alcanzados por horrores más antiguos, más terrestres y más soberbios. En los registros dracónicos, Voltrak no figura únicamente como víctima, sino como advertencia: ningún linaje, por elevado que sea, está completamente fuera del alcance de la tierra cuando la tierra decide morder.",
    archiveNote: "Su cadáver no vigila el mundo, pero su memoria todavía truena.",
    image: {
      src: bestiaryImage("Voltrak — El Dragón del Trueno Caído.png"),
      alt: "Voltrak, el Dragón del Trueno Caído"
    }
  },
  {
    slug: "tzerkhan",
    name: "Tzérkhan",
    epithet: "La Quimera Abisal",
    categorySlug: "entidades-abisales-y-anomalias-vivientes",
    category: "Entidades Abisales y Anomalías Vivientes",
    classification: "Entidad Abisal / Quimera Territorial",
    region: "Continente Oscuro, cercanías del Árbol del Rey Demonio",
    archiveStatus: "Confirmado por registros de expedición",
    threatLevel: "V — Catástrofe Mayor",
    nature: "Depredación territorial, anatomía incompatible, presión ambiental extrema",
    curator: "Noctalypse",
    curatorIcon: "🌑",
    quote: "Hay territorios que se cruzan con mapas. El de Tzérkhan se cruza con testamentos.",
    shortEntry:
      "Tzérkhan domina una zona crítica del Continente Oscuro con la autoridad muda de una catástrofe instalada. Su presencia vuelve impracticable cualquier avance hacia el Árbol del Rey Demonio sin preparación, sacrificio o una cuota peligrosa de estupidez heroica.",
    description:
      "La Quimera Abisal presenta una anatomía sostenida por reglas hostiles a la vida común. Sus proporciones sugieren injerto, mutación y adaptación violenta, pero el conjunto se mueve con una coherencia brutal, como si el Continente Oscuro hubiera encontrado una forma de organizar el error dentro de un cuerpo.\n\nSu relación con el territorio es absoluta. Cada paso, respiración y cambio de postura transforma el entorno inmediato en parte de su zona de caza. Las rutas se vuelven inestables, los sonidos viajan mal y la percepción de distancia empieza a fallar antes del contacto visual.",
    archiveNote:
      "El acceso al Árbol del Rey Demonio se considera inviable mientras Tzérkhan mantenga dominio activo sobre el perímetro.",
    image: {
      src: bestiaryImage("bestiario-tzerkhan-quimera-abisal.png"),
      alt: "Tzérkhan, la Quimera Abisal"
    }
  },
  {
    slug: "sethriss",
    name: "Sethriss",
    epithet: "La Serpiente de los Ocho Venenos",
    categorySlug: "entidades-abisales-y-anomalias-vivientes",
    category: "Entidades Abisales y Anomalías Vivientes",
    classification: "Expediente Dudoso / Monstruo Traumático",
    region: "Reino de Mírelo, pantanos del sur",
    archiveStatus: "Confirmado; clasificación popular disputada",
    threatLevel: "IV — Amenaza Mayor",
    nature: "Trauma encarnado, veneno emocional, anatomía simbólica",
    curator: "Yuki Arhess",
    curatorIcon: "💙🧊",
    quote:
      "Sethriss demuestra una verdad incómoda: las heridas antiguas también pueden desarrollar sistema nervioso.",
    shortEntry:
      "Sethriss fue registrada en los pantanos de Mírelo como una criatura de ocho cabezas, vinculada al caso investigado por Valdemar Nocturne. El apéndice del Bestiario la define por sus ocho venenos: emociones, defensas y memorias que permanecieron activas hasta adquirir forma depredadora.",
    description:
      "Su cuerpo serpentino posee escamas oscuras con reflejos violetas, gris ceniza y verde tóxico. Las cabezas visibles presentan proporciones y comportamientos distintos: unas vigilan, otras recuerdan, otras muerden, otras se hunden en impulsos contradictorios. La criatura actúa como un sistema interno desbordado, donde cada parte empuja hacia una respuesta distinta.\n\nSu aparición altera el ambiente. Los colores pierden intensidad, las voces parecen alejarse y las decisiones se vuelven más pesadas. Durante el enfrentamiento en las ruinas, Valdemar identifica que Ilyra permanece atrapada en el núcleo de la masa, mientras las cabezas articulan los venenos visibles alrededor de ella.",
    archiveNote:
      "Sethriss se archiva como amenaza viva y como advertencia clínica: una herida sostenida durante demasiado tiempo puede aprender a defenderse contra todo, incluso contra la salida.",
    image: {
      src: bestiaryImage("bestiario-sethriss-ocho-venenos.png"),
      alt: "Sethriss, la Serpiente de los Ocho Venenos"
    }
  },
  {
    slug: "nhar-zul",
    name: "Nhar-Zul",
    epithet: "La Llaga que Piensa",
    categorySlug: "entidades-abisales-y-anomalias-vivientes",
    category: "Entidades Abisales y Anomalías Vivientes",
    classification: "Anomalía Cósmica / Herida Viviente",
    region: "La Herida del Cielo, centro sellado del mundo",
    archiveStatus: "Sellado por Vaendor; registro apócrifo conservado",
    threatLevel: "VI — Anomalía Existencial",
    nature: "Error cósmico, biología desordenada, pensamiento territorial",
    curator: "Lyzi / Lyzantha",
    curatorIcon: "💜🌌",
    quote: "Algunas heridas sangran. Nhar-Zul interpreta.",
    shortEntry:
      "Nhar-Zul nació del evento conocido como La Herida del Cielo. El Códice del Humo describe una esfera sin trayectoria, fuego ni luz, cuyo paso deformó la coherencia del mundo. Cuando alcanzó Caelyndor, la realidad respondió con un error, y de ese error surgió una llaga consciente.",
    description:
      "La aparición de Nhar-Zul confundió las reglas de la vida. Las raíces caminaron, los peces jadearon aire y los hombres despertaron con bocas selladas por sombras sin dueño. La anomalía alteró biología, cielo, gravedad y percepción hasta convertir el centro del mundo en una zona enferma de interpretación.\n\nVaendor separó la tierra contaminada del resto del mundo y terminó convertido en frontera. Ese acto dio forma al sellado que mantiene a Nhar-Zul contenido y convirtió a Caelyndor en el nombre heredado de un sacrificio geográfico.",
    archiveNote:
      "Nhar-Zul pertenece a la categoría de anomalías cuyo cuerpo importa menos que su efecto. Mientras exista el sello, el centro del mundo continúa respirando bajo vigilancia.",
    image: {
      src: bestiaryImage("bestiario-nhar-zul-llaga-que-piensa.png"),
      alt: "Nhar-Zul, la Llaga que Piensa"
    }
  },
  {
    slug: "tenebrys",
    name: "Tenebrys",
    epithet: "El Abismo que Recuerda",
    categorySlug: "entidades-abisales-y-anomalias-vivientes",
    category: "Entidades Abisales y Anomalías Vivientes",
    classification: "Presencia Abisal / Entidad de Sombra Primordial",
    region: "Continente Oscuro; registros del Velo y Aethel-Cineris",
    archiveStatus: "Activo; manifestaciones registradas",
    threatLevel: "VI — Anomalía Existencial",
    nature: "Sombra viva, borradura conceptual, juicio abisal",
    curator: "Yuki Arhess",
    curatorIcon: "💙🧊",
    quote:
      "Tenebrys vuelve inútil la distancia. Cuando aparece, el peligro ya está dentro del concepto de estar a salvo.",
    shortEntry:
      "Tenebrys aparece en los registros como una presencia vinculada al Continente Oscuro, al Velo y a Noctalypse. Su manifestación supera la violencia física: atraviesa alma, materia, memoria y forma. En un registro, su sombra cae sobre Aethel-Cineris y el mundo entero parece contener la respiración antes de que comience la noche que arrastra a un reino.",
    description:
      "En los fragmentos de Sizigia, Tenebrys emerge como una figura gigantesca hecha de oscuridad, hueso, viento seco y alas formadas por recuerdos devorados. Absorbe fuego, resiste juicio y expande ondas capaces de borrar, más que golpear. Su presencia se define por la anulación de aquello que toca.\n\nEn La Llama Inextinguible, Tenebrys se manifiesta detrás de Noctalypse como oscuridad viva, pulveriza una corona, apaga gemas y borra cadenas drenadoras con un roce. La materia afectada deja de pertenecer al mundo, como si se le retirara el permiso de existir.",
    archiveNote:
      "Tenebrys se mantiene en el Bestiario bajo reserva. Su clasificación como “entidad” resulta útil para archivo, aunque su escala real pertenece a la arquitectura profunda del Velo.",
    image: {
      src: bestiaryImage("bestiario-tenebrys-abismo-recuerda.png"),
      alt: "Tenebrys, el Abismo que Recuerda"
    }
  },
  {
    slug: "tinnitus",
    name: "Tinnitus",
    epithet: "El Director de la Orquesta del Norte",
    categorySlug: "entidades-abisales-y-anomalias-vivientes",
    category: "Entidades Abisales y Anomalías Vivientes",
    classification: "Demonio Sonoro / Entidad de Resonancia",
    region: "Torre Negra del Norte",
    archiveStatus: "Neutralizado; residuos metafísicos dispersos",
    threatLevel: "III — Amenaza Ritual",
    nature: "Frecuencia parasitaria, vibración destructiva, voz robada",
    curator: "Rubí Kaelynn Vaer'Solyn",
    curatorIcon: "❤️🔥",
    quote:
      "Un demonio hecho de pitido eterno. Eso merece castigo, exorcismo y una patada con cariño en la tráquea metafísica.",
    shortEntry:
      "Tinnitus dirigía la Orquesta del Norte desde una torre sostenida por cuerdas sonoras, metal vibrante y voces superpuestas. Su presencia convertía el sonido en arma, presión, cuchilla y jaula perceptiva.",
    description:
      "Su voz llegaba desfasada: murmullo, susurro, grito, silencio y palabra real, todo en una secuencia insoportable. La Torre misma gritaba cuando sus cuerdas vibraban al mismo tiempo, liberando ondas de choque capaces de lanzar cuerpos contra columnas y hacer sangrar oídos.\n\nOctavius lo enfrentó mediante Vox Silentii y la técnica Anti-Coro. La frecuencia inversa ascendió por las paredes, tocó las cuerdas metafísicas de Tinnitus y quebró su estructura sonora. El demonio terminó desarmado en polvo metálico suspendido, mientras el pitido desaparecía y el silencio recuperaba carácter sagrado.",
    archiveNote:
      "Tinnitus confirma que algunas entidades existen como patrón de percepción antes que como cuerpo estable.",
    image: {
      src: bestiaryImage("bestiario-tinnitus-orquesta-norte.png"),
      alt: "Tinnitus, el Director de la Orquesta del Norte"
    }
  },
  {
    slug: "el-que-nace-del-desequilibrio",
    name: "El que nace del Desequilibrio",
    epithet: "Consecuencia Viva",
    categorySlug: "entidades-abisales-y-anomalias-vivientes",
    category: "Entidades Abisales y Anomalías Vivientes",
    classification: "Demonio de Sueño / Consecuencia Viva",
    region: "Plano onírico vinculado al Djinn Azhel",
    archiveStatus: "Manifestación registrada",
    threatLevel: "IV — Amenaza Mayor",
    nature: "Desequilibrio mágico, pesadilla parasitaria, nacimiento por colapso",
    curator: "Rubí Kaelynn Vaer'Solyn",
    curatorIcon: "❤️🔥",
    quote:
      "Cuando un agujero negro, cuatro golems y una pesadilla se ponen de acuerdo, yo recomiendo gritar primero y teorizar después.",
    shortEntry:
      "La entidad conocida como El que nace del Desequilibrio surge durante el colapso de fuerzas incompatibles dentro de una estructura onírica. Su aparición atraviesa la sombra de Noctalypse con un tridente de magma petrificado y convierte el error mágico en agresión consciente.",
    description:
      "La criatura mide casi tres metros, posee piel rojiza endurecida en placas oscuras, espinas volcánicas en la espalda, cola de obsidiana y ojos de llama sin pupila. Arrastra cadenas rotas y sostiene un tridente capaz de herir desde el vacío residual del sueño.\n\nSu origen combina la energía acumulada de cuatro golems, el cierre defectuoso de un agujero negro y materia de pesadilla. El resultado adopta forma demoníaca y habla con una voz que vibra directamente en los huesos. La frase registrada al nacer lo define como amenaza de mundo dormido: “Gracias… por dejarme nacer. Ahora… este mundo dormirá para siempre.”",
    archiveNote:
      "El Archivo lo clasifica como consecuencia viva: una entidad generada por el mal cierre de fuerzas que jamás debieron mezclarse.",
    image: {
      src: bestiaryImage("bestiario-desequilibrio-demonio-nacido.png"),
      alt: "El que nace del Desequilibrio"
    }
  },
  {
    slug: "golems-del-sueno-recombinado",
    name: "Golems del Sueño Recombinado",
    epithet: "Restos Reforjados",
    categorySlug: "entidades-abisales-y-anomalias-vivientes",
    category: "Entidades Abisales y Anomalías Vivientes",
    classification: "Constructos Anómalos / Restos Reforjados",
    region: "Plano de sueño vinculado al Djinn Azhel",
    archiveStatus: "Observados; amenaza superada por retirada estratégica",
    threatLevel: "III — Amenaza de Campo",
    nature: "Arcilla, piedra, metal vivo, inmunidad mágica",
    curator: "Yuki Arhess",
    curatorIcon: "💙🧊",
    quote:
      "Un constructo inmune a la magia convierte la arrogancia del hechicero en material de funeral.",
    shortEntry:
      "Los Golems del Sueño Recombinado nacen de los restos de dieciséis ogros destruidos por la furia ancestral de Rubí. Las cenizas se niegan a dispersarse, giran en espiral y se compactan en cuatro figuras grotescas de arcilla, piedra y metal vivo.",
    description:
      "Cada golem presenta runas en espiral, pecho hueco y una resonancia pesada en cada paso. Yuki los reconoce como amenazas inmunes a la magia, incapaces de razonar y diseñadas para aplastar. Su peligrosidad aumenta por el contexto: aparecen cuando el grupo está agotado, herido y emocionalmente fracturado.\n\nLa recombinación de restos indica una manipulación del plano onírico sobre materia destruida. El sueño reutiliza cadáveres, cenizas y voluntad residual para fabricar cuerpos de avance simple y resistencia extrema.",
    archiveNote:
      "Se recomienda retirada inmediata cuando el objetivo carece de mente, dolor y puntos de negociación.",
    image: {
      src: bestiaryImage("bestiario-golems-sueno-recombinado.png"),
      alt: "Golems del Sueño Recombinado"
    }
  },
  {
    slug: "salmodeus",
    name: "Salmodeus",
    epithet: "El Parásito Pontificio",
    categorySlug: "entidades-abisales-y-anomalias-vivientes",
    category: "Entidades Abisales y Anomalías Vivientes",
    classification: "Demonio de Posesión / Parásito Espiritual",
    region: "Registros del Evangelio del Silencio",
    archiveStatus: "Enfrentado en plano físico y espiritual",
    threatLevel: "IV — Amenaza Mayor",
    nature: "Posesión, corrupción institucional, invasión del alma",
    curator: "Lyzi / Lyzantha",
    curatorIcon: "💜🌌",
    quote: "Hay demonios que entran por una herida. Salmodeus aprendió a llamar puerta a la autoridad.",
    shortEntry:
      "Salmodeus actúa como demonio infiltrado en estructuras de poder religioso. Su amenaza principal reside en la posesión, la corrupción prolongada y la paciencia histórica con que usa instituciones, guerras santas y cuerpos ajenos para sostener su influencia.",
    description:
      "Durante el enfrentamiento con Octavius, Salmodeus pierde control físico cuando el Inquisidor lo ataca mediante una comunión inversa: carne muerta devorando carne demoníaca. La absorción fuerza a ambos a caer en el abismo de la mente, donde el demonio revela una forma verdadera compuesta por humo, bocas y ojos.\n\nEn el plano espiritual, Salmodeus presume siglos de manipulación sobre Papas, cobardes, guerras y plazas encendidas. Su amenaza supera el combate directo porque se instala en voluntades, jerarquías y discursos antes de mostrar colmillos.",
    archiveNote:
      "Salmodeus debe archivarse como entidad parasitaria de largo plazo. Su campo de caza favorito es la obediencia disfrazada de virtud.",
    image: {
      src: bestiaryImage("bestiario-salmodeus-parasito-pontificio.png"),
      alt: "Salmodeus, el Parásito Pontificio"
    }
  },
  {
    slug: "retentio-mali",
    name: "Retentio Mali — La Guardiana del Umbral",
    epithet: "Forma de Contención",
    categorySlug: "entidades-abisales-y-anomalias-vivientes",
    category: "Entidades Abisales y Anomalías Vivientes",
    classification: "Forma de Contención / Manifestación de Fe",
    region: "Plano de Azhel; Senda de la Fe",
    archiveStatus: "Registro restringido",
    threatLevel: "Variable; función defensiva",
    nature: "Contención absoluta, fe encarnada, cierre del abismo",
    curator: "Yuki Arhess",
    curatorIcon: "💙🧊",
    quote:
      "Retentio Mali pertenece al límite delicado entre criatura y función. Clasificarla exige más cuidado que valentía.",
    shortEntry:
      "Retentio Mali corresponde a la transformación de Eryndhel en Guardiana del Umbral. Su cuerpo adopta forma lupina, negra, muscular y terrible, pero su función apunta a contener el mal antes que a expandirlo. La entidad devora la esencia de Azhel mediante una luz blanca de contención absoluta, descrita como un horizonte de sucesos hecho de fe pura.",
    description:
      "Esta entrada queda reservada porque Retentio Mali involucra a una persona viva, una Senda Elemental y una función espiritual específica. El Bestiario puede registrar la forma, la amenaza y el precedente, pero la categoría “monstruo” resulta insuficiente y peligrosa para fines archivísticos.\n\nLa manifestación posee masa, colmillos, instinto y violencia operativa. También posee propósito. Cuando Azhel intenta negociar, desear o manipular, la Guardiana avanza con una inevitabilidad que cancela el lenguaje del tentador.",
    archiveNote:
      "Registro mantenido bajo vigilancia ética. Retentio Mali se cataloga como forma de contención, no como presa ni como enemigo.",
    image: {
      src: bestiaryImage("bestiario-retentio-mali-guardiana-umbral.png"),
      alt: "Retentio Mali, la Guardiana del Umbral"
    }
  },
  {
    slug: "avecestruces",
    name: "Avecestruces",
    epithet: "",
    categorySlug: "criaturas-regionales-fantasticas",
    category: "Criaturas Regionales Fantásticas",
    classification: "Criatura Regional Fantástica / Fauna Agresiva de Llanura",
    region: "Jurak’Thalon; rutas secas, llanuras cálidas y bordes de selva antigua",
    archiveStatus: "Confirmado",
    threatLevel: "II — Riesgo Regional",
    nature: "Territorial, velocísima, temperamental, conducta de manada",
    curator: "Rubí Kaelynn Vaer'Solyn",
    curatorIcon: "❤️🔥",
    quote: "Corren como si te odiaran desde antes de conocerte. Y probablemente sí.",
    shortEntry:
      "Las avecestruces son criaturas corredoras de gran tamaño, con anatomía intermedia entre avestruz, dinosaurio menor y mala actitud sostenida. Su aspecto puede provocar risa en viajeros inexpertos; esa risa suele terminar cuando la primera patada atraviesa una cerca.",
    description:
      "Poseen cuello largo, torso emplumado, patas musculosas y garras fuertes. Algunas variantes presentan placas escamosas en muslos, pecho y lomo, además de picos endurecidos capaces de romper cuero, cestas, dedos y orgullo. Se desplazan en manadas nerviosas y reaccionan con rapidez ante cualquier gesto que interpreten como provocación.\n\nLas avecestruces tienen una forma peculiar de inteligencia práctica: rodean obstáculos, cortan rutas, persiguen rezagados y esperan el momento exacto en que una caravana pierde formación para entrar corriendo como un problema con plumas.",
    behavior: [
      "Atacan con patadas frontales, embestidas laterales y picotazos oportunistas.",
      "Roban comida con violencia innecesaria.",
      "Protegen nidos con una agresividad que supera toda proporción lógica.",
      "En manada, pueden convertir una ruta segura en una estampida de gritos, polvo y bolsos destruidos."
    ],
    archiveNote: "Si una avecestruz fija la vista en un viajero, la discusión ya comenzó.",
    image: {
      src: bestiaryImage("bestiario-avecestruces-fauna-llanura.png"),
      alt: "Avecestruces de Jurak’Thalon"
    }
  },
  {
    slug: "trolls-de-hielo",
    name: "Trolls de Hielo",
    epithet: "",
    categorySlug: "criaturas-regionales-fantasticas",
    category: "Criaturas Regionales Fantásticas",
    classification: "Criatura Regional Fantástica / Humanoide Glacial Hostil",
    region: "Glaciem; cordilleras heladas, cavernas azules, pasos de ventisca",
    archiveStatus: "Confirmado",
    threatLevel: "III — Amenaza de Campo",
    nature: "Frío extremo, fuerza bruta, adaptación cavernaria, resistencia física",
    curator: "Yuki Arhess",
    curatorIcon: "💙🧊",
    quote: "Un troll de hielo entiende dos idiomas: territorio y fuerza. Conviene hablar ambos con extrema prudencia.",
    shortEntry:
      "Los trolls de hielo habitan zonas remotas de Glaciem, especialmente regiones montañosas donde la nieve cubre rutas antiguas y el viento borra huellas antes de que puedan convertirse en advertencia. Son enormes, resistentes y difíciles de desplazar una vez que reclaman una cueva, puente natural o paso estrecho.",
    description:
      "Su piel suele presentar tonos gris azulados, blancos sucios o piedra congelada. El cuerpo acumula placas de escarcha dura en hombros, espalda y antebrazos, como una armadura formada por clima y supervivencia. Su musculatura les permite mover rocas, quebrar árboles congelados y arrastrar presas a refugios donde el frío trabaja a su favor.\n\nAunque algunos viajeros los describen como torpes, esa lectura ha causado muchas muertes. Los trolls de hielo conocen su terreno con precisión instintiva: provocan derrumbes, golpean paredes para soltar carámbanos, bloquean pasos y esperan en silencio dentro de ventiscas densas.",
    behavior: [
      "Defienden refugios, rutas de caza y fuentes de calor subterráneo.",
      "Responden con especial violencia al fuego directo, no por miedo, sino por irritación territorial.",
      "Algunos grupos pequeños muestran jerarquías simples basadas en tamaño, edad y control de cavernas."
    ],
    archiveNote:
      "El silencio en una cueva de Glaciem puede significar vacío. También puede significar que algo grande está escuchando.",
    image: {
      src: bestiaryImage("bestiario-trolls-hielo-glaciem.png"),
      alt: "Trolls de Hielo de Glaciem"
    }
  },
  {
    slug: "magibestias-polares",
    name: "Magibestias Polares",
    epithet: "",
    categorySlug: "criaturas-regionales-fantasticas",
    category: "Criaturas Regionales Fantásticas",
    classification: "Criatura Regional Fantástica / Magibestia Antimágica",
    region: "Glaciem; tundras, costas heladas, campos de nieve profunda",
    archiveStatus: "Confirmado",
    threatLevel: "IV — Amenaza Mayor",
    nature: "Depredador polar, inmunidad mágica, fuerza animal aumentada",
    curator: "Rubí Kaelynn Vaer'Solyn",
    curatorIcon: "❤️🔥",
    quote: "Un oso polar que ignora magia. Maravilloso. Justo lo que faltaba: la naturaleza poniéndose soberbia.",
    shortEntry:
      "Las magibestias polares son osos de gran tamaño adaptados al extremo glacial de Caelyndor. Su rasgo más temido es la inmunidad natural a la magia directa, lo que vuelve inútiles muchas tácticas habituales de defensa, contención o distracción arcana.",
    description:
      "A simple vista pueden parecer osos polares de tamaño excepcional, pero su pelaje posee una densidad anómala y una capa interna que dispersa el aura como nieve golpeada por viento fuerte. Hechizos de inmovilización, proyectiles mágicos menores, ilusiones simples y descargas elementales suelen resbalar sobre ellos con eficacia reducida o nula.\n\nSu peligro aumenta porque conservan inteligencia animal clara. No desafían magia por arrogancia; la ignoran porque su cuerpo aprendió a vivir en un mundo donde la magia forma parte del clima. Cazan con paciencia, se camuflan en ventiscas y atacan cuando la presa ya gastó recursos intentando detenerlos.",
    behavior: [
      "Solitarios o en parejas durante temporadas específicas.",
      "Protegen crías con ferocidad extrema.",
      "Persiguen presas heridas durante kilómetros.",
      "Pueden esperar inmóviles bajo acumulaciones de nieve, usando el paisaje como cobertura."
    ],
    archiveNote: "Contra una magibestia polar, la espada mal usada sirve más que un hechizo brillante lanzado tarde.",
    image: {
      src: bestiaryImage("bestiario-magibestias-polares.png"),
      alt: "Magibestias Polares de Glaciem"
    }
  },
  {
    slug: "abejas-quimericas",
    name: "Abejas Quiméricas",
    epithet: "",
    categorySlug: "criaturas-regionales-fantasticas",
    category: "Criaturas Regionales Fantásticas",
    classification: "Criatura Regional Fantástica / Insecto Mágico de Colmena",
    region: "Sylvalis; claros florales, jardines antiguos, árboles melíferos",
    archiveStatus: "Confirmado",
    threatLevel: "II — Riesgo Regional",
    nature: "Polinización mágica, miel quimérica, defensa colectiva",
    curator: "Lyzi / Lyzantha",
    curatorIcon: "💜🌌",
    quote: "Son pequeñas solo hasta que una se posa en tu mano y recuerdas que esa mano también puede hincharse.",
    shortEntry:
      "Las abejas quiméricas se parecen mucho a las abejas comunes en forma, organización y función ecológica, salvo por un detalle difícil de ignorar: cada una puede alcanzar el porte de una mano humana. En Sylvalis, ese tamaño no se considera deformidad, sino adaptación mágica a flores antiguas y frutos de aura densa.",
    description:
      "Su cuerpo conserva la estructura familiar de una abeja: abdomen rayado, alas translúcidas, patas recolectoras y conducta de colmena. El tamaño altera por completo la relación con viajeros, recolectores y depredadores. Una sola abeja quimérica puede asustar a un niño; una colmena completa puede hacer retroceder a un grupo armado sin necesidad de magia espectacular.\n\nProducen miel quimérica, una sustancia espesa, aromática y cargada de propiedades sensoriales. En dosis pequeñas se usa en ungüentos, infusiones o rituales sylvalinos. En dosis imprudentes puede provocar sueños intensos, recuerdos mezclados, euforia breve o la sensación de haber escuchado al bosque pensar.",
    behavior: [
      "Suelen ser pacíficas mientras la colmena y las flores cercanas no sean perturbadas.",
      "Reaccionan ante humo excesivo, robo de panales, daño a árboles melíferos o movimientos bruscos cerca de la reina.",
      "Su zumbido colectivo puede generar desorientación leve en intrusos."
    ],
    archiveNote: "La miel de Sylvalis siempre pide respeto antes de dulzura.",
    image: {
      src: bestiaryImage("bestiario-abejas-quimericas.png"),
      alt: "Abejas Quiméricas de Sylvalis"
    }
  },
  {
    slug: "avispas-gigantes",
    name: "Avispas Gigantes de Sylvalis",
    epithet: "",
    categorySlug: "criaturas-regionales-fantasticas",
    category: "Criaturas Regionales Fantásticas",
    classification: "Criatura Regional Fantástica / Insecto Depredador de Gran Tamaño",
    region: "Sylvalis; zonas de floración oscura, troncos huecos, quebradas húmedas",
    archiveStatus: "Confirmado",
    threatLevel: "III — Amenaza de Campo",
    nature: "Depredación aérea, veneno paralizante, defensa territorial",
    curator: "Rubí Kaelynn Vaer'Solyn",
    curatorIcon: "❤️🔥",
    quote: "Una avispa del porte de un gato grande no es un insecto. Es una decisión ofensiva del bosque.",
    shortEntry:
      "Las avispas gato son avispas gigantes de Sylvalis, llamadas así por su tamaño aproximado: pueden alcanzar el porte de un gato grande, con alas fuertes, mandíbulas visibles y aguijón capaz de imponer respeto incluso a guerreros poco impresionables.",
    description:
      "A diferencia de las abejas quiméricas, las avispas gato poseen conducta más depredadora y temperamento más agresivo. Sus cuerpos presentan tonos negros, ámbar oscuro, violeta apagado o verde profundo, dependiendo del territorio floral donde se desarrollen. Las alas producen un zumbido grave que suele sentirse en el pecho antes de escucharse con claridad.\n\nSu veneno paraliza de forma parcial, provocando rigidez, fiebre localizada y pérdida temporal de coordinación. En criaturas pequeñas puede resultar letal. En humanos adultos, una sola picadura requiere atención rápida; varias picaduras convierten una caminata por el bosque en evacuación de emergencia.",
    behavior: [
      "Construyen nidos en troncos huecos, grietas altas o raíces elevadas.",
      "Defienden territorio con patrullas circulares.",
      "Atacan ojos, manos y rostro cuando perciben amenaza.",
      "Pueden despedazar fruta, pequeños animales o carne abandonada con rapidez inquietante."
    ],
    archiveNote: "El zumbido grave entre árboles de Sylvalis rara vez anuncia algo amable.",
    image: {
      src: bestiaryImage("bestiario-avispas-gigante.png"),
      alt: "Avispas Gigantes de Sylvalis"
    }
  },
  {
    slug: "treants-de-sylvalis",
    name: "Treants de Sylvalis",
    epithet: "",
    categorySlug: "criaturas-regionales-fantasticas",
    category: "Criaturas Regionales Fantásticas",
    classification: "Criatura Regional Fantástica / Guardián Arbóreo",
    region: "Sylvalis; bosques antiguos, rutas sagradas, claros del Árbol de Lüm",
    archiveStatus: "Confirmado",
    threatLevel: "IV — Amenaza Mayor",
    nature: "Conciencia vegetal, defensa territorial, memoria forestal",
    curator: "Lyzi / Lyzantha",
    curatorIcon: "💜🌌",
    quote: "Un treant tarda siglos en levantar la mano. Por eso, cuando lo hace, el bosque entero ya decidió.",
    shortEntry:
      "Los treants son guardianes arbóreos de Sylvalis, árboles conscientes capaces de moverse, observar, recordar y defender territorios antiguos. Su presencia suele pasar inadvertida hasta que el bosque considera necesario abandonar la paciencia.",
    description:
      "Un treant puede confundirse con un árbol viejo durante años. Su corteza muestra rostros apenas insinuados, nudos que parecen ojos cerrados y raíces capaces de cambiar de posición durante la noche. Algunos poseen coronas de hojas densas, otros ramas secas, flores oscuras, hongos luminosos o marcas de antiguos pactos espirituales.\n\nLa conciencia de un treant opera con tiempos lentos. Observa generaciones, recuerda pasos repetidos y distingue entre viajero perdido, niño curioso, leñador respetuoso e invasor reincidente. Su juicio rara vez nace de un solo acto. Cuando se mueve, lo hace con fuerza suficiente para quebrar carros, cerrar senderos, hundir raíces bajo campamentos o levantar muros vivos.",
    behavior: [
      "Custodian zonas sensibles del bosque.",
      "Pueden guiar a quienes respetan los caminos, confundir a depredadores, aislar intrusos o aplastar amenazas directas.",
      "Responden bien a cantos antiguos, ofrendas de agua limpia y promesas cumplidas.",
      "Responden muy mal al fuego irresponsable."
    ],
    archiveNote: "En Sylvalis, talar un árbol equivocado puede despertar a todo el bosque.",
    image: {
      src: bestiaryImage("bestiario-treants-sylvalis.png"),
      alt: "Treants de Sylvalis"
    }
  },
  {
    slug: "ciervos-de-escarcha",
    name: "Ciervos de Escarcha",
    epithet: "",
    categorySlug: "criaturas-regionales-fantasticas",
    category: "Criaturas Regionales Fantásticas",
    classification: "Criatura Regional Fantástica / Fauna Glacial Mística",
    region: "Glaciem; bosques nevados, lagos congelados, rutas de aurora",
    archiveStatus: "Confirmado",
    threatLevel: "I — Fauna Fantástica Sensible",
    nature: "Aura fría, presagio climático, desplazamiento silencioso",
    curator: "Yuki Arhess",
    curatorIcon: "💙🧊",
    quote:
      "Los ciervos de escarcha anuncian cambios de clima antes que los instrumentos. Ignorarlos es despreciar una forma antigua de lectura.",
    shortEntry:
      "Los ciervos de escarcha son criaturas elegantes de Glaciem, reconocibles por astas translúcidas, pelaje claro y huellas que permanecen brillando unos segundos sobre la nieve. Su peligro directo es bajo, pero su presencia suele indicar cambios importantes en el clima o en el flujo de aura local.",
    description:
      "Viven en grupos pequeños y evitan asentamientos ruidosos. Sus astas pueden captar microvariaciones del Cristal Madre, tormentas próximas o fracturas menores en el equilibrio glacial. Por eso algunos exploradores los consideran brújulas vivas, aunque seguirlos sin criterio puede llevar a zonas demasiado frías para un viajero común.\n\nSon extremadamente sensibles a la violencia innecesaria. Cuando un grupo de ciervos abandona una región, los habitantes cercanos suelen revisar sellos, puentes de hielo y reservas, porque algo en el equilibrio local empezó a cambiar.",
    behavior: [
      "Huyen ante amenazas directas.",
      "Forman círculos alrededor de crías.",
      "Se acercan ocasionalmente a personas heridas o perdidas, aunque nadie ha logrado demostrar si lo hacen por compasión, curiosidad o respuesta al aura debilitada."
    ],
    archiveNote: "En Glaciem, algunas advertencias llegan caminando sobre cuatro patas.",
    image: {
      src: bestiaryImage("bestiario-ciervos-escarcha.png"),
      alt: "Ciervos de Escarcha de Glaciem"
    }
  },
  {
    slug: "lagartos-braseros",
    name: "Lagartos Braseros",
    epithet: "",
    categorySlug: "criaturas-regionales-fantasticas",
    category: "Criaturas Regionales Fantásticas",
    classification: "Criatura Regional Fantástica / Reptil Ígneo Menor",
    region: "Cindralith; campos volcánicos, muros cálidos, ruinas soleadas",
    archiveStatus: "Confirmado",
    threatLevel: "II — Riesgo Regional",
    nature: "Calor acumulado, mordida ígnea, territorialidad menor",
    curator: "Rubí Kaelynn Vaer'Solyn",
    curatorIcon: "❤️🔥",
    quote: "Son chicos, calientes y muerden cuando los molestan. Básicamente Cindralith en formato lagarto.",
    shortEntry:
      "Los lagartos braseros son reptiles pequeños o medianos que absorben calor ambiental y lo concentran en placas rojizas a lo largo del lomo. Suelen parecer inofensivos mientras descansan al sol, pero reaccionan con rapidez si alguien pisa su nido o intenta capturarlos.",
    description:
      "Tienen escamas oscuras, vientre cobrizo y ojos brillantes como carbón encendido. Al sentirse amenazados, abren la boca y liberan una exhalación caliente capaz de quemar piel, tela fina o cuerda seca. Las variantes adultas pueden dejar marcas de brasa en roca porosa.\n\nNo representan una gran amenaza para guerreros preparados, pero causan numerosos accidentes entre niños, viajeros, mercaderes y aprendices demasiado confiados. En algunas aldeas de Cindralith se les permite vivir cerca de hornos exteriores porque reducen plagas menores y mantienen ciertos muros tibios durante noches frías.",
    behavior: [
      "Defienden grietas, nidos y superficies calientes.",
      "Se agrupan en pequeñas colonias donde el calor se comparte por contacto.",
      "Pueden robar brasas de fogatas y esconderlas entre piedras."
    ],
    archiveNote: "Nunca metas la mano en una grieta tibia de Cindralith sin mirar primero.",
    image: {
      src: bestiaryImage("bestiario-lagartos-braseros.png"),
      alt: "Lagartos Braseros de Cindralith"
    }
  },
  {
    slug: "murcielagos-de-luna-negra",
    name: "Murciélagos de Luna Negra",
    epithet: "",
    categorySlug: "criaturas-regionales-fantasticas",
    category: "Criaturas Regionales Fantásticas",
    classification: "Criatura Regional Fantástica / Fauna Nocturna Anómala",
    region: "Lunaris; cavernas altas, torres abandonadas, bosques bajo luna permanente",
    archiveStatus: "Confirmado",
    threatLevel: "II — Riesgo Regional",
    nature: "Eco oscuro, orientación lunar, enjambre evasivo",
    curator: "Lyzi / Lyzantha",
    curatorIcon: "💜🌌",
    quote: "En Lunaris, incluso el aleteo aprende a esconderse de la luz.",
    shortEntry:
      "Los murciélagos de luna negra habitan regiones donde la noche funciona como clima permanente. Su pelaje absorbe luz con eficacia extraña y sus alas pueden confundirse con fragmentos de sombra desprendida.",
    description:
      "Viajan en enjambres medianos y se comunican mediante pulsos de eco casi inaudibles. Cuando atraviesan un bosque, las hojas parecen moverse antes que ellos. Algunas comunidades de Lunaris los consideran indicadores de rutas seguras, porque evitan zonas donde depredadores mayores han reclamado territorio.\n\nEl riesgo aparece cuando un enjambre entra en pánico. Sus vuelos cerrados pueden apagar antorchas, confundir caballos, cortar visibilidad y provocar caídas en terreno irregular. Su mordida rara vez es mortal, pero ciertas variantes transmiten fiebre lunar: una alteración breve del sueño y la orientación.",
    behavior: [
      "Evitan luz intensa, campanas agudas y fuego azul.",
      "Se sienten atraídos por frutas nocturnas, cristales fríos y charcos donde se refleja la luna propia de Lunaris."
    ],
    archiveNote: "Cuando la sombra se mueve contra el viento, conviene agacharse.",
    image: {
      src: bestiaryImage("bestiario-murcielagos-luna-negra.png"),
      alt: "Murciélagos de Luna Negra de Lunaris"
    }
  },
  {
    slug: "ranas-de-niebla",
    name: "Ranas de Niebla",
    epithet: "",
    categorySlug: "criaturas-regionales-fantasticas",
    category: "Criaturas Regionales Fantásticas",
    classification: "Criatura Regional Fantástica / Anfibio Ilusorio",
    region: "Lunaris; pantanos de niebla, charcas frías, ruinas húmedas",
    archiveStatus: "Confirmado",
    threatLevel: "I — Fauna Fantástica Menor",
    nature: "Camuflaje, eco ilusorio, distorsión sonora",
    curator: "Yuki Arhess",
    curatorIcon: "💙🧊",
    quote:
      "Una rana de niebla rara vez mata. Su peligro consiste en convencer al viajero de caminar hacia el sitio incorrecto.",
    shortEntry:
      "Las ranas de niebla son anfibios pequeños, pálidos y casi translúcidos, capaces de modular sonidos dentro de bancos de bruma. Sus cantos pueden imitar gotas, pasos, voces lejanas o ramas quebrándose.",
    description:
      "Su piel absorbe humedad hasta volverse parcialmente invisible en niebla espesa. El croar de varias ranas juntas genera ecos falsos que desorientan a viajeros, depredadores y exploradores. Aunque su intención parece defensiva, los accidentes derivados de sus cantos son frecuentes en pantanos de baja visibilidad.\n\nAlgunos recolectores de Lunaris usan jaulas especiales para llevar una o dos ranas durante viajes nocturnos. Bien interpretadas, sus modulaciones pueden advertir cambios de presión o presencia de depredadores. Mal interpretadas, conducen directo a barro profundo.",
    behavior: [
      "Se esconden bajo hojas anchas, piedras húmedas y raíces sumergidas.",
      "Cantan con más fuerza antes de lluvias extrañas o cuando perciben vibraciones grandes en el suelo."
    ],
    archiveNote: "En la niebla, no toda voz pertenece a una garganta.",
    image: {
      src: bestiaryImage("bestiario-ranas-niebla.png"),
      alt: "Ranas de Niebla de Lunaris"
    }
  },
  {
    slug: "feneks",
    name: "Feneks",
    epithet: "",
    categorySlug: "criaturas-regionales-fantasticas",
    category: "Criaturas Regionales Fantásticas",
    classification: "Criatura Regional Fantástica / Fauna Ígnea Menor",
    region:
      "Cindralith; desiertos cálidos, bordes volcánicos, rutas de caravanas y asentamientos próximos a zonas de fuego estable",
    archiveStatus: "Confirmado",
    threatLevel: "I — Fauna Fantástica Sensible",
    nature: "Ígnea, social, curiosa, veloz, vinculada al calor ambiental",
    curator: "Rubí Kaelynn Vaer'Solyn",
    curatorIcon: "❤️🔥",
    quote:
      "Son chiquitos, brillantes y ladrones de comida. O sea, perfectos. Pero si les dices eso se ponen insoportables.",
    shortEntry:
      "Los feneks son pequeñas criaturas zorroides de Cindralith, reconocibles por sus grandes orejas, su pelaje cálido y la leve incandescencia que suele recorrerles la cola, las patas o el borde de las orejas cuando se excitan, se asustan o se preparan para correr.",
    description:
      "A simple vista recuerdan a zorros del desierto, pero su relación con el fuego los separa de la fauna común. Su cuerpo absorbe calor durante el día y lo libera en pulsos suaves durante la noche, lo que les permite sobrevivir en terrenos de temperatura extrema. En grupos pequeños, varios feneks pueden mantener tibio un refugio improvisado, una cueva baja o incluso el interior de una carreta si deciden dormir juntos cerca de las provisiones.\n\nSu comportamiento mezcla curiosidad, oportunismo y una sociabilidad difícil de clasificar. Se acercan a campamentos cuando perciben comida, brasas seguras o personas con aura de fuego estable. No suelen atacar sin provocación, pero pueden morder, arañar o incendiar accidentalmente telas ligeras si entran en pánico.\n\nLos habitantes de Cindralith los consideran una presencia ambigua: buen augurio para viajeros perdidos, molestia para cocineros descuidados y compañía apreciada por niños que logran ganarse su confianza. Algunos feneks desarrollan vínculos con guerreros, herreros o familias de frontera, aunque rara vez aceptan domesticación completa.",
    behavior: [
      "Se mueven en grupos pequeños, roban comida con coordinación sorprendente y usan sus orejas para disipar calor.",
      "Les atraen panes dulces, brasas limpias, telas cálidas y objetos brillantes.",
      "Cuando se sienten amenazados, arquean el lomo, erizan la cola y su pelaje adquiere un brillo anaranjado intenso."
    ],
    mainTraits:
      "Grandes orejas térmicas, cola con brillo ígneo, patas veloces, pelaje cálido, inteligencia social alta para fauna menor y afinidad natural con ambientes volcánicos o desérticos.",
    archiveNote:
      "Un fenek solo es una visita. Tres feneks son una travesura. Una familia completa es una auditoría alimentaria sin permiso.",
    image: {
      src: bestiaryImage("bestiario-feneks-fauna-ignea-menor.png"),
      alt: "Feneks de Cindralith"
    }
  },
  {
    slug: "salamandras-enanas-gigantes",
    name: "Salamandras Enanas Gigantes",
    epithet: "",
    categorySlug: "criaturas-regionales-fantasticas",
    category: "Criaturas Regionales Fantásticas",
    classification: "Criatura Regional Fantástica / Anfibio Ígneo de Gran Tamaño",
    region: "Cindralith; pantanos termales, ríos cálidos, cavernas húmedas cercanas a actividad volcánica",
    archiveStatus: "Confirmado",
    threatLevel: "III — Amenaza de Campo",
    nature: "Anfibia, térmica, territorial, pesada, resistente",
    curator: "Yuki Arhess",
    curatorIcon: "💙🧊",
    quote: "El nombre induce a error. La criatura no.",
    shortEntry:
      "Las salamandras enanas gigantes son anfibios masivos de Cindralith, llamados “enanas” por comparación con salamandras míticas mayores de tradición antigua, aunque cada ejemplar adulto puede alcanzar el porte aproximado de un caballo.",
    description:
      "Su cuerpo es bajo, ancho y musculoso, con piel húmeda, oscura y brillante, marcada por vetas rojizas, cobrizas o anaranjadas que se intensifican cuando acumulan calor interno. Se desplazan con lentitud aparente, pero pueden lanzar embestidas cortas con una fuerza suficiente para derribar un jinete, partir cercas o volcar un carro liviano.\n\nA diferencia de los lagartos braseros, las salamandras enanas gigantes dependen de humedad y calor al mismo tiempo. Habitan zonas donde el agua se entibia por actividad volcánica, formando pozas humeantes, barro caliente y cavernas cubiertas de vapor mineral. Su piel absorbe calor del entorno y puede liberar una película ardiente que quema al contacto prolongado.\n\nNo son criaturas crueles ni especialmente cazadoras, pero defienden su espacio con terquedad. Una salamandra instalada en una poza termal rara vez se mueve por voluntad ajena. Los viajeros suelen rodearlas; los imprudentes intentan espantarlas; los sabios esperan a que terminen de dormir.",
    behavior: [
      "Protegen pozas, nidos de barro caliente y rutas de agua tibia.",
      "Se alimentan de peces termales, crustáceos de roca, hongos húmedos y pequeños animales que se acercan demasiado.",
      "Durante la temporada de apareamiento emiten vibraciones profundas que hacen temblar la superficie del agua."
    ],
    mainTraits:
      "Tamaño comparable al de un caballo, piel húmeda resistente al calor, cuerpo bajo y pesado, mordida fuerte, embestida corta, tolerancia extrema a aguas termales y capacidad de calentar su superficie corporal.",
    archiveNote:
      "Quien escucha chapoteo pesado en una poza caliente de Cindralith debería asumir que el baño ya tiene dueño.",
    image: {
      src: bestiaryImage("bestiario-salamandras-enanas-gigantes.png"),
      alt: "Salamandras Enanas Gigantes de Cindralith"
    }
  }
];

export function getBestiaryEntryBySlug(slug: string) {
  return bestiaryEntries.find((entry) => entry.slug === slug);
}
