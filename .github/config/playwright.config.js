const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: '../tests',
  use: {
    baseURL: 'https://localhost:4430',
    ignoreHTTPSErrors: true, // Ignore SSL errors
  },
});