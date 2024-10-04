/***********************************************\
-		   IMPORTING VARIABLES/FUNCTIONS		-
\***********************************************/
import { DEBUG } from '../../main.js';
import { apiRequest } from './signin.js';

/***********************************************\
*                   RENDERING                   *
\***********************************************/

export default function renderUpdateProfile()
{
    // CMain container for the update-profile form
	const container = document.createElement('div');

    // Heading
	const heading = document.createElement('h1');
	heading.textContent = 'Update profile';
	heading.classList.add('form-input')
	container.appendChild(heading);

    // Form element
	const form = document.createElement('form');
	form.setAttribute('id', 'updateProfileForm');

    // Error message container
    const errorMessageContainer = document.createElement('div');
    errorMessageContainer.setAttribute('id', 'error-messages');
    errorMessageContainer.classList.add('error-messages');
    form.appendChild(errorMessageContainer);

    // Input fields with labels
	const fields =
	[
		{ label: 'First Name:', type: 'text', id: 'first_name', placeholder: 'Enter first name' },
		{ label: 'Last Name:', type: 'text', id: 'last_name', placeholder: 'Enter last name' },
		{ label: 'Username:', type: 'text', id: 'username', placeholder: 'Enter username', autocomplete: 'username' },
		{ label: 'Date of Birth:', type: 'date', id: 'date_of_birth', placeholder: '' },
		{ label: 'Password:', type: 'password', id: 'password', placeholder: 'Enter password', autocomplete: 'new-password' },
		{ label: 'Password Confirmation:', type: 'password', id: 'password_confirmation', placeholder: 'Enter password confirmation', autocomplete: 'new-password' },
		{ label: 'Email:', type: 'text', id: 'email', placeholder: 'Enter email', autocomplete: 'email' }
	];

    
}
