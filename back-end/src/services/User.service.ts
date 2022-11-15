import { StatusCodes } from 'http-status-codes';
import UserModel from '../database/models/User.model';
import generateToken from '../helpers/generateToken';
import throwMyError from '../helpers/throwMyError';
import { IUser, IUserLoginRequest, IUserService } from '../interfaces/IUser.interface';
import UserValidation from '../validations/User.validation';

export default class UserService implements IUserService {
  constructor(private model: UserModel) {}

  public async login(userLogin: unknown): Promise<string> {
    UserValidation.loginValidate(userLogin);

    const user = await this.model.login(userLogin as IUserLoginRequest);

    if (!user) throwMyError(StatusCodes.NOT_FOUND, 'Usuário não encontrado');

    const token = generateToken(user as IUser);

    return token;
  }
}
