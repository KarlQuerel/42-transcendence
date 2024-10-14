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