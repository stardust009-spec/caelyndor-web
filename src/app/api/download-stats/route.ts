import { NextResponse } from "next/server";
import { redisAvailable, redisCommand } from "@/lib/redis";

export const dynamic = "force-dynamic";

// Los fileId son kebab-case (p. ej. "rubi-volcanic-heart-mp4").
const idPattern = /^[a-z0-9-]{1,120}$/;

function countKey(id: string) {
  return `descarga:${id}:count`;
}

async function readCounts(ids: string[]) {
  const keys = ids.map(countKey);
  const values = (await redisCommand(["MGET", ...keys])) as (string | null)[] | null;
  const counts: Record<string, number> = {};

  ids.forEach((id, index) => {
    counts[id] = Number(values?.[index] ?? 0);
  });

  return counts;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ids = (searchParams.get("ids") ?? "")
    .split(",")
    .filter((id) => idPattern.test(id))
    .slice(0, 80);

  if (ids.length === 0) {
    return NextResponse.json({ error: "Sin archivos válidos" }, { status: 400 });
  }

  if (!redisAvailable) {
    return NextResponse.json({ error: "Contadores no configurados" }, { status: 503 });
  }

  try {
    return NextResponse.json({ counts: await readCounts(ids) });
  } catch {
    return NextResponse.json({ error: "Error de almacenamiento" }, { status: 502 });
  }
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { id?: string } | null;
  const id = body?.id ?? "";

  if (!idPattern.test(id)) {
    return NextResponse.json({ error: "Petición inválida" }, { status: 400 });
  }

  if (!redisAvailable) {
    return NextResponse.json({ error: "Contadores no configurados" }, { status: 503 });
  }

  try {
    await redisCommand(["INCR", countKey(id)]);
    return NextResponse.json({ counts: await readCounts([id]) });
  } catch {
    return NextResponse.json({ error: "Error de almacenamiento" }, { status: 502 });
  }
}
