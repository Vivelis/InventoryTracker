module.exports = {
    moduleFileExtensions: ['js', 'json'],
    rootDir: './',
    testMatch: ['<rootDir>/tests/unit/**/*.test.js'],
    collectCoverageFrom: [
        '!tests/**/*.js',
        '!node_modules/**',
        '!coverage/**',
        '!**/*.config.js',
    ],
    coverageDirectory: 'coverage',
    testEnvironment: 'node',
};