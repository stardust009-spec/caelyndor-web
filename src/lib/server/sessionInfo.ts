import "server-only";

/** Etiqueta de dispositivo derivada del user-agent, ej. "Chrome (Windows)". */
export function deviceLabelFrom(userAgent: string | null): string {
  if (!userAgent) {
    return "Dispositivo desconocido";
  }
  const ua = userAgent;

  const browser = ua.includes("Edg/")
    ? "Edge"
    : ua.includes("OPR/") || ua.includes("Opera")
      ? "Opera"
      : ua.includes("Firefox/")
        ? "Firefox"
        : ua.includes("Chrome/")
          ? "Chrome"
          : ua.includes("Safari/")
            ? "Safari"
            : "Navegador";

  const os = ua.includes("Windows")
    ? "Windows"
    : ua.includes("Android")
      ? "Android"
      : ua.includes("iPhone") || ua.includes("iPad")
        ? "iOS"
        : ua.includes("Mac OS")
          ? "macOS"
          : ua.includes("Linux")
            ? "Linux"
            : "SO desconocido";

  return `${browser} (${os})`;
}

/**
 * Ubicación aproximada a nivel ciudad desde los headers de geo-IP de Vercel.
 * Nunca exacta; la UI la etiqueta como "ubicación aproximada".
 */
export function locationLabelFrom(headers: Headers): string {
  const city = headers.get("x-vercel-ip-city");
  const region = headers.get("x-vercel-ip-country-region");
  const country = headers.get("x-vercel-ip-country");

  const parts = [city ? decodeURIComponent(city) : null, region ? decodeURIComponent(region) : null, country]
    .filter(Boolean)
    .join(", ");
  return parts || "Ubicación desconocida";
}
