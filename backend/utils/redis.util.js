import Redis from "ioredis";
import { devLogger } from "./devLogger.js";

export const redisClient = new Redis({
    host: process.env.REDIS_HOST || "127.0.0.1",
    port: Number(process.env.REDIS_PORT) || 6379,
    password: process.env.REDIS_PASSWORD,
    retryStrategy(time) {
        return Math.min(time * 100, 2000)
    },
    maxRetriesPerRequest: null,
})

redisClient.on("error", (err) => {
    devLogger(`❌ redisClient error: ${err.stack}`)
})

redisClient.on("connect", () => {
    devLogger("✅ redisClient connected")
})

