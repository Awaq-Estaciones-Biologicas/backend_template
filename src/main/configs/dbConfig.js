import { Sequelize, Op } from 'sequelize';
import { environment } from '~/configs/environment.js';
import { logError, logInfo } from '~/helpers/logManager.js';

const development = {
  username: environment.DB_USER_DEV,
  password: environment.DB_PASSWORD_DEV,
  database: environment.DB_NAME_DEV,
  host: environment.DB_HOST_DEV,
  port: environment.DB_PORT_DEV || 5432,
  dialect: environment.DB_DIALECT || 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  logging: logInfo,
};

const production = {
  username: environment.DB_USER_PROD,
  password: environment.DB_PASSWORD_PROD,
  database: environment.DB_NAME_PROD,
  host: environment.DB_HOST_PROD,
  port: environment.DB_PORT_PROD || 5432,
  dialect: environment.DB_DIALECT || 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  logging: false,
};

const currentEnvironment = environment.NODE_ENV || 'development';
const config = currentEnvironment === 'production' ? production : development;

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

if (currentEnvironment === 'development') {
  sequelize
    .sync({ force: false })
    .then(() => {
      logInfo('Database synchronized');
    })
    .catch((error) => {
      logError('Failed to synchronize database', error);
    });
}

export { sequelize, Op };
export default { development, production };
