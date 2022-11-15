import { Router } from 'express';
import TransactionController from '../controllers/Transaction.controller';
import TransactionModel from '../database/models/Transaction.model';
import TransactionService from '../services/Transaction.service';
import authentication from '../middlewares/authentication';
import 'express-async-errors';

const transactionsRouter = Router();

const transactionModel = new TransactionModel();
const transactionService = new TransactionService(transactionModel);
const transactionController = new TransactionController(transactionService);

transactionsRouter.post('/transactions', authentication, transactionController.create);

export default transactionsRouter;
