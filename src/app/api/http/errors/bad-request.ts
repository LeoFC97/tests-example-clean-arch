import { Request } from 'express';
import BaseError from '../../../errors/base';
import BaseHttpError from './base';

export default class BadRequestHttpError extends BaseHttpError {
  public status = 400;
  public code = 'BadRequest';
  public message: string;
  public name: string;

  constructor(error: BaseError, req: Request) {
    super();
    this.message = error.message;
    this.name = req.__(`error.${this.code}`);
  }
}
