import { NextResponse } from "next/server";
import { generateSecret, generateURI } from "otplib";
import { requireAdminSin2fa } from "@/lib/server/adminGuard";
import { getPrisma } from "@/lib/server/db";
import { rateLimit } from "@/lib/server/rateLimit";
import { tooManyRequests } from "@/lib/server/http";

export const dynamic = "force-dynamic";

/**
 * Genera (una sola vez) el secreto TOTP de la cuenta admin y devuelve la URI
 * otpauth:// para registrarla en la app autenticadora. Si ya hay un secreto
 * CONFIRMADO, no se regenera desde aquí (rotarlo sería intervención manual).
 */
export async function POST() {
  const guard = await requireAdminSin2fa();
  if (!guard.ok) {
    return guard.response;
  }

  const limited = await rateLimit("2fa-setup", guard.admin.userId, 10, 600);
  if (!limited.allowed) {
    return tooManyRequests();
  }

  const prisma = getPrisma();
  const user = await prisma.user.findUniqueOrThrow({
    where: { id: guard.admin.userId },
    select: { totpSecret: true, totpConfirmedAt: true, email: true }
  });

  if (user.totpConfirmedAt) {
    return NextResponse.json({ error: "El 2FA ya está configurado" }, { status: 409 });
  }

  const secret = user.totpSecret ?? generateSecret();
  if (!user.totpSecret) {
    await prisma.user.update({ where: { id: guard.admin.userId }, data: { totpSecret: secret } });
  }

  return NextResponse.json({
    otpauthUri: generateURI({ issuer: "Caelyndor Admin", label: user.email, secret }),
    secret
  });
}
