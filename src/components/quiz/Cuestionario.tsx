"use client";

import Link from "next/link";
import { useCallback, useEffect, useState, type CSSProperties } from "react";
import { FechaHora } from "@/components/foro/FechaHora";
import { getEvento } from "@/data/eventosQuiz";

type Tipo = "explicita" | "implicita" | "conexion";
type Modalidad = "principal" | "conexiones";

type EstadoModalidad =
  | { estado: "no_disponible" }
  | { estado: "sin_sesion" }
  | { estado: "bloqueado"; motivo: "no_leido" | "principal_pendiente" }
  | { estado: "disponible"; total: number; minimo: number }
  | { estado: "en_curso"; intentoId: string }
  | { estado: "enfriamiento"; hasta: string }
  | { estado: "aprobado"; aciertos: number; total: number; fecha: string };

type PreguntaPublica = { id: string; tipo: Tipo; dificultad: number; enunciado: string; opciones: string[] };
type Intento = { id: string; modalidad: Modalidad; preguntas: PreguntaPublica[]; respuestas: Record<string, number>; minimo: number };
type Revision = { enunciado: string; tuRespuesta: string | null; correcta: string; acertada: boolean; explicacion: string };

type EstadoQuiz = {
  obra: string;
  titulo: string;
  principal: EstadoModalidad;
  conexiones: EstadoModalidad;
  conectadas: { slug: string; titulo: string }[];
  intento: Intento | null;
  revision: { principal: Revision[] | null; conexiones: Revision[] | null };
};

type Resultado =
  | { aprobado: true; aciertos: number; total: number; expGanada: number; revision: Revision[] }
  | { aprobado: false; aciertos: number; total: number; minimo: number; proximoIntento: string; evento: string; fracasoNumero: number };

const TIPOS: Record<Tipo, string> = {
  explicita: "Lo que está escrito",
  implicita: "Lo que se deduce",
  conexion: "Conexión entre obras"
};

const ORDINALES = ["Primer", "Segundo", "Tercer", "Cuarto", "Quinto", "Sexto", "Séptimo", "Octavo", "Noveno", "Décimo"];

async function api<T>(url: string, datos?: unknown): Promise<{ ok: boolean; status: number; data: (T & { error?: string }) | null }> {
  try {
    const respuesta = await fetch(url, datos === undefined ? { cache: "no-store" } : {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos)
    });
    const data = (await respuesta.json().catch(() => null)) as (T & { error?: string }) | null;
    return { ok: respuesta.ok, status: respuesta.status, data };
  } catch {
    return { ok: false, status: 0, data: null };
  }
}

function RevisionLista({ revision }: { revision: Revision[] }) {
  return (
    <ol className="quiz-revision">
      {revision.map((item, indice) => (
        <li key={indice} className={item.acertada ? "is-acierto" : "is-error"}>
          <p className="quiz-revision__enunciado">{item.enunciado}</p>
          <p>
            <span aria-hidden="true">{item.acertada ? "✓" : "✗"}</span> Tu respuesta: {item.tuRespuesta ?? "sin responder"}
          </p>
          {!item.acertada && <p>Correcta: {item.correcta}</p>}
          <p className="quiz-revision__explicacion">{item.explicacion}</p>
        </li>
      ))}
    </ol>
  );
}

function EventoFracasoBloque({ id }: { id: string }) {
  const evento = getEvento(id);
  if (!evento) return null;
  return (
    <section className="quiz-evento" style={{ "--evento": evento.acento } as CSSProperties} aria-label={`Evento: ${evento.personaje}`}>
      <p className="quiz-evento__titulo">{evento.titulo}</p>
      {evento.lineas.map((linea, indice) =>
        linea.tipo === "dialogo" ? (
          <p key={indice} className="quiz-evento__linea quiz-evento__dialogo" style={{ "--i": indice } as CSSProperties}>
            <strong>{linea.quien}:</strong> «{linea.texto}»
          </p>
        ) : (
          <p key={indice} className="quiz-evento__linea quiz-evento__narracion" style={{ "--i": indice } as CSSProperties}>
            {linea.texto}
          </p>
        )
      )}
      <p className="quiz-evento__cierre" style={{ "--i": evento.lineas.length } as CSSProperties}>
        {evento.cierre}
      </p>
    </section>
  );
}

export function Cuestionario({ slug, accent }: { slug: string; accent: string }) {
  const [estado, setEstado] = useState<EstadoQuiz | null>(null);
  const [cargando, setCargando] = useState(true);
  const [intento, setIntento] = useState<Intento | null>(null);
  const [indice, setIndice] = useState(0);
  const [respuestas, setRespuestas] = useState<Record<string, number>>({});
  const [guardado, setGuardado] = useState<"ok" | "guardando" | "error">("ok");
  const [resultado, setResultado] = useState<Resultado | null>(null);
  const [aviso, setAviso] = useState<string | null>(null);
  const [ocupado, setOcupado] = useState(false);

  const cargar = useCallback(async () => {
    setCargando(true);
    const respuesta = await api<EstadoQuiz>(`/api/quiz/${slug}`);
    setEstado(respuesta.data && respuesta.ok ? respuesta.data : null);
    setCargando(false);
  }, [slug]);

  useEffect(() => {
    void cargar();
  }, [cargar]);

  function abrir(intentoNuevo: Intento) {
    setIntento(intentoNuevo);
    setRespuestas(intentoNuevo.respuestas);
    const primeraSinResponder = intentoNuevo.preguntas.findIndex((p) => intentoNuevo.respuestas[p.id] === undefined);
    setIndice(primeraSinResponder >= 0 ? primeraSinResponder : 0);
    setResultado(null);
    window.scrollTo({ top: 0 });
  }

  async function comenzar(modalidad: Modalidad) {
    setOcupado(true);
    setAviso(null);
    const respuesta = await api<{ intento: Intento }>(`/api/quiz/${slug}/iniciar`, { modalidad });
    setOcupado(false);
    if (respuesta.ok && respuesta.data?.intento) {
      abrir(respuesta.data.intento);
    } else {
      setAviso(respuesta.data?.error ?? "No se pudo abrir la prueba. Inténtalo de nuevo.");
    }
  }

  async function elegir(preguntaId: string, opcion: number) {
    if (!intento) return;
    setRespuestas((actuales) => ({ ...actuales, [preguntaId]: opcion }));
    setGuardado("guardando");
    const respuesta = await api(`/api/quiz/${slug}/responder`, { intentoId: intento.id, preguntaId, opcion });
    setGuardado(respuesta.ok ? "ok" : "error");
  }

  async function entregar() {
    if (!intento) return;
    const sinResponder = intento.preguntas.filter((p) => respuestas[p.id] === undefined).length;
    if (sinResponder > 0 && !window.confirm(`Te faltan ${sinResponder} sin responder y contarán como incorrectas. ¿Entregar igual?`)) {
      return;
    }
    setOcupado(true);
    const respuesta = await api<Resultado>(`/api/quiz/${slug}/entregar`, { intentoId: intento.id });
    setOcupado(false);
    if (respuesta.ok && respuesta.data) {
      setResultado(respuesta.data);
      setIntento(null);
      window.scrollTo({ top: 0 });
    } else {
      setAviso(respuesta.data?.error ?? "No se pudo entregar. Tus respuestas siguen guardadas.");
    }
  }

  const estilo = { "--quiz": accent } as CSSProperties;

  if (cargando) {
    return <div className="quiz" style={estilo}><p className="quiz-nota">Preparando la sala de evaluación…</p></div>;
  }
  if (!estado) {
    return <div className="quiz" style={estilo}><p className="quiz-nota">No pudimos abrir la prueba. Recarga la página en un momento.</p></div>;
  }

  // ——— Resultado ———
  if (resultado) {
    return (
      <div className="quiz" style={estilo}>
        {resultado.aprobado ? (
          <section className="quiz-panel quiz-resultado quiz-resultado--aprobado">
            <p className="quiz-eyebrow">Prueba superada</p>
            <h1>¡Lo sabías!</h1>
            <p className="quiz-marcador">
              {resultado.aciertos} de {resultado.total}
              {resultado.expGanada > 0 && <span> · +{resultado.expGanada} EXP</span>}
            </p>
            <h2>Revisión</h2>
            <RevisionLista revision={resultado.revision} />
            <div className="quiz-acciones">
              <button type="button" className="quiz-boton" onClick={() => { setResultado(null); void cargar(); }}>
                Continuar
              </button>
              <Link className="quiz-boton quiz-boton--secundario" href={`/relatos/${slug}`}>Volver al relato</Link>
            </div>
          </section>
        ) : (
          <section className="quiz-panel quiz-resultado">
            <p className="quiz-eyebrow">{ORDINALES[resultado.fracasoNumero - 1] ?? `Nº ${resultado.fracasoNumero}`} intento fallido</p>
            <h1>Prueba no superada</h1>
            <p>Has reprobado el cuestionario de Caelyndor.</p>
            <p className="quiz-marcador">
              {resultado.aciertos} de {resultado.total} · necesitabas {resultado.minimo}
            </p>
            <p className="quiz-nota">
              Próximo intento: <FechaHora iso={resultado.proximoIntento} /> (en 7 días)
            </p>
            <EventoFracasoBloque id={resultado.evento} />
            <div className="quiz-acciones">
              <Link className="quiz-boton" href={`/relatos/${slug}`}>Volver al relato</Link>
            </div>
          </section>
        )}
      </div>
    );
  }

  // ——— Preguntas ———
  if (intento) {
    const pregunta = intento.preguntas[indice];
    const respondidas = intento.preguntas.filter((p) => respuestas[p.id] !== undefined).length;
    const esUltima = indice === intento.preguntas.length - 1;
    return (
      <div className="quiz" style={estilo}>
        <section className="quiz-panel quiz-preguntas">
          <div className="quiz-progreso" aria-hidden="true">
            <div style={{ width: `${(respondidas / intento.preguntas.length) * 100}%` }} />
          </div>
          <nav className="quiz-puntos" aria-label="Preguntas">
            {intento.preguntas.map((p, i) => (
              <button
                key={p.id}
                type="button"
                className={[i === indice ? "is-actual" : "", respuestas[p.id] !== undefined ? "is-respondida" : ""].join(" ")}
                onClick={() => setIndice(i)}
                aria-label={`Pregunta ${i + 1}${respuestas[p.id] !== undefined ? " (respondida)" : ""}`}
                aria-current={i === indice ? "step" : undefined}
              >
                {i + 1}
              </button>
            ))}
          </nav>
          <p className="quiz-meta">
            <span>Pregunta {indice + 1} de {intento.preguntas.length}</span>
            <span className="quiz-chip">{TIPOS[pregunta.tipo]}</span>
            <span className="quiz-dificultad" aria-label={`Dificultad ${pregunta.dificultad} de 3`}>
              {[1, 2, 3].map((nivel) => (
                <span key={nivel} className={nivel <= pregunta.dificultad ? "is-llena" : undefined} />
              ))}
            </span>
          </p>
          <h2 className="quiz-enunciado" key={pregunta.id}>{pregunta.enunciado}</h2>
          <div className="quiz-opciones" role="radiogroup" aria-label="Alternativas">
            {pregunta.opciones.map((opcion, i) => (
              <button
                key={i}
                type="button"
                role="radio"
                aria-checked={respuestas[pregunta.id] === i}
                className={`quiz-opcion${respuestas[pregunta.id] === i ? " is-elegida" : ""}`}
                onClick={() => void elegir(pregunta.id, i)}
              >
                <span className="quiz-opcion__letra" aria-hidden="true">{"ABCD"[i]}</span>
                {opcion}
              </button>
            ))}
          </div>
          <p className="quiz-guardado" role="status">
            {guardado === "guardando" ? "Guardando…" : guardado === "error" ? "No se pudo guardar: vuelve a elegir" : "Respuestas guardadas: puedes salir y volver cuando quieras."}
          </p>
          {aviso && <p className="quiz-error">{aviso}</p>}
          <div className="quiz-acciones">
            <button type="button" className="quiz-boton quiz-boton--secundario" disabled={indice === 0} onClick={() => setIndice(indice - 1)}>
              ← Anterior
            </button>
            {esUltima ? (
              <button type="button" className="quiz-boton" disabled={ocupado} onClick={() => void entregar()}>
                {ocupado ? "Corrigiendo…" : "Entregar"}
              </button>
            ) : (
              <button type="button" className="quiz-boton" onClick={() => setIndice(indice + 1)}>
                Siguiente →
              </button>
            )}
          </div>
        </section>
      </div>
    );
  }

  // ——— Estado general ———
  const { principal, conexiones } = estado;
  return (
    <div className="quiz" style={estilo}>
      <header className="quiz-cabecera">
        <p className="quiz-eyebrow">Prueba del conocimiento</p>
        <h1>{estado.titulo}</h1>
      </header>

      {aviso && <p className="quiz-error">{aviso}</p>}

      <section className="quiz-panel">
        {principal.estado === "no_disponible" && (
          <p>El Archivo todavía está preparando las preguntas de este relato. Vuelve pronto.</p>
        )}
        {principal.estado === "sin_sesion" && (
          <p>
            <Link href="/cuenta">Entra a tu cuenta</Link> para hacer la prueba de este relato.
          </p>
        )}
        {principal.estado === "bloqueado" && (
          <p>
            Termina de <Link href={`/relatos/${slug}`}>leer el relato</Link> para abrir su prueba.
          </p>
        )}
        {principal.estado === "disponible" && (
          <>
            <h2>Antes de empezar</h2>
            <ul className="quiz-reglas">
              <li>
                <strong>{principal.total} preguntas</strong>: primero lo que está escrito, después lo que se deduce. Se
                aprueba con <strong>{principal.minimo}</strong>.
              </li>
              <li>Tus respuestas se guardan solas: puedes salir y volver cuando quieras, con las mismas preguntas.</li>
              <li>Si no apruebas, podrás volver a intentarlo en <strong>7 días</strong>, con otras preguntas.</li>
              <li>Este cuestionario solo pregunta sobre este relato: no necesitas haber leído otras obras.</li>
            </ul>
            <div className="quiz-acciones">
              <button type="button" className="quiz-boton" disabled={ocupado} onClick={() => void comenzar("principal")}>
                Comenzar la prueba
              </button>
              <Link className="quiz-boton quiz-boton--secundario" href={`/relatos/${slug}`}>Hacerlo después</Link>
            </div>
          </>
        )}
        {principal.estado === "en_curso" && (
          <>
            <p>Tienes esta prueba a medias. Tus respuestas siguen guardadas.</p>
            <div className="quiz-acciones">
              <button type="button" className="quiz-boton" disabled={ocupado} onClick={() => estado.intento ? abrir(estado.intento) : void comenzar("principal")}>
                Continuar
              </button>
            </div>
          </>
        )}
        {principal.estado === "enfriamiento" && (
          <p>
            La sala está cerrada para ti un tiempo. Próximo intento: <FechaHora iso={principal.hasta} />.
          </p>
        )}
        {principal.estado === "aprobado" && (
          <>
            <p className="quiz-marcador">
              ✦ Aprobada · {principal.aciertos} de {principal.total}
            </p>
            {estado.revision.principal && (
              <details className="quiz-detalles">
                <summary>Ver la revisión</summary>
                <RevisionLista revision={estado.revision.principal} />
              </details>
            )}
          </>
        )}
      </section>

      {conexiones.estado !== "no_disponible" && conexiones.estado !== "sin_sesion" && (
        <section className="quiz-panel quiz-conexiones">
          <h2>Desafío de conexiones</h2>
          <p className="quiz-nota">
            Preguntas que cruzan este relato con
            {" "}{estado.conectadas.map((obra, i) => (
              <span key={obra.slug}>
                {i > 0 && (i === estado.conectadas.length - 1 ? " y " : ", ")}
                <Link href={`/relatos/${obra.slug}`}>{obra.titulo}</Link>
              </span>
            ))}.
          </p>
          {conexiones.estado === "bloqueado" && <p>Se abre al aprobar la prueba de este relato.</p>}
          {conexiones.estado === "disponible" && (
            <>
              <p className="quiz-advertencia">
                ⚠ Puede revelar detalles de esas obras. Hazlo solo si ya las leíste: no es obligatorio para avanzar.
              </p>
              <p>
                {conexiones.total} preguntas · se aprueba con {conexiones.minimo} · 7 días de espera si no apruebas.
              </p>
              <div className="quiz-acciones">
                <button type="button" className="quiz-boton" disabled={ocupado} onClick={() => void comenzar("conexiones")}>
                  Aceptar el desafío
                </button>
              </div>
            </>
          )}
          {conexiones.estado === "en_curso" && (
            <div className="quiz-acciones">
              <button type="button" className="quiz-boton" onClick={() => estado.intento ? abrir(estado.intento) : void comenzar("conexiones")}>
                Continuar el desafío
              </button>
            </div>
          )}
          {conexiones.estado === "enfriamiento" && (
            <p>Próximo intento: <FechaHora iso={conexiones.hasta} />.</p>
          )}
          {conexiones.estado === "aprobado" && (
            <>
              <p className="quiz-marcador">✦ Desafío superado · {conexiones.aciertos} de {conexiones.total}</p>
              {estado.revision.conexiones && (
                <details className="quiz-detalles">
                  <summary>Ver la revisión</summary>
                  <RevisionLista revision={estado.revision.conexiones} />
                </details>
              )}
            </>
          )}
        </section>
      )}

      <p className="quiz-volver">
        <Link href={`/relatos/${slug}`}>← Volver al relato</Link>
      </p>
    </div>
  );
}
