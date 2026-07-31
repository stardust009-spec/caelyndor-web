import "server-only";
import { NextResponse } from "next/server";

/** Límite de body por defecto para las rutas del sistema de Aura. */
export const DEFAULT_MAX_BODY_BYTES = 16 * 1024;

export type BodyResult<T = unknown> = { ok: true; body: T } | { ok: false; response: NextResponse };

/**
 * Lee el body JSON imponiendo un tamaño máximo real (no solo Content-Length,
 * que un cliente hostil puede omitir o falsear).
 */
export async function readJsonBody(
  request: Request,
  maxBytes: number = DEFAULT_MAX_BODY_BYTES
): Promise<BodyResult> {
  const declared = Number(request.headers.get("content-length") ?? 0);
  if (declared > maxBytes) {
    return { ok: false, response: NextResponse.json({ error: "Body demasiado grande" }, { status: 413 }) };
  }

  let text: string;
  try {
    text = await request.text();
  } catch {
    return { ok: false, response: NextResponse.json({ error: "Body ilegible" }, { status: 400 }) };
  }
  if (text.length > maxBytes) {
    return { ok: false, response: NextResponse.json({ error: "Body demasiado grande" }, { status: 413 }) };
  }

  try {
    return { ok: true, body: JSON.parse(text) as unknown };
  } catch {
    return { ok: false, response: NextResponse.json({ error: "JSON inválido" }, { status: 400 }) };
  }
}

export function tooManyRequests(): NextResponse {
  return NextResponse.json({ error: "Demasiadas peticiones; inténtalo en unos minutos" }, { status: 429 });
}

export function unauthorized(): NextResponse {
  return NextResponse.json({ error: "Necesitas iniciar sesión" }, { status: 401 });
}
