import "dotenv/config";
import { defineConfig } from "prisma/config";

// Prisma 7 no carga .env automáticamente: dotenv/config lee .env.
// DATABASE_URL debe apuntar a Vercel Postgres (ver README).
export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: process.env.DATABASE_URL ?? "postgresql://pendiente:configure@localhost:5432/caelyndor"
  },
  migrations: {
    path: "prisma/migrations",
    seed: "npx tsx prisma/seed.ts"
  }
});
