import { NextResponse } from "next/server";
import { z } from "zod";
import { currentUserId } from "@/auth";
import { readJsonBody, tooManyRequests, unauthorized } from "@/lib/server/http";
import { rateLimit } from "@/lib/server/rateLimit";
import { getPrisma } from "@/lib/server/db";
import { Prisma } from "@/generated/prisma/client";
import { assertNoRestriccion } from "@/lib/server/restrictions";
import {
  ALIAS_MAX_LENGTH,
  evaluarAlias,
  REJECTION_FLAVOR_LINES,
  REJECTION_MESSAGE
} from "@/lib/nameModeration/PlayerNameModerator";

export const dynamic = "force-dynamic";

const schema = z.object({ alias: z.string().trim().min(1).max(ALIAS_MAX_LENGTH + 10) });

export async function POST(request: Request) {
  const userId = await currentUserId();
  if (!userId) {
    return unauthorized();
  }

  const limited = await rateLimit("alias", userId, 10, 600);
  if (!limited.allowed) {
    return tooManyRequests();
  }

  const restriction = await assertNoRestriccion(userId, "accion");
  if (restriction) {
    return restriction;
  }

  const body = await readJsonBody(request, 2 * 1024);
  if (!body.ok) {
    return body.response;
  }
  const parsed = schema.safeParse(body.body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Petición inválida" }, { status: 400 });
  }

  const alias = parsed.data.alias;
  const moderation = evaluarAlias(alias);
  if (!moderation.allowed) {
    // El reason queda en logs internos; el usuario recibe SIEMPRE el mensaje
    // genérico (sin revelar el término, sin repetir el alias rechazado).
    console.warn(`alias: rechazado (${moderation.reason}) user=${userId}`);
    const flavor = REJECTION_FLAVOR_LINES[Math.floor(Math.random() * REJECTION_FLAVOR_LINES.length)];
    return NextResponse.json({ error: REJECTION_MESSAGE, flavor }, { status: 422 });
  }

  const prisma = getPrisma();
  try {
    await prisma.$transaction([
      prisma.userProfile.update({ where: { userId }, data: { alias } }),
      prisma.user.update({ where: { id: userId }, data: { displayName: alias } })
    ]);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return NextResponse.json({ error: "Ese alias ya está en uso" }, { status: 409 });
    }
    throw error;
  }

  return NextResponse.json({ alias });
}
