/***********************************************\
-				GLOBAL VARIABLES				-
\***********************************************/
export	const	DEBUG = true;
export	const	GITHUBACTIONS = false;

/***********************************************\
-				IMPORTING SCRIPTS				-
\***********************************************/

/***			  Page Not Found		 	 ***/
import { renderPageNotFound }
from "./views/error_404/error_404.js";

/***			Nav Bar						***/
import { renderNavbar }
from "./views/navbar/navbar.js";

/***			Home						***/
import { renderHome }
from "./views/home/home.js";

/***			Pong						***/
import { renderPong, initializePong }
from "./components/pong/pong.js";

import { cleanUpPong }
from "./components/pong/postGame.js";

/***			Dashboard					***/
import { renderDashboard, initializeDashboard }
from "./views/dashboard/dashboard.js";

/***			Particles					***/
import { initParticles, destroyParticles }
from "./components/particles/particles.js"

/***			User						***/
import { render2fa }
from "./views/user/2fa.js";

import { renderSignIn }
from "./views/user/signin.js";

import { renderProfile }
from "./views/user/profile.js";

import { renderSignUp, initializeSignUp }
from "./views/user/signup.js";

import { renderChangePassword, initializeChangePassword }
from "./views/user/change_password.js";


/***			Footer						***/

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
	'/dashboard':
	{
		title: "Dashboard",
		render: renderDashboard,
		init: initializeDashboard
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
	},
	'/404':
	{
		title: "Page Not Found",
		render: renderPageNotFound,
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
	},
	'/2fa_verification':
	{
		title: "2FA Verification",
		render: render2fa
	},
	'/change-password':
	{
		title: "Change Password",
		render: renderChangePassword,
		init: initializeChangePassword
	},
};

/***********************************************\
-				FUNCTIONS						-
\***********************************************/

//	Initializing currentPath to an empty string
let	currentPath = '';

/***			Navbar						***/
function render()
{
	const navbar = renderNavbar();
	document.body.insertAdjacentElement('afterbegin', navbar);
}


/***			Normalizing Paths			***/
function normalizePath(path)
{
	if (path.endsWith('/'))
		return path.slice(0, -1);
	return path;
}

/***			Authentication				***/
let	accessToken = localStorage.getItem('access_token');
let	isSignedIn = Boolean(accessToken);

export function setSignedInState(state)
{
	isSignedIn = state;
}

export function getSignedInState()
{
	return isSignedIn;
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

	// Add this section to call cleanup for /pong on first load
	if (path === '/pong' && previousRoute !== route)
	{
		cleanUpPong();
	}

	if (DEBUG)
		console.log('isSignedIn = ', isSignedIn);

	const restrictedPaths =
	{
		'/pong': "❌ You must be logged in to access the Pong game ❌",
		'/dashboard': "❌ You must be logged in to access your dashboard ❌",
		'/profile': "❌ You must be logged in to access your profile ❌"
	};
	
	// Check if the user is trying to access a restricted route
	if (isSignedIn == false && restrictedPaths[path])
	{
		alert(restrictedPaths[path]);
		window.location.href = '/sign-in';
		return;
	}

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

		// Initialize or destroy particles based on the route
		if (path !== '/pong')
		{
			initParticles();
		}
		else
		{
			destroyParticles();
			if (DEBUG)
				console.log('Particles effect disabled on /pong route');
		}

		if (route.init)
		{
			if (DEBUG)
				console.log('Initializing route:', path);
			route.init();
		}

		// Scrolling to the top of the page
		window.scroll(0, 0);
	}
	else
	{
		document.title = "Page not Found";
		document.getElementById('app').innerHTML = renderPageNotFound();
	}

	//	Updating currentPath to the new path
	currentPath = path;
}

/***		Navigation Function				***/
export function navigateTo(path)
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