import { Request, Response } from 'express';

export interface IUserLoginRequest {
  username: string;
  password: string;
}

export interface IUser extends IUserLoginRequest {
  id: number;
  accountId: number;
}

export interface IUserModel {
  login(userLogin: IUserLoginRequest): Promise<IUser | null>
}

export interface IUserService {
  login(userLogin: unknown): Promise<string>
}

export interface IUserController {
  login(req: Request, res: Response): Promise<void>
}
