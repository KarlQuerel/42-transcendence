const T_VAR = {
	HOME_TXT: "Welcome to our amazing Pong game.",
	ABOUT_TXT: "Pong is a two-dimensional sports game that simulates table tennis. The player controls an in-game paddle by moving it vertically across the left or right side of the screen. They can compete against another player controlling a second paddle on the opposing side. Players use the paddles to hit a ball back and forth.",
	TEAM_TXT: "Meet our incredible team.",
	LOGIN_TXT: "Log in to our amazing game"
};

document.addEventListener('DOMContentLoaded', () => {
    const routes = {
        'home': () => document.getElementById('app').innerHTML = `<h1>${T_VAR.HOME_TXT}</h1>`,
        'about': () => document.getElementById('app').innerHTML = `<h1>${T_VAR.ABOUT_TXT}</h1>`,
'theteam': () => {
    document.getElementById('app').innerHTML = `
        <style>
            .team-container {
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                gap: 20px;
            }
            .team-member {
                display: flex;
                flex-direction: column;
                align-items: center;
            }
            .team-member img {
                width: 500px; /* Adjust based on your preference */
                height: auto;
                border-radius: 50%; /* Optional: makes images circular */
                margin-bottom: 10px; /* Space between image and name */
            }
        </style>
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
    `;
},

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
		if (window.location.protocol !== "file:") {
			history.pushState({}, '', routeKey);
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

window.addEventListener('hashchange', function() {
    if (window.location.hash === '#theteam') {
        // When on the team page, remove the background image
        document.body.style.backgroundImage = 'none';
    } else {
        // For all other pages, set the background image back
        document.body.style.backgroundImage = "url('imgs_spa/transcendance.jpg')";
    }
});