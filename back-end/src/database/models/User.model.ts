import { Transaction } from 'sequelize';
import {
  IUserModel, IUser, IUserRequest, IUserCreate,
} from '../../interfaces/IUser.interface';
import Users from './entities/Users';

export default class UserModel implements IUserModel {
  constructor(private entity = Users) {}

  public async login(userLogin: IUserRequest): Promise<IUser | null> {
    const { username } = userLogin;

    const user = await this.entity.findOne({
      where: {
        username,
      },
    });

    return user;
  }

  public async create(newUser: IUserCreate, transaction: Transaction): Promise<IUser> {
    const user = await this.entity.create({
      ...newUser,
    }, {
      transaction,
    });

    return user;
  }
}
