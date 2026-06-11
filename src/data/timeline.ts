export type TimelineEvent = {
  title: string;
  description: string;
  scope: "Saga troncal" | "Relato lateral" | "Spin-off";
};

export type TimelineGroup = {
  id: string;
  title: string;
  type: string;
  events: TimelineEvent[];
};

export const timelineGroups: TimelineGroup[] = [
  {
    id: "era-del-velo-entero",
    title: "Era del Velo Entero",
    type: "Era antigua",
    events: [
      {
        title: "Los sellos de la Herida del Cielo",
        description:
          "Antes de la mayoría de las coronas que hoy presumen de antigüedad, el centro del mundo fue sellado. Nadie conserva el nombre completo de quienes lo hicieron; solo el peso de lo que contuvieron.",
        scope: "Saga troncal"
      },
      {
        title: "Fundación de los grandes reinos",
        description:
          "Glaciem levanta su trono sobre el hielo, Cindralith aprende a vivir sobre fuego dormido, Sylvalis se ordena alrededor del Árbol de Lüm y Lunaris hace de la noche una costumbre. El mundo aprende a nombrar la oscuridad sin invocarla.",
        scope: "Saga troncal"
      },
      {
        title: "La caída de Voltrak",
        description:
          "Korvess, el lobo que solo entiende jerarquía, mata a Voltrak, el dragón del trueno, hermano de Selyra y mejor amigo de Fulgor. La pérdida todavía resuena en los cielos de tormenta y en la memoria dracónica del continente.",
        scope: "Relato lateral"
      },
      {
        title: "La guerra del sellado y la Gran Falla",
        description:
          "Detener a Korvess exige una guerra que hiere al propio continente. La Gran Falla de Tierra de Nadie no es solo su prisión: es la cicatriz que recuerda el precio de impedir que volviera a caminar.",
        scope: "Saga troncal"
      }
    ]
  },
  {
    id: "coronas-y-presagios",
    title: "Coronas y presagios",
    type: "Era reciente",
    events: [
      {
        title: "El ascenso de Nayara",
        description:
          "Nayara asume como Regina Glaciei y sostiene el deber con cálculo sereno. Valthor, miembro fundador del Alto Consejo, lo registra todo: el trono helado gana una reina que rara vez se permite ternura.",
        scope: "Saga troncal"
      },
      {
        title: "El exilio de Kaelion",
        description:
          "Glaciem pierde un nombre que el Archivo todavía escribe en voz baja. El exilio de Kaelion deja una grieta en la corte que ningún protocolo ha conseguido cerrar del todo.",
        scope: "Relato lateral"
      },
      {
        title: "El nacimiento de Yuki",
        description:
          "Nace la nieve bajo el umbral. Años después, Valthor la guiará en los protocolos posteriores al Ritual y le informará —con dolor visible— del destino de Lielle.",
        scope: "Saga troncal"
      },
      {
        title: "La corona pasa a Yuki",
        description:
          "Nayara cede el trono y Yuki Arhess asume como Reina de Glaciem, con el Alto Consejo como testigo. La nieve bajo el umbral pasa a sostener el umbral entero.",
        scope: "Saga troncal"
      },
      {
        title: "Señales antes de la herida",
        description:
          "Silencios repentinos sobre el mar de Uru-Uru, patrones circulares en el hielo, registros del Evangelio del Silencio que nadie quiere leer dos veces. El mundo avisa, como siempre, a quien sabe escuchar.",
        scope: "Relato lateral"
      }
    ]
  },
  {
    id: "la-rasgadura",
    title: "La Rasgadura",
    type: "Arco central",
    events: [
      {
        title: "El Velo se abre",
        description:
          "La membrana entre el mundo y lo astral se rasga. No es una invasión ni una guerra declarada: es una herida. Lo que cruza no siempre tiene nombre, y lo que tiene nombre no siempre debería pronunciarse entero.",
        scope: "Saga troncal"
      },
      {
        title: "La sombra de Noctalypse",
        description:
          "El eclipse que no termina se vuelve presión sobre la realidad. Más que enemigo, una ausencia que ocupa lugar: el nombre que el mundo evita pronunciar completo.",
        scope: "Spin-off"
      },
      {
        title: "El Archivo registra anomalías",
        description:
          "Gólems del sueño recombinado, heridas vivientes, presencias que alteran cuerpo y percepción. Los curadores —Yuki, Rubí, Lyzi y una firma que prefieren no cuestionar— abren la sección abisal del Bestiario.",
        scope: "Relato lateral"
      }
    ]
  },
  {
    id: "el-ascenso-del-sol-negro",
    title: "El ascenso del Sol Negro",
    type: "Arco de facción",
    events: [
      {
        title: "La reconstrucción de Kaen",
        description:
          "El heredero Varthalion, marcado por Rha'gados, es reconstruido por Xirian entre obsidiana y ceniza. De esa intervención nace una voluntad que intenta convertir heridas en corona: el Rey de la Ceniza.",
        scope: "Saga troncal"
      },
      {
        title: "Las gemas se reúnen",
        description:
          "El Diamante (Carolina), la Esmeralda (Valther), el Zafiro (Arvenn) y la Obsidiana Umbral (Asha'al) toman posición alrededor del trono de Kaen. Percepción, conquista, información y filo: el Sol Negro está completo.",
        scope: "Saga troncal"
      },
      {
        title: "El Diamante sale a escena",
        description:
          "Carolina Varthalion convierte el escenario en territorio propio. Su Telaraña de Cristal ya suena en el portal: glamour estratégico como forma precisa de dominio.",
        scope: "Spin-off"
      }
    ]
  },
  {
    id: "la-forja-presente",
    title: "La Forja presente",
    type: "Estado editorial",
    events: [
      {
        title: "CAELYNDOR I: El Velo rasgado",
        description:
          "El primer umbral de la saga troncal, actualmente en escritura dentro de la Forja. Su avance público puede seguirse en la sección Nuevo Libro.",
        scope: "Saga troncal"
      },
      {
        title: "Cenizas de Nhal",
        description:
          "Relato lateral planeado: un reino menor que aprende demasiado tarde a leer las señales del cielo. Pensado como lectura opcional después de CAELYNDOR I.",
        scope: "Relato lateral"
      },
      {
        title: "Noctalypse: crónica de eclipse",
        description:
          "Spin-off en archivo de ideas: mitos, antagonismos y documentos prohibidos del abismo, contados desde la sombra del eclipse.",
        scope: "Spin-off"
      }
    ]
  }
];
