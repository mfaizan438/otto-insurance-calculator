module.exports = {
    testEnvironment: 'node',
    transform: {
        '^.+\\.jsx?$': 'babel-jest',
    },
    moduleFileExtensions: ['js', 'json', 'jsx', 'node'],
    testMatch: ['<rootDir>/test/**/*.test.js'], // Only run tests with .test.js extension in the test directory
    coveragePathIgnorePatterns: ['/node_modules/'],
    collectCoverageFrom: ['**/*.{js,jsx}', '!**/node_modules/**', '!**/vendor/**'],
};