import { NextResponse } from "next/server";
import { z } from "zod";
import { currentUserId } from "@/auth";
import { readJsonBody, tooManyRequests, unauthorized } from "@/lib/server/http";
import { rateLimit } from "@/lib/server/rateLimit";
import { getPrisma } from "@/lib/server/db";
import { assertNoRestriccion } from "@/lib/server/restrictions";

export const dynamic = "force-dynamic";

const schema = z.object({ avatarId: z.string().min(1).max(60) });

/**
 * Cambio de avatar: SOLO ids del catálogo activo — nunca una URL arbitraria
 * del cliente. Si un avatar se desactiva, quien lo tenía lo conserva, pero
 * aquí ya no se acepta para elecciones nuevas.
 */
export async function POST(request: Request) {
  const userId = await currentUserId();
  if (!userId) {
    return unauthorized();
  }

  const limited = await rateLimit("avatar", userId, 20, 600);
  if (!limited.allowed) {
    return tooManyRequests();
  }

  const restriction = await assertNoRestriccion(userId, "accion");
  if (restriction) {
    return restriction;
  }

  const body = await readJsonBody(request, 1024);
  if (!body.ok) {
    return body.response;
  }
  const parsed = schema.safeParse(body.body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Petición inválida" }, { status: 400 });
  }

  const prisma = getPrisma();
  const avatar = await prisma.avatarOption.findFirst({
    where: { id: parsed.data.avatarId, active: true },
    select: { id: true, slug: true, characterName: true, style: true, imageUrl: true }
  });
  if (!avatar) {
    return NextResponse.json({ error: "Avatar inexistente" }, { status: 404 });
  }

  await prisma.userProfile.update({ where: { userId }, data: { avatarId: avatar.id } });
  return NextResponse.json({ avatar });
}
