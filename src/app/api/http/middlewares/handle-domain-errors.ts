import { Request, Response, NextFunction } from 'express';
import InternalServerHttpError from '../errors/internal';
import ValidationError from '../../../errors/validation';
import BadRequestHttpError from '../errors/bad-request';
import ResourceNotFoundError from '../../../errors/resource-not-found';
import NotFoundHttpError from '../errors/not-found';
import EntityNotFoundError from '../../../errors/entity-not-found';
import ConflictError from '../../../errors/conflict';

export default (error: Error, req: Request, _res: Response, next: NextFunction): void => {
  if (error instanceof ValidationError) _res.status(400).json(error);

  if (error instanceof ResourceNotFoundError) return next(new NotFoundHttpError(error, req));

  if (error instanceof EntityNotFoundError) return next(new NotFoundHttpError(error, req));

  if (error instanceof ConflictError) _res.status(409).json(error);

  console.error(error);
  return next(new InternalServerHttpError(error, req));
};
