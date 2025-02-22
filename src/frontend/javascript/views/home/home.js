/***********************************************\
-					IMPORTS						-
\***********************************************/
import { DEBUG } from '../../main.js';

/***********************************************\
-				IMPORTING SCRIPTS				-
\***********************************************/
import { initParticles, destroyParticles, createParticlesContainer }
from '../../components/particles/particles.js';

import { createWhatIsPongCard, createTheTeamCard }
from './cards.js'

import { createElementWithClass, createImage, createTextElement,
createCardHeader, createButton }
from './utils.js'

/***********************************************\
-					RENDERING					-
\***********************************************/
export function renderHome()
{
	const	container = createHomeContainer();
	createParticlesContainer();
	createContentRow();

	document.getElementById('app').appendChild(container);
	document.body.classList.add('no-scroll');

	if (window.location.pathname !== '/pong')
		initParticles();
	return container;
}

function createHomeContainer()
{
	const	container = document.createElement('div');
	container.id = 'home-content';
	container.className = 'container d-flex justify-content-center align-items-center position-relative';
	container.appendChild(createContentRow());
	return container;
}

function createContentRow()
{
	const	row = document.createElement('div');
	row.className = 'd-flex flex-column align-items-center position-relative';
	row.appendChild(createWhatIsPongCard());
	row.appendChild(createTheTeamCard());
	return row;
}