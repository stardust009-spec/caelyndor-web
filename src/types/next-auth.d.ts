import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      /** Alias público; se refresca vía update() al cambiarlo. */
      alias?: string | null;
      /** URL del avatar elegido (catálogo cerrado), para el header. */
      avatarUrl?: string | null;
      /** Personaje del avatar, para el alt text. */
      avatarCharacter?: string | null;
    } & DefaultSession["user"];
    /** Id de la fila AppSession (registro server-side de sesiones). */
    sessionId?: string;
  }

  interface User {
    /** Adjuntado por authorize() al crear la fila AppSession del login. */
    sessionId?: string;
    role?: string;
    // Mismo tipo que en Session: ambas augmentaciones se fusionan en
    // Session["user"], así que discrepar aquí rompe la asignación.
    alias?: string | null;
    avatarUrl?: string | null;
    avatarCharacter?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    sid?: string;
    role?: string;
    alias?: string;
    avatarUrl?: string | null;
    avatarCharacter?: string | null;
  }
}
