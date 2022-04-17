import { log } from 'console';
import { StateEngineUseCase } from '@/domain/interface/state-engine-use-case';
import reloadAccountBalance from '../helper/reload-account-balance';
import mongoHelper from '@/infra/mongo-helper';
import redisHelper from '@/infra/redis-helper';

export default class StateEngine implements StateEngineUseCase {
  async exec(transactionData: StateEngineUseCase.TransactionData): Promise<boolean> {
    const {
      accountId, transactionType, transactionAmount, transactionDate,
    } = transactionData;

    log(`Transaction details: AccountID ${accountId}`);

    let accountBalance = await reloadAccountBalance(accountId);

    transactionType === 'cred' ? accountBalance -= transactionAmount : accountBalance += transactionAmount;

    if (accountBalance >= 0) {
      const transactionsCollection = await mongoHelper.getTransactionsCollection();
      await transactionsCollection.insertOne({
        accountId, transactionType, transactionAmount, transactionDate,
      });
      log('Successful transaction');

      await redisHelper.setRedis(accountId.toString(), accountBalance.toString());
      await redisHelper.setRedisPub('account-balance-change', JSON.stringify({
        accountId,
        accountBalance,
      }));
      log(`Account balance ${accountId} has been successfully updated in redis\n`);

      return true;
    }

    log('Insufficient balance for this transaction\n');
    return false;
  }
}
