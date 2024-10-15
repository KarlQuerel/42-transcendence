/***********************************************\
-					IMPORTS						-
\***********************************************/
import { DEBUG }
from '../../main.js';

import { BallConf, GameState, GraphConf, PaddleConf, GameConf, player1, player2, 
Results }
from './gameVariables.js';

import { loadUsername }
from './utils.js';

import { startGame }
from './pong.js'

import { isNameValid }
from './utils.js';

import { checkCountdown }
from './preGame.js';


/***********************************************\
-					TOURNAMENT					-
\***********************************************/
export function prepareTournament(menuOverlay)
{
	GameState.AI_present = false;
	menuOverlay.classList.add('hidden');
	displayTournamentForm();
}

export async function displayTournamentForm()
{
	// Create the form container
	const	tournamentForm = document.createElement('div');
	tournamentForm.id = 'input-form';
	tournamentForm.className = 'input-form';

	// Create the title
	const	formTitle = document.createElement('h3');
	formTitle.textContent = 'Enter All Players\'s Names';
	tournamentForm.appendChild(formTitle);

	// Create form inputs
	const	players = ['Player 1 (You)', 'Player 2', 'Player 3', 'Player 4'];
	for (const	[index, label] of players.entries())
	{
		const	inputGroup = document.createElement('div');
		inputGroup.className = 'input-group-lg mb-3';

		const	inputLabel = document.createElement('span');
		inputLabel.className = 'input-group-text';
		inputLabel.textContent = label;

		const	playerInput = document.createElement('input');
		playerInput.type = 'text';
		playerInput.className = 'form-control';

		if (index === 0)
		{
			// Lock first input with signed-in username
			try
			{
				const	username = await loadUsername();
				if (DEBUG)
					console.log("Username:", username);
				playerInput.value = username.username;
				playerInput.disabled = true;
			}
			catch (error)
			{
				console.error('Failed to load username:', error);
			}
		}
		else
		{
			playerInput.placeholder = `Enter ${label}`;
		}

		inputGroup.appendChild(inputLabel);
		inputGroup.appendChild(playerInput);
		tournamentForm.appendChild(inputGroup);
	}

	// Add a submit button
	const	submitButton = document.createElement('button');
	submitButton.className = 'btn menu-button start-tournament-btn';
	submitButton.textContent = 'Start Tournament';
	submitButton.addEventListener('click', () =>
	{
		startTournamentGame(tournamentForm);
	});

	tournamentForm.appendChild(submitButton);
	document.body.appendChild(tournamentForm);
}

export function startTournamentGame(tournamentForm)
{
	const	playerInputs = tournamentForm.querySelectorAll('input');
	const	playerNames = [];

	for (const	input of playerInputs)
	{
		let	playerName = input.value.trim();

		if (isNameValid(playerName) === false)
			return;

		if (playerNames.includes(playerName))
		{
			alert('❌ Player names must be unique ❌');
			return ;
		}

		playerNames.push(playerName);
	}

	console.log('Tournament starting with players:', playerNames);
	tournamentForm.remove();

	initializeTournamentMode(playerNames);
}

export function initializeTournamentMode(playerNames)
{
	if (DEBUG)
		console.log('Initializing tournament mode with players:', playerNames);

	const	matchups = createMatchups(playerNames);
	displayMatchups(matchups);
}

function createMatchups(playerNames)
{
	const	shuffledPlayers = playerNames.sort(() => Math.random() - 0.5);

	const	matchups =
	[
		[shuffledPlayers[0], shuffledPlayers[1]],
		[shuffledPlayers[2], shuffledPlayers[3]]
	];
	return matchups;
}

// TODO KARL - show usernames while in tournaments
function displayMatchups(matchups)
{
	const	matchupsContainer = document.createElement('div');
	matchupsContainer.className = 'matchups-container container-sm';

	matchups.forEach((pair, index) =>
	{
		const	matchup = document.createElement('div');
		matchup.className = 'matchup';
		matchup.textContent = `Match #${index + 1} = ⚔️ ${pair[0]} VS ${pair[1]} ⚔️`;
		matchupsContainer.appendChild(matchup);
	});

	document.body.appendChild(matchupsContainer);

	fillTournamentPlayers(matchups[0]);

	setTimeout(() =>
	{
		document.body.removeChild(matchupsContainer);
		checkCountdown();
	}, 5000);
}

//TODO KARL FINISH LOGIC HERE
function fillTournamentPlayers(pair)
{
	player1.name = pair[0];
	player2.name = pair[1];

	if (DEBUG)
	{
		console.log(`Player 1: ${player1.name}`);
		console.log(`Player 2: ${player2.name}`);
	}
}