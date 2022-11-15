import { Request, Response } from 'express';
import { Transaction } from 'sequelize';
import { IUserWithoutPassword } from './IUser.interface';

export interface ITransactionCreateRequest {
  value: number;
  cashInUsername: string;
}

export interface ITransactionCreate {
  debitedAccountId: number;
  creditedAccountId: number;
  value: number;
}

export interface ITransaction extends ITransactionCreate {
  id: number;
  createdAt: Date;
}

export interface ITransactionFilterOptions {
  createdAt?: Date | undefined;
  cashType?: 'in' | 'out' | undefined;
}

export interface ITransactionModel {
  create(newTransaction: ITransactionCreate, transactionSequelize: Transaction): Promise<void>;
  getMyTransactions(
    accountId: number,
    filterOptions: ITransactionFilterOptions
  ): Promise<ITransaction[] | []>;
}

export interface ITransactionService {
  create(
    cashOutUser: IUserWithoutPassword,
    newTransaction: ITransactionCreateRequest
  ): Promise<void>;
  getMyTransactions(
    accountId: number,
    filterOptions: ITransactionFilterOptions
  ): Promise<ITransaction[] | []>;
}

export interface ITransactionController {
  create(req: Request, res: Response): Promise<void>;
  getMyTransactions(req: Request, res: Response): Promise<void>;
}
