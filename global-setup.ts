import { chromium, expect, FullConfig } from '@playwright/test';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function globalSetup(config: FullConfig) {
  const { baseURL } = config.projects[0].use; // Use the baseURL from config
  const browser = await chromium.launch({
    headless: false, // Run browser in visible mode
    slowMo: 100, // Slow down actions for better visibility (optional)
  });
  const page = await browser.newPage();

  // Navigate to login page
  console.log('Navigating to login page...');
  await page.goto(`${baseURL}login/?next=%2F`);

  // Perform login
  console.log('Filling in login credentials...');
  await page.fill('input[data-testid="emailInput"]', process.env.USERNAME || 'laura.andreescu@vspartners.us');
  await page.fill('input[data-testid="passwordInput"]', process.env.PASSWORD || 'Sergiu2023!!');
  console.log('Clicking sign-in button...');
  await page.click('button[data-testid="signInButton"]');

  // Wait for navigation
  await page.waitForNavigation();

   // Get the page title
   const title = await page.title();

   // Print the title
   console.log('Page title:', title);
 
   // Assert the title matches the expected value
   expect(title).toBe('Dashboard - - PerformYard'); 

  // Save session state to file
  console.log('Saving storage state...');
  await page.context().storageState({ path: 'storageState.json' });

  // Close the browser
  await browser.close();
}

export default globalSetup;
