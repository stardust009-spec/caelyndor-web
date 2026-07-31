import { NextResponse } from "next/server";
import { AdminAccessAction } from "@/generated/prisma/client";
import { logAdminAccess, requireAdminApi } from "@/lib/server/adminGuard";
import { getPrisma } from "@/lib/server/db";
import { rankLabel } from "@/lib/server/ranks";

export const dynamic = "force-dynamic";

const PAGE_SIZE = 25;

/**
 * Listado de usuarios (Parte 3, sección 7.1): solo lo mínimo para identificar
 * y navegar — alias, avatar, rango, fecha de registro. Los datos personales
 * quedan para la vista de detalle (reduce exposición accidental).
 */
export async function GET(request: Request) {
  const guard = await requireAdminApi();
  if (!guard.ok) {
    return guard.response;
  }

  const { searchParams } = new URL(request.url);
  const page = Math.max(1, Number(searchParams.get("page") ?? 1) || 1);

  const prisma = getPrisma();
  const [total, users] = await Promise.all([
    prisma.user.count(),
    prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      select: {
        id: true,
        createdAt: true,
        currentRank: true,
        profile: {
          select: { alias: true, avatar: { select: { imageUrl: true, characterName: true } } }
        }
      }
    })
  ]);

  await logAdminAccess(AdminAccessAction.VIEW_USER_LIST, guard.admin.userId);

  return NextResponse.json({
    page,
    pageSize: PAGE_SIZE,
    total,
    usuarios: users.map((user) => ({
      id: user.id,
      alias: user.profile?.alias ?? null,
      avatarUrl: user.profile?.avatar?.imageUrl ?? null,
      rango: rankLabel(user.currentRank),
      registradoEl: user.createdAt
    }))
  });
}
