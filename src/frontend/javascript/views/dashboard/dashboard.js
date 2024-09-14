/***********************************************\
-			IMPORTING GLOBAL VARIABLES			-
\***********************************************/
// import { DEBUG } from '../../main.js';

export function renderDashboard()
{
	return `
		<div id="dashboard">
			<h1>Welcome to the Dashboard</h1>
		</div>
	`;
}

export function initializeDashboard() {
	loadDashboardData();
	loadUserManagementData();
}

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

function loadUserManagementData() {
	fetch('/api/users/signInUser/')
		.then(response => {
			if (!response.ok)
				throw new Error('Error : network response');
			return response.json();
		})
		.then(userData => {
			console.log("userData = ", userData);
		})
		.catch(error => console.error('Error : fetch userData', error));
}