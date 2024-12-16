import { debuggerConfig } from "@astro/config";
import { Pool, neonConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@prisma/client";
import { createPrismaRedisCache } from "prisma-redis-middleware";
import type { CreatePrismaRedisCache } from "prisma-redis-middleware/dist/types";
import ws from "ws";
import { Logger } from "./logger";
import RedisCache from "./redis";

neonConfig.webSocketConstructor = ws;

const prismaClientWrapper = (prismaClient: PrismaClient) => {
 let cacheOptions: CreatePrismaRedisCache["storage"];

 if (RedisCache instanceof Map) {
  cacheOptions = {
   type: "memory",
   options: {},
  };
 } else {
  cacheOptions = {
   type: "redis",
   options: {
    /* @ts-expect-error tipos inválidos para CacheOptions*/
    client: RedisCache,
   },
  };
 }

 const cache = createPrismaRedisCache({
  models: [
   { model: "User", excludeMethods: ["findMany"] },
   { model: "Guild", excludeMethods: ["findMany"], invalidateRelated: ["GuildDisabledCommands", "GuildDisabledCategories"] },
   { model: "GuildDisabledCommands", excludeMethods: ["findMany"], invalidateRelated: ["Guild"] },
   { model: "GuildDisabledCategories", excludeMethods: ["findMany"], invalidateRelated: ["Guild"] },
   { model: "GuildLogs", cacheTime: 15 },
   { model: "GuildXP", cacheTime: 15 },
  ],
  storage: cacheOptions,
  cacheTime: 30,
  excludeModels: ["Session", "Account"],
  onHit: (key) => {
   if (debuggerConfig.displayDatabaseLogs) {
    Logger("info", `Cache hit: ${key}`);
   }
  },
  onMiss: (key) => {
   if (debuggerConfig.displayCacheMessages) {
    Logger("info", `Cache miss: ${key}`);
   }
  },
  onError: (key) => {
   if (debuggerConfig.displayCacheMessages) {
    Logger("info", `Cache error: ${key}`);
   }
  },
 });
  
 prismaClient.$use(cache);

 if (debuggerConfig.displayDatabaseLogs) {
  prismaClient.$extends({
   query: {
     /* eslint-disable-next-line */
    async $allOperations({ operation, model, args, query }: { operation: string; model: string; args: any; query: Function }) {
     const start = performance.now();
     const result = await query(args);
     const end = performance.now();
     const time = end - start;
     Logger("info", `Query: ${operation} ${model} ${JSON.stringify(args)} ${time}ms`);
     return result;
    },
   },
  });
 }

 return prismaClient;
};

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
 throw new Error("DATABASE_URL is not defined in the environment variables.");
}

const prismaClientsingleton = () => {
 if (process.env.DATABASE_URL?.includes("neon.tech")) {
  Logger("info", "URL Neon encontrada, configurando o Prisma Neon client...");
  const pool = new Pool({ connectionString });
  const adapter = new PrismaNeon(pool);
  return prismaClientWrapper(new PrismaClient({ adapter }));
 } else {
  Logger("info", "URL Neon não encontrada, configurando o Prisma client...");
  return prismaClientWrapper(new PrismaClient());
 }
};

declare const globalThis: {
 prismaGlobal: ReturnType<typeof prismaClientsingleton>;
} & typeof global;

const prismaClient = globalThis.prismaGlobal || prismaClientsingleton();

if (process.env.NODE_ENV !== "production" && !globalThis.prismaGlobal) {
 globalThis.prismaGlobal = prismaClient;
}

export default prismaClient;

export * from "@prisma/client";
