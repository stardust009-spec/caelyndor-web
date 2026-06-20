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

export type CharacterProfileAudio = {
  /** El botón "Escuchar crónica" solo se renderiza cuando enabled === true.
   *  Se deja en false hasta que el MP3 esté subido al repo, para no mostrar
   *  un botón roto ni intentar reproducir un archivo inexistente. */
  enabled: boolean;
  title: string;
  subtitle?: string;
  /** Ruta pública al MP3 (p. ej. /audio/character-summaries/yuki-profile-summary.mp3). */
  src: string;
  /** Portada del audio; si falta, se usa la imagen principal del personaje. */
  cover?: string;
  duration?: string;
  kind?: "character-summary";
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
  /** Audio-resumen narrado del perfil (NotebookLM), subido manualmente. */
  profileAudio?: CharacterProfileAudio;
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
    profileAudio: {
      enabled: false,
      title: "Yuki Arhess — Crónica de personaje",
      subtitle: "Caelyndor",
      src: "/audio/character-summaries/yuki-profile-summary.mp3",
      kind: "character-summary"
    },
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
    profileAudio: {
      enabled: false,
      title: "Noctalypse — Crónica de personaje",
      subtitle: "Caelyndor",
      src: "/audio/character-summaries/noctalypse-profile-summary.mp3",
      kind: "character-summary"
    },
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
    profileAudio: {
      enabled: false,
      title: "Rubí Kaelynn Vaer'Solyn — Crónica de personaje",
      subtitle: "Caelyndor",
      src: "/audio/character-summaries/rubi-profile-summary.mp3",
      kind: "character-summary"
    },
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
        title: "Rubikick",
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
    role: "Vínculo, intuición y tránsito",
    affinity: "Astral / Eco / Velo",
    accent: "#a77aff",
    image: assetImage("lyzi_canon_portrait_v02.png"),
    profileAudio: {
      enabled: false,
      title: "Lyzi — Crónica de personaje",
      subtitle: "Caelyndor",
      src: "/audio/character-summaries/lyzi-profile-summary.mp3",
      kind: "character-summary"
    },
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
    title: "CANCILLER DE GLACIEM",
    role: "Estrategia, frontera y deber",
    affinity: "HIELO / LEALTAD / MURALLA",
    accent: "rgba(130, 170, 190, 0.30)",
    image: assetImage("halrik_canon_portrait.png"),
    profileAudio: {
      enabled: false,
      title: "Halrik de Hyldran — Crónica de personaje",
      subtitle: "Caelyndor",
      src: "/audio/character-summaries/halrik-profile-summary.mp3",
      kind: "character-summary"
    },
    portraitPosition: "50% 18%",
    portraitScale: 1.08,
    description: "Ancla militar de Glaciem, preciso en la crisis y leal hasta el peso silencioso de las órdenes imposibles.",
    story:
      "Halrik de Hyldran fue reconocido desde niño por una acción de lealtad nacida antes de todo juramento. Al entregar una verdad necesaria cuando el miedo habría justificado el silencio, recibió el título Leal sin Juramento. Con el tiempo ingresó al servicio de Glaciem como soldado. Su disciplina, temple y capacidad de permanecer bajo presión lo llevaron a ascender hasta convertirse en Capitán de la Guardia Real. Durante las grandes crisis de Glaciem, su frase “La Reina todavía está aquí. Glaciem todavía respira.” se convirtió en lema nacional. En su etapa actual ejerce como Canciller de Glaciem: ya no protege solo con espada o guardia, sino con documentos, decisiones, estructura, memoria institucional y presencia política.",
    personality:
      "Halrik es disciplinado, leal, contenido y profundamente responsable. Su autoridad nace de la confianza acumulada, no del volumen. Tiene una relación casi sagrada con el deber, pero no es un fanático vacío: sabe distinguir entre obedecer y sostener lo correcto. Cerca de Yuki aparece una faceta distinta, hecha de paciencia seca, dignidad herida, obediencia impecable y resignación afectuosa.",
    identityPhrase:
      "El hombre que permaneció antes de jurar: soldado, guardia, canciller y respiración institucional de Glaciem cuando la corona tiembla.",
    narrativeSection: {
      title: "Leal antes del juramento",
      lead:
        "Halrik de Hyldran no necesitó una ceremonia para entender el deber. Su lealtad nació antes del cargo, antes de la espada y antes de que Glaciem supiera cómo nombrarla.",
      paragraphs: [
        "Halrik es una de las figuras más sobrias y necesarias de Glaciem: soldado primero, Capitán de la Guardia Real después, Canciller en su etapa actual. Su vida no cambió de esencia al cambiar de cargo; solo amplió la escala de aquello que debía sostener.",
        "Su título, Leal sin Juramento, no es un adorno ceremonial. Nació de una decisión temprana: actuar correctamente cuando nadie podía exigirle hacerlo. Desde entonces, Halrik carga una forma de deber que no depende de salario, rango ni mandato. Él reconoce dónde está la línea y permanece.",
        "Como capitán, protegió desde la espada, la formación y la guardia. Como canciller, protege desde documentos, decretos, estructura política, memoria institucional y presencia. No es un burócrata que olvidó el combate, ni un guerrero incapaz de gobernar: es la continuidad de Glaciem aprendiendo distintos lenguajes.",
        "Su frase más recordada, “La Reina todavía está aquí. Glaciem todavía respira.”, resume su función simbólica dentro del reino. Halrik no busca protagonismo ni gloria; su fuerza está en sostener la puerta cuando todos los demás necesitan respirar."
      ]
    },
    details: [
      {
        title: "Leal sin Juramento",
        type: "Título núcleo",
        text:
          "El título de Halrik nació antes de todo cargo formal. No fue fiel porque una ley lo obligara, sino porque entendió dónde estaba el deber y decidió responder. Esa lealtad temprana se convirtió en el centro moral de toda su vida."
      },
      {
        title: "La Reina todavía está aquí",
        type: "Frase nacional",
        text:
          "“La Reina todavía está aquí. Glaciem todavía respira.” no es una frase épica vacía. Es una declaración política, emocional y militar: mientras Yuki viva y Glaciem conserve voluntad, el reino no ha terminado."
      },
      {
        title: "La Medalla de Hyldran",
        type: "Símbolo",
        text:
          "La medalla no funciona como trofeo. Representa el momento en que Glaciem nombró una virtud que Halrik ya había demostrado antes de comprender por completo su peso. En su versión adulta, no la presume: la carga."
      },
      {
        title: "Ternura rígida",
        type: "Gesto de cariño",
        text:
          "Halrik no suele expresar afecto con facilidad. Su ternura aparece como una puerta sostenida, una orden bien dada, una ruta segura, una manta colocada sin comentario o una corrección respetuosa antes de que alguien se rompa."
      },
      {
        title: "Paciencia con Yuki",
        type: "Vínculo",
        text:
          "Yuki puede molestarlo, amenazarlo administrativamente o ponerlo frente a situaciones absurdas porque sabe que Halrik no se rompe con facilidad. Él responde con dignidad herida, obediencia impecable y una resignación afectuosa que solo aumenta la confianza entre ambos."
      },
      {
        title: "Protocolo con alma",
        type: "Virtud",
        text:
          "Para Halrik, el protocolo no existe para decorar el poder, sino para impedir que el miedo gobierne. La administración, en sus manos, no es frialdad: es una forma de proteger el reino cuando la espada ya no basta."
      },
      {
        title: "El peso de permanecer",
        type: "Herida",
        text:
          "Halrik tiende a cargar demasiado en silencio. Descanso, comodidad o deseo personal suelen quedar detrás del deber. Su fortaleza no consiste en no cansarse, sino en seguir de pie cuando el cansancio ya encontró nombre."
      },
      {
        title: "Horror institucional contenido",
        type: "Humor seco",
        text:
          "Ante desastres provocados por Yuki, Rubí o cualquier protocolo absurdo, Halrik puede parecer al borde de redactar su propia destitución preventiva. No pierde la compostura; solo la sostiene con ambas manos."
      }
    ],
    bonds: [
      {
        name: "Yuki",
        description:
          "Yuki es el centro más complejo de la vida de Halrik: reina, responsabilidad, amiga antigua, persona vulnerable y símbolo de Glaciem. Él puede contradecirla con respeto, corregirla y sufrir por sus decisiones, pero jamás traicionarla ni tratarla como incapaz. Bajo las bromas existe una confianza de hierro.",
        href: "/personajes/yuki"
      },
      {
        name: "Glaciem",
        description:
          "Halrik no sirve solo a una persona. Sirve a la continuidad de Glaciem. El reino es responsabilidad viva: ciudadanos, memoria, instituciones, murallas, decretos y la voluntad de seguir respirando incluso cuando la corona tiembla.",
        href: ""
      },
      {
        name: "Nayara",
        description:
          "Nayara está vinculada al origen simbólico de Halrik como Leal sin Juramento. Su reconocimiento marca la entrada de Halrik en la memoria moral de Glaciem: el momento en que una virtud temprana recibió nombre.",
        href: "/personajes/nayara"
      },
      {
        name: "Valthor",
        description:
          "Valthor funciona como figura de autoridad antigua y testigo de las primeras dinámicas entre Yuki y Halrik. En su mirada puede leerse el crecimiento de ambos: la reina que aprende a sostener y el hombre que aprende a permanecer.",
        href: "/personajes/valthor"
      },
      {
        name: "Rubí",
        description:
          "Rubí representa el tipo de caos emocional y físico que pone a prueba la paciencia institucional de Halrik. Puede provocarle alarma administrativa, resignación o respeto incómodo, pero también le recuerda que no todo lo importante cabe en un protocolo.",
        href: "/personajes/rubi"
      },
      {
        name: "Noctalypse",
        description:
          "Noctalypse activa en Halrik una vigilancia protectora, especialmente por su vínculo con Yuki y el grupo. Halrik no lo reduce a amenaza, pero tampoco deja de medir los riesgos que una sombra tan profunda puede traer a la estabilidad de Glaciem.",
        href: "/personajes/noctalypse"
      },
      {
        name: "Lyzi",
        description:
          "Lyzi puede leer con facilidad el cansancio emocional de Halrik. Su calidez contrasta con la rigidez de él y puede revelar que bajo el canciller todavía existe el niño que sostuvo una medalla demasiado grande.",
        href: "/personajes/lyzi"
      },
      {
        name: "La Guardia Real de Glaciem",
        description:
          "Antes de ser Canciller, Halrik fue Capitán de la Guardia Real. Esa etapa no desaparece bajo el uniforme político: sigue en su postura, en su lectura de crisis y en su forma de proteger primero la línea antes que el orgullo.",
        href: ""
      }
    ],
    relatedStories: [
      {
        title: "Leal sin Juramento",
        type: "Origen / título",
        description:
          "El momento que define a Halrik desde niño: una acción de lealtad nacida antes de cualquier juramento formal. Allí comienza el peso moral que lo acompañará toda la vida.",
        href: ""
      },
      {
        title: "Soldado de Glaciem",
        type: "Etapa",
        description:
          "La primera escala de su deber adulto. Halrik aprende a obedecer, resistir y servir desde la disciplina cotidiana, antes de convertirse en símbolo.",
        href: ""
      },
      {
        title: "Capitán de la Guardia Real",
        type: "Etapa",
        description:
          "La etapa donde Halrik protege a Yuki y al reino desde la espada, el mando defensivo y la presencia militar. Aquí su lealtad deja de ser promesa privada y se vuelve línea de defensa.",
        href: ""
      },
      {
        title: "Canciller de Glaciem",
        type: "Etapa actual",
        description:
          "La forma más amplia de su deber: ya no solo resiste con guardias y acero, sino con estructura política, decisiones, documentos, continuidad institucional y memoria de Estado.",
        href: ""
      },
      {
        title: "La Reina todavía está aquí",
        type: "Lema nacional",
        description:
          "La frase que convierte a Halrik en símbolo de continuidad. Mientras la reina siga viva y alguien recuerde cómo permanecer, Glaciem todavía respira.",
        href: ""
      },
      {
        title: "La Medalla de Hyldran",
        type: "Símbolo",
        description:
          "El emblema íntimo de su título. No representa vanidad ni trofeo, sino el peso de haber sido nombrado por una virtud que nació antes de la obligación.",
        href: ""
      },
      {
        title: "El vínculo con Yuki",
        type: "Relación central",
        description:
          "Una confianza de hierro entre reina y canciller: respeto, corrección, bromas peligrosamente administrativas, dignidad herida y la certeza de que ambos seguirán ahí.",
        href: ""
      },
      {
        title: "Glaciem todavía respira",
        type: "Continuidad institucional",
        description:
          "La dimensión política y emocional de Halrik: un hombre que aprendió a sostener el reino incluso cuando la corona, los muros o el ánimo de su gente tiemblan.",
        href: ""
      }
    ],
    archive: {
      fullName: "Halrik de Hyldran",
      commonName: "Halrik",
      apparentAge: "Adulto maduro en su etapa actual como Canciller de Glaciem",
      gender: "Masculino",
      race: "Humano",
      originRegion: "Glaciem",
      elementPath: "No definido como senda elemental principal",
      professionRole:
        "Canciller de Glaciem, ex Capitán de la Guardia Real, antiguo soldado y símbolo nacional de deber, continuidad institucional y lealtad sin obligación formal.",
      masteryLevel:
        "Competencia alta en mando defensivo, lectura de crisis, protocolo institucional y resistencia bajo presión. Su grandeza nace de la permanencia, no del espectáculo mágico.",
      identitySummary:
        "Halrik de Hyldran es la encarnación del deber puro en Glaciem. Su historia no nace de la nobleza heredada ni de un juramento ceremonial, sino de una decisión temprana: actuar correctamente cuando nadie podía exigirle hacerlo. Su evolución de soldado a Capitán de la Guardia Real y luego a Canciller amplía la escala de su lealtad sin cambiar su esencia.",
      designCanon:
        "Halrik debe sentirse como un hombre de autoridad invernal, nobleza sobria y disciplina acumulada. En su etapa actual como Canciller de Glaciem, se presenta como adulto maduro, alto, firme, ancho de hombros y de presencia semejante a una muralla humana. Su rostro es fuerte y refinado, con mandíbula marcada, cejas densas, ojos azul grisáceo y una expresión seria donde puede abrirse una microfisura de cansancio o afecto contenido. Su cabello es oscuro, entre castaño muy oscuro y negro, con canas visibles, peinado hacia atrás o hacia un lado con sobriedad. La barba completa y cuidada, también marcada por canas, es parte esencial de su canon adulto. Viste uniforme noble-militar de alto rango en azul profundo, plata y gris hielo: abrigo estructurado de cuello alto, piel gris clara o blanca en hombros o cuello, bordados plateados con motivos de hielo, castillo, copos de nieve o líneas geométricas de Glaciem, insignia de la corona y ecos de la Medalla de Hyldran. No debe parecer rey, villano frío ni burócrata cobarde. Todo en él debe decir deber, permanencia, autoridad institucional, protección sin teatralidad y lealtad antes del juramento.",
      visualNotes:
        "Las restricciones técnicas de canon visual, prompts negativos y advertencias de consistencia quedan reservadas para producción interna, model sheets y prompts de imagen. En la ficha pública, el canon visual debe aparecer como atmósfera narrativa, no como checklist técnico."
    },
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
    title: "El Dragón Primordial del Fuego",
    role: "Dragón Primordial del Fuego; maestro de aura, forjador y anfitrión ceremonial",
    affinity: "Fuego / Forja / Memoria",
    accent: "#f0c75e",
    faction: "Dragones Soberanos",
    image: assetImage("fulgor_canon_portrait.png"),
    description: "Dragón primordial del fuego, gourmet y devoto de la etiqueta: capaz de incinerar un campo de batalla y aun así juzgar los modales de la mesa donde se celebró la victoria.",
    story:
      "Fulgor pertenece a una edad en que los dragones todavía creían poder medir el mundo desde la altura. Vivió guerras, pactos, pérdidas y sellados que los reinos humanos apenas conservan como supersticiones o notas marginales. Con el tiempo no se encerró en el desprecio hacia los mortales: aprendió de ellos, probó sus vinos, observó sus heridas y reconoció su extraña capacidad de fundar vida junto a cicatrices imposibles. En la era actual, su vínculo central es Rubí, portadora de su anillo y Flor Carmesí. También actúa como puente entre el grupo protagonista y la escala antigua del mundo, capaz de pasar del confeti a la memoria de Voltrak sin perder verdad en ninguna de las dos escenas.",
    personality:
      "Orgulloso, cálido, teatral, refinado y profundamente antiguo. Fulgor ama la hospitalidad, el vino, la cocina, la etiqueta, las entradas memorables y las escenas bien preparadas. Su humor puede ser absurdo, pero nunca vacío. Su solemnidad puede ser inmensa, pero nunca rígida. Sabe observar grietas emocionales con precisión y actuar sin pedir reconocimiento. Cuando baja la voz, incluso sus bromas previas quedan atravesadas por una memoria de fuego antiguo.",
    identityPhrase:
      "El Dragón Primordial del Fuego: maestro de la Flor Carmesí, forjador legendario y memoria viva de una llama que aprendió a cocinar, guiar, celebrar, proteger y recordar.",
    narrativeSection: {
      title: "El fuego que aprendió a tener forma",
      lead:
        "Fulgor no es un dragón que guarda montañas de oro esperando que la historia venga a desafiarlo. Es una presencia antigua que aprendió que el fuego no solo destruye: también cocina, guía, ilumina, celebra, forja, consuela y recuerda.",
      paragraphs: [
        "Como Dragón Primordial del Fuego, su escala pertenece al mito. Como maestro de Rubí, su calor se vuelve disciplina. Fulgor no busca apagar la intensidad de la Flor Carmesí ni volverla dócil: le enseña que una llama sin forma solo hace humo, y que arder con intención puede ser más poderoso que incendiarlo todo.",
        "Su teatralidad es parte de su lenguaje. Una entrada con fanfarrias, un carruaje tirado por quimeras, una copa volcánica, un maletín de confeti o una reverencia impecable no son adornos vacíos: son formas de ordenar el mundo, declarar presencia y recordar que incluso el caos merece ceremonia.",
        "Fulgor también conserva memorias que los reinos humanos transformaron en cuentos, advertencias o mapas incompletos. La caída de Voltrak, la guerra contra Korvess, la Gran Falla, Neruvain y Uru-Uru no son para él simples nombres antiguos: son heridas de escala continental, verdades que exigen hablar con precisión y respeto.",
        "Con los mortales, Fulgor ha aprendido algo que los dragones no siempre admiten: la vida puede fundar hogar incluso al borde de una cicatriz. Por eso su fuego no es solo soberanía. También es hospitalidad, vino, cocina, amistad, escena preparada y cuidado silencioso."
      ]
    },
    details: [
      {
        title: "La llama que enseña",
        type: "Maestro de aura",
        text:
          "Fulgor no enseña a Rubí a tener más fuego, sino a tener relación con su fuego. No quiere domesticarla ni apagarla: quiere que su incendio encuentre dirección. Para él, la llama sin forma es desperdicio; la llama con intención puede volverse arte, defensa, danza y voluntad."
      },
      {
        title: "El protocolo del confeti",
        type: "Teatralidad dracónica",
        text:
          "Fulgor entiende la presencia como lenguaje. Una llegada sin ceremonia es, para él, una oportunidad desperdiciada. Fanfarrias, carruajes de quimeras, confeti, reverencias y hospitalidad impecable son parte de su modo de ordenar el mundo y recordarle a todos que la escala también se anuncia."
      },
      {
        title: "Dragon’s Kitchen",
        type: "Gourmet de Maghnarok",
        text:
          "Su cocina no es doméstica: es prueba ritual, juicio de carácter y espectáculo dracónico. En Dragon’s Kitchen puede aparecer en forma humana impecable, con lentes y solemnidad de presentador, transmitiendo desde un cráter vivo ante dragones de distintas eras. Para Fulgor, cocinar también es una forma de forjar."
      },
      {
        title: "El espejo de lava",
        type: "Guarida volcánica",
        text:
          "En su caverna de Cindralith, Fulgor puede observar el mundo mediante un espejo de lava que refleja imagen y transporta sonido. Su guarida mezcla obsidiana, vetas de magma, barras pulidas, sillones de basalto, copas volcánicas, diablillos de fuego, especias, vino y herramientas de forja."
      },
      {
        title: "Memoria de Voltrak",
        type: "Herida dracónica",
        text:
          "Fulgor recuerda que Voltrak no cayó en un duelo aislado, sino dentro de una guerra larga contra Korvess. Esa memoria reduce su fuego social a una llama más íntima y grave. Para él, no todo lo sellado fue derrotado; algunas victorias antiguas solo fueron formas costosas de contener lo insoportable."
      },
      {
        title: "Mito y mecanismo",
        type: "Sabiduría antigua",
        text:
          "Fulgor no niega la ciencia: la completa. Para él, la ciencia ordena el mecanismo, pero el mito ordena el temblor que ese mecanismo deja en el alma. Por eso puede hablar de tectónica, archipiélagos y Bestias Primigenias sin reducir ninguna lectura a mentira simple."
      },
      {
        title: "El padrino de las llamas difíciles",
        type: "Mediador emocional",
        text:
          "Cuando Rubí y Noctalypse se apagan por separado, Fulgor no les impone una confesión. Prepara el escenario: carruaje, entradas, vestido, humor, Luzabrasa y una retirada oportuna. Su cuidado no siempre parece cuidado; a veces parece una trampa elegante para que el amor encuentre voz."
      },
      {
        title: "Bestias Primigenias",
        type: "Escala anterior a los mapas",
        text:
          "Fulgor conoce nombres que los reinos apenas sostienen como cuentos o advertencias: Uru-Uru bajo Glaciem, Korvess bajo la Gran Falla, Neruvain como posible heraldo abismal y Rhazeth como presencia que no debe despertarse. Para él, algunas entidades no cruzan territorios: los territorios existen sobre su paciencia."
      }
    ],
    bonds: [
      {
        name: "Rubí Kaelynn Vaer'Solyn",
        description:
          "Rubí es su Flor Carmesí, portadora de su anillo, discípula, campeona y llama favorita. Fulgor no busca apagar su intensidad, sino darle forma. La conoce tan bien que sabe cuándo su silencio es más alarmante que sus gritos.",
        href: "/personajes/rubi"
      },
      {
        name: "Noctalypse",
        description:
          "Fulgor reconoce a Noctalypse como digno amigo. Ese reconocimiento importa porque no validaría con facilidad a cualquier figura sombría cercana a Rubí. En los momentos difíciles actúa como padrino elegante, protegiendo el orgullo de Noct mientras lo conduce hacia la escena que necesita vivir.",
        href: "/personajes/noctalypse"
      },
      {
        name: "Lyzi",
        description:
          "Con Lyzi comparte una comprensión silenciosa de los vínculos. Ambos saben que algunas heridas no se arreglan con órdenes, sino preparando el lugar adecuado para que el corazón se atreva a hablar.",
        href: "/personajes/lyzi"
      },
      {
        name: "Yuki Arhess",
        description:
          "Yuki exige precisión, datos y estructura; Fulgor le recuerda que algunos hechos también necesitan mito para ser soportados. Su dinámica mezcla respeto, fricción entre hielo y fuego, y una tensión deliciosa entre practicidad glacial y ceremonia dracónica.",
        href: "/personajes/yuki"
      },
      {
        name: "Selyra de los Siete Cielos",
        description:
          "Selyra mantiene con Fulgor una dinámica antigua, coqueta y confiada. Ella acude a él cuando siente vergüenza de presentarse ante una humana digna de su aliento. Fulgor la provoca, la escucha y termina ayudándola."
      },
      {
        name: "Glasyra",
        description:
          "Glasyra observa desde el hielo. Con Fulgor no necesita hablar para influir. Cuando fuego y viento se mueven, el hielo registra el cambio."
      },
      {
        name: "Voltrak",
        description:
          "Voltrak es una herida en la memoria dracónica de Fulgor: una cumbre de trueno caída no en duelo noble, sino en una guerra larga contra Korvess."
      },
      {
        name: "Korvess",
        description:
          "Korvess no fue solo un enemigo antiguo. Fue una soberanía viva de Oscuridad que los dragones apenas lograron sellar. Fulgor sabe que confundir sellado con victoria es una forma peligrosa de arrogancia."
      }
    ],
    relatedStories: [
      {
        title: "La Flor Carmesí y el maestro de la llama",
        type: "Vínculo / Entrenamiento",
        description:
          "Fulgor guía a Rubí para que su fuego deje de ser solo explosión y aprenda a convertirse en forma, disciplina y danza. Su enseñanza no busca apagarla, sino darle dirección sin traicionar su naturaleza."
      },
      {
        title: "Dragon’s Kitchen de Maghnarok",
        type: "Comedia ceremonial / Cocina dracónica",
        description:
          "En el cráter vivo de Maghnarok, Fulgor convierte la cocina en transmisión dracónica, juicio de carácter y espectáculo de escala continental. Incluso el sabor puede volverse una prueba de fuego."
      },
      {
        title: "El Teatro del Orgullo",
        type: "Mediación emocional",
        description:
          "Al ver que Rubí y Noctalypse se apagan por separado, Fulgor coordina con Lyzi un encuentro en Luzabrasa. Carruaje, vestido, humor, vino y retirada oportuna: todo para que el orgullo ceda sin romperse."
      },
      {
        title: "Uru-Uru bajo Glaciem",
        type: "Lore primigenio",
        description:
          "Cuando Yuki detecta pulsaciones imposibles bajo los mares de Glaciem, convoca a Fulgor. El dragón revela que algunas presencias no están dormidas ni despiertas como los mortales entienden, sino presentes en una escala anterior a los mapas."
      },
      {
        title: "La caída de Voltrak",
        type: "Memoria dracónica",
        description:
          "Fulgor recuerda que Voltrak no murió en un duelo aislado, sino como punto de ruptura de una guerra larga contra Korvess. La Gran Falla quedó como cicatriz continental de aquel sellado incompleto."
      },
      {
        title: "La Brisa, el Fuego y la Sombra del Hielo",
        type: "Preludio elemental",
        description:
          "Selyra visita a Fulgor en Cindralith para confesar que ha encontrado a una humana digna de su aliento. Entre espejos de lava, zumaque, panes tostados y viejas coqueterías dracónicas, el fuego decide que también ha llegado su turno de presentarse ante Rubí."
      }
    ],
    archive: {
      fullName: "Fulgor",
      commonName: "Fulgor",
      apparentAge: "Ancestral / milenario",
      gender: "Masculino",
      race: "Dragón Primordial / Dragón Soberano del Fuego",
      originRegion: "Cindralith / Maghnarok",
      elementPath: "Fuego primordial",
      professionRole:
        "Maestro de aura ígnea, forjador legendario, gourmet dracónico, anfitrión ceremonial, memoria viviente de guerras antiguas, mediador emocional y Dragón Primordial del Fuego.",
      masteryLevel:
        "Soberano / Primordial. Su poder no se mide solo en destrucción, sino en antigüedad, dominio, criterio, memoria y capacidad de dar forma al fuego.",
      identitySummary:
        "Fulgor es el Dragón Primordial del Fuego: una presencia antigua que aprendió que la llama no solo arrasa, también cocina, guía, ilumina, celebra, forja, protege y recuerda. Con Rubí actúa como maestro y padrino; con los reinos, como memoria viva de verdades que el tiempo volvió mito; con sus invitados, como anfitrión convencido de que la ceremonia es una defensa contra el colapso general del gusto.",
      designCanon:
        "Fulgor debe verse principalmente como un dragón antiguo y majestuoso, no como un dragón rojo genérico. Su forma dracónica tiene escamas de oro antiguo, bronce, rojo magma y placas de obsidiana; ojos dorados con pupilas hendidas; brasas internas visibles; pecho como horno de forja; alas enormes y funcionales; garras nobles y peligrosas; presencia de montaña volcánica con modales aristocráticos. Su forma humana es secundaria: un adulto maduro, elegante, impecable, con ojos dorados o ámbar, ropa oscura refinada, capa o abrigo con detalles dorados y rojos, guantes, broche de llama, bastón ceremonial y, cuando corresponde, lentes de presentador o chef de Dragon’s Kitchen."
    },
    visualCanon: ["Escala primordial", "Acentos dorados y braseros", "Elegancia gourmet incluso en el exceso"]
  },
  {
    slug: "aelwyn-solrenhal",
    name: "Aelwyn Solrenhal",
    title: "La Última Lumenari",
    role: "Legado, duda y resplandor fracturado",
    affinity: "Solar / Plata / Herencia",
    accent: "#d8c88f",
    image: assetImage("aelwyn_canon_portrait.png"),
    description: "Carga una luz que no siempre salva, pero que insiste en revelar lo que otros prefieren dejar cubierto.",
    story:
      "Aelwyn nació en Artanis, hija de Ser Davoren Solrenhal, caballero desaparecido en la Cruzada del Abismo, y de Elyria, última lumenari conocida, fallecida al sellar una fisura solar. La ausencia paterna, la muerte materna y la rigidez de Artanis forjaron en ella una fe incómoda, sostenida en votos porque casi no quedaba nadie que la sostuviera. Tras enterarse de que su hermana de armas Tysha cayó en una escaramuza ligada a Glaciem, Aelwyn partió con su corcel Eclissio, llevando el broche de su madre, la tablilla de su voto y una carta de Tysha que reveló que su hermana la había protegido por amor, no por deber. Entró a Glaciem con bandera blanca —no como rendición, sino como promesa de no cruzar la espada— y allí descubrió, contra todo lo que le habían enseñado, un reino de estructura, permanencia y hogar. Cuando Mythra atacó una aldea de semihumanos, Aelwyn defendió a los inocentes sin pedir permiso, y ese camino terminó conduciéndola hacia Khaal'Zar Omunyek, que convirtió su dolor en trampa y la reclamó como propiedad dentro de su colección de gladiadores.",
    personality:
      "Aelwyn es noble, determinada y profundamente devota, pero no ciega. Su fe es una disciplina corporal, no una postura de templo. Tiene una cortesía natural que no la vuelve dócil: puede desmontar ante un enemigo con respeto y minutos después lanzarse contra una carnicería sin esperar autorización de ningún reino. No le interesa verse heroica, le interesa impedir que el horror continúe. Su dolor es silencioso y contenido, pero esa contención no es frialdad: siente intensamente y su educación le enseñó a convertir el temblor en postura. Su gran tensión es entre el deber impuesto y la libertad moral.",
    identityPhrase:
      "La Espina Dorada, paladín sin estandarte: una herida luminosa que eligió seguir protegiendo, y que arde no para lucirse, sino porque si no arde, alguien queda solo.",
    narrativeSection: {
      title: "La fe que sigue ardiendo después de perder su altar",
      lead:
        "Aelwyn Solrenhal no es una espada santa. Es una mujer que todavía ama el mundo incluso cuando el mundo insiste en arrebatárselo. Su luz no es ingenua: ha visto cuerpos en la nieve, cartas abiertas demasiado tarde y promesas que no alcanzaron a salvar a nadie.",
      paragraphs: [
        "Aelwyn fue criada en Artanis, tierra de templos blancos y disciplina sagrada, donde la compasión no se entiende como blandura sino como deber encarnado. Hija de un caballero desaparecido y de la última lumenari conocida, creció sosteniéndose en votos porque casi no quedaba nadie que la sostuviera a ella. Su fe nunca fue cómoda: es una disciplina corporal, un modo de caminar, un modo de sostener la espada incluso cuando la espada no brilla.",
        "Su arco no trata solo de cumplir una profecía ni de vengar a quienes perdió. Trata de una mujer que descubre que el voto verdadero no está en obedecer una orden sagrada, sino en decidir qué clase de luz quiere ser cuando ya no queda institución, familia ni certeza que la sostenga. No es fanática: fue entrenada para creer, pero conserva la capacidad de juzgar. Su alma solo responde ante aquello que reconoce como justo.",
        "Su dolor es silencioso. No se rompe de forma teatral: ante una noticia devastadora ordena sus cosas, dobla una capa, camina hacia un santuario y toca el broche de su madre mientras el mundo se vuelve un poco más solo a su alrededor. Esa contención no es frialdad. Aelwyn siente intensamente, pero su educación le enseñó a convertir el temblor en postura.",
        "Su tragedia no nace de odiar demasiado, sino de amar con una pureza que el mundo no sabe cómo recibir sin ensuciarla. Puede confundir su propia felicidad con una traición al voto o a los muertos. Y su gran pregunta arde bajo la armadura: qué queda de una paladín cuando su espada no brilla, su Orden no alcanza y su corazón quiere algo que no cabe dentro del voto."
      ]
    },
    details: [
      {
        title: "La Espina Dorada",
        type: "Título núcleo",
        text:
          "Paladín sin estandarte, portadora del Voto Ígneo. Aelwyn no arde para lucirse: arde porque si no lo hace, alguien queda solo. Su autoridad no nace del rango, sino de una coherencia moral que puede despertar conciencia, calma o temor según la oscuridad de quien la enfrenta."
      },
      {
        title: "El voto como herida elegida",
        type: "Filosofía",
        text:
          "Para Aelwyn, su voto no es una medalla que porta, sino una cicatriz activa que mantiene abierta a propósito: cerrarla significaría olvidar a quienes la formaron, la amaron o murieron antes de tiempo. No es martirio vacío, es memoria convertida en conducta. Su arco pregunta si una herida elegida sigue siendo libertad o puede volverse una prisión dorada."
      },
      {
        title: "Juramento Lúcido",
        type: "Arma relicaria",
        text:
          "Su espada no responde a la fuerza física, sino a la pureza emocional de quien la empuña. Brilla solo cuando Aelwyn combate con intención pura: no inocencia perfecta, sino alineación entre acto, voto y verdad interior. Si pelea movida por odio o deseo de castigo, la hoja se apaga, y entonces debe combatir con técnica y cuerpo, no con milagro."
      },
      {
        title: "Eclissio",
        type: "Vínculo místico",
        text:
          "Un corcel solar-espectral de presencia antigua que la eligió por voluntad, no por orden. No la sirve: la acompaña, la corrige, la protege y a veces se burla de ella con una quietud casi piadosa. Reconoce voluntad, no jerarquía, y puede negarse a moverse si percibe que una orden nace de la tensión y no de la claridad."
      },
      {
        title: "Discernimiento de plegaria",
        type: "Don solar",
        text:
          "Aelwyn percibe la intención real detrás de una súplica: la honestidad, el doblez, la manipulación espiritual. No lee la mente ni conoce todos los hechos, solo el peso interno de quien habla. Su sola presencia parece obligar a otros a escuchar su propia conciencia."
      },
      {
        title: "La carta de Tysha",
        type: "Motor emocional",
        text:
          "Una carta sin sello, atada con cinta roja deshilachada, de la hermana de armas que la crió en risa y cicatrices. Revela una verdad que cambió su rumbo: Tysha no actuó por la Orden, sino por Aelwyn, para que ella pudiera seguir siendo luz. Desde entonces Aelwyn no marcha por obediencia, sino por una promesa que nunca escuchó en voz alta."
      },
      {
        title: "La trenza de votos pendientes",
        type: "Símbolo",
        text:
          "Una sola trenza lateral, rematada con hilo rojo y una pequeña gema solar, que representa los votos que aún no ha cumplido. Es recordatorio visible de que su deber no está terminado y de que carga nombres que todavía no ha dejado descansar."
      },
      {
        title: "El sol eclipsado",
        type: "Marca de nacimiento / profecía",
        text:
          "Una marca natural en forma de sol eclipsado en su espalda, que se dice arde cuando su camino profético se altera. Encarna su destino no revelado: la profecía de una flor dorada que crecerá en la tumba de los dioses, y será espada, escudo y cicatriz."
      }
    ],
    bonds: [
      {
        name: "Tysha Aerendel",
        description:
          "Hermana de armas y vínculo emocional central. No de sangre, pero hermandad real: la que le trenzaba el cabello, la cubría cuando se equivocaba y la conoció antes de que el voto terminara de endurecerla. Su pérdida es la herida que mueve a Aelwyn, y su carta reveló que Tysha la protegió no por deber, sino por amor, para que Aelwyn pudiera seguir siendo luz.",
        href: ""
      },
      {
        name: "Eclissio",
        description:
          "Montura, compañero místico y juez silencioso. La eligió por voluntad y la acompaña con criterio propio: la corrige, la protege, se burla de ella con humor seco y corre antes que nadie cuando el peligro real se acerca. No confirma su rango, confirma su voluntad.",
        href: ""
      },
      {
        name: "Halrik de Hyldran",
        description:
          "El soldado de Glaciem que la recibió con respeto, verdad y abrigo cuando entró con bandera blanca. Le ofreció sopa, establo y tregua en medio del infierno. Su calidez la sorprende porque no sabe si tiene derecho a sentirla: una posibilidad de hogar que no esperaba encontrar en el reino que le enseñaron a temer.",
        href: "/personajes/halrik"
      },
      {
        name: "Yuki",
        description:
          "La Reina de Glaciem, con quien Aelwyn comparte un reconocimiento sobrio: dos mujeres de deber, distintas en forma, similares en peso. En Glaciem, Aelwyn descubre que la frialdad no equivale a crueldad, y que Yuki ha hecho del orden una forma de amar. Una autoridad que no necesita calidez visible para proteger.",
        href: "/personajes/yuki"
      },
      {
        name: "Elyria",
        description:
          "Su madre, la última lumenari conocida, fallecida al sellar una fisura solar. Su legado vive en el broche que Aelwyn lleva sobre el pecho, en la sangre solar que corre por ella y en la tensión permanente entre su humanidad y la luz heredada que no es del todo humana.",
        href: ""
      },
      {
        name: "Khaal'Zar Omunyek",
        description:
          "El antagonista que convierte el dolor de Aelwyn en trampa política y la reclama como propiedad dentro de su colección de gladiadores. No es solo un enemigo físico: es la negación de todo lo que su voto intenta proteger, el poder que transforma a las personas en espectáculo.",
        href: ""
      }
    ],
    relatedStories: [
      {
        title: "La Guerra de los Mitos",
        type: "Obra principal",
        description:
          "La obra donde Aelwyn abandona la senda del juramento heredado y marcha hacia Glaciem siguiendo la promesa ligada a Tysha. Allí defiende a inocentes semihumanos sin pedir permiso, descubre que Glaciem no era el reino sin alma de los rumores, y cae finalmente en la trampa de Mythra.",
        href: ""
      },
      {
        title: "Origen en Artanis",
        type: "Trasfondo",
        description:
          "La tierra de templos blancos y disciplina sagrada donde Aelwyn creció como hija de un caballero desaparecido y de la última lumenari. Una fe que nunca fue cómoda, forjada en ausencia, pérdida y la rigidez de una orden que creía que la luz bastaba.",
        href: ""
      },
      {
        title: "La carta de Tysha",
        type: "Punto de quiebre",
        description:
          "La carta que cambió el motor de Aelwyn: descubrir que su hermana de armas la protegió por amor y no por deber. Desde entonces no marcha por obediencia a la Orden, sino por una promesa que nunca escuchó pronunciar en voz alta.",
        href: ""
      },
      {
        title: "El reconocimiento de Eclissio",
        type: "Vínculo",
        description:
          "El encuentro en un campo de sangre tras una cruzada contra las Sombras Rielantes, donde un corcel solar-espectral camina hacia ella no por obediencia, sino por reconocimiento. Eclissio no confirma su rango: confirma su voluntad.",
        href: ""
      },
      {
        title: "La masacre de los semihumanos",
        type: "Acto definitorio",
        description:
          "El momento en que Aelwyn presencia la cacería de civiles semihumanos indefensos y actúa sin pedir permiso, sin trazar estrategia, sin consultar protocolo. Baja la visera y desenvaina, porque su voto no reconoce fronteras cuando hay una masacre ante sus ojos.",
        href: ""
      },
      {
        title: "La caída en la colección de Mythra",
        type: "Tragedia del arco",
        description:
          "El punto donde Aelwyn pasa de paladín sin estandarte a prisionera de un sistema que convierte personas en espectáculo. Su fe será puesta a prueba no en un templo, sino en arena, cadenas y narrativa mitriana.",
        href: ""
      }
    ],
    archive: {
      fullName: "Aelwyn Solrenhal",
      commonName: "Aelwyn",
      apparentAge: "29 años",
      gender: "Femenino",
      race: "Humana nacida de Sangre Solar, híbrida entre humana y lumenari",
      originRegion: "Artanis",
      elementPath: "Fe",
      professionRole:
        "Paladín Solar y guerrera élite. Portadora del Voto Ígneo, heroína trágica y figura luminosa de sacrificio profetizado.",
      masteryLevel:
        "Nivel 3 — Primera Especialización. Su poder se siente más luminoso que explosivo, más ético que destructivo, más ligado a la intención que a la fuerza bruta. Combate con precisión limpia y protectora: no busca espectáculo, busca detener el daño.",
      identitySummary:
        "Aelwyn Solrenhal es una paladín nacida entre templos, sol y soledad, criada bajo la disciplina sagrada de Artanis. No es una santa decorativa ni una guerrera luminosa genérica: es una mujer que todavía ama el mundo aunque el mundo insista en arrebatárselo. Su vida está atravesada por votos, pérdida y profecía, y por una pregunta que arde bajo la armadura: qué queda de una persona cuando todo lo que amaba ha sido convertido en misión. Comunica nobleza, fe, ternura contenida y una capacidad feroz de proteger incluso aquello que le enseñaron a destruir.",
      designCanon:
        "Aelwyn debe sentirse como una paladín joven entrenada desde la adolescencia, con disciplina real, cansancio sutil y una luz interior que no cancela el dolor: nunca una princesa solar ni una santa angelical sin conflicto. Mujer adulta de 29 años, atlética y elegante, de porte firme pero sereno, con piel clara de matiz cálido que parece reflejar una luz interna muy leve. Ojos azul profundo con un anillo dorado interno —vestigio lumenari— que se intensifica cuando invoca su fe. Cabello dorado claro, casi blanco bajo el sol directo, ondulado, recogido siempre en una sola trenza lateral rematada con hilo rojo y una pequeña gema solar, símbolo de sus votos pendientes. Viste una armadura solar ligera de acero templado, marfil y plata, con emblemas de sol y eclipse, capa marfil perlado que se abre como alas simbólicas sin convertirse en alas reales, y prendas oscuras de combate bajo el metal que evitan que parezca santa de vitral. Porta a Juramento Lúcido, una espada relicaria que solo brilla ante la pureza de intención. Su herencia lumenari se manifiesta como un brillo cálido y solemne, nunca como una divinidad explosiva. Tiene orejas humanas, nunca élficas.",
      visualNotes:
        "Las especificaciones técnicas de canon visual, prompts y reglas de consistencia quedan reservadas para producción interna, model sheets y generación de imágenes. En la ficha pública, el canon visual aparece como atmósfera narrativa, no como checklist técnico. El brillo de la sangre solar, la activación del anillo dorado en los ojos y el resplandor de la espada se mencionan como señales narrativas, no como instrucciones de render."
    },
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
    story:
      "Aria nació vinculada a las cortes de sombra del Continente Oscuro, entre nobleza vampírica y decadencia elegante. Ella y su hermano gemelo Adagio fueron abandonados tras la caída de sus padres y recogidos por Velamentum en una noche sin luna. No fueron salvados por amor: fueron elegidos por utilidad. La sociedad los convirtió en Máscaras. A Adagio le dieron canto, culpa y tiempo roto; a Aria, danza, deseo y control del pulso ajeno. Fue entrenada para seducir, distraer y eliminar, y su danza llegó a ser temida tanto en campos de batalla como en salones nobles. Aprendió a interpretar antes que sentir, que una emoción útil vale más que una verdadera, y que la belleza puede ser una jaula con perfume.",
    personality:
      "Aria es elegante, coqueta, perceptiva, teatral y calculadora. Cuando entra a una sala, no pregunta si puede ocupar el centro: lo vuelve inevitable. Su intensidad existe, pero está coreografiada; incluso sus arrebatos tienen forma estética. Tiene humor sensual, crueldad refinada y una capacidad peligrosa para fingir ligereza mientras examina a alguien por dentro. No debe leerse como criatura vacía: fue formada para convertir su existencia en máscara, y su arco más interesante nace cuando algo hace que esa máscara tiemble.",
    identityPhrase:
      "La Rosa del Viento: bailarina vampírica que aprendió a hacer latir corazones ajenos porque el suyo dejó de sonar, y que teme el único compás que no puede coreografiar.",
    narrativeSection: {
      title: "La máscara que sonríe para no desaparecer",
      lead:
        "Aria Ventoleve de Sangreal no baila para acompañar la música. Baila para que el mundo no olvide que existe. Cada giro es una pregunta disfrazada de seducción: ¿alguien latirá por mí esta noche?",
      paragraphs: [
        "Aria es la Máscara Cómica de un teatro partido en dos. Donde su hermano Adagio canta hacia el pasado, ella baila sobre el impulso del presente. Velamentum no la crió desde el amor, sino desde la utilidad: le enseñó a interpretar antes que sentir, a convertir cada emoción en herramienta y cada deseo ajeno en ruta de entrada.",
        "Su don no nace de ser hermosa, sino de entender cómo se comporta un cuerpo cuando quiere algo, cuando teme perderlo o cuando cree haber hallado una musa. No rompe la voluntad de nadie por la fuerza; la inclina, la seduce, la convence de participar en su propia rendición. Esa diferencia es el centro de su arte y de su crueldad.",
        "Bajo el carmesí, el perfume y la sonrisa de promesa peligrosa, hay una criatura sin pulso que aprendió a robar el de los demás solo para sentir, un rato, que sigue aquí. Cuando era humana escribía cartas de amor que nunca enviaba. La eternidad le quitó el latido y le dejó el escenario.",
        "Su tragedia es exacta: domina la entrega ajena, pero teme la propia. Sabe hacer que cualquiera baje las armas, hasta el día en que alguien la haga sentir algo que no pueda clasificar como deseo inducido. Entonces la que baja las armas es ella, y la rosa que lo lee todo se queda, por una vez, sin saber qué decir."
      ]
    },
    details: [
      {
        title: "La Rosa del Viento",
        type: "Título núcleo",
        text:
          "Aria domina la Senda del Aire como extensión de su danza. El viento no la mueve: la obedece. Dispersa perfume, sostiene giros imposibles y convierte la atmósfera de una sala entera en campo de control emocional. Lo que parece calor, aroma o ambiente es, en realidad, coreografía."
      },
      {
        title: "El Corazón de Títeres",
        type: "Habilidad única",
        text:
          "Su técnica más temida. A partir de una herida elegida brota un látigo carmesí con una rosa viva en la punta, cargada de feromonas de su aura. No destruye el libre albedrío: seduce la voluntad hasta que la víctima cree entregarse por elección. Puede inducir deseo, empatía, rivalidad o devoción, pero se rompe ante un golpe emocional auténtico."
      },
      {
        title: "La rosa que lee el destino",
        type: "Símbolo",
        text:
          "La rosa en la punta de su látigo cambia de color según lo que percibe: carmesí de pasión, violeta de cautela, gris de indiferencia. Solo una vez por persona puede tornarse prismática, multicolor: la señal de alguien capaz de despertar amor real en ella. Si ocurre, las espinas se retraen y Aria queda en shock. No puede dañar a quien su propia rosa eligió."
      },
      {
        title: "El corazón que no late",
        type: "Herida",
        text:
          "Bajo su piel pálida no hay pulso. Aria perdió su latido al volverse eterna y aprendió que la gente no se enamora del silencio. Toda su seducción nace de esa ausencia: hace latir a otros porque ella ya no puede hacerlo por sí misma."
      },
      {
        title: "El sello de Velamentum",
        type: "Marca de origen",
        text:
          "Una espiral floral rúnica sobre su omóplato derecho. No es adorno: es la prueba de que Aria fue formada, no criada. Velamentum la convirtió en Máscara, y esa marca recuerda que su teatralidad nació como método de una secta antes que como expresión propia."
      },
      {
        title: "Ternura burlona con Adagio",
        type: "Vínculo",
        text:
          "Con su hermano gemelo, Aria baja apenas la máscara. Entre ambos existe complicidad, ironía cruel y una dependencia dramática que ninguno puede separar del todo de Velamentum. Él arrastra la memoria; ella borra el pasado con éxtasis. Son dos mitades de una misma educación ritual."
      },
      {
        title: "El respeto como grieta",
        type: "Humanidad",
        text:
          "Aria sabe invadir el espacio emocional ajeno, pero también sabe cuándo no hacerlo. Cuando reconoce que alguien no quiere ser forzado y decide no forzarlo, no está claro si es una forma más sofisticada de control o una grieta de empatía real. Esa ambigüedad es lo más humano que tiene."
      },
      {
        title: "Quién es cuando nadie mira",
        type: "Arco interno",
        text:
          "Su arco más potente no consiste en dejar de seducir, sino en descubrir qué queda de ella cuando el público se va, nadie está encantado y nadie baila por efecto de su técnica. En el teatro vacío, después de la función, vive su pregunta más peligrosa: quién es Aria cuando nadie late por ella."
      }
    ],
    bonds: [
      {
        name: "Adagio",
        description:
          "Hermano gemelo y contraparte teatral. Aria es la Máscara Cómica; Adagio, la Trágica. Ella baila sobre el impulso; él canta hacia el pasado. Ella provoca deseo; él evoca arrepentimiento. No son solo familia: son dos rostros de una misma estructura dramática esculpida por Velamentum, unidos por una memoria compartida que ninguno puede soltar.",
        href: "/personajes/adagio-ventoleve"
      },
      {
        name: "Velamentum",
        description:
          "La sociedad secreta de vampiros que recogió a los gemelos tras la caída de sus padres y los convirtió en Máscaras rituales. No fue hogar, sino institución: les enseñó a interpretar antes que sentir. Es el origen de Aria, su herida formativa y la fuente de su teatralidad convertida en arma.",
        href: ""
      },
      {
        name: "Rubí",
        description:
          "Rivalidad exquisita. Rubí es fuego directo; Aria, deseo coreografiado. Rubí golpea antes de fingir; Aria finge antes de golpear. Rubí no confía en ella porque detecta el peligro tras su belleza, y a Aria le incomoda que Rubí sea demasiado auténtica para manipularla con facilidad.",
        href: "/personajes/rubi"
      },
      {
        name: "Noctalypse",
        description:
          "Un objetivo extraño para Aria: silencioso, incómodo con la exposición, con una sombra viva que reacciona donde él se contiene. En El Teatro del Orgullo, Aria reconoce que él no disfruta el juego de máscaras y decide no forzarlo. Tal vez sea una lectura más fina de control, o tal vez una rara muestra de respeto genuino.",
        href: "/personajes/noctalypse"
      },
      {
        name: "Lyzi",
        description:
          "Lyzi mira a Aria sin caer en su encanto y la lee como lo que es: una flor que sospecha de la primavera porque teme que esta vez no sea truco suyo. Su mirada espiritual reconoce la herida bajo la máscara sin juzgarla ni rendirse ante ella.",
        href: "/personajes/lyzi"
      },
      {
        name: "Yuki",
        description:
          "Donde Aria manipula el deseo, Yuki ofrece una vulnerabilidad que no puede clasificarse como estímulo inducido. Yuki entiende que el verdadero punto débil de Aria no es físico sino emocional: una respuesta auténtica que su técnica no logre catalogar como deseo provocado.",
        href: "/personajes/yuki"
      }
    ],
    relatedStories: [
      {
        title: "El Teatro del Orgullo",
        type: "Obra principal",
        description:
          "La función donde Aria entra en escena junto a Adagio. Su monólogo de la Máscara Cómica —danza que el público confunde con arte sin saber que presencia dolor— fija su tragedia central: sonreír hasta que el alma se parte mientras esparce rosas para poder desangrarse.",
        href: ""
      },
      {
        title: "La Rosa y el Ruiseñor",
        type: "Obra de origen",
        description:
          "La novela que profundiza el origen de los gemelos: dos niños abandonados tras la caída de sus padres, recogidos por Velamentum en una noche sin luna. No fueron salvados por amor, sino elegidos por utilidad.",
        href: ""
      },
      {
        title: "Las Máscaras de Teatro",
        type: "Dualidad",
        description:
          "La estructura dramática que une y separa a Aria y Adagio. Comedia y tragedia, impulso y memoria, presente y pasado. Aria no existe del todo aislada de su hermano: aunque aparezca sola, su sombra dramática sigue ligada a él.",
        href: ""
      },
      {
        title: "La rosa prismática",
        type: "Punto de quiebre",
        description:
          "El fenómeno que puede traicionar a Aria con una verdad. Su rosa lee a todos, excepto el momento exacto en que señala a alguien capaz de despertar en ella un amor que no puede coreografiar.",
        href: ""
      },
      {
        title: "La Danza Carmesí del Reposo Invertido",
        type: "Ritual",
        description:
          "El mecanismo de recuperación tras agotar su don. Requiere un lazo de deseo y entrega mutuos, nunca forzado ni vacío. Cada conexión significativa deja una flor de sangre en su espalda: un archivo íntimo de vínculos, hambre y supervivencia.",
        href: ""
      },
      {
        title: "El nombre que el mundo teme",
        type: "Mito popular",
        description:
          "Aria existe también como leyenda cantada e invocada. Algunos la recuerdan como diosa vestida de mujer; otros, como maldición con perfume de luna. Antes de verla, el mundo ya reacciona a su nombre.",
        href: ""
      }
    ],
    archive: {
      fullName: "Aria Ventoleve de Sangreal",
      commonName: "Aria",
      apparentAge: "Adulta joven, entre 25 y 30 años visuales; edad real entre 150 y 220 años",
      gender: "Femenino",
      race: "Vampira",
      originRegion: "Continente Oscuro, cortes de sombra vampíricas",
      elementPath: "Aire",
      professionRole:
        "Bailarina ritual, artista letal, manipuladora emocional y figura de disrupción escénica. Máscara Cómica del teatro vampírico de Velamentum.",
      masteryLevel:
        "Nivel 5 — Maestra / Sabia. Dominio extremo del control corporal, la lectura emocional y la presencia escénica como arma. Su poder no nace de la fuerza bruta, sino de la capacidad de convertir la reacción ajena en recurso.",
      identitySummary:
        "Aria Ventoleve de Sangreal es una vampira bailarina formada por Velamentum para convertir el arte en dominio. No pelea como guerrera ni como hechicera convencional: pelea con presencia, ritmo, perfume, mirada y compás. Su danza no acompaña la batalla, la reescribe. Detrás de su sonrisa encantadora hay cálculo, disciplina cruel y una comprensión profunda de lo fácil que es confundir libertad con entrega cuando alguien sabe mover el corazón ajeno.",
      designCanon:
        "Aria debe sentirse como una amenaza envuelta en belleza: vampira adulta, elegante, peligrosa y escénica, donde bailarina ritual, cortesana vampírica y presencia teatral se funden en una sola figura. Cabello rubio dorado como miel bajo la luna, recogido en dos coletas elevadas que no buscan inocencia sino teatralidad calculada. Ojos rojo vino, profundos, como sangre vista a través de cristal. Piel pálida de subtono marfil-rosado, aterciopelada, capaz de exhalar un leve vapor escarlata al activar su don. Su vestuario es de escena: carmesí profundo y bordados dorados, telas que siguen el movimiento del cuerpo, pies a menudo descalzos marcando el compás directo contra el mundo. Todo en ella comunica movimiento incluso cuando está quieta, como si el siguiente paso ya estuviera escrito en el aire. No debe reducirse a vampira sensual genérica, súcubo ni femme fatale plana: es teatro convertido en arma, una rosa que sabe exactamente dónde clavar la espina.",
      visualNotes:
        "Las especificaciones técnicas de canon visual, prompts y restricciones de consistencia quedan reservadas para producción interna, model sheets y generación de imágenes. En la ficha pública, el canon visual aparece como atmósfera narrativa, no como checklist técnico."
    },
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
    story:
      "Adagio y su hermana gemela Aria nacieron en las cortes sombrías del Continente Oscuro y fueron abandonados tras la caída de sus padres. Velamentum los recogió en una noche sin luna y los convirtió en Máscaras rituales. A Aria le dio danza, deseo y control del pulso ajeno; a Adagio, canto, culpa y tiempo roto. Fue afinado para recordar el dolor de los demás antes de que el mundo lo olvide, y aprendió a embellecer verdades horribles hasta volverlas sospechosas. Su música se volvió capaz de arrastrar memorias, reabrir heridas y, en casos raros, redimir, siempre a un costo que cobra sobre su propia existencia.",
    personality:
      "Adagio es melancólico, teatral, irónico, sensible y calculador. Habla como si cada frase hubiera sido ensayada frente a un espejo roto, no por falsedad, sino porque la verdad desnuda lo deja demasiado expuesto. Ama provocar reacciones desde la incomodidad elegante. Tiene una ternura torcida: puede salvar, pero suele hacerlo como quien corrige una partitura ajena sin pedir permiso. No es cruel por placer, aunque puede causar daño real; su error nace de creer que una emoción insoportable debe editarse antes de destruir a quien la siente.",
    identityPhrase:
      "El Verso que Envenena: bardo vampírico que convierte el dolor en música para que el mundo no olvide, y que puede robar el tiempo a cambio de su propia existencia.",
    narrativeSection: {
      title: "Una segunda oportunidad que cobra con memoria",
      lead:
        "Adagio Ventoleve de Sangreal no es una canción triste. Es una herida afinada que aprendió a vestirse de estrategia. Su música no consuela: recuerda, desgarra, reabre y, en casos raros, redime.",
      paragraphs: [
        "Adagio es la Máscara Trágica de un teatro partido en dos. Donde su hermana Aria baila sobre el impulso del presente, él canta hacia el pasado. Velamentum no lo crió desde el amor, sino desde la utilidad: lo afinó para recordar el dolor ajeno, no para recibir ternura. Su elegancia tiene función, su poesía tiene precio, y su sonrisa precisa esconde una tristeza tan antigua que aprendió a parecer cálculo.",
        "No entra en una escena con violencia: la inclina, la desacompasa, la vuelve vulnerable a una nota. Su combate no ocurre en el centro físico del campo, sino en el ritmo, la memoria y la percepción. Cambia quién llega primero, quién recuerda tarde, quién actúa antes de pensar. Es soporte de altísimo nivel, pero nunca pasivo: su música decide el orden del mundo mientras suena.",
        "Su defecto más bello y más grave es creer que sabe cuándo salvar a alguien de su propio dolor. Adagio puede amar desde la intervención, pero no siempre desde el consentimiento. Su pregunta central atraviesa todo lo que toca: cuánto vale evitar una herida si para hacerlo debes robarle a alguien el derecho a sentirla.",
        "Bajo las capas de estilo, ironía y voz de terciopelo hay culpa, nostalgia y un miedo profundo a ser amado, porque fue afinado para recordar dolor y no para recibir afecto. Su mejor versión aparece cuando hace algo objetivamente problemático por una razón emocionalmente comprensible. Ahí, entre la blasfemia y la ternura, Adagio respira."
      ]
    },
    details: [
      {
        title: "El Verso que Envenena",
        type: "Título núcleo",
        text:
          "Adagio hiere con la palabra antes que con cualquier arma. Una frase dicha con la entonación exacta puede obligar a alguien a mirar una verdad que estaba evitando. Su poesía puede ser caricia, excusa o cuchillo, y muchas veces las tres a la vez."
      },
      {
        title: "El Verso Inverso",
        type: "Técnica prohibida",
        text:
          "El canto que duerme al tiempo. Recitando una invocación al revés, ligada al cuadrado SATOR tatuado en su espalda, Adagio puede retroceder el flujo temporal unos segundos en un radio reducido. No restaura energía: revierte posiciones y acciones. Su costo no es cansancio, sino fractura: desancla su alma del presente y erosiona su existencia real."
      },
      {
        title: "El Poem of Bragi",
        type: "Técnica de soporte",
        text:
          "Ejecutado con violín y partitura emocional, distorsiona el orden causa-efecto para sus aliados: el atacante sincronizado, casi siempre Aria, actúa antes de que el enemigo perciba el movimiento. Mientras dura la melodía, Adagio queda completamente vulnerable, incapaz de defenderse o moverse. Si lo interrumpen, todo el edificio musical se derrumba sobre él."
      },
      {
        title: "Los ojos que cantan al revés",
        type: "Señal visual",
        text:
          "Adagio tiene heterocromía vampírica inestable: ojo izquierdo verde esmeralda, derecho rojo sangre antigua. Tras usar el Verso Inverso, los colores se invierten. El verde aparece en el lado derecho como huella delatora de que manipuló el tiempo recientemente. No es adorno: es evidencia."
      },
      {
        title: "La Canción al Silencio",
        type: "Restauración trágica",
        text:
          "Su forma más dolorosa de sanar. Adagio compone y canta completamente solo, donde nadie pueda oírlo. El mundo absorbe la canción y restaura parte de su alma, pero el recuerdo que la inspiró desaparece para siempre. Sanar, para él, siempre cuesta una memoria."
      },
      {
        title: "El anillo que brilla por ella",
        type: "Vínculo",
        text:
          "Adagio porta anillos lunares con nombres grabados. Uno se llama Rubí y brilla cuando piensa en ella. Para un ser afinado para recordar el pasado, ese resplandor señala algo raro y peligroso: la posibilidad de un presente que aún no ha perdido."
      },
      {
        title: "La máscara que nace de la utilidad",
        type: "Herida formativa",
        text:
          "Velamentum no le enseñó a sentir, sino a interpretar. Su teatralidad, su sarcasmo elegante y su distancia medida nacieron como método de una secta, no como cuidado. Habla como si cada frase hubiera sido ensayada frente a un espejo roto, porque la verdad desnuda lo deja demasiado expuesto."
      },
      {
        title: "El espejo ético",
        type: "Función narrativa",
        text:
          "Adagio no es solo seductor ni obstáculo romántico. Plantea al corazón de Caelyndor una pregunta incómoda: ¿salvar a alguien justifica tocar su memoria sin permiso? Su tragedia no es perder, sino olvidar por qué algo dolió."
      }
    ],
    bonds: [
      {
        name: "Aria",
        description:
          "Hermana gemela, reflejo y contraparte. Ella es la Máscara Cómica; él, la Trágica. Aria baila sobre impulsos; Adagio canta al pasado. Ella domina a través del placer y la exaltación; él hiere con memoria y posibilidad de redención. No fueron criados, fueron esculpidos por Velamentum, y su vínculo mezcla ternura burlona, dependencia ritual e ironía cruel que sobrevive bajo cualquier máscara.",
        href: "/personajes/aria-ventoleve"
      },
      {
        name: "Velamentum",
        description:
          "La sociedad secreta vampírica que lo moldeó. Para Adagio no fue hogar amoroso, sino una institución que enseña a interpretar antes que sentir y a convertir la sensibilidad en arma. Su máscara nace de utilidad, no de cuidado.",
        href: ""
      },
      {
        name: "Rubí",
        description:
          "Fascinación y conflicto ético. Adagio pone su música sobre Rubí no como objetivo bélico, sino emocional: ella representa algo raro para él, el presente. Cuando Rubí calienta con su fuego un fragmento de su aura rota, una parte del alma de Adagio deja de reflejar solo el pasado. Ella no cura lo que él perdió, pero puede entibiar su futuro.",
        href: "/personajes/rubi"
      },
      {
        name: "Noctalypse",
        description:
          "Rival emocional indirecto. Adagio tensiona el vínculo entre Rubí y Noctalypse no solo por coqueteo, sino porque obliga a todos a mirar lo que sienten, lo que callan y lo que podrían perder. Funciona como catalizador de orgullo, deseo y verdad más que como simple tercero romántico.",
        href: "/personajes/noctalypse"
      },
      {
        name: "Yuki",
        description:
          "Yuki comprendería de inmediato el verdadero peligro del Verso Inverso: no que retroceda el tiempo, sino que desancle el alma del presente. No lo juzgaría en voz alta; observaría, calcularía el daño y guardaría silencio hasta que hablar fuera indispensable.",
        href: "/personajes/yuki"
      },
      {
        name: "Lyzi",
        description:
          "Lyzi percibiría en él el eco de alguien que quiere acompañar, pero no sabe hacerlo sin intervenir. Para ella, Adagio es una melodía con miedo a quedarse quieta. Entendería su tristeza, pero jamás justificaría el robo del recuerdo ajeno.",
        href: "/personajes/lyzi"
      },
      {
        name: "Elarion",
        description:
          "Conoce el costo real del Verso Inverso y puede restaurar parcialmente los hilos temporales desgarrados mediante un ritual de sueño. Es una figura clave para cualquier arco de desgaste, límite o cura del don más peligroso de Adagio.",
        href: ""
      }
    ],
    relatedStories: [
      {
        title: "El Teatro del Orgullo",
        type: "Obra principal",
        description:
          "La función donde Adagio aparece junto a Aria. Allí define su propia técnica como una blasfemia temporal: un canto que arrastra el mundo unos segundos al pasado. También decide cantar la Canción al Silencio y pedirle a Aria que sea la única que recuerde por qué lo hizo.",
        href: ""
      },
      {
        title: "La Rosa y el Ruiseñor",
        type: "Obra de origen",
        description:
          "La novela que profundiza el origen de los gemelos: dos niños abandonados tras la caída de sus padres, recogidos por Velamentum en una noche sin luna. A Adagio le dieron canto, culpa y tiempo roto.",
        href: ""
      },
      {
        title: "Las Máscaras de Teatro",
        type: "Dualidad",
        description:
          "La estructura dramática que une y separa a los gemelos. Tragedia y comedia, memoria e impulso, pasado y presente. Donde Aria borra el pasado con éxtasis, Adagio lo arrastra con cada nota.",
        href: ""
      },
      {
        title: "El precio del tiempo robado",
        type: "Costo del don",
        description:
          "La dimensión más peligrosa de Adagio: cada uso del Verso Inverso fractura su aura, produce vértigo existencial y acorta su existencia. Aunque es vampiro, abusar de su propio don puede matarlo lentamente.",
        href: ""
      },
      {
        title: "La Canción al Silencio",
        type: "Sacrificio",
        description:
          "El ritual donde Adagio sana parte de su alma a cambio de perder para siempre el recuerdo que inspiró la canción. La restauración nunca llega sin pérdida.",
        href: ""
      },
      {
        title: "El nombre cantado en la noche",
        type: "Mito popular",
        description:
          "Adagio existe también como leyenda: el Eco de Medianoche, el Músico Enmascarado, el Ruiseñor. Su presencia genera un leve eco incluso antes de que hable, como si el mundo esperara su frase.",
        href: ""
      }
    ],
    archive: {
      fullName: "Adagio Ventoleve de Sangreal",
      commonName: "Adagio",
      apparentAge: "Aproximadamente 25 años visuales; edad real entre 150 y 220 años",
      gender: "Masculino",
      race: "Vampiro",
      originRegion: "Continente Oscuro, asociado a Umbra Nox y las cortes sombrías",
      elementPath: "Tierra (entendida como estabilidad, memoria, resonancia y anclaje temporal)",
      professionRole:
        "Bardo, músico ritual y consejero de cortes sombrías. Soporte y disruptor emocional. Máscara Trágica del teatro vampírico de Velamentum.",
      masteryLevel:
        "Nivel 5 — Maestro / Sabio. Domina la persuasión emocional, la manipulación del ritmo de batalla y la distorsión temporal limitada. Su fuerza nace de la vulnerabilidad ritual: si lo protegen, vuelve imposible a su aliado; si lo alcanzan, todo el edificio musical se derrumba.",
      identitySummary:
        "Adagio Ventoleve de Sangreal es un vampiro bardo del Continente Oscuro, moldeado por Velamentum para convertir la música, el dolor y la memoria en herramientas de poder. No es un seductor vampírico común ni un villano elegante de superficie: es una herida afinada. Su música no solo encanta, recuerda y desgarra. Su elegancia tiene función, su poesía tiene precio y su sensibilidad no es adorno, sino núcleo.",
      designCanon:
        "Adagio debe sentirse como un ruiseñor vampírico vestido de noche, tocando la memoria como si fuera una herida con cuerdas. Hombre joven adulto de belleza refinada, casi andrógina en ciertos ángulos, con silueta alta y fina de bailarín o violinista. Cabello rubio pálido, casi blanco dorado, largo y suelto, con una mecha rebelde que cubre parte de su ojo derecho como símbolo de su máscara trágica. Heterocromía inestable: verde esmeralda y rojo sangre antigua, capaz de invertirse tras manipular el tiempo. Piel pálida con leve brillo lunar. Traje de terciopelo negro azulado, entallado con precisión, con símbolos lunares, notas musicales invertidas, guante de canalización en la mano derecha y la insignia de una máscara trágica en la solapa. Debe comunicar belleza peligrosa, melancolía ritual y control del ritmo, nunca un vampiro monstruoso ni un galán de catálogo.",
      visualNotes:
        "Las especificaciones técnicas de canon visual, prompts y reglas de consistencia quedan reservadas para producción interna, model sheets y generación de imágenes. En la ficha pública, el canon visual aparece como atmósfera narrativa, no como checklist técnico. La inversión de ojos se menciona como señal narrativa, no como instrucción de render."
    },
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
    slug: "levia-thanis",
    name: "Levia Thanis",
    title: "La Arquera del Hilo Cortado",
    role: "Precisión, captura y equilibrio",
    affinity: "VIDA / HILO / CAPTURA",
    accent: "rgba(176, 58, 58, 0.30)",
    image: assetImage("levia_canon_portrait.png"),
    profileAudio: {
      enabled: false,
      title: "Levia Thanis — Crónica de personaje",
      subtitle: "Caelyndor",
      src: "/audio/character-summaries/levia-thanis-profile-summary.mp3",
      kind: "character-summary"
    },
    portraitPosition: "50% 18%",
    portraitScale: 1.08,
    description: "La mano que Velamentum envía cuando una orden no debe fallar: una ejecutora de precisión absoluta que lee la vida como cartografía de captura.",
    story:
      "Levia emerge como figura consolidada de Velamentum antes o durante la búsqueda de Aelwyn. En algún punto de su carrera organiza o toma control de La Casa de las Moiras, transformándola de red de asesinos en herramienta de captura fina para Velamentum. Cuando Xirian fracasa al intentar replicar el poder lumenari en recipientes sacrificables, la encarga traer lumenari vivos. Levia acepta por la causa, no por crueldad. Su cacería es metódica: primero fragmentos, luego rastros, después la fuente. Ese camino la conduce inevitablemente hacia Aelwyn Solrenhal, hija de la última lumenari conocida, estructura estable y objetivo de valor absoluto.",
    personality:
      "Calmada, calculadora y profundamente contenida. Su voz es baja, precisa y sin adornos. No amenaza: informa. No presume: enumera condiciones. No disfruta de quebrar a un enemigo: registra si el quiebre era necesario. Su cortesía nace de eficiencia social, no de bondad. Puede moverse en ambientes de poder blando con la misma fluidez con que desaparece en un corredor de servicio. Con aliados es impecable porque un engranaje roto reduce la precisión del mecanismo. Con enemigos no muestra sadismo, lo que puede ser más perturbador que la crueldad abierta.",
    identityPhrase:
      "La Arquera del Hilo Cortado: la mano que Velamentum envía cuando una orden no debe fallar, y que no persigue por odio sino por equilibrio — cortando hilos para que el tejido no se rompa.",
    narrativeSection: {
      title: "La eficiencia convertida en fe",
      lead:
        "Levia Thanis no es una asesina que disfruta del sufrimiento. Es algo más perturbador: una ejecutora de precisión absoluta que entiende cada misión como una operación matemática, donde el exceso es un fallo y la emoción es una debilidad.",
      paragraphs: [
        "Levia ocupa el Puesto N°4 de Velamentum no por política ni por ambición visible, sino porque hace el trabajo que otros ensucian con ego, deseo de ascenso o discurso. Su lugar en la jerarquía nació de exactitud, historial impecable y ausencia de necesidad de reconocimiento. Donde Xirian diseña y Davoren justifica, Levia ejecuta. Es el filo silencioso de una causa que no necesita espectáculo para ser cruel.",
        "Su epíteto no es decorativo. La Arquera del Hilo Cortado se inspira en las Moiras: una vez que apunta, el destino del objetivo queda reducido a una línea tensa entre vida, libertad y captura. Levia no siempre mata. A veces cortar el hilo significa negar una huida, apagar una habilidad, arrebatar un nombre o entregar un cuerpo todavía vivo al laboratorio que lo necesita. La muerte es solo una de las formas del corte.",
        "Su pertenencia a la Senda de la Vida no es paradoja sino revelación. No usa la vida para sanar: la lee como cartografía. Cada persona es una constelación de puntos vitales sostenidos por un hilo invisible. Quien sabe dónde la vida se sostiene también sabe dónde interrumpirla. Para Levia, la Senda de la Vida no es un don de preservación, sino una ciencia de captura.",
        "Su mayor amenaza no es la fuerza bruta sino la coherencia. Levia no abandona a sus aliados porque un engranaje roto reduce la precisión del mecanismo. No tortura por placer porque el exceso invalida el resultado. No actúa por odio porque el odio produce error. Esa ausencia de crueldad emocional puede ser más perturbadora que la maldad abierta: para ella, un objetivo no es un objeto de resentimiento, es una ruta que debe ser reducida hasta quedar bajo control."
      ]
    },
    details: [
      {
        title: "Percepción Vital",
        type: "Habilidad central",
        text:
          "Levia puede ver los puntos de constelación de una persona: cada cuerpo se organiza ante ella como un mapa de estrellas internas. El punto más brillante no es el mismo en todos — puede estar en el cuello, la muñeca, una cicatriz o incluso una zona vinculada a memoria y aura. Para muerte súbita, ataca ese punto. Para captura, elige los de apagado o suspensión. Por eso sus disparos parecen imposibles de predecir: no sigue anatomía común, sino arquitectura vital individual."
      },
      {
        title: "El ojo modificado por Xirian",
        type: "Intervención arcana",
        text:
          "El parche no oculta una pérdida. Oculta una intervención. Xirian modificó ese ojo para visión nocturna, rastreo de aura, lectura de rastros de olor y seguimiento de huellas mágicas mínimas. Su uso moderado otorga precisión sobrehumana; su uso prolongado provoca migrañas severas, náusea arcana y alteración de su propio flujo mágico. Cuanto más ve, menos puede permitirse sentir."
      },
      {
        title: "Síntesis de toxinas",
        type: "Senda de la Vida",
        text:
          "Como extensión de su vínculo con la Vida, Levia puede sintetizar toxinas a partir de sus propios fluidos: el sudor genera neurotóxicos de contacto, las lágrimas producen efectos emocionales y perceptivos, la sangre genera toxinas sistémicas y letales. Cada toxina es única, difícil de detectar y adaptada al objetivo. Todas tienen costo biológico y mágico."
      },
      {
        title: "La Casa de las Moiras",
        type: "Afiliación operativa",
        text:
          "El gremio de asesinos, capturadores y rastreadores bajo su liderazgo. No funciona como banda caótica sino como una red de ejecución ritualizada especializada en cortar rutas, linajes, nombres y libertades. Bajo su mando dejó de perseguir recompensas comunes para convertirse en herramienta de captura fina de Velamentum: quien falla por negligencia desaparece del tejido."
      },
      {
        title: "Lealtad a la causa, no a la persona",
        type: "Principio moral",
        text:
          "Levia no sirve a Xirian por devoción personal. Sirve a la arquitectura histórica de Velamentum. Si Xirian da una orden coherente con la causa, ejecuta. Si Xirian se convierte en un error que amenaza la causa, no lo odiará: lo corregirá. Esa distinción es lo que la diferencia de una seguidora ciega y lo que la hace más peligrosa a largo plazo."
      },
      {
        title: "Eficiencia absoluta",
        type: "Rasgo psicológico central",
        text:
          "Su método se basa en preparación, precisión y ausencia de exceso. No improvisa si puede preparar. Si improvisa, parece haberlo previsto. Cuando algo falla, no se altera: actualiza el plan. Cuando está molesta, su precisión aumenta en vez de romperse. No necesita espectáculo para ser la amenaza más grave en cualquier sala."
      },
      {
        title: "La falla de cálculo",
        type: "Tensión interna",
        text:
          "Su conflicto no está entre bien y mal, sino entre causa y error lógico. Levia puede subestimar lo que una decisión emocional auténtica cambia en una batalla. Su pregunta interna: ¿qué ocurre cuando la causa a la que sirve empieza a depender de fallas humanas que no puede corregir sin traicionar la jerarquía?"
      },
      {
        title: "El precio del ojo",
        type: "Costo narrativo",
        text:
          "La sobreinformación que otorga el ojo modificado convierte el mundo en una red insoportable de rutas, olores y pulsos. Cuanto más lo usa, más difícil le resulta separar dato de experiencia. Esa tensión entre lo que ve y lo que puede sostener es la grieta más humana de una persona que prefiere no tener grietas."
      }
    ],
    bonds: [
      {
        name: "Xirian",
        description:
          "Xirian formula objetivos científicos; Levia los traduce en rutas de captura. No lo idolatra: respeta su inteligencia y cumple sus encargos porque la causa los alinea. Si Xirian pide todos los lumenari vivos, Levia no pregunta si es cruel. Pregunta condiciones de conservación. Si Xirian se convierte en un error, Levia lo corregirá antes que abandonar la causa.",
        href: ""
      },
      {
        name: "Aelwyn Solrenhal",
        description:
          "El objetivo más valioso de la cacería de lumenari. Levia no la mira con odio ni con admiración: la ve como estructura estable, primera estabilidad verificable, captura viva obligatoria. Esa frialdad hiere a Aelwyn más que cualquier insulto, porque convierte el último acto de amor de Elyria en un expediente de caza.",
        href: "/personajes/aelwyn-solrenhal"
      },
      {
        name: "Davoren Solrenhal",
        description:
          "Si ocupa el Puesto N°3, Levia trabaja con él como ejecutora que reconoce utilidad y riesgo. Davoren habla de luz, oscuridad y vacío; Levia pregunta distancia, pulso y condición de entrega. Su tensión potencial: Davoren puede torcerse por la memoria de Aelwyn; Levia no debería torcerse por sentimentalidad ajena.",
        href: ""
      },
      {
        name: "Thalric",
        description:
          "Puesto N°6, inferior en rango y en pureza operativa. Thalric busca usar Velamentum para subir; Levia se deja usar por Velamentum porque considera que la causa importa más que su nombre. Su ambición produce ruido, y el ruido deja rastros. Levia no lo celebraría si cayera. Archivaría la consecuencia.",
        href: ""
      },
      {
        name: "La Casa de las Moiras",
        description:
          "El gremio que comanda. No necesita teatralidad para gobernar: su autoridad proviene de exactitud e historial perfecto. Quien falla por miedo recibe corrección. Quien falla por negligencia desaparece del tejido. La Casa es la extensión operativa de su voluntad, no de su ego.",
        href: ""
      }
    ],
    relatedStories: [
      {
        title: "El encargo de los lumenari",
        type: "Misión central",
        description:
          "Xirian fracasa al intentar replicar el poder lumenari en recipientes sacrificables. Los cuerpos explotan porque no poseen estructura fina. Encarga a Levia traer lumenari vivos. Este encargo la introduce directamente en el arco de Aelwyn y convierte el sacrificio de Elyria en objetivo de caza tecnológica.",
        href: ""
      },
      {
        title: "La cacería escalonada",
        type: "Desarrollo del arco",
        description:
          "Levia no va por Aelwyn de inmediato. Primero rastrea fragmentos: un anciano con brillo oculto, una descendiente que cambió de fe, un archivo viviente. Cada captura acerca a Xirian a la conclusión de que necesita a la hija de Elyria. El proceso muestra cómo opera — con paciencia, precisión y sin espectáculo.",
        href: ""
      },
      {
        title: "Ciudad de Nadie",
        type: "Clímax operativo",
        description:
          "Cuando la sede de Velamentum es comprometida y Neruvain despierta, Levia actúa por protocolo de extracción prioritaria: no por piedad, no por traición, sino porque la amenaza territorial activa convierte la captura de Aelwyn en riesgo de pérdida total. Extrae a Davoren y se retira. Eficiencia antes que victoria.",
        href: ""
      },
      {
        title: "La falla de cálculo",
        type: "Tensión narrativa",
        description:
          "En algún punto del arco, Levia encuentra una decisión emocional auténtica que no puede predecir mediante constelaciones vitales. Esa grieta no la convierte en aliada ni en redimida: revela que la causa también puede depender de variables que su método no está equipado para manejar.",
        href: ""
      }
    ],
    archive: {
      fullName: "Levia Thanis",
      commonName: "Levia",
      apparentAge: "Adulta joven a adulta plena",
      gender: "Femenino",
      race: "Humana modificada por intervención alquímica, arcana y quirúrgica de Velamentum",
      originRegion: "Por definir. Su identidad pública cambia según misión e infiltración.",
      elementPath: "Senda de la Vida",
      professionRole:
        "Ejecutora de alto rango, francotiradora mágica, cazadora de linajes raros, recuperadora de especímenes vivos e infiltradora de élite. Líder de La Casa de las Moiras.",
      masteryLevel:
        "Claramente superior a ejecutores comunes y agentes de campo. Su nivel no se mide en espectáculo mágico sino en tasa de éxito, precisión de captura y ausencia de variables no controladas. Nunca falla por descuido; cuando falla, ya está actualizando el plan.",
      identitySummary:
        "Levia Thanis es la mano que Velamentum envía cuando una orden no debe fallar. No es una asesina teatral ni una cazadora que se complace en el sufrimiento: es una ejecutora de precisión absoluta que entiende cada misión como una operación matemática. Su lugar como Puesto N°4 no nació de política ni de ambición visible, sino de exactitud y ausencia de ego operativo. Donde otros fallan por deseo de ascenso o discurso, ella entrega resultados exactos sin adornos.",
      designCanon:
        "Levia debe verse como una amenaza refinada: alguien capaz de pasar por invitada en un palacio, desaparecer en un corredor de servicio y disparar desde una azotea antes de que la música del salón termine. Mujer adulta de silueta alta y estilizada, piel clara con posibles ojeras sutiles por costo mágico, cabello café oscuro muy largo y liso de movimiento elegante, un ojo visible verde frío y preciso, el otro cubierto por un parche negro que oculta un recurso peligroso y no una pérdida. Viste chaqueta roja ceñida de autoridad, blusa blanca de contraste, falda negra ajustada con corte lateral funcional, medias negras, zapatos de tacón fino y guantes negros. Su cinturón de herramientas corta la silueta como una línea de alquimia táctica. No viste armadura pesada ni exhibe arcos gigantescos: su amenaza es elegante, silenciosa y quirúrgica.",
      visualNotes:
        "Las especificaciones técnicas de canon visual, prompts y reglas de consistencia quedan reservadas para producción interna, model sheets y generación de imágenes. En la ficha pública el canon visual aparece como atmósfera narrativa, no como checklist técnico. El ojo modificado y sus costos se mencionan como señal narrativa. La síntesis de toxinas desde fluidos propios se trata con tono clínico en materiales públicos, sin detalle grotesco."
    },
    visualCanon: ["Amenaza elegante y quirúrgica", "Chaqueta roja y parche negro", "Precisión silenciosa sin espectáculo"]  },
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
    description: "Testigo del ascenso de Nayara, del exilio de Kaelión y del nacimiento de Yuki; un sabio antiguo que sostiene el reino con silencio y estructura.",
    story: "Valthor fue testigo del ascenso de Nayara, del exilio de Kaelión y del nacimiento de Yuki. Como miembro fundador del Alto Consejo, su deber ha sido mantener la estructura del trono, aunque su corazón haya deseado romperla en más de una ocasión. Fue él quien guió a Yuki en los protocolos post-Ritual, y quien le informó —con dolor visible— del destino de Lielle. Nadie ha llorado por más personas en silencio que él. Y, sin embargo, sigue firme.",
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
