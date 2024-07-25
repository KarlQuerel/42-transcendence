/***********************************************\
 -				GAME CONFIG					-
\***********************************************/

/***			General						***/
let game_done = false;
let AI_present = false;


const canvas = document.getElementById("pongCanvas");
const ctx = canvas.getContext("2d");

/***			Paddle Properties			  ***/
const paddleWidth = 10;
const paddleHeight = 100;
const paddleSpeed = 8;

/***			Player Paddles				 ***/
const player1 =
{
	x: 0,
	y: (canvas.height - paddleHeight) / 2,
	width: paddleWidth,
	height: paddleHeight,
	color: "blue",
	dy: 0,
	score: 0
};

const player2 =
{
	x: canvas.width - paddleWidth,
	y: (canvas.height - paddleHeight) / 2,
	width: paddleWidth,
	height: paddleHeight,
	color: "red",
	dy: 0,
	score: 0
};

/***			Ball Properties				***/
const ball =
{
	x: canvas.width / 2,
	y: canvas.height / 2,
	radius: 10,
	speed: 5, // quelle variable est la velocity je pense dx dy a voir
	dx: 5,
	dy: 5
};

/***********************************************\
 -				RENDERING					  -
\***********************************************/

/***			Drawing Paddles				***/
function drawPaddle(paddle)
{
	ctx.fillStyle = paddle.color;
	ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
}

/***			Drawing Ball				   ***/
function drawBall()
{
	ctx.beginPath();
	ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
	ctx.fillStyle = "white";
	ctx.fill();
	ctx.closePath();
}

/***			Drawing Score				  ***/
function drawScore()
{
	ctx.font = "32px Arial";
	ctx.fillStyle = "white";
	ctx.fillText(player1.score, canvas.width / 4, 50);
	ctx.fillText(player2.score, 3 * canvas.width / 4, 50);
}

/***			Drawing Winning Message		***/
function drawWinMessage(winner)
{
	ctx.font = "48px Arial";
	ctx.fillStyle = "white";
	ctx.fillText(winner + " Wins!", canvas.width / 2 - 100, canvas.height / 2);
}

/***********************************************\
 -				GAME DYNAMICS				  -
\***********************************************/

/***			Moving Paddles				 ***/
function movePaddles()
{
	if (player1.dy !== 0)
	{
		player1.y += player1.dy;
		if (player1.y < 0)
			player1.y = 0;
		else if (player1.y + player1.height > canvas.height)
			player1.y = canvas.height - player1.height;
	}

	if (player2.dy !== 0)
	{
		player2.y += player2.dy;
		if (player2.y < 0)
			player2.y = 0;
		else if (player2.y + player2.height > canvas.height)
			player2.y = canvas.height - player2.height;
	}
}

/***			Moving Ball					***/
function moveBall()
{
	ball.x += ball.dx;
	ball.y += ball.dy;

	if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
		ball.dy *= -1;
	}

	if (
		(ball.x - ball.radius < player1.x + player1.width && ball.y > player1.y && ball.y < player1.y + player1.height) ||
		(ball.x + ball.radius > player2.x && ball.y > player2.y && ball.y < player2.y + player2.height)
	) {
		ball.dx *= -1;
	}

	if (ball.x - ball.radius < 0) {
		player2.score++;
		resetBall();
	} else if (ball.x + ball.radius > canvas.width) {
		player1.score++;
		resetBall();
	}
}

function checkBallPaddleCollision() {
    // Check collision with Player 1's paddle
    if (ball.x - ball.radius < player1.x + player1.width && ball.x + ball.radius > player1.x && ball.y + ball.radius > player1.y && ball.y - ball.radius < player1.y + player1.height) {
        // Calculate the point of collision from the center of the paddle
        let collidePointP1 = (ball.y - (player1.y + player1.height / 2));
        // Normalize the collision point
        collidePointP1 = collidePointP1 / (player1.height / 2);
        // Calculate the angle of deflection
        let angleRadP1 = collidePointP1 * Math.PI/4;
        ball.dx = ball.speed * Math.cos(angleRadP1);
        ball.dy = ball.speed * Math.sin(angleRadP1);
        // Ensure the ball moves to the right
        if (ball.dx < 0) ball.dx = -ball.dx;
        // Increase the ball's speed to increase difficulty
        ball.speed += 0.1;
    }

    // Check collision with Player 2's paddle
    if (ball.x + ball.radius > player2.x && ball.x - ball.radius < player2.x + player2.width && ball.y + ball.radius > player2.y && ball.y - ball.radius < player2.y + player2.height) {
        // Calculate the point of collision from the center of the paddle
        let collidePointP2 = (ball.y - (player2.y + player2.height / 2));
        // Normalize the collision point
        collidePointP2 = collidePointP2 / (player2.height / 2);
        // Calculate the angle of deflection
        let angleRadP2 = collidePointP2 * Math.PI/4;
        ball.dx = -ball.speed * Math.cos(angleRadP2);
        ball.dy = ball.speed * Math.sin(angleRadP2);
        // Ensure the ball moves to the left
        if (ball.dx > 0) ball.dx = -ball.dx;
        // Increase the ball's speed to increase difficulty
        ball.speed += 0.1;
    }
}


/***			Resetting ball to center	   ***/
function resetBall()
{
	ball.x = canvas.width / 2;
	ball.y = canvas.height / 2;
	ball.dx = -ball.dx;
}

/***			Checking for winner			***/
function checkWinner()
{
	if (player1.score >= 10) return "Player 1";
	else if (player2.score >= 10) return "Player 2";
	return null;
}

/***			Game Loop					  ***/
function gameLoop()
{
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawPaddle(player1);
	drawPaddle(player2);
	drawBall();
	drawScore();


	checkBallPaddleCollision();

	const winner = checkWinner();
	if (winner)
	{
		drawWinMessage(winner);
		// send data to caro a son microservice
		game_done = true; //Karl: je n'ai plus besoin de cette variable, 
		//j'avais juste besoin de savoir ou appeler la fonction du dessous
		// sendGameDataToDjango(); //for AI //TODO avec karl
	}
	else
	{
		update_game_data_periodically(data); //for AI
		movePaddles();
		moveBall();
		requestAnimationFrame(gameLoop);
	}
}

/*** Event Listeners For Paddle Movement	   ***/
document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

/***			Handling KeyPress			  ***/
function keyDownHandler(e)
{
	switch (e.key) {
		case "ArrowUp":
			if (AI_present == false)
				player2.dy = -paddleSpeed;
			break;
		case "ArrowDown":
			if (AI_present == false)
				player2.dy = paddleSpeed;
			break;
		case "w":
			player1.dy = -paddleSpeed;
			break;
		case "s":
			player1.dy = paddleSpeed;
			break;
	}
}

function keyUpHandler(e)
{
	switch (e.key) {
		case "ArrowUp":
		case "ArrowDown":
			if (AI_present == false)
				player2.dy = 0;
			break;
		case "w":
		case "s":
			player1.dy = 0;
			break;
	}
}

/***			functions for AI				  ***/

function simulateKeyPress(key)
{
	document.dispatchEvent(new KeyboardEvent('keydown', { key: key }));	
}

function simulateKeyRelease(key)
{
	document.dispatchEvent(new KeyboardEvent('keyup', { key: key }));
}

// Dashboard django database
// import { sendGameDataToDjango } from 'sendGameDataToDjango.js'; //TODO //HERE
import { getPaddleAction, GameData } from './ai.js';

let data = new GameData();
let	DOWN	= 0;
let	UP		= 1;

function aiMovePaddle()
{
	let paddle_action = getPaddleAction();
	if (paddle_action == 42) //ERROR
		return ; //check avec Marine

	if (!roundStarted) //pour éviter l'epilepsie du début
		return ;

	if (paddle_action == UP)
	{
		simulateKeyPress('ArrowUp');
		simulateKeyRelease('ArrowDown');
	}
	else if (paddle_action == DOWN)
	{
		simulateKeyPress('ArrowDown');
		simulateKeyRelease('ArrowUp');
	}
}

function updateGameData()
{
	// ball velocity
	data.ball_horizontal = ballSpeedX;
	data.ball_vertical = ballSpeedY;

	// field's top/bottom right Y coordinate
	data.fieldY_top = FIELD_POSITION_Y + FIELD_Y / 2;
	data.fieldY_bottom = FIELD_POSITION_Y - FIELD_Y / 2;

	// field's right bound X coordinate
	data.fieldX_right = FIELD_POSITION_X + FIELD_X / 2;

	data.ball_radius = BALL_RATIO;

	data.paddle_width = PADDLE_X;
	
	// paddle Y coordinate
	data.paddle_y = rightPaddle.position.y;
}

function update_game_data_periodically()
{
	// Update data immediately before starting the interval
	updateGameData();

	setInterval(() => {
		updateGameData();
	}, 1000); // Fetch game data once per second
}

export function update_game_data()
{
	return data;
}


/***			Starting Pong				  ***/
gameLoop();
