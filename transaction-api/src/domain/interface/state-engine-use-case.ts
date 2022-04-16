export interface StateEngineUseCase {
  exec(transactionData: StateEngineUseCase.TransactionData): Promise<boolean>
}

export namespace StateEngineUseCase {
  export type TransactionData = {
    accountId: number
    transactionType: string
    transactionAmount: number
    transactionDate: string
  };
}
