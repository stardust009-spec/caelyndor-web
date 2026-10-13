import "server-only";
import type { Prisma } from "@/generated/prisma/client";
import { getStoryMetaMap } from "./storyContent";
import { EXP_POR } from "./niveles";

type Tx = Prisma.TransactionClient;

/** Recalcula la caché User.exp desde el libro mayor (fuente de verdad). */
async function recalcularExp(tx: Tx, userId: string): Promise<number> {
  const suma = await tx.expLedger.aggregate({ where: { userId }, _sum: { cantidad: true } });
  const exp = suma._sum.cantidad ?? 0;
  await tx.user.update({ where: { id: userId }, data: { exp } });
  return exp;
}

/**
 * Entrega EXP una sola vez por clave. Idempotente: el unique (userId, clave)
 * + skipDuplicates hacen que un reintento no sume nada. Devuelve la EXP
 * efectivamente entregada (0 si la clave ya existía).
 */
export async function otorgarExp(tx: Tx, userId: string, clave: string, cantidad: number): Promise<number> {
  const creado = await tx.expLedger.createMany({
    data: [{ userId, clave, cantidad }],
    skipDuplicates: true
  });
  if (creado.count === 0) {
    return 0;
  }
  await recalcularExp(tx, userId);
  return cantidad;
}

/**
 * Asegura que cada relato canónico completado tenga su EXP de lectura.
 * Cubre a quien completó relatos antes de que existiera la EXP (y cualquier
 * hueco futuro). Idempotente; se llama al abrir el perfil.
 */
export async function sincronizarExpLecturas(tx: Tx, userId: string): Promise<void> {
  const historias = getStoryMetaMap();
  const completados = await tx.storyProgress.findMany({
    where: { userId, completedAt: { not: null } },
    select: { storySlug: true }
  });
  const data = completados
    .filter((row) => historias.get(row.storySlug)?.canonical)
    .map((row) => ({ userId, clave: `lectura:${row.storySlug}`, cantidad: EXP_POR.lectura }));
  if (data.length === 0) {
    return;
  }
  const creado = await tx.expLedger.createMany({ data, skipDuplicates: true });
  if (creado.count > 0) {
    await recalcularExp(tx, userId);
  }
}
