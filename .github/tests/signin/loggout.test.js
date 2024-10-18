const { test, expect } = require('@playwright/test');

test('should log out', async ({ page }) => {
	await page.goto('https://localhost:4430/profile', { timeout: 60000 });
	console.log('In profile page');

	// Click the log out button
	await page.click('#logout-button');
	console.log('Logout button found');

	// Wait for some time to let the console log appear
	await page.waitForTimeout(1000);

	//Check if redirected to sign-in page once logged out
	expect(page.url()).toBe('https://localhost:4430/sign-in');
	console.log('In sign in page');
});