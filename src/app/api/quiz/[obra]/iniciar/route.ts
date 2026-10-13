import { NextResponse } from "next/server";
import { z } from "zod";
import { currentUserId } from "@/auth";
import { readJsonBody, tooManyRequests, unauthorized } from "@/lib/server/http";
import { rateLimit } from "@/lib/server/rateLimit";
import { assertNoRestriccion } from "@/lib/server/restrictions";
import { storyExists } from "@/lib/server/storyContent";
import { iniciarIntento } from "@/lib/server/quiz/servicio";

export const dynamic = "force-dynamic";

const slugPattern = /^[a-z0-9-]{1,80}$/;
const schema = z.object({ modalidad: z.enum(["principal", "conexiones"]) });

const ERRORES = {
  no_disponible: { error: "Este cuestionario todavía no está disponible", status: 404 },
  no_leido: { error: "Primero termina de leer el relato", status: 403 },
  principal_pendiente: { error: "Primero aprueba el cuestionario del relato", status: 403 },
  enfriamiento: { error: "Todavía no puedes volver a intentarlo", status: 409 },
  aprobado: { error: "Ya aprobaste este cuestionario", status: 409 }
} as const;

/** Abre un intento (o devuelve el abierto, con las mismas preguntas). */
export async function POST(request: Request, { params }: { params: Promise<{ obra: string }> }) {
  const userId = await currentUserId();
  if (!userId) return unauthorized();

  const limited = await rateLimit("quiz-iniciar", userId, 20, 600);
  if (!limited.allowed) return tooManyRequests();

  const restriction = await assertNoRestriccion(userId, "accion");
  if (restriction) return restriction;

  const { obra } = await params;
  if (!slugPattern.test(obra) || !storyExists(obra)) {
    return NextResponse.json({ error: "Obra inexistente" }, { status: 404 });
  }
  const body = await readJsonBody(request, 512);
  if (!body.ok) return body.response;
  const parsed = schema.safeParse(body.body);
  if (!parsed.success) return NextResponse.json({ error: "Petición inválida" }, { status: 400 });

  const resultado = await iniciarIntento(userId, obra, parsed.data.modalidad);
  if (!resultado.ok) {
    const { error, status } = ERRORES[resultado.error];
    return NextResponse.json({ error }, { status });
  }
  return NextResponse.json({ intento: resultado.intento });
}
