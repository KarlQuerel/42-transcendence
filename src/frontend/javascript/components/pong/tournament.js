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

import { isNameValid, doesUserExist, checkPassword }
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

// Function to create a dismissible password modal
async function showPasswordModal(playerName, tournamentForm) {
    return new Promise((resolve) => {
        const modal = document.createElement('div');
        modal.className = 'modal'; // Ensure you have styles for .modal

        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content'; // Ensure styles for modal content

        const title = document.createElement('h4');
        title.textContent = `Enter password for ${playerName}`;

        const form = document.createElement('form'); // Create a form element
        const passwordInput = document.createElement('input');
        passwordInput.type = 'password';
        passwordInput.placeholder = 'Password';
        passwordInput.required = true; // Mark the input as required

        const confirmButton = document.createElement('button');
        confirmButton.type = 'submit'; // Set type to 'submit'
        confirmButton.textContent = 'Confirm';
        
        // Handle form submission
        form.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent default form submission
            const enteredPassword = passwordInput.value;
            console.log("Entered password:", enteredPassword);
            resolve(enteredPassword);
            document.body.removeChild(modal);
            tournamentForm.style.display = 'block'; // Restore the tournament form
        });

        const cancelButton = document.createElement('button');
        cancelButton.type = 'button'; // Set type to 'button' to prevent form submission
        cancelButton.textContent = 'Cancel';
        cancelButton.addEventListener('click', () => {
            resolve(null); // Resolve with null if canceled
            document.body.removeChild(modal);
            tournamentForm.style.display = 'block'; // Restore the tournament form
        });

        // Append elements to the form
        form.appendChild(passwordInput);
        form.appendChild(confirmButton);
        form.appendChild(cancelButton);

        modalContent.appendChild(title);
        modalContent.appendChild(form); // Append form to modal content
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
    });
}

// Main tournament form function
export async function displayTournamentForm() {
    // Create the form container
    const tournamentForm = document.createElement('div');
    tournamentForm.id = 'input-form';
    tournamentForm.className = 'input-form';

    // Create the title
    const formTitle = document.createElement('h3');
    formTitle.textContent = 'Enter All Players\' Names';
    tournamentForm.appendChild(formTitle);

    const players = ['Player 1 (You)', 'Player 2', 'Player 3', 'Player 4'];
    let currentPlayerIndex = 0; // Track the current player input
    const playerNames = []; // Array to store player names

    // Create a function to create input for the current player
    const createPlayerInput = async () => {
        // Clear previous input elements
        tournamentForm.innerHTML = '';
        tournamentForm.appendChild(formTitle); // Add title back
    
		if (currentPlayerIndex >= players.length) {
			// Change title once all players have entered their names
			formTitle.innerHTML = "All players have entered their names.<br><br>Ready to start the tournament?";
		
			// Add a submit button
			const submitButton = document.createElement('button');
			submitButton.className = 'btn menu-button start-tournament-btn';
			submitButton.textContent = 'Yes, let\'s do this!';
			
			// Pass the playerNames array here
			submitButton.addEventListener('click', () => {
				// Remove the entire tournament form when starting the game
				tournamentForm.remove(); // This will remove the entire form from the DOM
		
				// Start the tournament game
				startTournamentGame(playerNames);
			});
		
			tournamentForm.appendChild(submitButton);
			return;
		}

        const label = players[currentPlayerIndex];
        const inputGroup = document.createElement('div');
        inputGroup.className = 'input-group-lg mb-3';
    
        const inputLabel = document.createElement('span');
        inputLabel.className = 'input-group-text';
        inputLabel.textContent = label;
    
        const playerInput = document.createElement('input');
        playerInput.type = 'text';
        playerInput.className = 'form-control';
    
        // Add an input event listener to enforce lowercase input
        playerInput.addEventListener('input', () => {
            playerInput.value = playerInput.value.toLowerCase();
        });
    
        // Lock first input with signed-in username (existing logic)
        if (currentPlayerIndex === 0) {
            try {
                const username = await loadUserManagementData();
                if (DEBUG) console.log("Username:", username);
                playerInput.value = username.username.toLowerCase();
                playerInput.disabled = true; // Disable input for Player 1
                playerNames[currentPlayerIndex] = playerInput.value; // Store Player 1's name
                currentPlayerIndex++; // Move to next player
                createPlayerInput(); // Call function to create the next input
                return; // Exit the function to prevent further processing
            } catch (error) {
                console.error('Failed to load username:', error);
            }
        } else {
            playerInput.placeholder = `Enter ${label}`;
        }
    
        inputGroup.appendChild(inputLabel);
        inputGroup.appendChild(playerInput);
        tournamentForm.appendChild(inputGroup);
    
        // Create the Next button
        const nextButton = document.createElement('button');
        nextButton.className = 'btn btn-primary';
        nextButton.textContent = 'Next';
    
        // Add event listener for the Next button
        nextButton.addEventListener('click', async () => {
            const playerName = playerInput.value.trim();
            
            console.log(`Input player name: ${playerName}`); // Debugging line
            
            if (isNameValid(playerName)) {
                const userExists = await doesUserExist(playerName);
                console.log(`Does user exist (${playerName}):`, userExists); // Debugging line
            
                if (userExists) {
                    console.log('I AM HERE'); // Debugging line

                    tournamentForm.style.display = 'none'; // Hide the tournament form
                    try {
                        const password = await showPasswordModal(playerName, tournamentForm);
                        console.log(`Password entered for ${playerName}: ${password ? 'provided' : 'not provided'}`); // Debugging line
                        
                        if (password) {
                            const isValidPassword = await validatePasswordTournament(playerName, password);
                            if (isValidPassword) {
                                playerNames[currentPlayerIndex] = playerName;
                                currentPlayerIndex++;
                                console.log("EXISTING player name with valid password:", playerName);
                                createPlayerInput(); // Proceed to the next player input
                            } else {
                                console.error(`Invalid password for ${playerName}`); // Debugging line
                            }
                        } else {
                            alert('❌ Password cannot be empty ❌');
                        }
                    } catch (error) {
                        console.error("Error in password modal:", error);
                    }
                } else {
                    playerNames[currentPlayerIndex] = playerName;
                    currentPlayerIndex++;
                    console.log("NON EXISTING player name:", playerName);
                    createPlayerInput(); // Proceed to the next player input
                }
            } else {
                alert('❌ Please enter a valid name ❌');
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
async function validatePasswordTournament(username, password) {
    const isValid = await checkPassword(username, password);
    if (isValid === true) {
        console.log('Password is valid. Proceed to game.');
        return true;
    } else {
        return false;
    }
}



export function startTournamentGame(playerNames) {
    if (DEBUG) console.log('Starting tournament game...');

    // Check that playerNames is an array
    if (!Array.isArray(playerNames)) {
        console.error('Invalid playerNames passed. Expected an array.');
        return;
    }

    // Validate player names
    for (const playerName of playerNames) {
        if (!isNameValid(playerName)) {
            alert('❌ Please enter a valid name ❌');
            return;
        }

        if (playerNames.filter(name => name === playerName).length > 1) {
            alert('❌ Player names must be unique ❌');
            return;
        }
    }

    console.log('Tournament starting with players:', playerNames);

    // Optionally remove the tournament form if needed (optional based on your design)
    // tournamentForm.remove();

    // Initialize the tournament mode with the collected player names
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
	console.log("Ball speed =", BallConf.speed);
	startGame();
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

