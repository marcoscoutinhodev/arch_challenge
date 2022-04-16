import { Document } from 'mongodb';
import MongoHelper from '@/infra/mongo-helper';

export default async (accountId: number): Promise<number | null> => {
  const accountTransactions = await MongoHelper.getAllTransactionByAccountId(accountId);

  if (accountTransactions.length === 0) {
    return null;
  }

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
