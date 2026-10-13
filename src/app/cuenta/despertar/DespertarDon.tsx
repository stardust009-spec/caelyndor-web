"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { useParticulas } from "@/components/aura/useParticulas";

type Rareza = "COMUN" | "POCO_COMUN" | "EPICA" | "LEGENDARIA";

type Habilidad = { id: string; nombre: string; descripcion: string; rareza: Rareza };

type PerfilDon = {
  relatosCompletados: number;
  huUmbral: number;
  sendaPrincipal: string | null;
  habilidadUnica: Habilidad | null;
};

type Fase =
  | "cargando"
  | "sin-sesion"
  | "error-carga"
  | "dormido"
  | "sin-senda"
  | "listo"
  | "despertando"
  | "eligiendo"
  | "revelado";

/** Cada rareza tiene su color y la intensidad de su estallido. */
const RAREZAS: Record<Rareza, { etiqueta: string; color: string; chispa: string; fuerza: number }> = {
  COMUN: { etiqueta: "Común", color: "#d7e0ee", chispa: "#ffffff", fuerza: 60 },
  POCO_COMUN: { etiqueta: "Poco común", color: "#5fe3bb", chispa: "#d6fff1", fuerza: 90 },
  EPICA: { etiqueta: "Épica", color: "#b37dff", chispa: "#eadbff", fuerza: 140 },
  LEGENDARIA: { etiqueta: "Legendaria", color: "#ffcf5a", chispa: "#fff4d1", fuerza: 210 }
};

const COLOR_DORMIDO = "#9aa6c4";

function espera(ms: number) {
  return new Promise<void>((resolve) => window.setTimeout(resolve, ms));
}

/** Arcos eléctricos de la rareza Épica: zigzags que parpadean alrededor. */
const ARCOS = [
  "M8 30 L18 34 L14 42 L26 46 L22 54",
  "M92 26 L82 32 L88 40 L76 44 L80 52",
  "M14 78 L24 72 L22 82 L34 80",
  "M86 76 L76 70 L80 82 L68 78"
];

export function DespertarDon() {
  const [fase, setFase] = useState<Fase>("cargando");
  const [perfil, setPerfil] = useState<PerfilDon | null>(null);
  const [habilidad, setHabilidad] = useState<Habilidad | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [clave, setClave] = useState(0);
  const [sacudida, setSacudida] = useState(false);

  const raizRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nucleoRef = useRef<HTMLDivElement>(null);
  const reducido = useRef(false);
  const particulas = useParticulas(canvasRef);

  useEffect(() => {
    reducido.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const pausa = useCallback((ms: number) => espera(reducido.current ? Math.min(ms, 150) : ms), []);

  const centro = useCallback(() => {
    const raiz = raizRef.current?.getBoundingClientRect();
    const nucleo = nucleoRef.current?.getBoundingClientRect();
    if (!raiz || !nucleo) return { x: 0, y: 0 };
    return { x: nucleo.left - raiz.left + nucleo.width / 2, y: nucleo.top - raiz.top + nucleo.height / 2 };
  }, []);

  useEffect(() => {
    let cancelado = false;
    (async () => {
      try {
        const respuesta = await fetch("/api/user/profile");
        if (cancelado) return;
        if (respuesta.status === 401) {
          setFase("sin-sesion");
          return;
        }
        if (!respuesta.ok) {
          setFase("error-carga");
          return;
        }
        const datos = (await respuesta.json()) as PerfilDon;
        if (cancelado) return;
        setPerfil(datos);
        if (datos.habilidadUnica) {
          setHabilidad(datos.habilidadUnica);
          setFase("revelado");
        } else if (datos.relatosCompletados < datos.huUmbral) {
          setFase("dormido");
        } else if (!datos.sendaPrincipal) {
          setFase("sin-senda");
        } else {
          setFase("listo");
        }
      } catch {
        if (!cancelado) setFase("error-carga");
      }
    })();
    return () => {
      cancelado = true;
    };
  }, []);

  async function despertar() {
    if (fase !== "listo") return;
    setError(null);
    setFase("despertando");

    const peticion = fetch("/api/hu/reveal", { method: "POST" })
      .then(async (r) => ({
        ok: r.ok,
        datos: (await r.json().catch(() => null)) as { habilidad?: Habilidad; error?: string } | null
      }))
      .catch(() => null);

    const [resultado] = await Promise.all([peticion, pausa(3200)]);
    const nueva = resultado?.ok ? resultado.datos?.habilidad : undefined;
    if (!nueva) {
      setError(resultado?.datos?.error ?? "El don no respondió. Inténtalo de nuevo.");
      setFase("listo");
      return;
    }

    setHabilidad(nueva);
    setFase("eligiendo");
    await pausa(1300);

    const rareza = RAREZAS[nueva.rareza] ?? RAREZAS.COMUN;
    const { x, y } = centro();
    setFase("revelado");
    setClave((n) => n + 1);
    particulas.estallido(x, y, rareza.color, rareza.fuerza, 280 + rareza.fuerza * 1.8);
    particulas.estallido(x, y, rareza.chispa, 40, 260);
    if (nueva.rareza === "EPICA") {
      window.setTimeout(() => particulas.estallido(x, y, rareza.chispa, 70, 460), 450);
    }
    if (nueva.rareza === "LEGENDARIA") {
      setSacudida(true);
      window.setTimeout(() => setSacudida(false), 700);
      particulas.lluvia(rareza.color, 130);
      window.setTimeout(() => particulas.lluvia(rareza.chispa, 70), 800);
      window.setTimeout(() => particulas.estallido(x, y, rareza.color, 90, 620), 600);
    }
  }

  const rareza = habilidad ? RAREZAS[habilidad.rareza] ?? RAREZAS.COMUN : null;
  const color = fase === "revelado" && rareza ? rareza.color : COLOR_DORMIDO;
  const progreso = perfil ? Math.min(1, perfil.relatosCompletados / Math.max(1, perfil.huUmbral)) : 0;

  return (
    <div
      ref={raizRef}
      className={`ritual don${sacudida ? " is-sacudida" : ""}`}
      data-fase={fase}
      data-rareza={fase === "revelado" ? habilidad?.rareza : undefined}
      style={{ "--senda": color, "--cristal": color } as CSSProperties}
    >
      <canvas ref={canvasRef} className="ritual__particulas" aria-hidden="true" />
      <div className="ritual__nebulosa" aria-hidden="true" />

      <div className="ritual__escenario" aria-hidden="true">
        <div className="ritual__orbe">
          {fase === "revelado" && <div key={`rayos-${clave}`} className="don__rayos" />}
          {fase === "revelado" && habilidad?.rareza === "EPICA" && (
            <svg key={`arcos-${clave}`} className="don__arcos" viewBox="0 0 100 100">
              {ARCOS.map((d, i) => (
                <path key={d} d={d} style={{ "--i": i } as CSSProperties} />
              ))}
            </svg>
          )}
          {fase === "dormido" && (
            <svg className="don__progreso" viewBox="0 0 100 100">
              <circle className="don__progreso-fondo" cx="50" cy="50" r="44" />
              <circle
                className="don__progreso-valor"
                cx="50"
                cy="50"
                r="44"
                pathLength={1}
                style={{ "--progreso": progreso } as CSSProperties}
              />
            </svg>
          )}
          {(fase === "despertando" || fase === "eligiendo") && (
            <div className="don__orbita">
              {[0, 1, 2].map((i) => (
                <span key={i} className={`don__destello don__destello--${i + 1}`} />
              ))}
            </div>
          )}
          <div ref={nucleoRef} className="don__nucleo">
            <span className="don__nucleo-luz" />
          </div>
        </div>
        {fase === "revelado" && <div key={`destello-${clave}`} className="ritual__destello" />}
      </div>

      <div className="ritual__contenido">
        {fase === "cargando" && <p className="ritual__susurro">Buscando tu don…</p>}

        {fase === "error-carga" && (
          <div className="ritual__panel">
            <h1>El don no responde</h1>
            <p>No pudimos consultar tu Aura. Recarga la página en un momento.</p>
          </div>
        )}

        {fase === "sin-sesion" && (
          <div className="ritual__panel">
            <p className="ritual__eyebrow">Prueba del Aura Interna</p>
            <h1>El don solo despierta en un Aura con nombre</h1>
            <p>Entra a tu cuenta, o crea una, para seguir tu camino.</p>
            <Link className="ritual__boton" href="/cuenta">
              Entrar a mi cuenta
            </Link>
          </div>
        )}

        {fase === "dormido" && perfil && (
          <div className="ritual__panel">
            <p className="ritual__eyebrow">Prueba del Aura Interna</p>
            <h1>Tu don aún duerme</h1>
            <p>
              Despierta al completar {perfil.huUmbral} relatos. Llevas{" "}
              <strong>
                {perfil.relatosCompletados} de {perfil.huUmbral}
              </strong>
              . La biblioteca sigue creciendo: cada relato nuevo te acerca.
            </p>
            <Link className="ritual__boton" href="/relatos">
              Seguir leyendo
            </Link>
          </div>
        )}

        {fase === "sin-senda" && (
          <div className="ritual__panel">
            <p className="ritual__eyebrow">Prueba del Aura Interna</p>
            <h1>Antes del don, el cristal</h1>
            <p>Tu Aura está lista, pero primero el cristal debe leer tu Senda.</p>
            <Link className="ritual__boton" href="/cuenta/ritual">
              Ir al Ritual de Afinación
            </Link>
          </div>
        )}

        {fase === "listo" && (
          <div className="ritual__panel">
            <p className="ritual__eyebrow">Prueba del Aura Interna</p>
            <h1>Tres destellos te esperan</h1>
            <p>
              Tu Aura elegirá uno, no tú. Lo que despierte será tuyo para siempre: hay dones comunes y
              otros que aparecen muy pocas veces en una generación.
            </p>
            {error && <p className="ritual__error">{error}</p>}
            <button type="button" className="ritual__boton" onClick={() => void despertar()}>
              Despertar el don
            </button>
          </div>
        )}

        {(fase === "despertando" || fase === "eligiendo") && (
          <div className="ritual__panel" role="status">
            <p className="ritual__susurro ritual__susurro--vivo">
              {fase === "despertando" ? "Tu Aura escucha a los tres destellos" : "Uno de ellos responde"}
            </p>
          </div>
        )}

        {fase === "revelado" && habilidad && rareza && (
          <div className="don-carta" key={`carta-${clave}`}>
            <p className="don-carta__rareza">Habilidad Única · {rareza.etiqueta}</p>
            <h1 className="ritual-revelacion__nombre" aria-label={habilidad.nombre}>
              {Array.from(habilidad.nombre).map((letra, index) => (
                <span key={index} aria-hidden="true" style={{ "--i": index } as CSSProperties}>
                  {letra === " " ? " " : letra}
                </span>
              ))}
            </h1>
            <p className="don-carta__desc">{habilidad.descripcion}</p>
            <p className="ritual__nota">Tu don despertó y es tuyo para siempre.</p>
            <Link className="ritual__boton" href="/cuenta">
              Volver a mi perfil
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
