import { defineConfig } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();
export default defineConfig({
  globalSetup: require.resolve('./global-setup'),
  testDir: './tests',
  timeout: 60000,
  retries: 0,
  use: {
    baseURL: process.env.BASE_URL || 'https://staging.talent.performyard.com/',
    headless: false, // Set to true to run in an invisible browser
    browserName: 'chromium',
    trace: 'on', // Enables trace generation for debugging
    screenshot: 'only-on-failure', // Capture screenshots for failed tests,
    storageState: 'storageState.json' // Load the saved session state
  },
});

