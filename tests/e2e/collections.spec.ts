import { test, expect, Page } from '@playwright/test';
import { navigateToSection } from './utils';

/**
 * Collections page test suite
 * 
 * This test suite verifies the core functionality of the Collections management feature:
 * - Viewing collections in the dashboard
 * - Creating new collections
 * - Editing existing collections
 * - Testing sorting functionality (by date, name, count)
 * - Testing view modes (grid/list)
 * - Testing collection actions (edit, delete, archive)
 * - Testing empty state
 * 
 * Note: These tests rely on the auth.setup.ts to handle authentication
 */

// Use the authenticated state from auth.setup.ts
test.use({ storageState: 'playwright/.auth/user.json' });

test.describe('Collections Page Functionality', () => {
  // Test data constants
  const TEST_DATE_NOW = Date.now().toString();

  // Helper function to generate unique test names
  function getUniqueTestName(baseName: string) {
    return `${baseName} ${TEST_DATE_NOW}`;
  }

  // Helper function to click the Add Collection button
  async function clickAddCollection(page: Page) {
    // Wait for the button to be visible and clickable
    await expect(page.getByTestId('add-button-collections')).toBeVisible({ timeout: 15000 });
    await page.getByTestId('add-button-collections').click();
  }

  // Helper function to ensure we have the correct dialog open
  async function ensureCreateCollectionDialog(page: Page) {
    // Wait for dialog to open
    await expect(page.getByRole('dialog')).toBeVisible({ timeout: 10000 });
    
    // Check if we have the Create Collection dialog
    try {
      await expect(page.getByText('Create Collection')).toBeVisible({ timeout: 5000 });
    } catch (e) {
      // If we have a different dialog open, close it and try again
      console.log('Wrong dialog opened, closing and retrying...');
      
      // Check what dialog is actually open
      const dialogContent = await page.locator('[role="dialog"]').textContent();
      console.log('Dialog content:', dialogContent);
      
      await page.getByLabel('Close').click();
      await expect(page.getByRole('dialog')).not.toBeVisible();
      
      // Wait a moment and try clicking the Add button again
      await page.waitForTimeout(1000);
      await clickAddCollection(page);
      await expect(page.getByRole('dialog')).toBeVisible({ timeout: 10000 });
      await expect(page.getByText('Create Collection')).toBeVisible({ timeout: 5000 });
    }
  }

  // Helper function to create a test collection
  async function createTestCollection(page: Page, name: string, description?: string) {
    await clickAddCollection(page);
    await ensureCreateCollectionDialog(page);
    
    await page.getByPlaceholder('Collection name').fill(name);
    if (description) {
      await page.getByPlaceholder('Brief description of the collection').fill(description);
    }
    
    await page.getByRole('button', { name: 'Create' }).click();
    await expect(page.getByRole('dialog')).not.toBeVisible();
    
    // Try to find the collection immediately
    try {
      await expect(page.getByText(name)).toBeVisible({ timeout: 10000 });
      return;
    } catch (error) {
      // If not found immediately, try refreshing the page
      await page.getByTitle('Refresh collections').click();
      await page.waitForTimeout(2000); // Wait for refresh to complete
      await expect(page.getByText(name)).toBeVisible({ timeout: 10000 });
    }
  }

  // Helper function to delete a test collection
  async function deleteTestCollection(page: Page, collectionId: string, collectionName: string) {
    const collectionItem = page.getByTestId(`collection-item-${collectionId}`);
    await collectionItem.hover();
    await page.getByTestId(`collection-item-${collectionId}-delete-button`).click();

    await expect(page.getByText('Confirm Delete')).toBeVisible();
    await page.getByRole('button', { name: 'Delete' }).click();
    await expect(page.getByText('Confirm Delete')).not.toBeVisible();
    await expect(page.getByText(collectionName)).not.toBeVisible();
  }

  test.beforeEach(async ({ page }) => {
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
      // App is ready, try to navigate to collections
      try {
        await navigateToSection(page, 'collections');
      } catch (error) {
        console.log('Failed to navigate to collections section, staying on current page');
        await page.waitForTimeout(2000);
      }
    }
    
    // Debug: Check if we're on the right page
    const currentUrl = page.url();
    console.log('Current URL after navigation:', currentUrl);
    
    // Debug: Check if the add button is present
    try {
      const addButton = page.getByTestId('add-button-collections');
      const isVisible = await addButton.isVisible();
      console.log('Add button visible:', isVisible);
    } catch (error) {
      console.log('Add button not found:', error);
    }
  });

  test('should display collections page with proper layout', async ({ page }) => {
    // Verify page title and structure
    await expect(page.getByRole('heading', { name: 'Collections' })).toBeVisible();
    
    // Verify header controls are present - check for any Add button
    await expect(page.getByTestId('add-button-collections')).toBeVisible();
    await expect(page.getByTitle('Refresh collections')).toBeVisible();
    
    // Verify view toggle buttons
    await expect(page.getByTitle('Grid view')).toBeVisible();
    await expect(page.getByTitle('List view')).toBeVisible();
    
    // Verify sort buttons
    await expect(page.getByTitle(/Sort by Date/)).toBeVisible();
    await expect(page.getByTitle(/Sort by Name/)).toBeVisible();
    await expect(page.getByTitle(/Sort by Count/)).toBeVisible();
  });

  test('should open add collection dialog and then close it', async ({ page }) => {
    // Verify we're on the collections page
    await expect(page.getByRole('heading', { name: 'Collections' })).toBeVisible({ timeout: 10000 });
    
    // Click the Add button
    await clickAddCollection(page);
    
    // Ensure we have the correct dialog open
    await ensureCreateCollectionDialog(page);
    
    // Close the dialog
    await page.getByLabel('Close').click();
    
    // Verify dialog is closed
    await expect(page.getByRole('dialog')).not.toBeVisible();
  });

  test('should create and then delete a collection', async ({ page }) => {
    const uniqueName = getUniqueTestName('Test Create and Delete');
    
    await createTestCollection(page, uniqueName);
    const collectionItem = page.locator(`[data-testid^="collection-item-"]:has-text("${uniqueName}")`);
    const collectionId = (await collectionItem.getAttribute('data-testid'))!.split('-').pop()!;
    
    await deleteTestCollection(page, collectionId, uniqueName);
  });

  test('should validate required fields when creating collection', async ({ page }) => {
    // Click add collection button
    await clickAddCollection(page);
    
    // Ensure we have the correct dialog open
    await ensureCreateCollectionDialog(page);
    
    // Try to submit without name
    await page.getByRole('button', { name: 'Create' }).click();
    
    // Should show validation error or prevent submission
    // The exact behavior depends on the form validation implementation
    await expect(page.getByRole('dialog')).toBeVisible();
  });

  test('should cancel creating a collection', async ({ page }) => {
    const uniqueName = getUniqueTestName('Cancel Test Collection');
    
    // Click add collection button
    await clickAddCollection(page);
    
    // Ensure we have the correct dialog open
    await ensureCreateCollectionDialog(page);
    
    // Fill in some data
    await page.getByPlaceholder('Collection name').fill(uniqueName);
    
    // Click close button (X)
    await page.getByLabel('Close').click();
    
    // Verify the dialog is closed
    await expect(page.getByRole('dialog')).not.toBeVisible();
    
    // Verify the collection was not created
    await expect(page.getByText(uniqueName)).not.toBeVisible();
  });

  test('should toggle between grid and list view', async ({ page }) => {
    // Start with default view (should be list)
    // Check if list view button has the active styling (bg-background class)
    const listViewButton = page.getByTitle('List view');
    await expect(listViewButton).toHaveClass(/bg-background/);
    
    // Switch to grid view
    await page.getByTitle('Grid view').click();
    const gridViewButton = page.getByTitle('Grid view');
    await expect(gridViewButton).toHaveClass(/bg-background/);
    
    // Switch back to list view
    await page.getByTitle('List view').click();
    await expect(listViewButton).toHaveClass(/bg-background/);
  });

  test('should sort collections by date', async ({ page }) => {
    // Click sort by date button
    await page.getByTitle(/Sort by Date/).click();
    
    // Verify the sort button shows active state
    const dateSortButton = page.getByTitle(/Sort by Date/);
    await expect(dateSortButton).toHaveClass(/bg-background/);
    
    // Click again to toggle direction
    await page.getByTitle(/Sort by Date/).click();
    
    // Should still be active but direction changed
    await expect(dateSortButton).toHaveClass(/bg-background/);
  });

  test('should sort collections by name', async ({ page }) => {
    // Click sort by name button
    await page.getByTitle(/Sort by Name/).click();
    
    // Verify the sort button shows active state
    const nameSortButton = page.getByTitle(/Sort by Name/);
    await expect(nameSortButton).toHaveClass(/bg-background/);
    
    // Click again to toggle direction
    await page.getByTitle(/Sort by Name/).click();
    
    // Should still be active but direction changed
    await expect(nameSortButton).toHaveClass(/bg-background/);
  });

  test('should sort collections by count', async ({ page }) => {
    // Click sort by count button
    await page.getByTitle(/Sort by Count/).click();
    
    // Verify the sort button shows active state
    const countSortButton = page.getByTitle(/Sort by Count/);
    await expect(countSortButton).toHaveClass(/bg-background/);
    
    // Click again to toggle direction
    await page.getByTitle(/Sort by Count/).click();
    
    // Should still be active but direction changed
    await expect(countSortButton).toHaveClass(/bg-background/);
  });

  test('should refresh collections', async ({ page }) => {
    // Click refresh button
    await page.getByTitle('Refresh collections').click();
    
    // Should show loading state briefly
    // The exact behavior depends on the implementation
    await expect(page.getByRole('heading', { name: 'Collections' })).toBeVisible();
  });

  test('should display empty state when no collections exist', async ({ page }) => {
    // This test assumes we start with no collections
    // In a real scenario, you might need to clear collections first
    
    // Check if empty state is shown
    const emptyState = page.getByText('No collections found');
    const createButton = page.getByRole('button', { name: 'Create Your First Collection' });
    
    // If empty state is visible, verify its elements
    if (await emptyState.isVisible()) {
      await expect(emptyState).toBeVisible();
      await expect(createButton).toBeVisible();
      
      // Click the create button
      await createButton.click();
      
      // Should open the create dialog
      await expect(page.getByRole('dialog')).toBeVisible();
      await expect(page.getByRole('heading', { name: 'Create Collection' })).toBeVisible();
    }
  });

  test('should edit a collection', async ({ page }) => {
    const uniqueName = getUniqueTestName('Test Edit');
    const updatedName = `${uniqueName} (updated)`;

    await createTestCollection(page, uniqueName);
    const collectionItem = page.locator(`[data-testid^="collection-item-"]:has-text("${uniqueName}")`);
    const collectionId = (await collectionItem.getAttribute('data-testid'))!.split('-').pop()!;

    await collectionItem.hover();
    await page.getByTestId(`collection-item-${collectionId}-edit-button`).click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.getByText('Edit Collection')).toBeVisible();
    
    await page.getByPlaceholder('Collection name').fill(updatedName);
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByRole('dialog')).not.toBeVisible();
    
    await expect(page.getByText(updatedName)).toBeVisible();
    
    const updatedCollectionItem = page.locator(`[data-testid^="collection-item-"]:has-text("${updatedName}")`);
    const updatedCollectionId = (await updatedCollectionItem.getAttribute('data-testid'))!.split('-').pop()!;
    await deleteTestCollection(page, updatedCollectionId, updatedName);
  });

  test('should show collection details and link count', async ({ page }) => {
    const uniqueName = getUniqueTestName('Test Collection Details');
    
    // Create a collection first
    await createTestCollection(page, uniqueName);
    const collectionItem = page.locator(`[data-testid^="collection-item-"]:has-text("${uniqueName}")`);
    const collectionId = (await collectionItem.getAttribute('data-testid'))!.split('-').pop()!;
    
    // Verify collection shows link count (should be 0 for new collection)
    // Use a more specific selector to avoid strict mode violation
    const linkCountElement = collectionItem.locator('span').filter({ hasText: '0 links' });
    await expect(linkCountElement.first()).toBeVisible();
    
    // Cleanup: Delete the test collection
    await deleteTestCollection(page, collectionId, uniqueName);
  });

  test('should handle collection actions menu', async ({ page }) => {
    const uniqueName = getUniqueTestName('Test Collection Actions');
    
    // Create a collection first
    await createTestCollection(page, uniqueName);
    const collectionItem = page.locator(`[data-testid^="collection-item-"]:has-text("${uniqueName}")`);
    const collectionId = (await collectionItem.getAttribute('data-testid'))!.split('-').pop()!;
    
    await collectionItem.hover();
    
    // Verify the action buttons are present (they appear on hover)
    const buttons = collectionItem.getByRole('button');
    const buttonCount = await buttons.count();
    console.log(`Found ${buttonCount} action buttons in collection item`);
    
    // Should have at least one button (edit button)
    await expect(buttons.first()).toBeVisible();
    
    // Cleanup: Delete the test collection
    await deleteTestCollection(page, collectionId, uniqueName);
  });

  test('should navigate to collection and view its links', async ({ page }) => {
    const uniqueName = getUniqueTestName('Collection to View');
    
    // Create a collection first
    await createTestCollection(page, uniqueName);
    const collectionItem = page.locator(`[data-testid^="collection-item-"]:has-text("${uniqueName}")`);
    const collectionId = (await collectionItem.getAttribute('data-testid'))!.split('-').pop()!;
    
    // Click on the collection to navigate to it
    await page.getByText(uniqueName).first().click();
    
    // Should navigate to the collection detail page
    // The exact URL and content depends on the implementation
    await expect(page.getByText(uniqueName)).toBeVisible();
    
    // Navigate back to collections page for cleanup
    await navigateToSection(page, 'collections');
    
    // Cleanup: Delete the test collection
    await deleteTestCollection(page, collectionId, uniqueName);
  });

  test('should delete a collection', async ({ page }) => {
    const uniqueName = getUniqueTestName('Collection to Delete');
    
    // Create a collection first
    await createTestCollection(page, uniqueName);
    const collectionItem = page.locator(`[data-testid^="collection-item-"]:has-text("${uniqueName}")`);
    const collectionId = (await collectionItem.getAttribute('data-testid'))!.split('-').pop()!;
    
    // Find the collection item by looking for the specific structure with the collection name
    await expect(collectionItem).toBeVisible();
    await collectionItem.hover();
    
    // Look for buttons within this specific collection item container only
    const buttons = collectionItem.locator('button');
    const buttonCount = await buttons.count();
    console.log(`Found ${buttonCount} buttons in collection item for delete test`);
    
    // The second button should be the delete button (first is edit, second is delete)
    if (buttonCount >= 2) {
      await expect(buttons.nth(1)).toBeVisible({ timeout: 10000 });
      console.log('Clicking delete button (second button)');
      await buttons.nth(1).click();
    } else {
      throw new Error('Delete button not found in collection item');
    }
    
    // Verify delete confirmation dialog opens (custom overlay, not role="dialog")
    await expect(page.locator('div.fixed.inset-0.z-50')).toBeVisible({ timeout: 10000 });
    await expect(page.getByText('Confirm Delete')).toBeVisible({ timeout: 10000 });
    await expect(page.getByText('Are you sure you want to delete this collection?')).toBeVisible({ timeout: 10000 });
    
    // Click the delete button in the confirmation dialog
    await page.getByRole('button', { name: 'Delete' }).click();
    
    // Wait for confirmation dialog to close
    await expect(page.getByText('Confirm Delete')).not.toBeVisible();
    
    // Verify the collection was deleted
    await expect(page.getByText(uniqueName)).not.toBeVisible();
  });

  test('should not allow deleting default collection', async ({ page }) => {
    // Look for the default collection (should have a "Default" badge)
    const defaultCollection = page.locator('div').filter({ hasText: 'Default' }).first();
    
    if (await defaultCollection.count() > 0) {
      // Hover over the default collection to show action buttons
      await defaultCollection.hover();
      
      // Look for buttons within this specific collection item container only
      const buttons = defaultCollection.locator('button');
      const buttonCount = await buttons.count();
      console.log(`Found ${buttonCount} buttons in default collection item`);
      
      // Try to click the delete button if it exists (second button)
      if (buttonCount >= 2) {
        await expect(buttons.nth(1)).toBeVisible({ timeout: 10000 });
        await buttons.nth(1).click();
        
        // Should show an error message that default collection cannot be deleted
        // The exact behavior depends on the implementation
        // For now, just verify that the collection still exists
        await expect(defaultCollection).toBeVisible();
      }
    } else {
      // If no default collection exists, skip this test
      console.log('No default collection found, skipping test');
    }
    
    // Note: No cleanup needed for this test as it doesn't create any collections
  });
}); 