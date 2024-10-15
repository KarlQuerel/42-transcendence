/***********************************************\
-					IMPORTS						-
\***********************************************/
import { DEBUG }
from '../../main.js';

import { BallConf, GameState, GraphConf, PaddleConf, player1, player2, 
Results }
from './gameVariables.js';

import { prepareTwoPlayers, displayPlayer2Form }
from './twoPlayers.js'

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

/***********************************************\
-					COUTDOWN					-
\***********************************************/
export function checkCountdown()
{
	if (GameState.isCountdownActive)
	{
		clearInterval(GameState.countdownInterval);
		document.querySelectorAll('.countdown').forEach(el => el.remove());
	}
	startCountdown();
}

export function startCountdown()
{
	const countdownDisplay = document.createElement('div');
	countdownDisplay.className = 'countdown';
	document.body.appendChild(countdownDisplay);

	let countdown = 3;
	countdownDisplay.textContent = countdown;

	GameState.isCountdownActive = true;
	GameState.countdownInterval = setInterval(() =>
	{
		countdown--;
		if (countdown > 0)
		{
			countdownDisplay.textContent = countdown;
		}
		else
		{
			countdownDisplay.textContent = 'GO!';
			clearInterval(GameState.countdownInterval);

			setTimeout(() =>
			{
				document.body.removeChild(countdownDisplay);
				GameState.isCountdownActive = false;
				startGame();
			}, 1000);
		}
	}, 1000);
}