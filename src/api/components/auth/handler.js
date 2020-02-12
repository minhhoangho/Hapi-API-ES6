import AuthController from './controller';
import AuthValidator from './validator';

class AuthHandler {
  constructor(server) {
    this.controller = new AuthController();
    this.validator = new AuthValidator();
    server.bind(this.controller);
  }

  login = () => {
    return {
      tags: ['api'],
      description: 'Login',
      notes: 'Return login user',
      handler: this.controller.login,
      auth: false,
      validate: {
        payload: this.validator.payloadLogin
      }
    };
  };
}

export default AuthHandler;
