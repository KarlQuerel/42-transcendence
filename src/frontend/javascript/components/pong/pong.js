/***********************************************\
-				RENDERING						-
\***********************************************/
export default function renderPong()
{
	const container = document.createElement('div');
	container.id = 'pong-page';

	const video = document.createElement('video');
	video.id = 'background-video';
	video.autoplay = true;
	video.muted = true;
	video.loop = true;
		
	const source = document.createElement('source');
	source.src = '../../../assets/images/pong/tunnel_background.mp4';
	source.type = 'video/mp4';
	video.appendChild(source);

	container.appendChild(video);

	const overlay = document.createElement('div');
	overlay.id = 'menu-overlay';
	overlay.className = 'menu-overlay';
		
	const singlePlayerButton = document.createElement('button');
	singlePlayerButton.id = 'singleplayer-button';
	singlePlayerButton.className = 'menu-button';
	singlePlayerButton.textContent = 'Single Player';
	overlay.appendChild(singlePlayerButton);

	const singlePlayerGif = document.createElement('img');
	singlePlayerGif.src = '../../../assets/images/pong/single_player.gif';
	singlePlayerGif.alt = '1P GIF';
	singlePlayerGif.className = 'menu-gif';
	overlay.appendChild(singlePlayerGif);

	const twoPlayerButton = document.createElement('button');
	twoPlayerButton.id = 'twoplayer-button';
	twoPlayerButton.className = 'menu-button';
	twoPlayerButton.textContent = 'Two Players';
	overlay.appendChild(twoPlayerButton);

	const twoPlayerGif = document.createElement('img');
	twoPlayerGif.src = '../../../assets/images/pong/two_players.gif';
	twoPlayerGif.alt = '2P GIF';
	twoPlayerGif.className = 'menu-gif';
	overlay.appendChild(twoPlayerGif);

	container.appendChild(overlay);

	const title = document.createElement('h1');
	title.className = 'pong-title';
	title.textContent = 'Pong Game';
	container.appendChild(title);

	const winningMessage = document.createElement('div');
	winningMessage.id = 'winning-message';
	winningMessage.className = 'hidden';
	container.appendChild(winningMessage);

	const rematchButton = document.createElement('button');
	rematchButton.id = 'rematch-button';
	rematchButton.textContent = 'Rematch';
	container.appendChild(rematchButton);

	const canvas = document.createElement('canvas');
	canvas.id = 'pongCanvas';
	container.appendChild(canvas);

	const instructions = document.createElement('p');
	instructions.className = 'pong-instructions';
	instructions.textContent = 'Use W/S keys for Player 1 and Arrow Up/Down for Player 2.';
	container.appendChild(instructions);

	const pausedGifContainer = document.createElement('div');
	pausedGifContainer.id = 'paused-gif-container';
	pausedGifContainer.className = 'hidden';
		
	const pausedGif = document.createElement('img');
	pausedGif.id = 'paused-gif';
	pausedGif.src = '../../../assets/images/pong/paused.gif';
	pausedGif.alt = 'Paused GIF';
	pausedGifContainer.appendChild(pausedGif);

	container.appendChild(pausedGifContainer);

	return container;
}

/***********************************************\
-				GAME CONFIG						-
\***********************************************/

/***			General						***/
let	game_done = false;
let	game_paused = false;
let	AI_present = false;

/***			Graphics					***/
let		canvas, ctx;
const	minWidth = 800;
const	minHeight = 600;

/***			Paddle Properties			***/
const	paddleWidth = 10;
const	paddleHeight = 100;
const	paddleSpeed = 8;
const	paddleOffset = 20;

/***			Player Paddles				***/
const	player1 =
{
	x: paddleOffset,
	y: 0,
	width: paddleWidth,
	height: paddleHeight,
	color: "cyan",
	shadowColor: 'rgba(0, 255, 255, 0.8)',
	shadowBlur: 20,
	dy: 0,
	score: 0
};

const	player2 =
{
	x: 0,
	y: 0,
	width: paddleWidth,
	height: paddleHeight,
	color: "magenta",
	shadowColor: 'rgba(255, 0, 255, 0.8)',
	shadowBlur: 20,
	dy: 0,
	score: 0
};


/***			Ball Properties				***/
const	ball =
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
	// console.log('Initializing Pong...');

	// Ensure initialization runs after content is rendered
	requestAnimationFrame(() =>
	{
		canvas = document.getElementById("pongCanvas");
		const	rematchButton = document.getElementById('rematch-button');
		const	singleplayerButton = document.getElementById('singleplayer-button');
		const	twoplayerButton = document.getElementById('twoplayer-button');
		const	menuOverlay = document.getElementById('menu-overlay');
		const	pongInstructions = document.querySelector('.pong-instructions');

		if (!canvas)
		{
			console.error("Canvas element not found!");
			return;
		}

		if (!singleplayerButton || !twoplayerButton)
		{
			console.error('Menu buttons not found!');
			return ;
		}

		singleplayerButton.addEventListener('click', () =>
		{
			AI_present = true;
			startGame(menuOverlay, pongInstructions);
		});

		twoplayerButton.addEventListener('click', () =>
		{
			AI_present = false;
			startGame(menuOverlay, pongInstructions);
		})

		if (!rematchButton)
		{
			console.error('Rematch button not found!');
			return ;
		}
		else
		{
			// console.log('Rematch button found:', rematchButton);
			rematchButton.addEventListener('click', resetGame);
		}
		
		ctx = canvas.getContext("2d");
		if (!ctx)
		{
				console.error("Context could not be retrieved!");
			return;
		}

		// console.log('Canvas and context retrieved successfully.');

		canvas.style.border = "5px solid #00ff00";

		// Set canvas dimensions based on viewport height
		const	setCanvasDimensions = () =>
		{
			const	viewportHeight = window.innerHeight;
			canvas.width = viewportHeight * 0.8; // 80% of viewport height
			canvas.height = viewportHeight * 0.6; // 60% of viewport height
		};

		setCanvasDimensions();

		// Adjust canvas size on window resize
		window.addEventListener('resize', () =>
		{
			setCanvasDimensions();

			// Enforce minimum window size
			if (window.innerWidth < minWidth || window.innerHeight < minHeight)
			{
				window.resizeTo
				(
					Math.max(window.innerWidth, minWidth),
					Math.max(window.innerHeight, minHeight)
				);
			}
		});

		document.addEventListener("keydown", keyDownHandler);
		document.addEventListener("keyup", keyUpHandler);
	});
}

/***			Starting Game				***/
function startGame(menuOverlay, pongInstructions)
{
	menuOverlay.classList.add('hidden');
	pongInstructions.classList.remove('hidden');

	player1.y = (canvas.height - paddleHeight) / 2;
	player2.x = canvas.width - paddleWidth - paddleOffset;
	player2.y = (canvas.height - paddleHeight) / 2;
	ball.x = canvas.width / 2;
	ball.y = canvas.height / 2;

	game_done = false;
	gameLoop();
}

/***********************************************\
-				RENDERING						-
\***********************************************/

/***			Drawing Paddles				***/
function drawPaddle(paddle)
{
	ctx.fillStyle = paddle.color;
	ctx.shadowColor = paddle.shadowColor || 'rgba(0, 255, 0, 0.8)';
	ctx.shadowBlur = paddle.shadowBlur || 100;

	// Set rounded corners
	const	cornerRadius = 5;
	ctx.lineJoin = "round";
	ctx.lineCap = "round";
	ctx.lineWidth = 10;

	// Begin drawing the paddle with rounded corners
	ctx.beginPath();
	ctx.moveTo(paddle.x + cornerRadius, paddle.y);
	ctx.lineTo(paddle.x + paddle.width - cornerRadius, paddle.y);
	ctx.quadraticCurveTo(paddle.x + paddle.width, paddle.y, paddle.x + paddle.width, paddle.y + cornerRadius);
	ctx.lineTo(paddle.x + paddle.width, paddle.y + paddle.height - cornerRadius);
	ctx.quadraticCurveTo(paddle.x + paddle.width, paddle.y + paddle.height, paddle.x + paddle.width - cornerRadius, paddle.y + paddle.height);
	ctx.lineTo(paddle.x + cornerRadius, paddle.y + paddle.height);
	ctx.quadraticCurveTo(paddle.x, paddle.y + paddle.height, paddle.x, paddle.y + paddle.height - cornerRadius);
	ctx.lineTo(paddle.x, paddle.y + cornerRadius);
	ctx.quadraticCurveTo(paddle.x, paddle.y, paddle.x + cornerRadius, paddle.y);
	ctx.closePath();

	ctx.fill();
	ctx.shadowColor = 'transparent';
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
	ctx.font = "48px 'Press Start 2P', cursive";
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";

	// Score color and shadow
	ctx.fillStyle = "var(--retro-green)";
	ctx.shadowColor = "rgba(0, 255, 0, 0.8)";
	ctx.shadowBlur = 10;

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

/***			Checking Paddles			***/
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

/***				Resetting Ball			***/
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
function keyDownHandler(e)
{
	// console.log(`Key pressed: ${e.key}`);

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
-					AI							-
\***********************************************/

import { getPaddleAction } from './ai.js';

import { GameData } from './ai.js';

let data = new GameData();
// console.log("2. data now exists in pong.js and is NULL");

//CARO: pour l'instant pas sûre que ça s'update qu'une fois par seconde...

function updateGameData()
{
	// ball velocity
	data.ball_horizontal = ball.dx; //speedX
	data.ball_vertical = ball.dy; //speedY

	// field's top/bottom right Y coordinate
/* 	data.fieldY_top = FIELD_POSITION_Y + FIELD_Y / 2;
	data.fieldY_bottom = FIELD_POSITION_Y - FIELD_Y / 2; */
	//HERE
	data.fieldY_top = 0;
	data.fieldY_bottom = canvas.height;

	// field's right bound X coordinate
	data.fieldX_right = canvas.width; //HERE

	data.ball_radius = ball.radius;

	data.paddle_height = paddleHeight;
	data.paddle_width = paddleWidth;
	// paddle Y coordinate
	data.paddle_y = player2.y;
}

function update_game_data_periodically()
{
	// Update data immediately before starting the interval
	if (data.ball_horizontal == undefined) //if first value in data is undefined, update all data values for the first time
	{
		updateGameData();
		// console.log("3. data is updated for the first time with the values in pong.js");
	}

	// console.log("4. inside the function that updates the data periodically in pong.js");
	setInterval(() => {
		updateGameData(); //CHECK que c'est bien qu'une fois par seconde
		// console.log("5 : data is updated in pong.js at", new Date().toISOString());
		console.log("---> data.paddle_y = ", data.paddle_y, "VS player2.y = ", player2.y);
		console.log("---> canvas.height - paddleHeight = paddle position = ", canvas.height - paddleHeight);
		console.log("ball position Y = ", ball.y);
	}, 1000); // Fetch game data once per second
}

/* function update_game_data_periodically()
{
    // Update data immediately before starting the interval
    if (data.ball_horizontal == undefined) //if first value in data is undefined, update all data values for the first time
    {
        updateGameData();
        console.log("3. data is updated for the first time with the values in pong.js at", new Date().toISOString());
    }

    console.log("4. inside the function that updates the data periodically in pong.js at", new Date().toISOString());

    function updatePeriodically() {
        updateGameData();
        console.log("5 : data is updated in pong.js at", new Date().toISOString());
        console.log("---> data.paddle_y = ", data.paddle_y, "VS player2.y = ", player2.y);
        setTimeout(updatePeriodically, 1000); // Schedule the next update
    }

    setTimeout(updatePeriodically, 1000); // Start the first update after 1 second
} */

/* let startTime;

function update_game_data_periodically() {
	// Record the start time when the game begins
	if (!startTime) {
		startTime = Date.now();
	}

	// Update data immediately before starting the interval
	if (data.ball_horizontal == undefined) {
		updateGameData();
	}

	function updatePeriodically() {
		updateGameData();
		const elapsedTime = Math.floor((Date.now() - startTime) / 1000); // Calculate elapsed time in seconds
		console.log(`5 : data is updated in pong.js at ${elapsedTime} seconds from the start of the game`);
		console.log("---> data.paddle_y = ", data.paddle_y, "VS player2.y = ", player2.y);
		setTimeout(updatePeriodically, 5000); // Schedule the next update after 1 second
	}

	setTimeout(updatePeriodically, 5000); // Start the first update after 1 second
} */

export function update_game_data()
{
	return data;
}

const DOWN = 0
const UP = 1

// document.addEventListener('keydown', keyDownHandler); //HERE en cours
// document.addEventListener('keyup', keyUpHandler);

// function simulateKeyPress(key) {
// 	document.dispatchEvent(new KeyboardEvent('keydown', { key: key }));
// }

// function simulateKeyRelease(key) {
// 	document.dispatchEvent(new KeyboardEvent('keyup', { key: key }));
// }

function moveAiPaddle()
{
	if (getPaddleAction() == UP)
	{
		// simulateKeyPress('ArrowUp');
		// simulateKeyRelease('ArrowUp');
		player2.dy = -paddleSpeed;
		console.log("AI PADDLE GOING UP");
	}
	else if (getPaddleAction() == DOWN)
	{
		// simulateKeyPress('ArrowDown');
		// simulateKeyRelease('ArrowDown');
		player2.dy = paddleSpeed;
		console.log("AI PADDLE GOING DOWN");
	}
}

/***********************************************************************************/
/************************** Dashboard django database*******************************/
/***********************************************************************************/

// import { sendGameDataToDjango } from '../sendGameDataToDjango.js';

/***********************************************\
-				GAME STATUS						-
\***********************************************/

/***			Main Loop					***/
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

	update_game_data_periodically(); //TEST CARO

	moveAiPaddle();
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

/***			Resetting Game				***/
function resetGame()
{
	// Reset game state
	player1.score = 0;
	player2.score = 0;
	ball.speed = 5;
	ball.dx = 5;
	ball.dy = 5;

	// Hide the winning message and rematch button
	const	messageElement = document.getElementById('winning-message');
	const	rematchButton = document.getElementById('rematch-button');

	messageElement.classList.remove('show');
	rematchButton.classList.add('hidden');

	// Restart the game
	game_done = false;
	requestAnimationFrame(gameLoop);
}

/***			Closing Pong Game			***/
export function cleanUpPong()
{
	// console.log('Cleaning up Pong...')

	// Removing Events Listener
	document.removeEventListener("keydown", keyDownHandler);
	document.removeEventListener("keyup", keyUpHandler);

	// Stopping Game Loop
	cancelAnimationFrame(gameLoop);

	// Removing Game Elements
	const	canvas = document.getElementById("pongCanvas");
	if (canvas)
			canvas.remove();

	// Resetting Game Variables
	game_done = true;
	game_paused = false;
	AI_present = false;
}