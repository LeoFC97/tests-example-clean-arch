import { Request, Response, NextFunction } from 'express';

export interface RequestExpress extends Request {
  user?:{
    name: string,
    email: string,
    uuid: string,
  }
}

interface ExpressMiddleware {
  execute(req: RequestExpress, res: Response, next: NextFunction): void
}

export default ExpressMiddleware;
