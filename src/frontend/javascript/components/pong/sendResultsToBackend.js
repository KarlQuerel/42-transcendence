/***********************************************\
-			IMPORTING GLOBAL VARIABLES			-
\***********************************************/
import { DEBUG } from '../../main.js';
import { Results } from './gameVariables.js';
import { getAuthHeaders } from '../../views/user/signin.js';

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
		console.log("Results object:", Results);
		console.log("opponentUsername:", Results.opponent_username);
		console.log("opponentScore:", Results.opponent_score);
		console.log("myScore:", Results.score);
		console.log("tournament_date:", Results.tournament_date);

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

		const response = await fetch('/api/dashboard/addStats/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				...getAuthHeaders() // Ensure authentication headers are properly included
			},
			body: JSON.stringify({
				opponentUsername: Results.opponent_username,
				opponentScore: Results.opponent_score,
				myScore: Results.score,
				date: Results.tournament_date // Correct format YYYY-MM-DD
			})
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();
		if (DEBUG) {
			console.log('Response from backend:', data);
		}
	} catch (error) {
		console.error('Error sending results to backend:', error.message);
	}
}
