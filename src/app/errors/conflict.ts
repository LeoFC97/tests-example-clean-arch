import BaseError from './base';

export default class ConflictError extends BaseError {
  public name = 'ConflictError';
  public message: string;

  constructor(msg: string) {
    super();
    this.message = msg;
  }
}
