import { NextResponse } from "next/server";
import { currentUserId } from "@/auth";
import { unauthorized } from "@/lib/server/http";
import { getPrisma } from "@/lib/server/db";

export const dynamic = "force-dynamic";

/**
 * Estado de lectura del usuario por relato, para marcar "leído" en las
 * tarjetas y en el relato. Una sola consulta para toda la página.
 */
export async function GET() {
  const userId = await currentUserId();
  if (!userId) {
    return unauthorized();
  }

  const filas = await getPrisma().storyProgress.findMany({
    where: { userId },
    select: { storySlug: true, completedAt: true, highestProgress: true }
  });

  const lecturas: Record<string, { leido: boolean; progreso: number }> = {};
  for (const fila of filas) {
    lecturas[fila.storySlug] = { leido: fila.completedAt !== null, progreso: fila.highestProgress };
  }

  return NextResponse.json({ lecturas }, { headers: { "Cache-Control": "no-store" } });
}
