const url = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;

export const redisAvailable = Boolean(url && token);

type RedisResult = string | number | null;

export async function redisCommand(command: (string | number)[]): Promise<RedisResult> {
  if (!url || !token) {
    return null;
  }

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(command),
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error(`Redis respondió ${response.status}`);
  }

  const data = (await response.json()) as { result: RedisResult };
  return data.result;
}
