import { NextResponse } from "next/server";
import { currentUserId } from "@/auth";
import { tooManyRequests, unauthorized } from "@/lib/server/http";
import { rateLimit } from "@/lib/server/rateLimit";
import { assertNoRestriccion } from "@/lib/server/restrictions";
import { alternarLike } from "@/lib/server/foro";

export const dynamic = "force-dynamic";

const idPattern = /^[a-z0-9]{10,40}$/;

/** Me gusta / quitar me gusta. No existe "no me gusta". */
export async function POST(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const userId = await currentUserId();
  if (!userId) {
    return unauthorized();
  }

  const limited = await rateLimit("foro-like", userId, 60, 60);
  if (!limited.allowed) {
    return tooManyRequests();
  }

  const restriction = await assertNoRestriccion(userId, "accion");
  if (restriction) {
    return restriction;
  }

  const { id } = await params;
  if (!idPattern.test(id)) {
    return NextResponse.json({ error: "Mensaje inexistente" }, { status: 404 });
  }

  const resultado = await alternarLike(userId, id);
  if (!resultado.ok) {
    return resultado.error === "propio"
      ? NextResponse.json({ error: "No puedes darle me gusta a tu propio mensaje" }, { status: 400 })
      : NextResponse.json({ error: "Mensaje inexistente" }, { status: 404 });
  }
  return NextResponse.json({ meGusta: resultado.meGusta, likes: resultado.likes });
}
