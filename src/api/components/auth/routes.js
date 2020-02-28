import AuthHandler from './handler';

export default class AuthRoutes {
  bind = handler => {
    const routes = [
      {
        method: 'POST',
        path: '/api/v1/auth/login',
        options: handler.login
      }
    ];
    return routes;
  };

  register(server) {
    const handler = new AuthHandler(server);
    const routes = this.bind(handler);
    server.route(routes);
  }
}
