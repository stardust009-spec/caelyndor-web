import { NextResponse } from "next/server";
import { AdminAccessAction } from "@/generated/prisma/client";
import { logAdminAccess, requireAdminApi } from "@/lib/server/adminGuard";
import { getPrisma } from "@/lib/server/db";
import { rankLabel } from "@/lib/server/ranks";
import { toCsv, type CsvColumn } from "@/lib/csv";
import { tooManyRequests } from "@/lib/server/http";
import { rateLimit } from "@/lib/server/rateLimit";

export const dynamic = "force-dynamic";

type ExportRow = {
  alias: string | null;
  email: string;
  pais: string | null;
  ciudad: string | null;
  comuna: string | null;
  rango: string;
  fechaRegistro: Date;
};

/**
 * Columnas del export (Parte 3, sección 7.4). Minimización aplicada también a
 * la SALIDA, no solo a lo que se guarda: se incluye lo que tiene un propósito
 * declarado (boletines + despacho de libros físicos) y nada más. En concreto
 * quedan FUERA a propósito nombre, apellidos y fecha de nacimiento, que sí
 * existen en UserProfile pero no hacen falta para esos dos usos.
 */
const COLUMNS: CsvColumn<ExportRow>[] = [
  { header: "alias", value: (row) => row.alias ?? "" },
  { header: "email", value: (row) => row.email },
  { header: "pais", value: (row) => row.pais ?? "" },
  { header: "ciudad", value: (row) => row.ciudad ?? "" },
  { header: "comuna", value: (row) => row.comuna ?? "" },
  { header: "rango", value: (row) => row.rango },
  // ISO corto (YYYY-MM-DD): ordena bien en Excel y no depende de la localización.
  { header: "fechaRegistro", value: (row) => row.fechaRegistro.toISOString().slice(0, 10) }
];

export async function GET() {
  const guard = await requireAdminApi();
  if (!guard.ok) {
    return guard.response;
  }

  const limited = await rateLimit("admin-export", guard.admin.userId, 10, 3600);
  if (!limited.allowed) {
    return tooManyRequests();
  }

  const users = await getPrisma().user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      email: true,
      createdAt: true,
      currentRank: true,
      profile: { select: { alias: true, pais: true, ciudad: true, comuna: true } }
    }
  });

  const rows: ExportRow[] = users.map((user) => ({
    alias: user.profile?.alias ?? null,
    email: user.email,
    pais: user.profile?.pais ?? null,
    ciudad: user.profile?.ciudad ?? null,
    comuna: user.profile?.comuna ?? null,
    rango: rankLabel(user.currentRank),
    fechaRegistro: user.createdAt
  }));

  const csv = toCsv(rows, COLUMNS);

  // Una sola fila de auditoría por exportación, con el total incluido.
  await logAdminAccess(AdminAccessAction.EXPORT_USERS, guard.admin.userId, null, rows.length);

  const fecha = new Date().toISOString().slice(0, 10);
  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="caelyndor-usuarios-${fecha}.csv"`,
      // Datos personales: que no queden en ninguna caché intermedia.
      "Cache-Control": "no-store, no-cache, must-revalidate, private"
    }
  });
}
