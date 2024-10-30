/* **********************************************\
-			IMPORTING VARIABLES/FUNCTIONS		-
\***********************************************/
import { DEBUG, GITHUBACTIONS } from '../../main.js';
import { apiRequest } from '../user/signin.js';
import { getAuthHeaders } from '../user/signin.js';

/***********************************************\
*				   RENDERING				   *
\***********************************************/

// KARL HERE BACKUP
// export function renderDashboard()
// {
// 	// Container
// 	const	dashboard = document.createElement('div');
// 	dashboard.id = 'dashboard-container';

// 	// Title
// 	const	title = document.createElement('h1');
// 	title.id = 'dashboard-title';
// 	title.textContent = 'Your Dashboard';

// 	// Create icons container
// 	const	iconsContainer = document.createElement('div');

// 	// Create clickable icons
// 	const	icons = [
// 		{ id: 'chart_icon', src: '../../../assets/images/dashboard/chart.gif' },
// 		{ id: 'friends_icon', src: '../../../assets/images/dashboard/friends.gif' },
// 		{ id: 'trophee_icon', src: '../../../assets/images/dashboard/trophee.gif' },
// 	];

// 	icons.forEach(icon => {
// 		const	iconDiv = document.createElement('div');
// 		iconDiv.id = icon.id;
// 		iconDiv.className = 'dashboard-icon';

// 		const	img = document.createElement('img');
// 		img.src = icon.src;

// 		iconDiv.appendChild(img);
// 		iconsContainer.appendChild(iconDiv);
// 	});

// 	dashboard.appendChild(iconsContainer);

// 	// Create the modal for avatars
// 	const	avatarModal = createModal('Friends Avatars', 'avatarModal', 'avatar-container');
// 	dashboard.appendChild(avatarModal);

// 	// Create the modal for game history
// 	const	gameHistoryModal = createGameHistoryModal();
// 	dashboard.appendChild(gameHistoryModal);

// 	// Add canvas elements
// 	const	chartCanvas = document.createElement('canvas');
// 	chartCanvas.id = 'chartCanvas';
// 	chartCanvas.width = 400;
// 	chartCanvas.height = 400;
// 	dashboard.appendChild(chartCanvas);

// 	const	progressionChart = document.createElement('canvas');
// 	progressionChart.id = 'progressionChart';
// 	progressionChart.width = 600;
// 	progressionChart.height = 400;
// 	dashboard.appendChild(progressionChart);

// 	// Create the badge modal
// 	const	badgeModal = createBadgeModal();
// 	dashboard.appendChild(badgeModal);

// 	// Create hidden badge images
// 	const	badgeImages = [
// 		'top1.gif', 'top3.gif', 'top5.gif', 'top10.gif', 'regular.gif'
// 	];

// 	badgeImages.forEach(badge => {
// 		const	img = document.createElement('img');
// 		img.id = badge.replace('.gif', '_badge'); // e.g., top1_badge
// 		img.src = `../../../assets/images/dashboard/${badge}`;
// 		img.style.display = 'none'; // Hide by default
// 		dashboard.appendChild(img);
// 	});

// 	// Append
// 	dashboard.appendChild(title);


// 	return dashboard;
// }

export function renderDashboard()
{
	// Container
	const	dashboard = document.createElement('div');
	dashboard.id = 'dashboard-container';

	// Title
	const	title = document.createElement('h1');
	title.id = 'dashboard-title';
	title.textContent = 'Your Dashboard';
	dashboard.appendChild(title);

	// Create buttons container
	const	buttonsContainer = document.createElement('div');
	buttonsContainer.id = 'dashboard-buttons-container';

	// My Stats
	const	statsButton = document.createElement('div');
	statsButton.classList.add('btn', 'btn-home', 'btn-dashboard');
	statsButton.id = 'statsButton';
	statsButton.textContent = 'My Stats';

	statsButton.addEventListener('click', () =>
	{
		console.log('fix me');
		// chartPieData(gameHistory); // Directly calls the function to display the chart
	});

	// My Friends Stats
	const	friendsStatsButton = document.createElement('div');
	friendsStatsButton.classList.add('btn', 'btn-home', 'btn-dashboard');
	friendsStatsButton.id = 'friendsStatsButton';
	friendsStatsButton.textContent = 'My Friends Stats';

	// My Rank
	const	rankButton = document.createElement('div');
	rankButton.classList.add('btn', 'btn-home', 'btn-dashboard');
	rankButton.id = 'rankButton';
	rankButton.textContent = 'My Rank';

	buttonsContainer.appendChild(statsButton);
	buttonsContainer.appendChild(friendsStatsButton);
	buttonsContainer.appendChild(rankButton);

	dashboard.appendChild(buttonsContainer);

	// Charts Container
	const	chartsContainer = document.createElement('div');
	chartsContainer.classList.add('container');
	chartsContainer.id = 'charts-container';

	// Chart Canvas for Pie Chart
	const	chartCanvas = document.createElement('canvas');
	chartCanvas.id = 'chart-canvas';
	chartsContainer.appendChild(chartCanvas);

	// Chart Canvas for Pie Chart
	const	progressionChart = document.createElement('canvas');
	progressionChart.id = 'progressionChart';
	chartsContainer.appendChild(progressionChart);

	dashboard.appendChild(chartsContainer);

	// Create the badge modal
	const	badgeModal = createBadgeModal();
	dashboard.appendChild(badgeModal);

	// Create hidden badge images
	const	badgeImages = [
		'top1.gif', 'top3.gif', 'top5.gif', 'top10.gif', 'regular.gif'
	];

	badgeImages.forEach(badge => {
		const	img = document.createElement('img');
		img.id = badge.replace('.gif', '_badge'); // e.g., top1_badge
		img.src = `../../../assets/images/dashboard/${badge}`;
		img.style.display = 'none'; // Hide by default
		dashboard.appendChild(img);
	});

	return dashboard;
}
// Helper function to create a modal
function createModal(title, modalId, bodyClass) {
	const	modal = document.createElement('div');
	modal.id = modalId;
	modal.className = 'modal';

	const	dialog = document.createElement('div');
	dialog.className = 'modal-dialog';

	const	content = document.createElement('div');
	content.className = 'modal-content';

	const	header = document.createElement('div');
	header.className = 'modal-header';

	const	modalTitle = document.createElement('h5');
	modalTitle.className = 'modal-title';
	modalTitle.textContent = title;
	header.appendChild(modalTitle);

	const	closeButton = document.createElement('button');
	closeButton.type = 'button';
	closeButton.className = 'close';
	closeButton.setAttribute('data-dismiss', 'modal');
	closeButton.setAttribute('aria-label', 'Close');
	closeButton.innerHTML = '<span aria-hidden="true">&times;</span>';
	header.appendChild(closeButton);

	const	body = document.createElement('div');
	body.className = 'modal-body';
	
	const	bodyContainer = document.createElement('div');
	bodyContainer.className = bodyClass;
	body.appendChild(bodyContainer);

	const	footer = document.createElement('div');
	footer.className = 'modal-footer';

	const	footerButton = document.createElement('button');
	footerButton.type = 'button';
	footerButton.className = 'btn btn-secondary';
	footerButton.setAttribute('data-dismiss', 'modal');
	footerButton.textContent = 'Close';
	footer.appendChild(footerButton);

	content.appendChild(header);
	content.appendChild(body);
	content.appendChild(footer);
	dialog.appendChild(content);
	modal.appendChild(dialog);

	return modal;
}

// Helper function to create the game history modal
function createGameHistoryModal() {
	const	modal = document.createElement('div');
	modal.id = 'tableModal';
	modal.className = 'modal';

	const	dialog = document.createElement('div');
	dialog.className = 'modal-dialog';

	const	content = document.createElement('div');
	content.className = 'modal-content';

	const	header = document.createElement('div');
	header.className = 'modal-header';

	const	modalTitle = document.createElement('h5');
	modalTitle.className = 'modal-title';
	modalTitle.textContent = 'Game History';
	header.appendChild(modalTitle);

	const	closeButton = document.createElement('button');
	closeButton.type = 'button';
	closeButton.className = 'close';
	closeButton.setAttribute('data-dismiss', 'modal');
	closeButton.setAttribute('aria-label', 'Close');
	closeButton.innerHTML = '<span aria-hidden="true">&times;</span>';
	header.appendChild(closeButton);

	const	body = document.createElement('div');
	body.className = 'modal-body';

	const	table = document.createElement('table');
	table.className = 'table table-striped';

	const	thead = document.createElement('thead');
	const	headerRow = document.createElement('tr');
	headerRow.id = 'tableHeaderRow';
	thead.appendChild(headerRow);
	
	const	tbody = document.createElement('tbody');
	tbody.id = 'tableBody';

	table.appendChild(thead);
	table.appendChild(tbody);
	body.appendChild(table);

	const	footer = document.createElement('div');
	footer.className = 'modal-footer';

	const	footerButton = document.createElement('button');
	footerButton.type = 'button';
	footerButton.className = 'btn btn-secondary';
	footerButton.setAttribute('data-dismiss', 'modal');
	footerButton.textContent = 'Close';
	footer.appendChild(footerButton);

	content.appendChild(header);
	content.appendChild(body);
	content.appendChild(footer);
	dialog.appendChild(content);
	modal.appendChild(dialog);

	return modal;
}

// Helper function to create the badge modal
function createBadgeModal() {
	const	modal = document.createElement('div');
	modal.id = 'badgeModal';
	modal.className = 'modal';

	const	body = document.createElement('div');
	body.className = 'modal-body';

	const	badgeImg = document.createElement('img');
	badgeImg.id = 'badge';
	badgeImg.className = 'badge-icon';
	badgeImg.src = '';
	badgeImg.alt = 'Badge';

	const	badgeMessage = document.createElement('p');
	badgeMessage.className = 'badge-message';

	body.appendChild(badgeImg);
	body.appendChild(badgeMessage);
	modal.appendChild(body);

	return modal;
}


/***********************************************\
-				MAIN FUNCTION					-
\***********************************************/

export async function initializeDashboard() /*assync and wait needed otherwise we receive 
a promise that is still pending when we pass statsData into evenlisteners and therefore the data is undefined*/
{
	const	gameHistory = await loadUserGameHistory();
	const	allUsers = await loadAllUsers();

	setupEventListeners(gameHistory, allUsers); //pour charts etc qui s'affichent au click sauf pour gameHistory qd on clique sur un avatar qui se trouve plus tard
}

/***********************************************\
-					FETCHING DATA				-
\***********************************************/

async function loadUserGameHistory()
{
	try
	{
		const	gameHistory = await apiRequest('/api/dashboard/getGameHistory/', {
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
		const	response = await apiRequest('/api/users/getAllUsers/', {
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
			const	errorText = await error.response.text();
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
	const	chartButton = document.getElementById('statsButton');
	const	friendsButton = document.getElementById('friendsStatsButton');
	const	trophyButton = document.getElementById('rankButton');

	if (chartButton)
	{
		chartButton.addEventListener('click', function()
		{
			$('#chartModal').modal('show');
			chartPieData(gameHistory);
			progressionGraph(gameHistory);
		});
	}
	else
	{
		console.error('Button element with id "chart_button" not found.');
	}

	if (friendsButton)
	{
		friendsButton.addEventListener('click', function()
		{
			avatars(gameHistory, allUsers);
			$('#avatarModal').modal('show');
		});
	}
	else
	{
		console.error('Button element with id "friends_button" not found.');
	}

	if (trophyButton)
	{
		trophyButton.addEventListener('click', function()
		{
			badge(gameHistory, allUsers);
		});
	}
	else
	{
		console.error('Button element with id "trophy_button" not found.');
	}

	favouritePlayingBuddy(gameHistory, allUsers);
	// chartPieData(gameHistory);
	// progressionGraph(gameHistory);
	showConnectedUserAvatar(gameHistory, allUsers);
}

/***********************************************\
-					CHART ICON					-
\***********************************************/

function chartPieData(gameHistory)
{
	// Count the number of victories and defeats in gameHistory
	let nb_of_victories = gameHistory.filter(game => game.myScore > game.opponentScore).length;
	let nb_of_defeats = gameHistory.filter(game => game.myScore < game.opponentScore).length;

	const	chartCanvas = document.getElementById('chart-canvas');

    if (!chartCanvas) {
        console.error('Canvas element with id "chartCanvas" not found.');
        return;
    }

	const	ctx = chartCanvas.getContext('2d'); // Gets the context of the canvas
	if (!ctx) {
		console.error('Unable to get context for "chartCanvas".');
		return;
	}

	// Clear the canvas
	ctx.clearRect(0, 0, chartCanvas.width, chartCanvas.height);

	// Calculate total games and the angles for the pie chart
	const	totalGames = nb_of_victories + nb_of_defeats;
	const	angles = [
		(nb_of_victories / totalGames) * 2 * Math.PI,
		(nb_of_defeats / totalGames) * 2 * Math.PI
	];

	// Define colors
	const	colors = ['#091370', '#ff0000'];

	// Draw the pie chart
	let startAngle = 0;

	angles.forEach((angle, index) => {
		ctx.beginPath();
		ctx.moveTo(chartCanvas.width / 2, chartCanvas.height / 2); // Move to center
		ctx.arc(
			chartCanvas.width / 2,
			chartCanvas.height / 2,
			Math.min(chartCanvas.width, chartCanvas.height) / 2 - 10, // Radius
			startAngle,
			startAngle + angle // End angle
		);
		ctx.closePath();
		ctx.fillStyle = colors[index];
		ctx.fill();
		
		startAngle += angle; // Update the starting angle for the next slice
	});

	// Optional: Draw the legend
	const	legendLabels = ['Wins', 'Losses'];
	const	legendX = chartCanvas.width / 2 + 20; // X position for legend
	const	legendY = chartCanvas.height / 2 - 20; // Y position for legend

	legendLabels.forEach((label, index) => {
		ctx.fillStyle = colors[index];
		ctx.fillRect(legendX, legendY + index * 20, 15, 15); // Draw legend box
		ctx.fillStyle = '#000'; // Reset color for text
		ctx.fillText(label, legendX + 20, legendY + index * 20 + 12); // Draw legend text
	});
}

function progressionGraph(gameHistory) {
	// Create an object to hold daily stats
	const	dailyStats = {};

	// Process game history to collect wins and games per day
	gameHistory.forEach(game => {
		const	date = new Date(game.date).toLocaleDateString();

		if (!dailyStats[date]) {
			dailyStats[date] = { wins: 0, totalGames: 0 };
		}

		dailyStats[date].totalGames++;

		// Increment wins if the current user won
		if (game.myScore > game.opponentScore) {
			dailyStats[date].wins++;
		}
	});

	// Prepare data for the chart
	const	labels = Object.keys(dailyStats);
	const	winPercentages = labels.map(date => {
		const	{ wins, totalGames } = dailyStats[date];
		return totalGames > 0 ? (wins / totalGames) * 100 : 0; // Calculate percentage
	});

	// Render the chart
	renderProgressionChart(labels, winPercentages);
}

function renderProgressionChart(labels, winPercentages) {
	const	progressionChart = document.getElementById('progressionChart'); // Use existing canvas
	const	ctx = progressionChart.getContext('2d');
	
	// Clear the canvas
	ctx.clearRect(0, 0, progressionChart.width, progressionChart.height);

	const	padding = 50;
	const	chartWidth = progressionChart.width - 2 * padding;
	const	chartHeight = progressionChart.height - 2 * padding;

	// Find max win percentage for scaling
	const	maxWinPercentage = Math.max(...winPercentages);
	
	// Draw axes
	ctx.beginPath();
	ctx.moveTo(padding, progressionChart.height - padding);
	ctx.lineTo(progressionChart.width - padding, progressionChart.height - padding); // x-axis
	ctx.lineTo(progressionChart.width - padding, padding); // y-axis
	ctx.stroke();

	// Draw labels
	ctx.font = '12px Arial';
	labels.forEach((label, index) => {
		const	x = padding + (index * (chartWidth / (labels.length - 1)));
		ctx.fillText(label, x, progressionChart.height - padding + 20); // x-axis labels
	});

	// Draw win percentage points
	ctx.beginPath();
	winPercentages.forEach((percentage, index) => {
		const	x = padding + (index * (chartWidth / (labels.length - 1)));
		const	y = progressionChart.height - padding - (percentage / maxWinPercentage * chartHeight);
		if (index === 0) {
			ctx.moveTo(x, y);
		} else {
			ctx.lineTo(x, y);
		}
	});
	ctx.strokeStyle = '#36a2eb';
	ctx.stroke();

	// Draw points on the line
	winPercentages.forEach((percentage, index) => {
		const	x = padding + (index * (chartWidth / (labels.length - 1)));
		const	y = progressionChart.height - padding - (percentage / maxWinPercentage * chartHeight);
		ctx.beginPath();
		ctx.arc(x, y, 5, 0, 2 * Math.PI);
		ctx.fillStyle = '#36a2eb';
		ctx.fill();
	});
}



/***********************************************\
-				FRIENDS ICON					-
\***********************************************/

function avatars(gameHistory, allUsers)
{
	const	opponentsList = []; // To ensure only one avatar per user
	const	avatarContainer = document.querySelector('.avatar-container');
	if (!avatarContainer)
	{
		console.error("Avatar container element not found.");
		return;
	}
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
			const	avatarBox = document.createElement('div');

			avatarBox.className = 'avatar-box';
			avatarBox.dataset.toggle = 'tableModal';
			avatarBox.dataset.username = user.username;

			const	avatarImg = document.createElement('img');
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
		const	avatarBox = document.createElement('div');

		avatarBox.className = 'avatar-box';
		avatarBox.dataset.toggle = 'tableModal';
		avatarBox.dataset.username = opponent;

		const	avatarImg = document.createElement('img');
		if (opponent === 'deleted_user')
			avatarImg.src = '/assets/images/dashboard/deleted_user.png';
		else
			avatarImg.src = '/assets/images/dashboard/default.png';
		if (DEBUG)
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

	const	tableHeaderRow = document.getElementById('tableHeaderRow');
	tableHeaderRow.innerHTML = ''; // Clears existing header cells

	const	dateHeader = document.createElement('th');
	dateHeader.textContent = 'Date';
	tableHeaderRow.appendChild(dateHeader);

	const	username1Header = document.createElement('th');
	username1Header.textContent = connectedUser; // Current user's username
	tableHeaderRow.appendChild(username1Header);

	const	username2Header = document.createElement('th');
	username2Header.textContent = chosenOpponent; // Opponent user's username
	tableHeaderRow.appendChild(username2Header);

	addGameHistory(connectedUser, chosenOpponent, gameHistory);
}

function addGameHistory(connectedUser, chosenOpponent, gameHistory)
{
	const	tableBody = document.getElementById('tableBody');
	tableBody.innerHTML = ''; // Clears existing rows

	gameHistory.forEach(game => {
		if (game.opponentUsername === chosenOpponent) 
		{
			// Adds date row
			const	dateRow = document.createElement('tr');
			const	dateCell = document.createElement('td');
			dateCell.textContent = new Date(game.date).toLocaleDateString();
			dateCell.colSpan = 3;
			dateRow.appendChild(dateCell);
			tableBody.appendChild(dateRow);

			// Adds score row
			const	scoreRow = document.createElement('tr');

			const	username1Cell = document.createElement('td');
			username1Cell.textContent = connectedUser;
			scoreRow.appendChild(username1Cell);

			const	username2Cell = document.createElement('td');
			username2Cell.textContent = game.opponentUsername;
			scoreRow.appendChild(username2Cell);

			const	scoresCell = document.createElement('td');
			scoresCell.textContent = `${game.myScore} - ${game.opponentScore}`;
			scoreRow.appendChild(scoresCell);
			tableBody.appendChild(scoreRow);
		}
	});
}


/***********************************************\
-				TROPHEE ICON					-
\***********************************************/

function retrieveAllUserStats(allUsers, gameHistory)
{
	const	allStats = [];

	allUsers.forEach(user => {
		const	stats = {
			username: user.username,
			nb_of_victories: 0,
			nb_of_defeats: 0,
			ranking_position: 0
		};

		gameHistory.forEach(game => {
			// Check if the game belongs to the current user
			if (game.myUsername === stats.username) {
				// Update victories or defeats based on game score
				if (game.myScore > game.opponentScore) {
					stats.nb_of_victories++;
				} else {
					stats.nb_of_defeats++;
				}
			}
		});

		allStats.push(stats);
	});

	return allStats;
}

function badge(gameHistory, allUsers)
{
	const	allStats = retrieveAllUserStats(allUsers, gameHistory);

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
	const	badgeModal = document.getElementById('badgeModal');
	if (badgeModal)
		badgeModal.style.display = 'block';
	else
		console.error('Badge modal element not found!');
}
		
// Function to close the modal when clicking outside of it
window.onclick = function(event)
{
	const	modal = document.getElementById('badgeModal');
	if (event.target == modal)
		modal.style.display = 'none';
}

/***********************************************\
-			FAVOURITE PLAYING BUDDY				-
 * *********************************************/

function favouritePlayingBuddy(gameHistory, allUsers)
{
	//make opponent list a 2 column table with username and number of games played
	//sort by number of games played
	//display the avatar of the most common opponent username

	const	opponentsList = [];
	const	avatarContainer = document.querySelector('.avatar-container');
	avatarContainer.innerHTML = ''; // Clear existing avatars

	gameHistory.forEach(game => {
		if (!opponentsList.includes(game.opponentUsername))
			opponentsList.push(game.opponentUsername);
	});

	const	opponentsStats = [];
	opponentsList.forEach(opponent => {
		const	stats = {
			username: opponent,
			nb_of_games: 0
		};

		gameHistory.forEach(game => {
			if (game.opponentUsername === stats.username)
				stats.nb_of_games++;
		});

		opponentsStats.push(stats);
	});

	opponentsStats.sort((a, b) => b.nb_of_games - a.nb_of_games); //WTF

	const	mostPlayedOpponent = opponentsStats[0].username;

	allUsers.forEach(user => {
		if (user.username === mostPlayedOpponent) {
			
			//show avatar on the upper right corner
			const	avatarImg = document.createElement('img');
			avatarImg.className = 'avatar-icon'
			avatarImg.style.position = 'absolute';
			avatarImg.style.top = '20';
			avatarImg.style.right = '20';
			avatarImg.style.width = '100px';
			avatarImg.style.height = '100px';
			avatarImg.src = getAvatar(user.id, avatarImg)
			avatarImg.alt = `${user.username}`;
			document.body.appendChild(avatarImg);
		}
	});
}

/************************************************
- 			SHOW CONNECTED USER AVATAR			-
**********************************************/

function showConnectedUserAvatar(gameHistory, allUsers)
{
	const	connectedUser = gameHistory.username;

	allUsers.forEach(user => {
		if (user.username === connectedUser) {
			const	avatarImg = document.createElement('img');
			avatarImg.className = 'avatar-icon'
			avatarImg.style.position = 'absolute';
			avatarImg.style.top = '0';
			avatarImg.style.right = '0';
			avatarImg.style.width = '100px';
			avatarImg.style.height = '100px';
			avatarImg.src = getAvatar(user.id, avatarImg)
			avatarImg.alt = `${user.username}`;
			document.body.appendChild(avatarImg);
		}
	});
}