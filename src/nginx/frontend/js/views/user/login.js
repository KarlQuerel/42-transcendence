import { NewUser } from "../../components/user/NewUser.js";

document.addEventListener('DOMContentLoaded', function () {
	document.querySelector('button[type="button"]').addEventListener('click', function () {
		fillVarFromData();
	// createNewUser();
	// console.log('New user created: ', username);
	});
});

let username;
let display_name;
let password;
let email;

function fillVarFromData() {
	getFormData();
	// checkDataValidity();
}

function getFormData() {
	username = document.getElementById('username').value;
	display_name = document.getElementById('display_name').value;
	password = document.getElementById('password').value;
	email = document.getElementById('email').value;

	console.log('Username:', username);
	console.log('Display Name:', display_name);
	console.log('Password:', password);
	console.log('Email:', email);

	const newUser = new NewUser(username, display_name, password, email);

	console.log(newUser.username, newUser.pseudo, newUser.password, newUser.email);
}

function checkDataValidity() {
	if (checkUsernameValidity() == false) {
		console.log('Error: bad username: ', username);
		return;
	}
	else if (checkDisplayNameValidity() == false) {
		console.log('Error: bad display name: ', display_name);
		return;
	}
	else if (checkPasswordValidity() == false) {
		console.log('Error: bad password: ', password);
		return;
	}
	else if (checkEmailValidity() == false) {
		console.log('Error: bad email: ', email);
		return;
	}
	console.log('All the user informations are valid');
}

function checkUsernameValidity() {
	if (username.length > 12) {
		return false;
	}
	return true;
}

function checkDisplayNameValidity() {
	return true;
}

function checkPasswordValidity() {
	return true;
}

function checkEmailValidity() {
	return true;
}