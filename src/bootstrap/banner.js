import { logger } from '../utils/Logging';
export function banner() {
  try {
    const route = () =>
      `http://${process.env.APP_HOST || 'localhost'}:${process.env.APP_PORT}`;
    logger.info(``);
    logger.info(
      `Your API is ready on ${route()}${process.env.APP_ROUTE_PREFIX}`
    );
    logger.info(`To shut it down, press <CTRL> + C at any time.`);
    logger.info(``);
    logger.info('-------------------------------------------------------');
    logger.info(`Environment  : ${process.env.NODE_ENV || 'development'}`);
    logger.info(`Version      : ${process.env.VERSION}`);
    logger.info(``);
    logger.info(`API Info     : ${route()}${process.env.APP_ROUTE_PREFIX}`);
    logger.info(`Swagger      : ${route()}${process.env.SWAGGER_ROUTE}`);
    logger.info('-------------------------------------------------------');
    logger.info('');
  } catch (error) {
    throw error;
  }
}
