import type { Config } from 'jest';
import nextJest from 'next/jest';

// Create a Next.js Jest configuration based on your Next.js setup
const createJestConfig = nextJest({
  dir: './', // Path to your Next.js app (root directory)
});

const customJestConfig: Config = {
  clearMocks: true,

  // Enable coverage collection
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',

  // Specifies the test environment (for testing browser-like behavior, use jsdom)
  testEnvironment: 'jest-environment-jsdom',

  // Setup files for jest
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

  // Module file extensions for TypeScript, JavaScript, and JSX
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],

  // Mocking path aliases in the project, matching the configuration in tsconfig.json
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // This handles the @/* alias in imports
    // Mock static files like CSS and images
    '^.+\\.(css|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',
    '^.+\\.(jpg|jpeg|png|gif|webp|avif|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },

  // Transform TypeScript and JSX/TSX files using ts-jest
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest', // Use ts-jest for TypeScript files
  },
};

// Export the combined configuration using Next.js's Jest preset
export default createJestConfig(customJestConfig);