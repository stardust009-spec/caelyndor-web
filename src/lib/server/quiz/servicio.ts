import "server-only";
import { stories } from "@/data/stories";
import { EVENTOS_EN_ORDEN, EVENTOS_FRACASO } from "@/data/eventosQuiz";
import { getPrisma, TX_OPTIONS } from "../db";
import { otorgarExp } from "../exp";
import { EXP_POR } from "../niveles";
import { BANCO_QUIZ, obrasConectadas } from "./banco";
import {
  barajar,
  calificar,
  elegirEvento,
  elegirPreguntas,
  finEnfriamiento,
  minimoParaAprobar,
  modalidadDisponible,
  preguntasActivas,
  type Modalidad,
  type PreguntaQuiz,
  type TipoPregunta
} from "./logica";

/** Obras publicadas hoy en la web (los libros se sumarán al publicarse). */
function obrasPublicadas(): ReadonlySet<string> {
  return new Set(stories.map((story) => story.slug));
}

export function tituloDeObra(slug: string): string {
  return stories.find((story) => story.slug === slug)?.title ?? slug;
}

const PREGUNTAS_POR_ID = new Map(BANCO_QUIZ.map((pregunta) => [pregunta.id, pregunta]));

export type EstadoModalidad =
  | { estado: "no_disponible" }
  | { estado: "sin_sesion" }
  | { estado: "bloqueado"; motivo: "no_leido" | "principal_pendiente" }
  | { estado: "disponible"; total: number; minimo: number }
  | { estado: "en_curso"; intentoId: string }
  | { estado: "enfriamiento"; hasta: string }
  | { estado: "aprobado"; aciertos: number; total: number; fecha: string };

/** Pregunta tal como la ve el navegador: sin respuesta correcta. */
export type PreguntaPublica = {
  id: string;
  tipo: TipoPregunta;
  dificultad: number;
  enunciado: string;
  opciones: string[];
};

export type IntentoVista = {
  id: string;
  modalidad: Modalidad;
  preguntas: PreguntaPublica[];
  /** { preguntaId: índice MOSTRADO elegido } */
  respuestas: Record<string, number>;
  minimo: number;
};

export type RevisionPregunta = {
  enunciado: string;
  tuRespuesta: string | null;
  correcta: string;
  acertada: boolean;
  explicacion: string;
};

type IntentoFila = {
  id: string;
  modalidad: string;
  preguntas: string[];
  ordenOpciones: unknown;
  respuestas: unknown;
  createdAt: Date;
  entregadoEn: Date | null;
  aciertos: number | null;
  aprobado: boolean | null;
  eventoFracaso: string | null;
};

function ordenDe(intento: IntentoFila): number[][] {
  return Array.isArray(intento.ordenOpciones) ? (intento.ordenOpciones as number[][]) : [];
}

function respuestasDe(intento: IntentoFila): Record<string, number> {
  const valor = intento.respuestas;
  return valor && typeof valor === "object" && !Array.isArray(valor) ? (valor as Record<string, number>) : {};
}

function preguntasDe(intento: IntentoFila): PreguntaQuiz[] {
  return intento.preguntas.map((id) => PREGUNTAS_POR_ID.get(id)).filter((p): p is PreguntaQuiz => p !== undefined);
}

function vistaIntento(intento: IntentoFila): IntentoVista {
  const orden = ordenDe(intento);
  const respuestas = respuestasDe(intento);
  const preguntas = intento.preguntas
    .map((id, indice): PreguntaPublica | null => {
      const pregunta = PREGUNTAS_POR_ID.get(id);
      if (!pregunta) return null;
      const permutacion = orden[indice] ?? [0, 1, 2, 3];
      return {
        id: pregunta.id,
        tipo: pregunta.tipo,
        dificultad: pregunta.dificultad,
        enunciado: pregunta.enunciado,
        opciones: permutacion.map((original) => pregunta.opciones[original])
      };
    })
    .filter((p): p is PreguntaPublica => p !== null);

  const mostradas: Record<string, number> = {};
  intento.preguntas.forEach((id, indice) => {
    const original = respuestas[id];
    if (typeof original === "number") {
      mostradas[id] = (orden[indice] ?? [0, 1, 2, 3]).indexOf(original);
    }
  });
  const modalidad = intento.modalidad as Modalidad;
  return { id: intento.id, modalidad, preguntas, respuestas: mostradas, minimo: minimoParaAprobar(modalidad, preguntas.length) };
}

function revisionDe(intento: IntentoFila): RevisionPregunta[] {
  const respuestas = respuestasDe(intento);
  return preguntasDe(intento).map((pregunta) => {
    const elegida = respuestas[pregunta.id];
    return {
      enunciado: pregunta.enunciado,
      tuRespuesta: typeof elegida === "number" ? pregunta.opciones[elegida] : null,
      correcta: pregunta.opciones[pregunta.correcta],
      acertada: elegida === pregunta.correcta,
      explicacion: pregunta.explicacion
    };
  });
}

async function leyoLaObra(userId: string, obra: string): Promise<boolean> {
  const progreso = await getPrisma().storyProgress.findUnique({
    where: { userId_storySlug: { userId, storySlug: obra } },
    select: { completedAt: true }
  });
  return progreso?.completedAt != null;
}

async function intentosDe(userId: string, obra: string, modalidad: Modalidad): Promise<IntentoFila[]> {
  return getPrisma().quizIntento.findMany({
    where: { userId, obra, modalidad },
    orderBy: { createdAt: "desc" },
    take: 50
  });
}

function estadoDesdeIntentos(intentos: IntentoFila[], total: number, modalidad: Modalidad): EstadoModalidad {
  const aprobado = intentos.find((intento) => intento.aprobado === true);
  if (aprobado) {
    return {
      estado: "aprobado",
      aciertos: aprobado.aciertos ?? 0,
      total: aprobado.preguntas.length,
      fecha: (aprobado.entregadoEn ?? aprobado.createdAt).toISOString()
    };
  }
  const abierto = intentos.find((intento) => intento.entregadoEn === null);
  if (abierto) {
    return { estado: "en_curso", intentoId: abierto.id };
  }
  const ultimoFallo = intentos.find((intento) => intento.aprobado === false && intento.entregadoEn);
  if (ultimoFallo?.entregadoEn) {
    const hasta = finEnfriamiento(ultimoFallo.entregadoEn);
    if (hasta.getTime() > Date.now()) {
      return { estado: "enfriamiento", hasta: hasta.toISOString() };
    }
  }
  return { estado: "disponible", total, minimo: minimoParaAprobar(modalidad, total) };
}

export type EstadoQuiz = {
  obra: string;
  titulo: string;
  principal: EstadoModalidad;
  conexiones: EstadoModalidad;
  /** Obras publicadas con las que conecta el desafío avanzado. */
  conectadas: { slug: string; titulo: string }[];
  intento: IntentoVista | null;
  revision: { principal: RevisionPregunta[] | null; conexiones: RevisionPregunta[] | null };
};

export async function estadoQuiz(userId: string | null, obra: string): Promise<EstadoQuiz> {
  const publicadas = obrasPublicadas();
  const activasPrincipal = preguntasActivas(BANCO_QUIZ, obra, "principal", publicadas);
  const activasConexiones = preguntasActivas(BANCO_QUIZ, obra, "conexiones", publicadas);
  const hayPrincipal = modalidadDisponible(activasPrincipal, "principal");
  const hayConexiones = modalidadDisponible(activasConexiones, "conexiones");
  const conectadas = obrasConectadas(obra)
    .filter((slug) => publicadas.has(slug))
    .map((slug) => ({ slug, titulo: tituloDeObra(slug) }));

  const base: EstadoQuiz = {
    obra,
    titulo: tituloDeObra(obra),
    principal: hayPrincipal ? { estado: "sin_sesion" } : { estado: "no_disponible" },
    conexiones: hayConexiones ? { estado: "sin_sesion" } : { estado: "no_disponible" },
    conectadas,
    intento: null,
    revision: { principal: null, conexiones: null }
  };
  if (!userId || !hayPrincipal) {
    return base;
  }

  const leido = await leyoLaObra(userId, obra);
  const intentosPrincipal = await intentosDe(userId, obra, "principal");
  const totalPrincipal = Math.min(8, activasPrincipal.length);
  base.principal = leido
    ? estadoDesdeIntentos(intentosPrincipal, totalPrincipal, "principal")
    : { estado: "bloqueado", motivo: "no_leido" };

  const aprobadoPrincipal = intentosPrincipal.find((intento) => intento.aprobado === true);
  if (aprobadoPrincipal) {
    base.revision.principal = revisionDe(aprobadoPrincipal);
  }

  let intentosConexiones: IntentoFila[] = [];
  if (hayConexiones) {
    if (base.principal.estado !== "aprobado") {
      base.conexiones = { estado: "bloqueado", motivo: "principal_pendiente" };
    } else {
      intentosConexiones = await intentosDe(userId, obra, "conexiones");
      base.conexiones = estadoDesdeIntentos(intentosConexiones, Math.min(5, activasConexiones.length), "conexiones");
      const aprobadoConexiones = intentosConexiones.find((intento) => intento.aprobado === true);
      if (aprobadoConexiones) {
        base.revision.conexiones = revisionDe(aprobadoConexiones);
      }
    }
  }

  const abierto = [...intentosPrincipal, ...intentosConexiones].find((intento) => intento.entregadoEn === null);
  base.intento = abierto ? vistaIntento(abierto) : null;
  return base;
}

export type ResultadoInicio =
  | { ok: true; intento: IntentoVista }
  | { ok: false; error: "no_disponible" | "no_leido" | "principal_pendiente" | "enfriamiento" | "aprobado" };

/** Abre un intento, o devuelve el que ya estaba abierto (mismas preguntas). */
export async function iniciarIntento(userId: string, obra: string, modalidad: Modalidad): Promise<ResultadoInicio> {
  const estado = await estadoQuiz(userId, obra);
  const actual = modalidad === "principal" ? estado.principal : estado.conexiones;
  switch (actual.estado) {
    case "en_curso":
      return estado.intento ? { ok: true, intento: estado.intento } : { ok: false, error: "no_disponible" };
    case "bloqueado":
      return { ok: false, error: actual.motivo };
    case "enfriamiento":
      return { ok: false, error: "enfriamiento" };
    case "aprobado":
      return { ok: false, error: "aprobado" };
    case "no_disponible":
    case "sin_sesion":
      return { ok: false, error: "no_disponible" };
    case "disponible":
      break;
  }

  const activas = preguntasActivas(BANCO_QUIZ, obra, modalidad, obrasPublicadas());
  const elegidas = elegirPreguntas(activas, modalidad, Math.random);
  const ordenOpciones = elegidas.map(() => barajar([0, 1, 2, 3], Math.random));
  const creado = await getPrisma().quizIntento.create({
    data: { userId, obra, modalidad, preguntas: elegidas.map((p) => p.id), ordenOpciones, respuestas: {} }
  });
  return { ok: true, intento: vistaIntento(creado) };
}

async function intentoAbiertoDe(userId: string, obra: string, intentoId: string): Promise<IntentoFila | null> {
  const intento = await getPrisma().quizIntento.findUnique({ where: { id: intentoId } });
  if (!intento || intento.userId !== userId || intento.obra !== obra || intento.entregadoEn !== null) {
    return null;
  }
  return intento;
}

/** Guarda una respuesta parcial (autoguardado). `opcion` = índice mostrado. */
export async function guardarRespuesta(
  userId: string,
  obra: string,
  intentoId: string,
  preguntaId: string,
  opcion: number
): Promise<boolean> {
  const intento = await intentoAbiertoDe(userId, obra, intentoId);
  if (!intento) return false;
  const indice = intento.preguntas.indexOf(preguntaId);
  if (indice < 0) return false;
  const original = (ordenDe(intento)[indice] ?? [0, 1, 2, 3])[opcion];
  if (typeof original !== "number") return false;
  const respuestas = { ...respuestasDe(intento), [preguntaId]: original };
  await getPrisma().quizIntento.update({ where: { id: intento.id }, data: { respuestas } });
  return true;
}

export type ResultadoEntrega =
  | {
      ok: true;
      aprobado: true;
      aciertos: number;
      total: number;
      expGanada: number;
      revision: RevisionPregunta[];
    }
  | {
      ok: true;
      aprobado: false;
      aciertos: number;
      total: number;
      minimo: number;
      proximoIntento: string;
      evento: string;
      fracasoNumero: number;
    }
  | { ok: false; error: "no_existe" };

export async function entregarIntento(userId: string, obra: string, intentoId: string): Promise<ResultadoEntrega> {
  const prisma = getPrisma();
  return prisma.$transaction(async (tx) => {
    const intento = await tx.quizIntento.findUnique({ where: { id: intentoId } });
    if (!intento || intento.userId !== userId || intento.obra !== obra || intento.entregadoEn !== null) {
      return { ok: false as const, error: "no_existe" as const };
    }
    const modalidad = intento.modalidad as Modalidad;
    const preguntas = preguntasDe(intento);
    const { aciertos, total, aprobado } = calificar(preguntas, respuestasDe(intento), modalidad);
    const ahora = new Date();

    if (aprobado) {
      // Candado: solo el primer entregar de este intento lo cierra.
      const cerrado = await tx.quizIntento.updateMany({
        where: { id: intento.id, entregadoEn: null },
        data: { entregadoEn: ahora, aciertos, aprobado: true }
      });
      if (cerrado.count === 0) return { ok: false as const, error: "no_existe" as const };
      const clave = modalidad === "principal" ? `quiz:${obra}` : `quiz-conexiones:${obra}`;
      const cantidad = modalidad === "principal" ? EXP_POR.quiz : EXP_POR.quizConexiones;
      const expGanada = await otorgarExp(tx, userId, clave, cantidad);
      return {
        ok: true as const,
        aprobado: true as const,
        aciertos,
        total,
        expGanada,
        revision: revisionDe({ ...intento, entregadoEn: ahora, aciertos, aprobado: true })
      };
    }

    const fallosPrevios = await tx.quizIntento.findMany({
      where: { userId, aprobado: false },
      orderBy: { entregadoEn: "desc" },
      select: { eventoFracaso: true }
    });
    const fracasoNumero = fallosPrevios.length + 1;
    const evento = elegirEvento(
      fracasoNumero,
      EVENTOS_EN_ORDEN,
      EVENTOS_FRACASO.map((e) => e.id),
      fallosPrevios[0]?.eventoFracaso ?? null,
      Math.random
    );
    const cerrado = await tx.quizIntento.updateMany({
      where: { id: intento.id, entregadoEn: null },
      data: { entregadoEn: ahora, aciertos, aprobado: false, eventoFracaso: evento }
    });
    if (cerrado.count === 0) return { ok: false as const, error: "no_existe" as const };
    return {
      ok: true as const,
      aprobado: false as const,
      aciertos,
      total,
      minimo: minimoParaAprobar(modalidad, total),
      proximoIntento: finEnfriamiento(ahora).toISOString(),
      evento,
      fracasoNumero
    };
  }, TX_OPTIONS);
}

/** ¿Tiene cuestionario esta obra hoy? (para el aviso al terminar de leer) */
export function obraTieneQuiz(obra: string): boolean {
  return modalidadDisponible(preguntasActivas(BANCO_QUIZ, obra, "principal", obrasPublicadas()), "principal");
}
