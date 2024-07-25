
/***			Importing Scripts			***/
import home from "./views/home.js";
import test from "./views/test.js";

/***			Define Routes				***/
const	routes =
{

	'/home' :
	{
		title: "Home",
		render: home
	},
	'/test' :
	{
		title: "Test",
		render: test
	}

};

/***			Router Function				***/
// function router()
// {
// 	const path = window.location.hash.slice(1) || '/home';

// 	//debug karl
// 	console.log('Current path:', path);

// 	const route = routes[path];
	
// 	//debug karl
// 	console.log('Route object:', route);

// 	if (route)
// 	{
// 		document.title = route.title;
// 		route.render();
// 	}
// 	else
// 		// Handle 404 Not Found
// 		document.getElementById('app').innerHTML = '<h1>404 Not Found</h1>';
// }

// Assuming pageTitle and app are defined elsewhere
const pageTitle = "Our Amazing Transcendence"; // Example pageTitle definition
const app = document.getElementById('app'); // Example app definition

async function router() {
	console.log('Router started'); // 1. Start of the function
	let hash = window.location.hash.slice(1) || '/home';
	console.log(`Current hash: ${hash}`); // Additional detail on hash
	let path = hash.split('?')[0];
	console.log(`Resolved path: ${path}`); // Log the resolved path
	let view = routes[path];
  
	if (view) {
	  console.log(`Rendering view for path: ${path}`, view); // 2. Before rendering
	  document.title = `${pageTitle} | ${view.title}`;
	  let result = await view.render();
	  app.innerHTML = '';
  
	  if (typeof result === 'string') {
		app.innerHTML = result;
	  } else if (result instanceof Node) {
		app.appendChild(result);
	  } else {
		let textNode = document.createTextNode(String(result));
		app.appendChild(textNode);
	  }
	  console.log(`Rendering completed for path: ${path}`); // 3. After rendering
	} else {
	  console.log(`Path not found: ${path}`); // 4. In the else block
	  document.title = `${pageTitle} | Not Found`;
	  app.innerHTML = '<h1>404 Not Found</h1>';
	  history.replaceState("", "", "/404");
	}
  }

// Move event listener setup outside of the router function
window.addEventListener("click", (e) => {
  if (e.target.matches("[data-link]")) {
    e.preventDefault();
    history.pushState("", "", e.target.href);
    router();
  }
});


/***			Initializing Router			***/
window.addEventListener("popstate", router);
window.addEventListener("DOMContentLoaded", router);