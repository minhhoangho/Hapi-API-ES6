import * as Inert from '@hapi/inert';
import * as Vision from '@hapi/vision';
import * as HapiSwagger from 'hapi-swagger';
import logger from '../utils/Winston';

export default class SwaggerProvider {
  setting() {
    const swaggerOptions = {
      host: process.env.APP_HOST,
      basePath: '/api',
      pathPrefixSize: 3,
      info: {
        title: 'Base API Documentation',
        description: 'This is a Base API documentation',
        version: '1.0'
      },
      securityDefinitions: {
        Bearer: {
          type: 'apiKey',
          name: 'Authorization',
          in: 'header'
        }
      },
      security: [{ Bearer: [] }],
      swaggerUI: true,
      documentationPage: process.env.NODE_ENV !== 'production',
      documentationPath: '/docs'
    };
    this.plugins = [
      {
        plugin: Inert
      },
      {
        plugin: Vision
      },
      {
        plugin: HapiSwagger,
        options: swaggerOptions
      }
    ];
  }
  async register(server) {
    this.setting();
    try {
      server.register(this.plugins);
      logger.info('> Swagger OK');
    } catch (error) {
      logger.error('Error registering swagger plugin : ', error);
    }
  }
}
