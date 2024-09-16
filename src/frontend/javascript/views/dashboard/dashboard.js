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

<!-- Badge -->
			<div id="badgeModal" class="modal">
				<div class="modal-body">
					<img class="badge-icon" src="" alt="Badge">
					<p class="badge-message"></p>
				</div>
			</div>

			<!-- EXPLANATION: "alt" is used to provide alternative text for an image if it cannot be displayed -->

<!-- Badge Images -->

			<img id="gold_badge" src="../../../assets/images/dashboard/regular.png" style="display: none;">
			<img id="gold_badge" src="../../../assets/images/dashboard/gold.gif" style="display: none;">
			<img id="silver_badge" src="../../../assets/images/dashboard/silver.gif" style="display: none;">
			<img id="bronze_badge" src="../../../assets/images/dashboard/bronze.gif" style="display: none;">
			
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
	let userData = loadUserManagementData();
	let statsData = await loadDashboardData(userData);
	//if (DEBUG)
		console.log("user's data = ", statsData);
		console.log("user's badge = ", statsData.badge); //TEST


	setupEventListeners(statsData); //pour charts etc qui s'affichent au click sauf pour gameHistory qd on clique sur un avatar qui se trouve plus tard
}

/***********************************************\
-					FETCHING DATA				-
\***********************************************/

function loadDashboardData(userData)
{
	return fetch('/api/dashboard/getData/')
		.then(response =>
		{
			if (!response.ok)
				throw new Error('Error: network response');
			return response.json();
		})
		.then(statsData =>
		{
			// if (DEBUG)
				console.log("statsData = ", statsData);

			let i = 0;
			while (i < statsData.length)
			{
				if (userData.nickname === statsData[i].nickname) // if userData.nickname == the current statsData entry's nickname
					return statsData[i]; // Return the matching user's stats
				i++;
			}
			//TODO: return error if we arrive here
			console.log("The connected user's nickname does not match any nickname in the dashbaord database");
		})
		.catch(error =>
		{
			console.error('Error: fetch statsData', error);
			throw error; // Re-throw the error
			//CHECK: if statsData is undefined : try/catch that will stop everything
		});
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
		nickname: 'wfEpocIQ'
	};
}

//-------------------------------------- FIN TEST -------------------------------------



/***********************************************\
-				EVENT LISTENERS					-
\***********************************************/

function setupEventListeners(statsData)
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
			$('#avatarModal').modal('show');
			// GameHistoryTable(statsData);
		});
	}
	else
		console.error('Canvas element with id "avatarModal" not found or context is null.');

	if (tropheeIcon)
	{
		tropheeIcon.addEventListener('click', function() {
			// $('#badgeModal').modal('show');
			badge(statsData);
		});
	}
	else
		console.error('Canvas element with id "badgeModal" not found or context is null.');
}

function badge(statsData)
{
	console.log("user's badge = ", statsData.badge); //HERE

	let badge_img = '';
	let message = '';

	// Determine badge image
	if (statsData.badge == 0)
		badge_img = document.getElementById('regular_badge');
	else if (statsData.badge == 1)
		badge_img = document.getElementById('gold_badge');
	else if (statsData.badge == 2)
		badge_img = document.getElementById('silver_badge');
	else if (statsData.badge == 3)
		badge_img = document.getElementById('bronze_badge');

	// Determine ranking position message
	if (statsData.ranking_position <= 10)
	{
		if (statsData.ranking_position > 5)
			message += ' You are in the top 10 players!';
		else if (statsData.ranking_position > 3)
			message += ' You are in the top 5 players!';
		else if (statsData.ranking_position > 1)
			message += ` You are the top ${statsData.ranking_position} player!`;
		else if (statsData.ranking_position == 1)
			message += " You're the best player ever!";
		else
			message += "You suck"; //TEST
	}

	//sewt the modal content (= on met les infos dans l'html)
	const badgeIcon = document.querySelector('#badgeModal .modal-body .badge-icon');
	const badgeMessage = document.querySelector('#badgeModal .modal-body .badge-message');

	// on check à chaque fois qu'on trouve l'élément html avant de lui donner la valeur correspondante
	if (badgeIcon)
		badgeIcon.src = badge_img.src; //.src is necessary!
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

