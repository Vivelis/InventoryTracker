const { join } = require('path');

module.exports = {
  preset: './tests/integration/preset.js',
  testMatch: ['<rootDir>/tests/integration/**/*.test.js'],
  rootDir: join(__dirname, '../../'),
};
