export type MagicLink = {
  label: string;
  href: string;
};

export type MagicPanel = {
  id: string;
  eyebrow: string;
  title: string;
  text: string;
  seeAlso?: MagicLink[];
};

export type MagicSection = {
  id: string;
  title: string;
  intro: string;
  panels: MagicPanel[];
};

export const magicSections: MagicSection[] = [
  {
    id: "las-leyes-del-poder",
    title: "Las leyes del poder",
    intro:
      "Antes de clasificar técnicas o linajes, el Archivo registra las reglas que ningún practicante ha conseguido evitar.",
    panels: [
      {
        id: "la-ley-del-coste",
        eyebrow: "Primera ley",
        title: "La ley del coste",
        text:
          "El poder en Caelyndor casi nunca es gratis. Todo milagro deja deuda, y la deuda no siempre la paga quien hizo el milagro. Los registros del Archivo insisten en lo mismo desde eras distintas: cuando algo imposible ocurre sin precio aparente, el precio solo está viajando.",
        seeAlso: [{ label: "Cronología", href: "/cronologia" }]
      },
      {
        id: "afinidades",
        eyebrow: "Segunda ley",
        title: "Afinidades",
        text:
          "Cada figura inclina su poder hacia una firma propia: Hielo / Memoria / Quietud, Fuego / Sangre / Juramento, Astral / Eco / Velo. La afinidad no mide cuánta fuerza tiene alguien, sino hacia dónde se dobla cuando el mundo lo empuja. Por eso dos practicantes del mismo elemento casi nunca arden igual.",
        seeAlso: [
          { label: "Personajes", href: "/personajes" },
          { label: "Glosario", href: "/archivo/glosario" }
        ]
      },
      {
        id: "el-velo-como-frontera",
        eyebrow: "Tercera ley",
        title: "El Velo como frontera",
        text:
          "La magia no se comporta igual a ambos lados del Velo, ni cerca de sus heridas. Lo que en el mundo material es técnica, cerca de una rasgadura se vuelve negociación. El Archivo recomienda tratar toda zona de Velo delgado como territorio con leyes propias.",
        seeAlso: [{ label: "Mundo", href: "/archivo/mundo" }]
      }
    ]
  },
  {
    id: "constelaciones-auricas",
    title: "Constelaciones Aúricas",
    intro:
      "La disciplina de leer el aura como un mapa de nodos de luz. No diagnostica cuánto poder hay: diagnostica qué forma tiene.",
    panels: [
      {
        id: "el-aura-como-mapa",
        eyebrow: "Fundamento",
        title: "El aura como mapa",
        text:
          "Para un lector entrenado, el aura no es un brillo: es una constelación. Sus nodos cambian según postura, intención, cansancio y entrenamiento, igual que un cielo cambia según la estación. Dos lecturas de la misma persona en días distintos cuentan dos historias distintas — y ambas son verdad.",
        seeAlso: [{ label: "Glosario", href: "/archivo/glosario" }]
      },
      {
        id: "lo-que-mide",
        eyebrow: "Escala",
        title: "Lo que mide y lo que no",
        text:
          "Las constelaciones no miden poder bruto. Miden complejidad, rareza, estabilidad, superposición y distancia respecto a Caelyndor. Los animales muestran entre tres y cinco nodos; los humanos, entre seis y ocho. Cuando una lectura muestra superposición, el lector ya no está mirando a alguien común — está mirando una anomalía.",
        seeAlso: [{ label: "Bestiario", href: "/archivo/bestiario" }]
      },
      {
        id: "el-lenguaje-de-los-lectores",
        eyebrow: "Oficio",
        title: "El lenguaje de los lectores",
        text:
          "El oficio tiene jerga propia, y el Archivo la conserva tal como se dice: una «constelación superpuesta» exige cautela; «más de un pulso» exige distancia; una «estrella apagada» pide duelo antes que diagnóstico; y «más lejos de Caelyndor» es la forma educada de decir que algo no pertenece del todo a este mundo.",
        seeAlso: [{ label: "Glosario", href: "/archivo/glosario" }]
      }
    ]
  },
  {
    id: "dragones-soberanos",
    title: "Dragones Soberanos",
    intro:
      "Por encima de las bestias míticas, el Archivo reconoce a los soberanos: dragones que no se clasifican por amenaza sino por jurisdicción.",
    panels: [
      {
        id: "los-soberanos",
        eyebrow: "Jurisdicciones",
        title: "Los soberanos conocidos",
        text:
          "Fulgor, primordial del fuego, gourmet de apetito legendario y devoto de la etiqueta, cuya elección distingue campeones. Selyra, soberana del viento y hermana de Voltrak, el dragón del trueno caído. Glasyra, soberana del hielo. Tratar con un soberano no es domar ni cazar: es diplomacia con alguien que ya gobernaba antes de que existieran los mapas.",
        seeAlso: [
          { label: "Fulgor", href: "/personajes/fulgor" },
          { label: "Rubí", href: "/personajes/rubi" }
        ]
      },
      {
        id: "el-dragon-de-luz",
        eyebrow: "Leyenda",
        title: "La leyenda del Dragón de Luz",
        text:
          "Los registros más antiguos hablan de un único dragón capaz de cruzar el Velo: el Dragón de Luz, asociado al prisma y dividido en siete colores. Ningún curador vivo lo ha visto. El Archivo lo conserva como leyenda, con la nota de costumbre: las leyendas de Caelyndor tienen la mala costumbre de estar documentando algo.",
        seeAlso: [{ label: "Glosario", href: "/archivo/glosario" }]
      }
    ]
  },
  {
    id: "el-mundo-espiritual",
    title: "El mundo espiritual",
    intro:
      "No todo lo que amenaza tiene cuerpo, y no todo lo que tiene cuerpo se resuelve con espada. Esta sala registra las reglas del otro lado.",
    panels: [
      {
        id: "lo-que-no-se-mata",
        eyebrow: "Regla central",
        title: "Lo que no se mata",
        text:
          "Algunas entidades no se matan: se transforman, se duermen, se sellan o se retroceden. El Archivo distingue por eso entre enemigo físico, monstruo espiritual, error del alma, trauma encarnado y memoria corrompida — porque cada categoría pide herramientas distintas, y confundirlas suele ser lo último que alguien confunde.",
        seeAlso: [{ label: "Bestiario", href: "/archivo/bestiario" }]
      },
      {
        id: "ritos-de-transito",
        eyebrow: "Práctica",
        title: "Ritos de tránsito",
        text:
          "Para entrar al mundo espiritual sin pertenecerle se usan anclas: el agua como conductor, jarras de agua lunar, incienso que guía el regreso. Quien cruza pierde color y gana borde — una marca visible de que el cuerpo quedó en préstamo. Los ritos no garantizan volver: garantizan saber hacia dónde es volver.",
        seeAlso: [{ label: "Bestiario", href: "/archivo/bestiario" }]
      },
      {
        id: "las-sendas",
        eyebrow: "Caminos",
        title: "Las Sendas",
        text:
          "Existen caminos de poder que no nacen del linaje sino de la adhesión: la Senda Aire, la Senda de la Fe y otras que el Archivo aún cataloga. Cada Senda otorga su forma de fuerza y cobra su forma de precio. Ninguna entrada del Archivo registra todavía una Senda que no cobre.",
        seeAlso: [{ label: "Glosario", href: "/archivo/glosario" }]
      }
    ]
  }
];
