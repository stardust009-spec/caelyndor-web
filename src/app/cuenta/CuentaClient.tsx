"use client";

import { useCallback, useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

type Avatar = { id: string; slug: string; characterName: string; style: string; imageUrl: string };

type Perfil = {
  id: string;
  email: string;
  displayName: string;
  currentRank: string;
  rankLabel: string;
  sendaPrincipal: string | null;
  sendasCercanas: string[];
  habilidadUnica: { id: string; nombre: string; descripcion: string; rareza: string } | null;
  relatosCompletados: number;
  relatosCanonicosDisponibles: number;
  proximoRango: { label: string; needed: number; current: number } | null;
  logrosDesbloqueados: number;
  logrosTotales: number;
  logros: { achievementId: string; unlockedAt: string }[];
  profile: {
    alias: string;
    nombre: string | null;
    apellidoPaterno: string | null;
    apellidoMaterno: string | null;
    fechaNacimiento: string | null;
    pais: string | null;
    ciudad: string | null;
    comuna: string | null;
    themePreference: "RUBI" | "NOCT" | "SISTEMA";
    avatar: Avatar | null;
  } | null;
};

type Sesion = {
  id: string;
  deviceLabel: string;
  locationLabel: string;
  createdAt: string;
  lastActiveAt: string;
  isCurrent: boolean;
};

type Placeholder = { id: string; sortOrder: number; hintText: string | null };

function formatDate(value: string): string {
  return new Date(value).toLocaleString("es-CL", { dateStyle: "medium", timeStyle: "short" });
}

async function jsonFetch<T>(url: string, init?: RequestInit): Promise<{ ok: boolean; status: number; data: T | null; error?: string }> {
  const response = await fetch(url, {
    ...init,
    headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) }
  });
  let data: (T & { error?: string }) | null = null;
  try {
    data = (await response.json()) as T & { error?: string };
  } catch {
    /* respuesta sin body */
  }
  return { ok: response.ok, status: response.status, data, error: data?.error };
}

export function CuentaClient() {
  // update() dispara el callback jwt con trigger "update", que relee alias y
  // avatar desde la BD y reemite el token. Como el header consume la misma
  // sesión vía SessionProvider, el cambio se ve al instante en todo el sitio
  // sin cerrar sesión.
  const { update: refrescarSesion } = useSession();
  const [loading, setLoading] = useState(true);
  const [perfil, setPerfil] = useState<Perfil | null>(null);
  const [sesiones, setSesiones] = useState<Sesion[]>([]);
  const [avatares, setAvatares] = useState<Avatar[]>([]);
  const [placeholders, setPlaceholders] = useState<Placeholder[]>([]);
  const [aviso, setAviso] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    const profileResult = await jsonFetch<Perfil>("/api/user/profile");
    if (!profileResult.ok) {
      setPerfil(null);
      setLoading(false);
      return;
    }
    setPerfil(profileResult.data);
    const [sesionesResult, avataresResult, placeholdersResult] = await Promise.all([
      jsonFetch<{ sesiones: Sesion[] }>("/api/sessions"),
      jsonFetch<{ avatares: Avatar[] }>("/api/avatars"),
      jsonFetch<{ placeholders: Placeholder[] }>("/api/achievements/placeholders")
    ]);
    setSesiones(sesionesResult.data?.sesiones ?? []);
    setAvatares(avataresResult.data?.avatares ?? []);
    setPlaceholders(placeholdersResult.data?.placeholders ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  /** Para los cambios que el header muestra (avatar y alias): además de
   *  recargar el panel, reemite el token para que el header se entere. */
  const refrescarPerfilYSesion = useCallback(async () => {
    await refresh();
    await refrescarSesion();
  }, [refresh, refrescarSesion]);

  if (loading) {
    return <p className="cuenta-status">Consultando tu Aura…</p>;
  }

  if (!perfil) {
    return <AccesoForm onDone={() => { setLoading(true); void refresh(); }} />;
  }

  return (
    <div className="cuenta">
      {aviso && (
        <p className="cuenta-aviso" role="status">
          {aviso}
        </p>
      )}

      <header className="cuenta-header">
        <div>
          <p className="eyebrow">Perfil del Aura</p>
          <h1>{perfil.profile?.alias ?? perfil.displayName}</h1>
          <p className="cuenta-rango">
            {perfil.rankLabel} — {perfil.relatosCompletados} de {perfil.relatosCanonicosDisponibles}{" "}
            relatos canónicos
            {perfil.proximoRango && (
              <>
                {" "}· Próximo: {perfil.proximoRango.label} ({perfil.proximoRango.current}/
                {perfil.proximoRango.needed})
              </>
            )}
          </p>
          {perfil.sendaPrincipal && (
            <p className="cuenta-senda">
              Senda: <strong>{perfil.sendaPrincipal}</strong>
              {perfil.sendasCercanas.length > 0 && <> · cercanas: {perfil.sendasCercanas.join(", ")}</>}
            </p>
          )}
          {perfil.habilidadUnica && (
            <p className="cuenta-hu">
              Habilidad Única: <strong>{perfil.habilidadUnica.nombre}</strong> (
              {perfil.habilidadUnica.rareza.toLowerCase().replace("_", " ")})
            </p>
          )}
        </div>
        {perfil.profile?.avatar && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className="cuenta-avatar"
            src={perfil.profile.avatar.imageUrl}
            alt={`Avatar: ${perfil.profile.avatar.characterName}`}
            width={96}
            height={96}
          />
        )}
      </header>

      <LogrosPanel perfil={perfil} placeholders={placeholders} />
      <AvatarPanel
        avatares={avatares}
        actual={perfil.profile?.avatar ?? null}
        onChange={refrescarPerfilYSesion}
        onAviso={setAviso}
      />
      <AliasPanel
        actual={perfil.profile?.alias ?? perfil.displayName}
        onChange={refrescarPerfilYSesion}
        onAviso={setAviso}
      />
      <TemaPanel actual={perfil.profile?.themePreference ?? "SISTEMA"} onAviso={setAviso} />
      <DatosPanel perfil={perfil} onChange={refresh} onAviso={setAviso} />
      <SesionesPanel sesiones={sesiones} onChange={refresh} onAviso={setAviso} />

      <div className="cuenta-cerrar">
        <button
          type="button"
          className="button button--ghost"
          onClick={() => void signOut({ callbackUrl: "/" })}
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}

function AccesoForm({ onDone }: { onDone: () => void }) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alias, setAlias] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError(null);

    if (mode === "register") {
      const result = await jsonFetch<{ user: unknown }>("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({ email, password, displayName: alias })
      });
      if (!result.ok) {
        setError(result.error ?? "No se pudo crear la cuenta");
        setBusy(false);
        return;
      }
    }

    const login = await signIn("credentials", { redirect: false, email, password });
    setBusy(false);
    if (login?.error) {
      setError("Credenciales inválidas");
      return;
    }
    onDone();
  }

  return (
    <div className="cuenta-acceso panel">
      <p className="eyebrow">Cuenta</p>
      <h1>{mode === "login" ? "Entrar a Caelyndor" : "Despierta tu Aura"}</h1>
      <form onSubmit={submit} className="cuenta-form">
        {mode === "register" && (
          <label>
            Alias público
            <input
              value={alias}
              onChange={(event) => setAlias(event.target.value)}
              minLength={3}
              maxLength={30}
              required
            />
          </label>
        )}
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            autoComplete="email"
          />
        </label>
        <label>
          Contraseña
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            minLength={mode === "register" ? 10 : 1}
            required
            autoComplete={mode === "register" ? "new-password" : "current-password"}
          />
        </label>
        {error && <p className="cuenta-error">{error}</p>}
        <button className="button" type="submit" disabled={busy}>
          {busy ? "…" : mode === "login" ? "Entrar" : "Crear cuenta"}
        </button>
      </form>
      <button
        type="button"
        className="cuenta-switch"
        onClick={() => {
          setMode(mode === "login" ? "register" : "login");
          setError(null);
        }}
      >
        {mode === "login" ? "¿Sin cuenta aún? Despierta tu Aura" : "¿Ya tienes cuenta? Entrar"}
      </button>
    </div>
  );
}

function LogrosPanel({ perfil, placeholders }: { perfil: Perfil; placeholders: Placeholder[] }) {
  const porcentaje =
    perfil.logrosTotales > 0 ? Math.round((perfil.logrosDesbloqueados / perfil.logrosTotales) * 100) : 0;
  return (
    <section className="panel cuenta-panel">
      <h2>Logros</h2>
      <p>
        {perfil.logrosDesbloqueados} de {perfil.logrosTotales} desbloqueados
      </p>
      <div
        className="cuenta-barra"
        role="progressbar"
        aria-valuenow={porcentaje}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div className="cuenta-barra__fill" style={{ width: `${porcentaje}%` }} />
      </div>
      {placeholders.length > 0 && (
        <ul className="cuenta-latentes">
          {placeholders.map((placeholder) => (
            <li key={placeholder.id} className="cuenta-latente" title={placeholder.hintText ?? undefined}>
              <span aria-hidden="true">🔒</span> ???
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function AvatarPanel({
  avatares,
  actual,
  onChange,
  onAviso
}: {
  avatares: Avatar[];
  actual: Avatar | null;
  onChange: () => Promise<void> | void;
  onAviso: (mensaje: string | null) => void;
}) {
  return (
    <section className="panel cuenta-panel">
      <h2>Avatar</h2>
      <p className="cuenta-nota">Catálogo curado del universo — se amplía con el tiempo.</p>
      <div className="cuenta-avatares">
        {avatares.map((avatar) => (
          <button
            key={avatar.id}
            type="button"
            className={`cuenta-avatar-opcion ${actual?.id === avatar.id ? "cuenta-avatar-opcion--activo" : ""}`}
            onClick={async () => {
              const result = await jsonFetch("/api/user/avatar", {
                method: "POST",
                body: JSON.stringify({ avatarId: avatar.id })
              });
              onAviso(result.ok ? null : (result.error ?? "No se pudo cambiar el avatar"));
              await onChange();
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={avatar.imageUrl} alt="" width={64} height={64} />
            <span>
              {avatar.characterName}
              <small>{avatar.style === "CHIBI" ? "chibi" : "retrato"}</small>
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}

function AliasPanel({
  actual,
  onChange,
  onAviso
}: {
  actual: string;
  onChange: () => Promise<void> | void;
  onAviso: (mensaje: string | null) => void;
}) {
  const [alias, setAlias] = useState(actual);
  const [flavor, setFlavor] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  return (
    <section className="panel cuenta-panel">
      <h2>Alias público</h2>
      <form
        className="cuenta-form cuenta-form--inline"
        onSubmit={async (event) => {
          event.preventDefault();
          setError(null);
          setFlavor(null);
          const result = await jsonFetch<{ alias: string; flavor?: string }>("/api/user/alias", {
            method: "POST",
            body: JSON.stringify({ alias })
          });
          if (!result.ok) {
            setError(result.error ?? "No se pudo cambiar el alias");
            setFlavor((result.data as { flavor?: string } | null)?.flavor ?? null);
            return;
          }
          onAviso("Alias actualizado.");
          await onChange();
        }}
      >
        <input value={alias} onChange={(event) => setAlias(event.target.value)} minLength={3} maxLength={30} />
        <button className="button" type="submit">
          Guardar
        </button>
      </form>
      {error && <p className="cuenta-error">{error}</p>}
      {flavor && <p className="cuenta-flavor">{flavor}</p>}
    </section>
  );
}

const TEMAS: { value: "RUBI" | "NOCT" | "SISTEMA"; label: string }[] = [
  { value: "RUBI", label: "Rubí (día)" },
  { value: "NOCT", label: "Noct (noche)" },
  { value: "SISTEMA", label: "Sistema" }
];

function TemaPanel({
  actual,
  onAviso
}: {
  actual: "RUBI" | "NOCT" | "SISTEMA";
  onAviso: (mensaje: string | null) => void;
}) {
  const [tema, setTema] = useState(actual);

  function applyLocal(value: "RUBI" | "NOCT" | "SISTEMA") {
    const lower = value.toLowerCase();
    try {
      if (value === "SISTEMA") {
        localStorage.removeItem("caelyndor-theme");
        delete document.documentElement.dataset.theme;
      } else {
        localStorage.setItem("caelyndor-theme", lower);
        document.documentElement.dataset.theme = lower;
      }
    } catch {
      /* almacenamiento no disponible */
    }
  }

  return (
    <section className="panel cuenta-panel">
      <h2>Tema</h2>
      <div className="cuenta-temas" role="radiogroup" aria-label="Preferencia de tema">
        {TEMAS.map((opcion) => (
          <button
            key={opcion.value}
            type="button"
            role="radio"
            aria-checked={tema === opcion.value}
            className={`button button--ghost ${tema === opcion.value ? "cuenta-tema--activo" : ""}`}
            onClick={async () => {
              setTema(opcion.value);
              applyLocal(opcion.value);
              const result = await jsonFetch("/api/user/theme", {
                method: "PATCH",
                body: JSON.stringify({ themePreference: opcion.value })
              });
              onAviso(result.ok ? null : "No se pudo guardar la preferencia de tema");
            }}
          >
            {opcion.label}
          </button>
        ))}
      </div>
    </section>
  );
}

function DatosPanel({
  perfil,
  onChange,
  onAviso
}: {
  perfil: Perfil;
  onChange: () => Promise<void> | void;
  onAviso: (mensaje: string | null) => void;
}) {
  const profile = perfil.profile;
  const [form, setForm] = useState({
    nombre: profile?.nombre ?? "",
    apellidoPaterno: profile?.apellidoPaterno ?? "",
    apellidoMaterno: profile?.apellidoMaterno ?? "",
    fechaNacimiento: profile?.fechaNacimiento ? profile.fechaNacimiento.slice(0, 10) : "",
    pais: profile?.pais ?? "Chile",
    ciudad: profile?.ciudad ?? "",
    comuna: profile?.comuna ?? ""
  });

  function set<K extends keyof typeof form>(key: K, value: string) {
    setForm((previous) => ({ ...previous, [key]: value }));
  }

  return (
    <section className="panel cuenta-panel">
      <h2>Datos personales</h2>
      <p className="cuenta-nota">
        Todos opcionales y privados: solo tú los ves en este panel. Un eventual perfil público mostraría
        únicamente alias, avatar, rango y logros.
      </p>
      <form
        className="cuenta-form cuenta-form--grid"
        onSubmit={async (event) => {
          event.preventDefault();
          const result = await jsonFetch("/api/user/profile", {
            method: "PATCH",
            body: JSON.stringify({
              nombre: form.nombre || null,
              apellidoPaterno: form.apellidoPaterno || null,
              apellidoMaterno: form.apellidoMaterno || null,
              fechaNacimiento: form.fechaNacimiento || null,
              pais: form.pais || null,
              ciudad: form.ciudad || null,
              comuna: form.comuna || null
            })
          });
          onAviso(result.ok ? "Datos guardados." : (result.error ?? "No se pudieron guardar los datos"));
          await onChange();
        }}
      >
        <label>
          Nombre
          <input value={form.nombre} onChange={(event) => set("nombre", event.target.value)} maxLength={60} />
        </label>
        <label>
          Apellido paterno
          <input
            value={form.apellidoPaterno}
            onChange={(event) => set("apellidoPaterno", event.target.value)}
            maxLength={60}
          />
        </label>
        <label>
          Apellido materno
          <input
            value={form.apellidoMaterno}
            onChange={(event) => set("apellidoMaterno", event.target.value)}
            maxLength={60}
          />
        </label>
        <label>
          Fecha de nacimiento
          <input
            type="date"
            value={form.fechaNacimiento}
            onChange={(event) => set("fechaNacimiento", event.target.value)}
          />
        </label>
        <label>
          País
          <input value={form.pais} onChange={(event) => set("pais", event.target.value)} maxLength={60} />
        </label>
        <label>
          Ciudad
          <input value={form.ciudad} onChange={(event) => set("ciudad", event.target.value)} maxLength={80} />
        </label>
        <label>
          Comuna
          <input value={form.comuna} onChange={(event) => set("comuna", event.target.value)} maxLength={80} />
        </label>
        <div className="cuenta-form__acciones">
          <button className="button" type="submit">
            Guardar datos
          </button>
        </div>
      </form>
    </section>
  );
}

function SesionesPanel({
  sesiones,
  onChange,
  onAviso
}: {
  sesiones: Sesion[];
  onChange: () => Promise<void> | void;
  onAviso: (mensaje: string | null) => void;
}) {
  return (
    <section className="panel cuenta-panel">
      <h2>Sesiones activas</h2>
      <p className="cuenta-nota">La ubicación es aproximada (derivada de IP, a nivel ciudad).</p>
      <div className="cuenta-tabla-wrap">
        <table className="cuenta-tabla">
          <thead>
            <tr>
              <th>Dispositivo</th>
              <th>Ubicación aproximada</th>
              <th>Creado</th>
              <th>Actualizado</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {sesiones.map((sesion) => (
              <tr key={sesion.id}>
                <td>
                  {sesion.deviceLabel}
                  {sesion.isCurrent && <span className="cuenta-actual"> · Este dispositivo</span>}
                </td>
                <td>{sesion.locationLabel}</td>
                <td>{formatDate(sesion.createdAt)}</td>
                <td>{formatDate(sesion.lastActiveAt)}</td>
                <td>
                  {sesion.isCurrent ? (
                    <button
                      type="button"
                      className="button button--ghost"
                      onClick={() => void signOut({ callbackUrl: "/" })}
                    >
                      Cerrar sesión
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="button button--ghost"
                      onClick={async () => {
                        const result = await jsonFetch(`/api/sessions/${sesion.id}/revoke`, { method: "POST" });
                        onAviso(result.ok ? "Sesión revocada." : (result.error ?? "No se pudo revocar"));
                        await onChange();
                      }}
                    >
                      Revocar
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
