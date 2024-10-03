/***********************************************\
-					IMPORTS						-
\***********************************************/
import { DEBUG }
from '../../main.js';

import { GameState }
from './gameVariables.js';

/***********************************************\
-					POST-GAME					-
\***********************************************/
/***			Filling Results				***/
export function fillingResults(username)
{
	// HERE voir avec Caro les variables necessaires
	Results.username = username.username;
	Results.identified = "yes";
	Results.score = 10;
	if (GameState.AI_present === true)
	{
		Results.opponent_username = "AI";
	}
	else if (GameState.AI_present === false)
	{
		Results.opponent_username = player2.name; //FIX ME
	}
	Results.opponent_score = player2.score;
	Results.tournament_date = getDate();

	if (DEBUG)
		console.log('Results instance:', Results);
}

/***			Get date					***/
function getDate()
{
	const current_date = new Date();
	const day = String(current_date.getDate()).padStart(2, '0');
	const month = String(current_date.getMonth() + 1).padStart(2, '0');
	const year = current_date.getFullYear();
	
	const formattedDate = `${day}/${month}/${year}`;

	console.log('Formatted Date:', formattedDate);

	return formattedDate;
}

/***			Closing Pong Game			***/
export function cleanUpPong()
{
	if (DEBUG)
		console.log('Cleaning up Pong...')

	// Removing Events Listener
	document.removeEventListener("keydown", keyDownHandler);
	document.removeEventListener("keyup", keyUpHandler);

	// Stopping Game Loop
	// cancelAnimationFrame(gameLoop);
	cancelAnimationFrame(GameState.animationFrameId);

	// Removing Game Elements
	const	canvas = document.getElementById("pongCanvas");
	if (canvas)
		canvas.remove();

	// Resetting Game Variables
	GameState.game_done = true;
	GameState.game_paused = false;
	GameState.AI_present = false;

	// Cleaning up the countdown
	clearInterval(GameState.countdownInterval);
	GameState.isCountdownActive = false;
	document.querySelectorAll('.countdown').forEach(el => el.remove());

	const	tournamentForm = document.getElementById('tournament-form');
	if (tournamentForm)
	{
		tournamentForm.remove();
	}

	// document.body.classList.remove('no-scroll');
}