import "server-only";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { AdminAccessAction } from "@/generated/prisma/client";
import { currentAuthContext } from "@/auth";
import { getPrisma } from "./db";
import { esAdminAutorizado, ventana2faVigente } from "@/lib/adminAccess";

export type AdminContext = {
  userId: string;
  sessionId: string;
  email: string;
  /** true si ya registró su secreto TOTP (totpConfirmedAt). */
  totpConfigurado: boolean;
  /** true si el 2FA de ESTA sesión está dentro de la ventana. */
  dosFaVigente: boolean;
};

async function requestIp(): Promise<string> {
  const headerList = await headers();
  const forwarded = headerList.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return headerList.get("x-real-ip") ?? "unknown";
}

/** Registra en AdminAccessLog (solo escritura; sin endpoint de edición/borrado). */
export async function logAdminAccess(
  action: AdminAccessAction,
  adminUserId: string | null,
  targetUserId: string | null = null
): Promise<void> {
  const ipAddress = await requestIp();
  await getPrisma()
    .adminAccessLog.create({ data: { action, adminUserId, targetUserId, ipAddress } })
    .catch((error) => console.error("adminAccessLog:", error));
}

/**
 * Verificación admin completa: sesión válida (registro server-side), rol +
 * allowlist (esAdminAutorizado, nunca role aislado) y estado del 2FA.
 * Se llama de forma INDEPENDIENTE en cada route handler y página /admin —
 * el middleware es solo la barrera exterior (Parte 3, sección 5).
 */
export async function getAdminContext(): Promise<
  | { ok: true; admin: AdminContext }
  | { ok: false; reason: "no_session" | "not_admin" }
> {
  const ctx = await currentAuthContext();
  if (!ctx) {
    await logAdminAccess(AdminAccessAction.UNAUTHORIZED_ATTEMPT, null);
    return { ok: false, reason: "no_session" };
  }

  const prisma = getPrisma();
  const [user, session] = await Promise.all([
    prisma.user.findUnique({
      where: { id: ctx.userId },
      select: { role: true, email: true, totpConfirmedAt: true }
    }),
    prisma.appSession.findUnique({
      where: { id: ctx.sessionId },
      select: { adminVerifiedAt: true }
    })
  ]);

  if (!user || !esAdminAutorizado(user)) {
    await logAdminAccess(AdminAccessAction.UNAUTHORIZED_ATTEMPT, ctx.userId);
    return { ok: false, reason: "not_admin" };
  }

  return {
    ok: true,
    admin: {
      userId: ctx.userId,
      sessionId: ctx.sessionId,
      email: user.email,
      totpConfigurado: user.totpConfirmedAt !== null,
      dosFaVigente: ventana2faVigente(session?.adminVerifiedAt ?? null)
    }
  };
}

/**
 * Guard para route handlers de /api/admin/*: exige además 2FA vigente
 * (el flujo de setup/verify usa requireAdminSin2fa).
 */
export async function requireAdminApi(): Promise<
  { ok: true; admin: AdminContext } | { ok: false; response: NextResponse }
> {
  const result = await getAdminContext();
  if (!result.ok) {
    return {
      ok: false,
      response: NextResponse.json({ error: "No autorizado" }, { status: result.reason === "no_session" ? 401 : 403 })
    };
  }
  if (!result.admin.dosFaVigente) {
    return {
      ok: false,
      response: NextResponse.json({ error: "Verificación 2FA requerida" }, { status: 403 })
    };
  }
  return { ok: true, admin: result.admin };
}

/** Igual que requireAdminApi pero sin exigir 2FA (solo para las rutas 2FA). */
export async function requireAdminSin2fa(): Promise<
  { ok: true; admin: AdminContext } | { ok: false; response: NextResponse }
> {
  const result = await getAdminContext();
  if (!result.ok) {
    return {
      ok: false,
      response: NextResponse.json({ error: "No autorizado" }, { status: result.reason === "no_session" ? 401 : 403 })
    };
  }
  return { ok: true, admin: result.admin };
}
