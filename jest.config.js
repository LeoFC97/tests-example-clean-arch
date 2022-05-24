const ts = require('ts-jest/jest-preset')
const merge = require('merge')

module.exports = merge.recursive(ts, {
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  transform: {
    '^.+\\.(js|jsx)?$': 'ts-jest'
  },
  testMatch: [
    '<rootDir>/src/**/*.test.ts',
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
});
