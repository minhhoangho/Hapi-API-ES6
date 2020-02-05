import * as Hapi from '@hapi/hapi';
import * as Configs from '../configs';
import { bind } from '../api/routes';
import logger from '../utils/Winston';

// import SwaggerLoader from './SwaggerLoader';
export default class HapiProvider {
  constructor() {
    this.port = process.env.APP_PORT || Configs.getServerConfigs().port;
    this.host = process.env.APP_HOST || Configs.getServerConfigs().host;
  }

  /**
   * Setting initial feature and plugins
   */
  setting(server) {
    const routes = bind(server);
    Promise.all(routes);
  }
  async register() {
    try {
      const server = new Hapi.Server({
        host: this.host,
        port: this.port,
        routes: {
          cors: {
            origin: ['*']
          }
        }
      });
      await this.setting(server);
      logger.info('> Hapi OK');
      return server;
    } catch (error) {
      logger.error('Hapi provider error: ', error);
    }
  }
}
