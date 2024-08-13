export default function renderPong()
{
	return `
		<div id="pong-page">
			<video id="background-video" autoplay muted loop>
				<source src="../../../assets/images/pong/tunnel_background.mp4" type="video/mp4">
			</video>
			<h1 class="pong-title">Pong Game</h1>
			<div id="winning-message" class="hidden"></div>
			<button id="rematch-button" class="hidden">Rematch</button>
			<canvas id="pongCanvas" width="800" height="600"></canvas>
			<p class="pong-instructions">Use W/S keys for Player 1 and Arrow Up/Down for Player 2.</p>
		</div>
	`;
}


/***********************************************\
-				GAME CONFIG						-
\***********************************************/

/***			General						***/
let	game_done = false;
let	AI_present = false;
let	game_paused = false;

/***			Graphics					***/
let canvas, ctx;

/***			Paddle Properties			***/
const paddleWidth = 10;
const paddleHeight = 100;
const paddleSpeed = 8;
const paddleOffset = 20;

/***			Player Paddles				***/
const player1 =
{
	x: paddleOffset,
	y: 0,
	width: paddleWidth,
	height: paddleHeight,
	color: "cyan", // Neon color
	shadowColor: 'rgba(0, 255, 255, 0.8)', // Neon cyan glow
	shadowBlur: 20, // Intensity of the glow
	dy: 0,
	score: 0
};

const player2 =
{
	x: 0,
	y: 0,
	width: paddleWidth,
	height: paddleHeight,
	color: "magenta", // Neon color
	shadowColor: 'rgba(255, 0, 255, 0.8)', // Neon magenta glow
	shadowBlur: 20, // Intensity of the glow
	dy: 0,
	score: 0
};


/***			Ball Properties				***/
const ball =
{
	x: 0,
	y: 0,
	radius: 10,
	speed: 5,
	dx: 5,
	dy: 5
};

/***********************************************\
-				INITIALIZE PONG					-
\***********************************************/
export function initializePong()
{
	console.log('Initializing Pong...');

	// Ensure initialization runs after content is rendered
	requestAnimationFrame(() =>
	{
		canvas = document.getElementById("pongCanvas");
		if (!canvas)
		{
			console.error("Canvas element not found!");
			return;
		}

		ctx = canvas.getContext("2d");
		if (!ctx)
		{
			console.error("Context could not be retrieved!");
			return;
		}

		console.log('Canvas and context retrieved successfully.');

		// Ensure canvas has correct dimensions and border if dynamically set
		canvas.style.border = "5px solid #00ff00"; // Green border

		player1.y = (canvas.height - paddleHeight) / 2;
		player2.x = canvas.width - paddleWidth - paddleOffset;
		player2.y = (canvas.height - paddleHeight) / 2;
		ball.x = canvas.width / 2;
		ball.y = canvas.height / 2;

		game_done = false;
		gameLoop();

		const rematchButton = document.getElementById('rematch-button');
		if (rematchButton)
			rematchButton.addEventListener('click', resetGame);
	});
}

/***********************************************\
-				RENDERING						-
\***********************************************/

/***			Drawing Paddles				***/
function drawPaddle(paddle)
{
	ctx.fillStyle = paddle.color;
	ctx.shadowColor = paddle.shadowColor || 'rgba(0, 255, 0, 0.8)'; // Default neon green
	ctx.shadowBlur = paddle.shadowBlur || 100; // Increase for more glow

	// Set rounded corners
	const cornerRadius = 5;
	ctx.lineJoin = "round";
	ctx.lineCap = "round";
	ctx.lineWidth = 10; // Ensure the width is enough to make the corners visible

	// Begin drawing the paddle with rounded corners
	ctx.beginPath();
	ctx.moveTo(paddle.x + cornerRadius, paddle.y); // Top-left corner
	ctx.lineTo(paddle.x + paddle.width - cornerRadius, paddle.y); // Top-right corner
	ctx.quadraticCurveTo(paddle.x + paddle.width, paddle.y, paddle.x + paddle.width, paddle.y + cornerRadius); // Top-right rounded corner
	ctx.lineTo(paddle.x + paddle.width, paddle.y + paddle.height - cornerRadius); // Right side
	ctx.quadraticCurveTo(paddle.x + paddle.width, paddle.y + paddle.height, paddle.x + paddle.width - cornerRadius, paddle.y + paddle.height); // Bottom-right rounded corner
	ctx.lineTo(paddle.x + cornerRadius, paddle.y + paddle.height); // Bottom side
	ctx.quadraticCurveTo(paddle.x, paddle.y + paddle.height, paddle.x, paddle.y + paddle.height - cornerRadius); // Bottom-left rounded corner
	ctx.lineTo(paddle.x, paddle.y + cornerRadius); // Left side
	ctx.quadraticCurveTo(paddle.x, paddle.y, paddle.x + cornerRadius, paddle.y); // Top-left rounded corner
	ctx.closePath();

	ctx.fill(); // Fill the paddle
	ctx.shadowColor = 'transparent'; // Reset shadow to avoid affecting other drawings
}


/***		Drawing Ball					***/
function drawBall()
{
	ctx.beginPath();
	ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
	ctx.fillStyle = "white";
	ctx.fill();
	ctx.closePath();
}

/***		Drawing Score					***/
function drawScore()
{
	// Set font properties
	ctx.font = "48px 'Press Start 2P', cursive"; // Retro arcade font and larger size
	ctx.textAlign = "center"; // Center the score text
	ctx.textBaseline = "middle"; // Vertical alignment of text

	// Score color and shadow
	ctx.fillStyle = "var(--retro-green)";
	ctx.shadowColor = "rgba(0, 255, 0, 0.8)"; // Retro green shadow
	ctx.shadowBlur = 10; // Blur effect for the shadow

	// Draw Player 1's score
	ctx.fillText(player1.score, canvas.width / 4, 50);

	// Draw Player 2's score
	ctx.fillText(player2.score, 3 * canvas.width / 4, 50);

	// Reset shadow to avoid affecting other drawings
	ctx.shadowColor = "transparent";
}


/***			Drawing Winning Message		***/
function drawWinMessage(winner)
{
	const messageElement = document.getElementById('winning-message');
	const rematchButton = document.getElementById('rematch-button');

	messageElement.textContent = winner + " Wins!";
	messageElement.classList.add('show'); // Show the winning message

	rematchButton.classList.remove('hidden'); // Show the rematch button
}

/***			Drawing Pause Menu			***/
function drawPauseMenu()
{
	ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	ctx.fillStyle = "white";
	ctx.font = "48px 'Press Start 2P', cursive";
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	ctx.fillText("PAUSED", canvas.width / 2, canvas.height / 2);
}


/***********************************************\
-				GAME DYNAMICS					-
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

	if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0)
	{
		ball.dy *= -1;
	}

	if (
		(ball.x - ball.radius < player1.x + player1.width && ball.y > player1.y && ball.y < player1.y + player1.height) ||
		(ball.x + ball.radius > player2.x && ball.y > player2.y && ball.y < player2.y + player2.height)
	)
	{
		ball.dx *= -1;
	}

	if (ball.x - ball.radius < 0)
	{
		player2.score++;
		resetBall();
	}
	else if (ball.x + ball.radius > canvas.width)
	{
		player1.score++;
		resetBall();
	}
}

function checkBallPaddleCollision()
{
	// Check collision with Player 1's paddle
	if (ball.x - ball.radius < player1.x + player1.width && ball.x + ball.radius > player1.x && ball.y + ball.radius > player1.y && ball.y - ball.radius < player1.y + player1.height)
	{
		let collidePointP1 = (ball.y - (player1.y + player1.height / 2));
		collidePointP1 = collidePointP1 / (player1.height / 2);
		let angleRadP1 = collidePointP1 * Math.PI / 4;
		ball.dx = ball.speed * Math.cos(angleRadP1);
		ball.dy = ball.speed * Math.sin(angleRadP1);
		if (ball.dx < 0)
			ball.dx = -ball.dx;
		ball.speed += 0.1;
	}

	// Check collision with Player 2's paddle
	if (ball.x - ball.radius < player2.x + player2.width && ball.x + ball.radius > player2.x && ball.y + ball.radius > player2.y && ball.y - ball.radius < player2.y + player2.height)
	{
		let collidePointP2 = (ball.y - (player2.y + player2.height / 2));
		collidePointP2 = collidePointP2 / (player2.height / 2);
		let angleRadP2 = collidePointP2 * Math.PI / 4;
		ball.dx = ball.speed * Math.cos(angleRadP2);
		ball.dy = ball.speed * Math.sin(angleRadP2);
		if (ball.dx > 0)
			ball.dx = -ball.dx;
		ball.speed += 0.1;
	}
}

function resetBall()
{
	ball.x = canvas.width / 2;
	ball.y = canvas.height / 2;
	ball.dx = -ball.dx;
	ball.speed = 5;
}

/***********************************************\
-				KEYBOARD HANDLING				-
\***********************************************/

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

function keyDownHandler(e)
{
	if (e.key === "p" || e.key === "Escape")
	{
		game_paused = !game_paused;
		if (game_paused == false)
		{
			resetBall();
			gameLoop();
		}
		return ;
	}
	
	if (e.key === "w" || e.key === "ArrowUp")
	{
		if (e.key === "w")
			player1.dy = -paddleSpeed;
		else if (e.key === "ArrowUp")
			player2.dy = -paddleSpeed;
	}
	else if (e.key === "s" || e.key === "ArrowDown")
	{
		if (e.key === "s")
			player1.dy = paddleSpeed;
		else if (e.key === "ArrowDown")
			player2.dy = paddleSpeed;
	}
}

function keyUpHandler(e)
{
	if (e.key === "w" || e.key === "s")
	{
		player1.dy = 0;
	}
	else if (e.key === "ArrowUp" || e.key === "ArrowDown")
	{
		player2.dy = 0;
	}
}

/***********************************************\
-				GAME STATUS						-
\***********************************************/

export function gameLoop()
{
	if (game_paused == true)
	{
		drawPauseMenu();
		requestAnimationFrame(gameLoop);
		return;
	}

	if (game_done == true)
		return ;
	
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	movePaddles();
	moveBall();
	checkBallPaddleCollision();

	drawPaddle(player1);
	drawPaddle(player2);
	drawBall();
	drawScore();

	if (player1.score === 10)
	{
		drawWinMessage("Player 1");
		game_done = true;
	}
	else if (player2.score === 10)
	{
		drawWinMessage("Player 2");
		game_done = true;
	}

	if (!game_done)
	{
		requestAnimationFrame(gameLoop);
	}
}

// TODO - voir avec caro si c'est pas trop galere
function resetGame()
{
	// Reset game state
	player1.score = 0;
	player2.score = 0;
	ball.speed = 5;
	ball.dx = 5;
	ball.dy = 5;

	// Hide the winning message and rematch button
	const messageElement = document.getElementById('winning-message');
	const rematchButton = document.getElementById('rematch-button');

	messageElement.classList.remove('show');
	rematchButton.classList.add('hidden');

	// Restart the game
	game_done = false;
	requestAnimationFrame(gameLoop);
}
