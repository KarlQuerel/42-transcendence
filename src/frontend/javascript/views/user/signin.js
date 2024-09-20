/***********************************************\
-			IMPORTING GLOBAL VARIABLES			-
\***********************************************/
import { DEBUG } from '../../main.js';

/***********************************************\
*                   RENDERING                   *
\***********************************************/
export default function renderSignIn()
{
	// Create the form element
	const form = document.createElement('form');
	form.setAttribute('id', 'sign-in-form');

	// Create email/username input
	const emailInput = document.createElement('input');
	emailInput.setAttribute('type', 'text');
	emailInput.setAttribute('id', 'email');
	emailInput.setAttribute('name', 'email');
	emailInput.setAttribute('placeholder', 'Email or Username');

	// Create password input
	const passwordInput = document.createElement('input');
	passwordInput.setAttribute('type', 'password');
	passwordInput.setAttribute('id', 'password');
	passwordInput.setAttribute('name', 'password');
	passwordInput.setAttribute('placeholder', 'Password');

	// Create log in button
	const loginButton = document.createElement('button');
	loginButton.setAttribute('type', 'submit');
	loginButton.textContent = 'Log In';

	// Create sign up button
	const signUpButton = document.createElement('button');
	signUpButton.setAttribute('type', 'button');
	signUpButton.setAttribute('id', 'sign-up-button');
	signUpButton.textContent = 'Sign Up';

	// Append the inputs and buttons to the form
	form.appendChild(emailInput);
	form.appendChild(passwordInput);
	form.appendChild(loginButton);
	form.appendChild(document.createElement('br')); // Line break
	form.appendChild(signUpButton);

	// Add event listener to the Sign Up button to redirect to /sign-up
	signUpButton.addEventListener('click', () =>
	{
		window.location.href = '/sign-up';
	});

	// Add event listener to the Log In button to handle login
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent the default form submission

        const username = emailInput.value;
        const password = passwordInput.value;


        if (DEBUG)
            console.log('About to sign in with:', username, password);

        login(username, password);
    });


	return form;
}




/***********************************************\
*                     LOGIN                     *
\***********************************************/

function login(username, password)
{
    fetch('/api/users/signInUser/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
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
            throw new Error('Login failed: No access token received');
    })
    .then(newAccessToken =>
    {
        if (DEBUG)
            console.log('Token refreshed:', newAccessToken);
        
        window.location.href = '/profile';
        console.log('Success:', username, 'is now logged in');
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Login failed: ' + error.message);
    });
}



/***********************************************\
*                 API FUNCTIONS                 *
\***********************************************/


// Get the access token from local storage and return it as a header object
export function getAuthHeaders() {
    const token = localStorage.getItem('access_token');
    if (!token) {
        throw new Error('No access token found');
    }
    return {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
    };
}


// Send a request to the server to refresh the access token
async function refreshToken() {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) {
        throw new Error('No refresh token found');
    }

    try {
        const response = await fetch('/api/token/refresh/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refresh: refreshToken }),
        });

        const data = await response.json();
        if (!data.access) {
            throw new Error('Failed to refresh token');
        }
        localStorage.setItem('access_token', data.access);
        return data.access;
    } catch (error) {
        console.error('Token refresh failed:', error);
        throw error;
    }
}


// Send a request to the server to refresh the access token
// Function to be called at every request

export async function apiRequest(url, options = {}) {
    try {
        // Attach the access token to the request headers
        options.headers = {
            ...options.headers,
            ...getAuthHeaders(),
        };
        
        let response = await fetch(url, options);
        
        // If the token has expired, refresh it and retry the request
        if (response.status === 401) {
            if (DEBUG)
                console.log('Token expired, refreshing...');
            const newAccessToken = await refreshToken();
            options.headers['Authorization'] = 'Bearer ' + newAccessToken;
            response = await fetch(url, options);
        }
        
        if (!response.ok) {
            throw new Error('Request failed');
        }

        return response.json();
    } catch (error) {
        console.error('API request error:', error);
        throw error;
    }
}






// OLD CODE
// async function refreshToken()
// {
//     const refreshToken = localStorage.getItem('refresh_token');
//     if (!refreshToken)
//         throw new Error('No refresh token found');

//     return fetch('/api/token/refresh/', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ refresh: refreshToken }),
//     })
//     .then(response => response.json())
//     .then(data => {
//         if (data.access) {
//             localStorage.setItem('access_token', data.access);
//             return data.access;
//         }
//         else
//             throw new Error('Failed to refresh token');
//     });
// }