import { assetImage } from "@/data/assets";

export type BookCategory = {
  id: string;
  label: string;
  intro: string;
  accent: string;
};

export type Book = {
  id: string;
  categoryId: string;
  order: number;
  title: string;
  subtitle?: string;
  seriesLine?: string;
  metadata: string;
  status: string;
  caption: string;
  blurb: string;
  tone: string;
  ctaLabel: string;
  targetCoverFile: string;
};

export const bookCategories: BookCategory[] = [
  {
    id: "saga-troncal",
    label: "Saga Troncal",
    intro:
      "La columna vertebral de Caelyndor. Aquí viven los libros grandes del recorrido principal, donde el destino, la herida y la magia empujan el corazón del mundo.",
    accent: "#7d96e8"
  },
  {
    id: "spin-offs",
    label: "Spin-offs",
    intro:
      "Historias con identidad propia, conectadas al universo de Caelyndor, pero capaces de respirar con fuerza en su propio eje.",
    accent: "#c87a8a"
  },
  {
    id: "historias-paralelas",
    label: "Historias Paralelas",
    intro:
      "Relatos, casos y senderos laterales que expanden Caelyndor más allá de la saga principal. Puertas independientes hacia rincones íntimos, extraños o secretos del mundo.",
    accent: "#7fae8a"
  }
];

export const books: Book[] = [
  {
    id: "sizigia",
    categoryId: "saga-troncal",
    order: 1,
    title: "Sizigia",
    subtitle: "La Compasión también es Violencia",
    metadata: "Saga Troncal · Libro I · Parte 1",
    status: "Primera parte pulida",
    caption:
      "Cuando el hielo aprende a obedecer demasiado bien, una anomalía aparece en Glaciem para abrir una grieta donde el deber había enterrado la humanidad.",
    blurb:
      "En el corazón helado de Glaciem, Yuki Arhess gobierna con la precisión de una ley tallada en hielo. Pero la llegada de Noctalypse, un extraño sin pasado claro y con una presencia imposible de archivar, comienza a despertar aquello que el reino intentó sellar. Sizigia abre la primera gran herida de Caelyndor: una historia sobre memoria, deber, compasión y el precio de sentir cuando todos esperan obediencia.",
    tone: "Fantasía emocional, política, íntima y oscura; apertura de saga con misterio, tensión palaciega y despertar interior.",
    ctaLabel: "Ver ficha",
    targetCoverFile: "sizigia-la-compasion-tambien-es-violencia.webp"
  },
  {
    id: "kaelion-el-incomodo",
    categoryId: "saga-troncal",
    order: 2,
    title: "Kaelión el incómodo",
    subtitle: "La Tragedia del Incómodo",
    metadata: "Saga Troncal · Libro II",
    status: "En desarrollo / pendiente de pulido",
    caption:
      "Un príncipe nacido para conquistar descubre que negarse a quemar un reino puede ser la traición más imperdonable de todas.",
    blurb:
      "En Cindralith, el fuego no perdona la duda. Kaelión, heredero de un reino forjado para conquistar, comete el acto más peligroso que puede cometer un príncipe de guerra: sentir compasión por el enemigo. Marcado como traidor y expulsado de su propia llama, deberá cruzar el filo entre ceniza y hielo para descubrir si aún puede existir un fuego que no destruya aquello que ama.",
    tone: "Fantasía trágica, política y emocional; drama de exilio, fuego contenido, culpa, redención y choque entre Cindralith y Glaciem.",
    ctaLabel: "Ver ficha",
    targetCoverFile: "kaelion-el-incomodo.webp"
  },
  {
    id: "el-aura-magica",
    categoryId: "saga-troncal",
    order: 3,
    title: "El Aura Mágica",
    metadata: "Saga Troncal · Libro III",
    status: "Versión final / pulido",
    caption:
      "En Sylvalis, una deuda de gratitud abre un sendero donde la magia deja de ser teoría y empieza a preguntar qué significa existir.",
    blurb:
      "Tras las heridas abiertas en Glaciem, Yuki, Rubí y Noctalypse viajan a Sylvalis para saldar una deuda pendiente con Lyzi. Entre mercados imposibles, raíces antiguas y vínculos que ya no pueden esconderse, el grupo descubre que el Aura Mágica no es solo poder: es identidad, límite, deseo y consecuencia. Una historia sobre amistad, pertenencia y la difícil belleza de querer ocupar un lugar real en el mundo.",
    tone: "Fantasía emocional, mística y luminosa; aventura de transición, sistema mágico, amistad profunda, humor de grupo y búsqueda de identidad.",
    ctaLabel: "Ver ficha",
    targetCoverFile: "el-aura-magica.webp"
  },
  {
    id: "la-forja-de-las-auras",
    categoryId: "saga-troncal",
    order: 4,
    title: "La Forja de las Auras",
    metadata: "Saga Troncal · Libro IV",
    status: "Pendiente de pulido / portada pendiente",
    caption:
      "Cuando la técnica ya no basta, Yuki debe cruzar las Montañas Doble Sol para descubrir que el aura no se domina: se escucha.",
    blurb:
      "Yuki Arhess ha llevado el hielo, el trueno y el deber hasta el límite de lo posible. Pero cuando su propia aura comienza a exigir algo más profundo que control, deberá abandonar los muros conocidos y buscar a Kai-Ling, una maestra capaz de enseñarle aquello que ningún libro conserva. En las Montañas Doble Sol, la Reina de Glaciem enfrentará una verdad incómoda: a veces, la mayor fuerza nace cuando una deja de resistir.",
    tone: "Fantasía de entrenamiento espiritual, introspectiva y emocional; viaje de maestría, sanación, equilibrio elemental, vínculo materno y crecimiento interior.",
    ctaLabel: "Ver ficha",
    targetCoverFile: "la-forja-de-las-auras.webp"
  },
  {
    id: "el-teatro-del-orgullo",
    categoryId: "saga-troncal",
    order: 5,
    title: "El Teatro del Orgullo",
    metadata: "Saga Troncal · Libro V",
    status: "Pendiente de pulido / portada pendiente",
    caption:
      "En Luzabrasa, el fuego sube al escenario para enfrentar lo que el orgullo calla cuando el amor ya no cabe en silencio.",
    blurb:
      "Rubí entrena como si pudiera quemar la ausencia a golpes, mientras Noctalypse intenta ordenar en palabras lo que su sombra no sabe esconder. Cuando Fulgor y Lyzi empujan ambos caminos hacia Luzabrasa, la ciudad del arte, la música y las brasas vivas, una noche de teatro se convierte en algo más que una función. El Teatro del Orgullo explora el amor torpe, la risa como refugio y el valor de mostrarse vulnerable cuando todas las armaduras siguen puestas.",
    tone: "Fantasía romántica, teatral y emocional; humor de grupo, reencuentro, orgullo herido, ciudad bohemia, música, danza y fuego íntimo.",
    ctaLabel: "Ver ficha",
    targetCoverFile: "el-teatro-del-orgullo.webp"
  },
  {
    id: "eryndhel-el-deseo-de-la-fe",
    categoryId: "saga-troncal",
    order: 6,
    title: "Eryndhel: El Deseo de la Fe",
    metadata: "Saga Troncal · Libro VI",
    status: "Pendiente de pulido / portada pendiente",
    caption:
      "Cuando la fe deja de ser certeza y se vuelve pregunta, una puerta antigua obliga al grupo a medir el peso real de sus deseos.",
    blurb:
      "Tras el entrenamiento de Yuki y el reencuentro del grupo en Luzabrasa, el camino vuelve a empujarlos hacia territorios donde la fuerza no basta y las palabras pueden pesar más que una espada. Entre técnicas imposibles, pactos antiguos y una puerta que no responde a la violencia, Eryndhel: El Deseo de la Fe abre una etapa donde cada deseo debe ser formulado con cuidado, porque incluso la esperanza puede exigir un precio.",
    tone: "Fantasía mística, filosófica y aventurera; regreso al peligro, pactos arcanos, humor de grupo, deseo, fe, lenguaje mágico y dilemas sobre identidad y posibilidad.",
    ctaLabel: "Ver ficha",
    targetCoverFile: "eryndhel-el-deseo-de-la-fe.webp"
  },
  {
    id: "la-guerra-de-los-mitos",
    categoryId: "saga-troncal",
    order: 7,
    title: "La Guerra de los Mitos",
    subtitle: "El Eclipse y la Semilla",
    metadata: "Saga Troncal · Libro VII",
    status: "Pendiente de confirmar",
    caption:
      "Cuando una carta anuncia la guerra, los continentes dejan de ser mapas y los mitos comienzan a reclamar sangre, fe y memoria.",
    blurb:
      "Tras los ecos de Aventhal, una noticia desde Glaciem obliga al grupo a mirar más allá de sus heridas personales. Mythra se mueve, Artanis despierta sus votos antiguos y nuevas figuras cruzan la nieve con juramentos que no conocen frontera. La Guerra de los Mitos: El Eclipse y la Semilla marca el inicio de una etapa mayor para Caelyndor, donde cada reino defiende su verdad y cada mito exige ser recordado.",
    tone: "Fantasía épica, política y bélica; expansión continental, juramentos sagrados, tensiones entre reinos, memoria histórica, honor, estrategia y consecuencias de guerra.",
    ctaLabel: "Ver ficha",
    targetCoverFile: "la-guerra-de-los-mitos-el-eclipse-y-la-semilla.webp"
  },
  {
    id: "el-rey-ceniza",
    categoryId: "saga-troncal",
    order: 8,
    title: "El Rey Ceniza",
    metadata: "Saga Troncal · Libro VIII · Parte 1",
    status: "Primera parte / pendiente de pulido",
    caption:
      "En las ruinas de un linaje marcado por fuego y traición, Kaen comienza a descubrir que algunas coronas no se heredan: se sobreviven.",
    blurb:
      "Kaen despierta convertido en fragmento, atrapado entre ciencia prohibida, memoria intervenida y un pasado que se niega a permanecer enterrado. Desde la Mansión Varthalion hasta las arenas del Rhazh'Qtar, su historia se reconstruye entre veneno, ambición, sangre antigua y una espada que exige más que fuerza para reconocer a un rey. El Rey Ceniza abre una ruta oscura de Caelyndor: la del heredero que fue tratado como arma antes de decidir qué clase de incendio quiere ser.",
    tone: "Fantasía oscura, política y psicológica; origen trágico, linaje maldito, horror arcano, desierto, manipulación, espada consciente y ascenso peligroso.",
    ctaLabel: "Ver ficha",
    targetCoverFile: "el-rey-ceniza.webp"
  },
  {
    id: "la-llama-inextinguible",
    categoryId: "saga-troncal",
    order: 9,
    title: "La Llama Inextinguible",
    metadata: "Saga Troncal · Libro IX",
    status: "Pulido / portada disponible",
    caption:
      "Cuando el mundo exige consecuencias, una sentencia con nombre propio comienza a perseguir la verdad detrás de la Ruptura del Velo.",
    blurb:
      "Tras la Ruptura del Velo, Caelyndor ya no puede fingir que las heridas del mundo son asuntos privados. Las Siete Coronas se reúnen, los reinos calculan el precio del desastre y Aethel Cineris envía a su campeón más preciso: Alistair Valerius, la Llama Inextinguible. No llega como verdugo ciego, sino como ley en movimiento, decidido a encontrar la verdad aunque el camino lo obligue a enfrentar aquello que todavía arde en quienes solo intentaban salvar el mundo.",
    tone: "Fantasía épica, política y judicial; consecuencias continentales, persecución, deber, juicio, honor, culpa, ley, humanidad contenida y tensión moral.",
    ctaLabel: "Ver ficha",
    targetCoverFile: "la-llama-inextinguible.webp"
  },
  {
    id: "la-rosa-y-el-ruisenor",
    categoryId: "spin-offs",
    order: 1,
    title: "La Rosa & El Ruiseñor",
    seriesLine: "Aria & Adagio",
    metadata: "Spin-offs · Aria & Adagio",
    status: "Pulido / portada disponible",
    caption:
      "En Vellacanta, donde la música viste la tragedia de belleza, dos hermanos descubren que algunas canciones solo nacen después de sangrar.",
    blurb:
      "Más allá del Velo, en una ciudad de fuentes, ópera, rosas y secretos antiguos, Aria y Adagio Ventoleve crecen entre música, deudas familiares y una belleza que intenta sostenerse incluso cuando el mundo empieza a oscurecer. Pero Vellacanta no solo canta: también esconde pactos, linajes, sociedades que esperan su momento y criaturas que confunden amor, posesión y eternidad. La Rosa & El Ruiseñor abre un spin-off gótico y musical de Caelyndor, donde la sangre no apaga la melodía: la transforma.",
    tone: "Fantasía gótica, vampírica y musical; drama familiar, ciudad artística, conspiración antigua, tragedia elegante, humor de hermanos, ópera, rosas, sangre y destino oscuro.",
    ctaLabel: "Ver ficha",
    targetCoverFile: "la-rosa-y-el-ruisenor.webp"
  },
  {
    id: "faelan-susurro-nocturno",
    categoryId: "spin-offs",
    order: 2,
    title: "Faelan Susurro Nocturno",
    subtitle: "La Bestia, la Flor y la Muerte",
    metadata: "Spin-offs · Minisaga de Faelan",
    status: "Pendiente de confirmar",
    caption:
      "Faelan renació con demasiada memoria, demasiada herida y una sola certeza: esta vez no será una nota al margen en la vida de nadie.",
    blurb:
      "Los elfos renacen. Esa es la ley. Pero Faelan Susurro Nocturno volvió con algo que no debía conservar: el peso completo de una vida anterior gris, humillada y olvidable. Decidido a no repetir el destino de un hombre que murió sin importancia, Faelan encuentra en Seralynn una fuerza que lo deslumbra, lo hiere y lo empuja a cambiar. Entre entrenamientos secretos, vínculos peligrosos, reglas crueles y el Gremio de la Cuchilla Tenue, La Bestia, la Flor y la Muerte abre una minisaga sobre memoria, infancia rota, voluntad y el precio de querer merecer un lugar en el mundo.",
    tone: "Fantasía emocional, oscura y de formación; renacimiento élfico, entrenamiento de asesinos, amistad dolorosa, rivalidad, destino impuesto, memoria traumática, infancia marcada y crecimiento brutal.",
    ctaLabel: "Ver ficha",
    targetCoverFile: "faelan-susurro-nocturno-la-bestia-la-flor-y-la-muerte.webp"
  },
  {
    id: "el-escritorio-de-destino",
    categoryId: "historias-paralelas",
    order: 1,
    title: "El Escritorio de Destino",
    metadata: "Historias Paralelas · Especial de Caelyndor",
    status: "Pulido / portada disponible",
    caption:
      "Cuando el héroe destinado desaparece, Caelyndor debe conformarse con cuatro personas cansadas, peligrosas y emocionalmente imposibles de administrar.",
    blurb:
      "El Destino tenía un plan. Naturalmente, salió mal. Con el héroe de Caelyndor desaparecido y una amenaza imposible acercándose desde lo alto del cielo, el Consejo Dracónido activa una medida desesperada: nombrar al cuarteto más disfuncional y efectivo del continente como nuevos héroes del mundo. Entre mapas que se reescriben, caminos amañados, dragones con maletín y una realidad empeñada en probar su paciencia, El Escritorio de Destino es una historia paralela sobre cansancio creativo, épica torcida y la absurda belleza de seguir avanzando aunque el camino no coopere.",
    tone: "Fantasía emocional, humorística y metaépica; aventura lateral, destino intervenido, viaje imposible, grupo disfuncional, cansancio, ternura, absurdo y heroísmo no convencional.",
    ctaLabel: "Ver ficha",
    targetCoverFile: "el-escritorio-de-destino.webp"
  },
  {
    id: "la-hidra-que-no-existia",
    categoryId: "historias-paralelas",
    order: 2,
    title: "La hidra que no existía",
    seriesLine: "Un caso de Valdemar Nocturne",
    metadata: "Historias Paralelas · Caso de Valdemar Nocturne",
    status: "Pulido / portada disponible",
    caption:
      "En los pantanos de Mírelo, una hidra imposible empieza a matar gente… aunque Valdemar Nocturne está casi seguro de que las hidras no existen.",
    blurb:
      "Una carta real llega al despacho de Valdemar Nocturne con un encargo absurdo: investigar una hidra de quince cabezas en los pantanos del sur. Valdemar no cree en hidras. Rufus, su meticuloso asistente mapache, prefiere dejarlo todo por escrito. Entre ciudades sobre pilotes, contratos imposibles, criaturas dudosas y pistas que huelen a barro, sangre y mentira, La hidra que no existía abre un caso donde el monstruo quizá no sea lo que todos temen… sino la pregunta que nadie quiere responder.",
    tone: "Fantasía detectivesca, gótica y pantanosa; misterio sobrenatural, humor seco, investigación, criaturas imposibles, contratos absurdos, heridas ocultas y atmósfera noir dentro de Caelyndor.",
    ctaLabel: "Ver ficha",
    targetCoverFile: "la-hidra-que-no-existia.webp"
  },
  {
    id: "no-todo-camino-abierto-es-inocente",
    categoryId: "historias-paralelas",
    order: 3,
    title: "No todo camino abierto es inocente",
    seriesLine: "Lyzi",
    metadata: "Historias Paralelas · Relato de Sylvalis",
    status: "Pulido / portada disponible",
    caption:
      "En Sylvalis, una ramita imposible obliga a Lyzi a preguntarse qué clase de fuerza nace cuando cuidar ya no parece suficiente.",
    blurb:
      "Lyzi ha protegido Sylvalis con ternura, ilusiones y una paciencia antigua. Pero cuando la duda empieza a pesar más que el silencio del bosque, una pequeña forma dormida entre sus manos despierta una pregunta incómoda: ¿qué ocurre si algún día la belleza no basta para detener al horror? Entre Yuki, Rubí, Noctalypse y un arma viva que se niega a obedecer como debería, No todo camino abierto es inocente explora el nacimiento de una nueva fuerza: íntima, espiritual y profundamente suya.",
    tone: "Fantasía emocional, íntima y mística; relato de personaje, Sylvalis, arma viva, aprendizaje espiritual, frustración, ternura, humor de grupo y crecimiento interior.",
    ctaLabel: "Ver ficha",
    targetCoverFile: "no-todo-camino-abierto-es-inocente.webp"
  },
  {
    id: "el-octavo-inquisidor",
    categoryId: "historias-paralelas",
    order: 4,
    title: "El Octavo Inquisidor",
    subtitle: "El Evangelio del Silencio",
    metadata: "Historias Paralelas · Minisaga gótica",
    status: "Pendiente de confirmar",
    caption:
      "Después de morir en Otrera, Gabriel Thorn despierta sin latido, sin calor y sin nombre… hasta que la Iglesia convierte su vacío en arma.",
    blurb:
      "Gabriel Thorn murió bajo el acero y despertó bajo una montaña de cadáveres. Sin pulso, sin calor y sin una explicación divina que justificara su regreso, adoptó un nuevo nombre: Octavius Montclaire. Entre monasterios, confesiones torcidas, demonios aterrados por su ausencia de miedo y una reliquia llamada Vox Silentii, El Octavo Inquisidor abre una minisaga gótica de Caelyndor sobre fe, muerte, silencio y el peligro de confundir eficiencia con salvación.",
    tone: "Fantasía gótica, religiosa y oscura; exorcismo, no-muerte, humor negro, trauma bélico, culpa, inquisición, reliquias sagradas, demonología y descenso psicológico.",
    ctaLabel: "Ver ficha",
    targetCoverFile: "el-octavo-inquisidor-el-evangelio-del-silencio.webp"
  }
];

export function bookCoverSrc(book: Book) {
  return assetImage(book.targetCoverFile);
}

export function getBooksByCategory(categoryId: string) {
  return books
    .filter((book) => book.categoryId === categoryId)
    .sort((first, second) => first.order - second.order);
}
