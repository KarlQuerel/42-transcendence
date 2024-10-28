/***********************************************\
-					IMPORTS						-
\***********************************************/
import { DEBUG, getSignedInState }
from '../../main.js';

function createNavbar()
{
	// Create the navbar container
	const	nav = document.createElement('nav');
	nav.className = 'navbar navbar-expand-lg navbar-dark bg-dark fixed-top py-2';

	const	container = document.createElement('div');
	container.className = 'container d-flex align-items-center';

	// Create the burger button
	const	burgerButton = document.createElement('button');
	burgerButton.className = 'navbar-toggler collapsed';
	burgerButton.type = 'button';
	burgerButton.setAttribute('data-bs-toggle', 'collapse');
	burgerButton.setAttribute('data-bs-target', '#navbarNav');
	burgerButton.setAttribute('aria-controls', 'navbarNav');
	burgerButton.setAttribute('aria-expanded', 'false');
	burgerButton.setAttribute('aria-label', 'Toggle navigation');

	const	burgerIcon = document.createElement('span');
	burgerIcon.className = 'navbar-toggler-icon';
	burgerButton.appendChild(burgerIcon);

	// Create the collapse div
	const	collapseDiv = document.createElement('div');
	collapseDiv.className = 'collapse navbar-collapse justify-content-center';
	collapseDiv.id = 'navbarNav';

	const	navList = document.createElement('ul');
	navList.className = 'navbar-nav d-flex flex-row justify-content-center w-100';

	// Array of nav items
	const	navItems =
	[
		{ href: '/home', imgSrc: 'assets/images/navbar/home_button.gif', text: 'Home' },
		{ href: '/pong', imgSrc: 'assets/images/navbar/pong_button.gif', text: 'Pong' },
	];

	// Add Profile links only if the user is signed in
	if (getSignedInState() === true)
	{
		navItems.push
		(
			{ href: '/profile', imgSrc: 'assets/images/navbar/profile_button.gif', text: 'My Profile' }
		);
	}
	else
	{
		navItems.push
		(
			{ href: '/sign-in', imgSrc: 'assets/images/navbar/login_button.gif', text: 'Log in or Sign Up' }
		);
	}

	// Create the nav items
	navItems.forEach(item =>
	{
		const	li = document.createElement('li');
		li.className = 'nav-item';

		const	a = document.createElement('a');
		a.href = item.href;
		a.setAttribute('data-link', '');
		a.className = 'nav-link';

		const	btnDiv = document.createElement('div');
		btnDiv.className = 'btn btn-nav';

		const	btnFlipSide = document.createElement('div');
		btnFlipSide.className = 'btn-flip-side btn-flip-side--green';

		const	span1 = document.createElement('span');
		const	gifFrame = document.createElement('div');
		gifFrame.className = 'navbar-gif-frame d-flex justify-content-center align-items-center';

		const	img = document.createElement('img');
		img.src = item.imgSrc;
		img.alt = item.text;
		img.className = 'img-fluid navbar-image';

		gifFrame.appendChild(img);
		span1.appendChild(gifFrame);

		const	span2 = document.createElement('span');
		span2.textContent = item.text;

		btnFlipSide.appendChild(span1);
		btnFlipSide.appendChild(span2);
		btnDiv.appendChild(btnFlipSide);
		a.appendChild(btnDiv);
		li.appendChild(a);
		navList.appendChild(li);
	});

	// Append the elements together
	collapseDiv.appendChild(navList);
	container.appendChild(burgerButton);
	container.appendChild(collapseDiv);
	nav.appendChild(container);

	// Return the complete navbar element
	return nav;
}

export function renderNavbar()
{
	const	existingNavbar = document.querySelector('.navbar');
	if (existingNavbar)
	{
		existingNavbar.remove();
	}

	const	navbar = createNavbar();
	document.body.insertAdjacentElement('afterbegin', navbar);
}

// document.addEventListener("DOMContentLoaded", renderNavbar);
