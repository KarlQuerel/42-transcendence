const DOWN = 0
const UP = 1
const DO_NOT_MOVE = 2
const GO_BAK_TO_INITIAL_POSITION = 3

export class GameData
{
	constructor()
	{
		// ball velocity
		this.ball_velocityX = undefined; // positive = movement to the right, negative = movement to the left
		this.ball_velocityY = undefined; // positive = movement down, negative = movement up

		// field's top/bottom right Y coordinate
		this.fieldY_top = undefined;
		this.fieldY_bottom = undefined;

		// field's right bound X coordinate
		this.fieldX_right = undefined;

		this.ball_radius = undefined;

		this.paddle_height = undefined;
		this.paddle_width = undefined;

		// paddle Y coordinate
		this.paddle_y = undefined;

		this.ballX = undefined;
		this.ballY = undefined;
		this.ballRadius = undefined;
	}
}

function	predict_ball_paddle_intersection(data)
{
	let intersectionX = data.fieldX_right - data.paddle_width;
	let intersectionY; //value we are looking for

	if (data.ball_velocityX < 0) //if moving left
		return GO_BAK_TO_INITIAL_POSITION;

	//FIX : oscillements
	// if (data.ballY < data.paddle_y - 20 || data.ballY < data.paddle_y + 20 )
	// {
	// 	console.log("HERE");
	// 	return DO_NOT_MOVE;
	// }

	let tRight = (intersectionX - (data.ballX + data.ballRadius)) / data.ball_velocityX;
	intersectionY = data.ballY + data.ball_velocityY * tRight;

	if (intersectionY < data.fieldY_top || intersectionY > data.fieldY_bottom) //out of bounds
	{
		while (intersectionY < data.fieldY_top || intersectionY > data.fieldY_bottom) //out of bounds)
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
			} //et si == top ou bottom?
		}
	}

	return intersectionY - (data.paddle_height / 2);
}

function	decide_paddle_movement(paddle_y, predicted_intersection)
{
	if (paddle_y > predicted_intersection)
		return UP;
	else if (paddle_y < predicted_intersection)
		return DOWN;
	else
		return DO_NOT_MOVE;
}

function	ai_action(data)
{
	let predicted_intersection = predict_ball_paddle_intersection(data);
	let paddle_movement = decide_paddle_movement(data.paddle_y, predicted_intersection);

	return paddle_movement;
}

import { update_game_data } from './pong.js';

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

export function getPaddleAction()
{
	data = update_game_data();
	// console.log("6. data is fetch in ai.js to do maths");

/* 	protection : loop qui lit toute les variables dans data :
	s'il y a des variables non initialisees : error (voir avec marine
	quoi faire en cas d'erreur). */
	if (!checkGameData(data))
	{
		console.log("Error updating data : data variables are undefined");
		return 42; //TODO: mettre dans pong.js que si return 42 alors stop le jeu
	}

	let paddle_action = ai_action(data);
	return paddle_action;
}
