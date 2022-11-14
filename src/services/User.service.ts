import UserModel from '../database/models/User.model';
import generateToken from '../helpers/generateToken';
import { IUserLoginRequest, IUserService } from '../interfaces/IUser.interface';

export default class UserService implements IUserService {
  constructor(private model: UserModel) {}

  public async login(userLogin: unknown): Promise<string> {
    const user = await this.model.login(userLogin as IUserLoginRequest);

    if (!user) throw new Error('Not found');

    const token = generateToken(user);

    return token;
  }
}
