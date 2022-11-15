import { IUserModel, IUser, IUserLoginRequest } from '../../interfaces/IUser.interface';
import Users from './entities/Users';

export default class UserModel implements IUserModel {
  constructor(private entity = Users) {}

  public async login(userLogin: IUserLoginRequest): Promise<IUser | null> {
    const { username } = userLogin;

    const user = await this.entity.findOne({
      where: {
        username,
      },
    });

    return user;
  }
}
