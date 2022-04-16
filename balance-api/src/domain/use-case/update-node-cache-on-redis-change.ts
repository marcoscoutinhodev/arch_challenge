import { log } from 'console';
import redisHelper from '@/infra/redis-helper';
import nodeCacheHelper from '@/infra/node-cache-helper';

export default async () => {
  await redisHelper.subscriber.subscribe('account-balance-change', async (accountRedisInfo) => {
    const accountInfo = JSON.parse(accountRedisInfo);
    nodeCacheHelper.setNodeCache(
      accountInfo.accountId,
      accountInfo.accountBalance,
    );
    log(`New transaction detected on account ${accountInfo.accountId}, balance has been updated in node-cache\n`);
  });
};
