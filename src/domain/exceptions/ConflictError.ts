import { StatusCodes } from 'http-status-codes';

export default class ConflictError extends Error {
  public status: number;

  constructor(public message: string) {
    super(message);

    this.status = StatusCodes.CONFLICT;
  }
}
