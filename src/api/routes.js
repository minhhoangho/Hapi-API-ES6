import * as Hapi from '@hapi/hapi';
import _flattenDeep from 'lodash/flattenDeep';
import UserRoutes from './components/user/routes';
import AuthRoutes from './components/auth/routes';

export const bind = server => {
  const routes = [
    new UserRoutes().register(server),
    new AuthRoutes().register(server)
  ];

  return _flattenDeep(routes);
};
