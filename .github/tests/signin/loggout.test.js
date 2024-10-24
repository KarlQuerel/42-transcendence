const { test, expect } = require('@playwright/test');

test('should log out', async ({ page }) => {
//LOG IN
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

	// await page.goto('https://localhost:4430/profile', { timeout: 60000 });
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