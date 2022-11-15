import { Transaction } from 'sequelize';
import {
  IUserModel, IUser, IUserRequest, IUserCreate, IUserWithoutPassword,
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
    const createdUser = await this.entity.create({
      ...newUser,
    }, {
      transaction,
    });

    return createdUser;
  }

  public async getByUsername(username: string): Promise<IUserWithoutPassword | null> {
    const user = await this.entity.findOne({
      where: { username },
      attributes: { exclude: ['password'] },
    });

    return user;
  }
}
