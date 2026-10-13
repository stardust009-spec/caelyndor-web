import { NextResponse } from "next/server";
import { z } from "zod";
import { currentUserId } from "@/auth";
import { readJsonBody, tooManyRequests, unauthorized } from "@/lib/server/http";
import { rateLimit } from "@/lib/server/rateLimit";
import { getPrisma } from "@/lib/server/db";
import { assertNoRestriccion } from "@/lib/server/restrictions";
import { getMarco } from "@/data/marcos";

export const dynamic = "force-dynamic";

/** marcoSlug null = quitarse el marco. */
const schema = z.object({ marcoSlug: z.string().min(1).max(80).nullable() });

/**
 * Equipar un marco de avatar: solo del catálogo y solo si el usuario ya tiene
 * el logro que lo desbloquea. El cliente nunca decide qué marcos posee.
 */
export async function POST(request: Request) {
  const userId = await currentUserId();
  if (!userId) {
    return unauthorized();
  }

  const limited = await rateLimit("marco", userId, 30, 600);
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
  const { marcoSlug } = parsed.data;

  if (marcoSlug !== null) {
    const marco = getMarco(marcoSlug);
    if (!marco) {
      return NextResponse.json({ error: "Marco inexistente" }, { status: 404 });
    }
    const tieneLogro = await prisma.userAchievement.findUnique({
      where: { userId_achievementId: { userId, achievementId: marco.logro } },
      select: { id: true }
    });
    if (!tieneLogro) {
      return NextResponse.json({ error: "Ese marco aún no es tuyo" }, { status: 403 });
    }
  }

  await prisma.userProfile.update({ where: { userId }, data: { marcoSlug } });
  return NextResponse.json({ marcoSlug });
}
