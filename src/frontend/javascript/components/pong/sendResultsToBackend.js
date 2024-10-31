/***********************************************\
-			IMPORTING GLOBAL VARIABLES			-
\***********************************************/
import { DEBUG } from '../../main.js';
import { Results } from './gameVariables.js';
import { getAuthHeaders } from '../../views/user/signin.js';
import { loadUsername } from './utils.js';

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
	try {
		// Log all fields to verify their values before the request
		if (DEBUG)
		console.log("Results object:", Results);

		// Check if any required field is missing or undefined
		if (!Results.opponent_username) {
			throw new Error("Missing opponent_username");
		}
		if (Results.opponent_score === undefined) {
			throw new Error("Missing opponent_score");
		}
		if (Results.score === undefined) {
			throw new Error("Missing myScore");
		}
		if (!Results.tournament_date) {
			throw new Error("Missing tournament_date");
		}

		let connectedUser = await loadUsername();
		let myUsernameStr = connectedUser.username;
		console.log("myUsernameStr:", myUsernameStr);

		const response = await fetch('/api/dashboard/addStats/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				...getAuthHeaders()
			},
			body: JSON.stringify({
				myUsername: myUsernameStr,
				opponentUsername: Results.opponent_username,
				opponentScore: Results.opponent_score,
				myScore: Results.score,
				date: Results.tournament_date
			})
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await json();
		if (DEBUG) {
			console.log('Response from backend:', data);
		}
	} catch (error) {
		console.error('Error sending results to backend:', error.message);
	}
}

