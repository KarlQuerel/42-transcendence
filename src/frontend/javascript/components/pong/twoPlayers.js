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
import { apiRequest } from '../../views/user/signin.js';

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
	const	player2Form = document.createElement('div');
	player2Form.id = 'input-form';
	player2Form.className = 'input-form';

	// Create the title
	const	formTitle = document.createElement('h3');
	formTitle.textContent = 'Enter Player 2\'s Name';
	player2Form.appendChild(formTitle);
	
	// Create input field
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

	// Add a submit button
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
			askPassword(player2Name);
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
		const data = await apiRequest(`/api/users/does-user-exist/${playerName}/`,
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

//HERE TO DO KARL
// Function to show password modal
function askPassword(playerName)
{
	// Create modal elements
	const modal = document.createElement('div');
	modal.className = 'modal';
	modal.style.display = 'block'; // Show modal

	const modalContent = document.createElement('div');
	modalContent.className = 'modal-content';
		
	const modalTitle = document.createElement('h4');
	modalTitle.textContent = `Enter Password for ${playerName}`;

	const passwordInput = document.createElement('input');
	passwordInput.type = 'password'; // Masked input
	passwordInput.placeholder = 'Enter your password';
	passwordInput.className = 'form-control';

	const modalButton = document.createElement('button');
	modalButton.className = 'btn btn-primary';
	modalButton.textContent = 'Submit';
	modalButton.addEventListener('click', () => {
		const password = passwordInput.value.trim();
		// Handle password validation here, e.g.:
		validatePassword(playerName, password);
		modal.remove(); // Close modal after submitting
	});

	modalContent.appendChild(modalTitle);
	modalContent.appendChild(passwordInput);
	modalContent.appendChild(modalButton);
	modal.appendChild(modalContent);
	document.body.appendChild(modal);
}

// Example password validation function
async function validatePassword(username, password)
{
	const isValid = await checkPassword(username, password);
	if (isValid)
	{
		console.log('Password is valid. Proceed to game.');
		// Proceed with the game logic here
	}
	else
	{
		alert('Invalid password. Please try again.');
	}
}

// Example function to check password (you need to implement this)
async function checkPassword(username, password) {
	// Replace this with your logic to check password against the database
	return true; // or false based on validation
}