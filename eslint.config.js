import js from '@eslint/js';
import importsPlugin from 'eslint-plugin-import';
import noProcessEnv from './eslint-rules/no-process-env.js';
import noResStatus500 from './eslint-rules/no-res-status-500.js';

export default [
  js.configs.recommended,
  {
    plugins: {
      custom: {
        rules: {
          'no-process-env': noProcessEnv,
          'no-res-status-500': noResStatus500,
        },
      },
      import: importsPlugin,
    },
    languageOptions: {
      globals: {
        console: true,
        process: true,
        describe: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        Buffer: 'readonly',
        __dirname: 'readonly',
      },
    },
    rules: {
      'custom/no-process-env': 'error',
      'import/no-unresolved': [
        'error',
        {
          ignore: ['~'],
        },
      ],
      'import/no-relative-parent-imports': 'error',
      'import/no-extraneous-dependencies': 'off',
      'no-unused-vars': 'warn',
      'no-undef': 'warn',
      'no-console': ['warn'],
      'custom/no-res-status-500': 'error',
    },
  },
  {
    files: ['src/main/configs/environment.js'],
    rules: {
      'custom/no-process-env': 'off',
    },
  },
  {
    files: ['src/test/**/*'],
    rules: {
      'import/no-relative-parent-imports': 'off',
    },
  },
  {
    files: ['src/main/helpers/logManager.js'],
    rules: {
      'no-console': 'off',
    },
  },
  {
    files: ['src/main/helpers/logManager.js'],
    rules: {
      'custom/no-res-status-500': 'off',
    },
  },
  {
    files: ['src/main/migrations/**/*.js'],
    rules: {
      'no-undef': 'off',
      'no-unused-vars': 'off',
    },
  },
];
