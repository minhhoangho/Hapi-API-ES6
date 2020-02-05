import UserController from './controller';
import UserValidator from './validator';

class UserRoutes {
  register(server) {
    const controller = new UserController();
    const validator = new UserValidator();
    server.bind(controller);

    const routes = [
      {
        method: 'GET',
        path: '/api/v1/users',
        options: {
          tags: ['api', 'v1'],
          description: 'Get all user',
          notes: 'Return all users',
          handler: controller.getMany,
          auth: false,
          validate: {
            query: validator.queryParams
          }
        }
      }
    ];

    server.route(routes);
  }
}

export default UserRoutes;
