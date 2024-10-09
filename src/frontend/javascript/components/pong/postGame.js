/***********************************************\
-					IMPORTS						-
\***********************************************/
import { DEBUG }
from '../../main.js';

import { BallConf, GameState, GraphConf, PaddleConf, GameConf, player1, player2, 
Results }
from './gameVariables.js';

import { keyDownHandler, keyUpHandler }
from './gameDynamics.js';

import { loadUserManagementData }
from '../../views/dashboard/dashboard.js';

/***********************************************\
-					POST-GAME					-
\***********************************************/
/***			Filling Results				***/
export async function fillingResults(winner)
{
	const	username = await loadUserManagementData();

	Results.username = username.username;
	Results.identified = "yes"; // HERE

	if (winner === 1)
	{
		Results.score = GameConf.maxScore;
		Results.opponent_score = player2.score;
	}
	else if (winner === 2)
	{
		Results.score = player1.score;
		Results.opponent_score = GameConf.maxScore;
	}

	if (GameState.AI_present === true)
	{
		Results.identified = false;
		Results.opponent_username = GameConf.AI_name;
	}
	else if (GameState.AI_present === false)
	{
		Results.opponent_username = player2.name;
	}

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

	const	tournamentForm = document.getElementById('input-form');
	if (tournamentForm)
	{
		tournamentForm.remove();
	}
}