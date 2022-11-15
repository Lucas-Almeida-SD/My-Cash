import { StatusCodes } from 'http-status-codes';
import { z } from 'zod';
import { ITransactionCreateRequest } from '../interfaces/ITransaction.interface';
import throwMyError from '../helpers/throwMyError';
import { IUserWithoutPassword } from '../interfaces/IUser.interface';
import { IAccount } from '../interfaces/IAccount.interface';

export default class TransactionValidation {
  static createValidate(newTransaction: ITransactionCreateRequest) {
    const newTransactionSchema = z.object({
      value: z.number().gt(0),
      cashInUsername: z.string(),
    });

    const validation = newTransactionSchema.safeParse(newTransaction);

    if (!validation.success) {
      const { path } = validation.error.issues[0];
      const errorMessage = `Campo "${path}" é inválido`;

      throwMyError(StatusCodes.BAD_REQUEST, errorMessage);
    }
  }

  static compareUsersValidate(
    cashOutUser: IUserWithoutPassword,
    cashInUser: IUserWithoutPassword,
  ) {
    if (cashOutUser.id === cashInUser.id) {
      throwMyError(StatusCodes.FORBIDDEN, 'Transação não permitida');
    }
  }

  static compareCashOutValueWithBalanceValidate(
    value: number,
    accountCashOutUser: IAccount,
  ) {
    if (accountCashOutUser.balance < value) {
      throwMyError(StatusCodes.FORBIDDEN, 'Transação não realizada. Valor não permitido');
    }
  }
}
