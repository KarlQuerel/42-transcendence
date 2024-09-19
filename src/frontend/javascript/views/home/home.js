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
-				MODULES DATA					-
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
		if (mouse.x !== null && mouse.y !== null)
		{
			const	dx = this.x - mouse.x;
			const	dy = this.y - mouse.y;
			const	distance = Math.sqrt(dx * dx + dy * dy);
			const	maxDistance = mouse.radius;
			
			if (distance < maxDistance)
			{
				const	force = (maxDistance - distance) / maxDistance;
				const	forceX = (dx / distance) * force * 5; // Apply force
				const	forceY = (dy / distance) * force * 5;

				// Apply repulsion force
				this.x += forceX;
				this.y += forceY;
			}
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

function getRandomGreen()
{
	const	green = Math.floor(Math.random() * 256); // 0-255
	return `rgb(0, ${green}, 0)`;
}

function setupMouseListeners(canvas, mouse)
{
	canvas.addEventListener('mousemove', (e) =>
	{
		const	rect = canvas.getBoundingClientRect();
		mouse.x = e.clientX - rect.left;
		mouse.y = e.clientY - rect.top;
		if (DEBUG)
			console.log(`Mouse moved: x=${mouse.x}, y=${mouse.y}`);
	});

	canvas.addEventListener('mouseleave', () =>
	{
		mouse.x = null;
		mouse.y = null;
		if (DEBUG)
			console.log('Mouse left canvas');
	});
}

function initParticles()
{
	let	canvas = document.getElementById('particles-canvas');
	if (!canvas)
	{
		canvas = document.createElement('canvas');
		canvas.id = 'particles-canvas';
		const	ctx = canvas.getContext('2d');
		const	particlesArray = [];
		const	mouse = { x: null, y: null, radius: 150 }; // RADIUS
		if (DEBUG)
			console.log('Mouse radius:', mouse.radius);
		

		// Set canvas to full window size
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		canvas.style.position = 'fixed'; // Ensure canvas is fixed to cover the viewport
		canvas.style.top = '0';
		canvas.style.left = '0';
		canvas.style.width = '100%';
		canvas.style.height = '100%';
		canvas.style.zIndex = '0'; // Ensure canvas is behind other elements
		document.body.appendChild(canvas);

		// Ensure listeners are set up after canvas is added
		setupMouseListeners(canvas, mouse);

		// Create particles
		for (let i = 0; i < 8000; i++) // NUMBER HERE
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

		animateParticles();

		// Resize canvas when window is resized
		window.addEventListener('resize', () =>
		{
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		});

	}
	else
	{
		if (DEBUG)
			console.log('Canvas already exists');
	}
}

/***********************************************\
-					RENDERING					-
\***********************************************/
export default function renderHome()
{
	const	container = createHomeContainer();
	createParticlesContainer();
	const	row = createContentRow();

	document.getElementById('app').appendChild(container);

	initParticles();
	return container;
}

/***********************************************\
-				CREATING DOM ELEMENTS			-
\***********************************************/

/*					CONTAINERs					*/
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
	let	particlesContainer = document.getElementById('particles-js');
	if (!particlesContainer)
	{
		particlesContainer = document.createElement('div');
		particlesContainer.id = 'particles-js';
		particlesContainer.style.position = 'fixed';
		particlesContainer.style.width = '100%';
		particlesContainer.style.height = '100%';
		particlesContainer.style.top = '0';
		particlesContainer.style.left = '0';
		particlesContainer.style.zIndex = '-1';
		document.body.appendChild(particlesContainer);
	}
	return particlesContainer;
}


function createContentRow()
{
	const	row = document.createElement('div');
	row.className = 'd-flex flex-column align-items-center position-relative';
	row.appendChild(createWhatIsPongCard());
	row.appendChild(createTheTeamCard());
	row.appendChild(createWhatWeDidCard());
	return row;
}

/*					BUTTONS						*/
function createWhatIsPongButton()
{
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
	return button;
}

function createTheTeamButton()
{
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
	return button;
}

function createWhatWeDidButton()
{
	const	button = createButton(
	{
		className: 'btn btn-home',
		type: 'button',
		text: 'What We Did',
		dataToggle: 'collapse',
		dataTarget: '#whatWeDidCard',
		ariaExpanded: 'false',
		ariaControls: 'whatWeDidCard'
	});
	return button;
}

/*					CARDS						*/
function createWhatIsPongCard()
{
	if (DEBUG)
		console.log('Creating What is Pong Card');

	const	col = createElementWithClass('div', 'mb-auto');
	const	card = createElementWithClass('div', 'card');
	const	cardHeader = createElementWithClass('div', 'card-header d-flex justify-content-center');
	cardHeader.id = 'headingWhatisPong';
		
	const	button = createWhatIsPongButton();

	cardHeader.appendChild(button);
	card.appendChild(cardHeader);

	const	collapse = createElementWithClass('div', 'collapse');
	collapse.id = 'multiCollapseExample1';
	collapse.setAttribute('aria-labelledby', 'headingWhatisPong');

	const	cardBody = createElementWithClass('div', 'card-body rounded-3 card-pong');
	const	row = createElementWithClass('div', 'row');

	const	gifCol = createElementWithClass('div', 'col-md-6 d-flex justify-content-center align-items-center');
	const	gifElement = createImage('../../../assets/images/home/what_is_pong.gif', 'Pong GIF', 'img-fluid');
	gifCol.appendChild(gifElement);

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

	row.appendChild(gifCol);
	row.appendChild(textCol);
	cardBody.appendChild(row);

	collapse.appendChild(cardBody);
	card.appendChild(collapse);
	col.appendChild(card);

	return col;
}

//TODO: upload photos
function createTheTeamCard()
{
	if (DEBUG)
		console.log('Creating The Team Card');

	const	col = createElementWithClass('div', 'mb-auto');
	const	card = createElementWithClass('div', 'card');
	const	cardHeader = createElementWithClass('div', 'card-header');
	cardHeader.id = 'headingtheTeam';

	const	button = createTheTeamButton();
	cardHeader.appendChild(button);

	const	collapse = createElementWithClass('div', 'collapse');
	collapse.id = 'multiCollapseExample2';
	collapse.setAttribute('aria-labelledby', 'headingtheTeam');

	const	cardBody = createElementWithClass('div', 'card-body rounded-3 text-center');

	const	row = createElementWithClass('div', 'row');

	const	frames = [
		{
			title: 'Carolina<br>Somarriba<br>',
			imgSrc: '../../../assets/images/home/1.jpeg',
			linkedIn: 'https://www.linkedin.com/in/carolina-somarriba-2303a812a/',
			github: 'https://github.com/casomarr'
		},
		{
			title: 'Jessica<br>Rouillon<br>',
			imgSrc: '../../../assets/images/home/2.jpeg',
			linkedIn: 'https://www.linkedin.com/in/jessica-rouillon-37a22053/',
			github: 'https://github.com/Lechonita'
		},
		{
			title: 'Clément<br>Bernazeau<br>',
			imgSrc: '../../../assets/images/home/1.jpeg',
			linkedIn: 'https://www.linkedin.com/in/cl%C3%A9ment-bernazeau-9a89a4182/',
			github: 'https://github.com/ClementBrz'
		},
		{
			title: 'Karl<br>Querel<br>',
			imgSrc: '../../../assets/images/home/2.jpeg',
			linkedIn: 'https://www.linkedin.com/in/karlquerel/',
			github: 'https://github.com/KarlQuerel'
		}
	];

	frames.forEach(frame => {
		const	frameCol = createElementWithClass('div', 'col-md-3 mb-0');
		const	frameCard = createElementWithClass('div', 'card h-100 clickable-frame');

		const	img = createImage(frame.imgSrc, frame.title, 'card-img');
		frameCard.appendChild(img);

		const	cardBody = createElementWithClass('div', 'card-body text-center');
		const	title = createElementWithClass('h5', 'frame-title');
		title.innerHTML = frame.title;

		const	btnContainer = createElementWithClass('div', 'd-flex justify-content-center align-items-center');
		btnContainer.style.gap = '10px';

		const	linkedInBtn = document.createElement('a');
		linkedInBtn.href = frame.linkedIn;
		linkedInBtn.className = 'btn btn-icon';
		linkedInBtn.target = '_blank';


		const	linkedInIconDefault = document.createElement('img');
		linkedInIconDefault.src = '../../../assets/images/home/the_team/icons/linkedin_default.svg'; // Path to your default LinkedIn SVG file
		linkedInIconDefault.alt = 'LinkedIn Logo';
		linkedInIconDefault.className = 'linkedin-icon linkedin-icon-default'; // Add class for styling

		// Create SVG element for LinkedIn logo (hover state)
		const	linkedInIconHover = document.createElement('img');
		linkedInIconHover.src = '../../../assets/images/home/the_team/icons/linkedin_hover.svg'; // Path to your hover LinkedIn SVG file
		linkedInIconHover.alt = 'LinkedIn Hover Logo';
		linkedInIconHover.className = 'linkedin-icon linkedin-icon-hover';

		// Append icons to the LinkedIn button
		linkedInBtn.appendChild(linkedInIconDefault);
		linkedInBtn.appendChild(linkedInIconHover);

		// GitHub button with SVG images
		const	githubBtn = document.createElement('a');
		githubBtn.href = frame.github;
		githubBtn.className = 'btn btn-icon'; // Use the btn-icon class
		githubBtn.target = '_blank'; // Open in a new tab

		// Create SVG element for GitHub logo (default state)
		const	githubIconDefault = document.createElement('img');
		githubIconDefault.src = '../../../assets/images/home/the_team/icons/github_default.svg'; // Path to your default GitHub SVG file
		githubIconDefault.alt = 'GitHub Logo';
		githubIconDefault.className = 'github-icon github-icon-default'; // Add class for styling

		// Create SVG element for GitHub logo (hover state)
		const	githubIconHover = document.createElement('img');
		githubIconHover.src = '../../../assets/images/home/the_team/icons/github_hover.svg'; // Path to your hover GitHub SVG file
		githubIconHover.alt = 'GitHub Hover Logo';
		githubIconHover.className = 'github-icon github-icon-hover';

		// Append icons to the GitHub button
		githubBtn.appendChild(githubIconDefault);
		githubBtn.appendChild(githubIconHover);

		// Append buttons to the button container
		btnContainer.appendChild(linkedInBtn);
		btnContainer.appendChild(githubBtn);

		// Append title and button container to the card body
		cardBody.appendChild(title);
		cardBody.appendChild(btnContainer);

		frameCard.appendChild(cardBody);
		frameCol.appendChild(frameCard);
		row.appendChild(frameCol);
	});

	// Append the row to the card body
	cardBody.appendChild(row);
	collapse.appendChild(cardBody);
	card.appendChild(cardHeader);
	card.appendChild(collapse);
	col.appendChild(card);

	return col;
}



//TODO : finish it
function createWhatWeDidCard()
{
	const	col = createElementWithClass('div', 'mb-auto');
	const	card = createElementWithClass('div', 'card');

	// Card Header
	const	cardHeader = createElementWithClass('div', 'card-header');
	cardHeader.id = 'headingWhatWeDid';

	// Appending Button to Card Header
	const	button = createWhatWeDidButton();
	cardHeader.appendChild(button);

	// Collapse Section
	const	collapse = createElementWithClass('div', 'collapse');
	collapse.id = 'whatWeDidCard'; // This ID is targeted by the button
	collapse.setAttribute('aria-labelledby', 'headingWhatWeDid');

	// Card Body
	const	cardBody = createElementWithClass('div', 'card-body rounded-3 text-center');

	// Create Tab Container
	const	tabContainer = createElementWithClass('ul', 'nav nav-tabs');
	tabContainer.id = 'whatWeDidTab';
	tabContainer.setAttribute('role', 'tablist');

	// Create Tab Content Container
	const	tabContentContainer = createElementWithClass('div', 'tab-content');
	tabContentContainer.id = 'whatWeDidTabContent';

	// Define Sections with proper data
	const	sections =
	[
		{ id: 'Web', title: 'Web', badgeType: 'warning', badgeText: 'MAJOR', modules: Web },
		{ id: 'UserManagement', title: 'User Management', badgeType: '', badgeText: '', modules: UserManagement },
		{ id: 'GameplayUserExperience', title: 'Gameplay & User Experience', badgeType: '', badgeText: '', modules: GameplayUserExperience },
		{ id: 'AiAlgo', title: 'AI & Algo', badgeType: '', badgeText: '', modules: AiAlgo },
		{ id: 'Cybersecurity', title: 'Cybersecurity', badgeType: '', badgeText: '', modules: Cybersecurity },
		{ id: 'DevOps', title: 'DevOps', badgeType: '', badgeText: '', modules: DevOps },
		{ id: 'Accessibility', title: 'Accessibility', badgeType: '', badgeText: '', modules: Accessibility }
	];

	// Create Tabs and Tab Content
	sections.forEach((section, index) =>
	{
		// Tab Item
		const	tabItem = createElementWithClass('li', 'nav-item');
		const	tabLink = createElementWithClass('a', 'nav-link');
		tabLink.id = `${section.id}-tab`;
		tabLink.setAttribute('data-bs-toggle', 'tab');
		tabLink.href = `#${section.id}`;
		tabLink.role = 'tab';
		tabLink.ariaControls = section.id;
		tabLink.ariaSelected = index === 0 ? 'true' : 'false';
		if (index === 0)
		{
			tabLink.classList.add('active'); // Make first tab active
		}
		tabLink.innerText = section.title;
		tabItem.appendChild(tabLink);
		tabContainer.appendChild(tabItem);

		// Tab Pane (Content for each section)
		const	tabPane = createElementWithClass('div', 'tab-pane fade');
		tabPane.id = section.id;
		tabPane.role = 'tabpanel';
		tabPane.ariaLabelledBy = `${section.id}-tab`;
		if (index === 0)
		{
			tabPane.classList.add('show', 'active'); // Make first tab content visible
		}

		// Populate tab pane with module information and expandable sections
		const	modulesList = createElementWithClass('ul', 'list-group');
		section.modules.forEach((module, moduleIndex) =>
		{
			const	moduleItem = createElementWithClass('li', 'list-group-item');
			moduleItem.innerText = module.title; // Assuming each module has a title

			// Create expandable content
			const	expandableContent = createElementWithClass('div', 'collapse');
			expandableContent.id = `collapse${section.id}${moduleIndex}`;
			expandableContent.innerHTML = `
				<p>${module.content}</p> <!-- Assuming each module has content -->
				<!-- Add more details here as needed -->
			`;

			const	expandButton = createButton({
				className: 'btn btn-primary mt-2',
				type: 'button',
				text: 'More Details',
				dataToggle: 'collapse',
				dataTarget: `#collapse${section.id}${moduleIndex}`
			});

			moduleItem.appendChild(expandButton);
			moduleItem.appendChild(expandableContent);
			modulesList.appendChild(moduleItem);
		});
		tabPane.appendChild(modulesList);
		tabContentContainer.appendChild(tabPane);
	});

	// Append tab navigation and content to the card body
	cardBody.appendChild(tabContainer);
	cardBody.appendChild(tabContentContainer);

	// Append card body and collapse to the card
	collapse.appendChild(cardBody);
	card.appendChild(cardHeader);
	card.appendChild(collapse);
	col.appendChild(card);

	return col;
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
