import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IUserController, IUserService, IUserWithoutPassword } from '../interfaces/IUser.interface';

export default class UserController implements IUserController {
  constructor(private service: IUserService) {}

  public login = async (req: Request, res: Response): Promise<void> => {
    const token = await this.service.login(req.body);

    res.status(StatusCodes.OK).json({ token });
  };

  public create = async (req: Request, res: Response): Promise<void> => {
    await this.service.create(req.body);

    res.status(StatusCodes.CREATED).end();
  };

  public getByUsername = async (req: Request, res: Response): Promise<void> => {
    const getUser = await this.service.getByUsername(req.user as IUserWithoutPassword);

    res.status(StatusCodes.OK).json(getUser);
  };
}
