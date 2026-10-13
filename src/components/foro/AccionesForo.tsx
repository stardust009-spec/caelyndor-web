"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { HeartIcon } from "@/components/MusicIcons";
import { MOTIVOS_REPORTE } from "@/data/foro";

async function post(url: string, datos?: unknown) {
  try {
    const respuesta = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: datos === undefined ? undefined : JSON.stringify(datos)
    });
    const data = (await respuesta.json().catch(() => null)) as Record<string, unknown> | null;
    return { ok: respuesta.ok, status: respuesta.status, data };
  } catch {
    return { ok: false, status: 0, data: { error: "Sin conexión. Inténtalo de nuevo." } };
  }
}

function errorDe(resultado: { status: number; data: Record<string, unknown> | null }, porDefecto: string) {
  const error = typeof resultado.data?.error === "string" ? resultado.data.error : porDefecto;
  return resultado.status === 403 && error.includes("2FA")
    ? "Tu verificación 2FA expiró: renuévala en /admin para moderar."
    : error;
}

type AccionesMensajeProps = {
  mensajeId: string;
  likes: number;
  meGusta: boolean;
  esPropio: boolean;
  conSesion: boolean;
  oculto: boolean;
  modera: boolean;
};

/** Me gusta (sin "no me gusta"), reportar y, para moderación, ocultar. */
export function AccionesMensaje({ mensajeId, likes, meGusta, esPropio, conSesion, oculto, modera }: AccionesMensajeProps) {
  const router = useRouter();
  const [estado, setEstado] = useState({ likes, meGusta });
  const [ocupado, setOcupado] = useState(false);
  const [reportando, setReportando] = useState(false);
  const [motivo, setMotivo] = useState<string>(MOTIVOS_REPORTE[0].valor);
  const [detalle, setDetalle] = useState("");
  const [aviso, setAviso] = useState<string | null>(null);

  async function alternarLike() {
    if (ocupado) return;
    setOcupado(true);
    // Optimista: se ve al instante; si falla, se revierte.
    const previo = estado;
    setEstado({ meGusta: !previo.meGusta, likes: previo.likes + (previo.meGusta ? -1 : 1) });
    const resultado = await post(`/api/foro/mensajes/${mensajeId}/like`);
    if (resultado.ok && resultado.data) {
      setEstado({ meGusta: resultado.data.meGusta === true, likes: Number(resultado.data.likes) || 0 });
    } else {
      setEstado(previo);
      setAviso(errorDe(resultado, "No se pudo registrar el me gusta"));
    }
    setOcupado(false);
  }

  async function enviarReporte() {
    setOcupado(true);
    const resultado = await post(`/api/foro/mensajes/${mensajeId}/reportar`, { motivo, detalle: detalle || undefined });
    setOcupado(false);
    setReportando(false);
    setAviso(resultado.ok ? "Gracias: la moderación lo revisará." : errorDe(resultado, "No se pudo enviar el reporte"));
  }

  async function moderar(accion: "ocultar" | "mostrar") {
    const motivoModeracion = accion === "ocultar" ? (window.prompt("Motivo (interno, opcional):") ?? "") : "";
    setOcupado(true);
    const resultado = await post(`/api/admin/foro/mensajes/${mensajeId}`, { accion, motivo: motivoModeracion || undefined });
    setOcupado(false);
    if (resultado.ok) {
      router.refresh();
    } else {
      setAviso(errorDe(resultado, "No se pudo moderar el mensaje"));
    }
  }

  const puedeDarLike = conSesion && !esPropio && !oculto;

  return (
    <div className="foro-acciones">
      <button
        type="button"
        className={`foro-like${estado.meGusta ? " foro-like--activo" : ""}`}
        onClick={() => void alternarLike()}
        disabled={!puedeDarLike || ocupado}
        aria-pressed={estado.meGusta}
        aria-label={estado.meGusta ? "Quitar me gusta" : "Me gusta"}
        title={!conSesion ? "Entra a tu cuenta para dar me gusta" : esPropio ? "Es tu mensaje" : undefined}
      >
        <HeartIcon size={14} /> <span>{estado.likes}</span>
      </button>
      {conSesion && !esPropio && !oculto && (
        <button type="button" className="foro-enlace" onClick={() => setReportando((valor) => !valor)}>
          Reportar
        </button>
      )}
      {modera && (
        <button type="button" className="foro-enlace foro-enlace--moderar" onClick={() => void moderar(oculto ? "mostrar" : "ocultar")} disabled={ocupado}>
          {oculto ? "Mostrar" : "Ocultar"}
        </button>
      )}
      {reportando && (
        <div className="foro-reporte">
          <select value={motivo} onChange={(event) => setMotivo(event.target.value)} aria-label="Motivo del reporte">
            {MOTIVOS_REPORTE.map((opcion) => (
              <option key={opcion.valor} value={opcion.valor}>
                {opcion.etiqueta}
              </option>
            ))}
          </select>
          <input
            value={detalle}
            onChange={(event) => setDetalle(event.target.value)}
            maxLength={300}
            placeholder="Detalle (opcional)"
            aria-label="Detalle del reporte"
          />
          <button type="button" className="foro-boton foro-boton--chico" onClick={() => void enviarReporte()} disabled={ocupado}>
            Enviar reporte
          </button>
        </div>
      )}
      {aviso && (
        <p className="foro-aviso" role="status">
          {aviso}
        </p>
      )}
    </div>
  );
}

/** Controles de moderación de un hilo (fijar, cerrar, ocultar). */
export function ModeracionHilo({ hiloId, fijado, cerrado, oculto }: { hiloId: string; fijado: boolean; cerrado: boolean; oculto: boolean }) {
  const router = useRouter();
  const [ocupado, setOcupado] = useState(false);
  const [aviso, setAviso] = useState<string | null>(null);

  async function accion(nombre: string) {
    const motivo = nombre === "ocultar" ? (window.prompt("Motivo (interno, opcional):") ?? "") : "";
    setOcupado(true);
    const resultado = await post(`/api/admin/foro/hilos/${hiloId}`, { accion: nombre, motivo: motivo || undefined });
    setOcupado(false);
    if (resultado.ok) {
      router.refresh();
    } else {
      setAviso(errorDe(resultado, "No se pudo moderar el hilo"));
    }
  }

  return (
    <div className="foro-moderacion">
      <span>Moderación:</span>
      <button type="button" className="foro-enlace" disabled={ocupado} onClick={() => void accion(fijado ? "desfijar" : "fijar")}>
        {fijado ? "Desfijar" : "Fijar"}
      </button>
      <button type="button" className="foro-enlace" disabled={ocupado} onClick={() => void accion(cerrado ? "abrir" : "cerrar")}>
        {cerrado ? "Reabrir" : "Cerrar"}
      </button>
      <button type="button" className="foro-enlace foro-enlace--moderar" disabled={ocupado} onClick={() => void accion(oculto ? "mostrar" : "ocultar")}>
        {oculto ? "Mostrar hilo" : "Ocultar hilo"}
      </button>
      {aviso && <p className="foro-aviso">{aviso}</p>}
    </div>
  );
}

/** Bandeja de reportes (/admin/foro): ocultar el mensaje o descartar. */
export function AccionesReporte({ reporteId, mensajeId }: { reporteId: string; mensajeId: string }) {
  const router = useRouter();
  const [ocupado, setOcupado] = useState(false);
  const [aviso, setAviso] = useState<string | null>(null);

  async function ejecutar(url: string, datos?: unknown) {
    setOcupado(true);
    const resultado = await post(url, datos);
    setOcupado(false);
    if (resultado.ok) {
      router.refresh();
    } else {
      setAviso(errorDe(resultado, "No se pudo completar la acción"));
    }
  }

  return (
    <div className="foro-acciones">
      <button type="button" className="foro-boton foro-boton--chico" disabled={ocupado} onClick={() => void ejecutar(`/api/admin/foro/mensajes/${mensajeId}`, { accion: "ocultar" })}>
        Ocultar mensaje
      </button>
      <button type="button" className="foro-boton foro-boton--chico foro-boton--secundario" disabled={ocupado} onClick={() => void ejecutar(`/api/admin/foro/reportes/${reporteId}`)}>
        Descartar
      </button>
      {aviso && <p className="foro-aviso">{aviso}</p>}
    </div>
  );
}
