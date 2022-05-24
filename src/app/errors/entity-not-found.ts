import BaseError from './base';

export default class EntityNotFoundError extends BaseError {
  public name = 'EntityNotFound';
  public message: string;

  constructor(message: string) {
    super();
    this.message = message;
  }
}
