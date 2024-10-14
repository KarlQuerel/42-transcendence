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

import { drawUsernames }
from './drawing.js';


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

		// Add an input event listener to enforce lowercase input
		playerInput.addEventListener('input', () =>
		{
			playerInput.value = playerInput.value.toLowerCase();
		});

		if (index === 0)
		{
			// Lock first input with signed-in username
			try
			{
				const	username = await loadUserManagementData();
				if (DEBUG)
					console.log("Username:", username);
				playerInput.value = username.username.toLowerCase();
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
	if (DEBUG)
		console.log('Starting tournament game...');
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
	GameConf.winners = [];

	const	matchups = createMatchups(playerNames);
	if (!matchups || matchups.length === 0)
	{
		console.error('No matchups were created');
		return;
	}
	GameConf.allMatchups = matchups;
	GameConf.matchupIndex = 0;

	if (DEBUG)
		console.log("All matchups initialized:", GameConf.allMatchups);
	displayMatchups(matchups);
}

function createMatchups(playerNames)
{
	const	shuffledPlayers = playerNames.sort(() => Math.random() - 0.5);
	if (DEBUG)
		console.log('Shuffled players:', shuffledPlayers);

	const	matchups =
	[
		[shuffledPlayers[0], shuffledPlayers[1]],
		[shuffledPlayers[2], shuffledPlayers[3]]
	];
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

	fillMatchPlayers(0);

	setTimeout(() =>
	{
		document.body.removeChild(matchupsContainer);
		checkCountdown();
	}, 5000);
}

export function fillMatchPlayers(matchupIndex)
{
	if (DEBUG)
		console.log('Attempting to fill players for matchup index:', matchupIndex);
	
	if (GameConf.allMatchups[matchupIndex])
	{
		const	matchup = GameConf.allMatchups[matchupIndex];
		if (DEBUG)
			console.log('Filling match players for:', matchup);

		player1.name = matchup[0];
		player2.name = matchup[1];

		if (DEBUG)
			console.log('Match Players:', player1.name, player2.name);

		drawUsernames(player1.name, player2.name);
	}
	else
	{
		console.error('Invalid matchup index or match data missing');
		if (DEBUG)
		{
			console.log('GameConf.allMatchups:', GameConf.allMatchups);
			console.log('GameConf.matchupIndex:', matchupIndex);
		}
	}
}

export function setupFinalMatch()
{
	GameConf.isFinalMatch = true;
	
	const	finalMatchup = GameConf.winners; // The two winners from the first round
		console.log("Setting up final match between:", finalMatchup);
		
		// Fill players for the final match
		player1.name = finalMatchup[0]; // Winner of first match
		player2.name = finalMatchup[1]; // Winner of second match

		resetGame();
		drawUsernames(player1.name, player2.name); // Draw usernames for the final match

		console.log("GameState after setting final match:", GameState)

		// Start the final match
		startFinalMatch();
}

function startFinalMatch()
{
	console.log("Starting final match between:", player1.name, "and", player2.name);
	// Start the game logic for the final match
	startGame(); // Ensure this function handles starting the game for the final match
}

export function tournamentNextMatch()
{
	// Log game state for debugging
	// console.log('GameState', GameState);
	// console.log('GameConf', GameConf);
	// console.log('matchup length', GameConf.allMatchups.length);
	// console.log('winner length', GameConf.winners.length);

	// Increment the matchup index
	// GameConf.matchupIndex++;

		// Debugging information
	// console.log('Current winners:', GameConf.winners);
	console.log('Matchup index:', GameConf.matchupIndex);
	console.log('Matchup index:', GameConf.allMatchups.length);
	// Check if we've reached the final match
	// if (GameConf.matchupIndex >= 1) {
	// 	if (GameConf.winners.length === 2) {
	// 		// Set up the final match with the two winners
	// 		GameState.isFinalMatch = true;
	// 		console.log('Setting up final match');
	// 		setupFinalMatch();
	// 		return
	// 	}
	// }

	// Prevent moving to the next match if we are in the final match
	if (GameState.isFinalMatch === true)
	{
		console.log("Final match is already in progress.");
		return;
	}

	// Move to the next match if we haven't reached the final match
	if (GameConf.matchupIndex < GameConf.allMatchups.length) {
		// Prepare the next match
		fillMatchPlayers(GameConf.matchupIndex); // Setup the next players
		resetGame(); // Reset game state for the next match
	}
	else
	{
		console.error("Unexpected state: more than 2 winners or no matches left.");
	}
}

