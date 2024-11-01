/***********************************************\
-					IMPORTS						-
\***********************************************/
import { DEBUG, navigateTo }
from '../../main.js';

import { BallConf, GameState, GraphConf, PaddleConf, GameConf, player1, player2, 
Results }
from './gameVariables.js';

import { loadUserManagementData }
from './utils.js';

import { startGame, resetGame, clearAll }
from './pong.js'

import { isNameValid, doesUserExist, checkPassword, enableKeyBlocking }
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
	GameState.isAiPresent = false;
	menuOverlay.classList.add('hidden');
	displayTournamentForm();
}

async function showPasswordModal(playerName, tournamentForm)
{
	return new Promise((resolve) =>
	{
		const	modal = document.createElement('div');
		modal.className = 'input-form';

		const	modalContent = document.createElement('div');
		modalContent.className = 'input-content';

		const	title = document.createElement('h3');
		title.innerHTML = `👋🏽👋🏽👋🏽<br><br>Hello ${playerName}!<br>
		<br>It seems you already have an account<br><br>Please enter your password<br>`;

		const	form = document.createElement('form');
		const	passwordInput = document.createElement('input');
		passwordInput.type = 'password';
		passwordInput.className = 'form-control';
		passwordInput.placeholder = 'Enter your password';
		passwordInput.required = true;

		// Listen for Enter key on the password input
		passwordInput.addEventListener('keydown', (e) =>
		{
			if (e.key === 'Enter')
			{
				confirmButton.click();
			}
		});

		const	confirmButton = document.createElement('button');
		confirmButton.type = 'submit';
		confirmButton.textContent = 'Confirm';
		confirmButton.className = 'btn menu-button start-tournament-btn';

		// Handle form submission
		form.addEventListener('submit', async (e) =>
		{
			e.preventDefault();
			confirmButton.disabled = true;
			const	enteredPassword = passwordInput.value;
			const	isValidPassword = await validatePasswordTournament(playerName, enteredPassword);
			if (isValidPassword)
			{
				resolve(enteredPassword);
				document.body.removeChild(modal);
				tournamentForm.style.display = 'block';
			}
			else
			{
				alert('❌ Wrong password, please try again ❌')
				passwordInput.value = '';
				confirmButton.disabled = false;
			}
		});

		const	backButton = document.createElement('button');
		backButton.type = 'button';
		backButton.textContent = 'Back';
		backButton.className = 'btn menu-button start-tournament-btn';

		backButton.addEventListener('click', () =>
		{
			resolve(null);
			document.body.removeChild(modal);
			tournamentForm.style.display = 'block';
		});

		// Append elements to the form
		form.appendChild(passwordInput);
		form.appendChild(confirmButton);
		form.appendChild(backButton);

		modalContent.appendChild(title);
		modalContent.appendChild(form);
		modal.appendChild(modalContent);
		document.body.appendChild(modal);
	});
}

export async function displayTournamentForm()
{
	// Create the form container
	const	tournamentForm = document.createElement('div');
	tournamentForm.id = 'input-form';
	tournamentForm.className = 'input-form';

	// Create the title
	const	formTitle = document.createElement('h3');
	formTitle.textContent = 'Enter All Players\' Names';
	tournamentForm.appendChild(formTitle);

	const	players = ['Player 1 (You)', 'Player 2', 'Player 3', 'Player 4'];
	let currentPlayerIndex = 0;
	const	playerNames = [];

	// Create a function to create input for the current player
	const	createPlayerInput = async () =>
	{
		// Clear previous input elements
		tournamentForm.innerHTML = '';
		tournamentForm.appendChild(formTitle); // Add title back
		
		if (currentPlayerIndex >= players.length)
		{
			// Change title once all players have entered their names
			formTitle.innerHTML = "All players have entered their names.<br><br>Ready to start the tournament?";
		
			// Add a submit button
			const	submitButton = document.createElement('button');
			submitButton.className = 'btn menu-button start-tournament-btn';
			submitButton.textContent = 'Yes, let\'s do this!';
			
			// Pass the playerNames array here
			submitButton.addEventListener('click', () =>
			{
				// Remove the entire tournament form when starting the game
				tournamentForm.remove(); // This will remove the entire form from the DOM
		
				// Start the tournament game
				startTournamentGame(playerNames);
			});
		
			tournamentForm.appendChild(submitButton);
			return;
		}

		const	label = players[currentPlayerIndex];
		const	inputGroup = document.createElement('div');
		inputGroup.className = 'input-group-lg mb-3';
		
		const	inputLabel = document.createElement('span');
		inputLabel.className = 'input-group-text';
		inputLabel.textContent = label;
		
		const	playerInput = document.createElement('input');
		playerInput.type = 'text';
		playerInput.className = 'form-control';

		// Listen for Enter key on the player input
		playerInput.addEventListener('keydown', (e) =>
		{
			if (e.key === 'Enter')
			{
				nextButton.click();
			}
		});
		
		// Add an input event listener to enforce lowercase input
		playerInput.addEventListener('input', () => {
			playerInput.value = playerInput.value.toLowerCase();
		});
		
		// Lock first input with signed-in username
		if (currentPlayerIndex === 0)
		{
			try
			{
				const	username = await loadUserManagementData();
				if (DEBUG)
					console.log("Username:", username);
				playerInput.value = username.username.toLowerCase();
				playerInput.disabled = true;
				playerNames[currentPlayerIndex] = playerInput.value;
				currentPlayerIndex++;
				createPlayerInput();
				return;
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
		
		// Create the Next button
		const	nextButton = document.createElement('button');
		nextButton.className = 'btn menu-button start-tournament-btn';
		nextButton.textContent = 'Next';
		
		// Add event listener for the Next button
		nextButton.addEventListener('click', async () =>
		{
			const	playerName = playerInput.value.trim();
			
			
			if (isNameValid(playerName) == true)
			{
				const	userExists = await doesUserExist(playerName);
			
				if (userExists)
				{

					tournamentForm.style.display = 'none';
					try
					{
						const	password = await showPasswordModal(playerName, tournamentForm);
						if (password)
						{
							const	isValidPassword = await validatePasswordTournament(playerName, password);
							if (isValidPassword == true)
							{
								playerNames[currentPlayerIndex] = playerName;
								currentPlayerIndex++;
								createPlayerInput();
							}
							else
							{
								alert('❌ Wrong Password ❌');
							}
						}
					}
					catch (error)
					{
						console.error("Error in password modal:", error);
					}
				}
				else
				{
					playerNames[currentPlayerIndex] = playerName;
					currentPlayerIndex++;
					createPlayerInput();
				}
			}
		});

		// Append the Next button to the form
		tournamentForm.appendChild(nextButton);
	};

	// Start with the first player input
	createPlayerInput();

	document.body.appendChild(tournamentForm);
}

// Password validation function
async function validatePasswordTournament(username, password)
{
	const	isValid = await checkPassword(username, password);
	if (isValid === true)
	{
		if (DEBUG)
			console.log('Password is valid. Proceed to game.');
		return true;
	}
	else
	{
		return false;
	}
}

export function startTournamentGame(playerNames)
{
	if (DEBUG)
		console.log('Starting tournament game...');

	if (!Array.isArray(playerNames))
	{
		console.error('Invalid playerNames passed. Expected an array.');
		return;
	}

	// Validate player names for uniqueness only
	const	nameSet = new Set();
	for (const	playerName of playerNames)
	{
		if (nameSet.has(playerName))
		{
			const	nameCheck = "- ❌ Player names must be unique ❌\n- Press OK to be redirected to the menu";
			alert(nameCheck);
			{
				navigateTo('/pong');
			}
			return;
		}
		nameSet.add(playerName);
	}

	if (DEBUG)
		console.log('Tournament starting with players:', playerNames);
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
	
	const	finalMatchup = GameConf.winners;
	if (DEBUG)
		console.log("Setting up final match between:", finalMatchup);
	
	player1.name = finalMatchup[0];
	player2.name = finalMatchup[1];

	resetGame();
	drawUsernames(player1.name, player2.name);

	updateRematchButtonText();
}

export function tournamentNextMatch()
{
	const	currentMatchIndex = GameConf.winners.length;
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