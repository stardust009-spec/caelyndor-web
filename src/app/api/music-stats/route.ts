import { NextResponse } from "next/server";
import { redisAvailable, redisCommand } from "@/lib/redis";

export const dynamic = "force-dynamic";

// Los ids de tema son kebab-case y pueden ser largos
// (p. ej. "carolina-varthalion-el-diamante-del-sol-negro-mirame").
const idPattern = /^[a-z0-9-]{1,120}$/;
const actions = ["play", "like", "unlike"] as const;

type StatsAction = (typeof actions)[number];

function playsKey(id: string) {
  return `musica:${id}:plays`;
}

function likesKey(id: string) {
  return `musica:${id}:likes`;
}

async function readCounters(ids: string[]) {
  const keys = ids.flatMap((id) => [playsKey(id), likesKey(id)]);
  const values = (await redisCommand(["MGET", ...keys])) as (string | null)[] | null;
  const stats: Record<string, { plays: number; likes: number }> = {};

  ids.forEach((id, index) => {
    stats[id] = {
      plays: Number(values?.[index * 2] ?? 0),
      likes: Number(values?.[index * 2 + 1] ?? 0)
    };
  });

  return stats;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ids = (searchParams.get("ids") ?? "")
    .split(",")
    .filter((id) => idPattern.test(id))
    .slice(0, 80);

  if (ids.length === 0) {
    return NextResponse.json({ error: "Sin temas válidos" }, { status: 400 });
  }

  if (!redisAvailable) {
    return NextResponse.json({ error: "Contadores no configurados" }, { status: 503 });
  }

  try {
    return NextResponse.json({ stats: await readCounters(ids) });
  } catch {
    return NextResponse.json({ error: "Error de almacenamiento" }, { status: 502 });
  }
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as {
    id?: string;
    action?: string;
  } | null;
  const id = body?.id ?? "";
  const action = body?.action as StatsAction;

  if (!idPattern.test(id) || !actions.includes(action)) {
    return NextResponse.json({ error: "Petición inválida" }, { status: 400 });
  }

  if (!redisAvailable) {
    return NextResponse.json({ error: "Contadores no configurados" }, { status: 503 });
  }

  try {
    if (action === "play") {
      await redisCommand(["INCR", playsKey(id)]);
    } else if (action === "like") {
      await redisCommand(["INCR", likesKey(id)]);
    } else {
      const result = await redisCommand(["DECR", likesKey(id)]);
      if (typeof result === "number" && result < 0) {
        await redisCommand(["SET", likesKey(id), 0]);
      }
    }

    return NextResponse.json({ stats: await readCounters([id]) });
  } catch {
    return NextResponse.json({ error: "Error de almacenamiento" }, { status: 502 });
  }
}
