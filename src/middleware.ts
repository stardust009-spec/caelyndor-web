import { NextResponse, type NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

/**
 * Barrera EXTERIOR de /admin/* y /api/admin/* (Parte 3, sección 5).
 * Corre en Edge (sin Postgres), así que reparte responsabilidades:
 * - Sin sesión (sin JWT válido): se corta aquí mismo; el intento queda en los
 *   logs de la plataforma (console.warn con IP) porque desde Edge no se puede
 *   escribir en AdminAccessLog.
 * - Con sesión pero sin claim de admin: se deja pasar a la barrera INTERIOR
 *   (getAdminContext en cada handler/página), que registra el intento en
 *   AdminAccessLog con userId + IP y recién entonces bloquea.
 * - Con claim de admin: pasa; la verificación autoritativa (esAdminAutorizado
 *   contra BD, sesión no revocada, ventana 2FA) se repite igual adentro.
 */
export async function middleware(request: NextRequest) {
  const secret = process.env.AUTH_SECRET;
  const secure = request.nextUrl.protocol === "https:";
  const salt = secure ? "__Secure-authjs.session-token" : "authjs.session-token";

  const token = secret
    ? await getToken({ req: request, secret, salt, secureCookie: secure }).catch(() => null)
    : null;

  if (!token) {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    console.warn(`admin: intento anónimo bloqueado en middleware ip=${ip} path=${request.nextUrl.pathname}`);
    if (request.nextUrl.pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }
    return NextResponse.redirect(new URL("/cuenta", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"]
};
