/***********************************************\
-					IMPORTS						-
\***********************************************/
import { DEBUG, GITHUBACTIONS, setSignedInState }
from '../../main.js';

import { renderNavbar }
from '../navbar/navbar.js';

/***********************************************\
*					RENDERING					*
\***********************************************/
export function renderSignIn()
{
	// Create the form element
	const	form = document.createElement('form');
	form.setAttribute('id', 'sign-in-form');

	// Create email/username input
	const	emailInput = document.createElement('input');
	emailInput.setAttribute('type', 'text');
	emailInput.setAttribute('id', 'email');
	emailInput.setAttribute('name', 'email');
	emailInput.setAttribute('autocomplete', 'username');
	emailInput.setAttribute('placeholder', 'Username');
	emailInput.classList.add('form-input', 'sign-in-input');

	// Create password input
	const	passwordInput = document.createElement('input');
	passwordInput.setAttribute('type', 'password');
	passwordInput.setAttribute('id', 'password');
	passwordInput.setAttribute('name', 'password');
	passwordInput.setAttribute('autocomplete', 'current-password');
	passwordInput.setAttribute('placeholder', 'Password');
	passwordInput.classList.add('form-input', 'sign-in-input');

	// Create log in button
	const	loginButton = document.createElement('button');
	loginButton.setAttribute('type', 'submit');
	loginButton.textContent = 'Log In';
	loginButton.classList.add('btn', 'btn-home', 'sign-in-button');
	loginButton.id = 'loginButton';

	// Create sign up button
	const	signUpButton = document.createElement('button');
	signUpButton.setAttribute('type', 'button');
	signUpButton.setAttribute('id', 'sign-up-button');
	signUpButton.textContent = 'Sign Up';
	signUpButton.classList.add('btn', 'btn-home', 'sign-in-button');

	// Create a wrapper for buttons to align them horizontally
	const	buttonWrapper = document.createElement('div');
	buttonWrapper.classList.add('sign-in-wrapper');
	buttonWrapper.appendChild(loginButton);
	buttonWrapper.appendChild(signUpButton);

	// Append the inputs and buttons to the form
	form.appendChild(emailInput);
	form.appendChild(passwordInput);
	form.appendChild(buttonWrapper);

	// Add event listeners as before
	signUpButton.addEventListener('click', () =>
	{
		navigateTo('/sign-up');
	});

	form.addEventListener('submit', (event) =>
	{
		event.preventDefault(); // Prevent the default form submission

		const	username = emailInput.value;
		const	password = passwordInput.value;

		if (DEBUG)
			console.log('About to sign in with:', username, password);

		login(username, password);
	});

	return form;
}

/***********************************************\
*			 UTIL FUNCTIONS				*
\***********************************************/
export function getCookie(name)
{
	var	cookieValue = null;
	if (document.cookie && document.cookie !== '')
	{
		var	cookies = document.cookie.split(';');
		for (var	i = 0; i < cookies.length; i++)
		{
			var	cookie = cookies[i].trim();
			// Does this cookie string begin with the name we want?
			if (cookie.substring(0, name.length + 1) === (name + '='))
			{
				cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
				break;
			}
		}
	}
	return cookieValue;
}

/***********************************************\
*			 MAIN FUNCTION	 *
\***********************************************/
function login(username, password)
{
	if (DEBUG)
		console.log('Entering login function');

	fetch('/api/users/signInUser/',
	{
		method: 'POST',
		headers:
		{
			'Content-Type': 'application/json',
			'X-CSRFToken': getCookie('csrftoken'),
		},
		body: JSON.stringify({ username, password }),
	})
	.then(response => response.json())
	.then(data =>
	{
		if (data.is2fa == true)
		{
			localStorage.setItem('totp', data.totp);
			localStorage.setItem('username', data.username);
			navigateTo('/2fa-verification');
			return Promise.reject('Redirection to 2FA verification');
		}
		else if (data.access)
		{
			if (DEBUG)
				console.log('Data obtained. Generating tokens');

			// Store tokens in local storage
			localStorage.setItem('access_token', data.access);
			localStorage.setItem('refresh_token', data.refresh);
			return refreshToken();
		}
		else
		throw new Error('Username or password incorrect');
	})
	.then(newAccessToken =>
	{
		if (DEBUG)
			console.log('Token refreshed:', newAccessToken);
		if (GITHUBACTIONS)
			console.log('Login successful');
		setSignedInState(true);
		renderNavbar();
		userPingBackend();
		navigateTo('/profile');
	})
	.catch(error =>
	{
		if (error !== 'Redirection to 2FA verification')
		{
			console.error('Error:', error);
			alert('❌ Login failed: ' + error.message);
		}
	});
}

export function userPingBackend()
{
	const pingInterval = 30000;
	if (DEBUG)
		console.log('je passe dans le ping');
	apiRequest('api/users/update-online-status/', {
		method: 'POST',
	})
	.catch(error =>
	{
		console.error('Error: ', error);
	});
	setInterval(() => {
		apiRequest('api/users/update-online-status/', {
			method: 'POST',
		})
		.catch(error =>
		{
			console.error('Error: ', error);
		});
	}, pingInterval);
}

/***********************************************\
*					API FUNCTIONS				*
\***********************************************/

// Get the access token from local storage and return it as a header object
export function getAuthHeaders()
{
	const	token = localStorage.getItem('access_token');
	// if (!token)
	// 	throw new Error('No access token found');

	return {
		'Authorization': 'Bearer ' + token,
		'Content-Type': 'application/json',
	};
}

// Send a request to the server to refresh the access token
export async function refreshToken()
{
	const	refreshToken = localStorage.getItem('refresh_token');
	if (!refreshToken)
		throw new Error('No refresh token found');

	try
	{
		const	response = await fetch('/api/token/refresh/',
		{
			method: 'POST',
			headers:
			{
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ refresh: refreshToken }),
		});

		const	data = await response.json();
		if (!data.access)
			throw new Error('Failed to refresh token');

		localStorage.setItem('access_token', data.access);
		return data.access;
	}
	catch (error)
	{
		console.error('Token refresh failed:', error);
		throw error;
	}
}


// Send a request to the server to refresh the access token
// Function to be called at every request

export async function apiRequest(url, options = {})
{
	try
	{
		// Attach the access token to the request headers
		options.headers =
		{
			...options.headers,
			...getAuthHeaders(),
		};

		let response = await fetch(url, options);

		// If the token has expired, refresh it and retry the request
		if (response.status === 401)
		{
			if (DEBUG)
				console.log('Token expired, refreshing...');
			const	newAccessToken = await refreshToken();
			options.headers['Authorization'] = 'Bearer ' + newAccessToken;
			response = await fetch(url, options);
		}

		if (!response.ok)
		{
			const	errorData = await response.json();
			console.error('Server error:', errorData); // Log server-side error details
			throw new Error(errorData.error || 'Request failed');
		}

		return response.json();
	}
	catch (error)
	{
		console.error('API request error:', error);
		throw error;
	}
}
