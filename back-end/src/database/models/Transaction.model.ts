import { Transaction, Op } from 'sequelize';
import {
  ITransaction, ITransactionCreate, ITransactionModel, ITransactionFilterOptions,
} from '../../interfaces/ITransaction.interface';
import Transactions from './entities/Transactions';

export default class TransactionModel implements ITransactionModel {
  constructor(private entity = Transactions) {}

  public async create(
    newTransaction: ITransactionCreate,
    transactionSequelize: Transaction,
  ): Promise<void> {
    await this.entity.create({ ...newTransaction }, { transaction: transactionSequelize });
  }

  public async getMyTransactions(
    accountId: number,
    filterOptions: ITransactionFilterOptions,
  ): Promise<[] | ITransaction[]> {
    const { createdAt, cashType } = filterOptions;
    const where = {} as any;

    if (createdAt) where.createdAt = createdAt;
    if (cashType) {
      where[(cashType === 'out') ? 'debitedAccountId' : 'creditedAccountId'] = accountId;
    } else {
      where[Op.or] = [
        { debitedAccountId: accountId },
        { creditedAccountId: accountId },
      ];
    }

    const transactions = await this.entity.findAll({
      where,
      order: [['createdAt', 'DESC']],
    });

    return transactions;
  }
}
