import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IAccountController } from '../interfaces/IAccount.interface';
import AccountService from '../services/Account.service';

export default class AccountController implements IAccountController {
  constructor(private service: AccountService) {}

  public getById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    const account = await this.service.getById(Number(id));

    res.status(StatusCodes.OK).json(account);
  };
}
