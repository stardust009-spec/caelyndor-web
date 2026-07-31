"use client";

import { SessionProvider } from "next-auth/react";

/**
 * Provee la sesión al header (y a lo que la necesite) desde el CLIENTE.
 *
 * Deliberadamente no se llama auth() en el layout de servidor: leer cookies
 * ahí volvería dinámicas las 162 páginas que hoy se generan estáticas. Con el
 * provider, el HTML sigue siendo estático y la sesión se hidrata después.
 *
 * refetchOnWindowFocus queda apagado: el avatar no cambia solo, y el cambio
 * desde /cuenta ya se propaga vía update().
 */
export function AuthSessionProvider({ children }: { children: React.ReactNode }) {
  return <SessionProvider refetchOnWindowFocus={false}>{children}</SessionProvider>;
}
