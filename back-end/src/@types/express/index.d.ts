interface User {
  id: number;
  username: string;
  accountId: number;
}

declare namespace Express {
  interface Request {
    user?: User;
  }
}
