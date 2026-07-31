import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
    /** Id de la fila AppSession (registro server-side de sesiones). */
    sessionId?: string;
  }

  interface User {
    /** Adjuntado por authorize() al crear la fila AppSession del login. */
    sessionId?: string;
    role?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    sid?: string;
    role?: string;
  }
}
