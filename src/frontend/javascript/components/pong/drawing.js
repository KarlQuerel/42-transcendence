/***********************************************\
-					IMPORTS						-
\***********************************************/
import { DEBUG }
from '../../main.js';

import { BallConf, GameState, GraphConf, PaddleConf, player1, player2, Results }
from './gameVariables.js';

/***********************************************\
-					DRAWING						-
\***********************************************/
export function drawPaddle(paddle)
{
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

/***			Drawing Winning Message		***/
export function drawWinMessage(winner)
{
	const	messageElement = document.getElementById('winning-message');
	const	rematchButton = document.getElementById('rematch-button');

	if (!messageElement)
	{
		console.error('Winning message element not foun!');
		return ;
	}
	messageElement.textContent = winner + " Wins!";
	messageElement.classList.add('show');

	if (!rematchButton)
	{
		console.error('Rematch button element not found!');
		return ;
	}
	rematchButton.classList.remove('hidden');
	rematchButton.classList.add('show');
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