import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/server/db";

export const dynamic = "force-dynamic";

/** Catálogo público de avatares activos (catálogo cerrado curado por Claudio). */
export async function GET() {
  const avatares = await getPrisma().avatarOption.findMany({
    where: { active: true },
    orderBy: { sortOrder: "asc" },
    select: { id: true, slug: true, characterName: true, style: true, imageUrl: true, isDefault: true }
  });
  return NextResponse.json({ avatares });
}
