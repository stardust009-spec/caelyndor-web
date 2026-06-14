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
