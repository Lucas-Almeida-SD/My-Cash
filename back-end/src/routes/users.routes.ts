import { Router } from 'express';
import UserController from '../controllers/User.controller';
import UserModel from '../database/models/User.model';
import UserService from '../services/User.service';

const usersRouter = Router();

const userModel = new UserModel();
const userService = new UserService(userModel);
const userController = new UserController(userService);

usersRouter.post('/users/login', userController.login);

export default usersRouter;
