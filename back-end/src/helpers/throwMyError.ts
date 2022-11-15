export class CustomError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
  }
}

function throwMyError(statusCode: number, message: string): void {
  throw new CustomError(statusCode, message);
}

export default throwMyError;
