/* eslint-disable no-await-in-loop */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
/* eslint-disable no-restricted-syntax */
import Jwt from 'jsonwebtoken';
import _ from 'lodash';
import knex from '../src/database/connection';
import Configs from '../src/configs/index';
import Server from '../src/bootstrap/index';

async function initServer() {
  const server = await Server.boot();
  return server;
}

async function loadFixture(fixtures) {
  for (const fixture of fixtures) {
    const batch = require(`./fixtures/${fixture}.js`);
    await knex(fixture).insert(batch.default);
  }
}

function withAuthAdmin(options) {
  const admin = {
    phoneNumber: '0123456786',
    id: 2,
    scope: 'admin',
  };
  const authToken = Jwt.sign(admin, Configs.getServerConfigs().jwtSecret);
  return _.assign(options, {
    headers: { Authorization: `Bearer ${authToken}` },
  });
}

export default { loadFixture, withAuthAdmin, initServer };
