// some of this copied from https://github.com/mswjs/examples/tree/main/examples/with-jest

import type { Config } from 'jest';

export default {
  rootDir: __dirname,
  setupFiles: ['./jest.polyfills.js'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testMatch: ['**/__tests__/**/*.test.jsx'],
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    customExportConditions: [''],
  },
} satisfies Config;
