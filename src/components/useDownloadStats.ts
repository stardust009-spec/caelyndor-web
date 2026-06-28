"use client";

import { useEffect, useState } from "react";

// Agrupa las consultas de todas las tarjetas montadas a la vez en un solo fetch,
// igual que useStoryStats. Cada clave es un fileId; el valor, su contador global.
let batch: Map<string, Array<(count: number) => void>> | null = null;

function requestCounts(ids: string[]): Promise<Record<string, number>> {
  return new Promise((resolve) => {
    const pending: Record<string, number> = {};
    let remaining = ids.length;

    if (remaining === 0) {
      resolve(pending);
      return;
    }

    ids.forEach((id) => {
      if (!batch) {
        batch = new Map();
        window.setTimeout(async () => {
          const current = batch!;
          batch = null;

          let counts: Record<string, number> = {};
          try {
            const response = await fetch(
              `/api/download-stats?ids=${[...current.keys()].join(",")}`
            );
            if (response.ok) {
              counts =
                ((await response.json()) as { counts?: Record<string, number> }).counts ?? {};
            }
          } catch {
            // sin red o contadores no configurados: las tarjetas muestran "–"
          }

          current.forEach((resolvers, key) => {
            const value = counts[key];
            resolvers.forEach((resolver) => resolver(value ?? -1));
          });
        }, 0);
      }

      const resolver = (count: number) => {
        pending[id] = count;
        remaining -= 1;
        if (remaining === 0) {
          resolve(pending);
        }
      };
      batch.set(id, [...(batch.get(id) ?? []), resolver]);
    });
  });
}

async function sendDownload(id: string): Promise<number | null> {
  try {
    const response = await fetch("/api/download-stats", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
      // El clic puede iniciar una descarga/navegación; keepalive asegura que el
      // POST llegue al servidor aunque la página se descargue.
      keepalive: true
    });
    if (!response.ok) {
      return null;
    }
    const data = (await response.json()) as { counts?: Record<string, number> };
    return data.counts?.[id] ?? null;
  } catch {
    return null;
  }
}

/**
 * Devuelve los contadores globales de un grupo de archivos y una función para
 * registrar una descarga (incremento optimista + POST). Un valor `null` en el
 * mapa significa "aún cargando o no disponible" → la UI muestra "–".
 */
export function useDownloadStats(ids: string[]) {
  const key = ids.join(",");
  const [counts, setCounts] = useState<Record<string, number | null>>(() =>
    Object.fromEntries(ids.map((id) => [id, null]))
  );

  useEffect(() => {
    let cancelled = false;
    const fileIds = key ? key.split(",") : [];

    requestCounts(fileIds).then((result) => {
      if (cancelled) {
        return;
      }
      setCounts((current) => {
        const next = { ...current };
        fileIds.forEach((id) => {
          const value = result[id];
          next[id] = value >= 0 ? value : current[id] ?? null;
        });
        return next;
      });
    });

    return () => {
      cancelled = true;
    };
  }, [key]);

  function registerDownload(id: string) {
    setCounts((current) => ({
      ...current,
      [id]: (current[id] ?? 0) + 1
    }));

    sendDownload(id).then((value) => {
      if (typeof value === "number" && value >= 0) {
        setCounts((current) => ({ ...current, [id]: value }));
      }
    });
  }

  return { counts, registerDownload };
}
