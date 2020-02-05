const config = {
  server: {
    host: '0.0.0.0',
    port: 3000,
    jwtSecret: 'base-api',
    jwtExpiration: '1h',
  },
  bcrypt: {
    saltRounds: 5,
  },
};

const developmentConfig = Object.assign(config, {
  database: {
    connectionString: 'postgres://postgres:123456@localhost:5432/base',
  },
});

const productionConfig = Object.assign(config, {});

const testingConfig = Object.assign(config, {
  server: {
    host: '0.0.0.0',
    port: 4000,
    jwtSecret: 'base-test',
    jwtExpiration: '1h',
  },
  database: {
    connectionString: 'postgres://postgres:123456@localhost:5432/base-test',
  },
});

export default {
  developmentConfig,
  testingConfig,
  productionConfig
};