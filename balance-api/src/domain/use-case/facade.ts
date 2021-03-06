import { log } from 'console';
import reloadAccountBalance from '../helper/reload-account-balance';
import redisHelper from '@/infra/redis-helper';
import nodeCacheHelper from '@/infra/node-cache-helper';
import updateNodeCacheOnRedisChange from './update-node-cache-on-redis-change';

(async () => {
  updateNodeCacheOnRedisChange();
})();

export default class Facade {
  async exec(accountId: number): Promise<number | null> {
    log(`AccountID: ${accountId}`);
    let accountBalance: string | null | undefined;

    accountBalance = nodeCacheHelper.getNodeCache(accountId.toString());

    if (accountBalance) {
      log('Account balance found in node cache');
      return parseFloat(accountBalance);
    }

    accountBalance = await redisHelper.getRedis(accountId.toString());

    if (accountBalance) {
      log('Account balance found in redis');

      nodeCacheHelper.setNodeCache(accountId.toString(), accountBalance);
      log('Account balance updated in node cache for 5 minutes');

      return parseFloat(accountBalance);
    }

    log('Looking up the account balance in the database...');
    const accountBalanceReloaded = await reloadAccountBalance(accountId);

    if (accountBalanceReloaded !== null) {
      nodeCacheHelper.setNodeCache(accountId.toString(), accountBalanceReloaded.toString());
      log('Account balance updated in node cache for 5 minutes');
      await redisHelper.setRedis(accountId.toString(), accountBalanceReloaded.toString());
      log('Account balance updated in redis');

      return accountBalanceReloaded;
    }

    return null;
  }
}
