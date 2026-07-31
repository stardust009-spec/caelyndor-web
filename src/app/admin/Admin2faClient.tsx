"use client";

import { useState } from "react";

export function Admin2faClient({ totpConfigurado }: { totpConfigurado: boolean }) {
  const [otpauthUri, setOtpauthUri] = useState<string | null>(null);
  const [secret, setSecret] = useState<string | null>(null);
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function setup() {
    setBusy(true);
    setError(null);
    const response = await fetch("/api/admin/2fa/setup", { method: "POST" });
    const data = (await response.json().catch(() => null)) as
      | { otpauthUri?: string; secret?: string; error?: string }
      | null;
    setBusy(false);
    if (!response.ok || !data?.otpauthUri) {
      setError(data?.error ?? "No se pudo iniciar la configuración");
      return;
    }
    setOtpauthUri(data.otpauthUri);
    setSecret(data.secret ?? null);
  }

  async function verify(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError(null);
    const response = await fetch("/api/admin/2fa/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code })
    });
    const data = (await response.json().catch(() => null)) as { error?: string } | null;
    setBusy(false);
    if (!response.ok) {
      setError(data?.error ?? "Código incorrecto");
      return;
    }
    window.location.reload();
  }

  return (
    <section className="panel cuenta-panel">
      <h2>Verificación en dos pasos</h2>
      {!totpConfigurado && !otpauthUri && (
        <>
          <p className="cuenta-nota">
            Esta cuenta ve datos personales de otras personas: el 2FA es obligatorio antes de entrar
            al panel.
          </p>
          <button className="button" type="button" onClick={setup} disabled={busy}>
            Configurar 2FA
          </button>
        </>
      )}

      {otpauthUri && (
        <div className="admin-2fa-setup">
          <p>Registra este secreto en tu app autenticadora (Aegis, Google Authenticator, etc.):</p>
          <code className="admin-2fa-secret">{secret}</code>
          <p className="cuenta-nota">
            O abre este enlace en el dispositivo con la app: <br />
            <a href={otpauthUri}>{otpauthUri.slice(0, 60)}…</a>
          </p>
        </div>
      )}

      {(totpConfigurado || otpauthUri) && (
        <form className="cuenta-form cuenta-form--inline" onSubmit={verify}>
          <input
            inputMode="numeric"
            pattern="\d{6}"
            maxLength={6}
            placeholder="Código de 6 dígitos"
            value={code}
            onChange={(event) => setCode(event.target.value.replace(/\D/g, ""))}
            required
          />
          <button className="button" type="submit" disabled={busy || code.length !== 6}>
            Verificar
          </button>
        </form>
      )}

      {error && <p className="cuenta-error">{error}</p>}
    </section>
  );
}
