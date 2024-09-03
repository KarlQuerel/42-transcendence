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


	// Return the form element
	return form;
}
