/***********************************************\
-					IMPORTS						-
\***********************************************/
import { DEBUG }
from '../../main.js';

let	animationFrameId = null;

/***			Game State			***/
export const	GameState =
{
	// Check AI state
	AI_present: false,
	
	// Is game done?
	game_done: false,
	
	// Is game paused?
	game_paused: false,

	// For gameloop
	animationFrameId,

	// Did user select a mode?
	isGameModeSelected: false,

	// Is Tournament?
	isTournament :false
}

/***			Graphics Config			***/
export const GraphConf =
{
	canvas: null,
	ctx: null,
	minWidth: 800,
	minHeight: 600
};

/***			Paddle Config			***/
export const PaddleConf =
{
	width: 10,
	height: 100,
	speed: 8,
	offset: 20
};

/***			Player Paddles			***/
export const player1 =
{
	x: PaddleConf.offset,
	y: 0,
	width: PaddleConf.width,
	height: PaddleConf.height,
	color: "cyan",
	shadowColor: 'rgba(0, 255, 255, 0.8)',
	shadowBlur: 20,
	dy: 0,
	score: 0
};

export const player2 =
{
	x: 0,
	y: 0,
	width: PaddleConf.width,
	height: PaddleConf.height,
	color: "magenta",
	shadowColor: 'rgba(255, 0, 255, 0.8)',
	shadowBlur: 20,
	dy: 0,
	score: 0
};

/***			Ball Config			***/
export const BallConf =
{
	x: 0,
	y: 0,
	radius: 10,
	speed: 5,
	dx: 5,
	dy: 5
};

/***			Results				***/
export class	Results
{
	username = undefined;
	identified = undefined;
	score = undefined;
	opponent_username = undefined;
	opponent_score = undefined;
	tournament_date = undefined;
}