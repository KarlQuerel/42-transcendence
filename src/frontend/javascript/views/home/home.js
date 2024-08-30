/***********************************************\
-				RENDERING						-
\***********************************************/
export default function renderHome()
{
	document.getElementById('app').innerHTML = `
		
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
			<a class="btn btn-primary button-link" data-bs-toggle="collapse" href="#multiCollapseExample1" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">
				What is Pong?
			</a>
			<button class="btn btn-primary button-link" type="button" data-bs-toggle="collapse" data-bs-target="#multiCollapseExample2" aria-expanded="false" aria-controls="multiCollapseExample2">
				Why Pong?
			</button>
	</p>
	<div class="row">
		<div class="col">
			<div class="collapse multi-collapse" id="multiCollapseExample1">
				<div class="card card-body">
					Pong is a nice game. You should try it.
				</div>
			</div>
		</div>
		<div class="col">
			<div class="collapse multi-collapse" id="multiCollapseExample2">
				<div class="card card-body">
					Because why not.
				</div>
			</div>
		</div>
	</div>
<!-------------------------------------
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
-------------------------------------->

	<!--	BUTTON MODULES	-->
	<button type="button" class="btn btn-primary-link" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
		Modules
	</button>

	<!--	MODAL MODULES	-->
	<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
	<div class="modal-dialog modal-xl">
	<div class="modal-content">
	<div class="modal-header">
		<h5 class="modal-title" id="staticBackdropLabel">
			What we did
		</h5>
	</div>
	<div class="modal-body">
	<div class="accordion accordion-flush" id="MainAccordion">

	<!--	WEB	-->
	<div class="accordion-item">
		<h2 class="accordion-header" id="WebAccordion">
			<button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#outerCollapseWeb" aria-expanded="true" aria-controls="outerCollapseWeb">
				Web
			</button>
		</h2>
	<div id="outerCollapseWeb" class="accordion-collapse collapse" aria-labelledby="WebAccordion">
	<div class="accordion-body">
	<div class="accordion" id="WebNested">
	
	<!-- #1 MODULE -->
	<div class="accordion-item">
		<h2 class="accordion-header" id="Web-1">
			<button class="accordion-button d-flex justify-content-start align-items-center" type="button" data-bs-toggle="collapse" data-bs-target="#nested-web-1" aria-expanded="true" aria-controls="nested-web-1">
				Use a Framework as backend
				<span class="badge rounded-pill text-bg-danger me-3">
					MAJOR
				</span>
			</button>
		</h2>
		<div id="nested-web-1" class="accordion-collapse collapse" aria-labelledby="Web-1">
		<div class="accordion-body">
			We used <a href="https://www.djangoproject.com/start/overview/" target="_blank">Djan-motherfucking useless and not even working bitchy ass-go</a> as framework.
		<img src="../../../assets/images/home/modules/django_logo.png" alt="Django Logo" class="img-fluid rounded float-end">
		</div>
		</div>
	</div>

	<!-- #2 MODULE -->
	<div class="accordion-item">
		<h2 class="accordion-header" id="Web-2">
			<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#nested-web-2" aria-expanded="false" aria-controls="nested-web-2">
				Use a front-end framework or toolkit
				<span class="badge text-bg-warning me-3">
					MINOR
				</span>
			</button>
		</h2>
		<div id="nested-web-2" class="accordion-collapse collapse" aria-labelledby="Web-2">
		<div class="accordion-body">
			We used <a href="https://getbootstrap.com/" target"_blank">Bootstrap</a> as frontend toolkit.
		</div>
		</div>
	</div>

	<!-- #3 MODULE -->
	<div class="accordion-item">
		<h2 class="accordion-header" id="Web-3">
			<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#nested-web-3" aria-expanded="false" aria-controls="nested-web-3">
				Use a database for the backend
				<span class="badge text-bg-warning me-3">
					MINOR
				</span>
			</button>
		</h2>
		<div id="nested-web-3" class="accordion-collapse collapse" aria-labelledby="Web-3">
		<div class="accordion-body">
			We used <a href="https://www.postgresql.org/" target"_blank">PostgreSQL>PostgreSQL</a> as a designated database.
		</div>
		</div>
	</div>
	
	</div>
	</div>
	</div>
	</div>

	<!--	USER MANAGEMENT	-->
	<div class="accordion-item">
		<h2 class="accordion-header" id="UserAccordion">
			<button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#outerCollapseUser" aria-expanded="true" aria-controls="outerCollapseUser">
				User Management
			</button>
		</h2>
	<div id="outerCollapseUser" class="accordion-collapse collapse" aria-labelledby="UserAccordion">
	<div class="accordion-body">
	<div class="accordion" id="UserNested">
	
	<!-- #1 MODULE -->
	<div class="accordion-item">
		<h2 class="accordion-header" id="User-1">
			<button class="accordion-button d-flex justify-content-start align-items-center" type="button" data-bs-toggle="collapse" data-bs-target="#nested-user-1" aria-expanded="true" aria-controls="nested-user-1">
				Standard user management, authentication, users across tournaments
				<span class="badge rounded-pill text-bg-danger me-3">
					MAJOR
				</span>
			</button>
		</h2>
		<div id="nested-user-1" class="accordion-collapse collapse" aria-labelledby="User-1">
		<div class="accordion-body">
				Users can blablabla lalala
		</div>
		</div>
	</div>
	
	</div>
	</div>
	</div>
	</div>

	<!--	GAMEPLAY AND USER EXPERIENCE	-->
	<div class="accordion-item">
		<h2 class="accordion-header" id="GameAccordion">
			<button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#outerCollapseGame" aria-expanded="true" aria-controls="outerCollapseGame">
				Gameplay and User Experience
			</button>
		</h2>
	<div id="outerCollapseGame" class="accordion-collapse collapse" aria-labelledby="GameAccordion">
	<div class="accordion-body">
	<div class="accordion" id="GameNested">
	
	<!-- #1 MODULE -->
	<div class="accordion-item">
		<h2 class="accordion-header" id="Game-1">
			<button class="accordion-button d-flex justify-content-start align-items-center" type="button" data-bs-toggle="collapse" data-bs-target="#nested-game-1" aria-expanded="true" aria-controls="nested-game-1">
				Game Customization Options
				<span class="badge text-bg-warning me-3">
					MINOR
				</span>
			</button>
		</h2>
		<div id="nested-game-1" class="accordion-collapse collapse" aria-labelledby="Game-1">
		<div class="accordion-body">
			We customised our game. You can now play our game on Steam, Epic Games and Skyblog.
		</div>
		</div>
	</div>
	
	</div>
	</div>
	</div>
	</div>

	<!--	AI-ALGO	-->
	<div class="accordion-item">
		<h2 class="accordion-header" id="AIAccordion">
			<button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#outerCollapseAI" aria-expanded="true" aria-controls="outerCollapseAI">
				AI-Algo
			</button>
		</h2>
	<div id="outerCollapseAI" class="accordion-collapse collapse" aria-labelledby="AIAccordion">
	<div class="accordion-body">
	<div class="accordion" id="AINested">
	
	<!-- #1 MODULE -->
	<div class="accordion-item">
		<h2 class="accordion-header" id="AI-1">
			<button class="accordion-button d-flex justify-content-start align-items-center" type="button" data-bs-toggle="collapse" data-bs-target="#nested-AI-1" aria-expanded="true" aria-controls="nested-AI-1">
				Introduce an AI Opponent
				<span class="badge rounded-pill text-bg-danger me-3">
					MAJOR
				</span>
			</button>
		</h2>
		<div id="nested-AI-1" class="accordion-collapse collapse" aria-labelledby="AI-1">
		<div class="accordion-body">
			Try to beat our AI!
		</div>
		</div>
	</div>

	<!-- #2 MODULE -->
	<div class="accordion-item">
		<h2 class="accordion-header" id="AI-2">
			<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#nested-AI-2" aria-expanded="false" aria-controls="nested-AI-2">
				User and Game Stats Dashboards
				<span class="badge text-bg-warning me-3">
					MINOR
				</span>
			</button>
		</h2>
		<div id="nested-AI-2" class="accordion-collapse collapse" aria-labelledby="AI-2">
		<div class="accordion-body">
			Dashboards AI Description blablablabla
		</div>
		</div>
	</div>

	</div>
	</div>
	</div>
	</div>

	<!--	CYBERSECURITY	-->
	<div class="accordion-item">
		<h2 class="accordion-header" id="CyberAccordion">
			<button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#outerCollapseCyber" aria-expanded="true" aria-controls="outerCollapseCyber">
				Cybersecurity
			</button>
		</h2>
	<div id="outerCollapseCyber" class="accordion-collapse collapse" aria-labelledby="CyberAccordion">
	<div class="accordion-body">
	<div class="accordion" id="CyberNested">
	
	<!-- #1 MODULE -->
	<div class="accordion-item">
		<h2 class="accordion-header" id="Cyber-1">
			<button class="accordion-button d-flex justify-content-start align-items-center" type="button" data-bs-toggle="collapse" data-bs-target="#nested-cyber-1" aria-expanded="true" aria-controls="nested-cyber-1">
				Implement Two-Factor Authentication (2FA) and JWT
				<span class="badge rounded-pill text-bg-danger me-3">
					MAJOR
				</span>
			</button>
		</h2>
		<div id="nested-cyber-1" class="accordion-collapse collapse" aria-labelledby="Cyber-1">
		<div class="accordion-body">
			We implemented 2FA, your data is safe with us!
		</div>
		</div>
	</div>
	
	</div>
	</div>
	</div>
	</div>

	<!--	DEVOPS	-->
	<div class="accordion-item">
		<h2 class="accordion-header" id="DevOpsAccordion">
			<button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#outerCollapseDevOps" aria-expanded="true" aria-controls="outerCollapseDevOps">
				DevOps
			</button>
		</h2>
	<div id="outerCollapseDevOps" class="accordion-collapse collapse" aria-labelledby="DevOpsAccordion">
	<div class="accordion-body">
	<div class="accordion" id="DevOpsNested">
	
	<!-- #1 MODULE -->
	<div class="accordion-item">
		<h2 class="accordion-header" id="DevOps-1">
			<button class="accordion-button d-flex justify-content-start align-items-center" type="button" data-bs-toggle="collapse" data-bs-target="#nested-DevOps-1" aria-expanded="true" aria-controls="nested-DevOps-1">
				Monitoring System
				<span class="badge rounded-pill text-bg-warning me-3">
					MINOR
				</span>
			</button>
		</h2>
		<div id="nested-DevOps-1" class="accordion-collapse collapse" aria-labelledby="DevOps-1">
		<div class="accordion-body">
			Big Brother is watching
		</div>
		</div>
	</div>

	<!-- #2 MODULE -->
	<div class="accordion-item">
		<h2 class="accordion-header" id="DevOps-2">
			<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#nested-DevOps-2" aria-expanded="false" aria-controls="nested-DevOps-2">
				Designing the Backend as Microservices
				<span class="badge rounded-pill text-bg-danger me-3">
					MAJOR
				</span>
			</button>
		</h2>
		<div id="nested-DevOps-2" class="accordion-collapse collapse" aria-labelledby="DevOps-2">
		<div class="accordion-body">
			Designing back blablabla description
		</div>
		</div>
	</div>

	</div>
	</div>
	</div>
	</div>

	<!--	ACCESSIBILITY	-->
	<div class="accordion-item">
		<h2 class="accordion-header" id="AccessAccordion">
			<button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#outerCollapseAccess" aria-expanded="true" aria-controls="outerCollapseAccess">
				Accessibility
			</button>
		</h2>
	<div id="outerCollapseAccess" class="accordion-collapse collapse" aria-labelledby="AccessAccordion">
	<div class="accordion-body">
	<div class="accordion" id="AccessNested">
	
	<!-- #1 MODULE -->
	<div class="accordion-item">
		<h2 class="accordion-header" id="Access-1">
			<button class="accordion-button d-flex justify-content-start align-items-center" type="button" data-bs-toggle="collapse" data-bs-target="#nested-Access-1" aria-expanded="true" aria-controls="nested-Access-1">
				Multiple language supports
				<span class="badge rounded-pill text-bg-warning me-3">
					MINOR
				</span>
			</button>
		</h2>
		<div id="nested-Access-1" class="accordion-collapse collapse" aria-labelledby="Access-1">
		<div class="accordion-body">
			We plan to support over 60 languages!
		</div>
		</div>
	</div>
	
	</div>
	</div>
	</div>
	</div>

	<!--	FOOTER MODAL	-->
	<div class="modal-footer">
		<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
			Get Me Out Of Here
		</button>
	</div>
	
</div>
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

	`;
	
	// Attach click event listeners to navigation frames
	document.querySelectorAll('.nav-frame').forEach(element => {
		element.addEventListener('click', () => {
			const path = element.getAttribute('data-path');
			navigateTo(path);
		});
	});
}

// // TODO - Karl, fleeing contact us to implement later
// /*
// <a href="mailto:contact@example.com" class="btn btn-primary float-button">
// 	<i class="bi bi-envelope"></i> Contact Us
// </a>
// */

// export default function renderHome() {
//     const appElement = document.getElementById('app');

//     // Clear any existing content
//     appElement.innerHTML = '';

//     // Create Profile Button
//     const profileButton = document.createElement('button');
//     profileButton.className = 'btn btn-primary';
//     profileButton.type = 'button';
//     profileButton.setAttribute('data-bs-toggle', 'offcanvas');
//     profileButton.setAttribute('data-bs-target', '#offcanvasExample');
//     profileButton.setAttribute('aria-controls', 'offcanvasExample');
//     profileButton.textContent = 'Profile';
//     appElement.appendChild(profileButton);

//     // Create Offcanvas Component
//     const offcanvas = document.createElement('div');
//     offcanvas.className = 'offcanvas offcanvas-start';
//     offcanvas.id = 'offcanvasExample';
//     offcanvas.setAttribute('aria-labelledby', 'offcanvasExampleLabel');

//     const offcanvasHeader = document.createElement('div');
//     offcanvasHeader.className = 'offcanvas-header';

//     const offcanvasTitle = document.createElement('h5');
//     offcanvasTitle.className = 'offcanvas-title';
//     offcanvasTitle.id = 'offcanvasExampleLabel';
//     offcanvasTitle.textContent = 'Your Profile';

//     const closeButton = document.createElement('button');
//     closeButton.type = 'button';
//     closeButton.className = 'btn-close';
//     closeButton.setAttribute('data-bs-dismiss', 'offcanvas');
//     closeButton.setAttribute('aria-label', 'Close');

//     offcanvasHeader.appendChild(offcanvasTitle);
//     offcanvasHeader.appendChild(closeButton);

//     const offcanvasBody = document.createElement('div');
//     offcanvasBody.className = 'offcanvas-body';

//     const profileContent = document.createElement('div');
//     profileContent.textContent = 'Maybe a profile page here? Or options?';

//     const dropdown = document.createElement('div');
//     dropdown.className = 'dropdown mt-3';

//     const dropdownButton = document.createElement('button');
//     dropdownButton.className = 'btn btn-secondary dropdown-toggle';
//     dropdownButton.type = 'button';
//     dropdownButton.setAttribute('data-bs-toggle', 'dropdown');
//     dropdownButton.textContent = 'Click me';

//     const dropdownMenu = document.createElement('ul');
//     dropdownMenu.className = 'dropdown-menu';

//     const dropdownItems = [
//         { text: 'Pong', href: '/pong' },
//         { text: 'Another action', href: '#' },
//         { text: 'Something else here', href: '#' }
//     ];

//     dropdownItems.forEach(item => {
//         const li = document.createElement('li');
//         const a = document.createElement('a');
//         a.className = 'dropdown-item';
//         a.href = item.href;
//         a.textContent = item.text;
//         li.appendChild(a);
//         dropdownMenu.appendChild(li);
//     });

//     dropdown.appendChild(dropdownButton);
//     dropdown.appendChild(dropdownMenu);

//     offcanvasBody.appendChild(profileContent);
//     offcanvasBody.appendChild(dropdown);

//     offcanvas.appendChild(offcanvasHeader);
//     offcanvas.appendChild(offcanvasBody);

//     appElement.appendChild(offcanvas);

//     // Create Pong Explanation Section
//     const explanationContainer = document.createElement('div');
//     explanationContainer.className = 'd-inline-flex gap-1';

//     const pongButton = document.createElement('a');
//     pongButton.className = 'btn btn-primary button-link';
//     pongButton.href = '#multiCollapseExample1';
//     pongButton.setAttribute('data-bs-toggle', 'collapse');
//     pongButton.setAttribute('role', 'button');
//     pongButton.setAttribute('aria-expanded', 'false');
//     pongButton.setAttribute('aria-controls', 'multiCollapseExample1');
//     pongButton.textContent = 'What is Pong?';

//     const whyPongButton = document.createElement('button');
//     whyPongButton.className = 'btn btn-primary button-link';
//     whyPongButton.type = 'button';
//     whyPongButton.setAttribute('data-bs-toggle', 'collapse');
//     whyPongButton.setAttribute('data-bs-target', '#multiCollapseExample2');
//     whyPongButton.setAttribute('aria-expanded', 'false');
//     whyPongButton.setAttribute('aria-controls', 'multiCollapseExample2');
//     whyPongButton.textContent = 'Why Pong?';

//     explanationContainer.appendChild(pongButton);
//     explanationContainer.appendChild(whyPongButton);

//     const row = document.createElement('div');
//     row.className = 'row';

//     const col1 = document.createElement('div');
//     col1.className = 'col';

//     const collapse1 = document.createElement('div');
//     collapse1.className = 'collapse multi-collapse';
//     collapse1.id = 'multiCollapseExample1';

//     const card1 = document.createElement('div');
//     card1.className = 'card card-body';
//     card1.textContent = 'Pong is a nice game. You should try it.';

//     collapse1.appendChild(card1);
//     col1.appendChild(collapse1);
//     row.appendChild(col1);

//     const col2 = document.createElement('div');
//     col2.className = 'col';

//     const collapse2 = document.createElement('div');
//     collapse2.className = 'collapse multi-collapse';
//     collapse2.id = 'multiCollapseExample2';

//     const card2 = document.createElement('div');
//     card2.className = 'card card-body';
//     card2.textContent = 'Because why not.';

//     collapse2.appendChild(card2);
//     col2.appendChild(collapse2);
//     row.appendChild(col2);

//     appElement.appendChild(explanationContainer);
//     appElement.appendChild(row);

//     // Create Modal Modules
//     const modal = document.createElement('div');
//     modal.className = 'modal fade';
//     modal.id = 'staticBackdrop';
//     modal.setAttribute('data-bs-backdrop', 'static');
//     modal.setAttribute('data-bs-keyboard', 'false');
//     modal.tabIndex = -1;
//     modal.setAttribute('aria-labelledby', 'staticBackdropLabel');
//     modal.setAttribute('aria-hidden', 'true');

//     const modalDialog = document.createElement('div');
//     modalDialog.className = 'modal-dialog modal-xl';

//     const modalContent = document.createElement('div');
//     modalContent.className = 'modal-content';

//     const modalHeader = document.createElement('div');
//     modalHeader.className = 'modal-header';

//     const modalTitle = document.createElement('h5');
//     modalTitle.className = 'modal-title';
//     modalTitle.id = 'staticBackdropLabel';
//     modalTitle.textContent = 'What we did';

//     const modalCloseButton = document.createElement('button');
//     modalCloseButton.type = 'button';
//     modalCloseButton.className = 'btn btn-secondary';
//     modalCloseButton.setAttribute('data-bs-dismiss', 'modal');
//     modalCloseButton.textContent = 'Get Me Out Of Here';

//     modalHeader.appendChild(modalTitle);
//     modalHeader.appendChild(modalCloseButton);

//     const modalBody = document.createElement('div');
//     modalBody.className = 'modal-body';

//     const accordion = document.createElement('div');
//     accordion.className = 'accordion accordion-flush';
//     accordion.id = 'MainAccordion';

//     const sections = [
//         {
//             id: 'Web',
//             title: 'Web',
//             items: [
//                 {
//                     id: 'Web-1',
//                     title: 'Use a Framework as backend',
//                     badge: 'MAJOR',
//                     content: 'We used <a href="https://www.djangoproject.com/start/overview/" target="_blank">Django</a> as framework.'
//                 },
//                 {
//                     id: 'Web-2',
//                     title: 'Use a front-end framework or toolkit',
//                     badge: 'MINOR',
//                     content: 'We used <a href="https://getbootstrap.com/" target="_blank">Bootstrap</a> as frontend toolkit.'
//                 },
//                 {
//                     id: 'Web-3',
//                     title: 'Use a database for the backend',
//                     badge: 'MINOR',
//                     content: 'We used <a href="https://www.postgresql.org/" target="_blank">PostgreSQL</a> as a designated database.'
//                 }
//             ]
//         },
//         // Add other sections similarly...
//     ];

//     sections.forEach(section => {
//         const accordionItem = document.createElement('div');
//         accordionItem.className = 'accordion-item';

//         const accordionHeader = document.createElement('h2');
//         accordionHeader.className = 'accordion-header';
//         accordionHeader.id = section.id + 'Accordion';

//         const accordionButton = document.createElement('button');
//         accordionButton.className = 'accordion-button';
//         accordionButton.type = 'button';
//         accordionButton.setAttribute('data-bs-toggle', 'collapse');
//         accordionButton.setAttribute('data-bs-target', `#${section.id}Collapse`);
//         accordionButton.setAttribute('aria-expanded', 'true');
//         accordionButton.setAttribute('aria-controls', `${section.id}Collapse`);
//         accordionButton.textContent = section.title;

//         accordionHeader.appendChild(accordionButton);
//         accordionItem.appendChild(accordionHeader);

//         const accordionCollapse = document.createElement('div');
//         accordionCollapse.className = 'accordion-collapse collapse show';
//         accordionCollapse.id = `${section.id}Collapse`;
//         accordionCollapse.setAttribute('aria-labelledby', `${section.id}Accordion`);
//         accordionCollapse.setAttribute('data-bs-parent', '#MainAccordion');

//         const accordionBody = document.createElement('div');
//         accordionBody.className = 'accordion-body';

//         section.items.forEach(item => {
//             const itemDiv = document.createElement('div');
//             itemDiv.className = 'd-flex justify-content-between';

//             const itemTitle = document.createElement('span');
//             itemTitle.className = 'd-inline-block';
//             itemTitle.innerHTML = item.title;

//             const itemBadge = document.createElement('span');
//             itemBadge.className = `badge ${item.badge === 'MAJOR' ? 'bg-danger' : 'bg-warning'}`;
//             itemBadge.textContent = item.badge;

//             itemDiv.appendChild(itemTitle);
//             itemDiv.appendChild(itemBadge);

//             const itemContent = document.createElement('div');
//             itemContent.innerHTML = item.content;

//             accordionBody.appendChild(itemDiv);
//             accordionBody.appendChild(itemContent);
//         });

//         accordionCollapse.appendChild(accordionBody);
//         accordionItem.appendChild(accordionCollapse);

//         accordion.appendChild(accordionItem);
//     });

//     modalBody.appendChild(accordion);

//     const modalFooter = document.createElement('div');
//     modalFooter.className = 'modal-footer';

//     const modalSaveButton = document.createElement('button');
//     modalSaveButton.type = 'button';
//     modalSaveButton.className = 'btn btn-primary';
//     modalSaveButton.textContent = 'Save changes';

//     modalFooter.appendChild(modalSaveButton);

//     modalContent.appendChild(modalHeader);
//     modalContent.appendChild(modalBody);
//     modalContent.appendChild(modalFooter);

//     modalDialog.appendChild(modalContent);
//     modal.appendChild(modalDialog);

//     // Append modal to the app element
//     appElement.appendChild(modal);

//     // Initialize Bootstrap Modals if needed
//     const modalElement = new bootstrap.Modal(modal);
//     modalElement.show();
// }
