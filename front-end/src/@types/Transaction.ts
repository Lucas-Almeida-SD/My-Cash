export type Transaction = {
  id: number;
  value: number;
  debitedAccountId: number;
  creditedAccountId: number;
  createdAt: Date;
};
