// some of this copied from https://github.com/mswjs/examples/tree/main/examples/with-jest

import type { Config } from 'jest';

export default {
  rootDir: __dirname,
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testMatch: ['**/__tests__/**/*.test.(jsx|tsx)'],
  testEnvironment: 'jsdom',
} satisfies Config;
