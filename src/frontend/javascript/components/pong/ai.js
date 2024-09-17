/***********************************************\
-			IMPORTING GLOBAL VARIABLES			-
\***********************************************/
import { DEBUG } from '../../main.js';

// all possible AI returns (all paddle movement possibilities)
const DOWN = 0
const UP = 1
const DO_NOT_MOVE = 2
const ERROR = 42

export class GameData
{
	constructor()
	{
		this.ballX = undefined;
		this.ballY = undefined;
		this.ball_radius = undefined;
		this.ballX_velocity = undefined; //positive = movement to the right, negative = movement to the left
		this.ballY_velocity = undefined; //positive = movement down, negative = movement up

		this.fieldY_top = undefined; //field's top right Y coordinate
		this.fieldY_bottom = undefined; //field's bottom right Y coordinate
		this.fieldX_right = undefined; //field's right bound X coordinate

		this.paddleY = undefined;
		this.paddle_initial_position = undefined;
		this.paddle_height = undefined;
		this.paddle_width = undefined;
	}
}

/* We calculate intersectionY thanks to the ball's direction.
If it is inside the field's boundaries, it means there will be 
no rebounds : no further maths are required.
If intersection Y is outside the field's boundaries, it means there 
will be at least one rebound. See ai_algorithm_explained.png*/
//TODO: où puis-je ajouter ai_algorithm_explained.png pour les correcteurs?
function	predict_ball_paddle_intersection(data)
{
	let intersectionX = data.fieldX_right - data.paddle_width;
	let intersectionY; //value we are looking for

	//if the ball is moving left : the paddle should move back to initial position
	if (data.ballX_velocity < 0)
		return data.paddle_initial_position;

	//FIX : oscillements
	if (data.ballY > data.paddleY - 5 && data.ballY < data.paddleY + 5 )
		return data.paddleY; //== DO_NOT_MOVE

	let time_to_right_wall = (intersectionX - (data.ballX + data.ball_radius)) / data.ballX_velocity;
	intersectionY = data.ballY + data.ballY_velocity * time_to_right_wall;

	if (intersectionY < data.fieldY_top || intersectionY > data.fieldY_bottom)
	{
		while (intersectionY < data.fieldY_top || intersectionY > data.fieldY_bottom)
		{
			if (intersectionY <= data.fieldY_top)
			{
				intersectionY = intersectionY - data.fieldY_top;
				intersectionY = data.fieldY_top - intersectionY;
			}
			else if (intersectionY >= data.fieldY_bottom)
			{
				intersectionY = intersectionY - data.fieldY_bottom;
				intersectionY = data.fieldY_bottom - intersectionY;
			}
		}
	}

	//we reajust intersectionY so that it corresponds to the middle of the paddle
	return intersectionY - (data.paddle_height / 2);
}

/* Now that we have the Y coordinates of where the paddle needs to be,
we can compare it to the current known position of the paddle and 
return the corresponding action it should undertake (= move up, down
or not move) */
function	decide_paddle_movement(paddleY, predicted_intersection)
{
	if (paddleY > predicted_intersection)
		return UP;
	else if (paddleY < predicted_intersection)
		return DOWN;
	else
		return DO_NOT_MOVE;
}

/* We calculate the predicted intersection of the ball and field's 
right wall and decide accordingly the AI paddle's movement. */
function	ai_action(data)
{
	let predicted_intersection = predict_ball_paddle_intersection(data);
	let paddle_movement = decide_paddle_movement(data.paddleY, predicted_intersection);

	return paddle_movement;
}

/* We import the data information from pong.js */
import { update_game_data } from './pong.js';

/* Checks that the imported data is valid */
function checkGameData(data)
{
	for (const [key, value] of Object.entries(data))
	{
		if (value == undefined)
		{
			console.log(`ERROR: ${key} is undefined`);
			return false;
		}
	}
	return true;
}

let data = new GameData();

/* This is the main function of this file. It checks the imported 
data all the calculations are based on and returns the action that 
the paddle should undertake to "catch" the ball. */
export function getPaddleAction()
{
	data = update_game_data();

	if (!checkGameData(data))
	{
		console.log("Error updating data : data variables are undefined");
		return ERROR; //TODO: mettre dans pong.js que si return 42 alors stop le jeu
	}

	let paddle_action = ai_action(data);
	return paddle_action;
}
