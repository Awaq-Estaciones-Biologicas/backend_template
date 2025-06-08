import { v4 as uuidv4 } from 'uuid';
import { environment } from '~/configs/environment.js';

const getTimestamp = () => new Date().toISOString();

export const logError = (error, errorId = null) => {
  const timestamp = getTimestamp();
  const idInfo = errorId ? `[ID: ${errorId}]` : '';
  const errorMessage =
    typeof error === 'object' && error?.message ? error.message : String(error);
  const stackTrace = error.stack ? `\nStack trace: ${error.stack}` : '';
  console.error(
    `[${timestamp}] [ERROR] ${idInfo}: ${errorMessage}${stackTrace}`
  );
};

export const logInfo = (message) => {
  const timestamp = getTimestamp();
  console.info(`\x1b[32m[${timestamp}] [INFO]: ${message}\x1b[0m`);
};

export const logWarn = (message) => {
  const timestamp = getTimestamp();
  console.warn(`[${timestamp}] [WARN]: ${message}`);
};

export const logDebug = (message) => {
  if (environment.NODE_ENV !== 'production') {
    const timestamp = getTimestamp();
    console.debug(`[${timestamp}] [DEBUG]: ${message}`);
  }
};

export const logErrorWithResponse = (error, res = null) => {
  const isProduction = environment.NODE_ENV === 'production';
  const errorId = isProduction ? uuidv4() : null;
  logError(error, errorId);

  const errorMessage = isProduction
    ? `An error occurred. Reference ID: ${errorId}`
    : error.message || 'Unknown error';

  if (res) {
    return res.status(500).json({ message: errorMessage, id: errorId });
  }
};
