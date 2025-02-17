import { PlaywrightTestConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = {
  testDir: './tests',
  timeout: 60000,
  retries: 0,
  workers: 1,
  use: {
    baseURL: 'https://www.saucedemo.com',
    screenshot: 'only-on-failure',
    trace: 'on',
    video: 'on',
    actionTimeout: 15000,
    navigationTimeout: 30000,
    headless: false
  },
  expect: {
    timeout: 10000
  },
  reporter: [['list']],
  projects: [
    {
      name: 'Chrome',
      use: {
        browserName: 'chromium',
        viewport: { width: 1920, height: 1080 },
        launchOptions: {
          args: ['--no-sandbox']
        }
      }
    }
  ]
};

export default config;
