/***********************************************\
-					IMPORTS						-
\***********************************************/

let	animationFrameId = null;

export const	keysPressed = {};

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

	// Is it a Tournament?
	isTournament :false,

	// Is it the final match?
	isFinalMatch :false,

	// Is Tournament Done?
	isTournamentDone :false,

	// Is countdown active?
	isCountdownActive: false,

	// Interval between Countdowns
	countdownInterval: null,

	// Are event listeners set up?
	areEventsListenersSetup : false
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

/***			Game Config			***/
export const GameConf =
{
	AI_name : "🤖 Ponginator3000 🤖",
	maxScore : 1,
	matchupIndex : 0,
	allMatchups : [],
	winners : []
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
	score: 0,
	name : ""
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
	score: 0,
	name: "Jean Pierre"
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
export const	Results =
{
	username : undefined,
	identified : false,
	score : undefined,
	opponent_username : undefined,
	opponent_score : undefined,
	tournament_date : undefined
}