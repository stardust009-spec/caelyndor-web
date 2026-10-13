import "server-only";
import type { PreguntaQuiz } from "../logica";
import { BANCO_LA_GRAN_ESTAFA } from "./la-gran-estafa-de-sylvalis";

/**
 * Banco completo de preguntas. Para sumar un relato: crear su archivo en esta
 * carpeta y agregarlo aquí. Las preguntas que requieren obras aún no
 * publicadas quedan inactivas solas hasta que esas obras lleguen a la web.
 * Solo servidor: las respuestas correctas nunca viajan al navegador.
 */
export const BANCO_QUIZ: readonly PreguntaQuiz[] = [...BANCO_LA_GRAN_ESTAFA];

/** Conexiones narrativas declaradas por obra (para la advertencia previa). */
export function obrasConectadas(obra: string): string[] {
  const conectadas = new Set<string>();
  for (const pregunta of BANCO_QUIZ) {
    if (pregunta.tipo === "conexion" && (pregunta.obra === obra || pregunta.requiere.includes(obra))) {
      for (const slug of pregunta.requiere) {
        if (slug !== obra) conectadas.add(slug);
      }
    }
  }
  return [...conectadas];
}
