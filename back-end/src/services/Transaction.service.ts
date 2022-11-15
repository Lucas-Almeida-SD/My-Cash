import { StatusCodes } from 'http-status-codes';
import {
  ITransactionCreate, ITransactionCreateRequest, ITransactionModel, ITransactionService,
} from '../interfaces/ITransaction.interface';
import Sequelize from '../database';
import TransactionValidation from '../validations/Transaction.validation';
import { IUserModel, IUserRelationWithAccount, IUserWithoutPassword } from '../interfaces/IUser.interface';
import throwMyError from '../helpers/throwMyError';
import { IAccount, IAccountModel } from '../interfaces/IAccount.interface';
import UserValidation from '../validations/User.validation';
import UserModel from '../database/models/User.model';
import AccountModel from '../database/models/Account.model';

export default class TransactionService implements ITransactionService {
  constructor(
    private model: ITransactionModel,
    private userModel: IUserModel = new UserModel(),
    private accountModel: IAccountModel = new AccountModel(),
  ) {}

  public async create(
    cashOutUser: IUserWithoutPassword,
    newTransaction: ITransactionCreateRequest,
  ): Promise<void> {
    TransactionValidation.createValidate(newTransaction);

    const accountCashOutUser = (await this.accountModel.getById(cashOutUser.accountId)) as IAccount;
    let cashInUser = await this.userModel.getByUsername(newTransaction.cashInUsername);

    UserValidation.notFoundUserValidate(cashInUser);
    cashInUser = cashInUser as IUserRelationWithAccount;
    TransactionValidation.compareUsersValidate(cashOutUser, cashInUser);
    TransactionValidation.compareCashOutValueWithBalanceValidate(
      newTransaction.value,
      accountCashOutUser,
    );

    const createNewTransaction: ITransactionCreate = {
      value: newTransaction.value,
      debitedAccountId: cashOutUser.accountId,
      creditedAccountId: cashInUser.accountId,
    };

    const t = await Sequelize.transaction();
    try {
      const newBalanceCashOutUser = accountCashOutUser.balance - newTransaction.value;
      const newBalanceCahsInUser = cashInUser.account.balance + newTransaction.value;
      await this.model.create(createNewTransaction, t);
      await this.accountModel.update(cashOutUser.accountId, newBalanceCashOutUser, t);
      await this.accountModel.update(cashInUser.accountId, newBalanceCahsInUser, t);
      await t.commit();
    } catch (err) {
      await t.rollback();
      throwMyError(StatusCodes.INTERNAL_SERVER_ERROR, (err as Error).message);
    }
  }
}
