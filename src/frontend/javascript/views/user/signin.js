/***********************************************\
-				RENDERING						-
\***********************************************/
export default function renderSignIn()
{
	// Create the form element
	const form = document.createElement('form');
	form.setAttribute('id', 'sign-in-form');
	// TODO: JESS peut etre passer de GET a POST avec ca:
	// form.setAttribute('method', 'POST'); // Change the method to POST


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


        console.log('Logging in with:', username, password); // DEBUG
        login(username, password);
    });


	// Return the form element
	return form;
}




// Pour les JWTokens

// Function to get CSRF token from cookie
function getCsrfTokenFromCookie() {
    
    console.log('Je rentre dans la fonction getCsrfTokenFromCookie'); // DEBUG

    const name = 'csrftoken';
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name + '=')) {
            return cookie.substring(name.length + 1);
        }
    }
    console.error('CSRF token not found in cookies');
    throw new Error('CSRF token not found in cookies');
}

function login(username, password)
{
    console.log('Je rentre dans la fonction login'); // DEBUG

    let csrfHeaderName = 'X-CSRF-TOKEN'; // Adjust this based on your backend requirements
    let csrfHeaderValue;

    try {
        csrfHeaderValue = getCsrfTokenFromCookie();
    } catch (error)
    {
        console.error('Error getting CSRF token:', error);
        alert('CSRF token not found. Please refresh the page and try again.');
        return;
    }

    console.log('debug:'); // DEBUG
    console.log('debug:', csrfHeaderName, csrfHeaderValue); // DEBUG

    fetch('/api/users/signInUser/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            [csrfHeaderName]: csrfHeaderValue,
        },
        body: JSON.stringify({ username, password }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Response je passe par là:', data); // DEBUG
        if (data.access)
		{
            // Store tokens in local storage
            localStorage.setItem('access_token', data.access);
            localStorage.setItem('refresh_token', data.refresh);

            // Optionally, call refreshToken to ensure tokens are up-to-date
            return refreshToken();
        }
		else
            throw new Error('Login failed: Wrong udsername and/or password.');
    })
    .then(newAccessToken => {
        console.log('Token refreshed:', newAccessToken); // DEBUG
        window.location.href = '/home';
    })
    .catch(error => {
        console.error('Error:', error);
        if (error.message.includes('CSRF'))
            alert('CSRF Token mismatch. Please try again.');
        else if (error.message.includes('Failed to refresh token'))
            alert('Failed to refresh token. Please check your internet connection and try again.');
        else
            alert('Login failed: ' + error.message);
    });
}

async function refreshToken()
{
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken)
        throw new Error('No refresh token found');

    return fetch('/api/token/refresh/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh: refreshToken }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.access) {
            localStorage.setItem('access_token', data.access);
            return data.access;
        }
		else
            throw new Error('Failed to refresh token');
    });
}
