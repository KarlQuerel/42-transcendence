/***********************************************\
-			IMPORTING GLOBAL VARIABLES			-
\***********************************************/
import { DEBUG } from '../../main.js';


/***********************************************\
*                   RENDERING                   *
\***********************************************/

export default function renderSignUp()
{
	// Create the main container for the sign-up form
	const container = document.createElement('div');

	// Create the heading
	const heading = document.createElement('h1');
	heading.textContent = 'Sign Up';
	heading.classList.add('form-input')
	container.appendChild(heading);

	// Create the form element
	const form = document.createElement('form');
	form.setAttribute('id', 'signupForm');

	// Create input fields with labels
	const fields =
	[
		{ label: 'First Name:', type: 'text', id: 'first_name', placeholder: 'Enter first name' },
		{ label: 'Last Name:', type: 'text', id: 'last_name', placeholder: 'Enter last name' },
		{ label: 'Username:', type: 'text', id: 'username', placeholder: 'Enter username' },
		{ label: 'Date of Birth:', type: 'date', id: 'date_of_birth', placeholder: '' },
		{ label: 'Password:', type: 'password', id: 'password', placeholder: 'Enter password' },
		{ label: 'Password Confirmation:', type: 'password', id: 'password_confirmation', placeholder: 'Enter password confirmation' },
		{ label: 'Email:', type: 'text', id: 'email', placeholder: 'Enter email' }
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

	// Add event listener to the Submit button to redirect to /sign-in
	submitButton.addEventListener('click', () =>
	{
		window.location.href = '/sign-in';
	});

	return container;
}


export function initializeSignUp() {
	const	form = document.getElementById('signupForm');
	if (form)
	{
		form.addEventListener('submit', function (event)
		{
			event.preventDefault(); // Prevent default form submission

            // First name
            let first_name = getIdentifier('first_name');
            let first_name_type = checkIdentifierType(first_name, 'first_name');
            // if (DEBUG)
            // {
            //     console.log('First name:', first_name);
            //     console.log('First name type:', first_name_type);
            // }

            // Last name
            let last_name = getIdentifier('last_name');
            let last_name_type = checkIdentifierType(last_name, 'last_name');
            // if (DEBUG)
            // {
            //     console.log('Last name:', last_name);
            //     console.log('Last name type:', last_name_type);
            // }

            // Username
            let username = getIdentifier('username');
            let username_type = checkIdentifierType(username, 'username');
            // if (DEBUG)
            // {
            //     console.log('Username:', username);
            //     console.log('Username type:', username_type);
            // }

            // Date of birth
            let date_of_birth = getIdentifier('date_of_birth');
            let date_of_birth_type = checkIdentifierType(date_of_birth, 'date_of_birth');
            // if (DEBUG)
            // {
            //     console.log('Date_of_birth:', date_of_birth);
            //     console.log('Date_of_birth type:', date_of_birth_type);
            // }

            // Password
            let password = getIdentifier('password');
            let password_type = checkIdentifierType(password, 'password');
            // if (DEBUG)
            // {
            //     console.log('Password:', password);
            //     console.log('Password type:', password_type);
            // }

            // Password confirmation
            let password_confirmation = getIdentifier('password_confirmation');
            let password_confirmation_type = checkIdentifierType(password_confirmation, 'password_confirmation');
            // if (DEBUG)
            // {
            //     console.log('Password_confirmation:', password_confirmation);
            //     console.log('Password_confirmation type:', password_confirmation_type);
            // }

            // Email
            let email = getIdentifier('email');
            let email_type = checkIdentifierType(email, 'email');
            // if (DEBUG)
            // {
            //     console.log('Email:', email);
            //     console.log('Email type:', email_type);
            // }

			if (!allValuesAreValid(first_name_type, last_name_type, username_type, date_of_birth_type, password_type, email_type) || password !== password_confirmation)
			{
				if (password !== password_confirmation)
					console.log('Error: Password and password confirmation do not match.');
				sendErrorToConsole(first_name_type, last_name_type, username_type, date_of_birth_type, password_confirmation_type, password_type, email_type);
				return ;
			}
			else
				addNewUser(username, password, email, date_of_birth, first_name, last_name);
		});
	}
	else
		console.error('Form not found.');
}



/************* Value Checking Functions *************/

function getIdentifier(str)
{
	return document.getElementById(str).value;
}

function checkIdentifierType(identifier, str)
{
    if (str == 'first_name' && isValidFirstName(identifier) == true)
		return 'first_name';
    if (str == 'last_name' && isValidLastName(identifier) == true)
		return 'last_name';
    if (str == 'date_of_birth' && isValidDateOfBirth(identifier) == true)
        return 'date_of_birth';
	if (str == 'username' && isValidUsername(identifier) == true)
		return 'username';
    if (str == 'password' && isValidPassword(identifier) == true)
		return 'password';
    if (str == 'email' && isValidEmail(identifier) == true)
        return 'email';
    if (str == 'password_confirmation' && identifier != '')
		return 'password';
	return 'error';
}

function isValidFirstName(first_name)
{
    const acceptedCharacters = /^[\p{L}\p{Nl}]+$/u;

    if (first_name.length > 30)
        return false;
    else if (acceptedCharacters.test(first_name) == false)
        return false;
    return true;
}

function isValidLastName(last_name)
{
    const acceptedCharacters = /^[\p{L}\p{Nl}\s\-]+$/u;

    if (last_name.length > 30)
        return false;
    else if (acceptedCharacters.test(last_name) == false)
        return false;
    return true;
}

function isValidDateOfBirth(date_of_birth)
{
    const acceptedCharacters = /^\d{4}-\d{2}-\d{2}$/;

    if (acceptedCharacters.test(date_of_birth) == false)
        return false;
    return true;
}

function isValidUsername(username)
{
	const acceptedCharacters = /^[a-zA-Z0-9_-]+$/;

	if (username.length >= 12)
		return false;
	else if (acceptedCharacters.test(username) == false)
		return false;
	return true;
}

function isValidPassword(password)
{
    const minLength = 6;

    if (password.length < minLength)
        return false;
    return true;
}

function isValidEmail(email) {
	const acceptedCharacters = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const [localPart, domainPart] = email.split('@');

	if (acceptedCharacters.test(email) == false)
		return false;
	if (localPart.length > 64)
		return false;
	if (domainPart.length > 255)
		return false;
	return true;
}

function allValuesAreValid(first_name_type, last_name_type, username_type, date_of_birth_type, password_type, email_type)
{
	if (first_name_type == 'error' || last_name_type == 'error' || username_type == 'error' || date_of_birth_type == 'error' || password_type == 'error' || email_type == 'error')
		return false;
	return true;
}

function sendErrorToConsole(first_name_type, last_name_type, username_type, date_of_birth_type, password_confirmation_type, password_type, email_type)
{
    if (first_name_type == 'error')
        console.log('Error: bad first name. First name must be less than 30 characters and can only contain letters.');

    if (last_name_type == 'error')
        console.log('Error: bad last name. Last name must be less than 30 characters and can only contain letters, spaces, and hyphens.');

	if (date_of_birth_type == 'error')
		console.log('Error: bad date of birth.');

    if (username_type == 'error')
        console.log('Error: bad username. Username has to be less than 13 characters and can only contain letters, numbers, underscores, and hyphens.');

    if (password_type == 'error')
        console.log('Error: bad password. Password has to be at least 6 characters long.');

    if (email_type == 'error')
        console.log('Error: bad email.');
}

/****************************************************/


function addNewUser(username, password, email, date_of_birth, first_name, last_name)
{
	fetch('/api/users/addUser/',
	{
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			username,
			password1: password,
			password2: password,
			email,
			date_of_birth,
			first_name,
			last_name }),
	})
	.then(response =>
	{
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		return response.json();
	})
	.then(data =>
	{
		const	maskedPassword = '*'.repeat(password.length);
		const	safeData = { ...data, password: maskedPassword };
		console.log('Success:', safeData);
	})
	.catch((error) =>
	{
		console.error('Error:', error);
	});

}
