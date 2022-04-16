import { createClient } from 'redis';

const redisClient = createClient();

async function setRedis(key: string, value: string): Promise<void> {
  await redisClient.set(key, value);
}

async function setRedisPub(channel: string, message: string): Promise<void> {
  await redisClient.publish(channel, message);
}

export default {
  redisClient,
  setRedis,
  setRedisPub,
};
