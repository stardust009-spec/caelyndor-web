import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import "@/styles/foro.css";
import { currentUserId } from "@/auth";
import { AvatarMarco } from "@/components/aura/AvatarMarco";
import { AccionesMensaje, ModeracionHilo } from "@/components/foro/AccionesForo";
import { FechaHora } from "@/components/foro/FechaHora";
import { TextoMensaje } from "@/components/foro/TextoMensaje";
import { EntrarParaEscribir, RespuestaForm } from "@/components/foro/FormulariosForo";
import { FORO_OG_IMAGE, getCategoria } from "@/data/foro";
import { sendaNombre } from "@/data/sendas";
import { metadatosHilo, obtenerHilo, puedeModerar } from "@/lib/server/foro";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const dynamic = "force-dynamic";

const idPattern = /^[a-z0-9]{10,40}$/;

// Contenido de usuarios: no se indexa mientras la moderación es manual, pero
// sí lleva vista previa al compartir (título y sección, nunca el cuerpo).
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const datos = idPattern.test(id) ? await metadatosHilo(id) : null;
  if (!datos) {
    return { title: "Vestíbulo — Foro", robots: { index: false, follow: true } };
  }
  const seccion = getCategoria(datos.categoria)?.nombre ?? "Vestíbulo";
  const descripcion = `${seccion} · Conversación en el Vestíbulo de la Torre de los Cronistas.`;
  const url = `${SITE_URL}/foro/hilo/${id}`;
  return {
    title: `${datos.titulo} — Foro`,
    description: descripcion,
    robots: { index: false, follow: true },
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: datos.titulo,
      description: descripcion,
      url,
      siteName: SITE_NAME,
      images: [FORO_OG_IMAGE]
    },
    twitter: {
      card: "summary_large_image",
      title: datos.titulo,
      description: descripcion,
      images: [FORO_OG_IMAGE]
    }
  };
}

export default async function HiloPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!idPattern.test(id)) {
    notFound();
  }
  const userId = await currentUserId();
  const modera = await puedeModerar(userId);
  const hilo = await obtenerHilo(id, userId, modera);
  if (!hilo) {
    notFound();
  }
  const categoria = getCategoria(hilo.categoria);

  return (
    <section className="page-section foro">
      <div className="container foro-hilo-pagina">
        <nav className="foro-migas" aria-label="Ruta">
          <Link href="/foro">Vestíbulo</Link>
          {categoria && (
            <>
              {" / "}
              <Link href={`/foro?categoria=${categoria.slug}`}>{categoria.nombre}</Link>
            </>
          )}
        </nav>
        <header className="foro-cabecera">
          <h1>{hilo.titulo}</h1>
          <p className="foro-nota">
            {hilo.fijado && <span className="foro-etiqueta">Fijado</span>}
            {hilo.cerrado && <span className="foro-etiqueta foro-etiqueta--cerrado">Cerrado</span>}
            {hilo.oculto && <span className="foro-etiqueta foro-etiqueta--oculto">Oculto</span>}
            Abierto el <FechaHora iso={hilo.createdAt} />
          </p>
          {modera && <ModeracionHilo hiloId={hilo.id} fijado={hilo.fijado} cerrado={hilo.cerrado} oculto={hilo.oculto} />}
        </header>

        <ol className="foro-mensajes">
          {hilo.mensajes.map((mensaje) => (
            <li
              key={mensaje.id}
              id={`m-${mensaje.id}`}
              className={[
                "foro-mensaje",
                mensaje.esApertura ? "foro-mensaje--apertura" : "",
                mensaje.oculto ? "foro-mensaje--oculto" : ""
              ].join(" ")}
            >
              <div className="foro-mensaje__autor">
                <AvatarMarco src={mensaje.autor.avatarUrl} alt="" marcoSlug={mensaje.autor.marcoSlug} size={48} />
                <div>
                  <p className="foro-mensaje__alias">
                    {mensaje.autor.alias}
                    {mensaje.autor.forjador && <span className="foro-forjador"> ✦ Forjador</span>}
                  </p>
                  <p className="foro-mensaje__rango">
                    Nivel {mensaje.autor.nivel}
                    {mensaje.autor.senda && <> · {sendaNombre(mensaje.autor.senda)}</>}
                  </p>
                </div>
                <FechaHora iso={mensaje.createdAt} />
              </div>
              {mensaje.cuerpo === null ? (
                <p className="foro-mensaje__oculto">Este mensaje fue ocultado por moderación.</p>
              ) : (
                <>
                  {mensaje.oculto && (
                    <p className="foro-mensaje__oculto">
                      Oculto para los lectores{mensaje.ocultoMotivo ? `: ${mensaje.ocultoMotivo}` : ""}.
                    </p>
                  )}
                  <TextoMensaje texto={mensaje.cuerpo} />
                </>
              )}
              <AccionesMensaje
                mensajeId={mensaje.id}
                likes={mensaje.likes}
                meGusta={mensaje.meGusta}
                esPropio={mensaje.esPropio}
                conSesion={userId !== null}
                oculto={mensaje.oculto}
                modera={modera}
              />
            </li>
          ))}
        </ol>

        {hilo.cerrado ? (
          <p className="foro-vacio">Este hilo está cerrado a nuevas respuestas.</p>
        ) : userId ? (
          <RespuestaForm hiloId={hilo.id} />
        ) : (
          <EntrarParaEscribir texto="para responder y dar me gusta." />
        )}
      </div>
    </section>
  );
}
