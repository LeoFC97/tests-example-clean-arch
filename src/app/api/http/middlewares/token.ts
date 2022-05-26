import { Response, NextFunction } from 'express';
import { inject, injectable } from 'tsyringe';
import ExpressMiddleware, { RequestExpress } from '../../../interfaces/http/express';
import TokenManager from '../../../interfaces/http/token-manager';

@injectable()
class DecodeTokenMiddleware implements ExpressMiddleware {
  constructor(
    @inject('TokenManager') public jwtTokenManager: TokenManager,
  ) {}
  execute(req: RequestExpress, res: Response, next: NextFunction): void {
    if (req.headers?.authorization) {
      const decodedToken = this.jwtTokenManager.decode(req.headers.authorization);
      req.user = {
        email: decodedToken.email,
        name: decodedToken.username,
        uuid: decodedToken.uuid,
      };
    }
    next();
  }
}
export default DecodeTokenMiddleware;
