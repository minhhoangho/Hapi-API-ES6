import _get from 'lodash/get';
import Config from './config';

// Read Configurations
const configs = _get(Config, `${process.env.NODE_ENV || 'development'}Config`);

export function getDatabaseConfig() {
  return _get(configs, 'database');
}

export function getServerConfigs() {
  return _get(configs, 'server');
}

export function getBcryptConfigs() {
  return _get(configs, 'bcrypt');
}