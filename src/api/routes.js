import _flattenDeep from 'lodash/flattenDeep';
import UserRoutes from './modules/user/routes';
import AuthRoutes from './modules/auth/routes';

export const bind = server => {
  const routes = [new AuthRoutes(server), new UserRoutes(server)];
  return _flattenDeep(routes);
};
