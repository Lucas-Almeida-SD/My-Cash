import express from 'express';
import cors from 'cors';
import routes from '../routes';

const api = express();
api.use(express.json());
api.use(cors());

api.use(routes.usersRouter);

export default api;
