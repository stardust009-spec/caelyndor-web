import { NextResponse } from "next/server";
import { z } from "zod";
import { currentUserId } from "@/auth";
import { readJsonBody, tooManyRequests, unauthorized } from "@/lib/server/http";
import { rateLimit } from "@/lib/server/rateLimit";
import { calcularHUCompatibles, chooseHu } from "@/lib/server/hu";

export const dynamic = "force-dynamic";

const OFFER_ERRORS: Record<string, { error: string; status: number }> = {
  locked: { error: "La Prueba del Aura Interna se abre a los 25 relatos completados", status: 403 },
  no_senda: { error: "Primero debes completar el Ritual de Afinación", status: 409 },
  empty_catalog: { error: "El catálogo de Habilidades Únicas aún no está disponible", status: 503 }
};

const CHOOSE_ERRORS: Record<string, { error: string; status: number }> = {
  no_offer: { error: "Aún no tienes una Prueba del Aura Interna activa", status: 409 },
  not_in_offer: { error: "Esa habilidad no está entre tus tres opciones", status: 400 },
  already_chosen: { error: "Tu Habilidad Única ya forma parte de tu identidad", status: 409 }
};

/** Devuelve (y si hace falta, genera) las 3 opciones de la Prueba. */
export async function GET() {
  const userId = await currentUserId();
  if (!userId) {
    return unauthorized();
  }

  const outcome = await calcularHUCompatibles(userId);
  if (!outcome.ok) {
    const mapped = OFFER_ERRORS[outcome.error] ?? { error: "Error", status: 400 };
    return NextResponse.json({ error: mapped.error }, { status: mapped.status });
  }
  return NextResponse.json(outcome);
}

const chooseSchema = z.object({ habilidadId: z.string().min(1).max(80) });

/** Recibe la elección entre las 3 opciones presentadas (única e irreversible). */
export async function POST(request: Request) {
  const userId = await currentUserId();
  if (!userId) {
    return unauthorized();
  }

  const limited = await rateLimit("hu-choose", userId, 10, 600);
  if (!limited.allowed) {
    return tooManyRequests();
  }

  const body = await readJsonBody(request, 1024);
  if (!body.ok) {
    return body.response;
  }
  const parsed = chooseSchema.safeParse(body.body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Petición inválida" }, { status: 400 });
  }

  const outcome = await chooseHu(userId, parsed.data.habilidadId);
  if (!outcome.ok) {
    const mapped = CHOOSE_ERRORS[outcome.error] ?? { error: "Error", status: 400 };
    return NextResponse.json({ error: mapped.error }, { status: mapped.status });
  }
  return NextResponse.json(outcome);
}
