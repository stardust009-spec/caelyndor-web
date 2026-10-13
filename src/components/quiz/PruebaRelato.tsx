"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { FechaHora } from "@/components/foro/FechaHora";

type Resumen = {
  principal:
    | { estado: "no_disponible" | "sin_sesion" | "bloqueado" | "en_curso" }
    | { estado: "disponible"; total: number }
    | { estado: "enfriamiento"; hasta: string }
    | { estado: "aprobado"; aciertos: number; total: number };
  conexiones: { estado: string };
};

/** Evento que emite ReadingProgress al completar un relato. */
export const EVENTO_RELATO_COMPLETADO = "caelyndor:relato-completado";

/** Bloque al pie del relato con el estado de su Prueba del conocimiento. */
export function PruebaRelato({ slug }: { slug: string }) {
  const [resumen, setResumen] = useState<Resumen | null>(null);

  const cargar = useCallback(() => {
    fetch(`/api/quiz/${slug}`, { cache: "no-store" })
      .then((respuesta) => (respuesta.ok ? (respuesta.json() as Promise<Resumen>) : null))
      .then(setResumen)
      .catch(() => setResumen(null));
  }, [slug]);

  useEffect(() => {
    cargar();
    window.addEventListener(EVENTO_RELATO_COMPLETADO, cargar);
    return () => window.removeEventListener(EVENTO_RELATO_COMPLETADO, cargar);
  }, [cargar]);

  if (!resumen || resumen.principal.estado === "no_disponible") {
    return null;
  }
  const { principal } = resumen;
  const enlace = `/relatos/${slug}/quiz`;

  return (
    <aside className="prueba-relato" aria-label="Prueba del conocimiento">
      <p className="prueba-relato__titulo">✦ Prueba del conocimiento</p>
      {principal.estado === "sin_sesion" && (
        <p>
          Este relato tiene su prueba. <Link href="/cuenta">Entra a tu cuenta</Link> para hacerla.
        </p>
      )}
      {principal.estado === "bloqueado" && <p>Se abre cuando termines de leer este relato.</p>}
      {principal.estado === "disponible" && (
        <p>
          {principal.total} preguntas sobre lo que acabas de leer. <Link href={enlace}>Ponte a prueba →</Link>
        </p>
      )}
      {principal.estado === "en_curso" && (
        <p>
          La dejaste a medias. <Link href={enlace}>Continuar →</Link>
        </p>
      )}
      {principal.estado === "enfriamiento" && (
        <p>
          Próximo intento: <FechaHora iso={principal.hasta} />.
        </p>
      )}
      {principal.estado === "aprobado" && (
        <p>
          Superada · {principal.aciertos} de {principal.total}.{" "}
          {resumen.conexiones.estado === "disponible" ? (
            <Link href={enlace}>Desafío de conexiones disponible →</Link>
          ) : (
            <Link href={enlace}>Ver la revisión</Link>
          )}
        </p>
      )}
    </aside>
  );
}
