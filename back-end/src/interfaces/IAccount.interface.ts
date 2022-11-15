import { Request, Response } from 'express';
import { Transaction } from 'sequelize';

export interface IAccount {
  id: number;
  balance: number;
}

export interface IAccountModel {
  create(transaction: Transaction): Promise<IAccount>;
  getById(id: number): Promise<IAccount | null>;
  update(id: number, balance: number, transaction?: Transaction): Promise<void>;
}

export interface IAccountService {
  getById(id: number): Promise<IAccount>;
}

export interface IAccountController {
  getById(req: Request, res: Response): Promise<void>;
}
