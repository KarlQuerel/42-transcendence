/***********************************************\
-					IMPORTS						-
\***********************************************/
import { DEBUG }
from '../../main.js';

import { GameVar }
from './gameVariables.js';

import { startTournament, displayTournamentForm, startTournamentGame, initializeTournamentMode}
from './tournament.js'

/***********************************************\
-				RENDERING						-
\***********************************************/
export default function renderPong()
{
	const	container = createContainer();
	const	video = createVideo();
	const	overlay = createOverlay();

	container.appendChild(video);
	container.appendChild(overlay);
	container.appendChild(createWinningMessage());
	container.appendChild(createRematchButton());
	container.appendChild(createCanvas());
	container.appendChild(createPausedGifContainer());

	return container;
}

/***********************************************\
-				CREATING ELEMENTS				-
\***********************************************/
function createContainer()
{
	const	container = document.createElement('div');
	container.id = 'pong-page';
	container.className = 'container-fluid p-0';
	return container;
}

function createVideo()
{
	const	video = document.createElement('video');
	video.id = 'background-video';
	video.autoplay = true;
	video.muted = true;
	video.loop = true;

	const	source = document.createElement('source');
	source.src = '../../../assets/images/pong/tunnel_background.mp4';
	source.type = 'video/mp4';
	video.appendChild(source);

	return video;
}

function createOverlay()
{
	const	overlay = document.createElement('div');
	overlay.id = 'menu-overlay';
	overlay.className = 'menu-overlay';

	const	menuButtonsContainer = document.createElement('div');
	menuButtonsContainer.className = 'menu-buttons-container';

	// Container for the first two buttons (row)
	const	rowContainer = document.createElement('div');
	rowContainer.className = 'row-container';

	const	singlePlayerButton = createMenuButton('singleplayer-button', 'Single Player', '../../../assets/images/pong/menu/single_player.gif');
	const	twoPlayerButton = createMenuButton('twoplayer-button', 'Two Players', '../../../assets/images/pong/menu/two_players.gif');
	const	tournamentButton = createTournamentButton();
	const	howToPlayButton = createHowToPlayButton();
	const	howToPlayCard = createHowToPlayCard();

	// Append the first two buttons to the row container
	rowContainer.appendChild(singlePlayerButton);
	rowContainer.appendChild(twoPlayerButton);

	// Append the row container and the tournament button to the main container
	menuButtonsContainer.appendChild(rowContainer);
	menuButtonsContainer.appendChild(tournamentButton);
	menuButtonsContainer.appendChild(howToPlayButton);
	menuButtonsContainer.appendChild(howToPlayCard);

	overlay.appendChild(menuButtonsContainer);

	return overlay;
}

function createMenuButton(id, text, gifSrc)
{
	const	button = document.createElement('button');
	button.id = id;
	button.className = 'menu-button btn';
	button.textContent = text;

	const	gif = document.createElement('img');
	gif.src = gifSrc;
	gif.alt = `${text} GIF`;
	gif.className = 'menu-gif';

	button.appendChild(gif);
	return button;
}

function createTournamentButton()
{
	const	button = document.createElement('button');
	button.id = 'tournament-button';
	button.className = 'menu-button btn';
	button.textContent = 'Tournament';

	const	gif1 = document.createElement('img');
	gif1.src = '../../../assets/images/pong/menu/tournament_blue.gif';
	gif1.alt = 'Tournament GIF 1';
	gif1.className = 'menu-gif tournament-gif-left';

	const	gif2 = document.createElement('img');
	gif2.src = '../../../assets/images/pong/menu/tournament_red.gif';
	gif2.alt = 'Tournament GIF 2';
	gif2.className = 'menu-gif tournament-gif-right';

	button.appendChild(gif1);
	button.appendChild(gif2);
	
	return button;
}

function createHowToPlayButton()
{
	const	button = document.createElement('button');
	button.id = 'how-to-play-button';
	button.className = 'btn btn-home btn-howtoplay';
	button.textContent = 'How to Play';
	button.addEventListener('click', () => {
		const	card = document.getElementById('how-to-play-card');
		if (card)
		{
			card.classList.toggle('show');
		}
	});

	return button;
}

function createHowToPlayCard()
{
	const	cardDiv = document.createElement('div');
	cardDiv.id = 'how-to-play-card';
	cardDiv.className = 'card how-to-play-card';

	const	container = document.createElement('div');
	container.className = 'container';

	const	row = document.createElement('div');
	row.className = 'row';

	const	sections =
	[
		{
			title: 'Left Player',
			text: 'Press W or S to move',
			gifs: ['../../../assets/images/pong/how_to_play/W.gif', '../../../assets/images/pong/how_to_play/S.gif']
		},
		{
			title: 'Right Player',
			text: 'Press the UP or DOWN arrows to move',
			gifs: ['../../../assets/images/pong/how_to_play/UP.gif', '../../../assets/images/pong/how_to_play/DOWN.gif']
		},
		{
			title: 'Pause',
			text: 'Press ESC or P to pause',
			gifs: ['../../../assets/images/pong/how_to_play/ESC.gif', '../../../assets/images/pong/how_to_play/P.gif']
		}
	];

	sections.forEach(section =>
	{
		const	textCol = document.createElement('div');
		textCol.className = 'col';
		const	title = document.createElement('h6');
		title.textContent = section.title;
		const	text = document.createElement('p');
		text.textContent = section.text;
		textCol.appendChild(title);
		textCol.appendChild(text);

		const	gifCol = document.createElement('div');
		gifCol.className = 'col d-flex justify-content-center';
		section.gifs.forEach(src =>
		{
			const	gif = createCardGif(src, `How to Play ${section.title} GIF`);
			gif.classList.add('img-fluid', 'how-to-play-gif');
			gifCol.appendChild(gif);
		});

		row.appendChild(textCol);
		row.appendChild(gifCol);

		const	rowBreak = document.createElement('div');
		rowBreak.className = 'w-100';
		row.appendChild(rowBreak);
	});

	container.appendChild(row);
	cardDiv.appendChild(container);

	return cardDiv;
}

function createCardGif(src, alt)
{
	const	gif = document.createElement('img');
	gif.src = src;
	gif.alt = alt;
	gif.className = 'img-fluid';
	return gif;
}

function createWinningMessage()
{
	const	winningMessage = document.createElement('div');
	winningMessage.id = 'winning-message';
	winningMessage.className = 'hidden';
	return winningMessage;
}

function createRematchButton()
{
	const	rematchButton = document.createElement('button');
	rematchButton.id = 'rematch-button';
	rematchButton.textContent = 'Rematch';
	return rematchButton;
}

function createCanvas()
{
	const	canvas = document.createElement('canvas');
	canvas.id = 'pongCanvas';
	return canvas;
}

function createPausedGifContainer()
{
	const	container = document.createElement('div');
	container.id = 'paused-gif-container';
	container.className = 'd-flex justify-content-center align-items-center hidden';

	const	pausedGif = document.createElement('img');
	pausedGif.id = 'paused-gif';
	pausedGif.src = '../../../assets/images/pong/paused.gif';
	pausedGif.alt = 'Paused GIF';

	container.appendChild(pausedGif);
	return container;
}

/***********************************************\
-				GAME CONFIG						-
\***********************************************/

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
	if (DEBUG)
		console.log('Initializing Pong...');

	requestAnimationFrame(() =>
	{
		setupCanvas();
		setupMenuButtons();
		setupEventListeners();
		setupCanvasDimensions();
	});
}

function setupCanvas()
{
	document.body.classList.add('no-scroll');
	canvas = document.getElementById("pongCanvas");

	if (canvas)
	{
		ctx = canvas.getContext("2d");
		if (!ctx)
		{
			console.error("Context could not be retrieved!");
		}
	}
	else
	{
		console.error("Canvas element not found!");
	}
}

function setupMenuButtons()
{
	const	singleplayerButton = document.getElementById('singleplayer-button');
	const	twoplayerButton = document.getElementById('twoplayer-button');
	const	tournamentButton = document.getElementById('tournament-button');
	const	rematchButton = document.getElementById('rematch-button');
	const	menuOverlay = document.getElementById('menu-overlay');

	if (!singleplayerButton || !twoplayerButton || !tournamentButton)
	{
		console.error('Menu buttons not found!');
		return;
	}

	singleplayerButton.addEventListener('click', () => prepareGame(menuOverlay, true));
	twoplayerButton.addEventListener('click', () => prepareGame(menuOverlay, false));
	tournamentButton.addEventListener('click', () => startTournament(menuOverlay));

	if (!rematchButton)
	{
		console.error('Rematch button not found!');
	}
	else
	{
		rematchButton.addEventListener('click', resetGame);
	}
}

function setupEventListeners()
{
	window.addEventListener('resize', handleResize);
	document.addEventListener("keydown", keyDownHandler);
	document.addEventListener("keyup", keyUpHandler);
}

function setupCanvasDimensions()
{
	const	setCanvasDimensions = () =>
	{
		const	viewportHeight = window.innerHeight;
		canvas.width = viewportHeight * 0.8; // 80% of viewport height
		canvas.height = viewportHeight * 0.6; // 60% of viewport height
	};

	setCanvasDimensions();
}

function handleResize()
{
	setupCanvasDimensions();
	enforceMinimumWindowSize();
}

function enforceMinimumWindowSize()
{
	const	minWidth = 800; // TODO KARL check for responsiveness
	const	minHeight = 600;

	if (window.innerWidth < minWidth || window.innerHeight < minHeight)
	{
		window.resizeTo(Math.max(window.innerWidth, minWidth), Math.max(window.innerHeight, minHeight));
	}
}

/***			Starting Game				***/
function prepareGame(menuOverlay, isSinglePlayer)
{

	GameVar.AI_present = isSinglePlayer;
	menuOverlay.classList.add('hidden');

	const	countdownDisplay = document.createElement('div');
	countdownDisplay.className = 'countdown';
	document.body.appendChild(countdownDisplay);

	let countdown = 3;
	countdownDisplay.textContent = countdown;
	const	countdownInterval = setInterval(() =>
	{
		countdown--;
		if (countdown > 0)
		{
			countdownDisplay.textContent = countdown;
		}
		else
		{
			countdownDisplay.textContent = 'GO!';
			clearInterval(countdownInterval);
			setTimeout(() =>
			{
				document.body.removeChild(countdownDisplay);
				startGame();
			}, 1000);
		}
	}, 1000);
}

export function startGame()
{
	if (canvas)
	{
		canvas.style.zIndex = 1;
	}

	GameVar.isGameModeSelected = true;

	player1.y = (canvas.height - paddleHeight) / 2;
	player2.x = canvas.width - paddleWidth - paddleOffset;
	player2.y = (canvas.height - paddleHeight) / 2;
	ball.x = canvas.width / 2;
	ball.y = canvas.height / 2;

	GameVar.game_done = false;
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
	ctx.fillStyle = "var(----base-green)";
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
	ctx.fillText("PAUSED", canvas.width / 2, canvas.height / 2 - 80);

	const	pausedGifContainer = document.getElementById('paused-gif-container');
	if (pausedGifContainer)
	{
		pausedGifContainer.classList.remove('hidden');
		pausedGifContainer.classList.add('show');
	}
}

/***			Hiding Pausing GIF		***/
function hidePauseMenu()
{
	const	pausedGifContainer = document.getElementById('paused-gif-container');
	if (pausedGifContainer)
	{
		pausedGifContainer.classList.remove('show');
		pausedGifContainer.classList.add('hidden');
	}
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
		resetAll();
	}
	else if (ball.x + ball.radius > canvas.width)
	{
		player1.score++;
		resetAll();
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
		ball.speed += 0.5;
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
		ball.speed += 0.5;
	}
}

/***				Resetting All			***/
function resetAll()
{
	resetBall();
	resetPaddles();
}

/***				Resetting Ball			***/
function resetBall()
{
	ball.x = canvas.width / 2;
	ball.y = canvas.height / 2;
		
	// Reset the ball speed to the initial speed
	ball.speed = 5;

	// Reverse the horizontal direction of the ball based on its current direction
	if (ball.dx > 0)
	{
		ball.dx = -ball.speed;
	}
	else
	{
		ball.dx = ball.speed;
	}

	// Reset the vertical direction based on its current direction
	if (ball.dy > 0)
	{
		ball.dy = ball.speed;
	}
	else
	{
		ball.dy = -ball.speed;
	}
}

/***			Resetting Paddles			***/
function resetPaddles()
{
	player1.y = (canvas.height - paddleHeight) / 2;
	player2.y = (canvas.height - paddleHeight) / 2;
}

/***********************************************\
-				KEYBOARD HANDLING				-
\***********************************************/
function keyDownHandler(e)
{
	if (GameVar.isGameModeSelected == false)
		return ;
	
	if (e.key === "p" || e.key === "Escape")
	{
		GameVar.game_paused = !GameVar.game_paused;
		if (game_paused == true)
		{
			cancelAnimationFrame(GameVar.animationFrameId);
			drawPauseMenu();
			GameVar.animationFrameId = requestAnimationFrame(gameLoop);
		}
		else
		{
			cancelAnimationFrame(GameVar.animationFrameId);
			hidePauseMenu();
			GameVar.animationFrameId = requestAnimationFrame(gameLoop);
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
 //TODO KARL - refactor this fucking long file

/* imports the function that returns the AI paddle's movement */
import { getPaddleAction } from './ai.js';

/* imports the uninitialized GameData class */
import { GameData } from './ai.js';

let data = new GameData();

function updateGameData()
{
	data.ballX = ball.x;
	data.ballY = ball.y;
	data.ball_radius = ball.radius;
	data.ballX_velocity = ball.dx;
	data.ballY_velocity = ball.dy;

	data.fieldY_top = 0;
	data.fieldY_bottom = canvas.height;
	data.fieldX_right = canvas.width;

	data.paddleY = player2.y;
	data.paddle_height = paddleHeight;
	data.paddle_width = paddleWidth;
}

/* Exports the current game data held inside the data class.
The information hold inside this class can differ from the actual 
current game info, since the data class is only updated once per 
second thanks to the time interval created inside gameLoop(). */
export function update_game_data()
{
	return data;
}

/* All possible returns from getPaddleAction() */
const	DOWN = 0
const	UP = 1
const	ERROR = 42

//CHECK CARO: simulate key press obligatoire? cf interprétation du sujet
/* document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

function simulateKeyPress(key) {
	document.dispatchEvent(new KeyboardEvent('keydown', { key: key }));
}

function simulateKeyRelease(key) {
	document.dispatchEvent(new KeyboardEvent('keyup', { key: key }));
} */

/* Simulates a key press from the AI's paddle */
function moveAiPaddle()
{
	//TODO KARL
/* 	if (getPaddleAction() == ERROR)
		STOP THE GAME */
	if (getPaddleAction() == UP)
	{
/* 		simulateKeyPress('ArrowUp');
		simulateKeyRelease('ArrowUp'); */
		player2.dy = -paddleSpeed;
	}
	else if (getPaddleAction() == DOWN)
	{
/* 		simulateKeyPress('ArrowDown');
		simulateKeyRelease('ArrowDown'); */
		player2.dy = paddleSpeed;
	}
}

/***********************************************************************************/
/************************** Dashboard django database*******************************/
/***********************************************************************************/

// import { sendGameDataToDjango } from './sendGameDataToDjango.js'; 

/***********************************************\
-				GAME STATUS						-
\***********************************************/

let startTime;
let elapsedSeconds;
let current_sec;
/***			Main Loop					***/
export function gameLoop()
{
	if (GameVar.game_paused == true)
	{
		drawPauseMenu();
		GameVar.animationFrameId = requestAnimationFrame(gameLoop);
		return;
	}

	if (GameVar.game_done == true)
		return ;
	
	ctx.clearRect(0, 0, canvas.width, canvas.height);

//---------------------------------- AI ----------------------------------
	if (GameVar.AI_present == true)
	{
		// updates the game data for the AI file immediately before starting the time interval
		if (data.ball_horizontal == undefined)
		{
			startTime = Date.now();
			current_sec = 0;
			updateGameData();
		}
		elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
		// updates the game data every second
		if (current_sec != elapsedSeconds)
			updateGameData();
		current_sec = elapsedSeconds;

		moveAiPaddle();
}
//-----------------------------------------------------------------------

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
		GameVar.game_done = true;
	}
	else if (player2.score === 10)
	{
		drawWinMessage("Player 2");
		GameVar.game_done = true;
	}

	if (GameVar.game_done == false)
	{
		GameVar.animationFrameId = requestAnimationFrame(gameLoop);
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
	GameVar.game_done = false;
	GameVar.isGameModeSelected = false;
	requestAnimationFrame(gameLoop);
}

/***			Closing Pong Game			***/
export function cleanUpPong()
{
	if (DEBUG)
		console.log('Cleaning up Pong...')

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
	GameVar.game_done = true;
	GameVar.game_paused = false;
	GameVar.AI_present = false;

	document.body.classList.remove('no-scroll');
}