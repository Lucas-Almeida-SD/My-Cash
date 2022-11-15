import { Transaction } from 'sequelize';
import { IAccount, IAccountModel } from '../../interfaces/IAccount.interface';
import Accounts from './entities/Accounts';

export default class AccountModel implements IAccountModel {
  constructor(private entity = Accounts) {}

  public async create(transaction: Transaction): Promise<IAccount> {
    const account = await this.entity.create({}, { transaction });

    return account;
  }
}
