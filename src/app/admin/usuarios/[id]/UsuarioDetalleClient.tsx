"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

type Restriccion = {
  id: string;
  type: string;
  active: boolean;
  vigente: boolean;
  reason: string;
  expiresAt: string | null;
  appliedAt: string;
  liftedAt: string | null;
};

type Detalle = {
  id: string;
  email: string;
  displayName: string;
  createdAt: string;
  rango: string;
  role: string;
  sendaPrincipal: string | null;
  sendasCercanas: string[];
  habilidadUnica: { nombre: string; rareza: string } | null;
  profile: {
    alias: string;
    nombre: string | null;
    apellidoPaterno: string | null;
    apellidoMaterno: string | null;
    fechaNacimiento: string | null;
    pais: string | null;
    ciudad: string | null;
    comuna: string | null;
    avatar: { slug: string; characterName: string; imageUrl: string } | null;
  } | null;
  sendaTest: { sendaPrincipalResultado: string; eligioManual: boolean; completedAt: string } | null;
  progresos: { storySlug: string; highestProgress: number; completedAt: string | null; rereadCount: number }[];
  logros: { achievementId: string; unlockedAt: string }[];
  restricciones: Restriccion[];
  sesiones: { deviceLabel: string; lastActiveAt: string }[];
};

const TIPOS = [
  { value: "ACCION_SILENCIADA", label: "Silenciar acciones" },
  { value: "COMENTARIO_SILENCIADO", label: "Silenciar comentarios (sin efecto aún: no hay comentarios)" },
  { value: "BAN_COMPLETO", label: "Ban completo (revoca sesiones al instante)" }
];

export function UsuarioDetalleClient({ userId }: { userId: string }) {
  const [detalle, setDetalle] = useState<Detalle | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [aviso, setAviso] = useState<string | null>(null);

  const load = useCallback(async () => {
    const response = await fetch(`/api/admin/users/${userId}`);
    const data = (await response.json().catch(() => null)) as
      | { usuario?: Detalle; error?: string }
      | null;
    if (!response.ok || !data?.usuario) {
      setError(data?.error ?? "No se pudo cargar el usuario");
      return;
    }
    setDetalle(data.usuario);
  }, [userId]);

  useEffect(() => {
    void load();
  }, [load]);

  if (error) {
    return <p className="cuenta-error">{error}</p>;
  }
  if (!detalle) {
    return <p className="cuenta-status">Cargando…</p>;
  }

  const profile = detalle.profile;

  return (
    <div className="cuenta">
      <p>
        <Link href="/admin/usuarios">← Volver al listado</Link>
      </p>
      {aviso && (
        <p className="cuenta-aviso" role="status">
          {aviso}
        </p>
      )}

      <header className="cuenta-header">
        <div>
          <p className="eyebrow">Detalle de usuario</p>
          <h1>{profile?.alias ?? detalle.displayName}</h1>
          <p className="cuenta-nota">
            {detalle.email} · {detalle.rango} · registrado el{" "}
            {new Date(detalle.createdAt).toLocaleDateString("es-CL")}
            {detalle.role === "ADMIN" && " · ADMIN"}
          </p>
        </div>
        {profile?.avatar && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className="cuenta-avatar"
            src={profile.avatar.imageUrl}
            alt=""
            width={72}
            height={72}
          />
        )}
      </header>

      <section className="panel cuenta-panel">
        <h2>Datos personales (privados)</h2>
        <dl className="admin-datos">
          <dt>Nombre</dt>
          <dd>
            {[profile?.nombre, profile?.apellidoPaterno, profile?.apellidoMaterno]
              .filter(Boolean)
              .join(" ") || "—"}
          </dd>
          <dt>Fecha de nacimiento</dt>
          <dd>
            {profile?.fechaNacimiento
              ? new Date(profile.fechaNacimiento).toLocaleDateString("es-CL")
              : "—"}
          </dd>
          <dt>Ubicación</dt>
          <dd>{[profile?.comuna, profile?.ciudad, profile?.pais].filter(Boolean).join(", ") || "—"}</dd>
        </dl>
      </section>

      <section className="panel cuenta-panel">
        <h2>Aura</h2>
        <p>
          Senda: {detalle.sendaPrincipal ?? "sin despertar"}
          {detalle.sendasCercanas.length > 0 && ` (cercanas: ${detalle.sendasCercanas.join(", ")})`}
          {detalle.sendaTest?.eligioManual && " · elección manual"}
        </p>
        <p>
          HU: {detalle.habilidadUnica ? `${detalle.habilidadUnica.nombre} (${detalle.habilidadUnica.rareza})` : "—"}
        </p>
        <p>
          Logros: {detalle.logros.length} · Relatos con progreso: {detalle.progresos.length} ·
          Sesiones activas: {detalle.sesiones.length}
        </p>
      </section>

      <RestriccionesPanel
        userId={userId}
        restricciones={detalle.restricciones}
        onChange={load}
        onAviso={setAviso}
      />
    </div>
  );
}

function RestriccionesPanel({
  userId,
  restricciones,
  onChange,
  onAviso
}: {
  userId: string;
  restricciones: Restriccion[];
  onChange: () => Promise<void> | void;
  onAviso: (mensaje: string | null) => void;
}) {
  const [type, setType] = useState(TIPOS[0].value);
  const [reason, setReason] = useState("");
  const [expiresAt, setExpiresAt] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  return (
    <section className="panel cuenta-panel">
      <h2>Moderación</h2>

      {restricciones.length > 0 && (
        <div className="cuenta-tabla-wrap">
          <table className="cuenta-tabla">
            <thead>
              <tr>
                <th>Tipo</th>
                <th>Estado</th>
                <th>Motivo (interno)</th>
                <th>Aplicada</th>
                <th>Expira</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {restricciones.map((restriction) => (
                <tr key={restriction.id}>
                  <td>{restriction.type}</td>
                  <td>
                    {restriction.vigente
                      ? "vigente"
                      : restriction.active
                        ? "vencida"
                        : "levantada"}
                  </td>
                  <td>{restriction.reason}</td>
                  <td>{new Date(restriction.appliedAt).toLocaleDateString("es-CL")}</td>
                  <td>
                    {restriction.expiresAt
                      ? new Date(restriction.expiresAt).toLocaleString("es-CL")
                      : "permanente"}
                  </td>
                  <td>
                    {restriction.active && (
                      <button
                        type="button"
                        className="button button--ghost"
                        onClick={async () => {
                          const response = await fetch(
                            `/api/admin/users/${userId}/restrictions/${restriction.id}`,
                            { method: "DELETE" }
                          );
                          onAviso(response.ok ? "Restricción levantada." : "No se pudo levantar");
                          await onChange();
                        }}
                      >
                        Levantar
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <form
        className="cuenta-form"
        onSubmit={async (event) => {
          event.preventDefault();
          setBusy(true);
          setError(null);
          const response = await fetch(`/api/admin/users/${userId}/restrictions`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              type,
              reason,
              expiresAt: expiresAt ? new Date(expiresAt).toISOString() : null
            })
          });
          const data = (await response.json().catch(() => null)) as { error?: string } | null;
          setBusy(false);
          if (!response.ok) {
            setError(data?.error ?? "No se pudo aplicar la restricción");
            return;
          }
          setReason("");
          setExpiresAt("");
          onAviso("Restricción aplicada.");
          await onChange();
        }}
      >
        <label>
          Tipo de restricción
          <select value={type} onChange={(event) => setType(event.target.value)}>
            {TIPOS.map((tipo) => (
              <option key={tipo.value} value={tipo.value}>
                {tipo.label}
              </option>
            ))}
          </select>
        </label>
        <label>
          Motivo (interno — nunca se muestra al usuario)
          <input value={reason} onChange={(event) => setReason(event.target.value)} minLength={3} maxLength={500} required />
        </label>
        <label>
          Expira (vacío = permanente hasta levantarla a mano)
          <input type="datetime-local" value={expiresAt} onChange={(event) => setExpiresAt(event.target.value)} />
        </label>
        {error && <p className="cuenta-error">{error}</p>}
        <div>
          <button className="button" type="submit" disabled={busy}>
            Aplicar restricción
          </button>
        </div>
      </form>
    </section>
  );
}
