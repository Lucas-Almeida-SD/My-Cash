import { Transaction } from 'sequelize';

export interface IAccount {
  id: number;
  balance: number;
}

export interface IAccountModel {
  create(transaction: Transaction): Promise<IAccount>;
}
