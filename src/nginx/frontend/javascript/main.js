/*** Importing Scripts ***/
import renderHome from "./views/home/home.js";
import renderTemplate from "./views/template/template.js";
import renderPrivacyPolicy from "./views/privacy_policy/privacy_policy.js";
import renderTermsOfService from "./views/terms_of_service/terms_of_service.js";
import renderError404 from "./views/error_404/error_404.js";

/*** Define Routes ***/
const routes =
{
	'/home':
	{
		title: "Home",
		render: renderHome
	},
	'/template':
	{
		title: "How to Add My JS Files",
		render: renderTemplate
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
	}
};

/*** Router Function ***/
function router()
{
	let path = window.location.pathname || '/home';
		
	// Normalize path to avoid trailing slashes causing issues
	if (path.endsWith('/'))
		path = path.slice(0, -1);

	const route = routes[path];

	console.log('Current path:', path);
	console.log('Route:', route);

	if (route)
	{
		document.title = route.title;
		document.getElementById('app').innerHTML = route.render();
	}
	else
	{
		document.title = "Page not Found";
		document.getElementById('app').innerHTML = renderError404();
	}
}

/*** Navigation Function ***/
function navigateTo(path)
{
	history.pushState(null, "", path);
	router();
}

/*** Enabling Client-side Routing ***/
document.addEventListener("DOMContentLoaded", () =>
{
	document.body.addEventListener("click", (e) =>
	{
		// Ensure the link is of type <a>
		if (e.target.matches("a[data-link]"))
		{
			e.preventDefault();
			const href = e.target.getAttribute('href');
			navigateTo(href);
		}
	});

	window.addEventListener("popstate", router);

	router();
});
