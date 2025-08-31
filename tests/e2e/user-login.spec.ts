import { test, expect } from '@playwright/test';
const baseURL = process.env.LL_PW_LOCAL === '1' ? 'http://localhost:3000/' : 'https://beekeeper.ai/';
const loginEmail = process.env.LL_PW_USERNAME || '';
const loginPassword = process.env.LL_PW_PASSWORD || '';

test.skip('test', async ({ page }) => {
  await page.goto(baseURL + 'login');
  await page.getByRole('textbox', { name: 'Enter your e-mail' }).click();
  await page.getByRole('textbox', { name: 'Enter your e-mail' }).fill(loginEmail);
  await page.getByRole('textbox', { name: 'Enter your e-mail' }).press('Tab');
  await page.getByRole('textbox', { name: 'Enter your password' }).fill(loginPassword);
  await page.getByRole('button', { name: 'Sign in', exact: true }).click();
});