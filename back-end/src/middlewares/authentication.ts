import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import throwMyError from '../helpers/throwMyError';
import { IUser } from '../interfaces/IUser.interface';
import 'dotenv/config';

function authentication(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization;

  if (!token) throwMyError(StatusCodes.UNAUTHORIZED, 'Token não encontrado');

  const JWT_SECRET = process.env.JWT_SECRET as string;

  try {
    const decode = jwt.verify(token as string, JWT_SECRET);

    req.user = decode as IUser;

    next();
  } catch (err) {
    throwMyError(StatusCodes.UNAUTHORIZED, 'Token inválido ou expirado');
  }
}

export default authentication;
