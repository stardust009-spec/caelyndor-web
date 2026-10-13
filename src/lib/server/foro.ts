import "server-only";
import { esAdminAutorizado } from "@/lib/adminAccess";
import { ESPACIO_VESTIBULO } from "@/data/foro";
import { getPrisma, TX_OPTIONS } from "./db";
import { nivelDeExp } from "./niveles";

/** Ventana de "en línea": sesiones con actividad en los últimos 5 minutos. */
const EN_LINEA_MS = 5 * 60 * 1000;

/** Datos públicos del autor de un mensaje (política de privacidad: solo
 *  alias, avatar, marco, nivel y Senda; nunca datos personales). */
export type AutorPublico = {
  alias: string;
  avatarUrl: string | null;
  marcoSlug: string | null;
  nivel: number;
  senda: string | null;
  /** Cuenta del autor de Caelyndor (badge "Forjador"). */
  forjador: boolean;
};

const SELECT_AUTOR = {
  displayName: true,
  email: true,
  role: true,
  exp: true,
  sendaPrincipal: true,
  profile: { select: { alias: true, marcoSlug: true, avatar: { select: { imageUrl: true } } } }
} as const;

type AutorFila = {
  displayName: string;
  email: string;
  role: string;
  exp: number;
  sendaPrincipal: string | null;
  profile: { alias: string; marcoSlug: string | null; avatar: { imageUrl: string } | null } | null;
};

function autorPublico(fila: AutorFila): AutorPublico {
  return {
    alias: fila.profile?.alias ?? fila.displayName,
    avatarUrl: fila.profile?.avatar?.imageUrl ?? null,
    marcoSlug: fila.profile?.marcoSlug ?? null,
    nivel: nivelDeExp(fila.exp),
    senda: fila.sendaPrincipal,
    forjador: esAdminAutorizado(fila)
  };
}

/**
 * ¿Puede moderar? Misma doble capa que el área admin (rol + allowlist), pero
 * sin registrar intento no autorizado: se consulta en cada vista del foro.
 * Las acciones de moderación igual pasan por requireAdminApi (2FA).
 */
export async function puedeModerar(userId: string | null): Promise<boolean> {
  if (!userId) return false;
  const user = await getPrisma().user.findUnique({ where: { id: userId }, select: { role: true, email: true } });
  return user !== null && esAdminAutorizado(user);
}

export type EstadisticasForo = {
  enLinea: number;
  miembros: number;
  hilos: number;
  mensajes: number;
  ultimoMiembro: string | null;
};

export async function estadisticasForo(): Promise<EstadisticasForo> {
  const prisma = getPrisma();
  const desde = new Date(Date.now() - EN_LINEA_MS);
  const [enLinea, miembros, hilos, mensajes, ultimo] = await Promise.all([
    prisma.appSession.findMany({
      where: { revokedAt: null, lastActiveAt: { gt: desde } },
      distinct: ["userId"],
      select: { userId: true }
    }),
    prisma.user.count(),
    prisma.foroHilo.count({ where: { espacio: ESPACIO_VESTIBULO, ocultoEn: null } }),
    prisma.foroMensaje.count({ where: { ocultoEn: null, hilo: { espacio: ESPACIO_VESTIBULO, ocultoEn: null } } }),
    prisma.userProfile.findFirst({ orderBy: { createdAt: "desc" }, select: { alias: true } })
  ]);
  return {
    enLinea: enLinea.length,
    miembros,
    hilos,
    mensajes,
    ultimoMiembro: ultimo?.alias ?? null
  };
}

export type HiloResumen = {
  id: string;
  categoria: string;
  titulo: string;
  autor: AutorPublico;
  createdAt: string;
  ultimaActividad: string;
  respuestas: number;
  fijado: boolean;
  cerrado: boolean;
};

export async function listarHilos(categoria: string | null): Promise<HiloResumen[]> {
  const filas = await getPrisma().foroHilo.findMany({
    where: { espacio: ESPACIO_VESTIBULO, ocultoEn: null, ...(categoria ? { categoria } : {}) },
    orderBy: [{ fijado: "desc" }, { ultimaActividad: "desc" }],
    take: 60,
    select: {
      id: true,
      categoria: true,
      titulo: true,
      createdAt: true,
      ultimaActividad: true,
      fijado: true,
      cerrado: true,
      autor: { select: SELECT_AUTOR },
      _count: { select: { mensajes: { where: { ocultoEn: null } } } }
    }
  });
  return filas.map((fila) => ({
    id: fila.id,
    categoria: fila.categoria,
    titulo: fila.titulo,
    autor: autorPublico(fila.autor),
    createdAt: fila.createdAt.toISOString(),
    ultimaActividad: fila.ultimaActividad.toISOString(),
    // El mensaje de apertura no cuenta como respuesta.
    respuestas: Math.max(0, fila._count.mensajes - 1),
    fijado: fila.fijado,
    cerrado: fila.cerrado
  }));
}

export type MensajeVista = {
  id: string;
  autor: AutorPublico;
  esPropio: boolean;
  /** null si está oculto y quien mira no modera. */
  cuerpo: string | null;
  oculto: boolean;
  ocultoMotivo: string | null;
  esApertura: boolean;
  createdAt: string;
  likes: number;
  meGusta: boolean;
};

export type HiloVista = {
  id: string;
  categoria: string;
  titulo: string;
  createdAt: string;
  fijado: boolean;
  cerrado: boolean;
  oculto: boolean;
  mensajes: MensajeVista[];
};

/** Hilo completo para quien mira (null si no existe o está oculto para él). */
export async function obtenerHilo(id: string, viewerId: string | null, modera: boolean): Promise<HiloVista | null> {
  const hilo = await getPrisma().foroHilo.findUnique({
    where: { id },
    select: {
      id: true,
      espacio: true,
      categoria: true,
      titulo: true,
      createdAt: true,
      fijado: true,
      cerrado: true,
      ocultoEn: true,
      mensajes: {
        orderBy: { createdAt: "asc" },
        take: 300,
        select: {
          id: true,
          autorId: true,
          cuerpo: true,
          esApertura: true,
          createdAt: true,
          likesCount: true,
          ocultoEn: true,
          ocultoMotivo: true,
          autor: { select: SELECT_AUTOR },
          likes: viewerId ? { where: { userId: viewerId }, select: { userId: true } } : false
        }
      }
    }
  });
  if (!hilo || hilo.espacio !== ESPACIO_VESTIBULO || (hilo.ocultoEn && !modera)) {
    return null;
  }
  return {
    id: hilo.id,
    categoria: hilo.categoria,
    titulo: hilo.titulo,
    createdAt: hilo.createdAt.toISOString(),
    fijado: hilo.fijado,
    cerrado: hilo.cerrado,
    oculto: hilo.ocultoEn !== null,
    mensajes: hilo.mensajes.map((mensaje) => {
      const oculto = mensaje.ocultoEn !== null;
      return {
        id: mensaje.id,
        autor: autorPublico(mensaje.autor),
        esPropio: viewerId !== null && mensaje.autorId === viewerId,
        cuerpo: oculto && !modera ? null : mensaje.cuerpo,
        oculto,
        ocultoMotivo: modera ? mensaje.ocultoMotivo : null,
        esApertura: mensaje.esApertura,
        createdAt: mensaje.createdAt.toISOString(),
        likes: mensaje.likesCount,
        meGusta: Array.isArray(mensaje.likes) && mensaje.likes.length > 0
      };
    })
  };
}

/** Normaliza el texto de un mensaje: recorta y limita saltos de línea seguidos. */
export function normalizarTexto(texto: string): string {
  return texto.replace(/\r\n?/g, "\n").replace(/\n{4,}/g, "\n\n\n").trim();
}

export async function crearHilo(autorId: string, categoria: string, titulo: string, cuerpo: string): Promise<string> {
  const prisma = getPrisma();
  return prisma.$transaction(async (tx) => {
    const hilo = await tx.foroHilo.create({
      data: { espacio: ESPACIO_VESTIBULO, categoria, titulo, autorId },
      select: { id: true }
    });
    await tx.foroMensaje.create({ data: { hiloId: hilo.id, autorId, cuerpo, esApertura: true } });
    return hilo.id;
  }, TX_OPTIONS);
}

export type ResultadoRespuesta = { ok: true; id: string } | { ok: false; error: "no_existe" | "cerrado" };

export async function responderHilo(autorId: string, hiloId: string, cuerpo: string): Promise<ResultadoRespuesta> {
  const prisma = getPrisma();
  return prisma.$transaction(async (tx) => {
    const hilo = await tx.foroHilo.findUnique({
      where: { id: hiloId },
      select: { espacio: true, ocultoEn: true, cerrado: true }
    });
    if (!hilo || hilo.espacio !== ESPACIO_VESTIBULO || hilo.ocultoEn) {
      return { ok: false as const, error: "no_existe" as const };
    }
    if (hilo.cerrado) {
      return { ok: false as const, error: "cerrado" as const };
    }
    const mensaje = await tx.foroMensaje.create({ data: { hiloId, autorId, cuerpo }, select: { id: true, createdAt: true } });
    await tx.foroHilo.update({ where: { id: hiloId }, data: { ultimaActividad: mensaje.createdAt } });
    return { ok: true as const, id: mensaje.id };
  }, TX_OPTIONS);
}

export type ResultadoLike =
  | { ok: true; meGusta: boolean; likes: number }
  | { ok: false; error: "no_existe" | "propio" };

/** Alterna el me gusta del usuario. No existe "no me gusta": quitar el like
 *  propio solo deshace el like. */
export async function alternarLike(userId: string, mensajeId: string): Promise<ResultadoLike> {
  const prisma = getPrisma();
  return prisma.$transaction(async (tx) => {
    const mensaje = await tx.foroMensaje.findUnique({
      where: { id: mensajeId },
      select: { autorId: true, ocultoEn: true, hilo: { select: { ocultoEn: true } } }
    });
    if (!mensaje || mensaje.ocultoEn || mensaje.hilo.ocultoEn) {
      return { ok: false as const, error: "no_existe" as const };
    }
    if (mensaje.autorId === userId) {
      return { ok: false as const, error: "propio" as const };
    }
    const borrado = await tx.foroLike.deleteMany({ where: { userId, mensajeId } });
    let meGusta: boolean;
    if (borrado.count > 0) {
      meGusta = false;
      await tx.foroMensaje.update({ where: { id: mensajeId }, data: { likesCount: { decrement: borrado.count } } });
    } else {
      const creado = await tx.foroLike.createMany({ data: [{ userId, mensajeId }], skipDuplicates: true });
      meGusta = true;
      if (creado.count > 0) {
        await tx.foroMensaje.update({ where: { id: mensajeId }, data: { likesCount: { increment: creado.count } } });
      }
    }
    const { likesCount } = await tx.foroMensaje.findUniqueOrThrow({ where: { id: mensajeId }, select: { likesCount: true } });
    return { ok: true as const, meGusta, likes: Math.max(0, likesCount) };
  }, TX_OPTIONS);
}

export type ResultadoReporte = { ok: true } | { ok: false; error: "no_existe" | "propio" | "repetido" };

export async function reportarMensaje(
  autorId: string,
  mensajeId: string,
  motivo: string,
  detalle: string | null
): Promise<ResultadoReporte> {
  const prisma = getPrisma();
  const mensaje = await prisma.foroMensaje.findUnique({ where: { id: mensajeId }, select: { autorId: true } });
  if (!mensaje) return { ok: false, error: "no_existe" };
  if (mensaje.autorId === autorId) return { ok: false, error: "propio" };
  const creado = await prisma.foroReporte.createMany({
    data: [{ mensajeId, autorId, motivo, detalle }],
    skipDuplicates: true
  });
  return creado.count > 0 ? { ok: true } : { ok: false, error: "repetido" };
}
