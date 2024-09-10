/*
TODO:
- Fake reviews - carrousel

- On pong : maybe loading bar

---	WEB
- (MAJOR) Use a Framework as backend
- (MINOR) Use a front-end framework or toolkit
- (MINOR) User a database for the backend

---	USER MANAGEMENT
- (MAJOR) Standard user management, authentication, users across tournaments

---	GAMEPLAY AND USER EXPERIENCE
- (MINOR) Game Customization Options

---	AI-ALGO
- (MAJOR) Introduce an AI Opponent
- (MINOR) User and Game Stats Dashboards

---	CYBERSECURITY
- (MAJOR) 2FA

---	DEVOPS
- (MINOR) Monitoring System
- (MAJOR) Designing the Backend as Microservices

---	ACCESSIBILITY
- (MINOR) Multiple language supports
*/

/*
<button class="btn " type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
	Profile
</button>

<!--	USER PROFILE OFFCANVAS	-->
<div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
	<div class="offcanvas-header">
		<h5 class="offcanvas-title" id="offcanvasExampleLabel">
			Your Profile
		</h5>
		<button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
	</div>
	<div class="offcanvas-body">
		<div>
			Maybe a profile page here ? Or options ?
		</div>
		<div class="dropdown mt-3">
		<button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
			Click me
		</button>
		<ul class="dropdown-menu">
			<li><a class="dropdown-item" href="/pong">Pong</a></li>
			<li><a class="dropdown-item" href="#">Another action</a></li>
			<li><a class="dropdown-item" href="#">Something else here</a></li>
		</ul>
		</div>
	</div>
</div>

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
-				RENDERING						-
\***********************************************/
export default function renderHome()
{
	const	container = document.createElement('div');
	container.id = 'home-content';
	container.className = 'mt-auto';

	const	row = document.createElement('div');
	row.className = 'row';

	const	whatIsPongCard = createWhatIsPongCard();
	console.log('What is Pong Card:', whatIsPongCard);

	const	whyPongCard = createWhyPongCard();
	console.log('Why pong Card:', whyPongCard);

	row.appendChild(whatIsPongCard);
	row.appendChild(whyPongCard);
	container.appendChild(row);

	const	{ button, modal } = createWhatWeDidModal();
	container.appendChild(button);

	if (!document.getElementById('staticBackdrop')) {
		document.body.appendChild(modal);
	}

	return container;
}

function createWhatIsPongCard()
{
	console.log('Creating What Is Pong Card');

	const	col = document.createElement('div');
	col.className = 'col';

	const	card = document.createElement('div');
	card.className = 'card';

	const	cardHeader = document.createElement('div');
	cardHeader.className = 'card-header d-flex justify-content-center';
	cardHeader.id = 'headingOne';

	const	button = document.createElement('button');
	button.className = 'btn btn-home';
	button.type = 'button';
	button.setAttribute('data-bs-toggle', 'collapse');
	button.setAttribute('data-bs-target', '#multiCollapseExample1');
	button.setAttribute('aria-expanded', 'true');
	button.setAttribute('aria-controls', 'multiCollapseExample1');
	button.textContent = 'What is Pong?';

	cardHeader.appendChild(button);
	card.appendChild(cardHeader);

	const	collapse = document.createElement('div');
	collapse.className = 'collapse';
	collapse.id = 'multiCollapseExample1';
	collapse.setAttribute('aria-labelledby', 'headingOne');

	const	cardBody = document.createElement('div');
	cardBody.className = 'card-body text-center rounded-3';

	const	gifElement = document.createElement('img');
	gifElement.src = '../../../assets/images/home/what_is_pong.gif';
	gifElement.alt = 'Pong GIF';
	gifElement.className = 'img-fluid my-auto py-auto';

	const	textElement = document.createElement('p');
	textElement.innerHTML = `
		Released in 1972, Pong is one of the earliest video games ever created, 
		and it's a simple 2D sports game that simulates table tennis (ping-pong).<br><br>
		In the game, two players control paddles on opposite sides of the screen, 
		and they use these paddles to hit a ball back and forth.<br><br>
		The goal is to score points by making the ball pass your opponent's paddle.
	`;

	const	moreInfoLink = document.createElement('a');
	moreInfoLink.href = 'https://en.wikipedia.org/wiki/Pong';
	moreInfoLink.className = 'btn btn-second mt-auto py-auto';
	moreInfoLink.textContent = 'More Info';
	moreInfoLink.target = '_blank';
	moreInfoLink.style.fontSize = '12px';
	moreInfoLink.style.padding = '4px 8px';

	cardBody.appendChild(gifElement);
	cardBody.appendChild(textElement);
	cardBody.appendChild(moreInfoLink);

	collapse.appendChild(cardBody);
	card.appendChild(collapse);
	col.appendChild(card);

	return col;
}

function createWhyPongCard()
{
	console.log('Creating Why Pong Card');

	const	col = document.createElement('div');
	col.className = 'col';

	const	card = document.createElement('div');
	card.className = 'card';

	const	cardHeader = document.createElement('div');
	cardHeader.className = 'card-header';
	cardHeader.id = 'headingTwo';

	const	button = document.createElement('button');
	button.className = 'btn btn-home';
	button.type = 'button';
	button.setAttribute('data-bs-toggle', 'collapse');
	button.setAttribute('data-bs-target', '#multiCollapseExample2');
	button.setAttribute('aria-expanded', 'false');
	button.setAttribute('aria-controls', 'multiCollapseExample2');
	button.textContent = 'Aidez moi a trouver qlq chose ici';

	cardHeader.appendChild(button);
	card.appendChild(cardHeader);

	const	collapse = document.createElement('div');
	collapse.className = 'collapse';
	collapse.id = 'multiCollapseExample2';
	collapse.setAttribute('aria-labelledby', 'headingTwo');

	const	cardBody = document.createElement('div');
	cardBody.className = 'card-body text-center rounded-3';

	const	textElement = document.createElement('p');
	textElement.textContent = 'I have no fucking ideeaaaaassssssssssssss';

	cardBody.appendChild(textElement);
	collapse.appendChild(cardBody);
	card.appendChild(collapse);
	col.appendChild(card);

	return col;
}

function createAccordionItem(accordionId, title, badgeType, badgeText, modules)
{
	const	accordionItem = document.createElement('div');
	accordionItem.className = 'accordion-item';

	const	accordionHeader = document.createElement('h2');
	accordionHeader.className = 'accordion-header d-flex justify-content-between align-items-center';
	accordionHeader.id = `${accordionId}Accordion`;
	accordionItem.appendChild(accordionHeader);

	const	button = document.createElement('button');
	button.className = 'accordion-button';
	button.type = 'button';
	button.setAttribute('data-bs-toggle', 'collapse');
	button.setAttribute('data-bs-target', `#outerCollapse${accordionId}`);
	button.setAttribute('aria-expanded', 'true');
	button.setAttribute('aria-controls', `outerCollapse${accordionId}`);
	button.textContent = title;
	accordionHeader.appendChild(button);

	const	collapse = document.createElement('div');
	collapse.id = `outerCollapse${accordionId}`;
	collapse.className = 'accordion-collapse collapse';
	collapse.setAttribute('aria-labelledby', `${accordionId}Accordion`);
	accordionItem.appendChild(collapse);

	const	accordionBody = document.createElement('div');
	accordionBody.className = 'accordion-body';
	collapse.appendChild(accordionBody);

	const	nestedAccordion = document.createElement('div');
	nestedAccordion.className = 'accordion';
	nestedAccordion.id = `${accordionId}Nested`;
	accordionBody.appendChild(nestedAccordion);

	modules.forEach(module => {
		const	moduleItem = document.createElement('div');
		moduleItem.className = 'accordion-item';

		const	moduleHeader = document.createElement('h2');
		moduleHeader.className = 'accordion-header';
		moduleHeader.id = `${accordionId}-${module.id}`;
		moduleItem.appendChild(moduleHeader);

		const	moduleButton = document.createElement('button');
		moduleButton.className = `accordion-button ${module.collapsed ? 'collapsed' : ''} d-flex justify-content-start align-items-center`;
		moduleButton.type = 'button';
		moduleButton.setAttribute('data-bs-toggle', 'collapse');
		moduleButton.setAttribute('data-bs-target', `#nested-${accordionId}-${module.id}`);
		moduleButton.setAttribute('aria-expanded', module.collapsed ? 'false' : 'true');
		moduleButton.setAttribute('aria-controls', `nested-${accordionId}-${module.id}`);
		moduleButton.textContent = module.title;
		moduleHeader.appendChild(moduleButton);

		const	badge = document.createElement('span');
		badge.className = `badge ${module.badgeClass} badge-right me-3`;
		badge.textContent = module.badgeText;
		moduleButton.appendChild(badge);

		const	moduleCollapse = document.createElement('div');
		moduleCollapse.id = `nested-${accordionId}-${module.id}`;
		moduleCollapse.className = `accordion-collapse collapse ${module.collapsed ? '' : 'show'}`;
		moduleCollapse.setAttribute('aria-labelledby', `${accordionId}-${module.id}`);
		moduleItem.appendChild(moduleCollapse);

		const	moduleBody = document.createElement('div');
		moduleBody.className = 'accordion-body';
		moduleBody.innerHTML = typeof module.content === 'function' ? module.content() : module.content;
		moduleCollapse.appendChild(moduleBody);

		nestedAccordion.appendChild(moduleItem);
	});

	return accordionItem;
}

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
		const row = document.createElement('div');
		row.className = 'row';
	
		const colText = document.createElement('div');
		colText.className = 'col-md-8';
		colText.innerHTML = `
		<p>We used our best friend <a href="https://www.djangoproject.com/start/overview/" target="_blank">Django</a> as framework.</p>
		`;
	
		const colImage = document.createElement('div');
		colImage.className = 'col-md-4';
		const img = document.createElement('img');
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
		const row = document.createElement('div');
		row.className = 'row';
	
		const colText = document.createElement('div');
		colText.className = 'col-md-8';
		colText.innerHTML = `
		<p>We used the most useless front-end framework, I'm of course talking about <a href="https://getbootstrap.com/" target="_blank">Bootstrap</a>.</p>
		`;
	
		const colImage = document.createElement('div');
		colImage.className = 'col-md-4';
		const img = document.createElement('img');
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
		const row = document.createElement('div');
		row.className = 'row';
	
		const colText = document.createElement('div');
		colText.className = 'col-md-8';
		colText.innerHTML = `
		<p>We used <a href="https://www.postgresql.org/" target="_blank">PostgreSQL</a> as a designated database.</p>
		`;
	
		const colImage = document.createElement('div');
		colImage.className = 'col-md-4';
		const img = document.createElement('img');
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
		const row = document.createElement('div');
		row.className = 'row';
	
		const colText = document.createElement('div');
		colText.className = 'col-md-8';
		colText.innerHTML = `
		<p>Users can blabla shutup nerd <a href="https://www.djangoproject.com/start/overview/" target="_blank">Django</a> as framework.</p>
		`;
	
		const colImage = document.createElement('div');
		colImage.className = 'col-md-4';
		const img = document.createElement('img');
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
		const row = document.createElement('div');
		row.className = 'row';
	
		const colText = document.createElement('div');
		colText.className = 'col-md-8';
		colText.innerHTML = `
		<p>We customised our game. You can now play our game on Steam, Epic Games and Skyblog, give us 125.</p>
		`;
	
		const colImage = document.createElement('div');
		colImage.className = 'col-md-4';
		const img = document.createElement('img');
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
		const row = document.createElement('div');
		row.className = 'row';
	
		const colText = document.createElement('div');
		colText.className = 'col-md-8';
		colText.innerHTML = `
		<p>Try to beat our AI you puny noob!</p>
		`;
	
		const colImage = document.createElement('div');
		colImage.className = 'col-md-4';
		const img = document.createElement('img');
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
		const row = document.createElement('div');
		row.className = 'row';
	
		const colText = document.createElement('div');
		colText.className = 'col-md-8';
		colText.innerHTML = `
		<p>Blablablablibloubla</p>
		`;
	
		const colImage = document.createElement('div');
		colImage.className = 'col-md-4';
		const img = document.createElement('img');
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
		const row = document.createElement('div');
		row.className = 'row';
	
		const colText = document.createElement('div');
		colText.className = 'col-md-8';
		colText.innerHTML = `
		<p>We used our best friend <a href="https://www.djangoproject.com/start/overview/" target="_blank">Django</a> as framework.</p>
		`;
	
		const colImage = document.createElement('div');
		colImage.className = 'col-md-4';
		const img = document.createElement('img');
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
		const row = document.createElement('div');
		row.className = 'row';
	
		const colText = document.createElement('div');
		colText.className = 'col-md-8';
		colText.innerHTML = `
		<p>We used our best friend <a href="https://www.djangoproject.com/start/overview/" target="_blank">Django</a> as framework.</p>
		`;
	
		const colImage = document.createElement('div');
		colImage.className = 'col-md-4';
		const img = document.createElement('img');
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
		const row = document.createElement('div');
		row.className = 'row';
	
		const colText = document.createElement('div');
		colText.className = 'col-md-8';
		colText.innerHTML = `
		<p>We used our best friend <a href="https://www.djangoproject.com/start/overview/" target="_blank">Django</a> as framework.</p>
		`;
	
		const colImage = document.createElement('div');
		colImage.className = 'col-md-4';
		const img = document.createElement('img');
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
		const row = document.createElement('div');
		row.className = 'row';
	
		const colText = document.createElement('div');
		colText.className = 'col-md-8';
		colText.innerHTML = `
		<p>We plan to support over 120 languages !</p>
		`;
	
		const colImage = document.createElement('div');
		colImage.className = 'col-md-4';
		const img = document.createElement('img');
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





function createWhatWeDidModal()
{
	const	container = document.createElement('div');
	container.className = 'd-flex justify-content-center';
		
	const	button = document.createElement('button');
	button.type = 'button';
	button.className = 'btn btn-home d-flex justify-content-center';
	button.setAttribute('data-bs-toggle', 'modal');
	button.setAttribute('data-bs-target', '#staticBackdrop');
	button.textContent = 'What we Did';

	container.appendChild(button);

	const	modal = document.createElement('div');
	modal.className = 'modal fade';
	modal.id = 'staticBackdrop';
	modal.setAttribute('data-bs-backdrop', 'static');
	modal.setAttribute('data-bs-keyboard', 'false');
	modal.setAttribute('tabindex', '-1');
	modal.setAttribute('aria-labelledby', 'staticBackdropLabel');
	modal.setAttribute('aria-hidden', 'true');

	const	modalDialog = document.createElement('div');
	modalDialog.className = 'modal-dialog modal-xl';
	modal.appendChild(modalDialog);

	const	modalContent = document.createElement('div');
	modalContent.className = 'modal-content';
	modalDialog.appendChild(modalContent);

	const	modalHeader = document.createElement('div');
	modalHeader.className = 'modal-header';
	modalContent.appendChild(modalHeader);

	const	modalTitle = document.createElement('h5');
	modalTitle.className = 'modal-title';
	modalTitle.id = 'staticBackdropLabel';
	modalTitle.textContent = 'What we did';
	modalHeader.appendChild(modalTitle);

	const	modalBody = document.createElement('div');
	modalBody.className = 'modal-body';
	modalContent.appendChild(modalBody);

	const	mainAccordion = document.createElement('div');
	mainAccordion.className = 'accordion accordion-flush';
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
	const	modalFooter = document.createElement('div');
	modalFooter.className = 'modal-footer';
	modalContent.appendChild(modalFooter);

	const	closeButton = document.createElement('button');
	closeButton.type = 'button';
	closeButton.className = 'btn btn-secondary';
	closeButton.setAttribute('data-bs-dismiss', 'modal');
	closeButton.textContent = 'Close';
	modalFooter.appendChild(closeButton);

	return { button: container, modal };
}