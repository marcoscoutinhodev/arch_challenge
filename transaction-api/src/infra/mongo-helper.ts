import { Collection, Document, MongoClient } from 'mongodb';

export default {
  uri: null as unknown as string,
  mongoClient: null as unknown as MongoClient | null,

  async connect(uri: string): Promise<void> {
    this.mongoClient = await MongoClient.connect(uri);

    if (!this.uri) {
      this.uri = uri;
    }
  },
  async getTransactionsCollection(): Promise<Collection> {
    if (!this.mongoClient?.db) {
      await this.connect(this.uri);
    }

    return this.mongoClient!.db().collection('usersTransactions');
  },
  async getAllTransactionByAccountId(accountId: number): Promise<Document[]> {
    const transactionCollection = await this.getTransactionsCollection();
    const transactions = await transactionCollection.aggregate([
      {
        $match: { accountId },
      },
    ]).toArray();

    return transactions;
  },
};
