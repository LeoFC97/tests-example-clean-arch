import { Response, NextFunction } from 'express';
import Middleware, { RequestExpress } from '../../interfaces/http/express';

class ExpressMiddlewareAdapter {
  static adapt(middleware: Middleware) {
    return async (req: RequestExpress, res: Response, next: NextFunction): Promise<void> => {
      try {
        middleware.execute(req, res, next);
      } catch (err) {
        next(err);
      }
    };
  }
}

export const { adapt } = ExpressMiddlewareAdapter;
export default ExpressMiddlewareAdapter;
