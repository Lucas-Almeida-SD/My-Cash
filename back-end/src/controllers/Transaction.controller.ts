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

  public getMyTransactions = async (req: Request, res: Response): Promise<void> => {
    const { accountId } = req.user as IUserWithoutPassword;

    const transactions = await this.service.getMyTransactions(accountId, req.body);

    res.status(StatusCodes.OK).json(transactions);
  };
}
