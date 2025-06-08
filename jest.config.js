export default {
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/src/main/$1',
    '^@root/(.*)$': '<rootDir>/$1',
  },
};
