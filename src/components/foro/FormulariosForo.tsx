"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CATEGORIAS_VESTIBULO, LIMITES_FORO } from "@/data/foro";

async function enviar(url: string, datos: unknown): Promise<{ ok: boolean; data: { id?: string; error?: string } | null }> {
  try {
    const respuesta = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos)
    });
    const data = (await respuesta.json().catch(() => null)) as { id?: string; error?: string } | null;
    return { ok: respuesta.ok, data };
  } catch {
    return { ok: false, data: { error: "Sin conexión. Inténtalo de nuevo." } };
  }
}

/** Aviso para visitantes en lugar de un formulario. */
export function EntrarParaEscribir({ texto }: { texto: string }) {
  return (
    <p className="foro-entrar">
      <Link href="/cuenta">Entra a tu cuenta</Link> {texto}
    </p>
  );
}

export function NuevoHiloForm({ modera, categoriaInicial }: { modera: boolean; categoriaInicial: string | null }) {
  const router = useRouter();
  const disponibles = CATEGORIAS_VESTIBULO.filter((categoria) => modera || !categoria.soloModeracion);
  const [abierto, setAbierto] = useState(false);
  const [categoria, setCategoria] = useState(
    disponibles.find((c) => c.slug === categoriaInicial)?.slug ?? disponibles[0].slug
  );
  const [titulo, setTitulo] = useState("");
  const [cuerpo, setCuerpo] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!abierto) {
    return (
      <button type="button" className="foro-boton" onClick={() => setAbierto(true)}>
        ✦ Abrir un hilo
      </button>
    );
  }

  return (
    <form
      className="foro-form panel"
      onSubmit={async (event) => {
        event.preventDefault();
        setEnviando(true);
        setError(null);
        const resultado = await enviar("/api/foro/hilos", { categoria, titulo, cuerpo });
        setEnviando(false);
        if (!resultado.ok || !resultado.data?.id) {
          setError(resultado.data?.error ?? "No se pudo publicar el hilo");
          return;
        }
        router.push(`/foro/hilo/${resultado.data.id}`);
      }}
    >
      <h2>Nuevo hilo</h2>
      <label>
        Sección
        <select value={categoria} onChange={(event) => setCategoria(event.target.value)}>
          {disponibles.map((opcion) => (
            <option key={opcion.slug} value={opcion.slug}>
              {opcion.nombre}
            </option>
          ))}
        </select>
      </label>
      <label>
        Título <small>(sin spoilers)</small>
        <input
          value={titulo}
          onChange={(event) => setTitulo(event.target.value)}
          minLength={LIMITES_FORO.tituloMin}
          maxLength={LIMITES_FORO.tituloMax}
          required
        />
      </label>
      <label>
        Mensaje
        <textarea
          value={cuerpo}
          onChange={(event) => setCuerpo(event.target.value)}
          rows={6}
          minLength={LIMITES_FORO.cuerpoMin}
          maxLength={LIMITES_FORO.cuerpoMax}
          required
        />
        <small className="foro-contador">
          {cuerpo.length}/{LIMITES_FORO.cuerpoMax}
        </small>
      </label>
      {error && <p className="foro-error">{error}</p>}
      <div className="foro-form__acciones">
        <button type="submit" className="foro-boton" disabled={enviando}>
          {enviando ? "Publicando…" : "Publicar"}
        </button>
        <button type="button" className="foro-boton foro-boton--secundario" onClick={() => setAbierto(false)}>
          Cancelar
        </button>
      </div>
    </form>
  );
}

export function RespuestaForm({ hiloId }: { hiloId: string }) {
  const router = useRouter();
  const [cuerpo, setCuerpo] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <form
      className="foro-form panel"
      onSubmit={async (event) => {
        event.preventDefault();
        setEnviando(true);
        setError(null);
        const resultado = await enviar(`/api/foro/hilos/${hiloId}/mensajes`, { cuerpo });
        setEnviando(false);
        if (!resultado.ok) {
          setError(resultado.data?.error ?? "No se pudo publicar la respuesta");
          return;
        }
        setCuerpo("");
        router.refresh();
      }}
    >
      <label>
        Tu respuesta
        <textarea
          value={cuerpo}
          onChange={(event) => setCuerpo(event.target.value)}
          rows={4}
          minLength={LIMITES_FORO.cuerpoMin}
          maxLength={LIMITES_FORO.cuerpoMax}
          required
        />
        <small className="foro-contador">
          {cuerpo.length}/{LIMITES_FORO.cuerpoMax}
        </small>
      </label>
      {error && <p className="foro-error">{error}</p>}
      <div className="foro-form__acciones">
        <button type="submit" className="foro-boton" disabled={enviando}>
          {enviando ? "Publicando…" : "Responder"}
        </button>
      </div>
    </form>
  );
}
