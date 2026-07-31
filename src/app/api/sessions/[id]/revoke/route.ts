import { NextResponse } from "next/server";
import { currentAuthContext } from "@/auth";
import { tooManyRequests, unauthorized } from "@/lib/server/http";
import { rateLimit } from "@/lib/server/rateLimit";
import { getPrisma } from "@/lib/server/db";

export const dynamic = "force-dynamic";

/**
 * Revoca una sesión del propio usuario. La invalidación es inmediata en
 * servidor: currentAuthContext() valida contra la fila AppSession, así que
 * el dispositivo revocado pierde acceso en su siguiente request.
 * Revocar la sesión actual equivale a cerrar sesión (el cliente debe además
 * ejecutar signOut para limpiar su cookie).
 */
export async function POST(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const ctx = await currentAuthContext();
  if (!ctx) {
    return unauthorized();
  }

  const limited = await rateLimit("session-revoke", ctx.userId, 20, 600);
  if (!limited.allowed) {
    return tooManyRequests();
  }

  const { id } = await params;

  // updateMany con userId: nadie revoca sesiones ajenas; idempotente
  // (revocar dos veces la misma sesión no cambia nada).
  const result = await getPrisma().appSession.updateMany({
    where: { id, userId: ctx.userId, revokedAt: null },
    data: { revokedAt: new Date() }
  });

  if (result.count === 0) {
    return NextResponse.json({ error: "Sesión inexistente o ya cerrada" }, { status: 404 });
  }
  return NextResponse.json({ ok: true, eraLaActual: id === ctx.sessionId });
}
