/***********************************************\
-				GLOBAL VARIABLES				-
\***********************************************/
export	const	DEBUG = true;

/***********************************************\
-				IMPORTING SCRIPTS				-
\***********************************************/

/***			  Page Not Found		 	 ***/
import renderError404
from "./views/error_404/error_404.js";

/***			Nav Bar						***/
import renderHome
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
import renderSignIn
from "./views/user/signin.js";

import renderProfile
from "./views/user/profile.js";

import renderSignUp, { initializeSignUp }
from "./views/user/signup.js";

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



/***			Authentication				***/
//HERE - Check if authentication is working properly (see router function)
let	accessToken = localStorage.getItem('access_token');
let	isSignedIn;

if (accessToken)
{
	isSignedIn = true;
}
else
{
	isSignedIn = false;
}

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

	if (DEBUG)
		console.log('isSignedIn = ', isSignedIn);

	// Check user authentication
	if (path === '/pong' && isSignedIn == false)
	{
		alert("❌ You must be logged in to access the Pong game ❌");
		window.location.href = '/sign-in';
		return ;
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
