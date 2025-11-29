const cache = new Map<string, { ts: number; value: any }>();

export function setCache(key: string, value: any, ttlMs: number = 1000 * 60 * 5) {
  cache.set(key, { ts: Date.now() + ttlMs, value });
}

export function getCache(key: string) {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() > entry.ts) {
    cache.delete(key);
    return null;
  }
  return entry.value;
}

export async function fetchWithCache<T>(key: string, fetcher: () => Promise<T>, ttlMs: number = 1000 * 60 * 5): Promise<T> {
  const cached = getCache(key);
  if (cached) return cached as T;
  const value = await fetcher();
  setCache(key, value, ttlMs);
  return value;
}

export default {
  getCache,
  setCache,
  fetchWithCache,
};
