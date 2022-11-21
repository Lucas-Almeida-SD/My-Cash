import { StatusCodes } from 'http-status-codes';
import throwMyError from '../helpers/throwMyError';
import { IAccount, IAccountModel, IAccountService } from '../interfaces/IAccount.interface';

export default class AccountService implements IAccountService {
  constructor(private service: IAccountModel) {}

  public async getById(id: number): Promise<IAccount> {
    const account = await this.service.getById(id);

    if (!account) throwMyError(StatusCodes.NOT_FOUND, 'Conta não encontrada');

    return account as IAccount;
  }
}
