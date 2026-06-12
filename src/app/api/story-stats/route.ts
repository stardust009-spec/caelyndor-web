import { NextResponse } from "next/server";
import { redisAvailable, redisCommand } from "@/lib/redis";

export const dynamic = "force-dynamic";

const slugPattern = /^[a-z0-9-]{1,80}$/;
const actions = ["view", "like", "unlike"] as const;

type StatsAction = (typeof actions)[number];

function viewsKey(slug: string) {
  return `relato:${slug}:views`;
}

function likesKey(slug: string) {
  return `relato:${slug}:likes`;
}

async function readCounters(slugs: string[]) {
  const keys = slugs.flatMap((slug) => [viewsKey(slug), likesKey(slug)]);
  const values = (await redisCommand(["MGET", ...keys])) as (string | null)[] | null;
  const stats: Record<string, { views: number; likes: number }> = {};

  slugs.forEach((slug, index) => {
    stats[slug] = {
      views: Number(values?.[index * 2] ?? 0),
      likes: Number(values?.[index * 2 + 1] ?? 0)
    };
  });

  return stats;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slugs = (searchParams.get("slugs") ?? "")
    .split(",")
    .filter((slug) => slugPattern.test(slug))
    .slice(0, 40);

  if (slugs.length === 0) {
    return NextResponse.json({ error: "Sin relatos válidos" }, { status: 400 });
  }

  if (!redisAvailable) {
    return NextResponse.json({ error: "Contadores no configurados" }, { status: 503 });
  }

  try {
    return NextResponse.json({ stats: await readCounters(slugs) });
  } catch {
    return NextResponse.json({ error: "Error de almacenamiento" }, { status: 502 });
  }
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as {
    slug?: string;
    action?: string;
  } | null;
  const slug = body?.slug ?? "";
  const action = body?.action as StatsAction;

  if (!slugPattern.test(slug) || !actions.includes(action)) {
    return NextResponse.json({ error: "Petición inválida" }, { status: 400 });
  }

  if (!redisAvailable) {
    return NextResponse.json({ error: "Contadores no configurados" }, { status: 503 });
  }

  try {
    if (action === "view") {
      await redisCommand(["INCR", viewsKey(slug)]);
    } else if (action === "like") {
      await redisCommand(["INCR", likesKey(slug)]);
    } else {
      const result = await redisCommand(["DECR", likesKey(slug)]);
      if (typeof result === "number" && result < 0) {
        await redisCommand(["SET", likesKey(slug), 0]);
      }
    }

    return NextResponse.json({ stats: await readCounters([slug]) });
  } catch {
    return NextResponse.json({ error: "Error de almacenamiento" }, { status: 502 });
  }
}
