import _flattenDeep from 'lodash/flattenDeep';
import UserRoutes from './modules/user/routes';
import AuthRoutes from './modules/auth/routes';

export const bind = server => {
  const routes = [new AuthRoutes().register(server), new UserRoutes().register(server)];
  return _flattenDeep(routes);
};
