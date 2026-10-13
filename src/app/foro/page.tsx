import type { Metadata } from "next";
import Link from "next/link";
import "@/styles/foro.css";
import { currentUserId } from "@/auth";
import { AvatarMarco } from "@/components/aura/AvatarMarco";
import { FechaHora } from "@/components/foro/FechaHora";
import { EntrarParaEscribir, NuevoHiloForm } from "@/components/foro/FormulariosForo";
import { CATEGORIAS_VESTIBULO, REGLAS_VESTIBULO, getCategoria } from "@/data/foro";
import { estadisticasForo, listarHilos, puedeModerar } from "@/lib/server/foro";
import { PISOS } from "@/lib/server/niveles";

export const metadata: Metadata = {
  title: "Vestíbulo de Bienvenida — Foro",
  description:
    "La entrada a la Torre de los Cronistas: presentaciones, ayuda y novedades del Archivo de Caelyndor, sin spoilers."
};

export const dynamic = "force-dynamic";

export default async function ForoPage({ searchParams }: { searchParams: Promise<{ categoria?: string }> }) {
  const { categoria: categoriaParam } = await searchParams;
  const categoria = getCategoria(categoriaParam);
  const userId = await currentUserId();
  const [stats, hilos, modera] = await Promise.all([
    estadisticasForo(),
    listarHilos(categoria?.slug ?? null),
    puedeModerar(userId)
  ]);

  return (
    <section className="page-section foro">
      <div className="container">
        <header className="foro-cabecera">
          <p className="eyebrow">La Torre de los Cronistas</p>
          <h1>Vestíbulo de Bienvenida</h1>
          <p>
            La puerta de entrada de la Torre. Aquí nos presentamos, pedimos ayuda y nos enteramos de las
            novedades del Archivo, sin hablar de las tramas: es un lugar seguro para quien recién llega.
          </p>
        </header>

        <ul className="foro-stats" aria-label="Estadísticas del foro">
          <li>
            <span className="foro-stats__punto" aria-hidden="true" />
            <strong>{stats.enLinea}</strong> {stats.enLinea === 1 ? "cronista en línea" : "cronistas en línea"}
          </li>
          <li>
            <strong>{stats.miembros}</strong> miembros
          </li>
          <li>
            <strong>{stats.hilos}</strong> {stats.hilos === 1 ? "hilo" : "hilos"}
          </li>
          <li>
            <strong>{stats.mensajes}</strong> {stats.mensajes === 1 ? "mensaje" : "mensajes"}
          </li>
          {stats.ultimoMiembro && (
            <li>
              Damos la bienvenida a <strong>{stats.ultimoMiembro}</strong>
            </li>
          )}
        </ul>

        <div className="foro-columnas">
          <div className="foro-principal">
            <nav className="foro-categorias" aria-label="Secciones del Vestíbulo">
              <Link href="/foro" className={!categoria ? "is-activa" : undefined}>
                Todo
              </Link>
              {CATEGORIAS_VESTIBULO.map((opcion) => (
                <Link
                  key={opcion.slug}
                  href={`/foro?categoria=${opcion.slug}`}
                  className={categoria?.slug === opcion.slug ? "is-activa" : undefined}
                >
                  {opcion.nombre}
                </Link>
              ))}
            </nav>
            {categoria && <p className="foro-nota">{categoria.descripcion}</p>}

            <div className="foro-nuevo">
              {userId ? (
                <NuevoHiloForm modera={modera} categoriaInicial={categoria?.slug ?? null} />
              ) : (
                <EntrarParaEscribir texto="para abrir hilos, responder y dar me gusta." />
              )}
            </div>

            {hilos.length === 0 ? (
              <p className="foro-vacio">
                {categoria ? "Todavía no hay hilos en esta sección." : "El Vestíbulo espera su primer mensaje."}
              </p>
            ) : (
              <ol className="foro-hilos">
                {hilos.map((hilo) => (
                  <li key={hilo.id} className={`foro-hilo${hilo.fijado ? " foro-hilo--fijado" : ""}`}>
                    <AvatarMarco src={hilo.autor.avatarUrl} alt="" marcoSlug={hilo.autor.marcoSlug} size={40} />
                    <div className="foro-hilo__cuerpo">
                      <p className="foro-hilo__titulo">
                        {hilo.fijado && <span className="foro-etiqueta">Fijado</span>}
                        {hilo.cerrado && <span className="foro-etiqueta foro-etiqueta--cerrado">Cerrado</span>}
                        <Link href={`/foro/hilo/${hilo.id}`}>{hilo.titulo}</Link>
                      </p>
                      <p className="foro-hilo__meta">
                        <span className="foro-chip">{getCategoria(hilo.categoria)?.nombre ?? hilo.categoria}</span>
                        <span>
                          {hilo.autor.alias}
                          {hilo.autor.forjador && <span className="foro-forjador"> ✦ Forjador</span>}
                        </span>
                        <span>
                          Última actividad: <FechaHora iso={hilo.ultimaActividad} />
                        </span>
                      </p>
                    </div>
                    <p className="foro-hilo__respuestas">
                      <strong>{hilo.respuestas}</strong>
                      <span>{hilo.respuestas === 1 ? "respuesta" : "respuestas"}</span>
                    </p>
                  </li>
                ))}
              </ol>
            )}
          </div>

          <aside className="foro-lateral">
            <details className="panel foro-reglas" open>
              <summary>Reglas del Vestíbulo</summary>
              <ol>
                {REGLAS_VESTIBULO.map((regla) => (
                  <li key={regla}>{regla}</li>
                ))}
              </ol>
            </details>
            <div className="panel foro-torre">
              <h2>Los pisos de la Torre</h2>
              <p className="foro-nota">Se abren por nivel y pronto tendrán sus propias conversaciones.</p>
              <ol>
                {[...PISOS].reverse().map((piso) => (
                  <li key={piso.piso}>
                    <span>
                      <span aria-hidden="true">🔒</span> Piso {piso.piso} · {piso.nombre}
                    </span>
                    <small>
                      Nivel {piso.piso * 5 - 4}–{piso.piso * 5}
                    </small>
                  </li>
                ))}
              </ol>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
