import { NewUser } from "../../components/user/NewUser.js";

document.addEventListener('DOMContentLoaded', function () {
	document.querySelector('button[type="button"]').addEventListener('click', function () {
		fillVarFromData();
		// createNewUser();
		// console.log('New user created: ', username);
	});
});

function fillVarFromData() {
	getFormData();
	// checkDataValidity();
}

function getFormData() {
	const newUser = new NewUser(document.getElementById('username').value,
		document.getElementById('display_name').value,
		document.getElementById('password').value,
		document.getElementById('email').valu);

	console.log('Username:', newUser.username);
	console.log('Display Name:', newUser.display_name);
	console.log('Password:', newUser.password);
	console.log('Email:', newUser.email);
}

function checkDataValidity() {
	if (checkUsernameValidity() == false) {
		console.log('Error: bad username: ', username);
		return;
	}
	else if (checkDisplayNameValidity() == false) {
		console.log('Error: bad display name: ', display_name);
		return;
	}
	else if (checkPasswordValidity() == false) {
		console.log('Error: bad password: ', password);
		return;
	}
	else if (checkEmailValidity() == false) {
		console.log('Error: bad email: ', email);
		return;
	}
	login(username, password); // Pour les JWTokens (voir fonction en bas de page)
	console.log('All the user informations are valid');
}

function checkUsernameValidity() {
	if (username.length > 12) {
		return false;
	}
	return true;
}

function checkDisplayNameValidity() {
	return true;
}

function checkPasswordValidity() {
	return true;
}

function checkEmailValidity() {
	return true;
}


import { refreshToken } from '../../utils.js';

// Pour les JWTokens
function login(username, password) {
    fetch('/api/token/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.access) {
            localStorage.setItem('access_token', data.access);
            localStorage.setItem('refresh_token', data.refresh);
            
            // Call refreshToken to ensure tokens are up-to-date
            refreshToken().then(newAccessToken => {
                console.log('Token refreshed:', newAccessToken);
                // Redirect to profile or dashboard
            }).catch(error => {
                console.error('Token refresh failed:', error);
            });
        } else {
            console.error('Login failed');
        }
    })
    .catch(error => console.error('Error:', error));
}