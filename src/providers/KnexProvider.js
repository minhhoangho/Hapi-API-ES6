import _get from 'lodash/get';
import { exec } from 'child_process';
import knex from 'knex';
import { logger } from '../utils/Logging';
import KnexConfig from '../../knexfile';

export default class KnexLoader {
  async migration() {
    await new Promise((resolve, reject) => {
      logger.info('Migrating database...');
      exec(
        'yarn migrate:latest',
        {
          env: process.env
        },
        err => {
          if (err) {
            return reject();
          }
          logger.verbose('Database migration succeeded');
          return resolve();
        }
      );
    });
  }

  async rollback() {
    await new Promise((resolve, reject) => {
      logger.verbose('Rollbacking database...');
      exec(
        'yarn migrate:rollback',
        {
          env: process.env
        },
        err => {
          if (err) {
            return reject();
          }
          logger.verbose('Database rollbacked');
          return resolve();
        }
      );
    });
  }

  async seed() {
    await new Promise((resolve, reject) => {
      logger.verbose('Seeding data for database...');
      exec(
        'yarn seed:run',
        {
          env: process.env
        },
        err => {
          if (err) {
            return reject();
          }
          logger.verbose('Database seeded');
          return resolve();
        }
      );
    });
  }

  async boot() {
    await this.rollback();
    await this.migration();
    await this.seed();
  }

  async checkConnection() {
    const config = _get(KnexConfig, `${process.env.NODE_ENV || 'development'}`);
    const instance = knex(config);
    /**
     * Just checking database connection
     */
    instance
      .raw('select 1+1 as result')
      .then(() => {
        logger.info('> Database connection OK');
      })
      .catch(err => {
        logger.error(
          'Database connection failed, check your database and try again',
          'closing server ...'
        );
        process.exit(1);
      });
  }
}
