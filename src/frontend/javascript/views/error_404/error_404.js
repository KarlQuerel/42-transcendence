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
	notFoundContainer.appendChild(heading);

	// Function to create a GIF with a specific ID
	function createGif(id)
	{
		const img = document.createElement('img');
		img.src = '../../../assets/images/pagenotfound/pagenotfound.gif';
		img.alt = '404 Not Found';
		img.className = 'img-fluid';
		img.id = id;
		return img;
	}

	// Create and append GIFs with specific IDs
	const gif1 = createGif('gif-not-found-1');
	const gif2 = createGif('gif-not-found-2');
	const gif3 = createGif('gif-not-found-3');
	const gif4 = createGif('gif-not-found-4');
	const gif5 = createGif('gif-not-found-5');

	// Append each GIF to the container
	notFoundContainer.appendChild(gif1);
	notFoundContainer.appendChild(gif2);
	notFoundContainer.appendChild(gif3);
	notFoundContainer.appendChild(gif4);

	// Return the complete not found container
	return notFoundContainer;
}
