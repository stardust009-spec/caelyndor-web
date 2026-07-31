import { NextResponse } from "next/server";
import { z } from "zod";
import { currentUserId } from "@/auth";
import { readJsonBody, tooManyRequests, unauthorized } from "@/lib/server/http";
import { rateLimit } from "@/lib/server/rateLimit";
import { getPrisma } from "@/lib/server/db";
import { ThemePreference } from "@/generated/prisma/client";

export const dynamic = "force-dynamic";

const schema = z.object({
  themePreference: z.enum([ThemePreference.RUBI, ThemePreference.NOCT, ThemePreference.SISTEMA])
});

export async function PATCH(request: Request) {
  const userId = await currentUserId();
  if (!userId) {
    return unauthorized();
  }

  const limited = await rateLimit("theme", userId, 30, 600);
  if (!limited.allowed) {
    return tooManyRequests();
  }

  const body = await readJsonBody(request, 1024);
  if (!body.ok) {
    return body.response;
  }
  const parsed = schema.safeParse(body.body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Tema desconocido" }, { status: 400 });
  }

  await getPrisma().userProfile.update({
    where: { userId },
    data: { themePreference: parsed.data.themePreference }
  });
  return NextResponse.json({ themePreference: parsed.data.themePreference });
}
