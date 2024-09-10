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

            // Optionally, call refreshToken to ensure tokens are up-to-date
            return refreshToken();
        }
		else
            throw new Error('Login failed: No access token received');
    })
    .then(newAccessToken => {
        console.log('Token refreshed:', newAccessToken); // DEBUG
        // Handle successful login (e.g., redirect to dashboard)
        // Example:
        window.location.href = '/home';
    })
    .catch(error => {
        console.error('Error:', error);
        // Optionally, display an error message to the user
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


// function login(username, password)
// {
//     fetch('/api/token/',
// 	{
//         method: 'POST',
//         headers:
// 		{
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ username: username, password: password }),
//     })
//     .then(response => response.json())
//     .then(data =>
// 	{
//         if (data.access)
// 		{
//             localStorage.setItem('access_token', data.access);
//             localStorage.setItem('refresh_token', data.refresh);
            
//             // Call refreshToken to ensure tokens are up-to-date
//             refreshToken().then(newAccessToken =>
// 			{
//                 console.log('Token refreshed:', newAccessToken);
//                 // Redirect to profile or dashboard
//             })
// 			.catch(error => {
//                 console.error('Token refresh failed:', error);
//             });
//         }
// 		else
// 		{
//             console.error('Login failed');
//         }
//     })
//     .catch(error => console.error('Error:', error));
// }


// async function refreshToken()
// {
//     const refreshToken = localStorage.getItem('refresh_token');
//     return fetch('/api/token/refresh/', {
//         method: 'POST',
//         headers:
// 		{
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ refresh: refreshToken }),
//     })
//     .then(response => response.json())
//     .then(data => {
//         if (data.access)
// 		{
//             localStorage.setItem('access_token', data.access);
//             return data.access;
//         }
// 		else
// 		{
//             throw new Error('Token refresh failed');
//         }
//     });
// }
