import swaggerUi from 'swagger-ui-express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';
import { logError, logInfo } from '~/helpers/logManager.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function resolveRefs(obj, basePath) {
  if (typeof obj !== 'object' || obj === null) return obj;

  if (obj.$ref && typeof obj.$ref === 'string' && obj.$ref.startsWith('./')) {
    const refPath = join(basePath, obj.$ref);
    const fileContent = fs.readFileSync(refPath, 'utf8');
    const resolved = JSON.parse(fileContent);
    return resolveRefs(resolved, dirname(refPath));
  }

  const newObj = Array.isArray(obj) ? [] : {};
  for (const key in obj) {
    newObj[key] = resolveRefs(obj[key], basePath);
  }

  return newObj;
}

function setupSwagger(app) {
  try {
    const swaggerBasePath = join(__dirname, '..', '..', 'swagger');
    const swaggerFilePath = join(swaggerBasePath, 'api-docs.json');

    if (!fs.existsSync(swaggerFilePath)) {
      logError(`El archivo Swagger no existe en: ${swaggerFilePath}`);
      return;
    }

    const swaggerFile = fs.readFileSync(swaggerFilePath, 'utf8');
    const swaggerDocument = JSON.parse(swaggerFile);
    const resolvedSwaggerDocument = resolveRefs(
      swaggerDocument,
      swaggerBasePath
    );

    app.use(
      '/api-docs',
      swaggerUi.serve,
      swaggerUi.setup(resolvedSwaggerDocument)
    );
    logInfo('Swagger configurado exitosamente');
  } catch (error) {
    logError('Error al configurar Swagger:', error);
  }
}

export default setupSwagger;
