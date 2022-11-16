import { Transaction } from 'sequelize';
import {
  IUserModel, IUser, IUserRequest, IUserCreate, IUserRelationWithAccount,
} from '../../interfaces/IUser.interface';
import Accounts from './entities/Accounts';
import Users from './entities/Users';

export default class UserModel implements IUserModel {
  constructor(
    private entity: typeof Users = Users,
    private accountEntity: typeof Accounts = Accounts,
  ) {}

  public async login(userLogin: IUserRequest): Promise<IUser | null> {
    const { username } = userLogin;

    const user = await this.entity.findOne({
      where: {
        username,
      },
    });

    return user;
  }

  public async create(newUser: IUserCreate, transaction: Transaction): Promise<void> {
    await this.entity.create({
      ...newUser,
    }, {
      transaction,
    });
  }

  public async getByUsername(username: string): Promise<IUserRelationWithAccount | null> {
    const user = await this.entity.findOne({
      where: { username },
      attributes: { exclude: ['password'] },
      include: { model: this.accountEntity, as: 'account' },
    });

    return user;
  }
}
