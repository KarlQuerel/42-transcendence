/***********************************************\
-					IMPORTS						-
\***********************************************/
import { DEBUG }
from '../../main.js';

let	animationFrameId = null;

export const	GameVar =
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
	isGameModeSelected: false
}