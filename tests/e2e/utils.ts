import { Page, expect } from '@playwright/test';

export async function navigateToSection(page: Page, section: 'links' | 'collections' | 'tags' | 'filters' | 'import' | 'stats') {
  const headingMap = {
    links: 'Links',
    collections: 'Collections',
    tags: 'Tags',
    filters: 'Filters',
    import: 'Import',
    stats: 'Analytics',
  };

  const headingName = headingMap[section];

  // Wait for the app to be fully initialized
  await page.waitForLoadState('domcontentloaded');
  
  // Wait for the "Initializing..." text to disappear with a longer timeout
  try {
    await expect(page.getByText('Initializing...')).not.toBeVisible({ timeout: 30000 });
  } catch (error) {
    // If "Initializing..." is still visible after 30 seconds, try to proceed anyway
    console.log('App still initializing after 30 seconds, proceeding with navigation...');
  }
  
  // Wait a bit more for the app to be fully ready
  await page.waitForTimeout(5000);

  // Try to find the navigation element with a more flexible approach
  let navElement;
  let attempts = 0;
  const maxAttempts = 3;
  
  while (attempts < maxAttempts) {
    try {
      // First try to find it as visible
      navElement = page.getByTestId(`sidebar-nav-${section}`);
      await expect(navElement).toBeVisible({ timeout: 10000 });
      break;
    } catch (error) {
      attempts++;
      console.log(`Attempt ${attempts}: Navigation element not visible, trying to expand sidebar...`);
      
      // Try to expand the sidebar by clicking the logo
      try {
        const logo = page.locator('img[alt="BeeKeeper Logo"]');
        if (await logo.isVisible()) {
          await logo.click();
          await page.waitForTimeout(2000);
        }
      } catch (logoError) {
        console.log('Could not find logo to expand sidebar');
      }
      
      // If this is the last attempt, try to find it in the DOM anyway
      if (attempts === maxAttempts) {
        try {
          navElement = page.getByTestId(`sidebar-nav-${section}`);
          await expect(navElement).toBeAttached({ timeout: 10000 });
          
          // If found but not visible, try one more time to expand the sidebar
          if (!(await navElement.isVisible())) {
            await page.locator('img[alt="BeeKeeper Logo"]').click();
            await page.waitForTimeout(2000);
            await expect(navElement).toBeVisible({ timeout: 10000 });
          }
        } catch (finalError) {
          console.log(`Failed to find navigation element after ${maxAttempts} attempts`);
          throw finalError;
        }
      }
    }
  }
  
  if (navElement) {
    await navElement.click();
  } else {
    throw new Error(`Navigation element for section '${section}' not found`);
  }

  // The URL does NOT change. Wait for the heading of the new section to be visible.
  await expect(page.getByRole('heading', { name: headingName, exact: true })).toBeVisible({ timeout: 20000 });
} 