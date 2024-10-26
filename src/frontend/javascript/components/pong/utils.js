/***********************************************\
-					IMPORTS						-
\***********************************************/
import { DEBUG }
from '../../main.js';

import { GITHUBACTIONS }
from '../../main.js';

import { BallConf, GameState, GraphConf, GameConf, PaddleConf, player1, player2, Results }
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

import { apiRequest }
from '../../views/user/signin.js'

import { getAuthHeaders } from '../../views/user/signin.js';

/***********************************************\
-					UTILS						-
\***********************************************/
export function checkElement(element, elementName)
{
	if (!element)
	{
		console.error(`${elementName} element not found!`);
		return false;
	}
	return true;
}

/***			User & Password Management			***/
export function isNameValid(playerName)
{
	if (playerName.length > 12)
	{
		alert('❌ Please enter a name under 12 characters ❌');
		return false;
	}
	
	if (playerName === '')
	{
		alert('❌ Please enter a name ❌');
		return false;
	}

	if (playerName === player1.name)
	{
		alert('❌ I know you love yourself but you can\'t play against yourself ❌');
		return false;
	}

	return true;
}

export async function loadUsername() //CARO //CHECK si je l'utilises tjrs quelque part, karl semble utiliser loadUserManagement à la place ou un truc du genre
{
	try {
		const username = await apiRequest('/api/users/getUsername/', {
			method: 'GET',
			// headers: {
			// 	...getAuthHeaders(),
			// },
		});
		if (DEBUG)
			console.log("username = ", username);
		if (GITHUBACTIONS)
			console.log("Successfully fetched connected user's username");
		return username;
	} catch (error) {
		console.error('Error: fetching username', error);
		throw error; // Re-throw the error
	}
}

export async function loadUserManagementData()
{
	try {
		const userData = await apiRequest('/api/users/getUsername/', {
			method: 'GET',
			headers: {
				...getAuthHeaders(),
			},
		});
		if (DEBUG)
			console.log("userData = ", userData);
		if (GITHUBACTIONS)
			console.log("Successfully fetched user info");
		return userData;
	} catch (error) {
		console.error('Error: fetch userData', error);
		throw error; // Re-throw the error
	}
}

export async function doesUserExist(playerName)
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

export async function checkPassword(username, password)
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

/***			Graphics					***/
export function showCanvas()
{
	const canvas = document.getElementById('pongCanvas');
	if (canvas)
	{
		canvas.style.display = 'block';
	}
}

export function hideCanvas()
{
	const canvas = document.getElementById('pongCanvas');
	if (canvas)
	{
		canvas.style.display = 'none';
	}
}

/***			Keys Handling					***/
export function blockKeys(event)
{
	const blockedKeys = ['p', 'Escape', 'ArrowUp', 'ArrowDown', 'w', 's'];

	if (GameConf.keysBlocked === true && blockedKeys.includes(event.key))
	{
		event.preventDefault();
	}
}

export function enableKeyBlocking()
{
	GameConf.keysBlocked = true;
}

export function disableKeyBlocking()
{
	GameConf.keysBlocked = false;
}