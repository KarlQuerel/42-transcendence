import home from "./views/home";

// TEST
import test from "./views/test";
// FIN TEST

// TODO KARL -> A FAIRE IMPORT TEST FROM PAGES/TEST.JS
// PUIS UPDATE LES ROUTES


/***			Define Routes				***/
const	routes =
{

	'/home' :
	{
		title: "Home",
		render: home
	},

	'/test' :
	{
		title: "Test",
		render: test
	}

};

/***			Router Function				***/
function router()
{
	const path = window.location.hash.slice(1) || '/home';
	const route = routes[path];
	if (route) {
		document.title = route.title;
		route.render();
	} else {
		// Handle 404 Not Found
		document.getElementById('app').innerHTML = '<h1>404 Not Found</h1>';
	}
}

// Initialize the router
window.addEventListener('load', router);
window.addEventListener('hashchange', router);


// OLD VERSION - TO KEEP JUST IN CASE -> DONT PUSH WITH IT

/*
document.addEventListener('DOMContentLoaded', () => {
	const routes = {


		// 'home': () => document.getElementById('app').innerHTML = `<h1>${T_VAR.HOME_TXT}</h1>`,
		'about': () => document.getElementById('app').innerHTML = `<h1>${T_VAR.ABOUT_TXT}</h1>`,
		'theteam': () => {
		document.getElementById('app').innerHTML = `
			<h1>${T_VAR.TEAM_TXT}</h1>
			<div class="team-container">
				<div class="team-member">
					<img src="imgs_spa/casomarr.jpg" alt="Carolina">
					<b><p>Carolina aka the Fist</p></b>
				</div>
				<div class="team-member">
					<img src="imgs_spa/jrouillo.jpg" alt="Jessica">
					<b><p>Jessica aka Spider-twerk</p></b>
				</div>
				<div class="team-member">
					<img src="imgs_spa/madavid.jpg" alt="Marine">
					<b><p>Marine aka the Glitterbox</p></b>
				</div>
				<div class="team-member">
					<img src="imgs_spa/cbernaze.jpg" alt="Clement">
					<b><p>Clement aka the Big Tub</p></b>
				</div>
				<div class="team-member">
					<img src="imgs_spa/kquerel.jpg" alt="Karl">
					<b><p>Karl aka K-K-Karl</p></b>
				</div>
			</div>
		`;},
		'login': () => {
			document.getElementById('app').innerHTML = `
				<h1>${T_VAR.LOGIN_TXT}</h1>
				<form id="loginForm">
					<div>
						<label for="username">Username:</label>
						<input type="text" id="username" name="username" required>
					</div>
					<div>
						<label for="password">Password:</label>
						<input type="password" id="password" name="password" required>
					</div>
					<button type="submit">Log In</button>
				</form>
			`;
			document.getElementById('loginForm').addEventListener('submit', handleLogin);
		}
	};

	function navigateTo(path) {
		const routeKey = path.startsWith('#') ? path.slice(1) : path;
		// Ensure the path starts with '/' to form a correct URL path
		const newPath = `/${routeKey}`;
		if (window.location.protocol !== "file:") {
			history.pushState({}, '', newPath);
		}
		if (routes[routeKey]) {
			routes[routeKey]();
		} else {
			console.error(`No route handler for ${routeKey}`);
		}
		console.log(`Navigating to ${routeKey}`);
	}

	function handleLogin(event) {
		event.preventDefault(); // Prevent the form from submitting through the browser
		const username = document.getElementById('username').value;
		const password = document.getElementById('password').value;

		// Replace 'https://yourserver.com/api/login' with your actual login endpoint
		fetch('https://yourserver.com/api/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ username, password }),
		})
		.then(response => {
			if (!response.ok) {
				throw new Error('Login failed');
			}
			return response.json();
		})
		.then(data => {
			console.log('Login successful:', data);
			// Handle login success, e.g., redirecting to another page or showing a success message
			navigateTo('home');
		})
		.catch(error => {
			console.error('Error during login:', error);
			// Handle login failure, e.g., showing an error message
			alert('Login failed. Please try again.');
		});
	}

	// Listen for hash changes
	window.addEventListener('hashchange', () => {
		const path = window.location.hash ? window.location.hash.slice(1) : '/';
		navigateTo(path);
	});

	// Adjust initial route handling
	const initialPath = window.location.hash ? window.location.hash.slice(1) : '/';
	navigateTo(initialPath);
});
*/