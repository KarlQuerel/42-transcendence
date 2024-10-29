/***********************************************\
-			IMPORTING GLOBAL VARIABLES			-
\***********************************************/
import { DEBUG }
from '../../main.js';

export function renderPageNotFound()
{
	// Create container for the Not Found page
	const notFoundContainer = document.createElement('div');
	notFoundContainer.className = 'not-found-container';

	// Create the heading
	const heading = document.createElement('h2');
	heading.className = 'page-not-found-title';
	heading.textContent = 'You seem to have lost your way';

	// Create the image element
	const img = document.createElement('img');
	img.src = '../../../assets/images/pagenotfound/pagenotfound.gif'
	img.alt = '404 Not Found';
	img.className = 'img-fluid';

	// Append all elements to the container
	notFoundContainer.appendChild(heading);
	notFoundContainer.appendChild(img);

	// Return the complete not found container
	return notFoundContainer;
}

// KARL TODO HERE en rajouter plein de differentes tailles