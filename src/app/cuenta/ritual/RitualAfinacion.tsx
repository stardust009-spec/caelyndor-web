"use client";

import Link from "next/link";
import { Fragment, useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { CristalAura } from "@/components/aura/CristalAura";
import { SelloSenda } from "@/components/aura/SelloSenda";
import { useParticulas } from "@/components/aura/useParticulas";
import { SENDAS, SENDA_IDS, isSendaId, type SendaId } from "@/data/sendas";

type Pregunta = { id: string; prompt: string; options: { id: string; label: string }[] };

type Resultado = {
  sendaPrincipal: string;
  sendasCercanas: string[];
  eligioManual: boolean;
  lectura: string;
  fortalezas: string;
  riesgos: string;
  constelacion: (string | null)[];
};

type EstadoRitual = {
  desbloqueado: boolean;
  completado: boolean;
  puedeElegirManual: boolean;
  resultado: Resultado | null;
  preguntas: Pregunta[] | null;
};

type Fase =
  | "cargando"
  | "sin-sesion"
  | "error-carga"
  | "bloqueado"
  | "umbral"
  | "pregunta"
  | "lectura"
  | "revelacion";

const COLOR_NEUTRO = "#9fd8ff";
const LETRAS_OPCION = ["a", "b", "c", "d", "e"];

function espera(ms: number) {
  return new Promise<void>((resolve) => window.setTimeout(resolve, ms));
}

/** Posición de un nodo de la constelación: única por (pregunta, opción),
 *  así cada combinación de respuestas dibuja una figura distinta. */
function posicionNodo(pregunta: number, opcion: number) {
  const angulo = ((-90 + pregunta * 60 + (opcion - 2) * 11) * Math.PI) / 180;
  const radio = 28 + opcion * 3.8;
  return { x: Math.cos(angulo) * radio, y: Math.sin(angulo) * radio };
}

function indiceOpcion(id: string | null): number {
  const index = id ? LETRAS_OPCION.indexOf(id) : -1;
  return index >= 0 ? index : 2;
}

function Constelacion({ opciones, cerrada }: { opciones: number[]; cerrada: boolean }) {
  const puntos = opciones.map((opcion, pregunta) => posicionNodo(pregunta, opcion));
  return (
    <svg className="constelacion" viewBox="-50 -50 100 100" aria-hidden="true">
      <g className="constelacion__giro">
        <circle className="constelacion__anillo" r="47" />
        {puntos.map((p, i) => (
          <line key={`radio-${i}`} className="constelacion__radio" x1="0" y1="0" x2={p.x} y2={p.y} pathLength={1} />
        ))}
        {puntos.slice(1).map((p, i) => (
          <line
            key={`hilo-${i}`}
            className="constelacion__hilo"
            x1={puntos[i].x}
            y1={puntos[i].y}
            x2={p.x}
            y2={p.y}
            pathLength={1}
          />
        ))}
        {cerrada && puntos.length > 2 && (
          <line
            className="constelacion__hilo constelacion__hilo--cierre"
            x1={puntos[puntos.length - 1].x}
            y1={puntos[puntos.length - 1].y}
            x2={puntos[0].x}
            y2={puntos[0].y}
            pathLength={1}
          />
        )}
        {puntos.map((p, i) => (
          <g
            key={`nodo-${i}`}
            className="constelacion__nodo"
            style={{ "--x": `${p.x}px`, "--y": `${p.y}px`, "--i": i } as CSSProperties}
          >
            <circle className="constelacion__nodo-halo" r="3.4" />
            <circle className="constelacion__nodo-nucleo" r="1.3" />
          </g>
        ))}
      </g>
    </svg>
  );
}

function TituloLetras({ texto }: { texto: string }) {
  return (
    <h1 className="ritual-revelacion__nombre" aria-label={texto}>
      {Array.from(texto).map((letra, index) => (
        <span key={index} aria-hidden="true" style={{ "--i": index } as CSSProperties}>
          {letra === " " ? " " : letra}
        </span>
      ))}
    </h1>
  );
}

export function RitualAfinacion() {
  const [fase, setFase] = useState<Fase>("cargando");
  const [estado, setEstado] = useState<EstadoRitual | null>(null);
  const [indice, setIndice] = useState(0);
  const [respuestas, setRespuestas] = useState<string[]>([]);
  const [elegida, setElegida] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [onda, setOnda] = useState(0);
  const [revelacion, setRevelacion] = useState(0);
  const [eligiendo, setEligiendo] = useState(false);
  const [candidata, setCandidata] = useState<SendaId | null>(null);
  const [enviando, setEnviando] = useState(false);

  const raizRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cristalRef = useRef<HTMLDivElement>(null);
  const tituloRef = useRef<HTMLDivElement>(null);
  const ocupado = useRef(false);
  const reducido = useRef(false);
  const particulas = useParticulas(canvasRef);

  useEffect(() => {
    reducido.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const pausa = useCallback((ms: number) => espera(reducido.current ? Math.min(ms, 150) : ms), []);

  /** Centro del cristal en coordenadas del canvas. */
  const centroCristal = useCallback(() => {
    const raiz = raizRef.current?.getBoundingClientRect();
    const cristal = cristalRef.current?.getBoundingClientRect();
    if (!raiz || !cristal) {
      return { x: 0, y: 0 };
    }
    return { x: cristal.left - raiz.left + cristal.width / 2, y: cristal.top - raiz.top + cristal.height / 2 };
  }, []);

  const mostrarResultado = useCallback(
    (datos: EstadoRitual, conEstallido: boolean) => {
      setEstado(datos);
      if (datos.resultado) {
        setRespuestas(datos.resultado.constelacion.map((id) => id ?? "c"));
      }
      setFase("revelacion");
      setRevelacion((n) => n + 1);
      if (conEstallido && datos.resultado && isSendaId(datos.resultado.sendaPrincipal)) {
        const { x, y } = centroCristal();
        const color = SENDAS[datos.resultado.sendaPrincipal].color;
        particulas.estallido(x, y, color, 150, 560);
        particulas.estallido(x, y, "#ffffff", 50, 300);
      }
      window.setTimeout(() => tituloRef.current?.focus({ preventScroll: true }), 50);
    },
    [centroCristal, particulas]
  );

  // Carga inicial (una sola vez): en qué punto del ritual está el lector.
  const mostrarResultadoRef = useRef(mostrarResultado);
  mostrarResultadoRef.current = mostrarResultado;
  useEffect(() => {
    let cancelado = false;
    (async () => {
      try {
        const respuesta = await fetch("/api/senda-test/status");
        if (cancelado) return;
        if (respuesta.status === 401) {
          setFase("sin-sesion");
          return;
        }
        if (!respuesta.ok) {
          setFase("error-carga");
          return;
        }
        const datos = (await respuesta.json()) as EstadoRitual;
        if (cancelado) return;
        setEstado(datos);
        if (datos.completado && datos.resultado) {
          mostrarResultadoRef.current(datos, false);
        } else if (!datos.desbloqueado) {
          setFase("bloqueado");
        } else {
          setFase("umbral");
        }
      } catch {
        if (!cancelado) setFase("error-carga");
      }
    })();
    return () => {
      cancelado = true;
    };
  }, []);

  const preguntas = estado?.preguntas ?? [];

  async function tocarCristal() {
    if (ocupado.current) return;
    ocupado.current = true;
    const { x, y } = centroCristal();
    particulas.estallido(x, y, COLOR_NEUTRO, 80, 420);
    setOnda((n) => n + 1);
    await pausa(700);
    setIndice(0);
    setRespuestas([]);
    setFase("pregunta");
    ocupado.current = false;
  }

  async function leer(lista: string[]) {
    setFase("lectura");
    setError(null);
    const cuerpo = Object.fromEntries(preguntas.map((pregunta, i) => [pregunta.id, lista[i]]));
    const peticion = fetch("/api/senda-test/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ respuestas: cuerpo })
    })
      .then(async (r) => ({ ok: r.ok, status: r.status, datos: (await r.json().catch(() => null)) as (EstadoRitual & { error?: string }) | null }))
      .catch(() => null);

    // La lectura dura lo que dura la animación, aunque el servidor responda antes.
    const [resultado] = await Promise.all([peticion, pausa(3600)]);

    if (resultado?.ok && resultado.datos?.resultado) {
      mostrarResultado(resultado.datos, true);
      return;
    }
    if (resultado?.status === 409) {
      // Ya estaba hecho (otra pestaña, doble envío): se muestra lo guardado.
      const recarga = await fetch("/api/senda-test/status").catch(() => null);
      const datos = recarga?.ok ? ((await recarga.json()) as EstadoRitual) : null;
      if (datos?.resultado) {
        mostrarResultado(datos, true);
        return;
      }
    }
    setError(resultado?.datos?.error ?? "El cristal no pudo leer tu Aura. Inténtalo de nuevo.");
  }

  async function responder(opcionId: string, boton: HTMLButtonElement) {
    if (ocupado.current || fase !== "pregunta") return;
    ocupado.current = true;
    setElegida(opcionId);

    const raiz = raizRef.current?.getBoundingClientRect();
    const rect = boton.getBoundingClientRect();
    if (raiz) {
      const destino = centroCristal();
      particulas.estela(rect.left - raiz.left + rect.width / 2, rect.top - raiz.top + rect.height / 2, destino.x, destino.y, COLOR_NEUTRO, 30);
    }
    await pausa(720);

    const nuevas = [...respuestas.slice(0, indice), opcionId];
    setRespuestas(nuevas);
    const destino = centroCristal();
    particulas.estallido(destino.x, destino.y, "#ffffff", 18, 160);
    await pausa(520);
    setElegida(null);

    if (nuevas.length >= preguntas.length) {
      ocupado.current = false;
      void leer(nuevas);
      return;
    }
    setIndice(indice + 1);
    ocupado.current = false;
  }

  function volver() {
    if (ocupado.current || indice === 0) return;
    setRespuestas((actuales) => actuales.slice(0, indice - 1));
    setIndice(indice - 1);
  }

  async function confirmarEleccion() {
    if (!candidata || enviando) return;
    setEnviando(true);
    setError(null);
    try {
      const respuesta = await fetch("/api/senda-test/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eleccionManual: candidata })
      });
      const datos = (await respuesta.json().catch(() => null)) as (EstadoRitual & { error?: string }) | null;
      if (!respuesta.ok || !datos?.resultado) {
        setError(datos?.error ?? "No se pudo fijar la Senda. Inténtalo de nuevo.");
        return;
      }
      setEligiendo(false);
      setCandidata(null);
      mostrarResultado(datos, true);
    } catch {
      setError("No se pudo fijar la Senda. Inténtalo de nuevo.");
    } finally {
      setEnviando(false);
    }
  }

  const resultado = estado?.resultado ?? null;
  const principal = resultado && isSendaId(resultado.sendaPrincipal) ? resultado.sendaPrincipal : null;
  const cercanas = (resultado?.sendasCercanas ?? []).filter(
    (senda): senda is SendaId => isSendaId(senda) && senda !== principal
  );
  const colorEscena = fase === "revelacion" && principal ? SENDAS[principal].color : COLOR_NEUTRO;
  const opcionesConstelacion = respuestas.map(indiceOpcion);
  const mostrarConstelacion = fase === "pregunta" || fase === "lectura" || fase === "revelacion";
  const pregunta = preguntas[indice];

  return (
    <div
      ref={raizRef}
      className={`ritual${fase === "lectura" && error ? " is-error" : ""}`}
      data-fase={fase}
      style={{ "--senda": colorEscena, "--cristal": colorEscena } as CSSProperties}
    >
      <canvas ref={canvasRef} className="ritual__particulas" aria-hidden="true" />
      <div className="ritual__nebulosa" aria-hidden="true" />

      <div className="ritual__escenario" aria-hidden="true" onClick={fase === "umbral" ? () => void tocarCristal() : undefined}>
        <div className="ritual__orbe">
          {mostrarConstelacion && (
            <div className="ritual__deriva">
              <Constelacion
                key={fase === "revelacion" ? `rev-${revelacion}` : "ritual"}
                opciones={opcionesConstelacion}
                cerrada={fase !== "pregunta"}
              />
            </div>
          )}
          <div ref={cristalRef} className="ritual__cristal">
            <div className="ritual__halo" />
            {onda > 0 && <div key={onda} className="ritual__onda" />}
            <CristalAura />
          </div>
          {fase === "revelacion" && principal && (
            <div className="ritual-sello" key={`sello-${revelacion}`}>
              <SelloSenda senda={principal} trazar retraso={0.45} className="ritual-sello__principal" />
              {cercanas.length > 0 && (
                <div className="ritual-sello__orbita">
                  {cercanas.slice(0, 2).map((senda, i) => (
                    <div key={senda} className={`ritual-sello__satelite ritual-sello__satelite--${i + 1}`}>
                      <SelloSenda senda={senda} trazar retraso={1.6 + i * 0.3} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
        {fase === "revelacion" && <div key={`destello-${revelacion}`} className="ritual__destello" />}
      </div>

      <div className="ritual__contenido">
        {fase === "cargando" && <p className="ritual__susurro">Despertando el cristal…</p>}

        {fase === "error-carga" && (
          <div className="ritual__panel">
            <h1>El cristal no responde</h1>
            <p>No pudimos consultar tu Aura. Recarga la página en un momento.</p>
          </div>
        )}

        {fase === "sin-sesion" && (
          <div className="ritual__panel">
            <p className="ritual__eyebrow">Ritual de Afinación</p>
            <h1>El cristal solo lee Auras con nombre</h1>
            <p>Entra a tu cuenta, o crea una, para que el cristal pueda leerte.</p>
            <Link className="ritual__boton" href="/cuenta">
              Entrar a mi cuenta
            </Link>
          </div>
        )}

        {fase === "bloqueado" && (
          <div className="ritual__panel">
            <p className="ritual__eyebrow">Ritual de Afinación</p>
            <h1>El cristal aún duerme</h1>
            <p>
              Despierta cuando completas tu primer relato. Léelo hasta el final y vuelve: te estará esperando.
            </p>
            <Link className="ritual__boton" href="/relatos">
              Ir a los relatos
            </Link>
          </div>
        )}

        {fase === "umbral" && (
          <div className="ritual__panel" key="umbral">
            <p className="ritual__eyebrow">Ritual de Afinación</p>
            <h1>El cristal escucha</h1>
            <p>
              Tu Aura no mide tu poder: es un mapa de nodos, una constelación que solo tú tienes. Responde seis
              preguntas sin pensarlo demasiado y el cristal la dibujará para revelarte la Senda que resuena
              contigo.
            </p>
            <p className="ritual__nota">
              El ritual se hace una sola vez. Después podrás corregir tu Senda una única vez.
            </p>
            <button type="button" className="ritual__boton" onClick={() => void tocarCristal()}>
              Tocar el cristal
            </button>
          </div>
        )}

        {fase === "pregunta" && pregunta && (
          <div className="ritual__panel ritual__panel--pregunta" key={`pregunta-${indice}`}>
            <ol className="ritual-progreso" aria-label={`Pregunta ${indice + 1} de ${preguntas.length}`}>
              {preguntas.map((p, i) => (
                <li key={p.id} className={i < indice ? "is-hecha" : i === indice ? "is-actual" : undefined} />
              ))}
            </ol>
            <h2 className="ritual-pregunta" aria-live="polite">
              {pregunta.prompt.split(" ").map((palabra, i) => (
                <Fragment key={i}>
                  <span style={{ "--i": i } as CSSProperties}>{palabra}</span>{" "}
                </Fragment>
              ))}
            </h2>
            <div className="ritual-opciones" role="group" aria-label="Respuestas">
              {pregunta.options.map((opcion, i) => (
                <button
                  key={opcion.id}
                  type="button"
                  className={[
                    "ritual-opcion",
                    elegida === opcion.id ? "is-elegida" : "",
                    elegida && elegida !== opcion.id ? "is-descartada" : ""
                  ].join(" ")}
                  style={{ "--i": i } as CSSProperties}
                  disabled={elegida !== null}
                  onClick={(event) => void responder(opcion.id, event.currentTarget)}
                >
                  {opcion.label}
                </button>
              ))}
            </div>
            {indice > 0 && (
              <button type="button" className="ritual__volver" onClick={volver} disabled={elegida !== null}>
                ← Volver a la pregunta anterior
              </button>
            )}
          </div>
        )}

        {fase === "lectura" && (
          <div className="ritual__panel ritual__panel--lectura" role="status">
            {error ? (
              <>
                <p>{error}</p>
                <button type="button" className="ritual__boton" onClick={() => void leer(respuestas)}>
                  Volver a intentarlo
                </button>
              </>
            ) : (
              <p className="ritual__susurro ritual__susurro--vivo">El cristal está leyendo tu constelación</p>
            )}
          </div>
        )}

        {fase === "revelacion" && resultado && principal && (
          <div className="ritual-revelacion" key={`revelacion-${revelacion}`} ref={tituloRef} tabIndex={-1}>
            <p className="ritual__eyebrow">Tu Aura resuena con la</p>
            <TituloLetras texto={SENDAS[principal].titulo} />
            <p className="ritual-revelacion__lectura">{resultado.lectura}</p>
            <dl className="ritual-revelacion__rasgos">
              <div>
                <dt>Fortalezas</dt>
                <dd>{resultado.fortalezas}</dd>
              </div>
              <div>
                <dt>Riesgos</dt>
                <dd>{resultado.riesgos}</dd>
              </div>
            </dl>
            {cercanas.length > 0 && (
              <p className="ritual-revelacion__cercanas">
                Sendas cercanas:{" "}
                {cercanas.slice(0, 2).map((senda, i) => (
                  <span key={senda} style={{ color: SENDAS[senda].color }}>
                    {i > 0 && " · "}
                    {SENDAS[senda].nombre}
                  </span>
                ))}
              </p>
            )}
            {resultado.eligioManual && (
              <p className="ritual__nota">Esta Senda la elegiste tú: queda fija para siempre.</p>
            )}
            {error && !eligiendo && <p className="ritual__error">{error}</p>}
            <div className="ritual-revelacion__acciones">
              <Link className="ritual__boton" href="/cuenta">
                {estado?.puedeElegirManual ? "Aceptar mi Senda" : "Volver a mi perfil"}
              </Link>
              {estado?.puedeElegirManual && (
                <button
                  type="button"
                  className="ritual__boton ritual__boton--secundario"
                  onClick={() => {
                    setError(null);
                    setEligiendo(true);
                  }}
                >
                  Elegir otra Senda
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {eligiendo && principal && (
        <div
          className="ritual-eleccion"
          role="dialog"
          aria-modal="true"
          aria-labelledby="ritual-eleccion-titulo"
          onKeyDown={(event) => {
            if (event.key === "Escape" && !enviando) {
              setCandidata(null);
              setEligiendo(false);
            }
          }}
        >
          <div className="ritual-eleccion__caja">
            {candidata ? (
              <div
                className="ritual-eleccion__confirmar"
                style={{ "--senda": SENDAS[candidata].color } as CSSProperties}
              >
                <SelloSenda senda={candidata} trazar className="ritual-eleccion__sello-grande" />
                <h2 id="ritual-eleccion-titulo">¿{SENDAS[candidata].titulo}?</h2>
                <p>
                  Es tu única corrección. Después de confirmarla, tu Senda queda fija para siempre.
                </p>
                {error && <p className="ritual__error">{error}</p>}
                <div className="ritual-revelacion__acciones">
                  <button type="button" className="ritual__boton" onClick={() => void confirmarEleccion()} disabled={enviando}>
                    {enviando ? "Fijando…" : "Confirmar"}
                  </button>
                  <button
                    type="button"
                    className="ritual__boton ritual__boton--secundario"
                    onClick={() => setCandidata(null)}
                    disabled={enviando}
                  >
                    Volver
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h2 id="ritual-eleccion-titulo">Elige tu Senda</h2>
                <p>El cristal te leyó así, pero tú conoces tu Aura. Puedes cambiarla una sola vez.</p>
                <div className="ritual-eleccion__rejilla">
                  {SENDA_IDS.map((senda) => (
                    <button
                      key={senda}
                      type="button"
                      className={`ritual-eleccion__opcion${senda === principal ? " is-actual" : ""}`}
                      style={{ "--sello": SENDAS[senda].color } as CSSProperties}
                      disabled={senda === principal}
                      onClick={() => setCandidata(senda)}
                    >
                      <SelloSenda senda={senda} />
                      <span>{SENDAS[senda].nombre}</span>
                      {senda === principal && <small>la tuya</small>}
                    </button>
                  ))}
                </div>
                <button type="button" className="ritual__volver" onClick={() => setEligiendo(false)}>
                  Cancelar
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
