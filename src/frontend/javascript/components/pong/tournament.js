/***********************************************\
-					IMPORTS						-
\***********************************************/
import { DEBUG }
from '../../main.js';

import { loadUserManagementData }
from '../../views/dashboard/dashboard.js';

import { GameState }
from './gameVariables.js';

import { startGame }
from './pong.js'


/***********************************************\
-					TOURNAMENT					-
\***********************************************/
export function startTournament(menuOverlay)
{
	GameState.AI_present = false;
	menuOverlay.classList.add('hidden');
	displayTournamentForm();
}

export async function displayTournamentForm()
{
	// Create the form container
	const	tournamentForm = document.createElement('div');
	tournamentForm.id = 'tournament-form';
	tournamentForm.className = 'tournament-form';

	// Create the title
	const	formTitle = document.createElement('h3');
	formTitle.textContent = 'Enter Player Names';
	tournamentForm.appendChild(formTitle);

	// Create form inputs
	const	players = ['Player 1 (You)', 'Player 2', 'Player 3', 'Player 4'];
	for (const [index, label] of players.entries())
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
				const	username = await getUsername(); // FIXME + TODO ask caro how she managed to print username in the frontend
				// HERE getUsername();
				if (DEBUG)
					console.log('username is : ', username);
				playerInput.value = username;
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
	submitButton.className = 'btn btn-second'; // TODO KARL - change button here
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

	playerInputs.forEach(input =>
	{
		playerNames.push(input.value.trim());
	});

	if (playerNames.some(name => name === ''))
	{
		alert('Please fill in all player names');
		return;
	}

	console.log('Tournament starting with players:', playerNames);
	tournamentForm.remove(); // Remove the form after submission

	// Start the tournament game logic here
	initializeTournamentMode(playerNames);
}

export function initializeTournamentMode(playerNames)
{
	if (DEBUG)
		console.log('Initializing tournament mode with players:', playerNames);

	const	matchups = createMatchups(playerNames);
	displayMatchups(matchups);

	startGame();
	// StartGame();
}

function createMatchups(playerNames) {
	// Shuffle the array to randomize the order
	const shuffledPlayers = playerNames.sort(() => Math.random() - 0.5);

	// Pair the players into matchups
	const matchups = [
		[shuffledPlayers[0], shuffledPlayers[1]], // Match 1
		[shuffledPlayers[2], shuffledPlayers[3]]  // Match 2
	];
	return matchups;
}

// TODO KARL FINISH THIS
function displayMatchups(matchups)
{
	const matchupsContainer = document.createElement('div');
	matchupsContainer.className = 'matchups-container';

	matchups.forEach((pair, index) =>
	{
		const matchup = document.createElement('div');
		matchup.className = 'matchup';
		matchup.textContent = `Match ${index + 1}: ${pair[0]} vs ${pair[1]}`;
		matchupsContainer.appendChild(matchup);
	});

	// Append matchups container to the body or a specific section of your UI
	document.body.appendChild(matchupsContainer);
}
