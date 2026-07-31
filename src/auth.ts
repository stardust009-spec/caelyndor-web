import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { getPrisma } from "@/lib/server/db";
import { deviceLabelFrom, locationLabelFrom } from "@/lib/server/sessionInfo";

const credentialsSchema = z.object({
  email: z.string().email().max(254).toLowerCase(),
  password: z.string().min(1).max(200)
});

/**
 * Hash de referencia para igualar tiempos cuando el email no existe
 * (evita enumeración de cuentas por diferencia de latencia).
 */
const DUMMY_HASH = "$2b$12$C6UzMDM.H6dfI/f/IKcEeO7ZDgUnUZ2yBMSl8f3Yd1Ic7HHZR3mG2";

/** Cada cuánto se refresca lastActiveAt de la sesión (evita un UPDATE por request). */
const LAST_ACTIVE_REFRESH_MS = 60_000;

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60 },
  trustHost: true,
  providers: [
    // Estrategia de sesión: HÍBRIDA. El provider Credentials de Auth.js no
    // soporta sesiones de base de datos nativas, así que el JWT lleva `sid`
    // (fila AppSession) y toda verificación pasa por esa fila — revocarla
    // invalida la sesión de inmediato en servidor (Parte 2, sección 5).
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Contraseña", type: "password" }
      },
      authorize: async (raw, request) => {
        const parsed = credentialsSchema.safeParse(raw);
        if (!parsed.success) {
          return null;
        }
        const { email, password } = parsed.data;
        const prisma = getPrisma();

        const user = await prisma.user.findUnique({
          where: { email },
          select: { id: true, email: true, displayName: true, passwordHash: true }
        });

        const valid = await bcrypt.compare(password, user?.passwordHash ?? DUMMY_HASH);
        if (!user || !valid) {
          return null;
        }

        const appSession = await prisma.appSession.create({
          data: {
            userId: user.id,
            deviceLabel: deviceLabelFrom(request?.headers?.get("user-agent") ?? null),
            locationLabel: request?.headers ? locationLabelFrom(request.headers) : "Ubicación desconocida"
          },
          select: { id: true }
        });

        return { id: user.id, email: user.email, name: user.displayName, sessionId: appSession.id };
      }
    })
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user?.id) {
        token.sub = user.id;
      }
      const sessionId = (user as { sessionId?: string } | undefined)?.sessionId;
      if (sessionId) {
        token.sid = sessionId;
      }
      return token;
    },
    session({ session, token }) {
      if (token.sub) {
        session.user.id = token.sub;
      }
      if (typeof token.sid === "string") {
        session.sessionId = token.sid;
      }
      return session;
    }
  }
});

export type AuthContext = { userId: string; sessionId: string };

/**
 * Contexto autenticado validado contra el registro server-side de sesiones:
 * si la fila AppSession fue revocada (logout remoto, ban), devuelve null
 * aunque el JWT siga siendo criptográficamente válido.
 */
export async function currentAuthContext(): Promise<AuthContext | null> {
  const session = await auth();
  const userId = session?.user?.id;
  const sessionId = session?.sessionId;
  if (!userId || !sessionId) {
    return null;
  }

  const prisma = getPrisma();
  const appSession = await prisma.appSession.findUnique({
    where: { id: sessionId },
    select: { userId: true, revokedAt: true, lastActiveAt: true }
  });
  if (!appSession || appSession.userId !== userId || appSession.revokedAt) {
    return null;
  }

  if (Date.now() - appSession.lastActiveAt.getTime() > LAST_ACTIVE_REFRESH_MS) {
    await prisma.appSession
      .update({ where: { id: sessionId }, data: { lastActiveAt: new Date() } })
      .catch(() => undefined);
  }

  return { userId, sessionId };
}

/** Id del usuario autenticado (con sesión server-side vigente) o null. */
export async function currentUserId(): Promise<string | null> {
  return (await currentAuthContext())?.userId ?? null;
}
