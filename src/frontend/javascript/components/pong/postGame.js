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

import { loadUsername }
from './utils.js';

/***********************************************\
-					POST-GAME					-
\***********************************************/
/***			Filling Results				***/
export async function fillingResults(winner)
{
	const	username = await loadUsername();

	Results.username = username.username;
	Results.identified = "yes"; // HERE check si quelqu'un l'utilise

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

	if (GameState.isAiPresent === true)
	{
		Results.identified = false;
		Results.opponent_username = GameConf.AI_name;
	}
	else if (GameState.isAiPresent === false)
	{
		Results.opponent_username = player2.name;
	}

	Results.tournament_date = getDate();

	if (DEBUG)
		console.log('Filled Results object:', Results);
}

/***			Get date					***/
function getDate()
{
	const current_date = new Date();
	const day = String(current_date.getDate()).padStart(2, '0');
	const month = String(current_date.getMonth() + 1).padStart(2, '0');
	const year = current_date.getFullYear();
	
	const formattedDate = `${year}-${month}-${day}`;

	console.log('Formatted Date:', formattedDate);

	return formattedDate;
}

/***			Closing Pong Game			***/
export function cleanUpPong()
{
	if (DEBUG)
		console.log('Cleaning up Pong...')
	
	const	tournamentForms = document.querySelectorAll('#input-form');
	if (tournamentForms)
	{
		tournamentForms.forEach(form => form.remove());
	}
	
	const	matchupsContainers = document.querySelectorAll('.matchups-container');
	if (matchupsContainers.length > 0)
	{
		matchupsContainers.forEach(container => container.remove());
	}
	
	const	passwordModals = document.querySelectorAll('.input-form');
	if (passwordModals.length > 0)
	{
		passwordModals.forEach(modal => modal.remove());
	}

	// Removing Events Listener
	document.removeEventListener("keydown", keyDownHandler);
	document.removeEventListener("keyup", keyUpHandler);

	// Stopping Game Loop
	cancelAnimationFrame(GameState.animationFrameId);

	// Removing Game Elements
	const	canvas = document.getElementById("pongCanvas");
	if (canvas)
	{
		canvas.remove();
	}

	// Resetting Game Variables
	GameState.isGameDone = true;
	GameState.isGamePaused = false;
	GameState.isAiPresent = false;

	// Cleaning up the countdown
	clearInterval(GameState.countdownInterval);
	GameState.isCountdownActive = false;
	document.querySelectorAll('.countdown').forEach(el => el.remove());
}