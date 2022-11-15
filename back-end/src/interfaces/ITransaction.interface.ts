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

export interface ITransactionModel {
  create(newTransaction: ITransactionCreate, transactionSequelize: Transaction): Promise<void>
}

export interface ITransactionService {
  create(
    cashOutUser: IUserWithoutPassword,
    newTransaction: ITransactionCreateRequest
  ): Promise<void>
}

export interface ITransactionController {
  create(req: Request, res: Response): Promise<void>
}
