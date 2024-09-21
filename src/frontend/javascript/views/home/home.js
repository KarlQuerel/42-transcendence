/*
TODO: Implement fake reviews carrousel
maybe on home page maybe on another webpage

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
-				IMPORTING SCRIPTS				-
\***********************************************/
import { initParticles, destroyParticles, createParticlesContainer }
from '../../components/particles/particles.js';

/***********************************************\
-				VARIABLES						-
\***********************************************/
let	buttonsHidden = false;
let	buttonsDisabled = false;

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
-					RENDERING					-
\***********************************************/
export default function renderHome()
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

/***********************************************\
-				CREATING DOM ELEMENTS			-
\***********************************************/

/*					CONTAINERs					*/
function createHomeContainer()
{
	const	container = document.createElement('div');
	container.id = 'home-content';
	container.className = 'd-flex justify-content-center align-items-center position-relative';
	container.appendChild(createContentRow());
	return container;
}

function createContentRow()
{
	const	row = document.createElement('div');
	row.className = 'd-flex flex-column align-items-center position-relative';
	row.appendChild(createWhatIsPongCard());
	row.appendChild(createTheTeamCard());
	row.appendChild(createWhatWeDidCard());
	row.appendChild(createTheyTrustedUsCard());
	return row;
}

/*					BUTTONS						*/
function createWhatIsPongButton()
{
	return createButtonWithListener('What is Pong?', '#multiCollapseExample1', 'true');
}

function createTheTeamButton()
{
	return createButtonWithListener('The Team', '#multiCollapseExample2', 'false');
}

function createWhatWeDidButton()
{
	return createButtonWithListener('What We Did', '#whatWeDidCard', 'false');
}

function createTheyTrustedUsButton()
{
	return createButtonWithListener('They Trusted Us', '#TheyTrustedUsCarousel', 'false');
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
	const	gifElement = createImage('../../../assets/images/home/what_is_pong/what_is_pong.gif', 'Pong GIF', 'img-fluid');
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
			imgSrc: '../../../assets/images/home/the_team/photos/caro_team.jpg',
			linkedIn: 'https://www.linkedin.com/in/carolina-somarriba-2303a812a/',
			github: 'https://github.com/casomarr'
		},
		{
			title: 'Jessica<br>Rouillon<br>',
			imgSrc: '../../../assets/images/home/they_trusted_us/karl_testimonial.jpeg', //here
			linkedIn: 'https://www.linkedin.com/in/jessica-rouillon-37a22053/',
			github: 'https://github.com/Lechonita'
		},
		{
			title: 'Clément<br>Bernazeau<br>',
			imgSrc: '../../../assets/images/home/they_trusted_us/karl_testimonial.jpeg', //here
			linkedIn: 'https://www.linkedin.com/in/cl%C3%A9ment-bernazeau-9a89a4182/',
			github: 'https://github.com/ClementBrz'
		},
		{
			title: 'Karl<br>Querel<br>',
			imgSrc: '../../../assets/images/home/they_trusted_us/karl_testimonial.jpeg', //here
			linkedIn: 'https://www.linkedin.com/in/karlquerel/',
			github: 'https://github.com/KarlQuerel'
		}
	];

	frames.forEach(frame =>
	{
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
		linkedInIconDefault.src = '../../../assets/images/home/the_team/icons/linkedin_default.svg';
		linkedInIconDefault.alt = 'LinkedIn Logo';
		linkedInIconDefault.className = 'linkedin-icon linkedin-icon-default';

		const	linkedInIconHover = document.createElement('img');
		linkedInIconHover.src = '../../../assets/images/home/the_team/icons/linkedin_hover.svg';
		linkedInIconHover.alt = 'LinkedIn Hover Logo';
		linkedInIconHover.className = 'linkedin-icon linkedin-icon-hover';
	
		linkedInBtn.appendChild(linkedInIconDefault);
		linkedInBtn.appendChild(linkedInIconHover);

		const	githubBtn = document.createElement('a');
		githubBtn.href = frame.github;
		githubBtn.className = 'btn btn-icon';
		githubBtn.target = '_blank';

		const	githubIconDefault = document.createElement('img');
		githubIconDefault.src = '../../../assets/images/home/the_team/icons/github_default.svg';
		githubIconDefault.alt = 'GitHub Logo';
		githubIconDefault.className = 'github-icon github-icon-default';

		const	githubIconHover = document.createElement('img');
		githubIconHover.src = '../../../assets/images/home/the_team/icons/github_hover.svg';
		githubIconHover.alt = 'GitHub Hover Logo';
		githubIconHover.className = 'github-icon github-icon-hover';

		githubBtn.appendChild(githubIconDefault);
		githubBtn.appendChild(githubIconHover);

		btnContainer.appendChild(linkedInBtn);
		btnContainer.appendChild(githubBtn);

		cardBody.appendChild(title);
		cardBody.appendChild(btnContainer);

		frameCard.appendChild(cardBody);
		frameCol.appendChild(frameCard);
		row.appendChild(frameCol);
	});

	cardBody.appendChild(row);
	collapse.appendChild(cardBody);
	card.appendChild(cardHeader);
	card.appendChild(collapse);
	col.appendChild(card);

	return col;
}

//TODO : finish it decide where to put it with the team
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

function createTheyTrustedUsCard() {
	const col = createElementWithClass('div', 'mb-auto');
	const card = createElementWithClass('div', 'card');

	// Card Header
	const cardHeader = createElementWithClass('div', 'card-header');
	const button = createTheyTrustedUsButton();
	cardHeader.appendChild(button);

	// Collapse Section
	const collapse = createElementWithClass('div', 'collapse');
	collapse.id = 'TheyTrustedUsCarousel';
	collapse.setAttribute('aria-labelledby', 'headingTrustedUs');

	// Carousel
	const carousel = createElementWithClass('div', 'carousel slide');
	carousel.setAttribute('data-bs-ride', 'carousel');

	// Carousel Inner
	const carouselInner = createElementWithClass('div', 'carousel-inner');
		
	// Example items for the carousel
	const items =
	[
		{ imgSrc: '../../../assets/images/home/they_trusted_us/caro_testimonial.jpg', alt: 'First Slide' },
		{ imgSrc: '../../assets/images/home/they_trusted_us/karl_testimonial.jpeg', alt: 'Second Slide' },
		{ imgSrc: 'path/to/image3.jpg', alt: 'Third Slide' }
	];

	items.forEach((item, index) => {
		const carouselItem = createElementWithClass('div', 'carousel-item');
		if (index === 0) carouselItem.classList.add('active'); // Make first item active

		const img = createImage(item.imgSrc, item.alt, 'd-block w-100');
		carouselItem.appendChild(img);
		carouselInner.appendChild(carouselItem);
	});

	carousel.appendChild(carouselInner);

	// Controls (optional)
	const prevButton = createElementWithClass('button', 'carousel-control-prev');
	prevButton.setAttribute('data-bs-target', '#TheyTrustedUsCarousel');
	prevButton.setAttribute('data-bs-slide', 'prev');
	prevButton.innerHTML = '<span class="carousel-control-prev-icon" aria-hidden="true"></span>';
		
	const nextButton = createElementWithClass('button', 'carousel-control-next');
	nextButton.setAttribute('data-bs-target', '#TheyTrustedUsCarousel');
	nextButton.setAttribute('data-bs-slide', 'next');
	nextButton.innerHTML = '<span class="carousel-control-next-icon" aria-hidden="true"></span>';

	carousel.appendChild(prevButton);
	carousel.appendChild(nextButton);
		
	// Append everything
	collapse.appendChild(carousel);
	card.appendChild(cardHeader);
	card.appendChild(collapse);
	col.appendChild(card);

	return col;
}


/*					CAROUSEL					*/
function createTheyTrustedUsCarousel()
{
	const	carouselDiv = createElementWithClass('div', 'carousel slide');
	carouselDiv.id = 'TheyTrustedUsCarousel';
	carouselDiv.setAttribute('data-bs-ride', 'carousel');

	const	carouselInner = createElementWithClass('div', 'carousel-inner');

	// Example slides (replace with your own images and content)
	const	slides = [
		{
			imgSrc: '../../../assets/images/home/trust1.jpg',
			alt: 'Trusted Company 1',
			isActive: true
		},
		{
			imgSrc: '../../../assets/images/home/trust2.jpg',
			alt: 'Trusted Company 2',
			isActive: false
		},
		{
			imgSrc: '../../../assets/images/home/trust3.jpg',
			alt: 'Trusted Company 3',
			isActive: false
		}
	];

	slides.forEach((slide) => {
		const	itemDiv = createElementWithClass('div', `carousel-item ${slide.isActive ? 'active' : ''}`);
		const	img = createImage(slide.imgSrc, slide.alt, 'd-block w-100');
		itemDiv.appendChild(img);
		carouselInner.appendChild(itemDiv);
	});

	carouselDiv.appendChild(carouselInner);

	// Add controls (optional)
	const	prevControl = createElementWithClass('button', 'carousel-control-prev');
	prevControl.setAttribute('type', 'button');
	prevControl.setAttribute('data-bs-target', '#TheyTrustedUsCarousel');
	prevControl.setAttribute('data-bs-slide', 'prev');
	prevControl.innerHTML = '<span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="visually-hidden">Previous</span>';

	const	nextControl = createElementWithClass('button', 'carousel-control-next');
	nextControl.setAttribute('type', 'button');
	nextControl.setAttribute('data-bs-target', '#TheyTrustedUsCarousel');
	nextControl.setAttribute('data-bs-slide', 'next');
	nextControl.innerHTML = '<span class="carousel-control-next-icon" aria-hidden="true"></span><span class="visually-hidden">Next</span>';

	carouselDiv.appendChild(prevControl);
	carouselDiv.appendChild(nextControl);

	return carouselDiv;
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

function createButtonWithListener(text, targetId, expanded)
{
	const	button = createButton(
	{
		className: 'btn btn-home',
		type: 'button',
		text: text,
		dataToggle: 'collapse',
		dataTarget: targetId,
		ariaExpanded: expanded,
		ariaControls: targetId
	});

	button.addEventListener('click', () =>
	{
		// moveButtonToCenter(button); // TODO FIX IT
		toggleButtons(text);
	});

	return button;
}

function toggleButtons(clickedButton)
{
	if (buttonsDisabled)
	{
		enableButtons();
		buttonsDisabled = false;
	}
	else
	{
		disableOtherButtons(clickedButton);
		buttonsDisabled = true;
	}
}

function disableOtherButtons(clickedButton)
{
	const	buttons = ['What is Pong?', 'The Team', 'What We Did'];

	buttons.forEach(buttonText =>
	{
		if (buttonText !== clickedButton)
		{
			const	buttonElement = Array.from(document.getElementsByClassName('btn btn-home')).find(btn => btn.textContent === buttonText);
			if (buttonElement)
			{
				buttonElement.disabled = true;
				buttonElement.style.display = 'none';
			}
		}
	});
}

function enableButtons()
{
	const	buttons = Array.from(document.getElementsByClassName('btn btn-home'));
	buttons.forEach(button =>
	{
		button.disabled = false;
		button.style.display = 'inline-block';
	});
}

// HERE CHECK IF NECESSARY
function moveButtonToCenter(button)
{
	button.classList.add('center-button');
}
