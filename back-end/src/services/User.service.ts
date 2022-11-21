import { StatusCodes } from 'http-status-codes';
import generateToken from '../helpers/generateToken';
import throwMyError from '../helpers/throwMyError';
import {
  IUser, IUserModel, IUserRelationWithAccount, IUserRequest, IUserService, IUserWithoutPassword,
} from '../interfaces/IUser.interface';
import UserValidation from '../validations/User.validation';
import sequelize from '../database';
import AccountModel from '../database/models/Account.model';
import generateHashPassword from '../helpers/generateHashPassword';
import { IAccountModel } from '../interfaces/IAccount.interface';

export default class UserService implements IUserService {
  constructor(
    private model: IUserModel,
    private accountModel: IAccountModel = new AccountModel(),
  ) {}

  public async login(userLogin: IUserRequest): Promise<string> {
    UserValidation.loginValidate(userLogin);

    const user = await this.model.login(userLogin);

    UserValidation.notFoundUserValidate(user);

    UserValidation.passwordValidate((userLogin).password, (user as IUser).password);

    const token = generateToken(user as IUser);

    return token;
  }

  public async create(newUser: IUserRequest): Promise<void> {
    UserValidation.createValidate(newUser);

    const user = await this.model.login(newUser);
    UserValidation.userAlreadyExistsValidate(user);

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
