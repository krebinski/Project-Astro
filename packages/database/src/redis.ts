import { debuggerConfig } from "@astro/config";
import Redis, { type Redis as RedisType } from "ioredis";
import { Logger } from "./logger";

let cache: Map<string, string> | RedisType;

if (process.env.REDIS_URL) {
 Logger("info", "URL Redis encontrada, configurando o Global Redis cache...");
 cache = new Redis(process.env.REDIS_URL);
} else {
 Logger("warn", "URL Redis não encontrada, configurando o Local Redis cache...");
 cache = new Map();
}

export default cache;

export async function cacheSet(key: string, value: object | string, ttl: number = 60): Promise<void> {
 if (debuggerConfig.displayCacheMessages) {
  Logger("info", `Configurando chave ${key} para ${JSON.stringify(value)} com TTL de ${ttl}`);
 }
 if (process.env.REDIS_URL && cache instanceof Redis) {
  await cache.set(key, JSON.stringify(value));
  await cache.expire(key, ttl * 1000);
  return;
 } else if (cache instanceof Map) {
  cache.set(key, JSON.stringify(value));
  setTimeout(() => {
   cache.delete(key);
  }, ttl * 1000);
  return;
 }
}

export async function cacheGet(key: string): Promise<string | null> {
 if (debuggerConfig.displayCacheMessages) {
  Logger("info", `Buscando chave ${key}`);
 }
 if (process.env.REDIS_URL && cache instanceof Redis) {
  const get = await cache.get(key);
  return get ? JSON.parse(JSON.stringify(get)) : null;
 } else if (cache instanceof Map) {
  const get = cache.get(key);
  return get ? get : JSON.stringify({});
 }
 return null;
}

export async function cacheDel(key: string): Promise<void> {
 if (debuggerConfig.displayCacheMessages) {
  Logger("info", `Removendo chave ${key}`);
 }
 if (process.env.REDIS_URL && cache instanceof Redis) {
  await cache.del(key);
 } else if (cache instanceof Map) {
  cache.delete(key);
 }
}
