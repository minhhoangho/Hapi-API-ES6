import _flattenDeep from 'lodash/flattenDeep';
import UserRoutes from './components/user/routes';
import AuthRoutes from './components/auth/routes';

export const bind = server => {
  const routes = [new AuthRoutes().register(server), new UserRoutes().register(server)];

  return _flattenDeep(routes);
};
