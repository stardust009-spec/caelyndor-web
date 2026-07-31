import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { getPrisma } from "@/lib/server/db";

const credentialsSchema = z.object({
  email: z.string().email().max(254).toLowerCase(),
  password: z.string().min(1).max(200)
});

/**
 * Hash de referencia para igualar tiempos cuando el email no existe
 * (evita enumeración de cuentas por diferencia de latencia).
 */
const DUMMY_HASH = "$2b$12$C6UzMDM.H6dfI/f/IKcEeO7ZDgUnUZ2yBMSl8f3Yd1Ic7HHZR3mG2";

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60 },
  trustHost: true,
  providers: [
    // Mínimo viable: credenciales. Para añadir OAuth (Google) después, basta
    // sumar el provider aquí y sus env vars (AUTH_GOOGLE_ID/SECRET).
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Contraseña", type: "password" }
      },
      authorize: async (raw) => {
        const parsed = credentialsSchema.safeParse(raw);
        if (!parsed.success) {
          return null;
        }
        const { email, password } = parsed.data;

        const user = await getPrisma().user.findUnique({
          where: { email },
          select: { id: true, email: true, displayName: true, passwordHash: true }
        });

        const valid = await bcrypt.compare(password, user?.passwordHash ?? DUMMY_HASH);
        if (!user || !valid) {
          return null;
        }
        return { id: user.id, email: user.email, name: user.displayName };
      }
    })
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user?.id) {
        token.sub = user.id;
      }
      return token;
    },
    session({ session, token }) {
      if (token.sub) {
        session.user.id = token.sub;
      }
      return session;
    }
  }
});

/** Id del usuario autenticado o null (helper para las rutas API). */
export async function currentUserId(): Promise<string | null> {
  const session = await auth();
  return session?.user?.id ?? null;
}
