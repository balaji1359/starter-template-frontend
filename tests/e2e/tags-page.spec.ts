import { test, expect, Page } from '@playwright/test';
import { navigateToSection } from './utils';

test.describe('Tags Page Functionality', () => {
  // Test data constants
  const TEST_DATE_NOW = Date.now().toString();

  // Helper function to generate unique test names
  function getUniqueTestName(baseName: string) {
    return `${baseName} ${TEST_DATE_NOW}`;
  }

  // Helper function to delete a test tag
  async function deleteTestTag(page: Page, tagName: string) {
    try {
      // Find the tag item by looking for the specific structure with the tag name
      const tagItem = page.locator('div[role="button"]').filter({ hasText: tagName }).first();
      
      if (await tagItem.count() > 0) {
        await tagItem.hover();
        
        // Look for buttons within this specific tag item container only
        const buttons = tagItem.locator('button');
        const buttonCount = await buttons.count();
        
        // The second button should be the delete button (first is edit, second is delete)
        if (buttonCount >= 2) {
          await expect(buttons.nth(1)).toBeVisible({ timeout: 5000 });
          await buttons.nth(1).click();
          
          // Verify delete confirmation dialog opens
          await expect(page.getByText('Confirm Delete')).toBeVisible({ timeout: 5000 });
          
          // Click the delete button in the confirmation dialog
          await page.getByRole('button', { name: 'Delete' }).click();
          
          // Wait for confirmation dialog to close
          await expect(page.getByText('Confirm Delete')).not.toBeVisible();
          
          // Verify the tag was deleted
          await expect(page.locator('div[role="button"]').filter({ hasText: tagName })).not.toBeVisible({ timeout: 5000 });
        }
      }
    } catch (error) {
      console.log(`Failed to delete test tag "${tagName}":`, error);
      // Don't throw error to avoid failing the test due to cleanup issues
    }
  }

  test.beforeEach(async ({ page }) => {
    // 1. Navigate to the main dashboard page.
    await page.goto('/dashboard');
    
    // Wait for the app to be fully initialized
    await page.waitForLoadState('domcontentloaded');
    
    // Check if the app is stuck on "Initializing..."
    const isInitializing = await page.getByText('Initializing...').isVisible();
    
    if (isInitializing) {
      console.log('App is stuck on "Initializing...", skipping navigation and proceeding with test on current page');
      // Wait a bit and proceed without navigation
      await page.waitForTimeout(3000);
    } else {
      // App is ready, try to navigate to tags
      try {
        await navigateToSection(page, 'tags');
      } catch (error) {
        console.log('Failed to navigate to tags section, staying on current page');
        await page.waitForTimeout(2000);
      }
    }
  });

  test('should allow adding, editing, and deleting a tag', async ({ page }) => {
    const testTagName = getUniqueTestName('Test Tag');
    const editedTestTagName = `${testTagName}-edited`;
    
    // === 1. ADD A NEW TAG ===
    // Target the 'Add' button within the page's DashboardHeader to be specific.
    await page.locator('div.flex-shrink-0').getByRole('button', { name: 'Add' }).click();
    await expect(page.getByRole('heading', { name: 'Create New Tag' })).toBeVisible();

    await page.getByPlaceholder('Enter tag name').fill(testTagName);
    await page.getByRole('button', { name: 'Create Tag' }).click();

    await expect(page.getByRole('heading', { name: 'Create New Tag' })).not.toBeVisible();
    await expect(page.getByText(testTagName)).toBeVisible();

    // === 2. EDIT THE TAG ===
    // Find the specific tag item container with role="button" that contains our test tag name
    const tagItem = page.locator('div[role="button"]').filter({ hasText: testTagName }).first();
    await expect(tagItem).toBeVisible();
    
    // Hover over the tag item to reveal action buttons
    await tagItem.hover();
    
    // Look for buttons within this specific tag item container only
    const buttons = tagItem.locator('button');
    const buttonCount = await buttons.count();
    console.log(`Found ${buttonCount} buttons in tag item for edit test`);
    
    // The first button should be the edit button
    if (buttonCount > 0) {
      await expect(buttons.first()).toBeVisible({ timeout: 10000 });
      await buttons.first().click();
    } else {
      throw new Error('Edit button not found in tag item');
    }

    await expect(page.getByRole('heading', { name: 'Edit Tag' })).toBeVisible();

    await page.getByPlaceholder('Enter tag name').fill(editedTestTagName);
    await page.getByRole('button', { name: 'Update Tag' }).click();

    // Wait for the edit dialog to close
    await expect(page.getByRole('heading', { name: 'Edit Tag' })).not.toBeVisible();
    
    // Wait for the page to update and verify the edited tag name appears
    await expect(page.getByText(editedTestTagName)).toBeVisible({ timeout: 10000 });
    
    // Since the edited tag name contains the original tag name as a substring,
    // we need to verify that the original tag item is no longer present
    // by checking that there's only one tag item with the edited name
    const originalTagItems = page.locator('div[role="button"]').filter({ hasText: testTagName });
    const editedTagItems = page.locator('div[role="button"]').filter({ hasText: editedTestTagName });
    
    // Should have exactly one tag item with the edited name
    await expect(editedTagItems).toHaveCount(1);
    
    // The original tag name should not exist as a standalone tag item
    // (it might still be visible as part of the edited tag name, but not as a separate item)
    const originalTagCount = await originalTagItems.count();
    console.log(`Found ${originalTagCount} tag items with original name after edit`);
    
    // If there are multiple items with the original name, it means the edit didn't work properly
    if (originalTagCount > 1) {
      throw new Error(`Expected 1 or fewer tag items with original name, but found ${originalTagCount}`);
    }

    // === 3. DELETE THE TAG ===
    // Find the edited tag item
    const editedTagItem = page.locator('div[role="button"]').filter({ hasText: editedTestTagName }).first();
    await expect(editedTagItem).toBeVisible();
    
    // Hover over the edited tag item
    await editedTagItem.hover();
    
    // Look for buttons within this specific tag item container only
    const deleteButtons = editedTagItem.locator('button');
    const deleteButtonCount = await deleteButtons.count();
    console.log(`Found ${deleteButtonCount} buttons in edited tag item for delete test`);
    
    // The second button should be the delete button (first is edit, second is delete)
    if (deleteButtonCount >= 2) {
      await expect(deleteButtons.nth(1)).toBeVisible({ timeout: 10000 });
      await deleteButtons.nth(1).click();
    } else {
      throw new Error('Delete button not found in tag item');
    }

    await expect(page.getByText('Confirm Delete')).toBeVisible();
    await page.getByRole('button', { name: 'Delete' }).click();

    // Wait for confirmation dialog to close and tag to be deleted
    await expect(page.getByText('Confirm Delete')).not.toBeVisible();
    await expect(page.locator('div[role="button"]').filter({ hasText: editedTestTagName })).not.toBeVisible({ timeout: 10000 });
    
    // Note: No additional cleanup needed as the test already deletes the tag
  });

  test('should create a tag and verify it appears', async ({ page }) => {
    const testTagName = getUniqueTestName('Simple Test Tag');
    
    // Add a new tag
    await page.locator('div.flex-shrink-0').getByRole('button', { name: 'Add' }).click();
    await expect(page.getByRole('heading', { name: 'Create New Tag' })).toBeVisible();

    await page.getByPlaceholder('Enter tag name').fill(testTagName);
    await page.getByRole('button', { name: 'Create Tag' }).click();

    await expect(page.getByRole('heading', { name: 'Create New Tag' })).not.toBeVisible();
    await expect(page.getByText(testTagName)).toBeVisible();
    
    // Cleanup: Delete the test tag
    await deleteTestTag(page, testTagName);
  });

  test('should handle tag creation with special characters', async ({ page }) => {
    const testTagName = getUniqueTestName('Test-Tag_With@Special#Chars');
    
    // Add a new tag with special characters
    await page.locator('div.flex-shrink-0').getByRole('button', { name: 'Add' }).click();
    await expect(page.getByRole('heading', { name: 'Create New Tag' })).toBeVisible();

    await page.getByPlaceholder('Enter tag name').fill(testTagName);
    await page.getByRole('button', { name: 'Create Tag' }).click();

    await expect(page.getByRole('heading', { name: 'Create New Tag' })).not.toBeVisible();
    await expect(page.getByText(testTagName)).toBeVisible();
    
    // Cleanup: Delete the test tag
    await deleteTestTag(page, testTagName);
  });
}); 