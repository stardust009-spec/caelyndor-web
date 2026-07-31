import { NextResponse } from "next/server";
import { currentUserId } from "@/auth";
import { tooManyRequests, unauthorized } from "@/lib/server/http";
import { rateLimit } from "@/lib/server/rateLimit";
import { revealHu } from "@/lib/server/hu";
import { assertNoRestriccion } from "@/lib/server/restrictions";

export const dynamic = "force-dynamic";

const REVEAL_ERRORS: Record<string, { error: string; status: number }> = {
  locked: { error: "La Prueba del Aura Interna se abre a los 25 relatos completados", status: 403 },
  no_senda: { error: "Primero debes completar el Ritual de Afinación", status: 409 },
  empty_catalog: { error: "El catálogo de Habilidades Únicas aún no está disponible", status: 503 }
};

/**
 * Revelación de la Habilidad Única: no recibe nada del cliente más que la
 * autenticación. El servidor calcula las 3 compatibles, sortea una y la
 * asigna en el mismo request. Reintentar devuelve siempre la misma HU.
 */
export async function POST() {
  const userId = await currentUserId();
  if (!userId) {
    return unauthorized();
  }

  const limited = await rateLimit("hu-reveal", userId, 10, 600);
  if (!limited.allowed) {
    return tooManyRequests();
  }

  const restriction = await assertNoRestriccion(userId, "accion");
  if (restriction) {
    return restriction;
  }

  const outcome = await revealHu(userId);
  if (!outcome.ok) {
    const mapped = REVEAL_ERRORS[outcome.error] ?? { error: "Error", status: 400 };
    return NextResponse.json({ error: mapped.error }, { status: mapped.status });
  }
  return NextResponse.json(outcome);
}
