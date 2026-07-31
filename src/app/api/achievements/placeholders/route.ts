import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/server/db";

export const dynamic = "force-dynamic";

/**
 * Logros "latentes": siluetas decorativas sin lógica de desbloqueo.
 * Nunca cuentan para la barra de progreso real (tabla separada a propósito).
 */
export async function GET() {
  const placeholders = await getPrisma().achievementPlaceholder.findMany({
    orderBy: { sortOrder: "asc" },
    take: 3,
    select: { id: true, sortOrder: true, hintText: true }
  });
  return NextResponse.json({ placeholders });
}
