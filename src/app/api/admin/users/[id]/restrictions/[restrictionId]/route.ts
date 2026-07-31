import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/server/adminGuard";
import { liftRestriction } from "@/lib/server/adminModeration";
import { tooManyRequests } from "@/lib/server/http";
import { clientIp, rateLimit } from "@/lib/server/rateLimit";

export const dynamic = "force-dynamic";

/**
 * Levanta una restricción activa. Mismo camino de verificación redundante
 * que aplicarla — no es una ruta "menor" con menos guardas.
 */
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string; restrictionId: string }> }
) {
  const guard = await requireAdminApi();
  if (!guard.ok) {
    return guard.response;
  }

  const limited = await rateLimit("admin-lift", guard.admin.userId, 30, 600);
  if (!limited.allowed) {
    return tooManyRequests();
  }

  const { id, restrictionId } = await params;
  const outcome = await liftRestriction({
    adminUserId: guard.admin.userId,
    targetUserId: id,
    restrictionId,
    ipAddress: clientIp(request)
  });

  if (!outcome.ok) {
    return NextResponse.json({ error: "Restricción inexistente o ya levantada" }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
