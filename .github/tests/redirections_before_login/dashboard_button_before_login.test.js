const { test, expect } = require('@playwright/test');

test('Dashboard button should navigate to the dashboard page and show "not connected" giff', async ({ browser }) => {
  const context = await browser.newContext({
    ignoreHTTPSErrors: true,  // Ignore SSL certificate errors
  });

  const page = await context.newPage();

  // Log when navigation starts
  console.log('Navigating to https://localhost:4430');
  
  await page.goto('https://localhost:4430', { timeout: 60000 });

  // Log the current page URL
  console.log('Current URL:', await page.url());

  // Log page content before waiting for the selector
  // const content = await page.content();
  // console.log('Page content before waiting for button:', content);

  //TODO: check if giff is shown

  // Wait for the pong button
  await page.waitForSelector('#dashboard_button', { timeout: 60000 });

  console.log('dashboard button found, clicking it...');
  
  // Simulate clicking the pong button
  await page.click('#dashboard_button');

  // Verify navigation
  await expect(page).toHaveURL(/dashboard/); //CHECK: does giff appear in /pong or /home page?
});
