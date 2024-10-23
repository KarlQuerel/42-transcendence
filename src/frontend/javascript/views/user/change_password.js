/***********************************************\
-			IMPORTING GLOBAL VARIABLES			-
\***********************************************/
import { DEBUG }
from '../../main.js';

import { apiRequest, getCookie }
from './signin.js';


/***********************************************\
*                   RENDERING                   *
\***********************************************/

export function renderChangePassword()
{
    // Create the main container for the sign-up form
	const container = document.createElement('div');

    // Create the heading
	const heading = document.createElement('h1');
	heading.textContent = 'Change Password';
	heading.classList.add('form-input')
	container.appendChild(heading);

    // Create the form element
	const form = document.createElement('form');
	form.setAttribute('id', 'setPasswordForm');

    // Create an error message container
    const errorMessageContainer = document.createElement('div');
    errorMessageContainer.setAttribute('id', 'error-messages');
    errorMessageContainer.classList.add('error-messages');
    form.appendChild(errorMessageContainer);

    // Create input fields with labels
	const fields =
	[
		{ label: 'Current password:', type: 'password', id: 'current_password', placeholder: 'Enter current password', autocomplete: 'current-password' },
		{ label: 'New password:', type: 'password', id: 'new_password', placeholder: 'Enter new password', autocomplete: 'new-password' },
		{ label: 'New password confirmation:', type: 'password', id: 'new_password_confirmation', placeholder: 'Enter new password confirmation', autocomplete: 'new-password' }
	];

    fields.forEach(field =>
        {
            const formGroup = document.createElement('div');
            formGroup.classList.add('form-group');
    
            const label = document.createElement('label');
            label.setAttribute('for', field.id);
            label.textContent = field.label;
            label.classList.add('form-input');
            formGroup.appendChild(label);
    
            const input = document.createElement('input');
            input.setAttribute('type', field.type);
            input.setAttribute('id', field.id);
            input.setAttribute('placeholder', field.placeholder);
            input.classList.add('form-input');
            formGroup.appendChild(input);
    
            form.appendChild(formGroup);
        });

    // Create the submit button
	const submitButton = document.createElement('button');
	submitButton.setAttribute('type', 'submit');
	submitButton.textContent = 'Submit';
	submitButton.classList.add('form-input');
	form.appendChild(submitButton);

    // Append the form to the container
	container.appendChild(form);

    return container;
}


export async function initializeChangePassword()
{
    const form = document.getElementById('setPasswordForm');
    if (form)
    {
        form.addEventListener('submit', async (event) =>
        {
            event.preventDefault(); // Prevent default form submission
    
            const currentPassword = document.getElementById('current_password').value;
            const newPassword = document.getElementById('new_password').value;
            const newPasswordConfirmation = document.getElementById('new_password_confirmation').value;
    
            // Check if new password and new password confirmation match
            if (newPassword !== newPasswordConfirmation)
            {
                const errorMessageContainer = document.getElementById('error-messages');
                errorMessageContainer.innerHTML = '';
                const errorMessage = document.createElement('p');
                errorMessage.textContent = 'New password and new password confirmation do not match.';
                errorMessageContainer.appendChild(errorMessage);
                return ;
            }

            try
            {
                // Check if the user is authenticated
                const authResponse = await apiRequest('/api/users/checkAuthentication/', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!authResponse.authenticated) {
                    throw new Error('User not authenticated');
                }

                // Verify current password
                const verifyResponse = await apiRequest('/api/users/verifyPassword/',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ currentPassword }),
                });

                if (verifyResponse.valid)
                {
                    // Change password
                    const changeResponse = await apiRequest('/api/users/hashAndChangePassword/',
                    {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'X-CSRFToken': getCookie('csrftoken'),
                        },
                        body: JSON.stringify({ newPassword }),
                    });

                    if (changeResponse.success)
                    {
                        alert.success('Password changed successfully');
                        navigateTo('/profile');
                    }
                    else
                        throw new Error(changeResponse.error || 'Password change failed');
                }
                else
                {
                    const errorMessageContainer = document.getElementById('error-messages');
                    errorMessageContainer.innerHTML = '';
                    const errorMessage = document.createElement('p');
                    errorMessage.textContent = 'Old password is incorrect.';
                    errorMessageContainer.appendChild(errorMessage);
                }
            }
            catch (error)
            {
                console.error('Error:', error);
                alert('Password change failed: ' + error.message);
            }
        });
    }
}