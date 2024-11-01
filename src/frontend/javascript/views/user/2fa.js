/***********************************************\
-			IMPORTING VARIABLES/FUNCTIONS		-
\***********************************************/
import { DEBUG, navigateTo, setSignedInState }
from '../../main.js';

import { refreshToken, userPingBackend }
from './signin.js';

import { renderNavbar }
from '../navbar/navbar.js';

/***********************************************\
*					RENDERING					*
\***********************************************/

export function render2fa()
{
	if (localStorage.getItem('access_token') || !localStorage.getItem('username'))
	{
		window.location.href = '/profile';
	}
	const form = render_form();
	document.body.appendChild(form);

	form.addEventListener('submit', function(event) {
		event.preventDefault();

		const totp = localStorage.getItem('totp');
		const code = document.getElementById('code').value;

		fetch('/api/users/verify-2fa-code/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			}, 
			body: JSON.stringify({code: code, totp: totp})
		})
		.then(response => response.json())
		.then(data => {
			if (data.access)
			{
				// Store tokens in local storage
				localStorage.setItem('access_token', data.access);
				localStorage.setItem('refresh_token', data.refresh);

				return refreshToken();
			}
			else
				throw new Error('No access token received');
		})
		.then(newAccessToken =>
		{
			if (DEBUG)
				console.log('Token refreshed:', newAccessToken);
			setSignedInState(true);
			renderNavbar();
			userPingBackend();
			window.history.replaceState({}, document.title, "/profile");
			navigateTo('/profile');
			if (DEBUG)
				console.log('Success:', localStorage.getItem('username'), 'is now logged in');
		})
		.catch(error => {
			console.error('Error:', error.message);
			alert('❌ Login failed: ' + error.message);
		});
	});
	return form;
}

function render_form()
{
	const formContainer = document.createElement('div');
	formContainer.classList.add('two-fa-container', 'container');

	const title = document.createElement('h1');
	title.textContent = "2fa Verification";
	title.classList.add('two-fa-title', 'text-center');
	formContainer.appendChild(title);

	const label = document.createElement('label');
	label.setAttribute('for', 'code');
	label.textContent = 'Enter the 2FA code your received by email:';
	label.classList.add('form-input', 'two-fa-label', 'form-label');
	formContainer.appendChild(label);

	const form = document.createElement('form');
	formContainer.setAttribute('id', 'two-fa-form');

	const codeInput = document.createElement('input');
	codeInput.setAttribute('type', 'code');
	codeInput.setAttribute('id', 'code');
	codeInput.setAttribute('name', 'code');
	codeInput.setAttribute('autocomplete', 'code');
	codeInput.setAttribute('placeholder', 'Enter the 2FA code you received');
	codeInput.classList.add('form-input', 'two-fa-input');
	form.appendChild(codeInput);

	const submitButton = document.createElement('button');
	submitButton.setAttribute('type', 'submit');
	submitButton.textContent = "Verify the code";
	submitButton.classList.add('btn', 'btn-home', 'two-fa-button');
	form.appendChild(submitButton);

	const resendButton = document.createElement('button');
	resendButton.setAttribute('type', 'button');
	resendButton.textContent = "Resend a code";
	resendButton.classList.add('btn', 'btn-home', 'two-fa-button');
	resendButton.addEventListener('click', function() {
		fetch('/api/users/resend-2fa-code/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
		})
		.then(response => response.json())
		.then(data => {
			alert(data.message || data.error);
		})
		.catch(error => {
			console.error('Error:', error);
			alert('❌ Failure to send a new code:' + error.message);
		})
	})
	form.appendChild(resendButton);

	const	buttonWrapper = document.createElement('div');
	buttonWrapper.classList.add('two-fa-wrapper');
	buttonWrapper.appendChild(submitButton);
	buttonWrapper.appendChild(resendButton);
	form.appendChild(buttonWrapper);

	const error_message = document.createElement('div');
	error_message.id = 'error-message';
	error_message.style.color = 'red';
	formContainer.appendChild(error_message);

	formContainer.appendChild(form);

	return formContainer;
}