"use client";

import { useEffect, useState } from "react";

export type MisLecturas = Record<string, { leido: boolean; progreso: number }>;

/**
 * Lecturas del usuario (qué relatos completó), compartidas por todas las
 * tarjetas de la página: una sola petición aunque haya 14 tarjetas.
 * null = visitante sin sesión o aún cargando.
 */
let cache: Promise<MisLecturas | null> | null = null;
const oyentes = new Set<(lecturas: MisLecturas | null) => void>();

function cargar(): Promise<MisLecturas | null> {
  if (!cache) {
    cache = fetch("/api/user/lecturas")
      .then(async (respuesta) => (respuesta.ok ? ((await respuesta.json()) as { lecturas: MisLecturas }).lecturas : null))
      .catch(() => null)
      .then((lecturas) => {
        // Sin sesión no se guarda: si el visitante entra a su cuenta sin
        // recargar, la próxima tarjeta vuelve a preguntar.
        if (lecturas === null) cache = null;
        return lecturas;
      });
  }
  return cache;
}

/** Al completar un relato: se vuelve a pedir y se avisa a todas las tarjetas. */
export function refrescarMisLecturas() {
  cache = null;
  void cargar().then((lecturas) => oyentes.forEach((oyente) => oyente(lecturas)));
}

export function useMisLecturas(): MisLecturas | null {
  const [lecturas, setLecturas] = useState<MisLecturas | null>(null);

  useEffect(() => {
    let vigente = true;
    void cargar().then((datos) => {
      if (vigente) setLecturas(datos);
    });
    oyentes.add(setLecturas);
    return () => {
      vigente = false;
      oyentes.delete(setLecturas);
    };
  }, []);

  return lecturas;
}
