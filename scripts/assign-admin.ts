/**
 * Asignación MANUAL del rol admin (Parte 3, sección 2). Este es el ÚNICO
 * mecanismo para otorgar role=ADMIN: ningún endpoint de la aplicación puede
 * hacerlo. Ejecutar una vez, a mano:
 *
 *   npx tsx scripts/assign-admin.ts correo@ejemplo.com
 *
 * Recuerda que además el correo debe estar en ADMIN_EMAIL_ALLOWLIST
 * (src/lib/adminAccess.ts) — sin ambas capas no hay acceso.
 */
import "dotenv/config";
import { PrismaClient, UserRole } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { ADMIN_EMAIL_ALLOWLIST } from "../src/lib/adminAccess";

async function main() {
  const email = process.argv[2]?.toLowerCase();
  if (!email) {
    console.error("Uso: npx tsx scripts/assign-admin.ts <email>");
    process.exit(1);
  }
  if (!ADMIN_EMAIL_ALLOWLIST.includes(email)) {
    console.error(
      `Advertencia: ${email} NO está en ADMIN_EMAIL_ALLOWLIST (src/lib/adminAccess.ts).\n` +
        "El rol se asignará igualmente, pero esAdminAutorizado() lo rechazará hasta que lo agregues allí."
    );
  }

  const url =
    process.env.DATABASE_URL_UNPOOLED ??
    process.env.POSTGRES_URL_NON_POOLING ??
    process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL no está definida.");
  }

  const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString: url }) });
  const result = await prisma.user.updateMany({
    where: { email },
    data: { role: UserRole.ADMIN }
  });

  if (result.count === 0) {
    console.error(`No existe una cuenta con el email ${email}. Regístrala primero en /cuenta.`);
    process.exit(1);
  }
  console.log(`Rol ADMIN asignado a ${email}. El 2FA se configura en el primer acceso a /admin.`);
  await prisma.$disconnect();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
