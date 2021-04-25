/*------------------
DON' DELETE ME

This is required so that jest can use environment variables such as when we make axios calls using a TOKEN

------------------*/
require('dotenv').config()

module.exports = {
  projects: [
    {
      displayName: 'node',
      testEnvironment: 'node',
    },
  ],
};