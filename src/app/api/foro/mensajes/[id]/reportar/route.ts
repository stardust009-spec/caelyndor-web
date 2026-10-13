import { NextResponse } from "next/server";
import { z } from "zod";
import { currentUserId } from "@/auth";
import { readJsonBody, tooManyRequests, unauthorized } from "@/lib/server/http";
import { rateLimit } from "@/lib/server/rateLimit";
import { reportarMensaje } from "@/lib/server/foro";
import { LIMITES_FORO, MOTIVOS_REPORTE } from "@/data/foro";

export const dynamic = "force-dynamic";

const motivos = MOTIVOS_REPORTE.map((motivo) => motivo.valor) as [string, ...string[]];
const schema = z.object({
  motivo: z.enum(motivos),
  detalle: z.string().max(LIMITES_FORO.detalleReporteMax).optional()
});
const idPattern = /^[a-z0-9]{10,40}$/;

/** Reportar un mensaje a moderación (uno por persona y mensaje). */
export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const userId = await currentUserId();
  if (!userId) {
    return unauthorized();
  }

  const limited = await rateLimit("foro-reporte", userId, 10, 3600);
  if (!limited.allowed) {
    return tooManyRequests();
  }

  const { id } = await params;
  if (!idPattern.test(id)) {
    return NextResponse.json({ error: "Mensaje inexistente" }, { status: 404 });
  }

  const body = await readJsonBody(request, 2048);
  if (!body.ok) {
    return body.response;
  }
  const parsed = schema.safeParse(body.body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Elige un motivo" }, { status: 400 });
  }

  const detalle = parsed.data.detalle?.trim() || null;
  const resultado = await reportarMensaje(userId, id, parsed.data.motivo, detalle);
  if (!resultado.ok) {
    const mensajes = {
      no_existe: { error: "Mensaje inexistente", status: 404 },
      propio: { error: "No puedes reportar tu propio mensaje", status: 400 },
      repetido: { error: "Ya habías reportado este mensaje", status: 409 }
    } as const;
    const { error, status } = mensajes[resultado.error];
    return NextResponse.json({ error }, { status });
  }
  return NextResponse.json({ ok: true });
}
