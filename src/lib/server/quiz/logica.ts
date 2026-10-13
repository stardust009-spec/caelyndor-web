/**
 * Lógica pura de los cuestionarios (sin BD, testeable).
 * Diseño: docs/aura-parte-4.md § Quiz de conocimiento.
 *
 * - Principal: 8 preguntas, primero explícitas y luego implícitas, de menor a
 *   mayor dificultad. Se aprueba con 7.
 * - Conexiones: desafío avanzado (cruza obras), hasta 5 preguntas, 80 %.
 * - Una pregunta solo se sirve si todas las obras que requiere están
 *   publicadas: el banco puede adelantarse a la web.
 */

export type TipoPregunta = "explicita" | "implicita" | "conexion";
export type Modalidad = "principal" | "conexiones";

export type PreguntaQuiz = {
  /** Estable para siempre: los intentos guardados lo referencian. */
  id: string;
  /** Obra a cuyo cuestionario pertenece. */
  obra: string;
  tipo: TipoPregunta;
  /** 1 = directa · 2 = detalle · 3 = rebuscada. */
  dificultad: 1 | 2 | 3;
  enunciado: string;
  opciones: readonly [string, string, string, string];
  /** Índice de la opción correcta (nunca sale del servidor antes de aprobar). */
  correcta: 0 | 1 | 2 | 3;
  /** Por qué es esa la respuesta: se muestra solo al aprobar. */
  explicacion: string;
  /** Fragmento que la demuestra (para revisión editorial). */
  fuente: { obra: string; parrafo?: number; cita: string };
  /** Obras que deben estar publicadas para servirla (incluye `obra`). */
  requiere: readonly string[];
  /** Etiquetas de spoiler (obras cuya trama revela). */
  spoilers?: readonly string[];
};

export const CONFIG_QUIZ = {
  principal: { explicitas: 5, implicitas: 3, total: 8, minimoAprobar: 7 },
  conexiones: { maximo: 5, minimoPreguntas: 4, proporcionAprobar: 0.8 },
  enfriamientoMs: 7 * 24 * 60 * 60 * 1000
} as const;

export type Rng = () => number;

export function barajar<T>(items: readonly T[], rng: Rng): T[] {
  const copia = [...items];
  for (let i = copia.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

/** Preguntas servibles hoy para una obra y modalidad. */
export function preguntasActivas(
  banco: readonly PreguntaQuiz[],
  obra: string,
  modalidad: Modalidad,
  publicadas: ReadonlySet<string>
): PreguntaQuiz[] {
  return banco.filter((pregunta) => {
    if (!pregunta.requiere.every((slug) => publicadas.has(slug))) return false;
    if (modalidad === "principal") {
      return pregunta.obra === obra && pregunta.tipo !== "conexion";
    }
    return pregunta.tipo === "conexion" && (pregunta.obra === obra || pregunta.requiere.includes(obra));
  });
}

/** ¿Hay preguntas suficientes para ofrecer esta modalidad? */
export function modalidadDisponible(activas: readonly PreguntaQuiz[], modalidad: Modalidad): boolean {
  if (modalidad === "principal") {
    const explicitas = activas.filter((p) => p.tipo === "explicita").length;
    const implicitas = activas.filter((p) => p.tipo === "implicita").length;
    return explicitas + implicitas >= CONFIG_QUIZ.principal.total && explicitas > 0;
  }
  return activas.length >= CONFIG_QUIZ.conexiones.minimoPreguntas;
}

function porDificultad(a: PreguntaQuiz, b: PreguntaQuiz) {
  return a.dificultad - b.dificultad;
}

/**
 * Elige las preguntas de un intento. Principal: 5 explícitas + 3 implícitas
 * (si faltan de un tipo, completa con el otro), ordenadas para que la
 * dificultad vaya subiendo. Conexiones: hasta 5, también en subida.
 */
export function elegirPreguntas(activas: readonly PreguntaQuiz[], modalidad: Modalidad, rng: Rng): PreguntaQuiz[] {
  if (modalidad === "conexiones") {
    return barajar(activas, rng).slice(0, CONFIG_QUIZ.conexiones.maximo).sort(porDificultad);
  }
  const { explicitas: nExp, implicitas: nImp, total } = CONFIG_QUIZ.principal;
  const explicitas = barajar(activas.filter((p) => p.tipo === "explicita"), rng);
  const implicitas = barajar(activas.filter((p) => p.tipo === "implicita"), rng);
  let elegidasImp = implicitas.slice(0, nImp);
  let elegidasExp = explicitas.slice(0, total - elegidasImp.length);
  if (elegidasExp.length < nExp) {
    elegidasImp = implicitas.slice(0, total - elegidasExp.length);
  }
  elegidasExp = elegidasExp.slice(0, total - elegidasImp.length);
  return [...elegidasExp.sort(porDificultad), ...elegidasImp.sort(porDificultad)];
}

export function minimoParaAprobar(modalidad: Modalidad, total: number): number {
  if (modalidad === "principal") {
    return Math.min(total, CONFIG_QUIZ.principal.minimoAprobar);
  }
  return Math.ceil(total * CONFIG_QUIZ.conexiones.proporcionAprobar);
}

/** Corrige un intento: respuestas = { preguntaId: índice ORIGINAL elegido }. */
export function calificar(
  preguntas: readonly PreguntaQuiz[],
  respuestas: Readonly<Record<string, number>>,
  modalidad: Modalidad
): { aciertos: number; total: number; aprobado: boolean } {
  const aciertos = preguntas.filter((p) => respuestas[p.id] === p.correcta).length;
  const total = preguntas.length;
  return { aciertos, total, aprobado: total > 0 && aciertos >= minimoParaAprobar(modalidad, total) };
}

/** Fin del enfriamiento tras un intento reprobado. */
export function finEnfriamiento(reprobadoEn: Date): Date {
  return new Date(reprobadoEn.getTime() + CONFIG_QUIZ.enfriamientoMs);
}

/**
 * Qué personaje interfiere en el fracaso número `n` (1, 2, 3…) del usuario.
 * Los primeros siguen un orden fijo (`fijos`); después, al azar entre el resto
 * sin repetir el último que vio.
 */
export function elegirEvento(
  n: number,
  fijos: readonly string[],
  todos: readonly string[],
  ultimo: string | null,
  rng: Rng
): string {
  if (n >= 1 && n <= fijos.length) {
    return fijos[n - 1];
  }
  const candidatos = todos.filter((id) => id !== ultimo);
  return candidatos[Math.floor(rng() * candidatos.length)] ?? todos[0];
}
