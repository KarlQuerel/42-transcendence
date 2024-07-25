
/***			Importing Scripts			***/
import renderHome from "./views/home.js";
import renderTemplate from "./views/template.js";
// import renderPong from "./components/pong/pong.js";
import {
	// setupEventListeners,
	loadDashboardData,
	// loadUserManagementData,
	// Avatars,
	// displayGameHistory,
	// ChartDoughnutData,
	// Badge,
	test
} from './views/dashboard_SPA.js';

/***			Define Routes				***/
const routes =
{
	'/home':
	{
		title: "Home",
		render: renderHome
	},
	'/template':
	{
		title: "Tuto JS files",
		render: renderTemplate
	},
	// '/pong':
	// {
	// 	title: "Pong Game",
	// 	render: renderPong
	// },
	'/dashboard': {
		title: "Dashboard",
		render: () => {
			// HTML structure for the dashboard
			return `
			<h1>Pong Game Dashboard</h1>
			<p>Something below must be printed:</p>
			<div id="nicknameDisplay"></div>

			<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
			<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js"></script>
			<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
			<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
			<script src="javascript/views/dashboard_SPA.js"></script>
			`;
		}
	}
};

/*** Router Function ***/
function router() {
	const path = window.location.hash.slice(1) || '/home';
	const route = routes[path];

	console.log('Current path:', path);
	console.log('Route:', route);

	if (route) {
		document.title = route.title;
		document.getElementById('app').innerHTML = route.render();

		if (path === '/dashboard') {
			// Call functions specific to the dashboard
			loadDashboardData();
			// setupEventListeners();
			// loadUserManagementData();
			// Avatars()
			// displayGameHistory();
			// ChartDoughnutData();
			// Badge();
			test();
		}
	} else {
		document.getElementById('app').innerHTML = '<h1>404 Not Found</h1>';
	}
}

/***		Enabling Client-side Routing		***/
document.addEventListener("DOMContentLoaded", () =>
{
	document.body.addEventListener("click", (e) =>
	{
		if (e.target.matches("[data-link]"))
		{
			e.preventDefault();
			history.pushState(null, "", e.target.href);
			router();
		}
	});

	window.addEventListener("popstate", router);

	router();
});

