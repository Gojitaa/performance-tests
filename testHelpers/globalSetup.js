const { setup: setupDevServer } = require('jest-dev-server')
const puppeteer = require('puppeteer')

module.exports = async function globalSetup() {
  await setupDevServer([
    {
      command: 'npm run start:api',
      port: 3000,
    },
    {
      command: 'npm run start:client',
      port: 1234,
    },
  ])
}