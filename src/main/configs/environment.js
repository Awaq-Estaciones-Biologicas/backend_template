import dotenv from 'dotenv';
import { logWarn } from '~/helpers/logManager.js';

dotenv.config();

const requiredEnvVars = [
  'NODE_ENV',
  'JWT_SECRET',
  'PORT',
  'FRONTEND_PORT',
  'CORS_ORIGIN_PROD',
  'DB_HOST_DEV',
  'DB_USER_DEV',
  'DB_PASSWORD_DEV',
  'DB_NAME_DEV',
  'DB_PORT_DEV',
  'DB_HOST_PROD',
  'DB_USER_PROD',
  'DB_PASSWORD_PROD',
  'DB_NAME_PROD',
  'DB_PORT_PROD',
  'DB_DIALECT',
  'EMAIL',
  'EMAIL_PASSWORD',
  'R2_BUCKET_NAME',
  'R2_REGION',
  'R2_ENDPOINT',
  'R2_CUSTOM_URL',
  'R2_ACCESS_KEY',
  'R2_SECRET_KEY',
  'PAYPAL_APP_NAME_PROD',
  'PAYPAL_CLIENT_SECRET_PROD',
  'PAYPAL_CLIENT_SECRET_DEV',
  'PAYPAL_APP_NAME_DEV',
  'PAYPAL_CLIENT_ID_PROD',
  'PAYPAL_CLIENT_ID_DEV',
];

function validateEnvVars(envVars) {
  const missingVars = envVars.filter((envVar) => !process.env[envVar]);

  if (missingVars.length > 0 && process.env.NODE_ENV !== 'test') {
    missingVars.forEach((missingVar) => {
      logWarn(`Missing environment variable: ${missingVar}`);
    });
    process.exit(1);
  }
}

validateEnvVars(requiredEnvVars);

export const environment = requiredEnvVars.reduce((envObj, envVar) => {
  const value = process.env[envVar];

  if (value) {
    envObj[envVar] = value;
  } else {
    logWarn(
      `Environment variable ${envVar} is not set. Defaulting to undefined.`
    );
  }

  return envObj;
}, {});
