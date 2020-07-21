import HapiProvider from '../providers/HapiProvider';
import KnexProvider from '../providers/KnexProvider';
import {
  banner
} from './banner';
import logger from '../utils/Winston';

export default class ServerLoader {
  static async boot() {
    try {
      const [_, server] = await Promise.all([
        new KnexProvider().checkConnection(),
        new HapiProvider().register()
      ]);

      // Config logging
      server.events.on('response', function (request) {

        const response = request.response
        const info = {
          ip: request.info.remoteAddress,
          machine: request.info.id,
          method: request.method.toUpperCase(),
          route: request.path,
          uri: request.info.uri,
          statusCode: request.response.statusCode
        }
        if (process.env.NODE_ENV !== 'development') {
          if (response['_error']) {
            if (response['_error'].isServer) {
              info['error'] = response['_error'].toString()
              logger.error(JSON.stringify(info));
            }
          } else {
            logger.verbose(JSON.stringify(info))
          }
        } else {
          if (response['_error']) {
            if (response['_error'].isServer) {
              info['error'] = response['_error'].toString()
              logger.error(JSON.stringify(info));
            }
          } 
        }

      });
      server.start();
      banner();
    } catch (error) {
      logger.error('Server is crashed !');
    }
  }
}