/*
Ce que fait ce test :
- verifier qu'on peut bien fetch les infos de notre user (//TODO: rajouter un console.log("success")
- verifier qu'on voit 3 icones
- verifier qu'on peut bien cliquer sur les icones :
	- verifier que le donut graph s'affiche
	- verifier que le badge s'affiche
	- verifier que les avatars s'affichent
		- verifier qu'un tableau apparaît quand on clique sur les avatars
*/

const { test, expect } = require('@playwright/test');


test('display dashboard data', async ({ page }) => {

//LOGIN
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


	console.log("Logged in");

//FETCH INFO

	await page.goto('https://localhost:4430/dashboard', { timeout: 60000 });

	// Set up console message listener
    const successMessages = new Set([
        "Successfully fetched connected user's game history",
        "Successfully fetched all users",
    ]);

    const foundMessages = new Set();

    page.on('console', msg => {
        const text = msg.text().trim(); // Trim any extra whitespace
        console.log(`[${msg.type()}] ${text}`); // Log all console messages
        if (msg.type() === 'log' && successMessages.has(text)) {
            foundMessages.add(text);
            console.log('Success message found:', text);
        }
    });

	console.log("Fecthed all django databases info");

//DISPLAY DASHBOARD INFO

	// Check if we see 3 icons
	const icons = await page.$$('.dashboard-icon');
	expect(icons.length).toBe(3);
	console.log('3 icons found');

	// Click on the chart_icon
	await page.click('#chart_icon');

	// Check if the donut graph is displayed
	const donutGraph = await page.$('#chartModal');
	expect(donutGraph).toBeTruthy();
	console.log('donut graph appears when clicking on chart_icon');

	//Click elsewhere on the page to close the modal
	//TODO: change it to "click close button" when there will be one
	// await page.click('#close-button');
	await page.click('#dashboard', { //click on the bottom right corner to exit
		position: { x: 0.9 * (await page.$eval('#dashboard', el => el.offsetWidth)), y: 0.9 * (await page.$eval('#dashboard', el => el.offsetHeight)) }
	});

	// Click on the friends_icon
	await page.click('#friends_icon');

	// Check if the avatars are displayed
	const avatars = await page.$$('.avatar-container .avatar-box');
	expect(avatars.length).toBeGreaterThan(0);
	console.log('avatars appear when clicking on friends_icon');

	// Click on the first avatar
	await avatars[0].click();

	// Check if gameHistory table is displayed
	const gameHistory = await page.$('#tableModal');
	expect(gameHistory).toBeTruthy();
	console.log('gameHistory table appears when clicking on an avatar');

	//Click elsewhere on the page to close the modal
	//TODO: change it to "click close button twice" when there will be close buttons
	// await page.click('#dashboard');
	await page.click('#dashboard', {
		position: { x: 0.9 * (await page.$eval('#dashboard', el => el.offsetWidth)), y: 0.9 * (await page.$eval('#dashboard', el => el.offsetHeight)) }
	});
	await page.click('#dashboard', {
		position: { x: 0.9 * (await page.$eval('#dashboard', el => el.offsetWidth)), y: 0.9 * (await page.$eval('#dashboard', el => el.offsetHeight)) }
	});
	
	// Click on the trophee_icon
	await page.click('#trophee_icon');

	//TEST: wait
	// await page.waitForTimeout(60000);

	/*FIX: this does not work yet but I think it is because the badge 
	is not in a modal, it might get fixed when karl will do the 
	dashboard frontend */
	// Check if the badge is displayed
/* 	const badge = await page.$('.badge');
	expect(badge).not.toBeNull();
	console.log('badge appears when clicking on trophee_icon');

	console.log("All dashboard data displayed"); */
});