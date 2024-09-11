/***********************************************\
-			IMPORTING GLOBAL VARIABLES			-
\***********************************************/
import { DEBUG } from '../../main.js';

// document.addEventListener('DOMContentLoaded', function () {
// 	document.querySelector('button[type="button"]').addEventListener('click', function () {
// 		let identifier = getIdentifier();
// 		console.log('Identifier:', identifier.length);
// 		let id_type = checkIdentifierType(identifier);
// 		console.log('Type:', id_type);
// 		if (id_type == 'error') {
// 			//afficher message d'erreur approprie sur page html
// 		}
// 		else {
// 			lookForExisitingUser(identifier, id_type);
// 		}
// 		// createNewUser();
// 	});
// });







function lookForExisitingUser(identifier, id_type) {
	if (id_type == 'email') {
		lookForExisitingEmail(identifier);
	}
	else {
		lookForExisitingUsername(identifier);
	}
}

function lookForExisitingEmail(identifier) {
	fetch('/api/users/check-email/', { redirect: 'follow' })
		.then(response => response.json())
		.then(data => {
			if (data.exists) {
				console.log('Email exists.', data);
			}
			else {
				console.log('Email doesn\'t exist.', data);
			}
		})
		.catch(error => console.error('Error fetching /api/users', error));
}

function lookForExisitingUsername(identifier) {
	fetch('/api/users/check-username/', { redirect: 'follow' })
		.then(response => response.json())
		.then(data => {
			if (data.exists) {
				console.log('Username exists.', data);
			}
			else {
				console.log('Username doesn\'t exist.', data);
			}
		})
		.catch(error => console.error('Error fetching /api/users', error));
}
