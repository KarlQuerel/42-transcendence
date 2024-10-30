/***********************************************\
-					IMPORTS						-
\***********************************************/
import { DEBUG }
from '../../main.js';

import { BallConf, GameState, GraphConf, PaddleConf, GameConf, player1, player2, 
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

import { loadUserManagementData }
from './utils.js';

import { startCountdown, checkCountdown }
from './preGame.js';

import { fillingResults }
from './postGame.js';

/***********************************************\
-				ONE PLAYER						-
\***********************************************/
export function prepareSinglePlayer(menuOverlay)
{
	getFirstPlayerName();
	player2.name = GameConf.AI_name;
	GameState.isAiPresent = true;
	menuOverlay.classList.add('hidden');
	checkCountdown();
}

export function getFirstPlayerName()
{
	loadUserManagementData()
	.then(username =>
	{
		player1.name = username.username;
	})
	.catch(error =>
	{
		console.error('Failed to load user management data:', error);
	});
}
