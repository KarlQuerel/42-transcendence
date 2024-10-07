/***********************************************\
-					IMPORTS						-
\***********************************************/
import { DEBUG }
from '../../main.js';

import { BallConf, GameState, GraphConf, PaddleConf, player1, player2, Results }
from './gameVariables.js';

import { startTournament, displayTournamentForm, startTournamentGame,
initializeTournamentMode}
from './tournament.js'

import { createContainer, createVideo, createOverlay, createMenuButton,
createTournamentButton, createHowToPlayButton, createHowToPlayCard, createCardGif,
createWinningMessage, createRematchButton, createCanvas, createPausedGifContainer }
from './createElements.js'

import { drawPaddle, drawBall, drawScore, drawUsernames, drawWinMessage, drawPauseMenu, hidePauseMenu }
from './drawing.js'

import { movePaddles, moveBall, checkBallPaddleCollision, keyDownHandler, keyUpHandler }
from './gameDynamics.js'

import { getPaddleAction, GameData }
from './ai.js';

import { loadUserManagementData }
from '../../views/dashboard/dashboard.js';

import { fillingResults }
from './postGame.js';

import { startGame }
from './pong.js';

import { getFirstPlayerName }
from './onePlayer.js';

/***********************************************\
-				TWO PLAYERS						-
\***********************************************/

export function prepareTwoPlayers(menuOverlay)
{
	GameState.AI_present = false;
	menuOverlay.classList.add('hidden');
	displayPlayer2Form();
}

// Function to display a form for Player 2's name
export function displayPlayer2Form()
{
	getFirstPlayerName();
	const player2Form = document.createElement('div');
	player2Form.id = 'input-form';
	player2Form.className = 'input-form';

	// Create the title
	const formTitle = document.createElement('h3');
	formTitle.textContent = 'Enter Player 2\'s Name';
	player2Form.appendChild(formTitle);
	
	// Create input field
	const inputGroup = document.createElement('div');
	inputGroup.className = 'input-group-lg mb-3';

	const inputLabel = document.createElement('span');
	inputLabel.className = 'input-group-text';
	inputLabel.textContent = 'Player 2';

	const playerInput = document.createElement('input');
	playerInput.type = 'text';
	playerInput.className = 'form-control';
	playerInput.placeholder = 'Enter Player 2\'s Name';

	playerInput.addEventListener('input', () =>
	{
		playerInput.value = playerInput.value.toLowerCase();
	});

	inputGroup.appendChild(inputLabel);
	inputGroup.appendChild(playerInput);
	player2Form.appendChild(inputGroup);

	// Add a submit button
	const submitButton = document.createElement('button');
	submitButton.className = 'btn menu-button start-tournament-btn';
	submitButton.textContent = 'START MATCH';
	submitButton.addEventListener('click', () =>
	{
		const player2Name = playerInput.value.trim();

		if (isNameValid(player2Name) == false)
			return ;

		// TODO with Jess
		// check if username already exists in the databe to prompt for a password (alert or modal, to see)

		player2.name = player2Name;
		player2Form.remove();
		startGame();
	});

	player2Form.appendChild(submitButton);
	document.body.appendChild(player2Form);
}

export function isNameValid(playerName)
{
	if (playerName.length > 12)
	{
		alert('Please enter a name under 12 characters');
		return false;
	}

	if (playerName === '')
	{
		alert('Please enter a valid name for Player 2.');
		return false;
	}

	if (playerName === player1.name)
	{
		alert('I know you love yourself but you can\'t play against yourself');
		return false;
	}
	return true;
}