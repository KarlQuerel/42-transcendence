/* **********************************************\
-		   IMPORTING VARIABLES/FUNCTIONS		-
\***********************************************/
import { DEBUG, GITHUBACTIONS } from '../../main.js';
import { apiRequest } from '../user/signin.js';
import { getAuthHeaders } from '../user/signin.js';

/***********************************************\
*                   RENDERING                   *
\***********************************************/

export function renderDashboard()
{
	return `
		<div id="dashboard">
			<h1>Welcome to the Dashboard</h1>

<!-- Main clickable icons -->

			<div id="chart_icon" class="dashboard-icon">
				<img src="../../../assets/images/dashboard/chart.gif">
			</div>
			<div id="friends_icon" class="dashboard-icon">
				<img src="../../../assets/images/dashboard/friends.gif">
			</div>
			<div id="trophee_icon" class="dashboard-icon">
				<img src="../../../assets/images/dashboard/trophee.gif">
			</div>

			<!-- EXPLANATION: if I had used img_id instead of div_id the icons would not be clickable -->

<!-- Friends Icon -->

	<!-- Avatars -->

			<div id="avatarModal" class="modal">
				<div class="modal-dialog">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title">Friends Avatars</h5>
							<button type="button" class="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div class="modal-body">
							<div class="avatar-container"></div> <!-- Avatar container goes inside the modal body -->
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
						</div>
					</div>
				</div>
			</div>

	<!-- Game History -->

			<div id="tableModal" class="modal">
				<div class="modal-dialog">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title">Game History</h5>
							<button type="button" class="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div class="modal-body">
							<table class="table table-striped">
								<thead>
									<tr id="tableHeaderRow">
										<!-- Headers will be populated dynamically -->
									</tr>
								</thead>
								<tbody id="tableBody">
									<!-- Rows will be populated dynamically -->
								</tbody>
							</table>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
						</div>
					</div>
				</div>
			</div>

<!-- Chart Icon -->

			<div id="chartModal" class="modal" tabindex="-1" role="dialog">
				<div class="modal-dialog" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title">Chart</h5>
							<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div class="modal-body">
							<canvas id="chartCanvas" width="400" height="400"></canvas>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
						</div>
					</div>
				</div>
			</div>

<!-- Trophee Icon -->

			<div id="badgeModal" class="modal">
				<div class="modal-body">
					<img id="badge" class="badge-icon" src="" alt="Badge">
					<p class="badge-message"></p>
				</div>
			</div>

			<!-- EXPLANATION: "alt" is used to provide alternative text for an image if it cannot be displayed -->

<!-- Badge Images -->
<!-- TODO: changer tous les gifs -->

			<img id="top1_badge" src="../../../assets/images/dashboard/top1.gif" style="display: none;">
			<img id="top3_badge" src="../../../assets/images/dashboard/top3.gif" style="display: none;">
			<img id="top5_badge" src="../../../assets/images/dashboard/top5.gif" style="display: none;">
			<img id="top10_badge" src="../../../assets/images/dashboard/top10.gif" style="display: none;">
			<img id="regular_badge" src="../../../assets/images/dashboard/regular.gif" style="display: none;">

			<!-- EXPLANATION: without "style="display: none;", all three badges would appear on the screen at all times -->



		</div>
	`;
}


/***********************************************\
-				MAIN FUNCTION					-
\***********************************************/

export async function initializeDashboard() /*assync and wait needed otherwise we receive 
a promise that is still pending when we pass statsData into evenlisteners and therefore the data is undefined*/
{
	const gameHistory = await loadUserGameHistory();
	const allUsers = await loadAllUsers();

	setupEventListeners(gameHistory, allUsers); //pour charts etc qui s'affichent au click sauf pour gameHistory qd on clique sur un avatar qui se trouve plus tard
}

/***********************************************\
-					FETCHING DATA				-
\***********************************************/

async function loadUserGameHistory()
{
	try
	{
		const gameHistory = await apiRequest('/api/dashboard/getGameHistory/', {
			method: 'GET',
			headers: {
				...getAuthHeaders(),
			},
		});

		if (DEBUG)
			console.log("gameHistory= ", gameHistory);
		if (GITHUBACTIONS)
			console.log("Successfully fetched connected user's game history");
		return gameHistory;
	}
	catch (error)
	{
		console.error("Error fetching connected user's game history");
		throw error;
	}
}


//Cette fonction ne fait plus que chopper les usernames et les id puis faut rajouter
//dans le même tableau les vatars un par un avec la viuew de clément pour éviter
//l'erreur 414 (Request-URI Too Large)
async function loadAllUsers() {
	try
	{
		const response = await apiRequest('/api/users/getAllUsers/', {
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${localStorage.getItem('token')}`,
				'Content-Type': 'application/json',
			},
		});

		if (DEBUG) {
			response.forEach(user => {
				console.log("user id = ", user.id);
				console.log("username = ", user.username);
			});
		}

		if (GITHUBACTIONS)
			console.log("Successfully fetched all users");

		return response;

	}
	catch (error)
	{
		console.error("Error fetching users' avatars:", error);

		if (error.response) //DEBUG
		{
			const errorText = await error.response.text();
			console.error("Response text:", errorText);
		}

		throw error;
	}
}

function getAvatar(userID, avatar)
{
	apiRequest(`/api/users/getFriendAvatar/${userID}`, {
		method: 'GET',
	})
	.then(userData =>{
		if (DEBUG)
			console.log(userData);
		else
			console.log('No user data found');

		avatar.src = `data:image/png;base64,${userData.avatar}`;
	})
	.catch(error => {
		console.error('Error fetching user data:', error);
	})
}
	
	

/***********************************************\
-				EVENT LISTENERS					-
\***********************************************/

function setupEventListeners(gameHistory, allUsers)
{
	const chartIcon = document.getElementById('chart_icon');
	const friendsIcon = document.getElementById('friends_icon');
	const tropheeIcon = document.getElementById('trophee_icon');

	if (chartIcon)
	{
		chartIcon.addEventListener('click', function() {
			$('#chartModal').modal('show');
			chartDoughnutData(gameHistory);
		});
	}
	else
		console.error('Canvas element with id "chartModal" not found or context is null.');
	
	if (friendsIcon)
	{
		friendsIcon.addEventListener('click', function() {
			avatars(gameHistory, allUsers);
			$('#avatarModal').modal('show'); //pour afficher la fenetre
		});
	}
	else
		console.error('Canvas element with id "avatarModal" not found or context is null.');

	if (tropheeIcon)
	{
		tropheeIcon.addEventListener('click', function() {
			// $('#badgeModal').modal('show');
			badge(gameHistory, allUsers);
		});
	}
	else
		console.error('Canvas element with id "badgeModal" not found or context is null.');
}
/***********************************************\
-					CHART ICON					-
\***********************************************/
let doughnutChart; // variable to store the Chart instance

function chartDoughnutData(gameHistory)
{
	// Count the number of victories and defeats in gameHistory
	let nb_of_victories = gameHistory.filter(game => game.myScore > game.opponentScore).length;
	let nb_of_defeats = gameHistory.filter(game => game.myScore < game.opponentScore).length;

	const chartCanvas = document.getElementById('chartCanvas'); // Gets the canvas element

	if (!chartCanvas) {
		console.error('Canvas element with id "chartCanvas" not found.');
		return;
	}

	const ctx2 = chartCanvas.getContext('2d'); // Gets the context of the canvas
	if (!ctx2) {
		console.error('Unable to get context for "chartCanvas".');
		return;
	}

	// Destroys the existing Chart instance if it exists
	if (doughnutChart)
		doughnutChart.destroy();
	
	doughnutChart = new Chart(ctx2, {
		type: 'doughnut',
		data: {
			labels: ['Wins', 'Losses'],
			datasets: [{
				label: 'Games',
				data: [nb_of_victories, nb_of_defeats],
				backgroundColor: ['#36a2eb', '#ff6384'],
				hoverBackgroundColor: ['#36a2eb', '#ff6384']
			}]
		},
		options: {
			responsive: true,
			maintainAspectRatio: false,
			plugins: {
				legend: {
					display: true,
					position: 'bottom'
				}
			}
		}
	});
}


/***********************************************\
-				FRIENDS ICON					-
\***********************************************/

function avatars(gameHistory, allUsers)
{
	const opponentsList = []; // To ensure only one avatar per user
	const avatarContainer = document.querySelector('.avatar-container');
	avatarContainer.innerHTML = ''; // Clear existing avatars

	console.log("OPPONENT LIST EMPTY: ", opponentsList);
	gameHistory.forEach(game => {
		if (!opponentsList.includes(game.opponentUsername)) //if NOT already in list
		{
			console.log("OPPONENT LIST BEING FILLED: ", opponentsList);
			opponentsList.push(game.opponentUsername);
		}
	})
	console.log("OPPONENT LIST FULL: ", opponentsList);

	allUsers.forEach(user => {
		if (opponentsList.includes(user.username)) //if current user is inside opponentsList : display avatar
		{
			const avatarBox = document.createElement('div');

			avatarBox.className = 'avatar-box';
			avatarBox.dataset.toggle = 'tableModal';
			avatarBox.dataset.username = user.username;

			const avatarImg = document.createElement('img');
			avatarImg.src = getAvatar(user.id, avatarImg)
			//TODO FRONT KARL: afficher le username en passant la souris sur l'avatar SOIT en dessous de l'avatar
			avatarImg.alt = `${user.username}`;
			avatarImg.className = 'avatar-icon';

			avatarBox.appendChild(avatarImg);
			avatarContainer.appendChild(avatarBox);

			avatarBox.addEventListener('click', () => {
				displayGameHistory(gameHistory.username, user.username, gameHistory); //affiche le tableau d'historique de jeu pour l'avatar cliqué
				$('#tableModal').modal('show');
			})

			//remove opponentUsername from opponentsList
			opponentsList.splice(opponentsList.indexOf(user.username), 1);
			console.log("CURRENT OPPONENT LIST: ", opponentsList);
		}
	});

	// pour les opponentUsername restants, afficher un avatar par défaut
	opponentsList.forEach(opponent => {
		const avatarBox = document.createElement('div');

			avatarBox.className = 'avatar-box';
			avatarBox.dataset.toggle = 'tableModal';
			avatarBox.dataset.username = opponent;

			const avatarImg = document.createElement('img');

			//HERE

			// avatarImg.src = `data:image/png;base64,${`../../../../user/user_management/media/avatars/default.png`}`; //ERROR: invalid_URL
			// avatarImg.src = `data:image/png;base64,${`./src/user/user_management/media/avatars/default.png`}`; //ERROR: invalid_URL
			// avatarImg.src = '../../../../user/user_management/media/avatars/default.png'; //PAS D'ERREUR MAIS NE S'AFFICHE PAS
			avatarImg.src = './src/user/user_management/media/avatars/default.png'; //PAS D'ERREUR MAIS NE S'AFFICHE PAS
			console.log("AVATAR IMG: ", avatarImg.src);

			avatarImg.alt = `${opponent}`;
			avatarImg.className = 'avatar-icon';

			avatarBox.appendChild(avatarImg);
			avatarContainer.appendChild(avatarBox);

			avatarBox.addEventListener('click', () => {
				displayGameHistory(gameHistory.username, opponent, gameHistory); //affiche le tableau d'historique de jeu pour l'avatar cliqué
				$('#tableModal').modal('show');
			})
	});
	
}

function displayGameHistory(connectedUser, chosenOpponent, gameHistory)
{
	//creation du tableau et ajout des headers avec les params + date

	const tableHeaderRow = document.getElementById('tableHeaderRow');
	tableHeaderRow.innerHTML = ''; // Clears existing header cells

	const dateHeader = document.createElement('th');
	dateHeader.textContent = 'Date';
	tableHeaderRow.appendChild(dateHeader);

	const username1Header = document.createElement('th');
	username1Header.textContent = connectedUser; // Current user's username
	tableHeaderRow.appendChild(username1Header);

	const username2Header = document.createElement('th');
	username2Header.textContent = chosenOpponent; // Opponent user's username
	tableHeaderRow.appendChild(username2Header);

	addGameHistory(connectedUser, chosenOpponent, gameHistory);
}

function addGameHistory(connectedUser, chosenOpponent, gameHistory)
{
	const tableBody = document.getElementById('tableBody');
	tableBody.innerHTML = ''; // Clears existing rows

	gameHistory.forEach(game => {
		if (game.opponentUsername === chosenOpponent) 
		{
			// Adds date row
			const dateRow = document.createElement('tr');
			const dateCell = document.createElement('td');
			dateCell.textContent = new Date(game.date).toLocaleDateString();
			dateCell.colSpan = 3;
			dateRow.appendChild(dateCell);
			tableBody.appendChild(dateRow);

			// Adds score row
			const scoreRow = document.createElement('tr');

			const username1Cell = document.createElement('td');
			username1Cell.textContent = connectedUser;
			scoreRow.appendChild(username1Cell);

			const username2Cell = document.createElement('td');
			username2Cell.textContent = game.opponentUsername;
			scoreRow.appendChild(username2Cell);

			const scoresCell = document.createElement('td');
			scoresCell.textContent = `${game.myScore} - ${game.opponentScore}`;
			scoreRow.appendChild(scoresCell);
			tableBody.appendChild(scoreRow);
		}
	});
}


/***********************************************\
-				TROPHEE ICON					-
\***********************************************/

function retrieveAllUserStats(allUsers)
{
	const allStats = [];

	allUsers.forEach(user => {
		const stats = {
			username: user.username,
			nb_of_victories: 0,
			nb_of_defeats: 0,
			ranking_position: 0
		};

		user.games_history.forEach(game => {
			if (game.myScore > game.opponentScore)
				stats.nb_of_victories++;
			else
				stats.nb_of_defeats++;
		});

		allStats.push(stats);
	});

	return allStats;
}

function badge(gameHistory, allUsers)
{
	const allStats = retrieveAllUserStats(allUsers);

	let badge_img = '';
	let message = '';
	let ranking_position = 0;

	// Determine ranking position
	allStats.sort((a, b) => 
	{
		// First, compare by nb_of_victories (descending order)
		if (b.nb_of_victories !== a.nb_of_victories)
			return b.nb_of_victories - a.nb_of_victories;
		// If nb_of_victories are the same, compare by nb_of_defeats (ascending order)
		return a.nb_of_defeats - b.nb_of_defeats;
	});

	// After sorting, assign ranking
	allStats.forEach((user, index) =>
	{
		user.ranking_position = index + 1; // Ranking starts from 1
	});

	// Get the ranking position of the connected user
	allStats.forEach(user =>
	{
		if (user.username === gameHistory.username)
			ranking_position = user.ranking_position;
	});

	// Determine ranking position message & badge image
	if (ranking_position <= 10)
	{
		if (ranking_position <= 10 && ranking_position > 5)
		{
			message += ' You are in the top 10 players!';
			badge_img = document.getElementById('top10_badge');
		}
		else if (ranking_position <= 5 && ranking_position > 3)
		{
			message += ' You are in the top 5 players!';
			badge_img = document.getElementById('top5_badge');
		}
		else if (ranking_position <= 3 && ranking_position > 1)
		{
			message += ` You are the top ${ranking_position} player!`;
			badge_img = document.getElementById('top3_badge');
		}
		else if (ranking_position == 1)
		{
			message += " You're the best player ever!";
			badge_img = document.getElementById('top1_badge');
		}
		else
		{
			message += "You suck";
			badge_img = document.getElementById('regular_badge');
		}
	}

	// Set the modal content (= on met les infos dans l'html)
	let badgeIcon = document.querySelector('#badgeModal .modal-body .badge-icon');
	let badgeMessage = document.querySelector('#badgeModal .modal-body .badge-message');

	// On check à chaque fois qu'on trouve l'élément html avant de lui donner la valeur correspondante
	if (badgeIcon)
		badgeIcon.src = badge_img.src; //.src is necessary for both!
	else
		console.error("Badge icon element not found!");

	if (badgeMessage)
		badgeMessage.textContent = message;
	else
		console.error("Badge message element not found!");

	// Show the modal
	const badgeModal = document.getElementById('badgeModal');
	if (badgeModal)
		badgeModal.style.display = 'block';
	else
		console.error('Badge modal element not found!');
}
		
// Function to close the modal when clicking outside of it
window.onclick = function(event)
{
	const modal = document.getElementById('badgeModal');
	if (event.target == modal)
		modal.style.display = 'none';
};

