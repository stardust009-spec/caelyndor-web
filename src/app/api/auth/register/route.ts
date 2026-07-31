import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { Prisma } from "@/generated/prisma/client";
import { getPrisma } from "@/lib/server/db";
import { readJsonBody, tooManyRequests } from "@/lib/server/http";
import { clientIp, rateLimit } from "@/lib/server/rateLimit";

export const dynamic = "force-dynamic";

const registerSchema = z.object({
  email: z.string().email("Email inválido").max(254).toLowerCase(),
  password: z
    .string()
    .min(10, "La contraseña necesita al menos 10 caracteres")
    .max(200),
  displayName: z.string().trim().min(3, "Nombre demasiado corto").max(40)
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
  const passwordHash = await bcrypt.hash(password, 12);

  try {
    const user = await getPrisma().user.create({
      data: { email, passwordHash, displayName },
      select: { id: true, email: true, displayName: true, createdAt: true }
    });
    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return NextResponse.json({ error: "Ese email ya está registrado" }, { status: 409 });
    }
    console.error("register:", error);
    return NextResponse.json({ error: "Error al crear la cuenta" }, { status: 500 });
  }
}
