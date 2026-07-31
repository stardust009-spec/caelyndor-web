/**
 * Seed idempotente: sincroniza el catálogo de logros (fuente de verdad en
 * src/lib/server/achievementCatalog.ts) y el catálogo completo de las 77
 * Habilidades Únicas del documento canónico "Habilidades Únicas (HU): El Don
 * Innato" (42 Comunes, 20 Poco Comunes, 10 Épicas, 5 Legendarias).
 *
 * Nombres y descripciones: copiados del documento. Las afinidades de Senda
 * (sendasAfines) NO están en el documento — se asignaron temáticamente. Ya
 * NO intervienen en la revelación de HU (el sorteo es plano entre las 77):
 * quedan como metadata de lore por si sirven para flavor o features futuras.
 *
 * Ejecutar con: npm run db:seed (requiere DATABASE_URL).
 */
import "dotenv/config";
import { AvatarStyle, PrismaClient, RarezaHu, Senda } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { ACHIEVEMENT_CATALOG } from "../src/lib/server/achievementCatalog";
import { DEFAULT_AVATAR_SLUG, buildAvatarCatalog } from "../src/data/avatarCatalog";

const { LLAMA, AGUA, HIELO, AIRE, TIERRA, VIDA, CONEXION, TRUENO, VACIO, FE } = Senda;
const { COMUN, POCO_COMUN, EPICA, LEGENDARIA } = RarezaHu;

const PRIMARIAS: Senda[] = [LLAMA, AGUA, HIELO, AIRE, TIERRA, VIDA];

type HuSeedRow = {
  id: string;
  nombre: string;
  descripcion: string;
  rareza: RarezaHu;
  sendasAfines: Senda[];
};

const HU_SEED: HuSeedRow[] = [
  // ——— 1. Habilidades Únicas Comunes (42) ———
  { id: "recuperacion-de-aura-acelerada", nombre: "Recuperación de Aura Acelerada", descripcion: "Recupera Aura Mágica ligeramente más rápido.", rareza: COMUN, sendasAfines: [VIDA] },
  { id: "pasos-silenciosos", nombre: "Pasos Silenciosos", descripcion: "Reduce el ruido al moverse.", rareza: COMUN, sendasAfines: [AIRE, VACIO] },
  { id: "talento-culinario", nombre: "Talento Culinario", descripcion: "Mejora el sabor y la calidad de la comida preparada.", rareza: COMUN, sendasAfines: [LLAMA, VIDA] },
  { id: "piel-resiliente", nombre: "Piel Resiliente", descripcion: "Aumenta ligeramente la resistencia a daño físico.", rareza: COMUN, sendasAfines: [TIERRA] },
  { id: "afinidad-elemental-menor", nombre: "Afinidad Elemental Menor", descripcion: "Potencia ligeramente los hechizos de la afinidad del usuario.", rareza: COMUN, sendasAfines: PRIMARIAS },
  { id: "memoria-ligera", nombre: "Memoria Ligera", descripcion: "Mejora la memoria a corto plazo.", rareza: COMUN, sendasAfines: [HIELO] },
  { id: "resistencia-al-frio", nombre: "Resistencia al Frío", descripcion: "Aumenta la tolerancia a temperaturas frías.", rareza: COMUN, sendasAfines: [HIELO] },
  { id: "resistencia-al-calor", nombre: "Resistencia al Calor", descripcion: "Aumenta la tolerancia a temperaturas cálidas.", rareza: COMUN, sendasAfines: [LLAMA] },
  { id: "oido-agudo", nombre: "Oído Agudo", descripcion: "Mejora la percepción auditiva.", rareza: COMUN, sendasAfines: [AIRE] },
  { id: "vista-aguda", nombre: "Vista Aguda", descripcion: "Mejora la percepción visual.", rareza: COMUN, sendasAfines: [AIRE, TRUENO] },
  { id: "mano-firme", nombre: "Mano Firme", descripcion: "Mejora la precisión en tareas manuales.", rareza: COMUN, sendasAfines: [TIERRA] },
  { id: "empatia-basica", nombre: "Empatía Básica", descripcion: "Facilita la comprensión de las emociones de otros.", rareza: COMUN, sendasAfines: [CONEXION, VIDA] },
  { id: "aprendizaje-rapido", nombre: "Aprendizaje Rápido", descripcion: "Acelera el proceso de adquirir nuevas habilidades.", rareza: COMUN, sendasAfines: [HIELO, TRUENO] },
  { id: "resistencia-a-enfermedades", nombre: "Resistencia a Enfermedades", descripcion: "Hace al usuario menos propenso a enfermar.", rareza: COMUN, sendasAfines: [VIDA] },
  { id: "equilibrio-mejorado", nombre: "Equilibrio Mejorado", descripcion: "Facilita mantener el equilibrio en situaciones precarias.", rareza: COMUN, sendasAfines: [AIRE] },
  { id: "sentido-de-la-direccion", nombre: "Sentido de la Dirección", descripcion: "Facilita la navegación y evita perderse.", rareza: COMUN, sendasAfines: [AIRE, TIERRA] },
  { id: "voz-resonante", nombre: "Voz Resonante", descripcion: "Permite que la voz del usuario tenga un mayor alcance o impacto emocional sutil.", rareza: COMUN, sendasAfines: [TRUENO, CONEXION] },
  { id: "pulmones-infatigables", nombre: "Pulmones Infatigables", descripcion: "Aumenta la capacidad pulmonar y la resistencia a la fatiga respiratoria.", rareza: COMUN, sendasAfines: [AIRE, AGUA] },
  { id: "dedo-agil", nombre: "Dedo Ágil", descripcion: "Mejora la destreza y velocidad en tareas que requieren movimientos finos de los dedos.", rareza: COMUN, sendasAfines: [TRUENO] },
  { id: "orientacion-estelar", nombre: "Orientación Estelar", descripcion: "Permite una navegación precisa utilizando el cielo nocturno o diurno.", rareza: COMUN, sendasAfines: [VACIO, AIRE] },
  { id: "olfato-sutil", nombre: "Olfato Sutil", descripcion: "Permite detectar olores extremadamente débiles o complejos.", rareza: COMUN, sendasAfines: [TIERRA, VIDA] },
  { id: "toque-calmante", nombre: "Toque Calmante", descripcion: "Un toque físico puede infundir una leve sensación de calma.", rareza: COMUN, sendasAfines: [AGUA, VIDA] },
  { id: "presencia-reconfortante", nombre: "Presencia Reconfortante", descripcion: "La presencia del usuario infunde una leve sensación de seguridad o bienestar.", rareza: COMUN, sendasAfines: [FE, CONEXION] },
  { id: "recoleccion-eficiente", nombre: "Recolección Eficiente", descripcion: "Permite recolectar recursos naturales (hierbas, minerales) de manera más rápida y abundante.", rareza: COMUN, sendasAfines: [TIERRA, VIDA] },
  { id: "canto-hipnotico-menor", nombre: "Canto Hipnótico Menor", descripcion: "La voz cantada del usuario puede captar la atención de manera inusual.", rareza: COMUN, sendasAfines: [AGUA, CONEXION] },
  { id: "resistencia-a-toxinas-menor", nombre: "Resistencia a Toxinas Menor", descripcion: "Aumenta ligeramente la resistencia a venenos y toxinas.", rareza: COMUN, sendasAfines: [VIDA, AGUA] },
  { id: "punteria-basica", nombre: "Puntería Básica", descripcion: "Ligeramente mejora la precisión con armas a distancia.", rareza: COMUN, sendasAfines: [AIRE, TRUENO] },
  { id: "resistencia-a-la-fatiga", nombre: "Resistencia a la Fatiga", descripcion: "Reduce ligeramente la velocidad a la que el usuario se fatiga.", rareza: COMUN, sendasAfines: [TIERRA, VIDA] },
  { id: "sentido-del-peligro-menor", nombre: "Sentido del Peligro Menor", descripcion: "Proporciona una vaga sensación de malestar ante peligros inminentes.", rareza: COMUN, sendasAfines: [VACIO] },
  { id: "vision-periferica-mejorada", nombre: "Visión Periférica Mejorada", descripcion: "Aumenta el campo de visión sin girar la cabeza.", rareza: COMUN, sendasAfines: [AIRE] },
  { id: "dureza-cutanea", nombre: "Dureza Cutánea", descripcion: "La piel del usuario es ligeramente más resistente a abrasiones y cortes leves.", rareza: COMUN, sendasAfines: [TIERRA] },
  { id: "mimetismo-de-sonidos", nombre: "Mimetismo de Sonidos", descripcion: "Puede imitar sonidos simples con cierta precisión.", rareza: COMUN, sendasAfines: [AIRE, CONEXION] },
  { id: "resistencia-a-la-presion", nombre: "Resistencia a la Presión", descripcion: "Tolera mejor los cambios de presión (ej. bajo el agua o en grandes alturas).", rareza: COMUN, sendasAfines: [AGUA, TIERRA] },
  { id: "piel-camaleonica-menor", nombre: "Piel Camaleónica Menor", descripcion: "La piel del usuario puede adaptarse ligeramente al entorno, mejorando el camuflaje básico.", rareza: COMUN, sendasAfines: [AGUA, VACIO] },
  { id: "digestion-eficiente", nombre: "Digestión Eficiente", descripcion: "El usuario puede digerir una mayor variedad de alimentos y extraer más nutrientes.", rareza: COMUN, sendasAfines: [VIDA] },
  { id: "resistencia-a-la-corrupcion-menor", nombre: "Resistencia a la Corrupción Menor", descripcion: "Leve resistencia a efectos de corrupción del aura o espiritual.", rareza: COMUN, sendasAfines: [FE, VACIO] },
  { id: "resistencia-al-miedo-menor", nombre: "Resistencia al Miedo Menor", descripcion: "Ligeramente más resistente a efectos de miedo o terror.", rareza: COMUN, sendasAfines: [FE, LLAMA] },
  { id: "concentracion-basica", nombre: "Concentración Básica", descripcion: "Mejora la capacidad de mantener el foco en una tarea.", rareza: COMUN, sendasAfines: [HIELO] },
  { id: "clarividencia-de-aura-menor", nombre: "Clarividencia de Aura Menor", descripcion: "Puede percibir halos o colores básicos alrededor de individuos con Aura Mágica activa.", rareza: COMUN, sendasAfines: [CONEXION, VACIO] },
  { id: "control-de-voz-menor", nombre: "Control de Voz Menor", descripcion: "Puede modular su voz para ser ligeramente más persuasivo o intimidante.", rareza: COMUN, sendasAfines: [CONEXION, TRUENO] },
  { id: "deteccion-de-metales-menor", nombre: "Detección de Metales Menor", descripcion: "Puede sentir la presencia cercana de concentraciones de metales.", rareza: COMUN, sendasAfines: [TIERRA] },
  { id: "resistencia-al-aturdimiento-menor", nombre: "Resistencia al Aturdimiento Menor", descripcion: "Se recupera ligeramente más rápido de efectos de aturdimiento.", rareza: COMUN, sendasAfines: [TRUENO, TIERRA] },

  // ——— 2. Habilidades Únicas Poco Comunes (20) ———
  { id: "pensamiento-rapido", nombre: "Pensamiento Rápido", descripcion: "Acelera el procesamiento mental y las reacciones.", rareza: POCO_COMUN, sendasAfines: [TRUENO, HIELO] },
  { id: "detector-de-aura-oculta", nombre: "Detector de Aura Oculta", descripcion: "Permite percibir Aura Mágica disimulada.", rareza: POCO_COMUN, sendasAfines: [VACIO, CONEXION] },
  { id: "resistencia-al-elemento-opuesto", nombre: "Resistencia al Elemento Opuesto", descripcion: "Reduce el daño del elemento opuesto a la afinidad del usuario.", rareza: POCO_COMUN, sendasAfines: PRIMARIAS },
  { id: "empatia-avanzada", nombre: "Empatía Avanzada", descripcion: "Permite sentir las emociones de otros con gran intensidad.", rareza: POCO_COMUN, sendasAfines: [CONEXION] },
  { id: "vision-nocturna", nombre: "Visión Nocturna", descripcion: "Permite ver claramente en la oscuridad.", rareza: POCO_COMUN, sendasAfines: [VACIO, HIELO] },
  { id: "olfato-agudo", nombre: "Olfato Agudo", descripcion: "Permite distinguir olores sutiles y rastrear por olor.", rareza: POCO_COMUN, sendasAfines: [TIERRA, VIDA] },
  { id: "fuerza-mejorada", nombre: "Fuerza Mejorada", descripcion: "Aumenta la fuerza física de manera notable.", rareza: POCO_COMUN, sendasAfines: [TIERRA, LLAMA] },
  { id: "velocidad-mejorada", nombre: "Velocidad Mejorada", descripcion: "Aumenta la velocidad de movimiento de manera notable.", rareza: POCO_COMUN, sendasAfines: [AIRE, TRUENO] },
  { id: "curacion-acelerada", nombre: "Curación Acelerada", descripcion: "Acelera la recuperación de heridas leves y moderadas.", rareza: POCO_COMUN, sendasAfines: [VIDA] },
  { id: "intuicion", nombre: "Intuición", descripcion: "Permite anticipar eventos o peligros con una claridad sorprendente.", rareza: POCO_COMUN, sendasAfines: [VACIO, FE] },
  { id: "manipulacion-emocional-menor", nombre: "Manipulación Emocional Menor", descripcion: "Permite influir ligeramente en las emociones de otros.", rareza: POCO_COMUN, sendasAfines: [CONEXION, AGUA] },
  { id: "resistencia-al-dolor", nombre: "Resistencia al Dolor", descripcion: "Reduce significativamente la sensación de dolor, permitiendo continuar a pesar de las heridas.", rareza: POCO_COMUN, sendasAfines: [TIERRA, FE] },
  { id: "flexibilidad-mejorada", nombre: "Flexibilidad Mejorada", descripcion: "Facilita movimientos ágiles y acrobáticos, aumentando la capacidad de evasión.", rareza: POCO_COMUN, sendasAfines: [AIRE, AGUA] },
  { id: "control-del-sueno", nombre: "Control del Sueño", descripcion: "Permite controlar los ciclos de sueño y vigilia, necesitando menos descanso o induciendo el sueño en otros.", rareza: POCO_COMUN, sendasAfines: [VACIO] },
  { id: "precision-quirurgica", nombre: "Precisión Quirúrgica", descripcion: "Mejora la exactitud y firmeza de la mano para tareas extremadamente delicadas.", rareza: POCO_COMUN, sendasAfines: [HIELO, VIDA] },
  { id: "sentido-sismico", nombre: "Sentido Sísmico", descripcion: "Permite percibir vibraciones en la tierra para detectar movimientos cercanos.", rareza: POCO_COMUN, sendasAfines: [TIERRA] },
  { id: "persuasion-natural", nombre: "Persuasión Natural", descripcion: "La voz y el porte del usuario hacen que sus argumentos sean más convincentes.", rareza: POCO_COMUN, sendasAfines: [CONEXION, FE] },
  { id: "adaptacion-ambiental", nombre: "Adaptación Ambiental", descripcion: "Permite al usuario adaptarse a una amplia gama de entornos extremos (ej. alta/baja presión, atmósferas tóxicas leves).", rareza: POCO_COMUN, sendasAfines: [AGUA, AIRE] },
  { id: "regeneracion-de-aura-menor", nombre: "Regeneración de Aura Menor", descripcion: "Acelera notablemente la regeneración natural de la Aura Mágica.", rareza: POCO_COMUN, sendasAfines: [VIDA, FE] },
  { id: "percepcion-de-la-verdad", nombre: "Percepción de la Verdad", descripcion: "Ayuda al usuario a discernir si alguien está mintiendo o si una información es verdadera (no es una detección infalible, sino una fuerte intuición).", rareza: POCO_COMUN, sendasAfines: [FE, HIELO] },

  // ——— 3. Habilidades Únicas Épicas (10) ———
  { id: "memoria-eidetica", nombre: "Memoria Eidética", descripcion: "Permite recordar detalles con una claridad asombrosa y perfecta recuperación.", rareza: EPICA, sendasAfines: [HIELO, VACIO] },
  { id: "maestro-artesano", nombre: "Maestro Artesano", descripcion: "Permite crear objetos de calidad legendaria o con propiedades mágicas excepcionales en su profesión.", rareza: EPICA, sendasAfines: [TIERRA, LLAMA] },
  { id: "curacion-potente", nombre: "Curación Potente", descripcion: "Permite curar heridas graves, enfermedades complejas o acelerar drásticamente la recuperación.", rareza: EPICA, sendasAfines: [VIDA] },
  { id: "manipulacion-emocional-avanzada", nombre: "Manipulación Emocional Avanzada", descripcion: "Permite controlar y alterar las emociones de grupos de personas.", rareza: EPICA, sendasAfines: [CONEXION] },
  { id: "vision-del-futuro-menor", nombre: "Visión del Futuro Menor", descripcion: "Permite vislumbrar eventos futuros cercanos o posibles resultados de acciones, aunque fragmentados.", rareza: EPICA, sendasAfines: [VACIO, FE] },
  { id: "inmunidad-a-enfermedades", nombre: "Inmunidad a Enfermedades", descripcion: "Hace al usuario inmune a cualquier enfermedad y a la mayoría de los venenos.", rareza: EPICA, sendasAfines: [VIDA] },
  { id: "regeneracion", nombre: "Regeneración", descripcion: "Permite regenerar heridas rápidamente e incluso curar extremidades o daños críticos con el tiempo.", rareza: EPICA, sendasAfines: [VIDA, TIERRA] },
  { id: "telepatia-menor", nombre: "Telepatía Menor", descripcion: "Permite leer la mente de otros o comunicarse mentalmente en cortas distancias.", rareza: EPICA, sendasAfines: [CONEXION, VACIO] },
  { id: "control-elemental-avanzado", nombre: "Control Elemental Avanzado", descripcion: "Permite manipular el elemento de afinidad con gran precisión, poder y sin el Moldeado habitual.", rareza: EPICA, sendasAfines: PRIMARIAS },
  { id: "maestro-estratega", nombre: "Maestro Estratega", descripcion: "Permite planificar y ejecutar estrategias complejas con gran éxito, anticipando múltiples movimientos enemigos.", rareza: EPICA, sendasAfines: [HIELO, TRUENO] },

  // ——— 4. Habilidades Únicas Legendarias (5) ———
  { id: "manipulacion-de-la-realidad-menor", nombre: "Manipulación de la Realidad Menor", descripcion: "Permite alterar ligeramente las leyes de la física o la realidad en un área limitada (ej. doblar la luz, crear pequeñas ilusiones tangibles, desviar la trayectoria de proyectiles de forma improbable).", rareza: LEGENDARIA, sendasAfines: [VACIO] },
  { id: "control-del-tiempo-menor", nombre: "Control del Tiempo Menor", descripcion: "Permite ralentizar o acelerar el tiempo en un área muy limitada alrededor del usuario o un objetivo, durante breves instantes.", rareza: LEGENDARIA, sendasAfines: [VACIO, TRUENO] },
  { id: "resurreccion", nombre: "Resurrección", descripcion: "Permite revivir a los muertos, aunque con un inmenso coste de Aura Mágica y posibles limitaciones (ej. solo si el cuerpo está intacto, una vez por siglo).", rareza: LEGENDARIA, sendasAfines: [VIDA, FE] },
  { id: "creacion-de-vida", nombre: "Creación de Vida", descripcion: "Permite crear vida orgánica simple o infundir vida en formas inanimadas (ej. animar una estatua, hacer crecer un bosque de la nada).", rareza: LEGENDARIA, sendasAfines: [VIDA, CONEXION] },
  { id: "omnisciencia-menor", nombre: "Omnisciencia Menor", descripcion: "Permite conocer cualquier información al hacer una pregunta, aunque con limitaciones (la respuesta puede ser críptica, tardía, o el conocimiento es vasto pero no instantáneo).", rareza: LEGENDARIA, sendasAfines: [FE, VACIO] }
];

async function main() {
  const url =
    process.env.DATABASE_URL_UNPOOLED ??
    process.env.POSTGRES_URL_NON_POOLING ??
    process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL no está definida.");
  }
  const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString: url }) });

  const porRareza = new Map<RarezaHu, number>();
  for (const hu of HU_SEED) {
    porRareza.set(hu.rareza, (porRareza.get(hu.rareza) ?? 0) + 1);
  }
  const esperado: [RarezaHu, number][] = [
    [COMUN, 42],
    [POCO_COMUN, 20],
    [EPICA, 10],
    [LEGENDARIA, 5]
  ];
  for (const [rareza, cantidad] of esperado) {
    if (porRareza.get(rareza) !== cantidad) {
      throw new Error(`Catálogo HU inconsistente: ${rareza} tiene ${porRareza.get(rareza)}, se esperaban ${cantidad}.`);
    }
  }

  for (const logro of ACHIEVEMENT_CATALOG) {
    await prisma.achievement.upsert({
      where: { id: logro.slug },
      create: {
        id: logro.slug,
        slug: logro.slug,
        title: logro.title,
        description: logro.description,
        category: logro.category
      },
      update: {
        title: logro.title,
        description: logro.description,
        category: logro.category
      }
    });
  }
  console.log(`Logros sincronizados: ${ACHIEVEMENT_CATALOG.length}`);

  for (const hu of HU_SEED) {
    await prisma.habilidadUnica.upsert({
      where: { id: hu.id },
      create: hu,
      update: {
        nombre: hu.nombre,
        descripcion: hu.descripcion,
        rareza: hu.rareza,
        sendasAfines: hu.sendasAfines
      }
    });
  }
  console.log(`Habilidades Únicas sembradas: ${HU_SEED.length} de 77.`);

  // ——— Catálogo de avatares (Parte 2, sección 3.3) ———
  // Los slugs viven en src/data/avatarCatalog.ts, compartidos con el script
  // de optimización, para que las filas sembradas y los .webp generados no
  // puedan desincronizarse. Ampliar el catálogo = agregar una línea allí.
  const avatares = buildAvatarCatalog();
  for (const avatar of avatares) {
    await prisma.avatarOption.upsert({
      where: { slug: avatar.slug },
      create: {
        slug: avatar.slug,
        characterName: avatar.characterName,
        style: avatar.style as AvatarStyle,
        imageUrl: avatar.imageUrl,
        isDefault: avatar.isDefault, // exactamente uno: el fallback de registro
        sortOrder: avatar.sortOrder
      },
      update: {
        characterName: avatar.characterName,
        style: avatar.style as AvatarStyle,
        sortOrder: avatar.sortOrder
      }
    });
  }
  console.log(`Avatares sembrados: ${avatares.length} (default: ${DEFAULT_AVATAR_SLUG}).`);

  // ——— Logros latentes (Parte 2, sección 7.2) — decorativos, sin condición ———
  const placeholders = [
    { id: "latente-1", sortOrder: 1, hintText: "Algo despierta en las profundidades del Vacío…" },
    { id: "latente-2", sortOrder: 2, hintText: "Hay una melodía que solo suena cuando nadie escucha." },
    { id: "latente-3", sortOrder: 3, hintText: "El Velo guarda una puerta que aún no tiene llave." }
  ];
  for (const placeholder of placeholders) {
    await prisma.achievementPlaceholder.upsert({
      where: { id: placeholder.id },
      create: placeholder,
      update: { sortOrder: placeholder.sortOrder, hintText: placeholder.hintText }
    });
  }
  console.log("Logros latentes sembrados: 3.");

  await prisma.$disconnect();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
