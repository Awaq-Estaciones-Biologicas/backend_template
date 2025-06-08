export default {
  '**/*.js': ['eslint --fix', 'prettier --write'],
  '**/*.json': ['prettier --write'],
  '**/*.ts': ['eslint --fix', 'prettier --write'],
};
