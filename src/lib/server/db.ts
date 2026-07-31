import "server-only";
import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as unknown as { __caelyndorPrisma?: PrismaClient };

/**
 * Cliente Prisma perezoso: no abre conexión al importar el módulo, de modo
 * que `next build` (que importa las rutas al recolectar page data) no exige
 * DATABASE_URL. Timeouts explícitos según docs/aura-magica.md § Integridad.
 */
export function getPrisma(): PrismaClient {
  if (globalForPrisma.__caelyndorPrisma) {
    return globalForPrisma.__caelyndorPrisma;
  }

  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL no está configurada (Vercel Postgres).");
  }

  const adapter = new PrismaPg({
    connectionString,
    max: 5,
    connectionTimeoutMillis: 5_000,
    idleTimeoutMillis: 30_000,
    query_timeout: 8_000,
    statement_timeout: 8_000
  });

  globalForPrisma.__caelyndorPrisma = new PrismaClient({ adapter });
  return globalForPrisma.__caelyndorPrisma;
}

/** Opciones estándar para transacciones interactivas del sistema de Aura. */
export const TX_OPTIONS = { maxWait: 5_000, timeout: 10_000 } as const;
