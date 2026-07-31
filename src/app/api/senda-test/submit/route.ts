import { NextResponse } from "next/server";
import { z } from "zod";
import { currentUserId } from "@/auth";
import { readJsonBody, tooManyRequests, unauthorized } from "@/lib/server/http";
import { rateLimit } from "@/lib/server/rateLimit";
import { chooseSendaManually, submitSendaTest } from "@/lib/server/sendaTestService";
import { assertNoRestriccion } from "@/lib/server/restrictions";

export const dynamic = "force-dynamic";

const submitSchema = z.union([
  z.object({ respuestas: z.record(z.string().max(40), z.string().max(40)) }),
  /** Corrección manual única sobre el resultado del cristal. */
  z.object({ eleccionManual: z.string().max(20) })
]);

const ERROR_RESPONSES: Record<string, { error: string; status: number }> = {
  locked: { error: "El Ritual de Afinación se desbloquea al completar tu primer relato", status: 403 },
  already_done: { error: "El cristal ya leyó tu Aura; el ritual no se repite", status: 409 },
  invalid_answers: { error: "Respuestas incompletas o inválidas", status: 400 },
  no_result: { error: "Primero completa el ritual", status: 409 },
  manual_used: { error: "Tu única corrección manual ya fue usada; la Senda queda fija", status: 409 },
  invalid_senda: { error: "Senda desconocida", status: 400 }
};

export async function POST(request: Request) {
  const userId = await currentUserId();
  if (!userId) {
    return unauthorized();
  }

  const limited = await rateLimit("senda-submit", userId, 10, 600);
  if (!limited.allowed) {
    return tooManyRequests();
  }

  const restriction = await assertNoRestriccion(userId, "accion");
  if (restriction) {
    return restriction;
  }

  const body = await readJsonBody(request, 8 * 1024);
  if (!body.ok) {
    return body.response;
  }
  const parsed = submitSchema.safeParse(body.body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Petición inválida" }, { status: 400 });
  }

  const outcome =
    "respuestas" in parsed.data
      ? await submitSendaTest(userId, parsed.data.respuestas)
      : await chooseSendaManually(userId, parsed.data.eleccionManual);

  if (!outcome.ok) {
    const mapped = ERROR_RESPONSES[outcome.error] ?? { error: "Error", status: 400 };
    return NextResponse.json({ error: mapped.error }, { status: mapped.status });
  }
  return NextResponse.json(outcome.status);
}
