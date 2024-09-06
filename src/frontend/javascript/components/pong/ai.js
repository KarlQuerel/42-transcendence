const DOWN = 0
const UP = 1
const DO_NOT_MOVE = 2

export class GameData
{
	constructor()
	{
		// ball velocity
		this.ball_horizontal = undefined; // positive = movement to the right, negative = movement to the left
		this.ball_vertical = undefined; // positive = movement up, negative = movement down

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
	}
}

function	predict_ball_paddle_intersection(data)
{
	let intersectionX = data.fieldX_right - data.paddle_width;
	let intersectionY; //value we are looking for

	let velocityVector = {
		x: data.ball_horizontal,
		y: data.ball_vertical
	};

	let time = 0;

	let displacement = {
		x: 0,
		y: 0
	};

	if (displacement.x < 0) //TEST
		displacement.x *= -1;
	while (displacement.x < intersectionX)
	{
		time += 1;
		displacement.x = velocityVector.x * time;
		displacement.y = velocityVector.y * time;

		if (time > 10000) //ça a tout réglé mais je vois pas pourquoi displacement.x n'atteindrait jamais intersectionX --> c'est quand la balle a un angle quasi vertical?
		{
			//console.error("Infinite loop detected");
			break;
		}
	}

/* 	intersectionY = displacement.y;
	if (intersectionY > data.fieldY_top || intersectionY < data.fieldY_bottom) //out of bounds
	{
		// console.log("BOUNCE");
		let test = 0;
		while (intersectionY > data.fieldY_top || intersectionY < data.fieldY_bottom) //out of bounds)
		{
			if (intersectionY > data.fieldY_top)
			{
				intersectionY = intersectionY - data.fieldY_top;
				intersectionY = data.fieldY_top - intersectionY;
			}
			else if (intersectionY < data.fieldY_bottom)
			{
				intersectionY = intersectionY - data.fieldY_bottom;
				intersectionY = data.fieldY_bottom - intersectionY;
			}
			if (test == 50)
				break ; //IMPORTANT! Mais je comprends pas bien pourquoi infinite loop. Changer nom variable test
			test++;
		}
	} */
	// else
	// 	console.log("NO BOUNCE");

	intersectionY = displacement.y;
	if (intersectionY < data.fieldY_top || intersectionY > data.fieldY_bottom) //out of bounds
	{
		// console.log("BOUNCE");
		let test = 0;
		while (intersectionY < data.fieldY_top || intersectionY > data.fieldY_bottom) //out of bounds)
		{
			console.log(`BOUNCE NUMBER: ${test}, INTERSECTION Y: ${intersectionY}`);
			if (intersectionY <= data.fieldY_top)
			{
				// intersectionY = intersectionY * (-1);
				intersectionY = intersectionY - data.fieldY_top;
				intersectionY = data.fieldY_top - intersectionY;
			}
			else if (intersectionY >= data.fieldY_bottom)
			{
				intersectionY = intersectionY - data.fieldY_bottom;
				intersectionY = data.fieldY_bottom - intersectionY;
			} //et si == top ou bottom?
			if (test == 10)
				break ; //IMPORTANT! Mais je comprends pas bien pourquoi infinite loop. Changer nom variable test
			test++;
		}
		console.log("-----------------------------------");
		console.log("Number of rebounds = ", test);
		console.log("paddle position = ", data.paddle_y);
		console.log("intersectionY = ", intersectionY);
		console.log("data.fieldY_top = ", data.fieldY_top);
		console.log("data.fieldY_bottom = ", data.fieldY_bottom);
		console.log("-----------------------------------");
	}

	//HERE //TODO //FIX Il ajuster intersectionY sinon l'IA loupe constamment la balle 
	// if (intersectionY > data.fieldY_bottom / 2) //bottom et non top car top = 0 et bottom = canvas.height
	// 	intersectionY = intersectionY + (data.paddle_height / 2); //si en bas
	// else if (intersectionY < data.fieldY_bottom / 2) //si en haut
	// 	intersectionY = intersectionY - (data.paddle_height / 2);

	return intersectionY + data.paddle_height; //TEST  + data.paddle_height
}

function	decide_paddle_movement(paddle_y, predicted_intersection)
{
	if (paddle_y > predicted_intersection + data.paddle_height) //TEST  + data.paddle_height
		return UP;
	else if (paddle_y < predicted_intersection + data.paddle_height) //TEST  + data.paddle_height
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

let data = new GameData(); /*est-ce que je peux la sortir de la fonction 
	export pour qu on y entre uq une seule fois?*/
// console.log("1. data is initialized to NULL in ai.js");

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
	// console.log("paddle action = ", paddle_action);
	return paddle_action;
}
