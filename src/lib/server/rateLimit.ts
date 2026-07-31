import "server-only";

/**
 * Rate limiting de ventana fija sobre el Redis existente (Upstash/Vercel KV).
 * A diferencia de los endpoints legados, aquí TODA llamada a Redis tiene
 * timeout explícito. Si Redis no está configurado se usa un fallback
 * en memoria (por instancia): suficiente para desarrollo, y en producción
 * degrada a "algo de límite" en vez de a "sin límite".
 */

const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;
const REDIS_TIMEOUT_MS = 1_500;

type MemoryBucket = { count: number; resetAt: number };
const memoryBuckets = new Map<string, MemoryBucket>();

async function redisPipeline(commands: (string | number)[][]): Promise<unknown[] | null> {
  if (!REDIS_URL || !REDIS_TOKEN) {
    return null;
  }
  const response = await fetch(`${REDIS_URL}/pipeline`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${REDIS_TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(commands),
    cache: "no-store",
    signal: AbortSignal.timeout(REDIS_TIMEOUT_MS)
  });
  if (!response.ok) {
    throw new Error(`Redis respondió ${response.status}`);
  }
  const data = (await response.json()) as { result: unknown }[];
  return data.map((entry) => entry.result);
}

export type RateLimitResult = { allowed: boolean; remaining: number };

/**
 * Consume 1 intento del bucket `route:id`. `limit` intentos por `windowSeconds`.
 * Ante error de Redis (timeout incluido) degrada al fallback en memoria en vez
 * de bloquear la request: el rate limit protege, no debe tumbar el servicio.
 */
export async function rateLimit(
  route: string,
  id: string,
  limit: number,
  windowSeconds: number
): Promise<RateLimitResult> {
  const key = `aura:rl:${route}:${id}`;

  try {
    const results = await redisPipeline([
      ["INCR", key],
      ["EXPIRE", key, windowSeconds, "NX"]
    ]);
    if (results) {
      const count = Number(results[0] ?? 0);
      return { allowed: count <= limit, remaining: Math.max(0, limit - count) };
    }
  } catch {
    // Redis caído o lento: cae al fallback en memoria.
  }

  const now = Date.now();
  const bucket = memoryBuckets.get(key);
  if (!bucket || bucket.resetAt <= now) {
    memoryBuckets.set(key, { count: 1, resetAt: now + windowSeconds * 1_000 });
    return { allowed: limit >= 1, remaining: limit - 1 };
  }
  bucket.count += 1;
  if (memoryBuckets.size > 10_000) {
    for (const [k, b] of memoryBuckets) {
      if (b.resetAt <= now) memoryBuckets.delete(k);
    }
  }
  return { allowed: bucket.count <= limit, remaining: Math.max(0, limit - bucket.count) };
}

/** Identificador de cliente para límites pre-autenticación. */
export function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return request.headers.get("x-real-ip") ?? "unknown";
}
