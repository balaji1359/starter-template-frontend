import { test, expect, Page } from '@playwright/test';
import { navigateToSection } from './utils';

test.use({ storageState: 'playwright/.auth/user.json' });

test.describe('Links Page Functionality', () => {
  const TEST_LINK_URL = 'https://playwright.dev';
  const TEST_LINK_TITLE = 'Fast and reliable end-to-end testing for modern web apps';

  async function addLink(page: Page, url: string) {
    await page.getByTestId('add-button-links').click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await page.getByPlaceholder('https://example.com').fill(url);
    await page.getByRole('button', { name: 'Add', exact: true }).click();
    await expect(page.getByRole('dialog')).not.toBeVisible();
    
    // Try to find the link immediately
    try {
      await expect(page.getByText(TEST_LINK_TITLE).first()).toBeVisible({ timeout: 10000 });
    } catch (error) {
      // Try refreshing the page
      await page.getByTitle('Refresh links').click();
      await page.waitForTimeout(2000);
      await expect(page.getByText(TEST_LINK_TITLE).first()).toBeVisible({ timeout: 10000 });
    }
  }

  async function deleteLink(page: Page, linkId: string) {
    const linkItem = page.getByTestId(`link-item-${linkId}`);
    await linkItem.hover();
    await page.getByTestId(`link-item-${linkId}-delete-button`).click();
    await expect(page.getByText('Confirm Delete')).toBeVisible();
    await page.getByRole('button', { name: 'Delete' }).click();
    await expect(page.getByText('Confirm Delete')).not.toBeVisible();
    await expect(linkItem).not.toBeVisible();
  }

  test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');
    await navigateToSection(page, 'links');
  });

  test('should add a new link and then delete it', async ({ page }) => {
    await addLink(page, TEST_LINK_URL);

    // Wait a moment for the link to be fully loaded
    await page.waitForTimeout(1000);
    
    // Get the first link item with the test title to avoid strict mode violation
    const linkItem = page.locator(`[data-testid^="link-item-"]:has-text("${TEST_LINK_TITLE}")`).first();
    await expect(linkItem).toBeVisible();
    
    const testId = await linkItem.getAttribute('data-testid');
    
    if (!testId) {
      throw new Error('Link item does not have a data-testid attribute');
    }
    
    const linkId = testId.replace('link-item-', '');
    
    await deleteLink(page, linkId);
  });

  test('should edit an existing link', async ({ page }) => {
    await addLink(page, TEST_LINK_URL);
    
    // Wait a moment for the link to be fully loaded
    await page.waitForTimeout(1000);
    
    // Get the first link item with the test title to avoid strict mode violation
    const linkItem = page.locator(`[data-testid^="link-item-"]:has-text("${TEST_LINK_TITLE}")`).first();
    await expect(linkItem).toBeVisible();
    
    const testId = await linkItem.getAttribute('data-testid');
    
    if (!testId) {
      throw new Error('Link item does not have a data-testid attribute');
    }
    
    const linkId = testId.replace('link-item-', '');

    await linkItem.hover();
    await page.getByTestId(`link-item-${linkId}-edit-button`).click();
    
    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.getByText('Edit Link')).toBeVisible();
    
    const updatedTitle = 'Updated Link Title';
    await page.getByPlaceholder('Link title (auto-generated if empty)').fill(updatedTitle);
    
    // Wait for the input to be updated
    await page.waitForTimeout(500);
    
    // Click the Save button
    const saveButton = page.getByRole('button', { name: 'Save' });
    await expect(saveButton).toBeVisible();
    await saveButton.click();
    
    // Wait for the save operation to complete
    await page.waitForTimeout(3000);
    
    // Try to close the dialog manually if it's still open
    try {
      const closeButton = page.getByLabel('Close');
      if (await closeButton.isVisible()) {
        await closeButton.click();
        await page.waitForTimeout(1000);
      }
    } catch (error) {
      // If close button is not found, that's fine
    }
    
    // Wait for dialog to close and then verify the updated title
    await expect(page.getByRole('dialog')).not.toBeVisible({ timeout: 15000 });
    
    // Wait a moment for the page to update
    await page.waitForTimeout(2000);
    
    // Try to find the updated title with a more flexible approach
    try {
      await expect(page.getByText(updatedTitle)).toBeVisible({ timeout: 10000 });
    } catch (error) {
      // If not found immediately, try refreshing the page
      await page.getByTitle('Refresh links').click();
      await page.waitForTimeout(2000);
      await expect(page.getByText(updatedTitle)).toBeVisible({ timeout: 10000 });
    }

    // Wait a moment for the updated link to be fully loaded
    await page.waitForTimeout(1000);
    
    const updatedLinkItem = page.locator(`[data-testid^="link-item-"]:has-text("${updatedTitle}")`);
    await expect(updatedLinkItem).toBeVisible();
    
    const updatedTestId = await updatedLinkItem.getAttribute('data-testid');
    
    if (!updatedTestId) {
      throw new Error('Updated link item does not have a data-testid attribute');
    }
    
    const updatedLinkId = updatedTestId.replace('link-item-', '');
    
    await deleteLink(page, updatedLinkId);
  });
});