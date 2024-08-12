
document.addEventListener('DOMContentLoaded', function () {
	document.querySelector('button[type="button"]').addEventListener('click', function () {
		let identifier = getIdentifier();
		console.log('Identifier:', identifier.length);
		let id_type = checkIdentifierType(identifier);
		console.log('Type:', id_type);
		if (id_type == 'error') {
			//afficher message d'erreur approprie sur page html
		}
		lookForExisitingUser(identifier, id_type);
		// createNewUser();
	});
});

function getIdentifier() {
	return document.getElementById('identifier').value;
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

function lookForExisitingUser(identifier, id_type) {

}