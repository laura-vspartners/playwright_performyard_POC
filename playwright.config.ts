import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 60000,
  retries: 1,
  use: {
    baseURL: process.env.BASE_URL || 'https://staging.talent.performyard.com/',
    headless: false, // Set to false to run in a visible browser
    browserName: 'chromium',
    trace: 'on', // Enables trace generation for debugging
    screenshot: 'only-on-failure', // Capture screenshots for failed tests
  },
});