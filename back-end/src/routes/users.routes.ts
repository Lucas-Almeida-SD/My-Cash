import { Router } from 'express';
import UserController from '../controllers/User.controller';
import UserModel from '../database/models/User.model';
import UserService from '../services/User.service';
import 'express-async-errors';
import authentication from '../middlewares/authentication';

const usersRouter = Router();

const userModel = new UserModel();
const userService = new UserService(userModel);
const userController = new UserController(userService);

usersRouter.post('/users', userController.create);
usersRouter.post('/users/login', userController.login);
usersRouter.get('/users/me', authentication, userController.getByUsername);

export default usersRouter;
