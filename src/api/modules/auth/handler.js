import AuthController from './controller';
import AuthValidator from './validator';
import AuthMiddleware from './middleware';

class AuthHandler {
  constructor(server) {
    this.controller = new AuthController();
    this.validator = new AuthValidator();
    this.middleware = new AuthMiddleware()
    server.bind(this.controller);
  }

  login = () => {
    return {
      tags: ['api'],
      description: 'Login',
      notes: 'Return login user',
      handler: async (req, h) => {
        const response =  h.response(await this.controller.login(req))
        response.headers = {"version": "1.0.1"}
        // or response.header('version', '1.0.1')
        return response
      },
      auth: false,
      validate: {
        payload: this.validator.payloadLogin
      }
    };
  };
}

export default AuthHandler;
