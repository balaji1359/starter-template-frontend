import { test as setup, expect, Page } from '@playwright/test';
import path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');
const baseURL = process.env.LL_PW_LOCAL === '1' ? 'http://localhost:3000/' : 'https://beekeeper.ai/';
const loginEmail = process.env.LL_PW_USERNAME || '';
const loginPassword = process.env.LL_PW_PASSWORD || '';

setup('authenticate', async ({ page }: { page: Page }) => {
  // Add debugging to see what credentials we have
  console.log('Auth setup - Email:', loginEmail ? 'Set' : 'Not set');
  console.log('Auth setup - Password:', loginPassword ? 'Set' : 'Not set');
  
  // Perform authentication steps. Replace these actions with your own.
  await page.goto(baseURL + 'login');
  
  // Wait for the page to load properly
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(2000);
  
  // Wait for the "Initializing..." text to disappear
  try {
    await expect(page.getByText('Initializing...')).not.toBeVisible({ timeout: 30000 });
  } catch (error) {
    console.log('No "Initializing..." text found, proceeding...');
  }
  
  // Wait a bit more for the app to be fully ready
  await page.waitForTimeout(3000);
  
  // Wait for the page to be fully loaded
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(5000);
  
  // Wait for the email field to be visible before clicking
  await page.getByPlaceholder('Enter your e-mail').waitFor({ state: 'visible', timeout: 30000 });
  await page.getByPlaceholder('Enter your e-mail').click();
  await page.getByPlaceholder('Enter your e-mail').fill(loginEmail);
  await page.getByPlaceholder('Enter your e-mail').press('Tab');
  await page.getByPlaceholder('Enter your password').fill(loginPassword);
  
  // Add debugging to check form state
  console.log('Email filled:', loginEmail);
  console.log('Password filled:', loginPassword ? 'Yes' : 'No');
  
  // Wait a moment for validation to complete
  await page.waitForTimeout(2000);
  
  // Check if there are any validation errors
  const errorMessages = await page.locator('[role="alert"], .text-red-500, .text-red-600').allTextContents();
  if (errorMessages.length > 0) {
    console.log('Validation errors found:', errorMessages);
  }
  
  // Check button state
  const signInButton = page.getByRole('button', { name: 'Sign in', exact: true });
  const isDisabled = await signInButton.isDisabled();
  console.log('Sign in button disabled:', isDisabled);
  
  // Wait for the sign in button to be visible
  await signInButton.waitFor({ state: 'visible', timeout: 30000 });
  
  // Wait for button to be enabled
  await signInButton.waitFor({ state: 'visible', timeout: 30000 });
  
  await signInButton.click();
  // Wait until the page receives the cookies.
  //
  // Sometimes login flow sets cookies in the process of several redirects.
  // Wait for the final URL to ensure that the cookies are actually set.
  await page.waitForURL(baseURL + 'dashboard', { timeout: 15000 });
  // Alternatively, you can wait until the page reaches a state where all cookies are set.
  //await expect(page.getByRole('button', { name: 'View profile and more' })).toBeVisible();

  // End of authentication steps.

  await page.context().storageState({ path: authFile });
});