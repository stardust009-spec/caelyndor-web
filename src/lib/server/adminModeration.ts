import "server-only";
import { AdminModerationAction, RestrictionType } from "@/generated/prisma/client";
import { getPrisma, TX_OPTIONS } from "./db";
export { restriccionVigente } from "@/lib/restrictionsLogic";

export type ApplyRestrictionInput = {
  adminUserId: string;
  targetUserId: string;
  type: RestrictionType;
  reason: string;
  expiresAt: Date | null;
  ipAddress: string;
};

export type ModerationOutcome =
  | { ok: true; restrictionId: string }
  | { ok: false; error: "self_restriction" | "target_not_found" | "already_active" };

/**
 * Aplica una restricción (Parte 3, sección 8). Reglas:
 * - el admin no puede restringirse a sí mismo (validación explícita);
 * - ban_completo revoca TODAS las sesiones activas del usuario en la misma
 *   transacción — la sesión abierta muere en el acto, no en el próximo intento;
 * - todo queda en AdminModerationLog.
 */
export async function applyRestriction(input: ApplyRestrictionInput): Promise<ModerationOutcome> {
  if (input.adminUserId === input.targetUserId) {
    return { ok: false, error: "self_restriction" };
  }

  const prisma = getPrisma();
  return prisma.$transaction(async (tx) => {
    const target = await tx.user.findUnique({ where: { id: input.targetUserId }, select: { id: true } });
    if (!target) {
      return { ok: false as const, error: "target_not_found" as const };
    }

    const existing = await tx.userRestriction.findFirst({
      where: {
        userId: input.targetUserId,
        type: input.type,
        active: true,
        OR: [{ expiresAt: null }, { expiresAt: { gt: new Date() } }]
      },
      select: { id: true }
    });
    if (existing) {
      return { ok: false as const, error: "already_active" as const };
    }

    const restriction = await tx.userRestriction.create({
      data: {
        userId: input.targetUserId,
        type: input.type,
        reason: input.reason,
        expiresAt: input.expiresAt,
        appliedById: input.adminUserId
      },
      select: { id: true }
    });

    if (input.type === RestrictionType.BAN_COMPLETO) {
      await tx.appSession.updateMany({
        where: { userId: input.targetUserId, revokedAt: null },
        data: { revokedAt: new Date() }
      });
    }

    await tx.adminModerationLog.create({
      data: {
        adminUserId: input.adminUserId,
        targetUserId: input.targetUserId,
        action: AdminModerationAction.APPLY_RESTRICTION,
        restriction: input.type,
        reason: input.reason,
        ipAddress: input.ipAddress
      }
    });

    return { ok: true as const, restrictionId: restriction.id };
  }, TX_OPTIONS);
}

export type LiftOutcome = { ok: true } | { ok: false; error: "not_found" };

/**
 * Levanta una restricción activa. Mismo camino de verificación redundante que
 * aplicarla; nunca borra la fila — active=false + liftedBy/liftedAt.
 */
export async function liftRestriction(input: {
  adminUserId: string;
  targetUserId: string;
  restrictionId: string;
  ipAddress: string;
}): Promise<LiftOutcome> {
  const prisma = getPrisma();
  return prisma.$transaction(async (tx) => {
    const restriction = await tx.userRestriction.findFirst({
      where: { id: input.restrictionId, userId: input.targetUserId, active: true },
      select: { id: true, type: true }
    });
    if (!restriction) {
      return { ok: false as const, error: "not_found" as const };
    }

    await tx.userRestriction.update({
      where: { id: restriction.id },
      data: { active: false, liftedById: input.adminUserId, liftedAt: new Date() }
    });

    await tx.adminModerationLog.create({
      data: {
        adminUserId: input.adminUserId,
        targetUserId: input.targetUserId,
        action: AdminModerationAction.LIFT_RESTRICTION,
        restriction: restriction.type,
        reason: "Restricción levantada",
        ipAddress: input.ipAddress
      }
    });

    return { ok: true as const };
  }, TX_OPTIONS);
}

