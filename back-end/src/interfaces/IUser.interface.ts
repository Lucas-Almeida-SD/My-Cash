import { Request, Response } from 'express';
import { Transaction } from 'sequelize';
import { IAccount } from './IAccount.interface';

export interface IUserRequest {
  username: string;
  password: string;
}

export interface IUserCreate extends IUserRequest {
  accountId: number;
}

export interface IUserWithoutPassword {
  id: number;
  username: string;
  accountId: number;
}

export interface IUserRelationWithAccount extends IUserWithoutPassword {
  account: IAccount
}

export interface IUser extends IUserWithoutPassword {
  password: string;
}

export interface IUserModel {
  login(userLogin: IUserRequest): Promise<IUser | null>;
  create(newUser: IUserCreate, transaction: Transaction): Promise<IUser>;
  getByUsername(username: string): Promise<IUserRelationWithAccount | null>;
}

export interface IUserService {
  login(userLogin: IUserRequest): Promise<string>
  create(newUser: IUserRequest): Promise<IUser>
}

export interface IUserController {
  login(req: Request, res: Response): Promise<void>
  create(req: Request, res: Response): Promise<void>
}
