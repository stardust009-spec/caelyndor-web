import { NextResponse } from "next/server";
import { z } from "zod";
import { RestrictionType } from "@/generated/prisma/client";
import { requireAdminApi } from "@/lib/server/adminGuard";
import { applyRestriction } from "@/lib/server/adminModeration";
import { readJsonBody, tooManyRequests } from "@/lib/server/http";
import { clientIp, rateLimit } from "@/lib/server/rateLimit";

export const dynamic = "force-dynamic";

const schema = z.object({
  type: z.enum([
    RestrictionType.ACCION_SILENCIADA,
    RestrictionType.COMENTARIO_SILENCIADO,
    RestrictionType.BAN_COMPLETO
  ]),
  reason: z.string().trim().min(3).max(500),
  expiresAt: z.string().datetime().nullish()
});

const ERRORS: Record<string, { error: string; status: number }> = {
  self_restriction: { error: "La cuenta admin no puede restringirse a sí misma", status: 400 },
  target_not_found: { error: "Usuario inexistente", status: 404 },
  already_active: { error: "Ya existe una restricción vigente de ese tipo", status: 409 }
};

/** Aplica una restricción { type, reason, expiresAt? } sobre el usuario :id. */
export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const guard = await requireAdminApi();
  if (!guard.ok) {
    return guard.response;
  }

  const limited = await rateLimit("admin-restrict", guard.admin.userId, 30, 600);
  if (!limited.allowed) {
    return tooManyRequests();
  }

  const body = await readJsonBody(request, 4 * 1024);
  if (!body.ok) {
    return body.response;
  }
  const parsed = schema.safeParse(body.body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Petición inválida" }, { status: 400 });
  }

  const { id } = await params;
  const outcome = await applyRestriction({
    adminUserId: guard.admin.userId,
    targetUserId: id,
    type: parsed.data.type,
    reason: parsed.data.reason,
    expiresAt: parsed.data.expiresAt ? new Date(parsed.data.expiresAt) : null,
    ipAddress: clientIp(request)
  });

  if (!outcome.ok) {
    const mapped = ERRORS[outcome.error] ?? { error: "Error", status: 400 };
    return NextResponse.json({ error: mapped.error }, { status: mapped.status });
  }
  return NextResponse.json({ ok: true, restrictionId: outcome.restrictionId }, { status: 201 });
}
