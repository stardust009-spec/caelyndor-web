import { NextResponse } from "next/server";
import { z } from "zod";
import { currentUserId } from "@/auth";
import { readJsonBody, tooManyRequests, unauthorized } from "@/lib/server/http";
import { rateLimit } from "@/lib/server/rateLimit";
import { applyProgressUpdate } from "@/lib/server/progress";
import { storyExists } from "@/lib/server/storyContent";

export const dynamic = "force-dynamic";

const slugPattern = /^[a-z0-9-]{1,80}$/;

const progressSchema = z.object({
  /** Progreso 0-100. El cliente lo envía con throttle (cada ~5% o pocos
   *  segundos); el salto a "completado" SIEMPRE lo decide el servidor. */
  progress: z.number().min(0).max(100)
});

export async function POST(request: Request, { params }: { params: Promise<{ storyId: string }> }) {
  const userId = await currentUserId();
  if (!userId) {
    return unauthorized();
  }

  const limited = await rateLimit("progress", userId, 30, 60);
  if (!limited.allowed) {
    return tooManyRequests();
  }

  const { storyId } = await params;
  // Formato válido no basta: el relato debe existir de verdad en el contenido.
  if (!slugPattern.test(storyId) || !storyExists(storyId)) {
    return NextResponse.json({ error: "Relato inexistente" }, { status: 404 });
  }

  const body = await readJsonBody(request, 1024);
  if (!body.ok) {
    return body.response;
  }
  const parsed = progressSchema.safeParse(body.body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Progreso inválido" }, { status: 400 });
  }

  try {
    const result = await applyProgressUpdate(userId, storyId, parsed.data.progress);
    return NextResponse.json(result);
  } catch (error) {
    console.error("progress:", error);
    return NextResponse.json({ error: "Error al guardar el progreso" }, { status: 500 });
  }
}
