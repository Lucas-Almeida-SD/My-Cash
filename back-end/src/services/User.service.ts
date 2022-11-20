import { StatusCodes } from 'http-status-codes';
import UserModel from '../database/models/User.model';
import generateToken from '../helpers/generateToken';
import throwMyError from '../helpers/throwMyError';
import {
  IUser, IUserRelationWithAccount, IUserRequest, IUserService, IUserWithoutPassword,
} from '../interfaces/IUser.interface';
import UserValidation from '../validations/User.validation';
import sequelize from '../database';
import AccountModel from '../database/models/Account.model';
import generateHashPassword from '../helpers/generateHashPassword';

export default class UserService implements IUserService {
  constructor(
    private model: UserModel,
    private accountModel: AccountModel = new AccountModel(),
  ) {}

  public async login(userLogin: IUserRequest): Promise<string> {
    UserValidation.loginValidate(userLogin);

    const user = await this.model.login(userLogin);

    UserValidation.notFoundUserValidate(user)

    UserValidation.passwordValidate((userLogin).password, (user as IUser).password);

    const token = generateToken(user as IUser);

    return token;
  }

  public async create(newUser: IUserRequest): Promise<void> {
    UserValidation.createValidate(newUser);

    const user = await this.model.login(newUser);
    if (user) throwMyError(StatusCodes.CONFLICT, 'Usuário já existe');

    const t = await sequelize.transaction();

    try {
      const account = await this.accountModel.create(t);
      const createNewUser = { ...newUser, accountId: account.id };
      const hashPassword = generateHashPassword(createNewUser.password);
      await this.model.create({ ...createNewUser, password: hashPassword }, t);
      await t.commit();
    } catch (err) {
      await t.rollback();
      throwMyError(StatusCodes.INTERNAL_SERVER_ERROR, (err as Error).message);
    }
  }

  public async getByUsername(user: IUserWithoutPassword): Promise<IUserRelationWithAccount> {
    const getUser = await this.model.getByUsername(user.username);

    UserValidation.notFoundUserValidate(getUser);

    return getUser as IUserRelationWithAccount;
  }
}
