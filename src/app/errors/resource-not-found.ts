import BaseError from './base';

export default class ResourceNotFoundError extends BaseError {
  public name = 'ResourceNotFoundError';
  public message: string;

  constructor(msg: string) {
    super();
    this.message = msg;
  }
}
