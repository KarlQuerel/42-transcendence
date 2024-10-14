const { test, expect } = require('@playwright/test');

test('should sign up and log in', async ({ page }) => {
	//Navigate to the sign-in page
	await page.goto('https://localhost:4430/sign-in', { timeout: 60000 });
	console.log('In sign in page');

	//Click on sign-up-button
	await page.click('#sign-up-button');
	console.log('Sign up button found');

	//Navigate to the sign-up page
	expect(page.url()).toBe('https://localhost:4430/sign-up');
	console.log('In sign-up page');

	//fill in the form with test user
	await page.fill('#first_name', 'firstname');
	await page.fill('#last_name', 'lastname');
	await page.fill('#username', 'username');
	await page.fill('#date_of_birth', '1999-01-01');
	await page.fill('#password', 'pass123');
	await page.fill('#password_confirmation', 'pass123');
	await page.fill('#email', 'test@gmail.com');
	console.log('User info entered');

	//click on submit button
	await page.click('#submit-button');
	console.log('Submit button found');

	await page.goto('https://localhost:4430/sign-in', { timeout: 10000 });
	
	// Check if it automatically redirects to the sign-in page
	expect(page.url()).toBe('https://localhost:4430/sign-in');
	console.log('In sign in page');

	// Enter email and password
	await page.fill('#email', 'username');
	await page.fill('#password', 'pass123');
	console.log('User info entered');

	// Click the login button
	await page.click('#loginButton');
	console.log('Login button found');
	
	// Wait for some time to let the console log appear
	await page.waitForTimeout(1000);

	// Listen for console log
	page.on('console', msg => {
		if (msg.type() === 'log' && msg.text() === 'Successfully logged in')
			console.log('Success message found in console log');
	});
	console.log('Successfully loged in');

	//Check if redirected to profile page once logged in
	expect(page.url()).toBe('https://localhost:4430/profile');
	console.log('In profile page');
});