import jwt, { SignOptions } from 'jsonwebtoken';
import { IUser } from '../interfaces/IUser.interface';
import 'dotenv/config';

function generateToken(user: IUser): string {
  const { id, username, accountId } = user;

  const payload = { id, username, accountId };

  const JWT_SECRET = process.env.JWT_SECRET as string;

  const jwtOptions: SignOptions = {
    algorithm: 'HS256',
    expiresIn: '1d',
  };

  const token = jwt.sign(payload, JWT_SECRET, jwtOptions);

  return token;
}

export default generateToken;
