import { StatusCodes } from 'http-status-codes';
import { z } from 'zod';
import throwMyError from '../helpers/throwMyError';

export default class UserValidation {
  static loginValidate(userLogin: unknown) {
    const loginSchema = z.object({
      username: z.string(),
      password: z.string(),
    });

    const validation = loginSchema.safeParse(userLogin);

    if (!validation.success) {
      const { path } = validation.error.issues[0];
      const errorMessage = `Campo "${path}" é inválido`;

      throwMyError(StatusCodes.BAD_REQUEST, errorMessage);
    }
  }
}
