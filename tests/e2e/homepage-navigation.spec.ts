import { test, expect } from '@playwright/test';

// Reset storage state for this file to avoid being authenticated
test.use({ storageState: { cookies: [], origins: [] } });

test('BeeKeeper Homepage Navigation', async ({ page }) => {
  // Navigate to BeeKeeper homepage
  await page.goto('/');
  await page.waitForLoadState('networkidle');

  // Verify 'BeeKeeper' logo appears in top left
  const logo = page.getByTestId('header-logo');
  await expect(logo).toBeVisible();
  await expect(logo.getByText('BeeKeeper')).toBeVisible();

  // Verify navigation headers are present
  await expect(page.getByTestId('header-nav-features')).toBeVisible();
  await expect(page.getByTestId('header-nav-pricing')).toBeVisible();
  await expect(page.getByTestId('header-nav-faq')).toBeVisible();
  await expect(page.getByTestId('header-nav-download')).toBeVisible();

  // Verify Login and Sign Up buttons appear in top right
  await expect(page.getByTestId('header-login-button')).toBeVisible();
  await expect(page.getByTestId('header-signup-button')).toBeVisible();

  // Click on Features header and verify Features section is displayed
  await page.getByTestId('header-nav-features').click();
  await expect(page).toHaveURL(/.*#features/);
  await expect(page.getByRole('heading', { name: 'Features', exact: true })).toBeVisible({ timeout: 10000 });

  // Click on Pricing header and verify Pricing section is displayed
  await page.getByTestId('header-nav-pricing').click();
  await expect(page).toHaveURL(/.*#pricing/);
  await expect(page.getByRole('heading', { name: 'Pricing', exact: true })).toBeVisible({ timeout: 10000 });

  // Click on FAQ header and verify FAQ section is displayed
  await page.getByTestId('header-nav-faq').click();
  await expect(page).toHaveURL(/.*#faq/);
  await expect(page.getByRole('heading', { name: 'FAQ', exact: true })).toBeVisible({ timeout: 10000 });

  // Click on Download header and verify Download section is displayed
  await page.getByTestId('header-nav-download').click();
  await expect(page).toHaveURL(/.*#download/);
  await expect(page.getByRole('heading', { name: 'Download BeeKeeper Apps' })).toBeVisible({ timeout: 10000 });
});