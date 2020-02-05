import * as JWT from 'jsonwebtoken';
import _assign from 'lodash/assign';
import * as Configs from '../configs/index';

class Jwt {
  secret;

  expiresIn;

  constructor() {
    this.secret =
      process.env.JWT_SECRET || Configs.getServerConfigs().jwtSecret;
    this.expiresIn = '7d';
  }

  issue(payload, jwtOptions = {}) {
    return JWT.sign(
      _assign(payload, {
        expiresIn: this.expiresIn
      }),
      this.secret
    );
  }

  verify(token) {
    return JWT.verify(token, this.secret);
  }
}

export default new Jwt();
