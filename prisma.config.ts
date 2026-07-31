import "dotenv/config";
import { defineConfig } from "prisma/config";

// Prisma 7 no carga .env automáticamente: dotenv/config lee .env.
// DATABASE_URL debe apuntar a Vercel Postgres (ver README).
export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    // Migraciones e introspección van por la conexión directa (sin pgbouncer):
    // Prisma Migrate usa advisory locks que el pooler de Neon no soporta bien.
    url:
      process.env.DATABASE_URL_UNPOOLED ??
      process.env.POSTGRES_URL_NON_POOLING ??
      process.env.DATABASE_URL ??
      "postgresql://pendiente:configure@localhost:5432/caelyndor"
  },
  migrations: {
    path: "prisma/migrations",
    seed: "npx tsx prisma/seed.ts"
  }
});
