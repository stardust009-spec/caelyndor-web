"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";

/** Cada cuánto avisa "sigo aquí" mientras la pestaña está visible. */
const INTERVALO_MS = 3 * 60 * 1000;

/**
 * Presencia para "cronistas en línea": solo con sesión y con la pestaña
 * visible. El servidor actualiza AppSession.lastActiveAt (máx. 1/min).
 */
export function PulsoPresencia() {
  const { status } = useSession();

  useEffect(() => {
    if (status !== "authenticated") {
      return;
    }
    function pulso() {
      if (document.visibilityState === "visible") {
        void fetch("/api/presencia", { method: "POST", keepalive: true }).catch(() => undefined);
      }
    }
    pulso();
    const timer = window.setInterval(pulso, INTERVALO_MS);
    document.addEventListener("visibilitychange", pulso);
    return () => {
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", pulso);
    };
  }, [status]);

  return null;
}
