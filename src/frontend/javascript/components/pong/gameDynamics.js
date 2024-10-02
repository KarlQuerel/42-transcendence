/***********************************************\
-					IMPORTS						-
\***********************************************/
import { DEBUG }
from '../../main.js';

import { keysPressed, BallConf, GameState, GraphConf, PaddleConf, player1, player2, Results }
from './gameVariables.js';

/***********************************************\
-					MOVEMENT					-
\***********************************************/

/***			Moving Paddles				 ***/
export function movePaddles()
{
	if (keysPressed["w"])
	{
		player1.dy = -PaddleConf.speed;
	}
	else if (keysPressed["s"])
	{
		player1.dy = PaddleConf.speed;
	}
	else
	{
		player1.dy = 0;
	}

	if (keysPressed["ArrowUp"])
	{
		player2.dy = -PaddleConf.speed;
	}
	else if (keysPressed["ArrowDown"])
	{
		player2.dy = PaddleConf.speed;
	}
	else
	{
		player2.dy = 0;
	}

	player1.y += player1.dy;
	player1.y = Math.max(0, Math.min(player1.y, GraphConf.canvas.height - player1.height));

	player2.y += player2.dy;
	player2.y = Math.max(0, Math.min(player2.y, GraphConf.canvas.height - player2.height));
}

/***			Moving Ball					***/
export function moveBall()
{
	BallConf.x += BallConf.dx;
	BallConf.y += BallConf.dy;

	if (BallConf.y + BallConf.radius > GraphConf.canvas.height || BallConf.y - BallConf.radius < 0)
	{
		BallConf.dy *= -1;
	}

	if (
		(BallConf.x - BallConf.radius < player1.x + player1.width && BallConf.y > player1.y && BallConf.y < player1.y + player1.height) ||
		(BallConf.x + BallConf.radius > player2.x && BallConf.y > player2.y && BallConf.y < player2.y + player2.height)
	)
	{
		BallConf.dx *= -1;
	}

	if (BallConf.x - BallConf.radius < 0)
	{
		player2.score++;
		resetAll();
	}
	else if (BallConf.x + BallConf.radius > GraphConf.canvas.width)
	{
		player1.score++;
		resetAll();
	}
}

/***			Checking Paddles			***/
export function checkBallPaddleCollision()
{
	// Check collision with Player 1's paddle
	if (BallConf.x - BallConf.radius < player1.x + player1.width && BallConf.x + BallConf.radius > player1.x && BallConf.y + BallConf.radius > player1.y && BallConf.y - BallConf.radius < player1.y + player1.height)
	{
		let collidePointP1 = (BallConf.y - (player1.y + player1.height / 2));
		collidePointP1 = collidePointP1 / (player1.height / 2);
		let angleRadP1 = collidePointP1 * Math.PI / 4;
		BallConf.dx = BallConf.speed * Math.cos(angleRadP1);
		BallConf.dy = BallConf.speed * Math.sin(angleRadP1);
		if (BallConf.dx < 0)
			BallConf.dx = -BallConf.dx;
		BallConf.speed += 0.5;
	}

	// Check collision with Player 2's paddle
	if (BallConf.x - BallConf.radius < player2.x + player2.width && BallConf.x + BallConf.radius > player2.x && BallConf.y + BallConf.radius > player2.y && BallConf.y - BallConf.radius < player2.y + player2.height)
	{
		let collidePointP2 = (BallConf.y - (player2.y + player2.height / 2));
		collidePointP2 = collidePointP2 / (player2.height / 2);
		let angleRadP2 = collidePointP2 * Math.PI / 4;
		BallConf.dx = BallConf.speed * Math.cos(angleRadP2);
		BallConf.dy = BallConf.speed * Math.sin(angleRadP2);
		if (BallConf.dx > 0)
			BallConf.dx = -BallConf.dx;
		BallConf.speed += 0.5;
	}
}

/***********************************************\
-					RESET						-
\***********************************************/

/***				Resetting All			***/
function resetAll()
{
	resetBall();
	resetPaddles();
}

/***				Resetting Ball			***/
function resetBall()
{
	BallConf.x = GraphConf.canvas.width / 2;
	BallConf.y = GraphConf.canvas.height / 2;
		
	// Reset the ball speed to the initial speed
	BallConf.speed = 5;

	// Reverse the horizontal direction of the ball based on its current direction
	if (BallConf.dx > 0)
	{
		BallConf.dx = -BallConf.speed;
	}
	else
	{
		BallConf.dx = BallConf.speed;
	}

	// Reset the vertical direction based on its current direction
	if (BallConf.dy > 0)
	{
		BallConf.dy = BallConf.speed;
	}
	else
	{
		BallConf.dy = -BallConf.speed;
	}
}

/***			Resetting Paddles			***/
function resetPaddles()
{
	player1.y = (GraphConf.canvas.height - PaddleConf.height) / 2;
	player2.y = (GraphConf.canvas.height - PaddleConf.height) / 2;
}

/***********************************************\
-				KEYBOARD HANDLING				-
\***********************************************/
export function keyDownHandler(e)
{
	if (GameState.isGameModeSelected == false)
		return ;

	keysPressed[e.key] = true;
	
	if (e.key === "p" || e.key === "Escape")
	{
		GameState.game_paused = !GameState.game_paused;
		if (GameState.game_paused == true)
		{
			cancelAnimationFrame(GameState.animationFrameId);
			drawPauseMenu();
			GameState.animationFrameId = requestAnimationFrame(gameLoop);
		}
		else
		{
			cancelAnimationFrame(GameState.animationFrameId);
			hidePauseMenu();
			GameState.animationFrameId = requestAnimationFrame(gameLoop);
		}
		return ;
	}

}

export function keyUpHandler(e)
{
	delete keysPressed[e.key];
}