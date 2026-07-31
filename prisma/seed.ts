/**
 * Seed idempotente: sincroniza el catálogo de logros (fuente de verdad en
 * src/lib/server/achievementCatalog.ts) y siembra el catálogo inicial de
 * Habilidades Únicas. Ejecutar con: npm run db:seed (requiere DATABASE_URL).
 */
import "dotenv/config";
import { PrismaClient, RarezaHu, Senda } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { ACHIEVEMENT_CATALOG } from "../src/lib/server/achievementCatalog";

const { LLAMA, AGUA, HIELO, AIRE, TIERRA, VIDA, CONEXION, TRUENO, VACIO, FE } = Senda;
const { COMUN, INFRECUENTE, RARA, SINGULAR } = RarezaHu;

/**
 * Subconjunto inicial del catálogo de 77 HU.
 * TODO(contenido): completar las 77 habilidades con sus fichas canónicas;
 * esto es trabajo editorial, no de código — basta añadir filas aquí.
 */
const HU_SEED: {
  id: string;
  nombre: string;
  descripcion: string;
  rareza: RarezaHu;
  sendasAfines: Senda[];
}[] = [
  { id: "corazon-de-brasa", nombre: "Corazón de Brasa", descripcion: "El Aura arde sin consumirse: cada revés alimenta tu siguiente impulso.", rareza: COMUN, sendasAfines: [LLAMA] },
  { id: "paso-de-ceniza", nombre: "Paso de Ceniza", descripcion: "Avanzas donde otros ya se rindieron; el suelo quemado te reconoce.", rareza: INFRECUENTE, sendasAfines: [LLAMA, TIERRA] },
  { id: "marea-interior", nombre: "Marea Interior", descripcion: "Tu calma sube y baja con propósito: nada te arrastra sin permiso.", rareza: COMUN, sendasAfines: [AGUA] },
  { id: "espejo-de-lluvia", nombre: "Espejo de Lluvia", descripcion: "Reflejas la intención ajena antes de que se vuelva acción.", rareza: RARA, sendasAfines: [AGUA, CONEXION] },
  { id: "silencio-de-escarcha", nombre: "Silencio de Escarcha", descripcion: "Donde pisas, el ruido se detiene: piensas en un mundo congelado.", rareza: COMUN, sendasAfines: [HIELO] },
  { id: "aliento-boreal", nombre: "Aliento Boreal", descripcion: "El frío no te muerde: te escolta.", rareza: INFRECUENTE, sendasAfines: [HIELO, AIRE] },
  { id: "vereda-invisible", nombre: "Vereda Invisible", descripcion: "Siempre existe un camino más; tú lo ves primero.", rareza: COMUN, sendasAfines: [AIRE] },
  { id: "danza-de-corrientes", nombre: "Danza de Corrientes", descripcion: "El viento organiza tus movimientos mejor que cualquier plan.", rareza: INFRECUENTE, sendasAfines: [AIRE, AGUA] },
  { id: "raiz-profunda", nombre: "Raíz Profunda", descripcion: "Nada de lo que amas se pierde mientras tú sigas en pie.", rareza: COMUN, sendasAfines: [TIERRA] },
  { id: "memoria-de-piedra", nombre: "Memoria de Piedra", descripcion: "Lo que tocas recuerda; lo que recuerdas, permanece.", rareza: RARA, sendasAfines: [TIERRA, VACIO] },
  { id: "pulso-verde", nombre: "Pulso Verde", descripcion: "La vida responde a tu cercanía: lo herido cicatriza antes.", rareza: COMUN, sendasAfines: [VIDA] },
  { id: "jardin-de-auroras", nombre: "Jardín de Auroras", descripcion: "Donde descansas, florece un refugio para otros.", rareza: INFRECUENTE, sendasAfines: [VIDA, CONEXION] },
  { id: "hilo-de-almas", nombre: "Hilo de Almas", descripcion: "Sientes el tirón del vínculo antes de que la palabra llegue.", rareza: RARA, sendasAfines: [CONEXION] },
  { id: "eco-compartido", nombre: "Eco Compartido", descripcion: "Lo que aprendes puede prestarse; lo que prestas, vuelve crecido.", rareza: SINGULAR, sendasAfines: [CONEXION, FE] },
  { id: "chispa-anticipada", nombre: "Chispa Anticipada", descripcion: "Tu decisión llega un latido antes que el peligro.", rareza: RARA, sendasAfines: [TRUENO] },
  { id: "tormenta-contenida", nombre: "Tormenta Contenida", descripcion: "Guardas el estallido hasta el instante exacto en que importa.", rareza: SINGULAR, sendasAfines: [TRUENO, LLAMA] },
  { id: "mirada-del-umbral", nombre: "Mirada del Umbral", descripcion: "Ves los bordes de las cosas: donde terminan y donde podrían seguir.", rareza: RARA, sendasAfines: [VACIO] },
  { id: "paso-entre-velos", nombre: "Paso entre Velos", descripcion: "Lo innombrado no te expulsa: te deja pasar.", rareza: SINGULAR, sendasAfines: [VACIO, HIELO] },
  { id: "voto-inquebrantable", nombre: "Voto Inquebrantable", descripcion: "Tu palabra sostiene más peso del que la física permite.", rareza: RARA, sendasAfines: [FE] },
  { id: "luz-que-no-titubea", nombre: "Luz que no Titubea", descripcion: "En la oscuridad total, tu certeza ilumina lo suficiente para un paso más.", rareza: SINGULAR, sendasAfines: [FE, VIDA] }
];

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL no está definida.");
  }
  const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString: url }) });

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
  console.log(`Habilidades Únicas sembradas: ${HU_SEED.length} (de 77 previstas)`);

  await prisma.$disconnect();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
