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
					<p></p>
				</div>
			</div>

			<!-- EXPLANATION: "alt" is used to provide alternative text for an image if it cannot be displayed -->

<!-- Badge Images -->

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

export function initializeDashboard()
{
	// let userData = loadUserManagementData();
	let statsData = loadDashboardData();

	setupEventListeners(); //pour charts etc qui s'affichent au click sauf pour gameHistory qd on clique sur un avatar qui se trouve plus tard

	//chart_icon
	// ChartBarData(statsData);
	// ChartDoughnutData(statsData); //FIX

	//friends_icon
	// GameHistoryTable(statsData);

	//trophee_icon
	badge(statsData);
}

/***********************************************\
-					FETCHING DATA				-
\***********************************************/

function loadDashboardData() {
	fetch('/api/dashboard/getData/')
		.then(response => {
			if (!response.ok)
				throw new Error('Error : network response');
			return response.json();
		})
		.then(statsData => {
			console.log("statsData = ", statsData);
		})
		.catch(error => console.error('Error : fetch statsData', error));
}

// function loadUserManagementData() {
// 	fetch('/api/users/signInUser/')
// 		.then(response => {
// 			if (!response.ok)
// 				throw new Error('Error : network response');
// 			return response.json();
// 		})
// 		.then(userData => {
// 			console.log("userData = ", userData);
// 		})
// 		.catch(error => console.error('Error : fetch userData', error));
// }


/***********************************************\
-				EVENT LISTENERS					-
\***********************************************/

function setupEventListeners()
{
	const chartIcon = document.getElementById('chart_icon');
	const friendsIcon = document.getElementById('friends_icon');
	const tropheeIcon = document.getElementById('trophee_icon');

	if (chartIcon)
	{
		chartIcon.addEventListener('click', function() {
			$('#chartModal').modal('show');
		});
	}
	else
		console.error('Canvas element with id "chartModal" not found or context is null.');
	
	if (friendsIcon)
	{
		friendsIcon.addEventListener('click', function() {
			$('#avatarModal').modal('show');
		});
	}
	else
		console.error('Canvas element with id "avatarModal" not found or context is null.');

	if (tropheeIcon)
	{
		tropheeIcon.addEventListener('click', function() {
			$('#badgeModal').modal('show');
		});
	}
	else
		console.error('Canvas element with id "badgeModal" not found or context is null.');

}

function badge(statsData) {
	document.getElementById('trophee_icon').addEventListener('click', function()
	{
		let badge = '';
		let message = '';

		// Determine badge image
		if (statsData.badge == 1) {
			badge = document.getElementById('gold_badge').src;
		} else if (statsData.badge == 2) {
			badge = document.getElementById('silver_badge').src;
		} else if (statsData.badge == 3) {
			// badge = 'animated_icons/bronze.gif';
			badge = document.getElementById('bronze_badge').src;
		}

		// Determine ranking position message
		if (statsData.ranking_position <= 10) {
			if (statsData.ranking_position > 5) {
				message += ' You are in the top 10 players!';
			} else if (statsData.ranking_position > 3) {
				message += ' You are in the top 5 players!';
			} else if (statsData.ranking_position > 1) {
				message += ` You are the top ${statsData.ranking_position} player!`;
			} else if (statsData.ranking_position == 1) {
				message += " You're the best player ever!";
			}
		}

		// Set the modal content dynamically
		document.querySelector('#badgeModal .modal-body .badge-icon').src = badge;
		document.querySelector('#badgeModal .modal-body p').textContent = message;

		// Show the modal
		// $('#badgeModal').modal('show');
		document.getElementById('badgeModal').style.display = 'block';
	});
}
		
// Function to close the modal when clicking outside of it
window.onclick = function(event)
{
	const modal = document.getElementById('badgeModal');
	if (event.target == modal)
		modal.style.display = 'none';
};

