import { NextResponse } from "next/server";
import { currentUserId } from "@/auth";
import { storyExists } from "@/lib/server/storyContent";
import { estadoQuiz } from "@/lib/server/quiz/servicio";

export const dynamic = "force-dynamic";

const slugPattern = /^[a-z0-9-]{1,80}$/;

/**
 * Estado del cuestionario de una obra para quien consulta. Sin sesión solo
 * informa si existe. Nunca incluye respuestas correctas, salvo la revisión
 * de un cuestionario que esa persona ya aprobó.
 */
export async function GET(_request: Request, { params }: { params: Promise<{ obra: string }> }) {
  const { obra } = await params;
  if (!slugPattern.test(obra) || !storyExists(obra)) {
    return NextResponse.json({ error: "Obra inexistente" }, { status: 404 });
  }
  const userId = await currentUserId();
  const estado = await estadoQuiz(userId, obra);
  return NextResponse.json(estado, { headers: { "Cache-Control": "no-store" } });
}
