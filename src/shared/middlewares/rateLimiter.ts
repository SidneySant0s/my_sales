/* eslint-disable @typescript-eslint/no-unused-vars */
import AppError from "@shared/errors/AppError";
import { NextFunction, Response, Request } from "express";
import { RateLimiterMemory, RateLimiterRedis } from "rate-limiter-flexible";
import { createClient} from "redis";

const redisClient = createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
  ...(process.env.REDIS_PASS && { password: process.env.REDIS_PASS }),
});


redisClient.on('error', (err) => console.error('Redis Client Error:', err));
redisClient.on('connect', () => console.log('Redis connected!'));


//NÃO TA FUNCIONANDO !!!

const rateLimiterMemory = new RateLimiterMemory({
  points: 500,
  duration: 50,
});

export const redisConnect = redisClient.connect()

const limiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'ratelimit',
  points: 500,
  duration: 50,
  insuranceLimiter: rateLimiterMemory,
});


export default async function ratelimiter(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  try {
    await limiter.consume(request.ip as string);

    return next();

  } catch (err) {
    throw new AppError('Too many requests.', 429)
  }
}
