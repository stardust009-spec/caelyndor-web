import { NextResponse } from "next/server";
import { z } from "zod";
import { readJsonBody } from "@/lib/server/http";
import { requireAdminApi } from "@/lib/server/adminGuard";
import { getPrisma, TX_OPTIONS } from "@/lib/server/db";

export const dynamic = "force-dynamic";

const schema = z.object({
  accion: z.enum(["ocultar", "mostrar"]),
  motivo: z.string().max(200).optional()
});
const idPattern = /^[a-z0-9]{10,40}$/;

/**
 * Ocultar / volver a mostrar un mensaje. Ocultar nunca borra: el texto se
 * conserva para moderación y los reportes abiertos quedan resueltos.
 */
export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const guard = await requireAdminApi();
  if (!guard.ok) {
    return guard.response;
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
    return NextResponse.json({ error: "Petición inválida" }, { status: 400 });
  }

  const prisma = getPrisma();
  const adminId = guard.admin.userId;
  const existe = await prisma.foroMensaje.findUnique({ where: { id }, select: { id: true } });
  if (!existe) {
    return NextResponse.json({ error: "Mensaje inexistente" }, { status: 404 });
  }

  if (parsed.data.accion === "ocultar") {
    const ahora = new Date();
    await prisma.$transaction(async (tx) => {
      await tx.foroMensaje.update({
        where: { id },
        data: { ocultoEn: ahora, ocultoPorId: adminId, ocultoMotivo: parsed.data.motivo?.trim() || null }
      });
      await tx.foroReporte.updateMany({
        where: { mensajeId: id, resueltoEn: null },
        data: { resueltoEn: ahora, resueltoPorId: adminId, resolucion: "oculto" }
      });
    }, TX_OPTIONS);
  } else {
    await prisma.foroMensaje.update({
      where: { id },
      data: { ocultoEn: null, ocultoPorId: null, ocultoMotivo: null }
    });
  }
  return NextResponse.json({ ok: true });
}
