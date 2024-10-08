// What this tests:
// Navigate to the login page.
// Enter "carolina" in the email input.
// Enter "pass123" in the password input.
// Click the login button.
// Check if the console logs "success". //TODO: has to be added to Jess's code


const { test, expect } = require('@playwright/test');

test('should log in and check for success message', async ({ page }) => {
	await page.goto('https://localhost:4430/sign-in', { timeout: 60000 });

	// Enter email and password
	await page.fill('#email', 'carolina');
	await page.fill('#password', 'pass123');

	// Click the login button
	await page.click('#loginButton');

	// Wait for some time to let the console log appear
	await page.waitForTimeout(1000);

	// Listen for console log
	page.on('console', msg => {
		if (msg.type() === 'log' && msg.text() === 'Successfully logged in') {
			console.log('Success message found in console log');
		}
	});

	//Check if redirected to profile page once logged in
	expect(page.url()).toBe('https://localhost:4430/profile');
});