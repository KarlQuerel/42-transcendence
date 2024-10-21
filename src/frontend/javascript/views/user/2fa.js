/***********************************************\
-		   IMPORTING VARIABLES/FUNCTIONS		-
\***********************************************/
import { DEBUG } from '../../main.js';
import { refreshToken, apiRequest } from './signin.js';

/***********************************************\
*                   RENDERING                   *
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
			
			window.location.href = '/profile';
            window.history.replaceState({}, document.title, "/profile");
			console.log('Success:', localStorage.getItem('username'), 'is now logged in');
		})
		.catch(error => {
			console.error('Error:', error.message);
			alert('Login failed: ' + error.message);
		});
    });
    return form;
}

function render_form()
{
	const formContainer = document.createElement('div');
    formContainer.id = '2fa-form-container';

    const title = document.createElement('h2');
    title.textContent = "2fa Verification";
    formContainer.appendChild(title);

    const form = document.createElement('form');
    form.id = '2fa-form';

    const label = document.createElement('label');
    label.setAttribute('for', 'code');
    label.textContent = 'Enter the 6 digits code your received:';
    form.appendChild(label);

    const input = document.createElement('input');
    input.type = 'text';
    input.id = 'code';
    input.name = 'code';
    input.required = true;
    form.appendChild(input);

    const submit_button = document.createElement('button');
    submit_button.type = 'submit';
    submit_button.textContent = "Verify the code";
    form.appendChild(submit_button);

    const resend_button = document.createElement('button');
    resend_button.type = 'button';
    resend_button.textContent = "Resend a code";
    resend_button.addEventListener('click', function() {
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
            alert('Failure to send a new code:' + error.message);
        })
    })
    form.appendChild(resend_button);

    const error_message = document.createElement('div');
    error_message.id = 'error-message';
    error_message.style.color = 'red';
    formContainer.appendChild(error_message);

	formContainer.appendChild(form);

    return formContainer;
}