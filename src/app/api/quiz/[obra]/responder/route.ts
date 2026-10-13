import { NextResponse } from "next/server";
import { z } from "zod";
import { currentUserId } from "@/auth";
import { readJsonBody, tooManyRequests, unauthorized } from "@/lib/server/http";
import { rateLimit } from "@/lib/server/rateLimit";
import { guardarRespuesta } from "@/lib/server/quiz/servicio";

export const dynamic = "force-dynamic";

const slugPattern = /^[a-z0-9-]{1,80}$/;
const schema = z.object({
  intentoId: z.string().min(10).max(40),
  preguntaId: z.string().min(1).max(60),
  opcion: z.number().int().min(0).max(3)
});

/** Autoguardado de una respuesta: abandonar y volver no pierde nada. */
export async function POST(request: Request, { params }: { params: Promise<{ obra: string }> }) {
  const userId = await currentUserId();
  if (!userId) return unauthorized();

  const limited = await rateLimit("quiz-responder", userId, 120, 600);
  if (!limited.allowed) return tooManyRequests();

  const { obra } = await params;
  if (!slugPattern.test(obra)) return NextResponse.json({ error: "Obra inexistente" }, { status: 404 });

  const body = await readJsonBody(request, 512);
  if (!body.ok) return body.response;
  const parsed = schema.safeParse(body.body);
  if (!parsed.success) return NextResponse.json({ error: "Petición inválida" }, { status: 400 });

  const ok = await guardarRespuesta(userId, obra, parsed.data.intentoId, parsed.data.preguntaId, parsed.data.opcion);
  return ok
    ? NextResponse.json({ ok: true })
    : NextResponse.json({ error: "Este intento ya no está abierto" }, { status: 409 });
}
