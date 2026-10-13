"use client";

import { useEffect, useState } from "react";

const OPCIONES: Intl.DateTimeFormatOptions = {
  day: "numeric",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit"
};

function formatear(iso: string, timeZone?: string): string {
  return new Date(iso).toLocaleString("es-CL", { ...OPCIONES, timeZone });
}

/**
 * Fecha, hora y minuto de un mensaje. La marca de tiempo la pone el servidor
 * al guardar (nunca el reloj del usuario); aquí solo se muestra en la zona
 * horaria de quien lee. El primer render usa la hora de Chile para que el
 * HTML del servidor y el del navegador coincidan; luego pasa a la local.
 */
export function FechaHora({ iso }: { iso: string }) {
  const [texto, setTexto] = useState(() => formatear(iso, "America/Santiago"));
  const [zona, setZona] = useState("America/Santiago");

  useEffect(() => {
    setTexto(formatear(iso));
    setZona(Intl.DateTimeFormat().resolvedOptions().timeZone);
  }, [iso]);

  return (
    <time className="foro-fecha" dateTime={iso} title={`${formatear(iso)} (${zona})`}>
      {texto}
    </time>
  );
}
