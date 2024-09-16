/*
TODO:
- Fake reviews - carrousel

<!-- Carousel at the bottom of the page -->
<div id="reviewCarousel" class="carousel slide" data-bs-ride="carousel">
	<div class="carousel-inner">
		<div class="carousel-item active">
			<figure class="text-end">
				<!---
				<img src="../../../assets/images/home/1.jpeg" class"d-block w-100 img-fluid">
				---->
				<blockquote class="blockquote">
					<p>"This website changed my life!"</p>
				</blockquote>
				<figcaption class="blockquote-footer">
					Agent Tango - <cite title="Source Title">Actor at Tardif Productions</cite>
				</figcaption>
			</figure>
		</div>
		<!-- Add more carousel items as needed -->
	</div>
	<a class="carousel-control-prev" href="#reviewCarousel" role="button" data-bs-slide="prev">
		<span class="carousel-control-prev-icon" aria-hidden="true"></span>
		<span class="visually-hidden">Previous</span>
	</a>
	<a class="carousel-control-next" href="#reviewCarousel" role="button" data-bs-slide="next">
		<span class="carousel-control-next-icon" aria-hidden="true"></span>
		<span class="visually-hidden">Next</span>
	</a>
</div>

*/

/***********************************************\
-			IMPORTING GLOBAL VARIABLES			-
\***********************************************/
import { DEBUG } from '../../main.js';

/***********************************************\
-				MODAL DATA						-
\***********************************************/

/*					WEB							*/
const	Web =
[
{
	id: '1',
	title: 'Use a Framework as backend',
	collapsed: true,
	badgeClass: 'text-bg-danger',
	badgeText: 'MAJOR',
	content: (() => {
		const	row = document.createElement('div');
		row.className = 'row';
	
		const	colText = document.createElement('div');
		colText.className = 'col-md-8';
		colText.innerHTML = `
		<p>We used our best friend <a href="https://www.djangoproject.com/start/overview/" target="_blank">Django</a> as framework.</p>
		`;
	
		const	colImage = document.createElement('div');
		colImage.className = 'col-md-4';
		const	img = document.createElement('img');
		img.src = '../../../assets/images/home/modules/web/django_logo.png';
		img.alt = 'Django Logo';
		img.className = 'img-fluid rounded float-end';
		colImage.appendChild(img);
	
		row.appendChild(colText);
		row.appendChild(colImage);
	
		return row.outerHTML;
		})
},
{
	id: '2',
	title: 'Use a front-end framework or toolkit',
	collapsed: true,
	badgeClass: 'text-bg-warning',
	badgeText: 'MINOR',
	content: (() => {
		const	row = document.createElement('div');
		row.className = 'row';
	
		const	colText = document.createElement('div');
		colText.className = 'col-md-8';
		colText.innerHTML = `
		<p>We used the most useless front-end framework, I'm of course talking about <a href="https://getbootstrap.com/" target="_blank">Bootstrap</a>.</p>
		`;
	
		const	colImage = document.createElement('div');
		colImage.className = 'col-md-4';
		const	img = document.createElement('img');
		img.src = '../../../assets/images/home/modules/web/bootstrap_logo.svg';
		img.alt = 'Bootstrap Logo';
		img.className = 'img-fluid rounded float-end';
		colImage.appendChild(img);
	
		row.appendChild(colText);
		row.appendChild(colImage);
	
		return row.outerHTML;
		})
},
{
	id: '3',
	title: 'Use a database for the backend',
	collapsed: true,
	badgeClass: 'text-bg-warning',
	badgeText: 'MINOR',
	content: (() => {
		const	row = document.createElement('div');
		row.className = 'row';
	
		const	colText = document.createElement('div');
		colText.className = 'col-md-8';
		colText.innerHTML = `
		<p>We used <a href="https://www.postgresql.org/" target="_blank">PostgreSQL</a> as a designated database.</p>
		`;
	
		const	colImage = document.createElement('div');
		colImage.className = 'col-md-4';
		const	img = document.createElement('img');
		img.src = '../../../assets/images/home/modules/web/postgreSQL_logo.png';
		img.alt = 'PostgreSQL Logo';
		img.className = 'img-fluid rounded float-end';
		colImage.appendChild(img);
	
		row.appendChild(colText);
		row.appendChild(colImage);
	
		return row.outerHTML;
		})
}
];

/*				USER MANAGEMENT					*/
const	UserManagement =
[
{
	id: '1',
	title: 'Standard user management, authentication, users across tournaments',
	collapsed: true,
	badgeClass: 'text-bg-danger',
	badgeText: 'MAJOR',
	content: (() => {
		const	row = document.createElement('div');
		row.className = 'row';
	
		const	colText = document.createElement('div');
		colText.className = 'col-md-8';
		colText.innerHTML = `
		<p>Users can blabla shutup nerd <a href="https://www.djangoproject.com/start/overview/" target="_blank">Django</a> as framework.</p>
		`;
	
		const	colImage = document.createElement('div');
		colImage.className = 'col-md-4';
		const	img = document.createElement('img');
		img.src = '../../../assets/images/home/modules/web/django_logo.png';
		img.alt = 'Tournament Logo';
		img.className = 'img-fluid rounded float-end';
		colImage.appendChild(img);
	
		row.appendChild(colText);
		row.appendChild(colImage);
	
		return row.outerHTML;
		})
}
];

/*			GAMEPLAY & USER EXPERIENCE			*/
const	GameplayUserExperience = [
{
	id: '1',
	title: 'Game Customization Options',
	collapsed: true,
	badgeClass: 'text-bg-warning',
	badgeText: 'MINOR',
	content: (() => {
		const	row = document.createElement('div');
		row.className = 'row';
	
		const	colText = document.createElement('div');
		colText.className = 'col-md-8';
		colText.innerHTML = `
		<p>We customised our game. You can now play our game on Steam, Epic Games and Skyblog, give us 125.</p>
		`;
	
		const	colImage = document.createElement('div');
		colImage.className = 'col-md-4';
		const	img = document.createElement('img');
		img.src = '../../../assets/images/home/modules/web/django_logo.png';
		img.alt = 'Game Customization Logo';
		img.className = 'img-fluid rounded float-end';
		colImage.appendChild(img);
	
		row.appendChild(colText);
		row.appendChild(colImage);
	
		return row.outerHTML;
		})
}
];

/*					AI-ALGO						*/
const	AiAlgo =
[
{
	id: '1',
	title: 'Introduce an AI Opponent',
	collapsed: true,
	badgeClass: 'text-bg-danger',
	badgeText: 'MAJOR',
	content: (() => {
		const	row = document.createElement('div');
		row.className = 'row';
	
		const	colText = document.createElement('div');
		colText.className = 'col-md-8';
		colText.innerHTML = `
		<p>Try to beat our AI you puny noob!</p>
		`;
	
		const	colImage = document.createElement('div');
		colImage.className = 'col-md-4';
		const	img = document.createElement('img');
		img.src = '../../../assets/images/home/modules/ai-algo/AI_logo.gif';
		img.alt = 'AI Logo';
		img.className = 'img-fluid rounded float-end';
		colImage.appendChild(img);
	
		row.appendChild(colText);
		row.appendChild(colImage);
	
		return row.outerHTML;
		})
},
{
	id: '2',
	title: 'User and Game Stats Dashboards',
	collapsed: true,
	badgeClass: 'text-bg-warning',
	badgeText: 'MINOR',
	content: (() => {
		const	row = document.createElement('div');
		row.className = 'row';
	
		const	colText = document.createElement('div');
		colText.className = 'col-md-8';
		colText.innerHTML = `
		<p>Blablablablibloubla</p>
		`;
	
		const	colImage = document.createElement('div');
		colImage.className = 'col-md-4';
		const	img = document.createElement('img');
		img.src = '../../../assets/images/home/modules/ai-algo/AI_logo.gif';
		img.alt = 'AI Logo';
		img.className = 'img-fluid rounded float-end';
		colImage.appendChild(img);
	
		row.appendChild(colText);
		row.appendChild(colImage);
	
		return row.outerHTML;
		})
}
];

/*				CYBERSECURITY					*/
const	Cybersecurity =
[
{
	id: '1',
	title: '2FA - Two-factor authentication',
	collapsed: true,
	badgeClass: 'text-bg-danger',
	badgeText: 'MAJOR',
	content: (() => {
		const	row = document.createElement('div');
		row.className = 'row';
	
		const	colText = document.createElement('div');
		colText.className = 'col-md-8';
		colText.innerHTML = `
		<p>We used our best friend <a href="https://www.djangoproject.com/start/overview/" target="_blank">Django</a> as framework.</p>
		`;
	
		const	colImage = document.createElement('div');
		colImage.className = 'col-md-4';
		const	img = document.createElement('img');
		img.src = '../../../assets/images/home/modules/django_logo.png';
		img.alt = 'Django Logo';
		img.className = 'img-fluid rounded float-end';
		colImage.appendChild(img);
	
		row.appendChild(colText);
		row.appendChild(colImage);
	
		return row.outerHTML;
		})
}
];

/*					DEVOPS						*/
const	DevOps =
[
{
	id: '1',
	title: 'Monitoring System',
	collapsed: true,
	badgeClass: 'text-bg-warning',
	badgeText: 'MINOR',
	content: (() => {
		const	row = document.createElement('div');
		row.className = 'row';
	
		const	colText = document.createElement('div');
		colText.className = 'col-md-8';
		colText.innerHTML = `
		<p>We used our best friend <a href="https://www.djangoproject.com/start/overview/" target="_blank">Django</a> as framework.</p>
		`;
	
		const	colImage = document.createElement('div');
		colImage.className = 'col-md-4';
		const	img = document.createElement('img');
		img.src = '../../../assets/images/home/modules/django_logo.png';
		img.alt = 'Django Logo';
		img.className = 'img-fluid rounded float-end';
		colImage.appendChild(img);
	
		row.appendChild(colText);
		row.appendChild(colImage);
	
		return row.outerHTML;
		})
},
{
	id: '2',
	title: 'Designing the Backend as Microservices',
	collapsed: true,
	badgeClass: 'text-bg-danger',
	badgeText: 'MAJOR',
	content: (() => {
		const	row = document.createElement('div');
		row.className = 'row';
	
		const	colText = document.createElement('div');
		colText.className = 'col-md-8';
		colText.innerHTML = `
		<p>We used our best friend <a href="https://www.djangoproject.com/start/overview/" target="_blank">Django</a> as framework.</p>
		`;
	
		const	colImage = document.createElement('div');
		colImage.className = 'col-md-4';
		const	img = document.createElement('img');
		img.src = '../../../assets/images/home/modules/django_logo.png';
		img.alt = 'Django Logo';
		img.className = 'img-fluid rounded float-end';
		colImage.appendChild(img);
	
		row.appendChild(colText);
		row.appendChild(colImage);
	
		return row.outerHTML;
		})
}
];

/*				ACCESSIBILITY					*/
const	Accessibility =
[
{
	id: '1',
	title: 'Multiple language supports',
	collapsed: true,
	badgeClass: 'text-bg-warning',
	badgeText: 'MINOR',
	content: (() => {
		const	row = document.createElement('div');
		row.className = 'row';
	
		const	colText = document.createElement('div');
		colText.className = 'col-md-8';
		colText.innerHTML = `
		<p>We plan to support over 120 languages !</p>
		`;
	
		const	colImage = document.createElement('div');
		colImage.className = 'col-md-4';
		const	img = document.createElement('img');
		img.src = '../../../assets/images/home/modules/django_logo.png';
		img.alt = 'Django Logo';
		img.className = 'img-fluid rounded float-end';
		colImage.appendChild(img);
	
		row.appendChild(colText);
		row.appendChild(colImage);
	
		return row.outerHTML;
		})
}
];

/***********************************************\
-				RENDERING						-
\***********************************************/
/* NO PARTICLE */
// export default function renderHome()
// {
// 	const	container = document.createElement('div');
// 	container.id = 'home-content';
// 	container.className = 'd-flex justify-content-center align-items-center vh-100';

// 	const	row = document.createElement('div');
// 	row.className = 'd-flex flex-column align-items-center';

// 	const	whatIsPongCard = createWhatIsPongCard();
// 	if (DEBUG)
// 		console.log('What is Pong Card:', whatIsPongCard);

// 	const	theTeam = createtheTeam();
// 	if (DEBUG)
// 		console.log('The Team:', theTeam);

// 	const	{ button, modal } = createWhatWeDidModal();
// 	if (DEBUG)
// 		console.log('What We Did Button:', button);

// 	row.appendChild(whatIsPongCard);
// 	row.appendChild(theTeam);
// 	row.appendChild(button);
// 	container.appendChild(row);

// 	if (!document.getElementById('staticBackdrop')) {
// 		document.body.appendChild(modal);
// 	}

// 	return container;
// }


/***********************************************\
-					PARTICLES					-
\***********************************************/
class Particle
{
	constructor(x, y, size, speedX, speedY, color)
	{
		this.x = x;
		this.y = y;
		this.size = size;
		this.speedX = speedX * 0.5; // SPEED MOVEMENT
		this.speedY = speedY * 0.5;
		this.color = color;
	}

	// Draw particle as a square
	draw(ctx)
	{
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, this.size, this.size);
	}

	// Update particle position
	update(ctx, mouse)
	{
		const	dx = this.x - mouse.x;
		const	dy = this.y - mouse.y;
		const	distance = Math.sqrt(dx * dx + dy * dy);
		const	forceDirectionX = dx / distance;
		const	forceDirectionY = dy / distance;
		const	maxDistance = mouse.radius;
		const	force = (maxDistance - distance) / maxDistance;

		// Apply repulsion force
		if (distance < mouse.radius)
		{
			this.x += forceDirectionX * force * 5; // REPULSE EFFECT
			this.y += forceDirectionY * force * 5;
		}

		this.x += this.speedX;
		this.y += this.speedY;

		// Bounce off walls
		if (this.x + this.size > ctx.canvas.width || this.x < 0)
		{
			this.speedX = -this.speedX;
		}
		if (this.y + this.size > ctx.canvas.height || this.y < 0)
		{
			this.speedY = -this.speedY;
		}
		this.draw(ctx);
	}
}

// Function to get random green color
function getRandomGreen()
{
	const	green = Math.floor(Math.random() * 256); // 0-255
	return `rgb(0, ${green}, 0)`;
}

function initParticles()
{
	const	canvas = document.createElement('canvas');
	const	ctx = canvas.getContext('2d');
	const	particlesArray = [];
	const	mouse = { x: null, y: null, radius: 150 }; // RADIUS

	// Set canvas to full window size
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	document.getElementById('particles-js').appendChild(canvas);

	// Create particles
	for (let i = 0; i < 8000; i++) // PARTICLES NUMBER
	{
		const	size = Math.random() * 10 + 1;
		const	x = Math.random() * (canvas.width - size * 2) + size;
		const	y = Math.random() * (canvas.height - size * 2) + size;
		const	speedX = (Math.random() * 6 - 3) * 0.5;
		const	speedY = (Math.random() * 6 - 3) * 0.5; 
		const	color = getRandomGreen();
		particlesArray.push(new Particle(x, y, size, speedX, speedY, color));
	}

	// Animate particles
	function animateParticles()
	{
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		particlesArray.forEach(particle => particle.update(ctx, mouse));
		requestAnimationFrame(animateParticles);
	}

	// Event listeners for mouse movement
	function setupMouseListeners()
	{
		canvas.addEventListener('mousemove', (e) => {
			mouse.x = e.x;
			mouse.y = e.y;
		});

		canvas.addEventListener('mouseleave', () => {
			mouse.x = null;
			mouse.y = null;
		});
	}

	animateParticles();
	setupMouseListeners();
}

/***********************************************\
-					RENDERING					-
\***********************************************/
export default function renderHome()
{
	const	container = createHomeContainer();
	const	particlesContainer = createParticlesContainer();
	const	row = createContentRow();

	document.body.appendChild(particlesContainer);
	document.getElementById('app').appendChild(container);

	if (!document.getElementById('staticBackdrop'))
	{
		document.body.appendChild(createWhatWeDidModal().modal);
	}

	initParticles();
	return container;
}

/***********************************************\
-				CREATING DOM ELEMENTS			-
\***********************************************/
function createHomeContainer()
{
	const	container = document.createElement('div');
	container.id = 'home-content';
	container.className = 'd-flex justify-content-center align-items-center vh-100 position-relative';
	container.appendChild(createContentRow());
	return container;
}

function createParticlesContainer()
{
	const	particlesContainer = document.createElement('div');
	particlesContainer.id = 'particles-js';
	particlesContainer.style.position = 'absolute';
	particlesContainer.style.width = '100%';
	particlesContainer.style.height = '100%';
	particlesContainer.style.zIndex = '0'; // ZINDEX HERE
	return particlesContainer;
}

function createContentRow()
{
	const	row = document.createElement('div');
	row.className = 'd-flex flex-column align-items-center position-relative';
	row.appendChild(createWhatIsPongCard());
	row.appendChild(createtheTeam());
	row.appendChild(createWhatWeDidModal().button);
	return row;
}

function createWhatIsPongCard()
{
	if (DEBUG)
		console.log('Creating What Is Pong Card');

	// Create the main column and card structure
	const	col = createElementWithClass('div', 'mb-auto');
	const	card = createElementWithClass('div', 'card');

	// Card Header
	const	cardHeader = createElementWithClass('div', 'card-header d-flex justify-content-center');
	cardHeader.id = 'headingOne';
		
	const	button = createButton(
	{
		className: 'btn btn-home',
		type: 'button',
		text: 'What is Pong?',
		dataToggle: 'collapse',
		dataTarget: '#multiCollapseExample1',
		ariaExpanded: 'true',
		ariaControls: 'multiCollapseExample1'
	});

	cardHeader.appendChild(button);
	card.appendChild(cardHeader);

	// Collapse Section
	const	collapse = createElementWithClass('div', 'collapse');
	collapse.id = 'multiCollapseExample1';
	collapse.setAttribute('aria-labelledby', 'headingOne');

	// Card Body with a row for GIF and text
	const	cardBody = createElementWithClass('div', 'card-body rounded-3');
	const	row = createElementWithClass('div', 'row');

	// GIF Column
	const	gifCol = createElementWithClass('div', 'col-md-6 d-flex justify-content-center align-items-center');
	const	gifElement = createImage('../../../assets/images/home/what_is_pong.gif', 'Pong GIF', 'img-fluid');
	gifCol.appendChild(gifElement);

	// Text Column
	const	textCol = createElementWithClass('div', 'col-md-6 d-flex flex-column justify-content-center align-items-center');
		
	const	textElement = createTextElement(`
		Pong is a classic arcade video game released in 1972 by Atari.<br>
		It's one of the earliest and simplest video games, designed to simulate table tennis (ping-pong).<br><br><br>
		In Pong, two players control paddles on either side of the screen, moving them up and down to hit a ball back and forth.<br>
		The goal is to score points by making the ball pass the opponent's paddle.<br><br><br>
		The game's simplicity, with basic two-dimensional graphics and straightforward controls, made it a foundational title in video game history, helping to popularize video gaming worldwide.
	`);

	const	moreInfoLink = createButton(
	{
		className: 'btn btn-second mt-auto py-auto',
		text: 'More Info',
		href: 'https://en.wikipedia.org/wiki/Pong',
		fontSize: '12px',
		padding: '4px 8px',
		target: '_blank'
	});

	textCol.appendChild(textElement);
	textCol.appendChild(moreInfoLink);

	// Append columns to the row, and row to the card body
	row.appendChild(gifCol);
	row.appendChild(textCol);
	cardBody.appendChild(row);

	collapse.appendChild(cardBody);
	card.appendChild(collapse);
	col.appendChild(card);

	return col;
}

function createtheTeam()
{
	if (DEBUG)
		console.log('Creating The Team Card');

	const	col = createElementWithClass('div', 'mb-auto');
	const	card = createElementWithClass('div', 'card');
	const	cardHeader = createElementWithClass('div', 'card-header');
	cardHeader.id = 'headingTwo';

	const	button = createButton(
	{
		className: 'btn btn-home',
		type: 'button',
		text: 'The Team',
		dataToggle: 'collapse',
		dataTarget: '#multiCollapseExample2',
		ariaExpanded: 'false',
		ariaControls: 'multiCollapseExample2'
	});

	const	collapse = createElementWithClass('div', 'collapse');
	collapse.id = 'multiCollapseExample2';
	collapse.setAttribute('aria-labelledby', 'headingTwo');

	const	cardBody = createElementWithClass('div', 'card-body text-center rounded-3');
	const	textElement = createTextElement('Wesh la team ici');

	cardBody.appendChild(textElement);
	collapse.appendChild(cardBody);
	cardHeader.appendChild(button);
	card.appendChild(cardHeader);
	card.appendChild(collapse);
	col.appendChild(card);

	return col;
}

function createAccordionItem(accordionId, title, badgeType, badgeText, modules)
{
	const	accordionItem = createElementWithClass('div', 'accordion-item');
	const	accordionHeader = createElementWithClass('h2', 'accordion-header d-flex justify-content-between align-items-center');
	accordionHeader.id = `${accordionId}Accordion`;

	const	button = createButton(
	{
		className: 'accordion-button',
		type: 'button',
		text: title,
		dataToggle: 'collapse',
		dataTarget: `#outerCollapse${accordionId}`,
		ariaExpanded: 'true',
		ariaControls: `outerCollapse${accordionId}`
	});

	const	collapse = createElementWithClass('div', 'accordion-collapse collapse');
	collapse.id = `outerCollapse${accordionId}`;
	collapse.setAttribute('aria-labelledby', `${accordionId}Accordion`);

	const	accordionBody = createElementWithClass('div', 'accordion-body');
	const	nestedAccordion = createElementWithClass('div', 'accordion');
	nestedAccordion.id = `${accordionId}Nested`;

	// Loop through each module
	modules.forEach(module => {
		const	moduleItem = createElementWithClass('div', 'accordion-item');
		const	moduleHeader = createElementWithClass('h2', 'accordion-header');
		moduleHeader.id = `${accordionId}-${module.id}`;

		const	moduleButton = createButton(
		{
			className: `accordion-button ${module.collapsed ? 'collapsed' : ''} d-flex justify-content-start align-items-center`,
			type: 'button',
			text: module.title,
			dataToggle: 'collapse',
			dataTarget: `#nested-${accordionId}-${module.id}`,
			ariaExpanded: module.collapsed ? 'false' : 'true',
			ariaControls: `nested-${accordionId}-${module.id}`
		});

		const	badge = createElementWithClass('span', `badge ${module.badgeClass} badge-right me-3`);
		badge.textContent = module.badgeText;
		moduleButton.appendChild(badge);

		const	moduleCollapse = createElementWithClass('div', `accordion-collapse collapse ${module.collapsed ? '' : 'show'}`);
		moduleCollapse.id = `nested-${accordionId}-${module.id}`;
		moduleCollapse.setAttribute('aria-labelledby', `${accordionId}-${module.id}`);

		const	moduleBody = createElementWithClass('div', 'accordion-body');
		moduleBody.innerHTML = typeof module.content === 'function' ? module.content() : module.content;

		moduleCollapse.appendChild(moduleBody);
		moduleItem.appendChild(moduleHeader);
		moduleItem.appendChild(moduleButton);
		moduleItem.appendChild(moduleCollapse);

		nestedAccordion.appendChild(moduleItem);
	});

	accordionBody.appendChild(nestedAccordion);
	collapse.appendChild(accordionBody);
	accordionHeader.appendChild(button);
	accordionItem.appendChild(accordionHeader);
	accordionItem.appendChild(collapse);

	return accordionItem;
}

function createWhatWeDidModal()
{
	const	container = createElementWithClass('div', 'd-flex justify-content-center');
	const	button = createButton(
	{
		className: 'btn btn-home d-flex justify-content-center',
		type: 'button',
		text: 'What we Did',
		dataToggle: 'modal',
		dataTarget: '#staticBackdrop'
	});

	container.appendChild(button);

	const	modal = createElementWithClass('div', 'modal fade');
	modal.id = 'staticBackdrop';
	modal.setAttribute('data-bs-backdrop', 'static');
	modal.setAttribute('data-bs-keyboard', 'false');
	modal.setAttribute('tabindex', '-1');
	modal.setAttribute('aria-labelledby', 'staticBackdropLabel');
	modal.setAttribute('aria-hidden', 'true');

	const	modalDialog = createElementWithClass('div', 'modal-dialog modal-xl');
	modal.appendChild(modalDialog);

	const	modalContent = createElementWithClass('div', 'modal-content');
	modalDialog.appendChild(modalContent);

	const	modalHeader = createElementWithClass('div', 'modal-header');
	const	modalTitle = createTextElement('What we did');
	modalTitle.className = 'modal-title';
	modalTitle.id = 'staticBackdropLabel';
	modalHeader.appendChild(modalTitle);
	modalContent.appendChild(modalHeader);

	const	modalBody = createElementWithClass('div', 'modal-body');
	modalContent.appendChild(modalBody);

	const	mainAccordion = createElementWithClass('div', 'accordion accordion-flush');
	mainAccordion.id = 'MainAccordion';
	modalBody.appendChild(mainAccordion);

	// Add accordion items to the main accordion
	mainAccordion.appendChild(createAccordionItem('Web', 'Web', 'text-bg-danger', 'MAJOR', Web));
	mainAccordion.appendChild(createAccordionItem('User', 'User Management', 'text-bg-danger', 'MAJOR', UserManagement));
	mainAccordion.appendChild(createAccordionItem('Gameplay', 'Gameplay and User Experience', 'text-bg-danger', 'MAJOR', GameplayUserExperience));
	mainAccordion.appendChild(createAccordionItem('AI', 'AI-Algo', 'text-bg-danger', 'MAJOR', AiAlgo));
	mainAccordion.appendChild(createAccordionItem('Cyber', 'Cybersecurity', 'text-bg-danger', 'MAJOR', Cybersecurity));
	mainAccordion.appendChild(createAccordionItem('DevOps', 'DevOps', 'text-bg-danger', 'MAJOR', DevOps));
	mainAccordion.appendChild(createAccordionItem('Access', 'Accessibility', 'text-bg-danger', 'MAJOR', Accessibility));

	// Create modal footer
	const	modalFooter = createElementWithClass('div', 'modal-footer');
	const	closeButton = createButton(
	{
		className: 'btn btn-secondary',
		type: 'button',
		text: 'Close',
		dataDismiss: 'modal'
	});

	modalFooter.appendChild(closeButton);
	modalContent.appendChild(modalFooter);

	return { button: container, modal };
}

/***********************************************\
-				HELPER FUNCTIONS				-
\***********************************************/

function createElementWithClass(tag, className)
{
	const	element = document.createElement(tag);
	element.className = className;
	return element;
}

function createButton({ className, type, text, dataToggle, dataTarget, ariaExpanded, ariaControls, dataDismiss, href, fontSize, padding, target })
{
	const	button = document.createElement(href ? 'a' : 'button');
	button.className = className;
	button.textContent = text;

	if (href)
	{
		button.href = href;
		button.target = target || '';
		button.style.fontSize = fontSize || '';
		button.style.padding = padding || '';
	}
	else
	{
		button.type = type || 'button';
		button.setAttribute('data-bs-toggle', dataToggle || '');
		button.setAttribute('data-bs-target', dataTarget || '');
		button.setAttribute('aria-expanded', ariaExpanded || 'false');
		button.setAttribute('aria-controls', ariaControls || '');
		if (dataDismiss)
		{
			button.setAttribute('data-bs-dismiss', dataDismiss);
		}
	}

	return button;
}

function createImage(src, alt, className)
{
	const	img = document.createElement('img');
	img.src = src;
	img.alt = alt;
	img.className = className;
	return img;
}

function createTextElement(html)
{
	const	p = document.createElement('p');
	p.innerHTML = html;
	return p;
}
