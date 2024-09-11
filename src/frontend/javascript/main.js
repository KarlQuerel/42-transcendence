/***********************************************\
-				GLOBAL VARIABLES				-
\***********************************************/
export	const	DEBUG = true;

/***********************************************\
-				IMPORTING SCRIPTS				-
\***********************************************/

/***			Page Not Found				***/
import renderError404
from "./views/error_404/error_404.js";

/***			Nav Bar						***/
import renderHome
from "./views/home/home.js";

import renderPong, { cleanUpPong, initializePong }
from "./components/pong/pong.js";


/***			TO DETERMINE				***/
import { renderDashboard, initializeDashboard }
from "./views/dashboard/dashboard.js";

import { renderTheTeam }
from "./views/the_team/the_team.js";

/***			User						***/
import renderSignIn
from "./views/user/signin.js";

import renderProfile, { initializeProfile }
from "./views/user/profile.js";

import renderSignUp, { initializeSignUp }
from "./views/user/signup.js";

/***			Footer						***/
import renderPrivacyPolicy
from "./views/privacy_policy/privacy_policy.js";

import renderTermsOfService
from "./views/terms_of_service/terms_of_service.js";

/***********************************************\
-				DEFINING ROUTES					-
\***********************************************/
const routes =
{
	'':
	{
		title: "Home",
		render: renderHome
	},
	'/home':
	{
		title: "Home",
		render: renderHome
	},
	'/privacy-policy':
	{
		title: "Privacy Policy",
		render: renderPrivacyPolicy
	},
	'/terms-of-service':
	{
		title: "Terms of Service",
		render: renderTermsOfService
	},
	'/dashboard':
	{
		title: "Dashboard",
		render: renderDashboard,
		init: initializeDashboard
	},
	'/team':
	{
		title: "The Team",
		render: renderTheTeam
	},
	'/pong':
	{
		title: "Pong Game",
		render: renderPong,
		init: initializePong,
		cleanup: cleanUpPong
	},
	'/profile':
	{
		title: "My Profile",
		render: renderProfile,
		init: initializeProfile
	},
	'/404':
	{
		title: "Page Not Found",
		render: renderError404
	},
	'/sign-up':
	{
		title: "Sign Up",
		render: renderSignUp,
		init: initializeSignUp
	},
	'/sign-in':
	{
		title: "Sign In",
		render: renderSignIn
	}
};

/***********************************************\
-				FUNCTIONS						-
\***********************************************/

//	Initializing currentPath to an empty string
let	currentPath = '';

/***			Normalizing Paths			***/
function normalizePath(path)
{
	if (path.endsWith('/'))
		return path.slice(0, -1);
	return path;
}

/***			Router Function				***/
function router()
{
	let path = normalizePath(window.location.pathname) || '/home';

	//	Assigning default path if none
	if (!path)
			path = '/home';

	const previousRoute = routes[currentPath]
	const route = routes[path] || routes['/404'];

	if (DEBUG)
	{
		console.log('Current path:', path);
		console.log('Route:', route);	
	}

	//	Clear previous route if necessary
	if (previousRoute && previousRoute.cleanup)
		previousRoute.cleanup();

	if (route)
	{
		document.title = route.title;
		const renderedContent = route.render();

		const	appElement = document.getElementById('app');
		if (typeof renderedContent === 'string')
			appElement.innerHTML = renderedContent;
		else if (renderedContent instanceof HTMLElement)
		{
			appElement.innerHTML = '';
			appElement.appendChild(renderedContent);
		}

		if (route.init)
		{
			if (DEBUG)
				console.log('Initializing route:', path);
			route.init();
		}
	}
	else
	{
		document.title = "Page not Found";
		document.getElementById('app').innerHTML = renderError404();
	}

	//	Updating currentPath to the new path
	currentPath = path;
}

/***		Navigation Function				***/
function navigateTo(path)
{
	history.pushState(null, "", path);
	router();
}

window.navigateTo = navigateTo;

/***		Enabling Client-side Routing	***/
document.addEventListener("DOMContentLoaded", () =>
{
	document.body.addEventListener("click", (event) =>
	{
		// Find the nearest anchor tag if the clicked element is nested inside one
		const link = event.target.closest("a[data-link]");
		
		if (link)
		{
			event.preventDefault();
			const href = link.getAttribute('href');
			if (DEBUG)
				console.log(`Navigating to ${href}`);
			navigateTo(href);
		}
	});

	window.addEventListener("popstate", router);

	router();
});
