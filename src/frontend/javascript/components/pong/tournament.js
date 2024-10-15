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

import { drawUsernames, updateRematchButtonText }
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

		const	matchText = document.createTextNode(`- Match n°${index + 1} -`);
		const	lineBreak = document.createElement('br');
		const	matchupText = document.createTextNode(`⚔️ ${pair[0]} VS ${pair[1]} ⚔️`);

		matchup.appendChild(matchText);
		matchup.appendChild(lineBreak);
		matchup.appendChild(matchupText);

		matchupsContainer.appendChild(matchup);
		matchupsContainer.appendChild(document.createElement('br'));
	});

	document.body.appendChild(matchupsContainer);

	fillMatchPlayers(0);

	setTimeout(() => {
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
	
	const	finalMatchup = GameConf.winners;
	console.log("Setting up final match between:", finalMatchup);
	
	player1.name = finalMatchup[0];
	player2.name = finalMatchup[1];

	resetGame();
	drawUsernames(player1.name, player2.name);

	console.log("GameState after setting final match:", GameState)

	updateRematchButtonText();

	startFinalMatch();
}

function startFinalMatch()
{
	console.log("Starting final match between:", player1.name, "and", player2.name);
	startGame();
}

export function tournamentNextMatch()
{
	const currentMatchIndex = GameConf.winners.length;
	if (currentMatchIndex < GameConf.allMatchups.length)
	{
		fillMatchPlayers(currentMatchIndex);
		resetGame();
	}
	else
	{
		console.error("Unexpected state: no matches left.");
	}
}