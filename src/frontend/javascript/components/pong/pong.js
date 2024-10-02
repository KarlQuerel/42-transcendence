/***********************************************\
-					IMPORTS						-
\***********************************************/
import { DEBUG }
from '../../main.js';

import { BallConf, GameState, GraphConf, PaddleConf, player1, player2, Results }
from './gameVariables.js';

import { startTournament, displayTournamentForm, startTournamentGame,
initializeTournamentMode}
from './tournament.js'

import { createContainer, createVideo, createOverlay, createMenuButton,
createTournamentButton, createHowToPlayButton, createHowToPlayCard, createCardGif,
createWinningMessage, createRematchButton, createCanvas, createPausedGifContainer }
from './createElements.js'

import { drawPaddle, drawBall, drawScore, drawWinMessage, drawPauseMenu, hidePauseMenu }
from './drawing.js'

import { movePaddles, moveBall, checkBallPaddleCollision, keyDownHandler, keyUpHandler }
from './gameDynamics.js'

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
	GraphConf.canvas = document.getElementById("pongCanvas");

	if (GraphConf.canvas)
	{
		GraphConf.ctx = GraphConf.canvas.getContext("2d");
		if (!GraphConf.ctx)
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
		GraphConf.canvas.width = viewportHeight * 0.8; // FIXME for later = zooming problem
		GraphConf.canvas.height = viewportHeight * 0.6;
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
	if (window.innerWidth < GraphConf.minWidth || window.innerHeight < GraphConf.minHeight)
	{
		window.resizeTo(Math.max(window.innerWidth, GraphConf.minWidth), Math.max(window.innerHeight, GraphConf.minHeight));
	}
}

/***			Starting Game				***/
function prepareGame(menuOverlay, isSinglePlayer)
{

	GameState.AI_present = isSinglePlayer;
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
	if (GraphConf.canvas)
	{
		GraphConf.canvas.style.zIndex = 1;
	}

	GameState.isGameModeSelected = true;

	player1.y = (GraphConf.canvas.height - PaddleConf.height) / 2;
	player2.x = GraphConf.canvas.width - PaddleConf.width - PaddleConf.offset;
	player2.y = (GraphConf.canvas.height - PaddleConf.height) / 2;
	BallConf.x = GraphConf.canvas.width / 2;
	BallConf.y = GraphConf.canvas.height / 2;

	GameState.game_done = false;
	gameLoop();
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
	data.ballX = BallConf.x;
	data.ballY = BallConf.y;
	data.ball_radius = BallConf.radius;
	data.ballX_velocity = BallConf.dx;
	data.ballY_velocity = BallConf.dy;

	data.fieldY_top = 0;
	data.fieldY_bottom = GraphConf.canvas.height;
	data.fieldX_right = GraphConf.canvas.width;

	data.paddleY = player2.y;
	data.paddle_height = PaddleConf.height;
	data.paddle_width = PaddleConf.width;
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
		player2.dy = -PaddleConf.speed;
	}
	else if (getPaddleAction() == DOWN)
	{
/* 		simulateKeyPress('ArrowDown');
		simulateKeyRelease('ArrowDown'); */
		player2.dy = PaddleConf.speed;
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
	if (GameState.game_paused == true)
	{
		drawPauseMenu();
		GameState.animationFrameId = requestAnimationFrame(gameLoop);
		return;
	}

	if (GameState.game_done == true)
	{
		// TODO remplir la class results + dependamment de tournoi ou pas rematch ou next
		return ;
	}
	
	GraphConf.ctx.clearRect(0, 0, GraphConf.canvas.width, GraphConf.canvas.height);

//---------------------------------- AI ----------------------------------
	if (GameState.AI_present == true)
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
		GameState.game_done = true;
	}
	else if (player2.score === 10)
	{
		drawWinMessage("Player 2");
		GameState.game_done = true;
	}

	if (GameState.game_done == false)
	{
		GameState.animationFrameId = requestAnimationFrame(gameLoop);
	}
}

/***			Resetting Game				***/
function resetGame()
{
	// Reset game state
	player1.score = 0;
	player2.score = 0;
	BallConf.speed = 5;
	BallConf.dx = 5;
	BallConf.dy = 5;

	// Hide the winning message and rematch button
	const	messageElement = document.getElementById('winning-message');
	const	rematchButton = document.getElementById('rematch-button');

	messageElement.classList.remove('show');
	rematchButton.classList.add('hidden');

	// Restart the game
	GameState.game_done = false;
	GameState.isGameModeSelected = false;
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
	GameState.game_done = true;
	GameState.game_paused = false;
	GameState.AI_present = false;

	document.body.classList.remove('no-scroll');
}