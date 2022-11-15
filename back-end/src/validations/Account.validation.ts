import { StatusCodes } from 'http-status-codes';
import { z } from 'zod';
import throwMyError from '../helpers/throwMyError';

export default class AccountValidation {
  static accountIdValidate(id: number) {
    const accountIdSchema = z.object({
      id: z.number(),
    });

    const validation = accountIdSchema.safeParse({ id });

    if (!validation.success) {
      const { path } = validation.error.issues[0];
      const errorMessage = `Campo "${path}" é inválido`;

      throwMyError(StatusCodes.BAD_REQUEST, errorMessage);
    }
  }
}
