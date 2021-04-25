/*------------------
DON' DELETE ME

This is required so that jest can use environment variables such as when we make axios calls using a TOKEN

------------------*/
require('dotenv').config()

module.exports = {
  projects: [
    {
      displayName: 'dom',
      testEnvironment: 'jsdom',
      testMatch: ["**/*.test.jsx"]
    },
    {
      displayName: 'node',
      testEnvironment: 'node',
      testMatch: ['**/*.test.js']
    },
  ],
};