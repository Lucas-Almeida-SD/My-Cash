import express from 'express';
import cors from 'cors';
import routes from '../routes';
import errorMiddleware from '../middlewares/errorMiddleware';

const api = express();
api.use(express.json());
api.use(cors());

api.use(routes.usersRouter);

api.use(errorMiddleware);

export default api;
