import { createClient } from 'redis';

const redisClient = createClient();
const subscriber = redisClient.duplicate();

async function getRedis(key: string): Promise<string | null> {
  const data = await redisClient.get(key);
  return data;
}

async function setRedis(key: string, value: string): Promise<void> {
  await redisClient.set(key, value);
}

export default {
  redisClient,
  subscriber,
  getRedis,
  setRedis,
};
