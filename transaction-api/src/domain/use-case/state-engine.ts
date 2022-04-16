import { StateEngineUseCase } from '@/domain/interface/state-engine-use-case';
import mongoHelper from '@/infra/mongo-helper';
import reloadAccountBalance from '../helper/reload-account-balance';

export default class StateEngine implements StateEngineUseCase {
  async exec(transactionData: StateEngineUseCase.TransactionData): Promise<boolean> {
    const {
      accountId, transactionType, transactionAmount, transactionDate,
    } = transactionData;

    let accountBalance = await reloadAccountBalance(accountId);

    transactionType === 'cred' ? accountBalance -= transactionAmount : accountBalance += transactionAmount;

    if (accountBalance >= 0) {
      const transactionsCollection = await mongoHelper.getTransactionsCollection();
      const response = await transactionsCollection.insertOne({
        accountId, transactionType, transactionAmount, transactionDate,
      });

      if (response.insertedId) {
        return true;
      }
    }

    return false;
  }
}
