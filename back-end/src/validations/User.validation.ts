import { StatusCodes } from 'http-status-codes';
import { z } from 'zod';
import bcrypt from 'bcrypt';
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

  static passwordValidate(password: string, hashPassword: string) {
    const validation = bcrypt.compareSync(password, hashPassword);

    if (!validation) throwMyError(StatusCodes.UNAUTHORIZED, 'Senha incorreta');
  }

  static createValidate(newUser: unknown) {
    const newUserSchema = z.object({
      username: z.string().min(3),
      password: z.string().min(8).regex(/(?=.*\d)(?=.*[A-Z])/),
    });

    const validation = newUserSchema.safeParse(newUser);

    if (!validation.success) {
      const { path } = validation.error.issues[0];
      const errorMessage = `Campo "${path}" é inválido`;

      throwMyError(StatusCodes.BAD_REQUEST, errorMessage);
    }
  }

  static notFoundUserValidate(user: object | null) {
    if (!user) throwMyError(StatusCodes.NOT_FOUND, 'Usuário não encontrado');
  }

  static userAlreadyExistsValidate(user: object | null) {
    if (user) throwMyError(StatusCodes.CONFLICT, 'Usuário já existe');
  }
}
