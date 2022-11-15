import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ITransactionController, ITransactionService } from '../interfaces/ITransaction.interface';
import { IUserWithoutPassword } from '../interfaces/IUser.interface';

export default class TransactionController implements ITransactionController {
  constructor(private service: ITransactionService) {}

  public create = async (req: Request, res: Response): Promise<void> => {
    await this.service.create((req.user as IUserWithoutPassword), req.body);

    res.status(StatusCodes.CREATED).end();
  };
}
