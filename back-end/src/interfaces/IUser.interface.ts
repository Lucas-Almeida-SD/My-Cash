import { Request, Response } from 'express';
import { Transaction } from 'sequelize';

export interface IUserRequest {
  username: string;
  password: string;
}

export interface IUserCreate extends IUserRequest {
  accountId: number;
}

export interface IUser extends IUserRequest {
  id: number;
  accountId: number;
}

export interface IUserModel {
  login(userLogin: IUserRequest): Promise<IUser | null>
  create(newUser: IUserCreate, transaction: Transaction): Promise<IUser>
}

export interface IUserService {
  login(userLogin: IUserRequest): Promise<string>
  create(newUser: IUserRequest): Promise<IUser>
}

export interface IUserController {
  login(req: Request, res: Response): Promise<void>
  create(req: Request, res: Response): Promise<void>
}
