import { NextResponse } from "next/server";
import { z } from "zod";
import { currentUserId } from "@/auth";
import { readJsonBody, tooManyRequests, unauthorized } from "@/lib/server/http";
import { rateLimit } from "@/lib/server/rateLimit";
import { assertNoRestriccion } from "@/lib/server/restrictions";
import { crearHilo, normalizarTexto, puedeModerar } from "@/lib/server/foro";
import { LIMITES_FORO, contieneEnlace, getCategoria } from "@/data/foro";

export const dynamic = "force-dynamic";

const schema = z.object({
  categoria: z.string().max(40),
  titulo: z.string().max(LIMITES_FORO.tituloMax * 2),
  cuerpo: z.string().max(LIMITES_FORO.cuerpoMax * 2)
});

/** Abrir un hilo en el Vestíbulo. La fecha la fija el servidor. */
export async function POST(request: Request) {
  const userId = await currentUserId();
  if (!userId) {
    return unauthorized();
  }

  const limited = await rateLimit("foro-hilo", userId, 3, 600);
  if (!limited.allowed) {
    return tooManyRequests();
  }

  const restriction = await assertNoRestriccion(userId, "comentario");
  if (restriction) {
    return restriction;
  }

  const body = await readJsonBody(request, 16 * 1024);
  if (!body.ok) {
    return body.response;
  }
  const parsed = schema.safeParse(body.body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Petición inválida" }, { status: 400 });
  }

  const categoria = getCategoria(parsed.data.categoria);
  if (!categoria) {
    return NextResponse.json({ error: "Sección inexistente" }, { status: 400 });
  }
  if (categoria.soloModeracion && !(await puedeModerar(userId))) {
    return NextResponse.json({ error: "En esta sección solo publica el Archivo" }, { status: 403 });
  }

  const titulo = parsed.data.titulo.replace(/\s+/g, " ").trim();
  const cuerpo = normalizarTexto(parsed.data.cuerpo);
  if (titulo.length < LIMITES_FORO.tituloMin || titulo.length > LIMITES_FORO.tituloMax) {
    return NextResponse.json(
      { error: `El título debe tener entre ${LIMITES_FORO.tituloMin} y ${LIMITES_FORO.tituloMax} caracteres` },
      { status: 400 }
    );
  }
  if (cuerpo.length < LIMITES_FORO.cuerpoMin || cuerpo.length > LIMITES_FORO.cuerpoMax) {
    return NextResponse.json(
      { error: `El mensaje debe tener entre ${LIMITES_FORO.cuerpoMin} y ${LIMITES_FORO.cuerpoMax} caracteres` },
      { status: 400 }
    );
  }
  if (contieneEnlace(titulo) || contieneEnlace(cuerpo)) {
    return NextResponse.json({ error: "Por ahora no se permiten enlaces en el Vestíbulo" }, { status: 400 });
  }

  const id = await crearHilo(userId, categoria.slug, titulo, cuerpo);
  return NextResponse.json({ id });
}
