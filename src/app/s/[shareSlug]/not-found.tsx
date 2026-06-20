import Link from "next/link";

export default function SharedTrackNotFound() {
  return (
    <section className="page-section page-section--shared">
      <div className="container shared-track__notfound">
        <p className="eyebrow">Archivo del Cronista</p>
        <h1>Este tema se perdió en el Velo</h1>
        <p>No encontramos la canción que buscas. Puede que el enlace haya cambiado o el tema aún no exista.</p>
        <Link className="shared-track__back" href="/musica">
          Volver a Música
        </Link>
      </div>
    </section>
  );
}
