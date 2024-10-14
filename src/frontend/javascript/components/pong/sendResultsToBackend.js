/***********************************************\
-			IMPORTING GLOBAL VARIABLES			-
\***********************************************/
import { DEBUG } from '../../main.js';
import { Results } from './gameVariables.js';

/*
Accross all pong game javascript files, variables and functions that need to 
be accessible to other files are just exported and then imported. 
But when we need to export and import data not accross the fronted but between 
the frontend and the backend, we need to use "fetch" (API call) to send data to 
the backend. This is because the backend (Django) doesn’t automatically have access 
to the frontend (Javascript) data. Since the backend and frontend communicate via 
HTTP requests (like GET, POST), sendResultsToBackend() makes an API call to the 
addStats view, informing Django of the game’s result so it can update the database.
*/
export async function sendResultsToBackend() {
	console.log('Sending results to backend...'); //TEST
	try {
		const response = await fetch('/api/dashboard/addStats/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ //sends the data in json format
				Results: Results
			}),
		});
		
		const data = await response.json();
		if (DEBUG)
			console.log('Backend response:', data);
	} catch (error) {
		if (DEBUG) 
			console.error('Error sending results:', error); //ne rend pas du json donc erreur dans la console
	}
}