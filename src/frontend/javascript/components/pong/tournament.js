/***********************************************\
-					IMPORTS						-
\***********************************************/
import { DEBUG }
from '../../main.js';

import { BallConf, GameState, GraphConf, PaddleConf, GameConf, player1, player2, 
Results }
from './gameVariables.js';

import { loadUserManagementData }
from '../../views/dashboard/dashboard.js';

import { startGame, resetGame }
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
				const	username = await loadUserManagementData();
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

	GameState.isTournament = true;

	const	matchups = createMatchups(playerNames);
	GameConf.allMatchups = matchups;
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
	console.log("Matchups created:", matchups);
	return matchups;
}

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

	fillMatchPlayers(matchups[0]);

	setTimeout(() =>
	{
		document.body.removeChild(matchupsContainer);
		checkCountdown();
	}, 5000);
}

export function fillMatchPlayers(matchupIndex)
{
	// Check if matchupIndex is valid
	if (GameConf.allMatchups && GameConf.allMatchups[matchupIndex])
	{
		const matchup = GameConf.allMatchups[matchupIndex];

		// Assuming matchup is an array of players
		player1.name = matchup[0]; // First player
		player2.name = matchup[1]; // Second player

		// Debugging to ensure names are set
		console.log('Match Players:', player1.name, player2.name);
		
		// Ensure to call drawUsernames to draw the usernames after setting them
		drawUsernames(player1.name, player2.name);
	}
	else
	{
		console.error('Invalid matchup index or match data missing');
	}
}


export function processMatch(winner) {
	GameConf.winners.push(winner);
	GameConf.matchupIndex++;

	if (GameConf.matchupIndex < GameConf.allMatchups.length) {
		// Fill next players
		fillMatchPlayers(GameConf.matchupIndex);
	} else {
		// Final match handling can be added here
		console.log("Final match - Tournament complete!");
		// You might want to handle final match results or state here
	}
}


export function handleNextTournamentGame()
{
	GameConf.matchupIndex++;  // Move to the next match

	if (GameConf.matchupIndex < GameConf.allMatchups.length)
	{
		// Prepare the next match
		fillMatchPlayers(GameConf.matchupIndex); // Setup the next players
		resetGame();  // Reset game state
	}
	else
	{
		console.log("Tournament finished!");
		// Show some "Tournament Finished" message or handle end of tournament logic
		// showTournamentResults();
	}
}
