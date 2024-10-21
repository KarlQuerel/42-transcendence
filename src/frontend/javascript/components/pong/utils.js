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

import { apiRequest }
from '../../views/user/signin.js';

/***********************************************\
-					UTILS						-
\***********************************************/
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

export function checkElement(element, elementName)
{
	if (!element)
	{
		console.error(`${elementName} element not found!`);
		return false;
	}
	return true;
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