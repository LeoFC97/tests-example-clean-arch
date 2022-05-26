import { Response, NextFunction } from 'express';
import { injectable } from 'tsyringe';
import ResourceNotFoundError from '../../../errors/resource-not-found';
import ExpressMiddleware, { RequestExpress } from '../../../interfaces/http/express';

@injectable()
class PathNotFoundMiddleware implements ExpressMiddleware {
  execute(req: RequestExpress, res: Response, next: NextFunction): void {
    next(new ResourceNotFoundError(req.__('error.message.PathNotFound')));
  }
}

export default PathNotFoundMiddleware;
