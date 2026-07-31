import { NextResponse } from "next/server";
import { verify } from "otplib";
import { z } from "zod";
import { requireAdminSin2fa } from "@/lib/server/adminGuard";
import { getPrisma } from "@/lib/server/db";
import { rateLimit } from "@/lib/server/rateLimit";
import { readJsonBody, tooManyRequests } from "@/lib/server/http";

export const dynamic = "force-dynamic";

const schema = z.object({ code: z.string().regex(/^\d{6}$/) });

/**
 * Verifica el código TOTP y marca ESTA sesión como admin-verificada
 * (ventana de 4 h — más corta que la sesión general del sitio).
 */
export async function POST(request: Request) {
  const guard = await requireAdminSin2fa();
  if (!guard.ok) {
    return guard.response;
  }

  const limited = await rateLimit("2fa-verify", guard.admin.userId, 10, 300);
  if (!limited.allowed) {
    return tooManyRequests();
  }

  const body = await readJsonBody(request, 1024);
  if (!body.ok) {
    return body.response;
  }
  const parsed = schema.safeParse(body.body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Código inválido" }, { status: 400 });
  }

  const prisma = getPrisma();
  const user = await prisma.user.findUniqueOrThrow({
    where: { id: guard.admin.userId },
    select: { totpSecret: true, totpConfirmedAt: true }
  });
  if (!user.totpSecret) {
    return NextResponse.json({ error: "Primero configura el 2FA" }, { status: 409 });
  }

  const verification = await verify({ secret: user.totpSecret, token: parsed.data.code });
  if (!verification.valid) {
    return NextResponse.json({ error: "Código incorrecto" }, { status: 401 });
  }

  await prisma.$transaction([
    ...(user.totpConfirmedAt
      ? []
      : [prisma.user.update({ where: { id: guard.admin.userId }, data: { totpConfirmedAt: new Date() } })]),
    prisma.appSession.update({
      where: { id: guard.admin.sessionId },
      data: { adminVerifiedAt: new Date() }
    })
  ]);

  return NextResponse.json({ ok: true });
}
