/* eslint-disable no-undef */
import knex from '../../src/database/connection';
import utils from '../utils';

describe('Testing admin and auth API', () => {
  let server;

  beforeAll(async () => {
    server = await utils.initServer();
    await knex.migrate.rollback();
    await knex.migrate.latest();
    await utils.loadFixture(['roles', 'administrators']);
  });

  afterAll(async () => {
    await knex.migrate.rollback();
  });

  describe('POST /api/v1/admins/login', () => {
    test('<200> should login superadmin by phone number and password success', async () => {
      const payload = {
        phoneNumber: '0123456787',
        password: 'testing',
      };
      const response = await server.inject(
        {
          method: 'POST',
          url: '/api/v1/admins/login',
          payload,
        },
      );

      expect(response.statusCode).toBe(200);
      const { token, phoneNumber, role } = response.result;
      expect(token).not.toBeUndefined();
      expect(phoneNumber).toBe('0123456787');
      expect(role.name).toBe('superadmin');
    });

    test('<200> should login admin by phone number and password success', async () => {
      const payload = {
        phoneNumber: '0123456786',
        password: 'testing',
      };
      const response = await server.inject(
        {
          method: 'POST',
          url: '/api/v1/admins/login',
          payload,
        },
      );

      expect(response.statusCode).toBe(200);
      const { token, phoneNumber, role } = response.result;
      expect(token).not.toBeUndefined();
      expect(phoneNumber).toBe('0123456786');
      expect(role.name).toBe('admin');
    });

    test('<400> should login admin by phone number and password fail', async () => {
      const payload = {
        phoneNumber: '0123456786',
        password: 'testingfail',
      };
      const response = await server.inject(
        {
          method: 'POST',
          url: '/api/v1/admins/login',
          payload,
        },
      );

      expect(response.statusCode).toBe(400);
      const { token, statusCode, message } = response.result;
      expect(token).toBeUndefined();
      expect(statusCode).toBe(400);
      expect(message).toBe('INVALID_PHONE_PASSWORD');
    });
  });
});
