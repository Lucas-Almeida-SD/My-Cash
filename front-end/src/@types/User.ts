export type User = {
  id: number;
  username: string;
  accountId: number;
  account: {
    id: number;
    balance: number;
  }
};

export type UserToken = { token:string };
