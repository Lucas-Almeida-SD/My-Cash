import { Transaction } from 'sequelize';
import { ITransactionCreate, ITransactionModel } from '../../interfaces/ITransaction.interface';
import Transactions from './entities/Transactions';

export default class TransactionModel implements ITransactionModel {
  constructor(private entity = Transactions) {}

  public async create(
    newTransaction: ITransactionCreate,
    transactionSequelize: Transaction,
  ): Promise<void> {
    await this.entity.create({ ...newTransaction }, { transaction: transactionSequelize });
  }
}
