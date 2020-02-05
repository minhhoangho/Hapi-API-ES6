import AuthController from './controller';
import AuthValidator from './validator';

class UserRoutes {
  register(server) {
    const controller = new AuthController();
    const validator = new AuthValidator();
    server.bind(controller);

    const routes = [
      {
        method: 'POST',
        path: '/api/v1/auth/login',
        options: {
          tags: ['api'],
          description: 'Login',
          notes: 'Return login user',
          handler: controller.login,
          auth: false,
          validate: {
            payload: validator.payloadLogin
          }
        }
      }
    ];

    server.route(routes);
  }
}

export default UserRoutes;
