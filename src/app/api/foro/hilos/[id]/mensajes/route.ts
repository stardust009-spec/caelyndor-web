import { NextResponse } from "next/server";
import { z } from "zod";
import { currentUserId } from "@/auth";
import { readJsonBody, tooManyRequests, unauthorized } from "@/lib/server/http";
import { rateLimit } from "@/lib/server/rateLimit";
import { assertNoRestriccion } from "@/lib/server/restrictions";
import { normalizarTexto, responderHilo } from "@/lib/server/foro";
import { ERROR_ENLACE, LIMITES_FORO, contieneEnlaceNoPermitido } from "@/data/foro";

export const dynamic = "force-dynamic";

const schema = z.object({ cuerpo: z.string().max(LIMITES_FORO.cuerpoMax * 2) });
const idPattern = /^[a-z0-9]{10,40}$/;

/** Responder un hilo. La fecha la fija el servidor. */
export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const userId = await currentUserId();
  if (!userId) {
    return unauthorized();
  }

  const limited = await rateLimit("foro-mensaje", userId, 10, 300);
  if (!limited.allowed) {
    return tooManyRequests();
  }

  const restriction = await assertNoRestriccion(userId, "comentario");
  if (restriction) {
    return restriction;
  }

  const { id } = await params;
  if (!idPattern.test(id)) {
    return NextResponse.json({ error: "Hilo inexistente" }, { status: 404 });
  }

  const body = await readJsonBody(request, 16 * 1024);
  if (!body.ok) {
    return body.response;
  }
  const parsed = schema.safeParse(body.body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Petición inválida" }, { status: 400 });
  }

  const cuerpo = normalizarTexto(parsed.data.cuerpo);
  if (cuerpo.length < LIMITES_FORO.cuerpoMin || cuerpo.length > LIMITES_FORO.cuerpoMax) {
    return NextResponse.json(
      { error: `El mensaje debe tener entre ${LIMITES_FORO.cuerpoMin} y ${LIMITES_FORO.cuerpoMax} caracteres` },
      { status: 400 }
    );
  }
  if (contieneEnlaceNoPermitido(cuerpo)) {
    return NextResponse.json({ error: ERROR_ENLACE }, { status: 400 });
  }

  const resultado = await responderHilo(userId, id, cuerpo);
  if (!resultado.ok) {
    return resultado.error === "cerrado"
      ? NextResponse.json({ error: "Este hilo está cerrado" }, { status: 409 })
      : NextResponse.json({ error: "Hilo inexistente" }, { status: 404 });
  }
  return NextResponse.json({ id: resultado.id });
}
