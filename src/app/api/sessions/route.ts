import { NextResponse } from "next/server";
import { currentAuthContext } from "@/auth";
import { unauthorized } from "@/lib/server/http";
import { getPrisma } from "@/lib/server/db";

export const dynamic = "force-dynamic";

/** Sesiones activas del usuario actual. isCurrent se calcula, no se almacena. */
export async function GET() {
  const ctx = await currentAuthContext();
  if (!ctx) {
    return unauthorized();
  }

  const sesiones = await getPrisma().appSession.findMany({
    where: { userId: ctx.userId, revokedAt: null },
    orderBy: { lastActiveAt: "desc" },
    select: { id: true, deviceLabel: true, locationLabel: true, createdAt: true, lastActiveAt: true }
  });

  return NextResponse.json({
    sesiones: sesiones.map((sesion) => ({
      ...sesion,
      isCurrent: sesion.id === ctx.sessionId
    }))
  });
}
