
/***			Importing Scripts			***/
import renderHome from "./views/home/home.js";
import renderTemplate from "./views/template/template.js";

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
	}
};

/***			Router Function				***/
function router()
{
	const path = window.location.hash.slice(1) || '/home';
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

