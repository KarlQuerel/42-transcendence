/*** Render Function ***/
export default function renderLogin()
{
	return `

        <h1>Log In</h1>
        <input type="text" id="username" placeholder="Enter username">
        <input type="text" id="tournament_name" placeholder="Enter tournament name">
        <input type="text" id="password" placeholder="Enter password">
        <input type="text" id="email" placeholder="Enter email">      
        <button type="button">Submit</button>

    `;
}



/*** Initialization Function for Login Route ***/
export function initializeLogin() {
    const button = document.querySelector('button[type="button"]');
    if (button) {
        button.addEventListener('click', function () {

            // username
            let username = getIdentifier('username');
            console.log('Username:', username.length);
            let username_type = checkIdentifierType(username);
            console.log('Type:', username_type);

            // tournament_name
            let tournament_name = getIdentifier('tournament_name');
            console.log('Tournament Name:', tournament_name.length);
            let tournamentname_type = checkIdentifierType(tournament_name);
            console.log('Type:', tournamentname_type);

            // password
            let password = getIdentifier('password');
            console.log('Password:', password.length);
            let password_type = checkIdentifierType(password);
            console.log('Type:', password_type);

            // email
            let email = getIdentifier('email');
            console.log('Email:', email.length);
            let email_type = checkIdentifierType(email);
            console.log('Type:', email_type);

			addNewUser(username, tournament_name, password, email);
        });
    } else {
		console.error('Button not found.');
    }
}

function getIdentifier(str) {
	return document.getElementById(str).value;
}

function checkIdentifierType(identifier) {
	if (isValidUsername(identifier) == true) {
		return 'username';
	}
	else if (isValidEmail(identifier) == true) {
		return 'email';
	}
	return 'error';
}

function isValidUsername(identifier) {
	const usernamePattern = /^[a-zA-Z0-9_-]+$/;

	if (identifier.length > 12) {
		return false;
	}
	else if (usernamePattern.test(identifier) == false) {
		return false;
	}
	return true;
}

function isValidEmail(identifier) {
	const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	//add length checking
	if (emailPattern.test(identifier) == false) {
		return false;
	}
	return true;
}


function addNewUser(username, tournament_name, password, email) {
	fetch('/addUser/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ username, tournament_name, password, email}),
	})

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

