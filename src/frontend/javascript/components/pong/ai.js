/***********************************************\
-			IMPORTING GLOBAL VARIABLES			-
\***********************************************/
import { DEBUG } from '../../main.js';

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
		this.paddle_width = undefined;
	}
}

let ball_going_left = false;
let standby_position = 0;

/* We calculate intersectionY thanks to the ball's direction.
If it is inside the field's boundaries, it means there will be 
no rebounds : no further maths are required.
If intersection Y is outside the field's boundaries, it means there 
will be at least one rebound. See ai_algorithm_explained.png*/
function	predict_ball_paddle_intersection(data)
{
	let intersectionX = data.fieldX_right - data.paddle_width;
	let intersectionY; //value we are looking for

	/*if the ball is moving left, the paddle moves to a 
	random position to look more human*/
	if (data.ballX_velocity < 0 && ball_going_left == false)
	{
		ball_going_left = true;
		standby_position = Math.random() * data.fieldY_bottom;
		return standby_position;
	}
	if (data.ballX_velocity < 0 && ball_going_left == true)
		return standby_position;
	if (data.ballX_velocity > 0)
		ball_going_left = false;

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

	return intersectionY;
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
data all the calculations are based on and returns the predicted
intersection between the ball and the field's right wall */
export function getPaddleAction()
{
	data = update_game_data();

	if (!checkGameData(data))
	{
		console.log("Error updating data : data variables are undefined");
		return ERROR;
	}

	let predicted_intersection = predict_ball_paddle_intersection(data);
	return predicted_intersection;
}
