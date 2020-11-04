import AuthController from './controller';
import AuthValidator from './validator';
import AuthMiddleware from './middleware';

class AuthHandler {
  constructor(server) {
    this.controller = new AuthController();
    this.validator = new AuthValidator();
    this.middleware = new AuthMiddleware();
    server.bind(this.controller);
  }

  login = () => {
    return {
      tags: ['api'],
      description: 'Login',
      notes: 'Return login user',
      handler: this.controller.login,
      ext: {
        // use for extra middleware
        onPreResponse: {
          method: (request, h) =>
            this.middleware.onPreResponse(request, {
              version: '1.0.1',
              // 'web-version': '1.2.1',
              'android-version': '1.2.1',
              'ios-version': '1.3.1'
            })
        }
      },
      auth: false,
      validate: {
        payload: this.validator.payloadLogin
      }
    };
  };
}

export default AuthHandler;
