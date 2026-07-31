"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Usuario = {
  id: string;
  alias: string | null;
  avatarUrl: string | null;
  rango: string;
  registradoEl: string;
};

export function UsuariosClient() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [pageSize, setPageSize] = useState(25);
  const [error, setError] = useState<string | null>(null);
  const [exportando, setExportando] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const response = await fetch(`/api/admin/users?page=${page}`);
      const data = (await response.json().catch(() => null)) as
        | { usuarios?: Usuario[]; total?: number; pageSize?: number; error?: string }
        | null;
      if (cancelled) return;
      if (!response.ok || !data?.usuarios) {
        setError(data?.error ?? "No se pudo cargar el listado");
        return;
      }
      setUsuarios(data.usuarios);
      setTotal(data.total ?? 0);
      setPageSize(data.pageSize ?? 25);
    })();
    return () => {
      cancelled = true;
    };
  }, [page]);

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  async function exportar() {
    // Fricción explícita: exportar expone más que abrir un perfil suelto.
    const seguir = window.confirm(
      `Vas a exportar los datos de ${total} usuarios, incluyendo su correo y ubicación aproximada. ¿Continuar?`
    );
    if (!seguir) {
      return;
    }

    setExportando(true);
    setError(null);
    try {
      const response = await fetch("/api/admin/users/export");
      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as { error?: string } | null;
        setError(data?.error ?? "No se pudo generar la exportación");
        return;
      }
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const nombre =
        response.headers.get("content-disposition")?.match(/filename="([^"]+)"/)?.[1] ??
        "caelyndor-usuarios.csv";
      const enlace = document.createElement("a");
      enlace.href = url;
      enlace.download = nombre;
      document.body.appendChild(enlace);
      enlace.click();
      enlace.remove();
      URL.revokeObjectURL(url);
    } catch {
      setError("No se pudo generar la exportación");
    } finally {
      setExportando(false);
    }
  }

  if (error) {
    return <p className="cuenta-error">{error}</p>;
  }

  return (
    <div className="panel cuenta-panel">
      <div className="admin-listado-cabecera">
        <p className="cuenta-nota">{total} cuentas. La vista de detalle registra auditoría de acceso.</p>
        <button type="button" className="button button--ghost" onClick={exportar} disabled={exportando}>
          {exportando ? "Generando…" : "Exportar"}
        </button>
      </div>
      <div className="cuenta-tabla-wrap">
        <table className="cuenta-tabla">
          <thead>
            <tr>
              <th>Alias</th>
              <th>Rango</th>
              <th>Registro</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td>
                  <span className="admin-alias">
                    {usuario.avatarUrl && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={usuario.avatarUrl} alt="" width={28} height={28} />
                    )}
                    {usuario.alias ?? "(sin alias)"}
                  </span>
                </td>
                <td>{usuario.rango}</td>
                <td>{new Date(usuario.registradoEl).toLocaleDateString("es-CL")}</td>
                <td>
                  <Link className="button button--ghost" href={`/admin/usuarios/${usuario.id}`}>
                    Ver detalle
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <div className="admin-paginacion">
          <button
            type="button"
            className="button button--ghost"
            disabled={page <= 1}
            onClick={() => setPage((value) => value - 1)}
          >
            Anterior
          </button>
          <span>
            {page} / {totalPages}
          </span>
          <button
            type="button"
            className="button button--ghost"
            disabled={page >= totalPages}
            onClick={() => setPage((value) => value + 1)}
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
}
