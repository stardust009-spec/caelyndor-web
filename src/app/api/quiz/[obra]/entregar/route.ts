import { NextResponse } from "next/server";
import { z } from "zod";
import { currentUserId } from "@/auth";
import { readJsonBody, tooManyRequests, unauthorized } from "@/lib/server/http";
import { rateLimit } from "@/lib/server/rateLimit";
import { assertNoRestriccion } from "@/lib/server/restrictions";
import { entregarIntento } from "@/lib/server/quiz/servicio";

export const dynamic = "force-dynamic";

const slugPattern = /^[a-z0-9-]{1,80}$/;
const schema = z.object({ intentoId: z.string().min(10).max(40) });

/**
 * Entrega y corrige. Aprobado: EXP (una sola vez) y revisión con
 * explicaciones. Reprobado: 7 días de espera y un personaje que interfiere;
 * no se revela cuáles fallaron.
 */
export async function POST(request: Request, { params }: { params: Promise<{ obra: string }> }) {
  const userId = await currentUserId();
  if (!userId) return unauthorized();

  const limited = await rateLimit("quiz-entregar", userId, 10, 600);
  if (!limited.allowed) return tooManyRequests();

  const restriction = await assertNoRestriccion(userId, "accion");
  if (restriction) return restriction;

  const { obra } = await params;
  if (!slugPattern.test(obra)) return NextResponse.json({ error: "Obra inexistente" }, { status: 404 });

  const body = await readJsonBody(request, 512);
  if (!body.ok) return body.response;
  const parsed = schema.safeParse(body.body);
  if (!parsed.success) return NextResponse.json({ error: "Petición inválida" }, { status: 400 });

  const resultado = await entregarIntento(userId, obra, parsed.data.intentoId);
  if (!resultado.ok) {
    return NextResponse.json({ error: "Este intento ya no está abierto" }, { status: 409 });
  }
  return NextResponse.json(resultado);
}
