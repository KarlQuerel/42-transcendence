/***********************************************\
-		   IMPORTING VARIABLES/FUNCTIONS		-
\***********************************************/
import { DEBUG } from '../../main.js';
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

			<div id="chart_icon">
				<img src="../../../assets/images/dashboard/chart.gif">
			</div>
			<div id="friends_icon">
				<img src="../../../assets/images/dashboard/friends.gif">
			</div>
			<div id="trophee_icon">
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
					<img class="badge-icon" src="" alt="Badge">
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
	// const userData = await loadUserManagementData();
	// const userData = "clement"; //FIX: avatars appear with Carolina but not with the others --> WTF
	const allStats = await loadDashboardData(); //FIX: gameHistory is filled correctly only for Carolina, not the rest of the users
	
	// const allStats = await loadDashboardData(userData, ALL_STATS); //FIX: gameHistory is filled correctly only for Carolina, not the rest of the users
	// const userStats = await loadDashboardData(userData, USER_STATS);

	// setupEventListeners(allStats, userStats); //pour charts etc qui s'affichent au click sauf pour gameHistory qd on clique sur un avatar qui se trouve plus tard
}

/***********************************************\
-					FETCHING DATA				-
\***********************************************/

const ALL_STATS = 0;
const USER_STATS = 1;


// function loadDashboardData()
// {
// 		return fetch('/api/dashboard/getData/')
// 		.then(response =>
// 		{
// 			if (!response.ok)
// 				throw new Error('Error: network response');
// 			return response.json();
// 		})
// 		.then(allStats =>
// 		{
// 			console.log("allStats = ", allStats);
// 			return allStats;
// 		})
// 		.catch(error =>
// 		{
// 			console.error('Error: fetch allStats', error);
// 			throw error; // Re-throw the error
// 			//CHECK: if allStats is undefined : try/catch that will stop everything
// 		});
// }


async function loadDashboardData(userData, option) {
    try {
        const allStats = await apiRequest('/api/dashboard/getData/', {
            method: 'GET',
        });

        if (option == ALL_STATS)
		{
			// if (DEBUG)
				console.log("allStats = ", allStats);
            return allStats;
        }
		else if (option == USER_STATS)
		{
            let i = 0;
            while (i < allStats.length) {
                if (userData.username === allStats[i].username)
				{
					// if (DEBUG)
                    	console.log("userStats = ", allStats[i]);
                    return allStats[i]; // Return the matching user's stats
                }
                i++;
            }
			//TODO: return error if we arrive here (UPDATE: karl mettra un giff `à la place de la dashboard si aucune partie de pong jouée)
            console.log("The connected user's username does not match any username in the dashboard database"); //FIX: voir avec KARL: qd on vient de se créer un compte on arrive ici, donc afficher un message "your dashboard is still empty" OU (mieux) ne pas avoir accès au dashboard avant d'avoir joué au moins une partie de pong
        }
    } catch (error) {
        console.error('Error: fetch allStats', error);
        throw error; // Re-throw the error
		//CHECK: if allStats is undefined : try/catch that will stop everything
    }
}


async function loadUserManagementData()
{
    try {
        const userData = await apiRequest('/api/users/getUsername/', {
            method: 'GET',
            headers: {
				...getAuthHeaders(),
            },
        });
        if (DEBUG)
            console.log("userData = ", userData);
        return userData;
    } catch (error) {
        console.error('Error: fetch userData', error);
        throw error; // Re-throw the error
    }
}


/***********************************************\
-				EVENT LISTENERS					-
\***********************************************/

function setupEventListeners(allStats, userStats)
{
	const chartIcon = document.getElementById('chart_icon');
	const friendsIcon = document.getElementById('friends_icon');
	const tropheeIcon = document.getElementById('trophee_icon');

	if (chartIcon)
	{
		chartIcon.addEventListener('click', function() {
			$('#chartModal').modal('show');
			chartDoughnutData(userStats);
		});
	}
	else
		console.error('Canvas element with id "chartModal" not found or context is null.');
	
	if (friendsIcon)
	{
		friendsIcon.addEventListener('click', function() {
			avatars(allStats, userStats);
			$('#avatarModal').modal('show'); //pour afficher la fenetre
		});
	}
	else
		console.error('Canvas element with id "avatarModal" not found or context is null.');

	if (tropheeIcon)
	{
		tropheeIcon.addEventListener('click', function() {
			// $('#badgeModal').modal('show');
			badge(allStats, userStats);
		});
	}
	else
		console.error('Canvas element with id "badgeModal" not found or context is null.');
}
/***********************************************\
-					CHART ICON					-
\***********************************************/
let doughnutChart; // Declare a variable to store the Chart instance

function chartDoughnutData(userStats)
{
	const chartCanvas = document.getElementById('chartCanvas'); // Get the correct canvas element

	if (!chartCanvas) {
		console.error('Canvas element with id "chartCanvas" not found.');
		return;
	}

	const ctx2 = chartCanvas.getContext('2d'); // Get the context of the canvas
	if (!ctx2) {
		console.error('Unable to get context for "chartCanvas".');
		return;
	}

	// Destroy the existing Chart instance if it exists
	if (doughnutChart)
		doughnutChart.destroy();
	
	doughnutChart = new Chart(ctx2, {
		type: 'doughnut',
		data: {
			labels: ['Wins', 'Losses'],
			datasets: [{
				label: 'Games',
				data: [userStats.nb_of_victories, userStats.nb_of_defeats],
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

function avatars(allStats, userStats) //TODO: ask jess where are the avatars so I can fetch them
{
	const opponentsList = []; // Ensure only one avatar per user
	const avatarContainer = document.querySelector('.avatar-container');
	avatarContainer.innerHTML = ''; // Clear existing avatars

	userStats.games_history.forEach(game => { //HERE: forEach not appliable
		if (!opponentsList.includes(game.opponentUsername)) //if NOT already in list
			opponentsList.push(game.opponentUsername);
	})

	allStats.forEach(user => {
		if (opponentsList.includes(user.username)) //if current user is inside opponentsList : display avatar
		{
			const avatarBox = document.createElement('div');

			avatarBox.className = 'avatar-box';
			avatarBox.dataset.toggle = 'tableModal';
			avatarBox.dataset.username = user.username;

			const avatarImg = document.createElement('img');
			avatarImg.src = user.avatar_url;
			avatarImg.alt = `Avatar of ${user.username}`; //TODO: faire en sorte que le username apparaisse juste en passant la souris sur l'avatar?
			avatarImg.className = 'avatar-icon';

			avatarBox.appendChild(avatarImg);
			avatarContainer.appendChild(avatarBox);

			//TODO: METTRE CET EVENT LISTNENER AVEC LE RESTE EN HAUT?
			avatarBox.addEventListener('click', () => {
				displayGameHistory(userStats.username, user.username, userStats); //affiche le tableau d'historique de jeu pour l'avatar clique
				$('#tableModal').modal('show'); //TEST
			})
		}
	});
}

function displayGameHistory(connectedUser, chosenOpponent, userStats)
{
	//creation du tableau et ajout des headers avec les params + date

	const tableHeaderRow = document.getElementById('tableHeaderRow');
	tableHeaderRow.innerHTML = ''; // Clear existing header cells

	const dateHeader = document.createElement('th');
	dateHeader.textContent = 'Date';
	tableHeaderRow.appendChild(dateHeader);

	const username1Header = document.createElement('th');
	username1Header.textContent = connectedUser; // Current user's username
	tableHeaderRow.appendChild(username1Header);

	const username2Header = document.createElement('th');
	username2Header.textContent = chosenOpponent; // Opponent user's username
	tableHeaderRow.appendChild(username2Header);

	addGameHistory(connectedUser, chosenOpponent, userStats);
}

function addGameHistory(connectedUser, chosenOpponent, userStats)
{
	const tableBody = document.getElementById('tableBody');
	tableBody.innerHTML = ''; // Clear existing rows

	userStats.games_history.forEach(game => {
		if (game.opponentUsername === chosenOpponent) 
		{
			// Add date row
			const dateRow = document.createElement('tr');
			const dateCell = document.createElement('td');
			dateCell.textContent = new Date(game.date).toLocaleDateString();
			dateCell.colSpan = 3;
			dateRow.appendChild(dateCell);
			tableBody.appendChild(dateRow);

			// Add score row
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

function badge(allStats, userStats)
{
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
		if (user.username === userStats.username)
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

	//sewt the modal content (= on met les infos dans l'html)
	let badgeIcon = document.querySelector('#badgeModal .modal-body .badge-icon');
	let badgeMessage = document.querySelector('#badgeModal .modal-body .badge-message');

	// on check à chaque fois qu'on trouve l'élément html avant de lui donner la valeur correspondante
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

