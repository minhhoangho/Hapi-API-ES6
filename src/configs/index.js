import _get from 'lodash/get';
import Config from './config';

// Read Configurations
const configs = _get(Config, `${process.env.NODE_ENV || 'development'}Config`);

const getServerConfigs = () => {
  return _get(configs, 'server');
};

const getBcryptConfigs = () => {
  return _get(configs, 'bcrypt');
};

export default {
  getServerConfigs,
  getBcryptConfigs
};
