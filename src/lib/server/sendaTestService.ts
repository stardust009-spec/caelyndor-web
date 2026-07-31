import "server-only";
import { Senda, type Prisma } from "@/generated/prisma/client";
import { getPrisma, TX_OPTIONS } from "./db";
import { SENDA_TEST_UNLOCK_THRESHOLD } from "./ranks";
import { getStoryMetaMap } from "./storyContent";
import {
  SENDA_QUESTIONS,
  SENDA_READINGS,
  scoreSendaTest,
  validateAnswers,
  type SendaTestAnswers
} from "./sendaScoring";
import { evaluateAchievements } from "./achievements";

export type SendaTestStatus = {
  desbloqueado: boolean;
  completado: boolean;
  puedeElegirManual: boolean;
  resultado: {
    sendaPrincipal: Senda;
    sendasCercanas: Senda[];
    eligioManual: boolean;
    lectura: string;
    fortalezas: string;
    riesgos: string;
  } | null;
  preguntas: typeof SENDA_QUESTIONS | null;
};

async function canonicalCompletedCount(tx: Prisma.TransactionClient, userId: string): Promise<number> {
  const historias = getStoryMetaMap();
  const rows = await tx.storyProgress.findMany({
    where: { userId, completedAt: { not: null } },
    select: { storySlug: true }
  });
  return rows.filter((row) => historias.get(row.storySlug)?.canonical).length;
}

export async function getSendaTestStatus(userId: string): Promise<SendaTestStatus> {
  const prisma = getPrisma();
  const [completed, result] = await Promise.all([
    prisma.$transaction((tx) => canonicalCompletedCount(tx, userId), TX_OPTIONS),
    prisma.sendaTestResult.findUnique({ where: { userId } })
  ]);

  const desbloqueado = completed >= SENDA_TEST_UNLOCK_THRESHOLD;
  if (!result) {
    return {
      desbloqueado,
      completado: false,
      puedeElegirManual: false,
      resultado: null,
      preguntas: desbloqueado ? SENDA_QUESTIONS : null
    };
  }

  const reading = SENDA_READINGS[result.sendaPrincipalResultado];
  return {
    desbloqueado,
    completado: true,
    puedeElegirManual: !result.eligioManual,
    resultado: {
      sendaPrincipal: result.sendaPrincipalResultado,
      sendasCercanas: result.sendasCercanasResultado,
      eligioManual: result.eligioManual,
      ...reading
    },
    preguntas: null
  };
}

export type SendaSubmitOutcome =
  | { ok: true; status: SendaTestStatus }
  | { ok: false; error: "locked" | "already_done" | "invalid_answers" | "no_result" | "manual_used" | "invalid_senda" };

/** Primer envío del ritual: calcula y persiste el resultado (una sola vez). */
export async function submitSendaTest(userId: string, answers: SendaTestAnswers): Promise<SendaSubmitOutcome> {
  if (!validateAnswers(answers)) {
    return { ok: false, error: "invalid_answers" };
  }

  const prisma = getPrisma();
  const outcome = await prisma.$transaction(async (tx) => {
    const completed = await canonicalCompletedCount(tx, userId);
    if (completed < SENDA_TEST_UNLOCK_THRESHOLD) {
      return "locked" as const;
    }
    const existing = await tx.sendaTestResult.findUnique({ where: { userId } });
    if (existing) {
      return "already_done" as const;
    }

    const score = scoreSendaTest(answers);
    await tx.sendaTestResult.create({
      data: {
        userId,
        respuestas: answers,
        sendaPrincipalResultado: score.principal,
        sendasCercanasResultado: score.cercanas
      }
    });
    await tx.user.update({
      where: { id: userId },
      data: { sendaPrincipal: score.principal, sendasCercanas: score.cercanas }
    });
    await evaluateAchievements(tx, userId);
    return "created" as const;
  }, TX_OPTIONS);

  if (outcome !== "created") {
    return { ok: false, error: outcome };
  }
  return { ok: true, status: await getSendaTestStatus(userId) };
}

/**
 * Corrección manual única: el usuario sobrescribe la Senda del cristal.
 * Después de esto el resultado queda fijo para siempre.
 */
export async function chooseSendaManually(userId: string, senda: string): Promise<SendaSubmitOutcome> {
  if (!Object.values(Senda).includes(senda as Senda)) {
    return { ok: false, error: "invalid_senda" };
  }

  const prisma = getPrisma();
  const outcome = await prisma.$transaction(async (tx) => {
    // updateMany condicional: solo procede si aún no usó su corrección manual.
    const updated = await tx.sendaTestResult.updateMany({
      where: { userId, eligioManual: false },
      data: { sendaPrincipalResultado: senda as Senda, eligioManual: true }
    });
    if (updated.count === 0) {
      const exists = await tx.sendaTestResult.findUnique({ where: { userId }, select: { id: true } });
      return exists ? ("manual_used" as const) : ("no_result" as const);
    }
    await tx.user.update({ where: { id: userId }, data: { sendaPrincipal: senda as Senda } });
    return "updated" as const;
  }, TX_OPTIONS);

  if (outcome !== "updated") {
    return { ok: false, error: outcome };
  }
  return { ok: true, status: await getSendaTestStatus(userId) };
}
