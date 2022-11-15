import { StatusCodes } from 'http-status-codes';
import AccountModel from '../database/models/Account.model';
import throwMyError from '../helpers/throwMyError';
import { IAccount, IAccountService } from '../interfaces/IAccount.interface';
import AccountValidation from '../validations/Account.validation';

export default class AccountService implements IAccountService {
  constructor(private service: AccountModel) {}

  public async getById(id: number): Promise<IAccount> {
    AccountValidation.accountIdValidate(id);

    const account = await this.service.getById(id);

    if (!account) throwMyError(StatusCodes.NOT_FOUND, 'Conta não encontrada');

    return account as IAccount;
  }
}
