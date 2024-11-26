import { defineConfig, devices } from '@playwright/test';
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
    viewport: { width: 1280, height: 720 }, // default viewport to be used in all tests
    trace: 'on', // Enables trace generation for debugging
    screenshot: 'only-on-failure', // Capture screenshots for failed tests,
    storageState: 'storageState.json' // Load the saved session state
  },
  // projects: [
  //   {
  //     name: 'Desktop',
  //     use: {
  //       ...devices['Desktop Chrome'], // Use Chrome's default desktop viewport
  //       viewport: { width: 1280, height: 720 },
  //     },
  //   },
  //   {
  //     name: 'Tablet',
  //     use: {
  //       ...devices['iPad Pro 11'], // Use the iPad Pro 11" size
  //       viewport: { width: 834, height: 1194 },
  //     },
  //   },
  //   {
  //     name: 'Mobile',
  //     use: {
  //       ...devices['Pixel 5'], // Use the Pixel 5 viewport for mobile testing
  //       viewport: { width: 393, height: 851 },
  //     },
  //   },
  // ],
});

