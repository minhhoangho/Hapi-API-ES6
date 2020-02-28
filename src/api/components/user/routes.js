import UserHandler from './handler';

export default class UserRoutes {
  bind(handler) {
    const routes = [
      {
        method: 'GET',
        path: '/api/v1/users',
        options: handler.getMany
      },
      {
        method: 'GET',
        path: '/api/v1/users/me',
        options: handler.getMe
      }
    ];
    return routes;
  }

  register(server) {
    const handler = new UserHandler(server);
    const routes = this.bind(handler);

    server.route(routes);
  }
}
