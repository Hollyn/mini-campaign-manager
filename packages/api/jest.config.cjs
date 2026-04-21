module.exports = {
  clearMocks: true,
  preset: 'ts-jest',
  roots: ['<rootDir>/tests'],
  setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
  testEnvironment: 'node'
}
