module.exports = {
    preset: 'jest-preset-angular',
    setupFilesAfterEnv: ['<rootDir>/src/setup-jest.ts'],
    transform: {
      '^.+\\.(ts|mjs|html|js)$': 'ts-jest',
    },
    testEnvironment: 'jest-environment-jsdom',
    collectCoverage: true,
    coverageReporters: ['html', 'lcov', 'text-summary'],
  };
  