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

import { loadUserManagementData }
from '../../views/dashboard/dashboard.js';

import { fillingResults }
from './postGame.js';

import { startGame }
from './pong.js';

import { getFirstPlayerName }
from './onePlayer.js';

import { checkCountdown }
from './preGame.js';

import { isNameValid }
from './utils.js';

import { apiRequest }
from '../../views/user/signin.js';

/***********************************************\
-				TWO PLAYERS						-
\***********************************************/

export function prepareTwoPlayers(menuOverlay)
{
	GameState.AI_present = false;
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

async function doesUserExist(playerName)
{
	try
	{
		const	data = await apiRequest(`/api/users/does-user-exist/${playerName}/`,
		{
			method: 'GET',
		});

		return data.user_exists;
	}
	catch (error)
	{
		console.error('API request error:', error);
		return false;
	}
}

// TODO - KARL FINISH THIS
function askPassword(playerName, player2Form) {
	const modal = document.createElement('div');
	modal.className = 'modal-password';

	const modalContent = document.createElement('div');
	modalContent.className = 'modal-password-content';

	const modalTitle = document.createElement('h4');
	modalTitle.textContent = `Enter Password for ${playerName}`;

	const passwordInput = document.createElement('input');
	passwordInput.type = 'password';
	passwordInput.placeholder = 'Enter your password';
	passwordInput.className = 'input-group-text';

	const modalButton = document.createElement('button');
	modalButton.className = 'btn menu-button start-tournament-btn';
	modalButton.textContent = 'Submit';
	modalButton.addEventListener('click', () => {
		const password = passwordInput.value.trim();
		validatePassword(playerName, password, modal, player2Form);
	});

	// Create the close button
	const closeButton = document.createElement('button');
	closeButton.className = 'btn btn-secondary close-modal-button';
	closeButton.textContent = 'Close';
	closeButton.addEventListener('click', () => {
		modal.remove(); // Remove the modal
		// Re-enable the player 2 form
		const playerInput = player2Form.querySelector('input');
		const submitButton = player2Form.querySelector('button');
		playerInput.disabled = false; // Re-enable input
		submitButton.disabled = false; // Re-enable submit button
	});

	modalContent.appendChild(modalTitle);
	modalContent.appendChild(passwordInput);
	modalContent.appendChild(modalButton);
	modalContent.appendChild(closeButton); // Add the close button to modal
	modal.appendChild(modalContent);
	document.body.appendChild(modal);

	// Disable the player 2 form
	const playerInput = player2Form.querySelector('input');
	const submitButton = player2Form.querySelector('button');
	playerInput.disabled = true; // Disable input
	submitButton.disabled = true; // Disable submit button

	// Optional: Allow closing the modal by clicking outside (to improve UX)
	modal.addEventListener('click', (event) => {
		if (event.target === modal) {
			modal.remove();
			playerInput.disabled = false; // Re-enable if modal is closed
			submitButton.disabled = false; // Re-enable if modal is closed
		}
	});
}


// Example password validation function
async function validatePassword(username, password, modal, player2Form)
{
	const	isValid = await checkPassword(username, password);
	if (isValid === true)
	{
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
}

async function checkPassword(username, password)
{
	try
	{
		const	response = await fetch('/api/users/checkUserPassword/',
		{
			method: 'POST',
			headers:
			{
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ username, password })
		});

		const	data = await response.json();
		return data.valid;
	}
	catch (error)
	{
		console.error('Error checking password:', error);
		return false;
	}
}
