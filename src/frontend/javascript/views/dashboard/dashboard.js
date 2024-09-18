/***********************************************\
-			IMPORTING GLOBAL VARIABLES			-
\***********************************************/
// import { DEBUG } from '../../main.js';


/***********************************************\
-						HTML					-
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

<!-- Game History Modal -->

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
	const userData = loadUserManagementData();
	const allStats = await loadDashboardData(userData, ALL_STATS);
	const userStats = await loadDashboardData(userData, USER_STATS);
	//if (DEBUG)
		console.log("allStats = ", allStats);
		console.log("userStats = ", userStats);

	setupEventListeners(allStats, userStats); //pour charts etc qui s'affichent au click sauf pour gameHistory qd on clique sur un avatar qui se trouve plus tard
}

/***********************************************\
-					FETCHING DATA				-
\***********************************************/

const ALL_STATS = 0;
const USER_STATS = 1;

function loadDashboardData(userData, option)
{
	if (option == ALL_STATS)
	{
		return fetch('/api/dashboard/getData/')
		.then(response =>
		{
			if (!response.ok)
				throw new Error('Error: network response');
			return response.json();
		})
		.then(allStats =>
		{
			return allStats;
		})
		.catch(error =>
		{
			console.error('Error: fetch allStats', error);
			throw error; // Re-throw the error
			//CHECK: if allStats is undefined : try/catch that will stop everything
		});
	}
	else if (option == USER_STATS)
	{
		return fetch('/api/dashboard/getData/')
		.then(response =>
		{
			if (!response.ok)
				throw new Error('Error: network response');
			return response.json();
		})
		.then(allStats =>
		{
			let i = 0;
			while (i < allStats.length)
			{
				if (userData.nickname === allStats[i].nickname) // if userData.nickname == the current allStats entry's nickname
					return allStats[i]; // Return the matching user's stats
				i++;
			}
			//TODO: return error if we arrive here
			console.log("The connected user's nickname does not match any nickname in the dashbaord database");
		})
		.catch(error =>
		{
			console.error('Error: fetch allStats', error);
			throw error; // Re-throw the error
			//CHECK: if allStats is undefined : try/catch that will stop everything
		});
	}
}

/* function loadUserManagementData()
{
	fetch('/api/users/signInUser/')
		.then(response =>
		{
			if (!response.ok)
				throw new Error('Error : network response');
			return response.json();
		})
		.then(userData =>
		{
			if (DEBUG)
				console.log("userData = ", userData);
			return userData;
		})
		.catch(error =>
		{
			console.error('Error : fetch userData', error)
			throw error; // Re-throw the error
			//CHECK: if userData is undefined : try/catch that will stop everything
		});
} */

//-------------------------------------- TEST waiting for jess' user -------------------------------------

class UserData {
	constructor(nickname) {
		this.nickname = nickname;
	}
}

function loadUserManagementData()
{
	return { // '{' has to be on the same line, otherwise error
		nickname: 'Carolina'
	};
}

//-------------------------------------- FIN TEST -------------------------------------



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
			// ChartBarData(statsData);
			// ChartDoughnutData(statsData); //FIX
		});
	}
	else
		console.error('Canvas element with id "chartModal" not found or context is null.');
	
	if (friendsIcon)
	{
		friendsIcon.addEventListener('click', function() {
			Avatars(allStats, userStats);
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

//TODO: décider quoi afficher


/***********************************************\
-				FRIENDS ICON					-
\***********************************************/

function Avatars(allStats, userStats)
{
	const opponentsList = []; // Ensure only one avatar per user
	const avatarContainer = document.querySelector('.avatar-container');
	avatarContainer.innerHTML = ''; // Clear existing avatars

	userStats.games_history.forEach(game => { //HERE: forEach not appliable
		if (!opponentsList.includes(game.opponentNickname)) //if NOT already in list
			opponentsList.push(game.opponentNickname);
	})

	allStats.forEach(user => {
		if (opponentsList.includes(user.nickname)) //if current user is inside opponentsList : display avatar
		{
			const avatarBox = document.createElement('div');

			avatarBox.className = 'avatar-box';
			avatarBox.dataset.toggle = 'tableModal';
			avatarBox.dataset.nickname = user.nickname;

			const avatarImg = document.createElement('img');
			avatarImg.src = user.avatar_url;
			avatarImg.alt = `Avatar of ${user.nickname}`; //TODO: faire en sorte que le nickname apparaisse juste en passant la souris sur l'avatar?
			avatarImg.className = 'avatar-icon';

			avatarBox.appendChild(avatarImg);
			avatarContainer.appendChild(avatarBox);

			//TODO: METTRE CET EVENT LISTNENER AVEC LE RESTE EN HAUT?
			avatarBox.addEventListener('click', () => {
				displayGameHistory(userStats.nickname, user.nickname, userStats); //affiche le tableau d'historique de jeu pour l'avatar clique
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

	const nickname1Header = document.createElement('th');
	nickname1Header.textContent = connectedUser; // Current user's nickname
	tableHeaderRow.appendChild(nickname1Header);

	const nickname2Header = document.createElement('th');
	nickname2Header.textContent = chosenOpponent; // Opponent user's nickname
	tableHeaderRow.appendChild(nickname2Header);

	addGameHistory(connectedUser, chosenOpponent, userStats);
}

function addGameHistory(connectedUser, chosenOpponent, userStats)
{
	const tableBody = document.getElementById('tableBody');
	tableBody.innerHTML = ''; // Clear existing rows

	userStats.games_history.forEach(game => {
		if (game.opponentNickname === chosenOpponent) 
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

			const nickname1Cell = document.createElement('td');
			nickname1Cell.textContent = connectedUser;
			scoreRow.appendChild(nickname1Cell);

			const nickname2Cell = document.createElement('td');
			nickname2Cell.textContent = game.opponentNickname;
			scoreRow.appendChild(nickname2Cell);

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
		if (user.nickname === userStats.nickname)
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

