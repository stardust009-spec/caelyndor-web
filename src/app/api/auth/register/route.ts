import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { Prisma } from "@/generated/prisma/client";
import { getPrisma, TX_OPTIONS } from "@/lib/server/db";
import { readJsonBody, tooManyRequests } from "@/lib/server/http";
import { clientIp, rateLimit } from "@/lib/server/rateLimit";
import {
  ALIAS_MAX_LENGTH,
  ALIAS_MIN_LENGTH,
  evaluarAlias,
  REJECTION_MESSAGE
} from "@/lib/nameModeration/PlayerNameModerator";

export const dynamic = "force-dynamic";

const registerSchema = z.object({
  email: z.string().email("Email inválido").max(254).toLowerCase(),
  password: z
    .string()
    .min(10, "La contraseña necesita al menos 10 caracteres")
    .max(200),
  /** Alias público (moderado). Se acepta como displayName por compatibilidad. */
  displayName: z.string().trim().min(ALIAS_MIN_LENGTH).max(ALIAS_MAX_LENGTH)
});

export async function POST(request: Request) {
  const limited = await rateLimit("register", clientIp(request), 5, 600);
  if (!limited.allowed) {
    return tooManyRequests();
  }

  const body = await readJsonBody(request, 4 * 1024);
  if (!body.ok) {
    return body.response;
  }

  const parsed = registerSchema.safeParse(body.body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Datos inválidos" },
      { status: 400 }
    );
  }

  const { email, password, displayName } = parsed.data;

  // El alias pasa por PlayerNameModerator ANTES de guardar; el reason queda
  // en logs del servidor, el usuario solo ve el mensaje genérico.
  const moderation = evaluarAlias(displayName);
  if (!moderation.allowed) {
    console.warn(`register: alias rechazado (${moderation.reason})`);
    return NextResponse.json({ error: REJECTION_MESSAGE }, { status: 422 });
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const prisma = getPrisma();

  try {
    const user = await prisma.$transaction(async (tx) => {
      const defaultAvatar = await tx.avatarOption.findFirst({
        where: { isDefault: true, active: true },
        select: { id: true }
      });
      return tx.user.create({
        data: {
          email,
          passwordHash,
          displayName,
          profile: {
            create: {
              alias: displayName,
              avatarId: defaultAvatar?.id ?? null
            }
          }
        },
        select: { id: true, email: true, displayName: true, createdAt: true }
      });
    }, TX_OPTIONS);
    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      const target = String(error.meta?.target ?? "");
      if (target.includes("alias")) {
        return NextResponse.json({ error: "Ese alias ya está en uso" }, { status: 409 });
      }
      return NextResponse.json({ error: "Ese email ya está registrado" }, { status: 409 });
    }
    console.error("register:", error);
    return NextResponse.json({ error: "Error al crear la cuenta" }, { status: 500 });
  }
}
