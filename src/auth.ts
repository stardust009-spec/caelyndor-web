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
          select: {
            id: true,
            email: true,
            displayName: true,
            passwordHash: true,
            role: true,
            profile: {
              select: { alias: true, avatar: { select: { imageUrl: true, characterName: true } } }
            }
          }
        });

        const valid = await bcrypt.compare(password, user?.passwordHash ?? DUMMY_HASH);
        if (!user || !valid) {
          return null;
        }

        // Ban completo: el login se rechaza con el mismo "credenciales
        // inválidas" genérico — sin detallar el motivo (Parte 3, sección 8.2).
        const ban = await prisma.userRestriction.findFirst({
          where: {
            userId: user.id,
            type: "BAN_COMPLETO",
            active: true,
            OR: [{ expiresAt: null }, { expiresAt: { gt: new Date() } }]
          },
          select: { id: true }
        });
        if (ban) {
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

        return {
          id: user.id,
          email: user.email,
          name: user.displayName,
          sessionId: appSession.id,
          role: user.role,
          // Alias y avatar viajan en el JWT para que el header los pinte sin
          // pedir /api/user/profile en cada página. Son datos públicos del
          // perfil; nada sensible entra aquí.
          alias: user.profile?.alias ?? user.displayName,
          avatarUrl: user.profile?.avatar?.imageUrl ?? null,
          avatarCharacter: user.profile?.avatar?.characterName ?? null
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user, trigger }) {
      if (user?.id) {
        token.sub = user.id;
      }
      const sessionId = (user as { sessionId?: string } | undefined)?.sessionId;
      if (sessionId) {
        token.sid = sessionId;
      }
      // Claim de rol para la barrera exterior (middleware, edge). La
      // verificación autoritativa siempre es esAdminAutorizado() contra BD.
      const role = (user as { role?: string } | undefined)?.role;
      if (role) {
        token.role = role;
      }

      const perfil = user as
        | { alias?: string; avatarUrl?: string | null; avatarCharacter?: string | null }
        | undefined;
      if (perfil?.alias !== undefined) {
        token.alias = perfil.alias;
        token.avatarUrl = perfil.avatarUrl ?? null;
        token.avatarCharacter = perfil.avatarCharacter ?? null;
      }

      // El JWT se emite en el login, así que un cambio posterior de avatar o
      // alias no se vería hasta re-loguear. Con trigger "update" —que dispara
      // update() desde el cliente tras guardar— se relee el perfil. Es la
      // ÚNICA lectura a BD de este callback: el resto de las páginas sirven
      // el token tal cual, sin consulta.
      if (trigger === "update" && token.sub) {
        const perfilActual = await getPrisma()
          .userProfile.findUnique({
            where: { userId: token.sub },
            select: { alias: true, avatar: { select: { imageUrl: true, characterName: true } } }
          })
          .catch(() => null);
        if (perfilActual) {
          token.alias = perfilActual.alias;
          token.avatarUrl = perfilActual.avatar?.imageUrl ?? null;
          token.avatarCharacter = perfilActual.avatar?.characterName ?? null;
        }
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
      session.user.alias = typeof token.alias === "string" ? token.alias : null;
      session.user.avatarUrl = typeof token.avatarUrl === "string" ? token.avatarUrl : null;
      session.user.avatarCharacter =
        typeof token.avatarCharacter === "string" ? token.avatarCharacter : null;
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
