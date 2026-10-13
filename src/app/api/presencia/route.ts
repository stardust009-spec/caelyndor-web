import { NextResponse } from "next/server";
import { currentAuthContext } from "@/auth";
import { unauthorized } from "@/lib/server/http";

export const dynamic = "force-dynamic";

/**
 * Pulso de presencia: mantiene fresco AppSession.lastActiveAt mientras la
 * pestaña está visible (currentAuthContext lo actualiza, como máximo una
 * vez por minuto). De ahí sale "cronistas en línea" en el foro.
 */
export async function POST() {
  const ctx = await currentAuthContext();
  if (!ctx) {
    return unauthorized();
  }
  return new NextResponse(null, { status: 204 });
}
