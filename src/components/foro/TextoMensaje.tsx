import { partirEnlaces } from "@/data/foro";

/** Cuerpo de un mensaje: texto plano con los enlaces permitidos clicables. */
export function TextoMensaje({ texto }: { texto: string }) {
  return (
    <p className="foro-mensaje__texto">
      {partirEnlaces(texto).map((trozo, indice) =>
        trozo.tipo === "enlace" ? (
          <a key={indice} href={trozo.href} target="_blank" rel="nofollow ugc noopener noreferrer">
            {trozo.valor}
          </a>
        ) : (
          trozo.valor
        )
      )}
    </p>
  );
}
