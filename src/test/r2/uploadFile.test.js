import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';
import { uploadFileToR2 } from '../../main/helpers/r2Client.js';
import { environment } from '../../main/configs/environment.js';
import expect from 'expect';
import fetch from 'node-fetch';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const enable = false;

describe('uploadFileToR2', () => {
  it('should upload a file to R2 and return a valid URL', async () => {
    // Crear un archivo de prueba
    const testFileName = 'test-upload.txt';
    const testFilePath = path.resolve(__dirname, testFileName);

    const fileContent = 'This is a test file for Cloudflare R2 upload!';
    fs.writeFileSync(testFilePath, fileContent);

    // Subir el archivo a R2
    if (enable) {
      const mimeType = 'text/plain';
      const fileBuffer = fs.readFileSync(testFilePath);
      const uploadedFileUrl = await uploadFileToR2(
        testFileName,
        fileBuffer,
        mimeType
      );

      expect(uploadedFileUrl).toContain(environment.R2_CUSTOM_URL);
      const response = await fetch(uploadedFileUrl);
      expect(response.ok).toBe(true);
    }

    fs.unlinkSync(testFilePath);
  });
});
