/***********************************************\
-			IMPORTING GLOBAL VARIABLES			-
\***********************************************/
import { DEBUG }
from '../../main.js';

import { apiRequest, getCookie }
from './signin.js';

/***********************************************\
*					RENDERING					*
\***********************************************/
export function renderChangePassword()
{
	// Main container
	const	container = document.createElement('div');
	container.classList.add('change-password-container', 'container');

	// Heading
	const	heading = document.createElement('h1');
	heading.textContent = 'Change Your Password';
	heading.classList.add('change-password-title', 'text-center');
	container.appendChild(heading);

	// Form element
	const	form = document.createElement('form');
	form.setAttribute('id', 'change-password-form');
	form.classList.add('needs-validation', 'd-flex', 'flex-column', 'align-items-center');
	container.appendChild(form);

	// Error message container
	const	errorMessageContainer = document.createElement('div');
	errorMessageContainer.setAttribute('id', 'error-message-change-password');
	errorMessageContainer.classList.add('error-message-change-password', 'col-12');
	form.appendChild(errorMessageContainer);

	// Hidden username field for accessibility
	const	usernameField = document.createElement('input');
	usernameField.setAttribute('type', 'text');
	usernameField.setAttribute('id', 'username');
	usernameField.setAttribute('name', 'username');
	usernameField.setAttribute('autocomplete', 'username');
	usernameField.setAttribute('style', 'display:none;');
	form.appendChild(usernameField);

	// Input fields with labels
	const	fields =
	[
		{ label: 'Current password:', type: 'password', id: 'current_password', placeholder: 'Enter current password', autocomplete: 'current-password' },
		{ label: 'New password:', type: 'password', id: 'new_password', placeholder: 'Enter new password', autocomplete: 'new-password' },
		{ label: 'New password confirmation:', type: 'password', id: 'new_password_confirmation', placeholder: 'Enter new password confirmation', autocomplete: 'new-password' }
	];

	fields.forEach(field =>
	{
		const	formGroup = document.createElement('div');
		formGroup.classList.add('form-group', 'col-md-6');

		const	label = document.createElement('label');
		label.setAttribute('for', field.id);
		label.textContent = field.label;
		label.classList.add('form-input', 'change-password-label', 'form-label');
		formGroup.appendChild(label);

		const	input = document.createElement('input');
		input.setAttribute('type', field.type);
		input.setAttribute('id', field.id);
		input.setAttribute('placeholder', field.placeholder);
		input.classList.add('form-input', 'change-password-input');
		if (field.autocomplete) input.setAttribute('autocomplete', field.autocomplete);
		formGroup.appendChild(input);

		// Error message container for each input field
		const	errorContainer = document.createElement('div');
		errorContainer.setAttribute('id', `${field.id}-error`);
		errorContainer.classList.add('error-message-change-password');
		formGroup.appendChild(errorContainer);

		form.appendChild(formGroup);
	});

	// Buttons container (submit + back to profile)
	const	buttonsContainer = document.createElement('div');
	buttonsContainer.classList.add('d-flex', 'justify-content-center', 'col-12', 'mt-3');

	// Submit button
	const	submitButton = document.createElement('button');
	submitButton.setAttribute('type', 'submit');
	submitButton.textContent = 'Submit';
	submitButton.classList.add('btn', 'btn-home', 'change-password-button');
	submitButton.id = 'submit-button';
	buttonsContainer.appendChild(submitButton);

	// Back to Profile button
	const	backButton = document.createElement('button');
	backButton.setAttribute('type', 'button');
	backButton.textContent = 'Back to Profile';
	backButton.classList.add('btn', 'btn-home', 'change-password-button');
	backButton.id = 'back-button';
	backButton.addEventListener('click', () => navigateTo('/profile'));
	buttonsContainer.appendChild(backButton);

	form.appendChild(buttonsContainer);

	return container;
}

export async function initializeChangePassword()
{
	const	form = document.getElementById('change-password-form');
	if (form)
	{
		form.addEventListener('submit', async (event) =>
		{
			event.preventDefault();

			const	currentPassword = document.getElementById('current_password').value;
			const	newPassword = document.getElementById('new_password').value;
			const	newPasswordConfirmation = document.getElementById('new_password_confirmation').value;

			// Clear previous error messages
			document.getElementById('error-message-change-password').innerHTML = '';
			document.getElementById('current_password-error').innerHTML = '';
			document.getElementById('new_password-error').innerHTML = '';

			// Check for empty fields
			if (!currentPassword || !newPassword || !newPasswordConfirmation)
			{
				document.getElementById('error-message-change-password').innerHTML = 'All fields are required';
				return;
			}

			 // Check for new password length
			if (newPassword.length < 6)
			{
				document.getElementById('error-message-change-password').innerHTML = 'New password must be at least 6 characters long.';
				return;
			}
			
			// Early check for new password matching
			if (newPassword !== newPasswordConfirmation)
			{
				document.getElementById('error-message-change-password').innerHTML = 'New password and confirmation do not match.';
				return;
			}

			try
			{
				// Verify current password at the start
				const	verifyResponse = await apiRequest('/api/users/verifyPassword/', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ current_password: currentPassword }),
				});

				// Current password valid, proceed with password change
				const	changeResponse = await apiRequest('/api/users/hashAndChangePassword/',
				{
					method: 'PUT',
					headers:
					{
						'Content-Type': 'application/json',
						'X-CSRFToken': getCookie('csrftoken'),
					},
					body: JSON.stringify({ newPassword }),
				});

				if (changeResponse.success)
				{
					navigateTo('/profile');
				}
				else
				{
					throw new Error(changeResponse.error || 'Password change failed');
				}
			}
			catch (error)
			{
				console.error('Error:', error);
				document.getElementById('error-message-change-password').innerHTML = 'Current password is incorrect. Please try again.';
			}
		});
	}
}