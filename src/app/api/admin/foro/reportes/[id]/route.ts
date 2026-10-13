import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/server/adminGuard";
import { getPrisma } from "@/lib/server/db";

export const dynamic = "force-dynamic";

const idPattern = /^[a-z0-9]{10,40}$/;

/** Descartar un reporte (el mensaje se queda como está). */
export async function POST(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const guard = await requireAdminApi();
  if (!guard.ok) {
    return guard.response;
  }

  const { id } = await params;
  if (!idPattern.test(id)) {
    return NextResponse.json({ error: "Reporte inexistente" }, { status: 404 });
  }

  const actualizado = await getPrisma().foroReporte.updateMany({
    where: { id, resueltoEn: null },
    data: { resueltoEn: new Date(), resueltoPorId: guard.admin.userId, resolucion: "descartado" }
  });
  if (actualizado.count === 0) {
    return NextResponse.json({ error: "Reporte inexistente o ya resuelto" }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
