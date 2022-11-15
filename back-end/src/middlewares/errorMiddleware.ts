import {
  NextFunction, Request, Response,
} from 'express';
import { StatusCodes } from 'http-status-codes';
import { CustomError } from '../helpers/throwMyError';

function errorMiddleware(
  err: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  const { statusCode: code, message } = err;

  res
    .status((code) || StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ message });
}

export default errorMiddleware;
