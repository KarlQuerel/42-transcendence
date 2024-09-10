/*** Render Function ***/
export default function renderSignUp()
{
	return `

        <h1>Sign Up</h1>
        <form>

        <div class="form-group">
            <label for="first_name">First Name:</label>
            <input type="text" id="first_name" placeholder="Enter first name">
        </div>

        <div class="form-group">
            <label for="last_name">Last Name:</label>
            <input type="text" id="last_name" placeholder="Enter last name">
        </div>

        <div class="form-group">
            <label for="username">Username:</label>
            <input type="text" id="username" placeholder="Enter username">
        </div>

        <div class="form-group">
            <label for="date_of_birth">Date of birth:</label>
            <input type="date" class="form-control" id="date_of_birth" placeholder="Enter date of birth">
        </div>

        <div class="form-group">
            <label for="password">Password:</label>
            <input type="password" id="password" placeholder="Enter password">
        </div>

        <div class="form-group">
            <label for="password_confirmation">Password confirmation:</label>
            <input type="password" id="password_confirmation" placeholder="Enter password confirmation">
        </div>

        <div class="form-group">
            <label for="email">Email:</label>
            <input type="text" id="email" placeholder="Enter email">
        </div>

        <button type="button">Submit</button>
        </form>

    `;
}



/*** Initialization Function for Signup Route ***/
export function initializeSignUp() {
    const button = document.querySelector('button[type="button"]');
    if (button)
    {
        button.addEventListener('click', function ()
        {

            // first name
            let first_name = getIdentifier('first_name');
            let first_name_type = checkIdentifierType(first_name);

            // last name
            let last_name = getIdentifier('last_name');
            let last_name_type = checkIdentifierType(last_name);

            // username
            let username = getIdentifier('username');
            let username_type = checkIdentifierType(username);

            // date of birth
            let date_of_birth = getIdentifier('date_of_birth');
            let date_of_birth_type = checkIdentifierType(date_of_birth);

            // password
            let password = getIdentifier('password');
            let password_type = checkIdentifierType(password);

            // password confirmation
            let password_confirmation = getIdentifier('password_confirmation');
            let password_confirmation_type = checkIdentifierType(password_confirmation);

            // email
            let email = getIdentifier('email');
            let email_type = checkIdentifierType(email);

            if (allValuesAreValid(first_name_type, last_name_type, username_type, date_of_birth_type, password_type, email_type) == false || password != password_confirmation)
            {
                if (password != password_confirmation)
                    console.log('Error: Password and password confirmation do not match.');
                sendErrorToConsole(first_name_type, last_name_type, username_type, date_of_birth_type, password_confirmation_type, password_type, email_type);
                return;
            }
            else
			    addNewUser(username, password, email, date_of_birth, first_name, last_name);
        });
    }
    else
		console.error('Button not found.');
}



/************* Value Checking Functions *************/

function getIdentifier(str)
{
	return document.getElementById(str).value;
}

function checkIdentifierType(identifier)
{
    if (isValidFirstName(identifier) == true)
		return 'first_name';
    if (isValidLastName(identifier) == true)
		return 'last_name';
    if (isValidDateOfBirth(identifier) == true)
        return 'date_of_birth';
	if (isValidUsername(identifier) == true)
		return 'username';
    if (isValidPassword(identifier) == true)
		return 'password';
    if (isValidEmail(identifier) == true)
        return 'email';
	return 'error';
}

function isValidFirstName(first_name)
{
    const usernamePattern = /^[\p{L}\p{Nl}]+$/u;

    if (first_name.length > 30)
        return false;
    else if (usernamePattern.test(first_name) == false)
        return false;
    return true;
}

function isValidLastName(last_name)
{
    const usernamePattern = /^[\p{L}\p{Nl}\s\-]+$/u;

    if (last_name.length > 30)
        return false;
    else if (usernamePattern.test(last_name) == false)
        return false;
    return true;
}

function isValidDateOfBirth(date_of_birth)
{
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;

    if (datePattern.test(date_of_birth) == false)
        return false;
    return true;
}

function isValidUsername(username)
{
	const usernamePattern = /^[a-zA-Z0-9_-]+$/;

	if (username.length > 12)
		return false;
	else if (usernamePattern.test(username) == false)
		return false;
	return true;
}

function isValidPassword(password)
{
    const minLength = 8;
    const uppercasePattern = /[A-Z]/;
    const lowercasePattern = /[a-z]/;
    const digitPattern = /[0-9]/;

    if (password.length < minLength)
        return false;
    if (!uppercasePattern.test(password))
        return false;
    if (!lowercasePattern.test(password))
        return false;
    if (!digitPattern.test(password))
        return false;
    return true;
}

function isValidEmail(email) {
	const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const [localPart, domainPart] = email.split('@');

	if (emailPattern.test(email) == false)
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
        console.log('Error: bad first name.');

    if (last_name_type == 'error')
        console.log('Error: bad last name.');

    if (date_of_birth_type == 'error')
        console.log('Error: bad date of birth.');

    if (username_type == 'error')
        console.log('Error: bad username. Username has to be less than 12 characters and can only contain letters, numbers, underscores, and hyphens.');
    
    if (password_type == 'error')
        console.log('Error: bad password. Password has to be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one digit.');
    
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
        const maskedPassword = '*'.repeat(password.length);
        const safeData = { ...data, password: maskedPassword };
        console.log('Success:', safeData);
    })
    .catch((error) =>
    {
        console.error('Error:', error);
    });

}






// // import { NewUser } from "../../components/user/NewUser.js";




// document.addEventListener('DOMContentLoaded', function () {
// 	document.querySelector('button[type="button"]').addEventListener('click', function () {
// 		fillVarFromData();
// 		// createNewUser();
// 		// console.log('New user created: ', username);
// 	});
// });

// function fillVarFromData() {
// 	getFormData();
// 	// checkDataValidity();
// }

// function getFormData() {
// 	const newUser = new NewUser(document.getElementById('username').value,
// 		document.getElementById('display_name').value,
// 		document.getElementById('password').value,
// 		document.getElementById('email').valu);

// 	console.log('Username:', newUser.username);
// 	console.log('Display Name:', newUser.display_name);
// 	console.log('Password:', newUser.password);
// 	console.log('Email:', newUser.email);
// }

// function checkDataValidity() {
// 	if (checkUsernameValidity() == false) {
// 		console.log('Error: bad username: ', username);
// 		return;
// 	}
// 	else if (checkDisplayNameValidity() == false) {
// 		console.log('Error: bad display name: ', display_name);
// 		return;
// 	}
// 	else if (checkPasswordValidity() == false) {
// 		console.log('Error: bad password: ', password);
// 		return;
// 	}
// 	else if (checkEmailValidity() == false) {
// 		console.log('Error: bad email: ', email);
// 		return;
// 	}
// 	login(username, password); // Pour les JWTokens (voir fonction en bas de page)
// 	console.log('All the user informations are valid');
// }

// function checkUsernameValidity() {
// 	if (username.length > 12) {
// 		return false;
// 	}
// 	return true;
// }

// function checkDisplayNameValidity() {
// 	return true;
// }

// function checkPasswordValidity() {
// 	return true;
// }

// function checkEmailValidity() {
// 	return true;
// }

