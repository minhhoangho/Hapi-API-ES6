import HapiProvider from '../providers/HapiProvider';
import SwaggerProvider from '../providers/SwaggerProvider';
import AuthProvider from '../providers/AuthProvider';
import KnexProvider from '../providers/KnexProvider';
import { banner } from './banner';
import logger from '../utils/Winston';

export default class ServerLoader {
  static async boot() {
    try {
      const [_, server] = await Promise.all([
        new KnexProvider().checkConnection(),
        new HapiProvider().register()
      ]);
      Promise.all([
        new SwaggerProvider().register(server),
        new AuthProvider().register(server)
      ]).then(() => {
        server.start();
        banner();
      });
    } catch (error) {
      logger.error('Server is crashed !');
    }
  }
}
