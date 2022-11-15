import { StatusCodes } from 'http-status-codes';
import UserModel from '../database/models/User.model';
import generateToken from '../helpers/generateToken';
import throwMyError from '../helpers/throwMyError';
import {
  IUser, IUserRequest, IUserService,
} from '../interfaces/IUser.interface';
import UserValidation from '../validations/User.validation';
import sequelize from '../database';
import AccountModel from '../database/models/Account.model';

export default class UserService implements IUserService {
  constructor(
    private model: UserModel,
    private accountModel: AccountModel = new AccountModel(),
  ) {}

  public async login(userLogin: unknown): Promise<string> {
    UserValidation.loginValidate(userLogin);

    const user = await this.model.login(userLogin as IUserRequest);

    if (!user) throwMyError(StatusCodes.NOT_FOUND, 'Usuário não encontrado');

    const token = generateToken(user as IUser);

    return token;
  }

  public async create(newUser: unknown): Promise<IUser> {
    UserValidation.createValidate(newUser);

    let user = await this.model.login(newUser as IUserRequest);
    if (user) throwMyError(StatusCodes.CONFLICT, 'Usuário já existe');

    const t = await sequelize.transaction();

    try {
      const account = await this.accountModel.create(t);
      const createNewUser = { ...newUser as IUserRequest, accountId: account.id };
      user = await this.model.create(createNewUser, t);
      await t.commit();
    } catch (err) {
      await t.rollback();
      throwMyError(StatusCodes.INTERNAL_SERVER_ERROR, (err as Error).message);
    }

    return user as IUser;
  }
}
