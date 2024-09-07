/***********************************************\
-				WORK-IN-PROGRESS				-
\***********************************************/

/*
TODO:
- Profile on the side - offcanvas
- What is Pong? - card
- Fake reviews - carrousel

- On pong : maybe loading bar
*/

/*
<button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
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

<!--	PONG EXPLANATION	-->
<p class="d-inline-flex gap-1">
		<a class="btn btn-primary button-link" data-bs-toggle="collapse" href="#whatispongcollapse" role="button" aria-expanded="false" aria-controls="whatispongcollapse">
			What is Pong?
		</a>
		<button class="btn btn-primary button-link" type="button" data-bs-toggle="collapse" data-bs-target="#whypongcollapse" aria-expanded="false" aria-controls="whypongcollapse">
			Why Pong?
		</button>
</p>
<div class="row">
	<div class="col">
		<div class="collapse multi-collapse" id="whatispongcollapse">
			<div class="card card-body">
				Pong is a nice game. You should try it.
			</div>
		</div>
	</div>
	<div class="col">
		<div class="collapse multi-collapse" id="whypongcollapse">
			<div class="card card-body">
				Because why not.
			</div>
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
// export default function renderHome()
//
// 	document.getElementById('app').innerHTML = `
		

// <!-------------------------------------
// ---	WEB
// - (MAJOR) Use a Framework as backend
// - (MINOR) Use a front-end framework or toolkit
// - (MINOR) User a database for the backend

// ---	USER MANAGEMENT
// - (MAJOR) Standard user management, authentication, users across tournaments

// ---	GAMEPLAY AND USER EXPERIENCE
// - (MINOR) Game Customization Options

// ---	AI-ALGO
// - (MAJOR) Introduce an AI Opponent
// - (MINOR) User and Game Stats Dashboards

// ---	CYBERSECURITY
// - (MAJOR) 2FA

// ---	DEVOPS
// - (MINOR) Monitoring System
// - (MAJOR) Designing the Backend as Microservices

// ---	ACCESSIBILITY
// - (MINOR) Multiple language supports
// -------------------------------------->

// 	<!--	BUTTON MODULES	-->
// 	<button type="button" class="btn btn-primary-link" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
// 		Les Modules de Dudule
// 	</button>

// 	<!--	MODAL MODULES	-->
// 	<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
// 	<div class="modal-dialog modal-xl">
// 	<div class="modal-content">
// 	<div class="modal-header">
// 		<h5 class="modal-title" id="staticBackdropLabel">
// 			What we did
// 		</h5>
// 	</div>
// 	<div class="modal-body">
// 	<div class="accordion accordion-flush" id="MainAccordion">

// 	<!--	WEB	-->
// 	<div class="accordion-item">
// 		<h2 class="accordion-header" id="WebAccordion">
// 			<button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#outerCollapseWeb" aria-expanded="true" aria-controls="outerCollapseWeb">
// 				Web
// 			</button>
// 		</h2>
// 	<div id="outerCollapseWeb" class="accordion-collapse collapse" aria-labelledby="WebAccordion">
// 	<div class="accordion-body">
// 	<div class="accordion" id="WebNested">
	
// 	<!-- #1 MODULE -->
// 	<div class="accordion-item">
// 		<h2 class="accordion-header" id="Web-1">
// 			<button class="accordion-button d-flex justify-content-start align-items-center" type="button" data-bs-toggle="collapse" data-bs-target="#nested-web-1" aria-expanded="true" aria-controls="nested-web-1">
// 				Use a Framework as backend
// 				<span class="badge rounded-pill text-bg-danger me-3">
// 					MAJOR
// 				</span>
// 			</button>
// 		</h2>
// 		<div id="nested-web-1" class="accordion-collapse collapse" aria-labelledby="Web-1">
// 		<div class="accordion-body">
// 			We used <a href="https://www.djangoproject.com/start/overview/" target="_blank">Djan-motherfucking useless and not even working bitchy ass-go</a> as framework.
// 		<img src="../../../assets/images/home/modules/django_logo.png" alt="Django Logo" class="img-fluid rounded float-end">
// 		</div>
// 		</div>
// 	</div>

// 	<!-- #2 MODULE -->
// 	<div class="accordion-item">
// 		<h2 class="accordion-header" id="Web-2">
// 			<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#nested-web-2" aria-expanded="false" aria-controls="nested-web-2">
// 				Use a front-end framework or toolkit
// 				<span class="badge text-bg-warning me-3">
// 					MINOR
// 				</span>
// 			</button>
// 		</h2>
// 		<div id="nested-web-2" class="accordion-collapse collapse" aria-labelledby="Web-2">
// 		<div class="accordion-body">
// 			We used <a href="https://getbootstrap.com/" target"_blank">Bootstrap</a> as frontend toolkit.
// 		</div>
// 		</div>
// 	</div>

// 	<!-- #3 MODULE -->
// 	<div class="accordion-item">
// 		<h2 class="accordion-header" id="Web-3">
// 			<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#nested-web-3" aria-expanded="false" aria-controls="nested-web-3">
// 				Use a database for the backend
// 				<span class="badge text-bg-warning me-3">
// 					MINOR
// 				</span>
// 			</button>
// 		</h2>
// 		<div id="nested-web-3" class="accordion-collapse collapse" aria-labelledby="Web-3">
// 		<div class="accordion-body">
// 			We used <a href="https://www.postgresql.org/" target"_blank">PostgreSQL>PostgreSQL</a> as a designated database.
// 		</div>
// 		</div>
// 	</div>
	
// 	</div>
// 	</div>
// 	</div>
// 	</div>

// 	<!--	USER MANAGEMENT	-->
// 	<div class="accordion-item">
// 		<h2 class="accordion-header" id="UserAccordion">
// 			<button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#outerCollapseUser" aria-expanded="true" aria-controls="outerCollapseUser">
// 				User Management
// 			</button>
// 		</h2>
// 	<div id="outerCollapseUser" class="accordion-collapse collapse" aria-labelledby="UserAccordion">
// 	<div class="accordion-body">
// 	<div class="accordion" id="UserNested">
	
// 	<!-- #1 MODULE -->
// 	<div class="accordion-item">
// 		<h2 class="accordion-header" id="User-1">
// 			<button class="accordion-button d-flex justify-content-start align-items-center" type="button" data-bs-toggle="collapse" data-bs-target="#nested-user-1" aria-expanded="true" aria-controls="nested-user-1">
// 				Standard user management, authentication, users across tournaments
// 				<span class="badge rounded-pill text-bg-danger me-3">
// 					MAJOR
// 				</span>
// 			</button>
// 		</h2>
// 		<div id="nested-user-1" class="accordion-collapse collapse" aria-labelledby="User-1">
// 		<div class="accordion-body">
// 				Users can blablabla lalala
// 		</div>
// 		</div>
// 	</div>
	
// 	</div>
// 	</div>
// 	</div>
// 	</div>

// 	<!--	GAMEPLAY AND USER EXPERIENCE	-->
// 	<div class="accordion-item">
// 		<h2 class="accordion-header" id="GameAccordion">
// 			<button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#outerCollapseGame" aria-expanded="true" aria-controls="outerCollapseGame">
// 				Gameplay and User Experience
// 			</button>
// 		</h2>
// 	<div id="outerCollapseGame" class="accordion-collapse collapse" aria-labelledby="GameAccordion">
// 	<div class="accordion-body">
// 	<div class="accordion" id="GameNested">
	
// 	<!-- #1 MODULE -->
// 	<div class="accordion-item">
// 		<h2 class="accordion-header" id="Game-1">
// 			<button class="accordion-button d-flex justify-content-start align-items-center" type="button" data-bs-toggle="collapse" data-bs-target="#nested-game-1" aria-expanded="true" aria-controls="nested-game-1">
// 				Game Customization Options
// 				<span class="badge text-bg-warning me-3">
// 					MINOR
// 				</span>
// 			</button>
// 		</h2>
// 		<div id="nested-game-1" class="accordion-collapse collapse" aria-labelledby="Game-1">
// 		<div class="accordion-body">
// 			We customised our game. You can now play our game on Steam, Epic Games and Skyblog.
// 		</div>
// 		</div>
// 	</div>
	
// 	</div>
// 	</div>
// 	</div>
// 	</div>

// 	<!--	AI-ALGO	-->
// 	<div class="accordion-item">
// 		<h2 class="accordion-header" id="AIAccordion">
// 			<button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#outerCollapseAI" aria-expanded="true" aria-controls="outerCollapseAI">
// 				AI-Algo
// 			</button>
// 		</h2>
// 	<div id="outerCollapseAI" class="accordion-collapse collapse" aria-labelledby="AIAccordion">
// 	<div class="accordion-body">
// 	<div class="accordion" id="AINested">
	
// 	<!-- #1 MODULE -->
// 	<div class="accordion-item">
// 		<h2 class="accordion-header" id="AI-1">
// 			<button class="accordion-button d-flex justify-content-start align-items-center" type="button" data-bs-toggle="collapse" data-bs-target="#nested-AI-1" aria-expanded="true" aria-controls="nested-AI-1">
// 				Introduce an AI Opponent
// 				<span class="badge rounded-pill text-bg-danger me-3">
// 					MAJOR
// 				</span>
// 			</button>
// 		</h2>
// 		<div id="nested-AI-1" class="accordion-collapse collapse" aria-labelledby="AI-1">
// 		<div class="accordion-body">
// 			Try to beat our AI!
// 		</div>
// 		</div>
// 	</div>

// 	<!-- #2 MODULE -->
// 	<div class="accordion-item">
// 		<h2 class="accordion-header" id="AI-2">
// 			<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#nested-AI-2" aria-expanded="false" aria-controls="nested-AI-2">
// 				User and Game Stats Dashboards
// 				<span class="badge text-bg-warning me-3">
// 					MINOR
// 				</span>
// 			</button>
// 		</h2>
// 		<div id="nested-AI-2" class="accordion-collapse collapse" aria-labelledby="AI-2">
// 		<div class="accordion-body">
// 			Dashboards AI Description blablablabla
// 		</div>
// 		</div>
// 	</div>

// 	</div>
// 	</div>
// 	</div>
// 	</div>

// 	<!--	CYBERSECURITY	-->
// 	<div class="accordion-item">
// 		<h2 class="accordion-header" id="CyberAccordion">
// 			<button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#outerCollapseCyber" aria-expanded="true" aria-controls="outerCollapseCyber">
// 				Cybersecurity
// 			</button>
// 		</h2>
// 	<div id="outerCollapseCyber" class="accordion-collapse collapse" aria-labelledby="CyberAccordion">
// 	<div class="accordion-body">
// 	<div class="accordion" id="CyberNested">
	
// 	<!-- #1 MODULE -->
// 	<div class="accordion-item">
// 		<h2 class="accordion-header" id="Cyber-1">
// 			<button class="accordion-button d-flex justify-content-start align-items-center" type="button" data-bs-toggle="collapse" data-bs-target="#nested-cyber-1" aria-expanded="true" aria-controls="nested-cyber-1">
// 				Implement Two-Factor Authentication (2FA) and JWT
// 				<span class="badge rounded-pill text-bg-danger me-3">
// 					MAJOR
// 				</span>
// 			</button>
// 		</h2>
// 		<div id="nested-cyber-1" class="accordion-collapse collapse" aria-labelledby="Cyber-1">
// 		<div class="accordion-body">
// 			We implemented 2FA, your data is safe with us!
// 		</div>
// 		</div>
// 	</div>
	
// 	</div>
// 	</div>
// 	</div>
// 	</div>

// 	<!--	DEVOPS	-->
// 	<div class="accordion-item">
// 		<h2 class="accordion-header" id="DevOpsAccordion">
// 			<button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#outerCollapseDevOps" aria-expanded="true" aria-controls="outerCollapseDevOps">
// 				DevOps
// 			</button>
// 		</h2>
// 	<div id="outerCollapseDevOps" class="accordion-collapse collapse" aria-labelledby="DevOpsAccordion">
// 	<div class="accordion-body">
// 	<div class="accordion" id="DevOpsNested">
	
// 	<!-- #1 MODULE -->
// 	<div class="accordion-item">
// 		<h2 class="accordion-header" id="DevOps-1">
// 			<button class="accordion-button d-flex justify-content-start align-items-center" type="button" data-bs-toggle="collapse" data-bs-target="#nested-DevOps-1" aria-expanded="true" aria-controls="nested-DevOps-1">
// 				Monitoring System
// 				<span class="badge rounded-pill text-bg-warning me-3">
// 					MINOR
// 				</span>
// 			</button>
// 		</h2>
// 		<div id="nested-DevOps-1" class="accordion-collapse collapse" aria-labelledby="DevOps-1">
// 		<div class="accordion-body">
// 			Big Brother is watching
// 		</div>
// 		</div>
// 	</div>

// 	<!-- #2 MODULE -->
// 	<div class="accordion-item">
// 		<h2 class="accordion-header" id="DevOps-2">
// 			<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#nested-DevOps-2" aria-expanded="false" aria-controls="nested-DevOps-2">
// 				Designing the Backend as Microservices
// 				<span class="badge rounded-pill text-bg-danger me-3">
// 					MAJOR
// 				</span>
// 			</button>
// 		</h2>
// 		<div id="nested-DevOps-2" class="accordion-collapse collapse" aria-labelledby="DevOps-2">
// 		<div class="accordion-body">
// 			Designing back blablabla description
// 		</div>
// 		</div>
// 	</div>

// 	</div>
// 	</div>
// 	</div>
// 	</div>

// 	<!--	ACCESSIBILITY	-->
// 	<div class="accordion-item">
// 		<h2 class="accordion-header" id="AccessAccordion">
// 			<button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#outerCollapseAccess" aria-expanded="true" aria-controls="outerCollapseAccess">
// 				Accessibility
// 			</button>
// 		</h2>
// 	<div id="outerCollapseAccess" class="accordion-collapse collapse" aria-labelledby="AccessAccordion">
// 	<div class="accordion-body">
// 	<div class="accordion" id="AccessNested">
	
// 	<!-- #1 MODULE -->
// 	<div class="accordion-item">
// 		<h2 class="accordion-header" id="Access-1">
// 			<button class="accordion-button d-flex justify-content-start align-items-center" type="button" data-bs-toggle="collapse" data-bs-target="#nested-Access-1" aria-expanded="true" aria-controls="nested-Access-1">
// 				Multiple language supports
// 				<span class="badge rounded-pill text-bg-warning me-3">
// 					MINOR
// 				</span>
// 			</button>
// 		</h2>
// 		<div id="nested-Access-1" class="accordion-collapse collapse" aria-labelledby="Access-1">
// 		<div class="accordion-body">
// 			We plan to support over 60 languages!
// 		</div>
// 		</div>
// 	</div>
	
// 	</div>
// 	</div>
// 	</div>
// 	</div>

// 	<!--	FOOTER MODAL	-->
// 	<div class="modal-footer">
// 		<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
// 			Get Me Out Of Here
// 		</button>
// 	</div>
	
// </div>
// </div>
// </div>
// </div>
// </div> */

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
	gifElement.className = 'img-fluid mb-3';

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
	moreInfoLink.className = 'btn btn-primary btn-home mt-3';
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
		moduleBody.innerHTML = module.content;
		moduleCollapse.appendChild(moduleBody);

		nestedAccordion.appendChild(moduleItem);
	});

	return accordionItem;
}

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

	// Example data for accordion items
	const	webModules = [
	{
		id: '1',
		title: 'Use a Framework as backend',
		collapsed: false,
		badgeClass: 'text-bg-danger',
		badgeText: 'MAJOR',
		content: 'We used <a href="https://www.djangoproject.com/start/overview/" target="_blank">Django</a> as framework. <img src="../../../assets/images/home/modules/django_logo.png" alt="Django Logo" class="img-fluid rounded float-end">'
	},
	{
		id: '2',
		title: 'Use a front-end framework or toolkit',
		collapsed: true,
		badgeClass: 'text-bg-warning',
		badgeText: 'MINOR',
		content: 'We used <a href="https://getbootstrap.com/" target="_blank">Bootstrap</a> as frontend toolkit.'
	},
	{
		id: '3',
		title: 'Use a database for the backend',
		collapsed: true,
		badgeClass: 'text-bg-warning',
		badgeText: 'MINOR',
		content: 'We used <a href="https://www.postgresql.org/" target="_blank">PostgreSQL</a> as a designated database.'
	}
	];

	const	userModules = [
	{
		id: '1',
		title: 'Standard user management, authentication, users across tournaments',
		collapsed: false,
		badgeClass: 'text-bg-danger',
		badgeText: 'MAJOR',
		content: 'Users can blablabla lalala'
	}
	];

	// Add accordion items to the main accordion
	mainAccordion.appendChild(createAccordionItem('Web', 'Web', 'text-bg-danger', 'MAJOR', webModules));
	mainAccordion.appendChild(createAccordionItem('User', 'User Management', 'text-bg-danger', 'MAJOR', userModules));

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