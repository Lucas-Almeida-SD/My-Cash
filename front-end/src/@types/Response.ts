import { ErrorMessage } from './ErrorMessage';
import { User, UserToken } from './User';

export type ResponseLogin = UserToken | ErrorMessage;

export type ResponseGetUser = User | ErrorMessage;

export type ResponseCreate = Record<string, never> | ErrorMessage;
