/***********************************************\
-					IMPORTS						-
\***********************************************/
import { DEBUG }
from '../../main.js';

import { BallConf, GameState, GraphConf, PaddleConf, GameConf, player1, player2, 
Results }
from './gameVariables.js';

import { showTournamentResults }
from './pong.js';

import { checkElement }
from './utils.js';

/***********************************************\
-					DRAWING						-
\***********************************************/
export function drawPaddle(paddle)
{
	if (GameState.done === true)
		return;
	
	GraphConf.ctx.fillStyle = paddle.color;
	GraphConf.ctx.shadowColor = paddle.shadowColor || 'rgba(0, 255, 0, 0.8)';
	GraphConf.ctx.shadowBlur = paddle.shadowBlur || 100;

	// Set rounded corners
	const	cornerRadius = 5;
	GraphConf.ctx.lineJoin = "round";
	GraphConf.ctx.lineCap = "round";
	GraphConf.ctx.lineWidth = 10;

	// Begin drawing the paddle with rounded corners
	GraphConf.ctx.beginPath();
	GraphConf.ctx.moveTo(paddle.x + cornerRadius, paddle.y);
	GraphConf.ctx.lineTo(paddle.x + paddle.width - cornerRadius, paddle.y);
	GraphConf.ctx.quadraticCurveTo(paddle.x + paddle.width, paddle.y, paddle.x + paddle.width, paddle.y + cornerRadius);
	GraphConf.ctx.lineTo(paddle.x + paddle.width, paddle.y + paddle.height - cornerRadius);
	GraphConf.ctx.quadraticCurveTo(paddle.x + paddle.width, paddle.y + paddle.height, paddle.x + paddle.width - cornerRadius, paddle.y + paddle.height);
	GraphConf.ctx.lineTo(paddle.x + cornerRadius, paddle.y + paddle.height);
	GraphConf.ctx.quadraticCurveTo(paddle.x, paddle.y + paddle.height, paddle.x, paddle.y + paddle.height - cornerRadius);
	GraphConf.ctx.lineTo(paddle.x, paddle.y + cornerRadius);
	GraphConf.ctx.quadraticCurveTo(paddle.x, paddle.y, paddle.x + cornerRadius, paddle.y);
	GraphConf.ctx.closePath();

	GraphConf.ctx.fill();
	GraphConf.ctx.shadowColor = 'transparent';
}

/***		Drawing Ball					***/
export function drawBall()
{
	GraphConf.ctx.beginPath();
	GraphConf.ctx.arc(BallConf.x, BallConf.y, BallConf.radius, 0, Math.PI * 2);
	GraphConf.ctx.fillStyle = "white";
	GraphConf.ctx.fill();
	GraphConf.ctx.closePath();
}

/***		Drawing Score					***/
export function drawScore()
{
	// Set font properties
	GraphConf.ctx.font = "48px 'Press Start 2P', cursive";
	GraphConf.ctx.textAlign = "center";
	GraphConf.ctx.textBaseline = "middle";

	// Score color and shadow
	GraphConf.ctx.fillStyle = "var(----base-green)";
	GraphConf.ctx.shadowColor = "rgba(0, 255, 0, 0.8)";
	GraphConf.ctx.shadowBlur = 10;

	// Draw Player 1's score
	GraphConf.ctx.fillText(player1.score, GraphConf.canvas.width / 4, 50);

	// Draw Player 2's score
	GraphConf.ctx.fillText(player2.score, 3 * GraphConf.canvas.width / 4, 50);

	// Reset shadow to avoid affecting other drawings
	GraphConf.ctx.shadowColor = "transparent";
}

/***		Drawing Usernames				***/
export function drawUsernames(player1Username, player2Username)
{
	if (!player1Username || !player2Username)
	{
		console.error('Player names are not set!');
		return;
	}
	
	GraphConf.ctx.font = "15px 'Press Start 2P', cursive";
	GraphConf.ctx.textAlign = "center";
	GraphConf.ctx.textBaseline = "middle";

	GraphConf.ctx.fillStyle = "var(----base-green)";
	GraphConf.ctx.shadowColor = "rgba(0, 255, 0, 0.8)";
	GraphConf.ctx.shadowBlur = 10;

	const	upperPlayer1 = player1Username.toUpperCase();
	const	upperPlayer2 = player2Username.toUpperCase();

	GraphConf.ctx.fillText(upperPlayer1, GraphConf.canvas.width / 4, 100);
	GraphConf.ctx.fillText(upperPlayer2, (GraphConf.canvas.width * 3) / 4, 100);

	GraphConf.ctx.shadowColor = "transparent";
}

/***		Drawing Winning Message			***/
export function drawWinMessage(winnerName)
{
	const	messageElement = document.getElementById('winning-message');
	const	rematchButton = document.getElementById('rematch-button');
	const	backtomenuButton = document.getElementById('back-to-menu-button');

	if (checkElement(messageElement, 'Winning message') === false)
		return;
	
	if (checkElement(rematchButton, 'Rematch button') === false)
		return;
	
	if (checkElement(backtomenuButton, 'Back to menu button') === false)
		return;
	
	const	upperWinner = winnerName.toUpperCase();
	if (GameState.isTournamentDone == true)
	{
		rematchButton.classList.add('hidden-sudden');
		showTournamentResults();
		return;
	}
	else
	{
		rematchButton.classList.remove('hidden-sudden');
	}

	// Update winning message
	messageElement.innerHTML = upperWinner + "<br>WINS!";
	messageElement.classList.add('show');

	// Create the GIF element
	const	gifElement = document.createElement('img');
	gifElement.src = '../../../assets/images/pong/win.gif';
	gifElement.alt = 'Winner GIF';
	gifElement.classList.add('win-gif');

	// Append GIF below the message
	messageElement.appendChild(gifElement);

	updateRematchButtonText();

	if (GameState.isTournament == false)
	{
		backtomenuButton.classList.remove('hidden-sudden');
	}
}

export function updateRematchButtonText()
{
	const rematchButton = document.getElementById('rematch-button');

	if (checkElement(rematchButton, 'Rematch button') === false)
		return;

	if (GameState.isTournament === true)
	{
		if (GameState.isFinalMatch === true && GameState.isGameDone === true)
		{
			rematchButton.classList.add('hidden-sudden');
		}
		
		if (GameState.isFinalMatch === false)
		{
			rematchButton.textContent = 'Next Match';
		}
		else if (GameState.isFinalMatch === true)
		{
			rematchButton.textContent = 'Final Match';
		}
	}
	else
	{
		rematchButton.textContent = 'Rematch';
	}
}

/***			Drawing Pause Menu			***/
export function drawPauseMenu()
{
	GraphConf.ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
	GraphConf.ctx.fillRect(0, 0, GraphConf.canvas.width, GraphConf.canvas.height);

	GraphConf.ctx.fillStyle = "white";
	GraphConf.ctx.font = "48px 'Press Start 2P', cursive";
	GraphConf.ctx.textAlign = "center";
	GraphConf.ctx.textBaseline = "middle";
	GraphConf.ctx.fillText("PAUSED", GraphConf.canvas.width / 2, GraphConf.canvas.height / 2 - 80);

	const	pausedGifContainer = document.getElementById('paused-gif-container');
	if (pausedGifContainer)
	{
		pausedGifContainer.classList.remove('hidden');
		pausedGifContainer.classList.add('show');
		pausedGifContainer.style.visibility = 'visible'
	}
}

/***			Hiding Pausing GIF		***/
export function hidePauseMenu()
{
	const	pausedGifContainer = document.getElementById('paused-gif-container');
	if (pausedGifContainer)
	{
		pausedGifContainer.classList.remove('show');
		pausedGifContainer.classList.add('hidden');
		pausedGifContainer.style.visibility = 'hidden';
	}
}