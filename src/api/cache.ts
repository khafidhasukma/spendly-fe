// In-memory cache + request dedupe for GET calls.
// Mutations invalidate by key prefix.

type CacheEntry<T> = { data: T; expiresAt: number };

const TTL_MS = 60_000;

const cache = new Map<string, CacheEntry<unknown>>();
const inflight = new Map<string, Promise<unknown>>();

export function getCached<T>(key: string): T | undefined {
  const entry = cache.get(key);
  if (!entry) return undefined;
  if (entry.expiresAt < Date.now()) {
    cache.delete(key);
    return undefined;
  }
  return entry.data as T;
}

export function setCached<T>(key: string, data: T, ttl = TTL_MS): void {
  cache.set(key, { data, expiresAt: Date.now() + ttl });
}

export function invalidate(prefix: string): void {
  for (const k of cache.keys()) {
    if (k === prefix || k.startsWith(`${prefix}:`)) cache.delete(k);
  }
  for (const k of inflight.keys()) {
    if (k === prefix || k.startsWith(`${prefix}:`)) inflight.delete(k);
  }
}

export function clearCache(): void {
  cache.clear();
  inflight.clear();
}

export async function dedupe<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttl = TTL_MS,
): Promise<T> {
  const cached = getCached<T>(key);
  if (cached !== undefined) return cached;

  const pending = inflight.get(key);
  if (pending) return pending as Promise<T>;

  const promise = fetcher()
    .then((data) => {
      setCached(key, data, ttl);
      return data;
    })
    .finally(() => {
      inflight.delete(key);
    });

  inflight.set(key, promise);
  return promise;
}
