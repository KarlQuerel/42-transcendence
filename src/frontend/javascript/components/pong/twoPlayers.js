/***********************************************\
-					IMPORTS						-
\***********************************************/
import { DEBUG }
from '../../main.js';

import { BallConf, GameState, GraphConf, PaddleConf, player1, player2, Results }
from './gameVariables.js';

import { displayTournamentForm, startTournamentGame,
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

import { fillingResults }
from './postGame.js';

import { startGame }
from './pong.js';

import { getFirstPlayerName }
from './onePlayer.js';

import { checkCountdown }
from './preGame.js';

import { isNameValid, doesUserExist, checkPassword }
from './utils.js';

import { apiRequest }
from '../../views/user/signin.js';

/***********************************************\
-				TWO PLAYERS						-
\***********************************************/

export function prepareTwoPlayers(menuOverlay)
{
	GameState.isAiPresent = false;
	menuOverlay.classList.add('hidden');
	displayPlayer2Form();
}

export function displayPlayer2Form()
{
	getFirstPlayerName();
	const	player2Form = document.createElement('div');
	player2Form.id = 'input-form';
	player2Form.className = 'input-form';

	const	formTitle = document.createElement('h3');
	formTitle.textContent = 'Enter Player 2\'s Name';
	player2Form.appendChild(formTitle);
	
	const	inputGroup = document.createElement('div');
	inputGroup.className = 'input-group-lg mb-3';

	const	inputLabel = document.createElement('span');
	inputLabel.className = 'input-group-text';
	inputLabel.textContent = 'Player 2';

	const	playerInput = document.createElement('input');
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

	const	submitButton = document.createElement('button');
	submitButton.className = 'btn menu-button start-tournament-btn';
	submitButton.textContent = 'START MATCH';
	submitButton.addEventListener('click', async() =>
	{
		const	player2Name = playerInput.value.trim();

		if (isNameValid(player2Name) == false)
			return;

		const	userEXists = await doesUserExist(player2Name);

		if (userEXists === true)
		{
			askPassword(player2Name, player2Form);
		}
		else
		{
			player2.name = player2Name;
			player2Form.remove();
			checkCountdown();
		}
	});

	playerInput.addEventListener('keydown', (event) =>
	{
		if (event.key === 'Enter')
		{
			submitButton.click();
		}
	});
		
	player2Form.appendChild(submitButton);
	document.body.appendChild(player2Form);
}

function askPassword(playerName, player2Form)
{
	const	modalContent = document.createElement('div');
	modalContent.className = 'input-form';

	const	modalTitle = document.createElement('h3');
	modalTitle.textContent = `Enter Password for ${playerName}`;

	// Password input with the same class as the username inputs
	const	inputGroup = document.createElement('div');
	inputGroup.className = 'input-group-lg mb-3';

	const	inputLabel = document.createElement('span');
	inputLabel.className = 'input-group-text';
	inputLabel.textContent = 'Password';

	const	passwordInput = document.createElement('input');
	passwordInput.type = 'password';
	passwordInput.className = 'form-control'; // Same class as the username input
	passwordInput.placeholder = 'Enter your password';

	// Enter option to submit on pressing Enter key
	passwordInput.addEventListener('keydown', (event) =>
	{
		if (event.key === 'Enter')
		{
			modalButton.click();
		}
	});

	inputGroup.appendChild(inputLabel);
	inputGroup.appendChild(passwordInput);
	modalContent.appendChild(modalTitle);
	modalContent.appendChild(inputGroup);

	// Submit button
	const	modalButton = document.createElement('button');
	modalButton.className = 'btn menu-button start-tournament-btn';
	modalButton.textContent = 'Submit';
	modalButton.addEventListener('click', () =>
	{
		const	password = passwordInput.value.trim();
		validatePasswordTwoPlayers(playerName, password, modalContent, player2Form);
	});

	modalContent.appendChild(modalButton);

	// Close button
	const	closeButton = document.createElement('button');
	closeButton.className = 'btn menu-button start-tournament-btn';
	closeButton.textContent = 'Back';
	closeButton.addEventListener('click', () =>
	{
		modalContent.remove();
		player2Form.style.display = 'block';
	});

	modalContent.appendChild(closeButton);
	document.body.appendChild(modalContent);

	player2Form.style.display = 'none';
}


async function validatePasswordTwoPlayers(username, password, modal, player2Form)
{
	const	isValid = await checkPassword(username, password);
	if (isValid === true)
	{
		if (DEBUG)
			console.log('Password is valid. Proceed to game.');
		modal.remove();
		player2Form.remove();
		player2.name = username;
		checkCountdown();
	}
	else
	{
		alert('Invalid password. Please try again.');
	}

	const	passwordInput = modal.querySelector('input[type="password"]');
	if (passwordInput)
	{
		passwordInput.value = '';
	}
}



