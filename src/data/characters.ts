import { assetImage } from "@/data/assets";

export type CharacterNarrativeAccess = {
  label: string;
  href: string;
};

export type CharacterNarrativeSection = {
  title: string;
  lead?: string;
  paragraphs: string[];
};

export type CharacterDetailNote = {
  title: string;
  text: string;
  type?: string;
};

export type CharacterBond = {
  name: string;
  description: string;
  href?: string;
};

export type CharacterRelatedStory = {
  title: string;
  type: string;
  description: string;
  href?: string;
};

export type CharacterArchive = {
  fullName?: string;
  commonName?: string;
  apparentAge?: string;
  gender?: string;
  race?: string;
  originRegion?: string;
  elementPath?: string;
  professionRole?: string;
  masteryLevel?: string;
  identitySummary?: string;
  /** Prosa visible en el Archivo como "Diseño / canon visual"; cuando existe, reemplaza la lista visualCanon en la ficha pública. */
  designCanon?: string;
  /** Campo interno de producción (restricciones técnicas, prompts, consistencia). NO se renderiza en la ficha pública. */
  visualNotes?: string;
};

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
  /** Frase breve de identidad para el hero; si falta, se usa description. */
  identityPhrase?: string;
  /** Accesos narrativos del hero; si la lista no existe, no se muestran botones. */
  narrativeAccess?: CharacterNarrativeAccess[];
  /** Sección narrativa principal (título editorial, lead y párrafos entregados por el autor). */
  narrativeSection?: CharacterNarrativeSection;
  /** Tarjetas de datos íntimos, emocionales o memorables. */
  details?: CharacterDetailNote[];
  /** Vínculos con personajes, reinos, facciones o entidades. */
  bonds?: CharacterBond[];
  /** Relatos, arcos, libros, canciones o momentos clave asociados. */
  relatedStories?: CharacterRelatedStory[];
  /** Ficha técnica del Archivo del Cronista. */
  archive?: CharacterArchive;
  visualCanon: string[];
};

// Galería de la ficha (carrusel): NO se declara en esta data. Se resuelve por
// convención de nombres en el repo Caelyndor-Assets, máximo 7 imágenes por
// personaje, en orden del 1 al 7:
//   [slug]-galeria-carrusel-imagen-[1-7].webp
// Ejemplo: yuki-galeria-carrusel-imagen-1.webp ... yuki-galeria-carrusel-imagen-7.webp
// Basta subir los archivos al repo de assets para que aparezcan en la ficha.
// Para personajes futuros se usa la misma regla con su slug.

export const characters: Character[] = [
  {
    slug: "yuki",
    name: "Yuki",
    title: "La nieve bajo el umbral",
    role: "Reina de Glaciem; contrapunto, refugio y filo silencioso",
    affinity: "Hielo / Memoria / Quietud",
    accent: "#8bc6df",
    image: assetImage("yuki_canon_portrait_v02.png"),
    description: "Guarda una calma peligrosa, como si cada palabra suya tuviera que cruzar una tormenta antes de existir.",
    story:
      "Hija de Nayara, la Regina Glaciei, y de Kaelión, cuyo exilio la corte todavía escribe en voz baja. Creció entre los protocolos y silencios del Alto Consejo hasta heredar el trono de Glaciem, y reina desde entonces con precisión, distancia elegante y un humor tan seco como el invierno que administra.",
    identityPhrase:
      "Una soberana de hielo y trueno, tan serena que incluso su amenaza parece una forma de arquitectura.",
    narrativeSection: {
      title: "Bajo la corona de hielo",
      lead:
        "Yuki Arhess gobierna como quien sostiene una tormenta dentro de un cristal perfecto. Su calma no apaga lo que siente: lo ordena, lo afila y lo convierte en estructura.",
      paragraphs: [
        "Reina de Glaciem, estratega y prodigio de doble senda elemental, Yuki encarna una autoridad serena, adulta y precisa. Su presencia parece construida con hielo azul, mármol frío y relámpagos contenidos: una belleza regia que no necesita imponerse por volumen, porque cada gesto suyo ya tiene peso.",
        "El hielo en Yuki es disciplina, claridad y refugio. Le permite pensar cuando otros se quiebran, contener el caos antes de que se vuelva desastre y convertir la emoción en forma sin destruirla. Su trueno vive debajo de esa superficie: rápido, intenso, orgulloso, como una corriente que atraviesa el cristal sin romperlo.",
        "Yuki observa antes de actuar. Mide las consecuencias, escucha los silencios y exige precisión porque sabe que una palabra mal dicha puede costar más que una espada desenvainada. Cuando pronuncia “Define”, está abriendo el punto exacto donde puede intervenir.",
        "Su historia avanza hacia una comprensión más profunda de sí misma. Yuki aprende que la estructura puede proteger sin convertirse en prisión, que la calma también puede ser ternura, y que incluso una reina acostumbrada a sostener un reino entero merece un lugar donde dejar de calcular por un momento."
      ]
    },
    details: [
      {
        title: "Lo que no espera",
        type: "Ternura",
        text:
          "Yuki rara vez espera que alguien le guarde un postre. Aprendió a no contar con ese tipo de gestos pequeños, por eso, cuando encuentra uno con su nombre, primero lo mira en silencio. Luego lo ordena junto a su taza de té. Su rostro apenas cambia, pero algo dentro de ella descansa."
      },
      {
        title: "Su forma de cuidar",
        type: "Gesto de cariño",
        text:
          "Yuki cuida con precisión. Una ruta preparada, una advertencia exacta, una manta dejada donde alguien va a sentarse o una decisión tomada antes de que el peligro llegue. Su afecto suele aparecer antes que sus palabras."
      },
      {
        title: "El peso de decidir",
        type: "Herida",
        text:
          "Lo que más pesa en Yuki no es el frío, sino la posibilidad de fallar cuando otros dependen de su juicio. Para ella, una mala decisión puede abrir una grieta en el reino, en la confianza y en sí misma."
      },
      {
        title: "Té antes del desastre",
        type: "Ritual",
        text:
          "El té es una forma de orden. Mientras la taza permanezca firme entre sus manos, Yuki puede pensar. Y mientras pueda pensar, todavía existe una salida."
      },
      {
        title: "Una ternura de milímetros",
        type: "Contradicción",
        text:
          "Cuando algo la conmueve, Yuki cambia por detalles mínimos: baja apenas la mirada, relaja los hombros, permite una pausa más larga o suaviza la voz. En ella, la ternura ocurre por milímetros."
      },
      {
        title: "La dignidad en peligro",
        type: "Secreto pequeño",
        text:
          "En su modo más vulnerable, Yuki sostiene la dignidad con ambas manos mientras intenta fingir que nada ocurrió. Un rubor leve, una neblina involuntaria o una respuesta demasiado precisa pueden delatarla más que una confesión."
      },
      {
        title: "Un descanso sin preguntas",
        type: "Anhelo",
        text:
          "A veces desea que alguien se siente a su lado sin pedirle una respuesta, una estrategia o una sentencia. Un silencio compartido, sin urgencia ni deber, puede significar más para ella que una promesa demasiado grande."
      }
    ],
    bonds: [
      {
        name: "Noctalypse",
        description:
          "Con Noctalypse, Yuki puede bajar defensas de una forma excepcional. Él la mira más allá de la corona: como mujer, presencia vulnerable y voluntad compleja. Ese vínculo abre una grieta íntima donde la Yuki ceremonial puede respirar.",
        href: "/personajes/noctalypse"
      },
      {
        name: "Rubí",
        description:
          "Rubí es el fuego que desordena su método. Impulso contra consecuencia, cuerpo contra cálculo, llama contra arquitectura. Son fuerzas equivalentes que se irritan, se desafían y se obligan a crecer fuera de sus propias defensas.",
        href: "/personajes/rubi"
      },
      {
        name: "Lyzi",
        description:
          "Lyzi entiende aquello que los libros no alcanzan a explicar. Su intuición antigua incomoda y calma a Yuki al mismo tiempo: donde Lyzi habla en símbolos, Yuki pide definición; donde Yuki busca estructura, Lyzi escucha lo que el mundo recuerda.",
        href: "/personajes/lyzi"
      },
      {
        name: "Glaciem",
        description:
          "Glaciem es su reino, su peso y su espejo. Yuki aprendió a convertir emoción en estructura porque un reino entero necesitaba verla firme incluso cuando el mundo se volvía incierto.",
        href: ""
      },
      {
        name: "Halrik",
        description:
          "Halrik representa confianza operativa: logística, ejecución y obediencia inteligente bajo presión. Con él, Yuki puede hablar en instrucciones limpias, porque ambos entienden el costo de una orden mal formulada.",
        href: "/personajes/halrik"
      },
      {
        name: "Aelwyn",
        description:
          "Aelwyn funciona como presencia protectora y última línea de defensa. Su lealtad luminosa recuerda que incluso una reina capaz de sostener una guerra puede aceptar que alguien cuide la puerta.",
        href: "/personajes/aelwyn-solrenhal"
      }
    ],
    relatedStories: [
      {
        title: "El sacrificio en el Vórtice de Azhel",
        type: "Arco",
        description:
          "Uno de los momentos donde el deber de Yuki cruza el límite de lo soportable y revela hasta dónde puede llegar su sentido de responsabilidad.",
        href: ""
      },
      {
        title: "SHINDORAVB",
        type: "Técnica / escena clave",
        description:
          "La manifestación electroglacial de Yuki: hielo y trueno obedeciendo una geometría interna, como una sentencia precisa escrita en cristales y relámpagos.",
        href: ""
      },
      {
        title: "El juicio del duelo Rubí vs Aelwyn",
        type: "Escena",
        description:
          "Yuki en su dimensión más seca, metódica y judicial: observando dos fuerzas imposibles con la calma de quien ya redactó el veredicto antes del primer golpe.",
        href: ""
      },
      {
        title: "El campamento del Castillo Maldito",
        type: "Arco",
        description:
          "La Yuki práctica: reglas, turnos, conservación de sangre y supervivencia. Cuando el horror intenta imponer caos, ella responde con procedimiento.",
        href: ""
      },
      {
        title: "Herosia y el Consejo Occidental",
        type: "Arco político",
        description:
          "Yuki frente al poder institucional externo: diplomacia, soberanía y una advertencia helada para quienes confunden invitación con subordinación.",
        href: ""
      }
    ],
    archive: {
      fullName: "Yuki Arhess",
      commonName: "Yuki",
      apparentAge: "22 años",
      gender: "Femenino",
      race: "Humana",
      originRegion: "Glaciem",
      elementPath: "Hielo / Trueno",
      professionRole:
        "Reina de Glaciem, estratega, protagonista central y mente táctica del grupo.",
      masteryLevel:
        "Adeptus. Prodigio de doble senda elemental, con dominio avanzado y excepcional de su aura, pero aún no Maestra.",
      identitySummary:
        "Yuki es una soberana funcional, una estratega de guerra y una prodigio electroglacial. Su presencia se siente como una arquitectura de hielo atravesada por relámpagos contenidos: autoridad, inteligencia, autocontrol, belleza adulta, frialdad refinada y una tensión eléctrica casi imperceptible bajo la calma.",
      designCanon:
        "Yuki lleva la soberanía como una temperatura. Su imagen pertenece a los tonos fríos de Glaciem: azul hielo, azul profundo, blanco nieve, plata y destellos de aurora. Su cabello azul hielo cae largo, liso y controlado, con un flequillo recto que enmarca la mirada. Sobre la parte superior de la cabeza, la trenza ceremonial funciona como una declaración silenciosa: incluso la emoción, en Yuki, aprende a tomar forma. Cuando permanece inmóvil, su capa azul profundo parece una muralla; cuando avanza, da la impresión de que Glaciem camina con ella. El broche metálico en forma de diamante descansa sobre su escote como una promesa latente. Su arma, el Colibrí de Glaciem, resume su naturaleza: delicadeza aparente, velocidad extrema, precisión quirúrgica y una letalidad que no necesita espectáculo. Puede reposar como broche, despertar como colibrí metálico o desplegarse como ballesta de una mano.",
      visualNotes:
        "Las restricciones técnicas de canon visual, prompts negativos y advertencias de consistencia quedan reservadas para producción interna, model sheets y prompts de imagen. En la ficha pública, el canon visual debe aparecer como atmósfera narrativa, no como checklist técnico."
    },
    visualCanon: ["Paleta de azul hielo y plata", "Silueta limpia", "Texturas frias sin caer en pureza simple"]  },
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
    story:
      "Nadie sabe con certeza de dónde vino Noctalypse. En tiempos antiguos, Lyzi fue una de las primeras presencias que lo vio de verdad y le enseñó lenguaje, costumbres humanas y contención emocional. Después, Rubí fue su primer amor antes de revivirlo y antes de que él perdiera la memoria. Más tarde, amnésico en Glaciem, Noct se enamoró de Yuki y juró protegerla. Camina entre esas memorias intentando no agrandar su caos emocional, pero sin negar lo que cada vínculo dejó en él.",
    personality:
      "Noctalypse es sereno, introspectivo, melancólico y analítico. Observa más de lo que habla. Puede parecer distante porque organiza el peligro antes de reaccionar emocionalmente, pero su distancia suele ser una forma de control frente a fuerzas que podrían romper algo si se expresan sin filtro. Tiene humor seco, ternura práctica y una capacidad extraña para convertir el abismo en logística doméstica.",
    identityPhrase:
      "Una noche viva que lee patrones, guarda silencios y prepara salidas antes de que alguien sepa que va a necesitarlas.",
    narrativeSection: {
      title: "La sombra que no termina",
      lead:
        "Noctalypse camina con una noche viva detrás de él. No para devorar la luz, sino para recordar dónde estuvo, a quién debe proteger y qué verdades quedaron ocultas cuando el mundo decidió mirar hacia otro lado.",
      paragraphs: [
        "El Lector de Sombras es un hombre de vacío, memoria y análisis cansado. Observa el peligro como si leyera una estructura rota: señales, grietas, patrones y silencios donde otros solo ven amenaza. Su presencia altera la escena sin levantar la voz, como una puerta que aparece en un muro donde nadie recordaba haber dejado salida.",
        "En Noct, la oscuridad no es espectáculo. Es lenguaje, defensa y memoria. Su capa de sombras líquidas reacciona como tinta viva; su sombra expresa emociones que su rostro prefiere callar; su Grimorio del Crepúsculo cuelga incompleto a su costado como una verdad que todavía no termina de abrirse.",
        "Puede parecer distante porque organiza incluso lo imposible: técnicas numeradas, marcas de riesgo, rutas de escape, refugios, anclas, llaves y condiciones de regreso. Pero bajo esa arquitectura de control vive una ternura práctica. Noct cuida preparando comida, sosteniendo cabello ajeno, entregando una bufanda de retorno, prestando un anillo contra el mareo o comprando un cubo imposible para plantar papas y arroz.",
        "Su historia no se reduce al origen desconocido ni al caos de sus vínculos. Noctalypse es la sombra que aprendió a quedarse. La noche que no pide ser salvada con discursos, pero sigue volviendo con una salida preparada, una técnica registrada, una cena caliente y la extraña esperanza de que todos puedan sentarse a la misma mesa."
      ]
    },
    details: [
      {
        title: "La sombra delatora",
        type: "Secreto pequeño",
        text:
          "Noct puede controlar el rostro, la voz y la postura. Su sombra, en cambio, tiene menos disciplina. Puede agitarse, inclinarse, proteger o incluso bailar cuando él permanece inmóvil, revelando una emoción que su boca todavía no decidió admitir."
      },
      {
        title: "Ternura logística",
        type: "Gesto de cariño",
        text:
          "Noctalypse rara vez cuida con declaraciones grandes. Cuida preparando rutas, anclas, comida, barreras y formas de volver. Su cariño suele aparecer como un objeto útil dejado en el momento exacto: una bufanda, un anillo, una sala imposible o una cena que nadie sabía que necesitaba."
      },
      {
        title: "El número y el nombre",
        type: "Contradicción",
        text:
          "Noct numera sus técnicas para contenerlas. El número le permite controlar el riesgo; el nombre le permite sentirlo. Cuando Rubí bautiza una técnica, su aura responde con más fuerza, como si la sombra entendiera mejor aquello que el vínculo se atreve a nombrar."
      },
      {
        title: "Grimorio incompleto",
        type: "Símbolo",
        text:
          "El Grimorio del Crepúsculo no es una verdad cerrada. Solo posee el Atardecer; faltan Amanecer y Anochecer. Por eso pesa como una promesa incompleta: algo que Noct carga, consulta y protege, pero que todavía no revela el ciclo entero."
      },
      {
        title: "La combinación prohibida",
        type: "Humanidad práctica",
        text:
          "Noct puede hablar de vacío, eclipses y técnicas catastróficas con seriedad absoluta, pero su primer sueño culinario para el Cubo Cronoestático fue papas fritas, arroz y huevo frito. La llama como si fuera un hallazgo religioso: la combinación prohibida."
      },
      {
        title: "Peligro contenido",
        type: "Herida",
        text:
          "La Técnica 7 no es un truco ni una amenaza teatral. Es una señal de pérdida de control y riesgo estructural. Noct vive sabiendo que algunas partes de sí mismo deben permanecer numeradas, contenidas y lejos de quienes ama."
      },
      {
        title: "Sospechoso incluso cuidando",
        type: "Ironía",
        text:
          "Noctalypse tiene el talento trágico de parecer culpable incluso cuando está haciendo algo tierno. Daegal llegó a amenazarlo con una cuchilla creyendo que ocultaba algo; Noct solo estaba cuidando a un cervatillo dormido junto al fuego."
      },
      {
        title: "Dos vacas, por supuesto",
        type: "Ternura absurda",
        text:
          "En el Cubo Cronoestático, Noct quiere dos vacas polisabor porque una sola estaría triste. Lo dice con la misma gravedad con la que hablaría de una grieta dimensional. Y precisamente por eso resulta imposible no creerle."
      }
    ],
    bonds: [
      {
        name: "Rubí",
        description:
          "Rubí fue su primer amor antes de revivirlo y antes de que él perdiera la memoria. Ella representa la llama que le enseñó a arder sin pedirle que dejara de ser sombra. Cuando Rubí nombra sus técnicas, Noct no solo recibe una palabra: recibe vínculo, resonancia y una forma más humana de tocar su propio poder.",
        href: "/personajes/rubi"
      },
      {
        name: "Yuki",
        description:
          "Yuki es una calma que ordena sus pensamientos. Con ella, Noct encuentra estructura, precisión y una intimidad que no depende del caos. La bufanda de retorno que le entrega dice más que una promesa: si su corazón lo necesita, puede volver.",
        href: "/personajes/yuki"
      },
      {
        name: "Lyzi",
        description:
          "Lyzi fue una de las primeras presencias que lo vio cuando aún era anomalía sin nombre. Le ofreció lenguaje, cuidado y reconocimiento. Entre ambos existe una ternura antigua, suspendida, hecha de memoria, estrellas y cosas que nunca terminaron de decirse.",
        href: "/personajes/lyzi"
      },
      {
        name: "Tenebrys",
        description:
          "Tenebrys representa el borde peligroso de aquello que Noct contiene. Su presencia vuelve más densa la sombra, más delicado el control y más urgente la necesidad de que Noctalypse siga siendo algo más que un recipiente de oscuridad.",
        href: ""
      },
      {
        name: "Fulgor",
        description:
          "Fulgor reconoce a Noctalypse como un digno amigo. Esa validación pesa porque no cualquiera cercano a Rubí recibe el respeto de un dragón elemental de fuego. En Noct, Fulgor percibe sombra, sí, pero también cuidado.",
        href: "/personajes/fulgor"
      },
      {
        name: "Valthor",
        description:
          "Valthor encuentra entrañable a Noctalypse. Esa mirada permite ver a Noct desde un ángulo menos amenazante: extraño, sombrío y cargado de anomalías, pero también profundamente digno de afecto.",
        href: "/personajes/valthor"
      },
      {
        name: "Kaelión",
        description:
          "Kaelión no termina de aprobar a Noctalypse. La tensión tiene algo de protección, de choque generacional y de sospecha comprensible ante el tipo sombrío que camina demasiado cerca de su hija.",
        href: ""
      },
      {
        name: "Daegal",
        description:
          "Daegal lo encontró junto al fuego y lo amenazó creyendo que ocultaba algo. La escena terminó revelando una verdad muy Noct: a veces parece una amenaza porque la sombra lo acompaña, aunque en realidad esté cuidando algo pequeño.",
        href: ""
      }
    ],
    relatedStories: [
      {
        title: "Grimorio del Crepúsculo",
        type: "Artefacto / símbolo",
        description:
          "El artefacto principal de Noctalypse: un grimorio incompleto, encadenado a su pierna y abierto solo con su llave. Contiene Atardecer; todavía faltan Amanecer y Anochecer.",
        href: ""
      },
      {
        title: "Técnica 7.1 — Llave Dimensional",
        type: "Técnica / vínculo",
        description:
          "La versión beta y controlada de la Técnica 7. Rubí le dio su nombre, y al hacerlo aumentó su eficacia por resonancia emocional. El número contiene; el nombre vincula.",
        href: ""
      },
      {
        title: "Técnica 7",
        type: "Riesgo mayor",
        description:
          "Una técnica prohibida o catastrófica que aparece cuando Noct pierde el control. Su recuerdo arrastra eclipse, pérdida de lenguaje y alteración profunda de la realidad.",
        href: ""
      },
      {
        title: "Anillo y Beso",
        type: "Escena emocional",
        description:
          "La escena en que Noct presta a Lyzi el Anillo de Vitalidad de Blas para aliviar su mareo. El gesto parece una propuesta sin serlo y deja suspendida una ternura difícil de resolver.",
        href: ""
      },
      {
        title: "Sala Modular Crono-Estática",
        type: "Artefacto / refugio",
        description:
          "El Cubo Cronoestático comprado por Noct para crear una huerta portátil: papas, arroz, ajíes, abejas quimera, vacas polisabor y una primera cena oficial con los cuatro.",
        href: ""
      },
      {
        title: "Ritual de Cuervo de Asalto",
        type: "Invocación",
        description:
          "Un ritual extraño, solemne y teatral donde Noct invoca un cuervo de asalto mediante cabello propio, fuego y una pluma de cuervo. Oscuro, preciso y muy suyo.",
        href: ""
      },
      {
        title: "Patalicio",
        type: "Invocación absurda",
        description:
          "Un ornitorrinco cojo conjurado con aura: anomalía menor, apoyo emocional absurdo y prueba de que incluso el vacío puede tener un sentido del humor cuestionable.",
        href: ""
      },
      {
        title: "El núcleo con Rubí, Yuki y Lyzi",
        type: "Vínculo central",
        description:
          "La historia emocional de Noctalypse atraviesa fuego, hielo y estrella: Rubí lo nombra, Yuki lo ancla y Lyzi lo recuerda desde antes de que el mundo supiera cómo llamarlo.",
        href: ""
      }
    ],
    archive: {
      fullName: "Noctalypse",
      commonName: "Noct",
      apparentAge: "Aparenta unos 34 años",
      gender: "Masculino",
      race: "Sin clasificar",
      originRegion: "Desconocida",
      elementPath: "Vacío",
      professionRole:
        "Erudito oscuro, lector de patrones, contenedor de anomalías, estratega de sombra y protector silencioso del grupo protagonista.",
      masteryLevel: "Adeptus / Avanzado.",
      identitySummary:
        "Noctalypse es una figura de sombra viva, análisis cansado y ternura difícil de nombrar. Su presencia se siente como una noche que aprendió a caminar junto a otros. La oscuridad no lo acompaña para volverlo amenaza vacía, sino porque algo en él está conectado con el vacío, los umbrales y aquello que queda fuera del lenguaje común.",
      designCanon:
        "Noctalypse debe sentirse como un hombre adulto que camina con una noche viva detrás de él. Alto, delgado y elegante, de rostro limpio, mirada violeta profunda y cansancio analítico, su atractivo nace de presencia, silencio, sombra y humanidad persistente. Su cabello negro es corto, desordenado y ligeramente ondulado; en sueños prolongados puede crecer hasta los hombros y volverse más rizado y necio. Viste como aventurero oscuro: abrigo largo, ropa negra funcional, tres cinturones tipo asterisco, hebillas, pociones sospechosas y el Grimorio del Crepúsculo encadenado al costado de la pierna. Su capa de sombras líquidas tiene capucha y se mueve como tinta viva: elegante cerca del cuello, gastada hacia las pantorrillas, capaz de absorber proyectiles como piedras entrando al agua nocturna. Su sombra parece tener vida propia y expresa aquello que Noct no dice. Una cicatriz solar tribal en el hombro guarda una memoria dorada y dolorosa. Todo en él debe decir vacío elegante, sombra viva, análisis cansado, ternura práctica, grimorio incompleto y vínculo que lo vuelve más fuerte.",
      visualNotes:
        "Las restricciones técnicas de canon visual, prompts negativos y advertencias de consistencia quedan reservadas para producción interna, model sheets y prompts de imagen. En la ficha pública, el canon visual debe aparecer como atmósfera narrativa, no como checklist técnico."
    },
    visualCanon: ["Contraluz extremo", "Formas ceremoniales", "Ausencia como elemento visual"]  },
  {
    slug: "rubi",
    name: "Rubí",
    title: "La brasa que recuerda",
    role: "Protagonista de fractura y voluntad",
    affinity: "Fuego / Sangre / Juramento",
    accent: "#c84b4b",
    image: assetImage("rubi_canon_portrait_v02.png"),
    description: "Una presencia marcada por perdidas antiguas y una obstinacion capaz de encender reinos dormidos.",
    story:
      "Rubí proviene de Cindralith, una región donde el fuego, el desierto, la supervivencia y el orgullo territorial moldean el carácter. Su identidad se construyó alrededor de la acción, la resistencia y la protección de aquello que considera suyo. Fulgor cumple para ella una función paterna y de tutor, mientras que Aelrhyssa actúa como figura materna e institutriz. Rubí pelea porque su cuerpo aprendió que proteger también es ponerse delante.",
    personality:
      "Rubí es intensa, directa, pasional y protectora. No suaviza demasiado sus palabras porque su manera de amar suele ser actuar, defender, gritar, empujar hacia adelante o ponerse entre alguien y el peligro. Su carácter tsundere aparece cuando se siente vulnerable: puede responder con irritación, pero sus acciones revelan afecto antes que sus palabras.",
    identityPhrase:
      "Una llama viva de Cindralith: cálida, peligrosa, protectora y demasiado orgullosa para admitir cuánto le importa.",
    narrativeSection: {
      title: "Donde arde la voluntad",
      lead:
        "Rubí Kaelynn Vaer'Solyn no entra a una escena para decorarla: entra como una brasa que decide volverse incendio. Su fuego no solo destruye; protege, empuja, desafía y se queda ardiendo donde otros habrían huido.",
      paragraphs: [
        "Guerrera de fuego, protagonista central y fuerza de choque emocional del grupo, Rubí vive con el cuerpo entero. Habla con la mirada, con los puños, con la risa, con el hambre, con la rabia y con esa forma suya de ponerse delante del peligro antes de terminar de explicar por qué.",
        "En ella, el fuego es identidad, defensa y ternura mal disimulada. Arde porque siente demasiado, porque no aprendió a mirar una injusticia desde lejos y porque su lealtad llega antes que su prudencia. Rubí puede parecer explosiva, pero su impulso nace de una verdad simple: si alguien suyo va a caer, cae detrás de ella.",
        "Su orgullo no es adorno. Es armadura. Cuando se siente vulnerable, Rubí protesta, se irrita o convierte la vergüenza en amenaza verbal, pero sus acciones suelen delatarla antes que sus palabras. Puede gruñir que no le importa mientras ya está cruzando el fuego por ti.",
        "Su camino no consiste en apagarse. Rubí debe aprender a dirigir su intensidad sin traicionar aquello que la vuelve Rubí: el corazón protector, la voluntad indomable y esa llama capaz de quemarse por amor para que otro vuelva a respirar."
      ]
    },
    details: [
      {
        title: "Si vas a caer",
        type: "Protección",
        text:
          "Rubí no protege desde la distancia. Su cuerpo reacciona antes que su discurso: se adelanta, bloquea el golpe, empuja a alguien detrás de ella y luego se enoja si le agradecen demasiado. Para ella, cuidar es ocupar el lugar donde iba a caer el daño."
      },
      {
        title: "Vergüenza en llamas",
        type: "Contradicción",
        text:
          "Cuando algo la toca de verdad, Rubí rara vez se vuelve suave de inmediato. Primero aparta la mirada, frunce el ceño o responde con una amenaza torpe. Su ternura suele llegar disfrazada de enojo, como si admitir cariño fuera más peligroso que entrar a combate."
      },
      {
        title: "Hambre, cansancio y humanidad",
        type: "Dato íntimo",
        text:
          "Rubí no es etérea. Tiene hambre, se cansa, se irrita, necesita comer algo y a veces arregla el mundo con una mezcla de pan, rabia y movimiento. Esa humanidad visible la vuelve cercana: su fuego también vive en cosas simples."
      },
      {
        title: "La trenza táctica",
        type: "Símbolo",
        text:
          "Su única trenza lateral no es coquetería. Es disciplina sobreviviendo dentro del incendio. Un ancla práctica, casi testaruda, que recuerda que incluso la llama más salvaje aprendió a sujetarse para seguir peleando."
      },
      {
        title: "El bolsito Fenek",
        type: "Ternura",
        text:
          "El bolsito Fenek suaviza su silueta sin quitarle fiereza. Es un pequeño contraste colgando del cinturón: una pista de que bajo la amenaza verbal, el fuego y la espada, Rubí también guarda afectos pequeños que defendería con los dientes."
      },
      {
        title: "Pequeño Sol",
        type: "Vulnerabilidad",
        text:
          "Su fuego más raro no es el que arrasa, sino el que cura. Pequeño Sol nace desde el corazón y puede sanar lo que toca, pero deja a Rubí una semana entera sin aura. Por eso, cuando aparece, no es recurso fácil: es amor convertido en costo."
      },
      {
        title: "No soy delicada",
        type: "Orgullo",
        text:
          "Rubí no quiere ser tratada como algo que debe acomodarse en una vitrina. Quiere ser vista completa: fuerte, deseante, torpe, hermosa, furiosa, protectora y capaz de romper una puerta si la puerta insiste en estar en el camino."
      }
    ],
    bonds: [
      {
        name: "Noctalypse",
        description:
          "Noctalypse mira en Rubí algo más que brutalidad o caos: ve un corazón que grita porque todavía está vivo. Ese vínculo importa porque Rubí necesita ser amada sin ser domesticada, reconocida en su incendio sin que intenten convertirla en ceniza dócil.",
        href: "/personajes/noctalypse"
      },
      {
        name: "Yuki",
        description:
          "Yuki es el hielo que no se deja impresionar por sus llamaradas. Estructura contra impulso, cálculo contra cuerpo, silencio contra fuego verbal. La tensión entre ambas funciona porque ninguna es menos que la otra: son dos formas distintas de sostener el mundo.",
        href: "/personajes/yuki"
      },
      {
        name: "Lyzi",
        description:
          "Lyzi lee el dolor detrás de la rabia de Rubí sin forzarla a confesarlo. Su ternura simbólica puede irritarla y calmarla al mismo tiempo. Rubí se burla de su tono poético, pero confía en ella más de lo que admite.",
        href: "/personajes/lyzi"
      },
      {
        name: "Fulgor",
        description:
          "Fulgor es figura formativa, tutor de fuego y presencia paterna en su historia. En Rubí dejó orgullo, potencia, una relación intensa con la voluntad y esa sensación de que el fuego también puede educar a golpes de calor y cariño torpe.",
        href: "/personajes/fulgor"
      },
      {
        name: "Aelrhyssa",
        description:
          "Aelrhyssa actúa como figura materna e institutriz. Su influencia aparece en los restos de educación, modales enterrados y resistencia de Rubí a parecer demasiado domesticada. Hay disciplina bajo la llama, aunque Rubí reniegue de ella.",
        href: "/personajes/aelrhyssa"
      },
      {
        name: "Cindralith",
        description:
          "Cindralith arde en su manera de moverse: desierto, orgullo territorial, supervivencia, piedra caliente y viento con polvo. Rubí no solo viene de allí; lleva su temperatura en la sangre.",
        href: ""
      }
    ],
    relatedStories: [
      {
        title: "Vulcania Ignis",
        type: "Arma / símbolo",
        description:
          "La espada de Rubí, asociada al fuego, la voluntad y la resurrección simbólica. Su silueta de fénix convierte cada golpe en una declaración: caer no es lo mismo que terminar.",
        href: ""
      },
      {
        title: "Ruby Kick",
        type: "Técnica / escena clave",
        description:
          "La técnica más física y directa de Rubí: una patada ígnea canalizada con brutal precisión emocional. No es elegancia distante; es impacto, rabia protectora y cometa descendente.",
        href: ""
      },
      {
        title: "Pequeño Sol",
        type: "Técnica / momento íntimo",
        description:
          "La llama dorada que nace desde el corazón de Rubí y puede sanar lo que toca. Su costo severo revela que su fuego más poderoso no es el que destruye, sino el que ama lo suficiente para agotarla por completo.",
        href: ""
      },
      {
        title: "Cindralith",
        type: "Región",
        description:
          "El origen ardiente de Rubí: fuego, desierto, supervivencia y orgullo territorial. Un lugar que explica por qué su voluntad parece hecha de piedra caliente y brasa viva.",
        href: ""
      },
      {
        title: "El vínculo con Fulgor",
        type: "Formación",
        description:
          "La relación que ayuda a entender su potencia, su orgullo y la disciplina incompleta que intenta sobrevivir dentro de su incendio.",
        href: ""
      },
      {
        title: "El núcleo con Noctalypse, Yuki y Lyzi",
        type: "Vínculo central",
        description:
          "Rubí pertenece al corazón emocional de Caelyndor: una llama que choca, protege, discute, ama y se queda incluso cuando sería más fácil huir.",
        href: ""
      }
    ],
    archive: {
      fullName: "Rubí Kaelynn Vaer'Solyn",
      commonName: "Rubí",
      apparentAge: "25 años",
      gender: "Femenino",
      race: "Humana",
      originRegion: "Cindralith",
      elementPath: "Fuego",
      professionRole:
        "Guerrera de fuego, protagonista central y fuerza de choque emocional del grupo.",
      masteryLevel:
        "En desarrollo. Rubí posee gran potencia natural, instinto de combate y una conexión emocional muy fuerte con su aura, pero aún no se considera Maestra. Su avance depende de aprender a controlar la intensidad de su fuego sin apagarlo.",
      identitySummary:
        "Rubí es una guerrera de fuego de temperamento intenso, emocionalmente transparente, protectora hasta el exceso y profundamente leal. Su presencia se siente como una llama viva: cálida, peligrosa, hermosa y difícil de ignorar. Es corporal, expresiva, terrenal, combativa y apasionada.",
      designCanon:
        "Rubí lleva el fuego como una presencia física. Su cabello rojo volcánico cae largo, abundante y salvaje, con ondas vivas que parecen moverse incluso antes de que ella ataque. La única trenza lateral funciona como disciplina dentro del incendio: memoria, ancla y pragmatismo aprendido en combate. Su mirada ámbar arde con desafío, ternura escondida o determinación feroz. Viste como una aventurera de Cindralith: chaqueta negra con cuello de pelaje estilo Fenek, top blanco firme con ribetes rojos, pantalón oscuro con cintas rojas en X, cinturones superpuestos, bolsito Fenek y zapatos Mary Jane de cuero marrón oscuro. Vulcania Ignis, su espada con forma conceptual de fénix, aparece cuando la escena exige combate, voluntad o declaración heroica. Todo en ella debe sentirse como fuego vivo, cuerpo presente, corazón protector, rebeldía indomable y disciplina imperfecta.",
      visualNotes:
        "Las restricciones técnicas de canon visual, prompts negativos y advertencias de consistencia quedan reservadas para producción interna, model sheets y prompts de imagen. En la ficha pública, el canon visual debe aparecer como atmósfera narrativa, no como checklist técnico."
    },
    visualCanon: ["Mirada de brasa contenida", "Prendas oscuras con acentos rojos", "Cicatrices tratadas como simbolos narrativos"]  },
  {
    slug: "lyzi",
    name: "Lyzi",
    title: "La voz entre grietas",
    role: "Vinculo, intuicion y transito",
    affinity: "Astral / Eco / Velo",
    accent: "#a77aff",
    image: assetImage("lyzi_canon_portrait_v02.png"),
    description: "Camina donde los mapas fallan y oye lo que las ruinas todavia no se atreven a decir.",
    story:
      "Lyzi nació del corazón espiritual de Sylvalis y está ligada a la memoria antigua del bosque. Fue una de las primeras presencias que recibió a Noctalypse cuando apareció sin nombre ni identidad en tierras antiguas, enseñándole lenguaje, costumbres humanas y contención emocional. Su arco está marcado por el deseo de acompañar, proteger y ser plenamente vista en el mismo plano de aquellos a quienes ama.",
    personality:
      "Lyzi es cálida, poética, intuitiva y profundamente empática. Habla de forma oblicua porque para ella el mundo no se entiende solo nombrándolo, sino escuchando cómo respira alrededor de cada cosa. Puede ser juguetona, ceremonial, mística y traviesa, pero su dulzura no cancela su criterio: sabe mirar el dolor sin despreciarlo y quedarse cerca cuando todo duele.",
    identityPhrase:
      "Una guardiana de Sylvalis hecha de bosque, estrella y recuerdo; cálida como un refugio, antigua como una puerta que aún sabe responder.",
    narrativeSection: {
      title: "Donde el bosque recuerda",
      lead:
        "Lyzantha, llamada Lyzi por quienes pueden acercarse a su ternura, camina entre bosque, sueño y estrella como si cada sendero guardara una voz antigua esperando ser escuchada.",
      paragraphs: [
        "Lyzi es la guardiana espiritual de Sylvalis: una presencia cálida, poética e intuitiva, ligada al corazón vivo del bosque y a las memorias que todavía respiran entre sus raíces. Su belleza no busca imponerse; aparece como una luz violeta entre hojas oscuras, como una sonrisa que entiende antes de preguntar.",
        "En ella, la ternura tiene antigüedad. Lyzi acompaña sin invadir, interpreta sin reducirlo todo a explicación y transforma el dolor en símbolo cuando las palabras directas todavía pesan demasiado. Su manera de cuidar rara vez empuja: se sienta cerca, escucha el temblor del mundo y deja que la verdad llegue como una semilla.",
        "Su existencia vive en el umbral. Parte mujer, parte zorro, parte eco espiritual de Sylvalis, Lyzi pertenece a lo humano y a lo imposible al mismo tiempo. Sus orejas, sus nueve colas estelares, sus ojos violetas y sus marcas glitch no son ornamento: son señales de una presencia que aprendió a habitar portales, vínculos y recuerdos.",
        "Su historia está marcada por una promesa sencilla y enorme: responder cuando alguien la llama. Lyzi no existe para resolverlo todo con magia, sino para recordar que algunas presencias salvan porque permanecen, porque escuchan y porque iluminan el borde del camino cuando los demás creen que ya no hay salida."
      ]
    },
    details: [
      {
        title: "Si tú me llamas",
        type: "Promesa",
        text:
          "Lyzi no entiende el vínculo como posesión, sino como respuesta. Cuando alguien amado la llama de verdad, algo en ella se orienta hacia esa voz. No llega como mandato ni como deber: llega como eco antiguo, faro suave y compañía que decide permanecer."
      },
      {
        title: "Ternura sin invasión",
        type: "Gesto de cariño",
        text:
          "Lyzi acompaña sin ocupar el centro del dolor ajeno. Puede sentarse al lado de una herida durante horas, hablarle con metáforas, ofrecer una fruta, una flor o una sonrisa pequeña, y esperar hasta que el silencio aprenda a respirar."
      },
      {
        title: "El deseo de tocar",
        type: "Anhelo",
        text:
          "Su condición espiritual vuelve algunos gestos más difíciles de lo que parecen. Lyzi puede estar cerca y, aun así, sentir la distancia de los planos. Su deseo de tangibilidad no es simple capricho físico: es anhelo de pertenecer plenamente al mismo mundo de quienes ama."
      },
      {
        title: "Nueve colas de memoria",
        type: "Símbolo",
        text:
          "Sus nueve colas no son adorno ni exceso fantástico. Se mueven como una corona viva de memoria espiritual: a veces refugio, a veces halo oscuro, a veces señal de que Sylvalis está escuchando a través de ella."
      },
      {
        title: "La verdad en semillas",
        type: "Contradicción",
        text:
          "Lyzi percibe mucho más de lo que dice. A veces rodea una verdad con belleza para no herir a quien todavía no puede recibirla de frente. Eso puede volverla enigmática, pero también le permite cuidar sin quebrar."
      },
      {
        title: "Abre Caminos",
        type: "Voluntad",
        text:
          "Su arma actual nació de una fractura. Cazadora de Sueños vio demasiado y se trizó; después, la reparación con Princikalum no la devolvió igual, sino transformada. Ahora la pequeña ramita despierta en manos de Lyzi como Abre Caminos: un arco de madera viva para decidir rutas, no solo contemplarlas."
      },
      {
        title: "Alegría luminosa",
        type: "Secreto pequeño",
        text:
          "Aunque carga memoria antigua, Lyzi todavía se asombra ante gestos nobles y pequeñas alegrías humanas. Una risa sincera, un acto de cuidado torpe o una promesa cumplida pueden iluminarle la mirada como luciérnaga entre árboles oscuros."
      }
    ],
    bonds: [
      {
        name: "Noctalypse",
        description:
          "Noctalypse fue una anomalía sin nombre, y Lyzi fue una presencia que le ofreció lenguaje, cuidado y reconocimiento. Entre ambos existe un vínculo espiritual, profundo y ancestral: ella es faro y memoria; él la mira como alguien real incluso cuando el mundo podría confundirla con un eco.",
        href: "/personajes/noctalypse"
      },
      {
        name: "Rubí",
        description:
          "Lyzi entiende el dolor que vive detrás de la rabia de Rubí. No intenta apagar su fuego: lo rodea con ternura, metáfora y pequeños gestos hasta que la llama recuerda que también puede ser hogar. Rubí se burla de su poesía, pero confía en ella más de lo que admite.",
        href: "/personajes/rubi"
      },
      {
        name: "Yuki",
        description:
          "Yuki busca definición; Lyzi escucha los bordes. Una convierte el caos en estructura, la otra lo traduce en símbolo. Cuando trabajan juntas, la precisión glacial y la sabiduría espiritual pueden abrir caminos que ninguna resolvería sola.",
        href: "/personajes/yuki"
      },
      {
        name: "Sylvalis",
        description:
          "Sylvalis no es solo su origen: es su raíz, su memoria y su forma de respirar el mundo. Lyzi lleva el bosque en la mirada, en las colas, en los silencios y en esa manera de saber cuándo una puerta no quiere fuerza, sino recuerdo.",
        href: ""
      },
      {
        name: "Lüm",
        description:
          "Lüm es eje espiritual, resonancia y raíz simbólica en el lenguaje de Lyzi. Sus cadenas doradas, runas, señales y vínculos no son decoración: sugieren una conexión antigua con aquello que sostiene la memoria viva de Sylvalis.",
        href: ""
      },
      {
        name: "Rollito",
        description:
          "Rollito es una presencia extraña, dócil con Lyzi y peligrosamente discutible con casi todos los demás. En él aparece una parte muy propia de su mundo: ternura, rareza, instinto antiguo y esa calma inquietante de las criaturas que solo obedecen al bosque cuando el bosque habla con su voz.",
        href: ""
      }
    ],
    relatedStories: [
      {
        title: "Abre Caminos",
        type: "Arma / símbolo",
        description:
          "El arma actual de Lyzi: una ramita aparentemente inofensiva que despierta como gran arco de madera viva. Representa el paso desde mirar caminos posibles hacia abrirlos con voluntad propia.",
        href: ""
      },
      {
        title: "Cazadora de Sueños",
        type: "Artefacto antiguo",
        description:
          "El antiguo artefacto de Lyzi, trizado por ver demasiado en el futuro. Su fractura marca una pérdida y una transformación: aquello que fue visión se convirtió en ruta.",
        href: ""
      },
      {
        title: "Sagitta Stellaris",
        type: "Técnica / escena clave",
        description:
          "La flecha estelar de Lyzi: una trayectoria precisa, limpia e inevitable, guiada por intuición perfecta, polvo cósmico y lectura espiritual del camino correcto.",
        href: ""
      },
      {
        title: "Sylvalis",
        type: "Región",
        description:
          "El bosque antiguo que respira en Lyzi: luciérnagas, raíces, memoria viva, caminos espirituales y presencias que escuchan incluso cuando nadie habla.",
        href: ""
      },
      {
        title: "El vínculo con Noctalypse",
        type: "Vínculo ancestral",
        description:
          "Una de las raíces emocionales más profundas de Lyzi: cuidado, lenguaje, reconocimiento y una forma de amor espiritual que no depende del contacto pleno.",
        href: ""
      },
      {
        title: "El corazón espiritual de Sylvalis",
        type: "Origen",
        description:
          "La naturaleza antigua de Lyzi no nace de una biografía común, sino de emoción, símbolo, bosque y vínculo. Su existencia misma es una puerta entre mundos.",
        href: ""
      }
    ],
    archive: {
      fullName: "Lyzantha",
      commonName: "Lyzi",
      apparentAge: "30 años",
      gender: "Femenino",
      race:
        "Semi-humana, mitad humana y mitad zorro; entidad espiritual de Sylvalis con manifestación mayormente humana.",
      originRegion: "Sylvalis",
      elementPath:
        "Por confirmar en la escala elemental oficial. Su afinidad visual y simbólica se expresa mediante energía espiritual, astral, glitch, estelar y vínculos con Lüm.",
      professionRole:
        "Guardiana espiritual de Sylvalis, compañera ancestral, mediadora emocional y presencia mística del grupo protagonista.",
      masteryLevel:
        "En desarrollo dentro de la escala práctica de aura. Lyzi posee antigüedad espiritual, intuición profunda y sensibilidad mágica excepcional, pero su dominio no debe leerse como fuerza física convencional ni maestría de combate absoluta.",
      identitySummary:
        "Lyzi es una presencia antigua, cálida, poética y profundamente intuitiva. Se siente como una mujer adulta de belleza serena, espiritual y ligeramente imposible: una entidad de umbral entre bosque, sueño, estrella y recuerdo. Su delicadeza no implica fragilidad; su ternura posee juicio, memoria y permanencia.",
      designCanon:
        "Lyzi debe sentirse como una mujer antigua y cálida que camina entre bosque, estrella y recuerdo. Su cabello negro puro cae largo, liso y suelto, con dos mechones gruesos que nacen desde la coronilla y enmarcan el rostro como si fueran parte de una puerta. Sus ojos violetas de pupila rasgada miran con una sabiduría serena, emocionalmente legible. Las orejas largas de zorro, negras con reflejos violetas y puntas plateadas, permanecen visibles y expresivas. Sus nueve colas negras con brillos estelares forman una corona viva de memoria espiritual detrás de ella. Viste como una viajera mística de Sylvalis: top negro cruzado con detalles dorados y fractales, mangas anchas con constelaciones doradas, pantalón negro con estampado estelar y glitch violeta, cinturón decorado, hebillas, bolsillos, medias galaxia, zapatillas negras reforzadas y cadenas doradas conectadas a Lüm. Su arma actual es Abre Caminos: una ramita latente que despierta como gran arco de madera viva, espiritual y antiguo. Cazadora de Sueños queda como artefacto anterior, parte de su historia y de su fractura. Todo en ella debe decir espíritu de Sylvalis, mujer adulta, elegancia etérea, nueve colas estelares, portalidad dimensional, ternura antigua y magia cósmica contenida.",
      visualNotes:
        "Las restricciones técnicas de canon visual, prompts negativos y advertencias de consistencia quedan reservadas para producción interna, model sheets y prompts de imagen. En la ficha pública, el canon visual debe aparecer como atmósfera narrativa, no como checklist técnico."
    },
    visualCanon: ["Violetas profundos", "Detalles astrales minimos", "Expresion entre ternura y amenaza"]  },
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
    visualCanon: ["Autoridad militar glacial", "Lealtad sobria y presencia de frontera", "Presencia de muralla en crisis"]  },
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
    story:
      "Alistair fue formado por Aethel Cineris para dividir el mundo entre lo necesario y lo innecesario, entre pureza y corrupción, entre orden y amenaza. Su talento y disciplina lo llevaron al rango de Sexto Preceptor de la Llama Inextinguible. Fue enviado para ejecutar al cuarteto tras la Ruptura del Velo, pero su camino atraviesa derrota, revelación, vergüenza y una dignificación difícil: no la absolución inmediata, sino la posibilidad de elegir otra forma de necesidad.",
    personality:
      "Alistair es hipercompetente, estoico, severo y profundamente contenido. Habla poco porque fue educado para considerar la emoción como fuga de disciplina. No grita para imponerse; cuando se enfurece, habla más despacio. Su tragedia está en que posee conciencia suficiente para sentir la grieta, pero disciplina suficiente para intentar aplastarla.",
    identityPhrase:
      "Una sentencia de ceniza y fuego plateado, entrenada para purificar hasta que la compasión empezó a parecerle más necesaria que la obediencia.",
    narrativeSection: {
      title: "La ley bajo la ceniza",
      lead:
        "Alistair Valerius fue formado para ejecutar sin temblar. Pero incluso la llama más disciplinada puede recordar, demasiado tarde, que no todo lo que arde debe convertirse en sentencia.",
      paragraphs: [
        "Sexto Preceptor de la Llama Inextinguible y máximo ejecutor doctrinal de Aethel Cineris, Alistair camina como si cada gesto hubiera sido corregido por años de ley, ceniza y represión. No necesita levantar la voz para imponer presencia: el aire parece ordenarse a su alrededor antes de que pronuncie una sola palabra.",
        "Su fuego no es una llamarada libre. Es una tormenta plateada entrenada para obedecer, purificar y cortar lo innecesario. Durante años creyó que la compasión era una falla del Velo, que la duda debía ser castigada y que sentir demasiado podía volver inútil a un hombre destinado a sostener el orden.",
        "Pero Alistair no es una espada sin alma. Es una herida que aprendió a obedecer antes de aprender a sanar. Su severidad es real, su peligro también, pero bajo la Gabardina de la Ley permanece una humanidad comprimida: una pausa que dura un segundo más de lo permitido, una mano que aprieta Cinderheart hasta marcarse, una cinta roja conservada por razones que la doctrina no sabría nombrar.",
        "Su arco no consiste en cambiar de bando por una revelación simple. Primero se quiebra. Luego se avergüenza de haberse quebrado. Después intenta llamarlo error. Solo mucho más tarde comprende que aquello que interrumpió el procedimiento no era debilidad: era su humanidad regresando bajo las cenizas."
      ]
    },
    details: [
      {
        title: "Innecesario",
        type: "Frase núcleo",
        text:
          "Al inicio, Alistair usa esa palabra como una hoja. Innecesario es emoción, pausa, piedad, explicación, ternura o duda. Todo lo que no entra en el procedimiento debe ser cortado antes de contaminar la orden."
      },
      {
        title: "Es necesario",
        type: "Evolución",
        text:
          "Al final de su arco, la palabra cambia de dueño. Lo necesario ya no es solo obedecer, ejecutar o purificar. Proteger también puede ser necesario. Reparar también. Desobedecer una ley injusta, cuando la verdad sigue respirando, también."
      },
      {
        title: "El guante derecho",
        type: "Gesto involuntario",
        text:
          "Cuando la conciencia interrumpe la doctrina, Alistair ajusta el guante derecho con precisión casi compulsiva. No es elegancia. Es una frontera intentando cerrarse antes de que alguien vea la grieta."
      },
      {
        title: "La cinta roja",
        type: "Símbolo",
        text:
          "La cinta roja que ata su media coleta viene de una medalla de Aethel Cineris. El metal se lo entregó a su madre como ofrenda filial; la cinta quedó con él. Ese resto mínimo demuestra que incluso en su fase más rígida conservaba una forma de amor que la doctrina no pudo borrar."
      },
      {
        title: "Cinderheart",
        type: "Arma / sentencia",
        text:
          "Corazón de Ceniza no brilla como espada heroica. Es un mandoble austero, pesado, casi mineral, como piedra volcánica fría. Cuando Alistair lo sostiene, no parece presumir fuerza: parece cargar una sentencia."
      },
      {
        title: "La cicatriz de la palma",
        type: "Herida íntima",
        text:
          "La cicatriz fina en su palma derecha no nació de una batalla gloriosa. Nació de apretar Cinderheart durante un momento de duda. Su quiebre moral tuvo cuerpo, presión, dolor y marca."
      },
      {
        title: "Fuego plateado",
        type: "Poder",
        text:
          "Su aura se manifiesta como una tormenta de fuego plateado, casi albino, atravesada por chispas frías y vetas de un rojo pálido que tarda en aceptar. No es fuego salvaje: es una llama obligada a obedecer hasta que empieza a recordar otra función."
      },
      {
        title: "La cinta azul",
        type: "Elección",
        text:
          "Cuando reemplaza la cinta roja manchada por una cinta azul austera, no está cambiando de adorno. Está dejando visible la primera lealtad que no nació de una orden."
      }
    ],
    bonds: [
      {
        name: "Lyzi",
        description:
          "Lyzi es la primera en notar el silencio verdadero de Alistair: no la pausa militar ni el cálculo estratégico, sino ese segundo adicional en que algo lo conmueve y él no sabe todavía cómo sobrevivir a esa conmoción. Ella no lo arregla. Lo ve. Y para Alistair, ser visto sin ser reducido a arma puede ser más desestabilizador que una derrota.",
        href: "/personajes/lyzi"
      },
      {
        name: "Rubí",
        description:
          "Rubí representa una forma de fuego que contradice toda su doctrina. Arde sin pedir permiso, protege desde el cuerpo y se equivoca con vida visible. Alistair puede juzgarla como desorden, pero Rubí detecta la segunda pausa: ese momento exacto en que él ya no ejecuta como antes.",
        href: "/personajes/rubi"
      },
      {
        name: "Yuki",
        description:
          "Yuki encarna estructura, precisión y autoridad sin fanatismo. Frente a ella, Alistair encuentra una forma de orden que no necesita amputar la humanidad para sostenerse. Su choque con Glaciem no es solo estratégico: es doctrinal.",
        href: "/personajes/yuki"
      },
      {
        name: "Noctalypse",
        description:
          "Noctalypse representa aquello que Aethel Cineris le enseñó a temer: anomalía, sombra, vacío y verdad fuera del procedimiento. Pero Noct también expone una pregunta imposible para Alistair: si algo no encaja en la ley, ¿debe destruirse o entenderse?",
        href: "/personajes/noctalypse"
      },
      {
        name: "Aethel Cineris",
        description:
          "Aethel Cineris lo convirtió en símbolo, arma y sentencia. Allí aprendió que obedecer era virtud y que la compasión podía contaminar el orden. Su relación con el reino es raíz, prisión, orgullo y herida al mismo tiempo.",
        href: ""
      },
      {
        name: "El Cinerión",
        description:
          "El Cinerión no lo envía como amenaza ciega, sino como corrección legítima. Para Aethel Cineris, Alistair no es una espada suelta: es procedimiento con rostro humano. Esa confianza institucional pesa tanto como una cadena.",
        href: ""
      },
      {
        name: "Casa Valerius",
        description:
          "Su familia conserva la medalla como reliquia doméstica y lo mira como símbolo nacional antes que como hijo cansado. En esa tensión vive una parte esencial de Alistair: la distancia entre el hombre que vuelve a casa y la leyenda que todos creen entender.",
        href: ""
      },
      {
        name: "Halrik",
        description:
          "Halrik lo enfrenta como quien reconoce a otro hombre de disciplina real. Su choque revela algo importante: Alistair no improvisa rango, acero ni procedimiento. Incluso sus enemigos entienden rápido que no están peleando contra furia, sino contra método.",
        href: "/personajes/halrik"
      }
    ],
    relatedStories: [
      {
        title: "La Llama Inextinguible",
        type: "Libro / arco",
        description:
          "El arco donde Alistair atraviesa cacería, procedimiento, derrota, vergüenza y una dignificación difícil: no absolución inmediata, sino la posibilidad de elegir otra necesidad.",
        href: ""
      },
      {
        title: "La Mesa de las Siete Coronas",
        type: "Escena de presentación",
        description:
          "El momento donde Aethel Cineris lo designa como respuesta a la Ruptura del Velo. No aparece como castigo ejemplar, sino como una sentencia ambulante capaz de distinguir deber y carnicería.",
        href: ""
      },
      {
        title: "Cinderheart / Corazón de Ceniza",
        type: "Arma / símbolo",
        description:
          "El mandoble minimalista de Alistair, forjado como peso moral más que como gloria. Su presencia convierte el combate en procedimiento y la duda en presión física.",
        href: ""
      },
      {
        title: "La cinta roja",
        type: "Símbolo familiar",
        description:
          "El resto de una medalla convertida en vínculo privado. La cinta roja sostiene una memoria que Alistair conserva incluso cuando todo en él intenta reducir la vida a deber.",
        href: ""
      },
      {
        title: "La verdad y el barro",
        type: "Quiebre moral",
        description:
          "El punto donde la doctrina deja de verse limpia. Alistair no se salva de golpe: primero se ensucia, se fractura y descubre que el dolor de la culpa no puede archivarse como procedimiento.",
        href: ""
      },
      {
        title: "La cinta azul",
        type: "Elección posterior",
        description:
          "El reemplazo de la cinta roja por una cinta azul austera. No significa pureza ni absolución: significa una lealtad elegida por voluntad propia.",
        href: ""
      },
      {
        title: "La llama que puede sanar",
        type: "Revelación de poder",
        description:
          "El descubrimiento de que su fuego no solo puede ejecutar o cauterizar, sino también restaurar. Una grieta luminosa en la doctrina de la purificación.",
        href: ""
      },
      {
        title: "El cruce con el cuarteto",
        type: "Conflicto central",
        description:
          "Alistair llega como cazador del cuarteto, pero cada encuentro erosiona la certeza de que la ley pueda entenderlo todo sin escuchar aquello que todavía respira.",
        href: ""
      }
    ],
    archive: {
      fullName: "Alistair Valerius",
      commonName: "Alistair",
      apparentAge: "28-30 años",
      gender: "Masculino",
      race: "Humano",
      originRegion: "Aethel Cineris, el Reino de la Ortodoxia Gris y la Ley Absoluta",
      elementPath: "Fuego / Llama plateada doctrinal",
      professionRole:
        "Antagonista en transición, cazador del cuarteto, ejecutor de la Ley Absoluta y protector futuro del grupo protagonista.",
      masteryLevel:
        "Alto ejecutor doctrinal. Alistair posee dominio avanzado de combate, disciplina militar, aura de fuego plateado y resistencia mental entrenada bajo dogma extremo. Su poder nace de años de obediencia, represión, precisión y desgaste.",
      identitySummary:
        "Alistair Valerius es una figura de belleza peligrosa, melancólica y severa. Debe sentirse como un hombre convertido en arma por una nación que llama virtud a la obediencia y pureza a la amputación emocional. Su presencia combina aristocracia militar, fuego reprimido, cansancio moral y una elegancia que nunca parece cómoda.",
      designCanon:
        "Alistair debe sentirse como un preceptor de guerra que atraviesa una tormenta sin permitir que el rostro la confiese. Es alto, aristocrático, severo y melancólico, con piel pálida, facciones afiladas, mandíbula marcada y una pequeña cicatriz vertical en la ceja izquierda. Sus ojos son plata mercurio, sin pupilas visibles como lectura base; cuando su aura se activa o la emoción lo atraviesa, se tiñen de azul eléctrico profundo. Su cabello es gris ceniza con puntas blanco plateado e iridiscencia sutil, recogido en una media coleta prolija. Un mechón rebelde cae siempre sobre el ojo derecho. Durante su fase doctrinal usa una cinta roja viva, resto de una medalla de Aethel Cineris; más adelante la reemplaza por una cinta azul austera. Viste la Gabardina de la Ley: abrigo militar largo azul medianoche casi negro, bordados de plata sagrada, hilo rojo oscuro como venas de fuego, estola de lobo gris sobre el hombro derecho, broche de oro viejo con emblema de Aethel Cineris, hombreras y brazales de metal negro mate, guantes negros ajustados y botas militares sobrias. Su arma, Cinderheart o Corazón de Ceniza, es un mandoble minimalista de piedra volcánica fría. Todo en él debe decir doctrina, control, herida, elegancia militar, fuego plateado, culpa contenida y humanidad insistiendo bajo las cenizas.",
      visualNotes:
        "Las restricciones técnicas de canon visual, prompts negativos y advertencias de consistencia quedan reservadas para producción interna, model sheets y prompts de imagen. En la ficha pública, el canon visual debe aparecer como atmósfera narrativa, no como checklist técnico."
    },
    visualCanon: ["Disciplina de la llama", "Dogma ceremonial", "Fractura moral bajo control"]  },
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
    visualCanon: ["Verdes apagados", "Texturas organicas", "Presencia alerta sin rigidez"]  },
  {
    slug: "fulgor",
    name: "Fulgor",
    title: "El dragón primordial del fuego",
    role: "Soberano, gourmet y exceso con modales",
    affinity: "Fuego / Etiqueta / Banquete",
    accent: "#f0c75e",
    image: assetImage("fulgor_canon_portrait.png"),
    description: "Dragón primordial del fuego, gourmet y devoto de la etiqueta: capaz de incinerar un campo de batalla y aun así juzgar los modales de la mesa donde se celebró la victoria.",
    visualCanon: ["Escala primordial", "Acentos dorados y braseros", "Elegancia gourmet incluso en el exceso"]  },
  {
    slug: "aelwyn-solrenhal",
    name: "Aelwyn Solrenhal",
    title: "El heredero de la luz cansada",
    role: "Legado, duda y resplandor fracturado",
    affinity: "Solar / Plata / Herencia",
    accent: "#d8c88f",
    image: assetImage("aelwyn_canon_portrait.png"),
    description: "Carga una luz que no siempre salva, pero que insiste en revelar lo que otros prefieren dejar cubierto.",
    visualCanon: ["Marfil y oro viejo", "Simbolos solares sobrios", "Expresion noble sin triunfalismo"]  },
  {
    slug: "temari-calabruna",
    name: "Temari Calabruña",
    title: "La risa bajo la luna torcida",
    role: "Brujeria, juego y amenaza lateral",
    affinity: "Luna / Calabaza / Sortilegio",
    accent: "#d0834f",
    image: assetImage("temariC_canon_portrait.png"),
    description: "Su encanto parece inocente hasta que el mundo recuerda que algunas bromas tambien son maldiciones.",
    visualCanon: ["Naranjas apagados", "Silueta juguetona pero oscura", "Detalles lunares y de brujeria"]  },
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
    visualCanon: ["Grises calidos", "Materialidad pesada", "Rasgos de resistencia contenida"]  },
  {
    slug: "lira-eserine-valendia",
    name: "Lira Eserine Valendia",
    title: "La elegia de la corte velada",
    role: "Nobleza, secreto y deuda heredada",
    affinity: "Cristal / Linaje / Juramento",
    accent: "#c7a7ff",
    image: assetImage("lira_canon_portrait.png"),
    description: "Una figura de salon y sentencia, entrenada para convertir la delicadeza en una forma precisa de poder.",
    visualCanon: ["Elegancia palida", "Detalles de nobleza arcana", "Mirada contenida y ceremonial"]  },
  {
    slug: "aria-ventoleve",
    name: "Aria Ventoleve",
    title: "La nota sobre el abismo",
    role: "Voz, altura y presagio",
    affinity: "Viento / Canto / Presagio",
    accent: "#9ccce8",
    image: assetImage("aria_canon_portrait.png"),
    description: "Su presencia parece ligera hasta que el aire alrededor decide obedecerla.",
    visualCanon: ["Lineas livianas", "Azules aereos", "Gestualidad fina y distante"]  },
  {
    slug: "adagio-ventoleve",
    name: "Adagio Ventoleve",
    title: "El compas de la tormenta",
    role: "Contrapeso, disciplina y cadencia",
    affinity: "Viento / Ritmo / Guardia",
    accent: "#7fb4c8",
    image: assetImage("adagio_canon_portrait.png"),
    description: "Donde otros se precipitan, Adagio mide el pulso exacto antes de dejar caer la respuesta.",
    visualCanon: ["Postura serena", "Acentos frios", "Diseño sobrio con ritmo visual"]  },
  {
    slug: "khaal-zar-omunyek",
    name: "Khaal'Zar Omunyek",
    title: "La garganta del desierto negro",
    role: "Poder extranjero, rito y hambre de dominio",
    affinity: "Arena / Sombra / Rito",
    accent: "#b47a55",
    image: assetImage("kaal_canon_portrait.png"),
    description: "Trae consigo una ley antigua, seca y feroz, como si cada palabra hubiese cruzado un desierto de huesos.",
    visualCanon: ["Tonos arena oscura", "Ornamentos rituales", "Presencia imponente y ceremonial"]  },
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
    visualCanon: ["Luz violeta persistente", "Presagio entre cenizas", "Misterio apenas visible"]  },
  {
    slug: "nayara",
    name: "Nayara",
    title: "REGINA GLACIEI",
    role: "Reina madre de Glaciem y autoridad contenida",
    affinity: "HIELO / CORONA / DEBER",
    accent: "rgba(159, 207, 213, 0.30)",
    image: assetImage("nayara_canon_portrait.png"),
    portraitPosition: "50% 18%",
    portraitScale: 1.08,
    description: "La Regina Glaciei que sostuvo el deber con cálculo sereno hasta ceder el trono a su hija Yuki; madre y reina, con una ternura que rara vez se permite mostrarse.",
    visualCanon: ["Autoridad glacial", "Corona y deber", "Ternura contenida bajo compostura regia"]  },
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
    visualCanon: ["Sabiduría glacial", "Memoria del trono", "Silencio como forma de autoridad"]  },
  {
    slug: "aelrhyssa",
    name: "Aelrhyssa",
    title: "REINA ELFA DE LIRETHAR",
    role: "Reina caída y vigía del Velo",
    affinity: "CORONA / VELO / VIGILIA",
    accent: "rgba(210, 120, 90, 0.30)",
    image: assetImage("aelrhyssa_canon_portrait.png"),
    portraitPosition: "50% 18%",
    portraitScale: 1.08,
    description: "Última reina de Lirethar, el reino élfico destruido antes del incidente del Velo. Su corona sobrevive como vigilia: fue su mirada la primera en advertir lo que empujaba desde el otro lado.",
    visualCanon: ["Realeza élfica antigua", "Corona como memoria, no como adorno", "Vigilia serena frente al Velo"]  },
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
    visualCanon: ["Fuego consumidor", "Amenaza superior", "Hambre y ruptura"]  },
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
    ]  },
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
    ]  },
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
    ]  },
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
    ]  },
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
    ]  }
];

export function getCharacterBySlug(slug: string) {
  return characters.find((character) => character.slug === slug);
}

// Subconjunto público y seguro para la navegación lateral. Mantiene fuera de
// la capa client/RSC los campos internos (p. ej. archive.visualNotes): el pager
// nunca recibe el objeto Character completo.
export type CharacterNavItem = Pick<Character, "slug" | "name" | "title" | "image" | "accent">;

function toCharacterNavItem(character: Character): CharacterNavItem {
  return {
    slug: character.slug,
    name: character.name,
    title: character.title,
    image: character.image,
    accent: character.accent
  };
}

export function getAdjacentCharacters(slug: string): {
  previous?: CharacterNavItem;
  next?: CharacterNavItem;
} {
  const currentIndex = characters.findIndex((character) => character.slug === slug);

  if (currentIndex === -1) {
    return { previous: undefined, next: undefined };
  }

  const previous = currentIndex > 0 ? characters[currentIndex - 1] : undefined;
  const next = currentIndex < characters.length - 1 ? characters[currentIndex + 1] : undefined;

  return {
    previous: previous ? toCharacterNavItem(previous) : undefined,
    next: next ? toCharacterNavItem(next) : undefined
  };
}
