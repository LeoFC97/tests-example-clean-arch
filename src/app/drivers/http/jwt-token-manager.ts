import { injectable } from 'tsyringe';
import jwt_decode from 'jwt-decode';
import TokenManager from '../../interfaces/http/token-manager';

@injectable()
class JwtTokenManager implements TokenManager {
  decode(token: string): unknown {
    return jwt_decode(token);
  }
}

export default JwtTokenManager;
