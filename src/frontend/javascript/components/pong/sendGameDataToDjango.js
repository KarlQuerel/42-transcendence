/***********************************************\
-			IMPORTING GLOBAL VARIABLES			-
\***********************************************/
import { DEBUG } from '../../main.js';

export function sendGameDataToDjango(winner, scoreLeft, scoreRight) {
	const url = 'http://127.0.0.1:8000/api/add/'; //CHECK: pas sure du /add!!
	const data = 
	{
		userLeft: userLeft,//TODO: inserer ici
		userRight: userRight,//TODO: inserer ici
		scoreLeft: scoreLeft,
		scoreRight: scoreRight
	};

	fetch(url, 
		{
		method: 'POST',
		headers: 
			{
				'Content-Type': 'application/json',
			},
		body: JSON.stringify(data),
	})
	.then(response => response.json())
	.then(data => {console.log('Success:', data);})
	.catch((error) => {console.error('Error:', error);});
}