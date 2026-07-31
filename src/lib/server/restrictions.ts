import "server-only";
import { NextResponse } from "next/server";
import { RestrictionType } from "@/generated/prisma/client";
import { getPrisma } from "./db";

export type TipoRestriccion = "accion" | "comentario";

const TYPE_MAP: Record<TipoRestriccion, RestrictionType> = {
  accion: RestrictionType.ACCION_SILENCIADA,
  comentario: RestrictionType.COMENTARIO_SILENCIADO
};

/** Filtro de vigencia: activa y no vencida (lazy expiry, sin cron). */
export function activeRestrictionWhere(userId: string, type: RestrictionType) {
  return {
    userId,
    type,
    active: true,
    OR: [{ expiresAt: null }, { expiresAt: { gt: new Date() } }]
  };
}

export async function hasActiveRestriction(userId: string, type: RestrictionType): Promise<boolean> {
  const row = await getPrisma().userRestriction.findFirst({
    where: activeRestrictionWhere(userId, type),
    select: { id: true }
  });
  return row !== null;
}

/**
 * Verificación única de restricciones (Parte 3, sección 8.2): se llama al
 * inicio de cada route handler afectado — no condicionales sueltos por el
 * código. Devuelve la respuesta 403 genérica si hay restricción vigente,
 * o null si se puede continuar. El usuario restringido puede seguir leyendo;
 * simplemente sus escrituras no se aceptan, sin detallar el porqué.
 */
export async function assertNoRestriccion(
  userId: string,
  tipo: TipoRestriccion
): Promise<NextResponse | null> {
  if (await hasActiveRestriction(userId, TYPE_MAP[tipo])) {
    return NextResponse.json({ error: "Esta acción no está disponible para tu cuenta" }, { status: 403 });
  }
  return null;
}
