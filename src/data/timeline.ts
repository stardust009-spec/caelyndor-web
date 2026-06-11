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
    id: "era-del-velo",
    title: "Era del Velo Entero",
    type: "Era antigua",
    events: [
      {
        title: "Los reinos aprenden a nombrar la noche",
        description: "Evento placeholder para fundaciones, pactos y primeras señales astrales.",
        scope: "Saga troncal"
      },
      {
        title: "Primer documento interno conservado",
        description: "Registro preparado para conectar documentos, glosario y archivo general.",
        scope: "Relato lateral"
      }
    ]
  },
  {
    id: "rasgadura",
    title: "La Rasgadura",
    type: "Arco central",
    events: [
      {
        title: "El Velo se abre",
        description: "Punto de quiebre placeholder para ordenar capítulos, revelaciones y mapas futuros.",
        scope: "Saga troncal"
      },
      {
        title: "La sombra de Noctalypse",
        description: "Aparición mitológica preparada para expandirse en spin-offs.",
        scope: "Spin-off"
      }
    ]
  },
  {
    id: "forja-presente",
    title: "La Forja presente",
    type: "Estado editorial",
    events: [
      {
        title: "Borrador activo",
        description: "Marcador temporal para el libro actual y sus avances públicos.",
        scope: "Saga troncal"
      }
    ]
  }
];
