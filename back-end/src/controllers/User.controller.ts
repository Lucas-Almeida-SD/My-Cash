import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IUserController, IUserWithoutPassword } from '../interfaces/IUser.interface';
import UserService from '../services/User.service';

export default class UserController implements IUserController {
  constructor(private service: UserService) {}

  public login = async (req: Request, res: Response): Promise<void> => {
    const token = await this.service.login(req.body);

    res.status(StatusCodes.OK).json({ token });
  };

  public create = async (req: Request, res: Response): Promise<void> => {
    const createdUser = await this.service.create(req.body);

    res.status(StatusCodes.CREATED).json(createdUser);
  };

  public getByUsername = async (req: Request, res: Response): Promise<void> => {
    const getUser = await this.service.getByUsername(req.user as IUserWithoutPassword);

    res.status(StatusCodes.OK).json(getUser);
  };
}
