import { Document } from 'mongodb';
import MongoHelper from '@/infra/mongo-helper';

export default async (accountId: number): Promise<number> => {
  const accountTransactions = await MongoHelper.getAllTransactionByAccountId(accountId);

  let accountBalance = 0;

  accountTransactions.forEach((transaction: Document) => {
    if (transaction.transactionType === 'deb') {
      accountBalance += transaction.transactionAmount;
    } else {
      accountBalance -= transaction.transactionAmount;
    }
  });

  return accountBalance;
};
