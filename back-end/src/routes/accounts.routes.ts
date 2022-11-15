import { Router } from 'express';
import AccountController from '../controllers/Account.controller';
import AccountModel from '../database/models/Account.model';
import AccountService from '../services/Account.service';
import 'express-async-errors';
import authentication from '../middlewares/authentication';

const accountRouter = Router();

const accountModel = new AccountModel();
const accountService = new AccountService(accountModel);
const accountController = new AccountController(accountService);

accountRouter.get('/accounts/me', authentication, accountController.getById);

export default accountRouter;
