import { NextResponse } from "next/server";
import { z } from "zod";
import { readJsonBody } from "@/lib/server/http";
import { requireAdminApi } from "@/lib/server/adminGuard";
import { getPrisma } from "@/lib/server/db";

export const dynamic = "force-dynamic";

const schema = z.object({
  accion: z.enum(["fijar", "desfijar", "cerrar", "abrir", "ocultar", "mostrar"]),
  motivo: z.string().max(200).optional()
});
const idPattern = /^[a-z0-9]{10,40}$/;

/** Moderación de un hilo: fijar, cerrar a respuestas u ocultar (nunca borrar). */
export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const guard = await requireAdminApi();
  if (!guard.ok) {
    return guard.response;
  }

  const { id } = await params;
  if (!idPattern.test(id)) {
    return NextResponse.json({ error: "Hilo inexistente" }, { status: 404 });
  }
  const body = await readJsonBody(request, 2048);
  if (!body.ok) {
    return body.response;
  }
  const parsed = schema.safeParse(body.body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Petición inválida" }, { status: 400 });
  }

  const prisma = getPrisma();
  const existe = await prisma.foroHilo.findUnique({ where: { id }, select: { id: true } });
  if (!existe) {
    return NextResponse.json({ error: "Hilo inexistente" }, { status: 404 });
  }

  const motivo = parsed.data.motivo?.trim() || null;
  const datos = {
    fijar: { fijado: true },
    desfijar: { fijado: false },
    cerrar: { cerrado: true },
    abrir: { cerrado: false },
    ocultar: { ocultoEn: new Date(), ocultoPorId: guard.admin.userId, ocultoMotivo: motivo },
    mostrar: { ocultoEn: null, ocultoPorId: null, ocultoMotivo: null }
  }[parsed.data.accion];

  await prisma.foroHilo.update({ where: { id }, data: datos });
  return NextResponse.json({ ok: true });
}
