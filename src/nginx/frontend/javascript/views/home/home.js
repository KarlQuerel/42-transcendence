export default function renderHome()
{
	document.getElementById('app').innerHTML = `
		
		<a class="btn btn-primary" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
	Profile
	</a>
	<button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
	Button with data-bs-target
	</button>

	<div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
	<div class="offcanvas-header">
		<h5 class="offcanvas-title" id="offcanvasExampleLabel">Offcanvas</h5>
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

	<p class="d-inline-flex gap-1">
			<a class="btn btn-primary button-link" data-bs-toggle="collapse" href="#multiCollapseExample1" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">What is Pong?</a>
			<button class="btn btn-primary button-link" type="button" data-bs-toggle="collapse" data-bs-target="#multiCollapseExample2" aria-expanded="false" aria-controls="multiCollapseExample2">Why Pong?</button>
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

		<div id="reviewCarousel" class="carousel slide" data-bs-ride="carousel">
			<div class="carousel-inner">
				<div class="carousel-item active">
					<figure class="text-end">
						<blockquote class="blockquote">
							<p>"This website changed my life!"</p>
						</blockquote>
						<figcaption class="blockquote-footer">
							Agent Tango - <cite title="Source Title">Actor at Tardif Productions</cite>
						</figcaption>
					</figure>
				</div>
				<div class="carousel-item">
					<figure class="text-end">
						<blockquote class="blockquote">
							<p>"An absolute must-have for anyone in the industry."</p>
						</blockquote>
						<figcaption class="blockquote-footer">
							Jesscalade - <cite title="Source Title">Boss at The World</cite>
						</figcaption>
					</figure>
				</div>
				<div class="carousel-item">
					<figure class="text-end">
						<blockquote class="blockquote">
							<p>"Incredible value for the price. Exceeded all my expectations."</p>
						</blockquote>
						<figcaption class="blockquote-footer">
							Clement le Gitan - <cite title="Source Title">President de la Republique</cite>
						</figcaption>
					</figure>
				</div>
			</div>
			<button class="carousel-control-prev" type="button" data-bs-target="#reviewCarousel" data-bs-slide="prev">
				<span class="carousel-control-prev-icon" aria-hidden="true"></span>
				<span class="visually-hidden">Previous</span>
			</button>
			<button class="carousel-control-next" type="button" data-bs-target="#reviewCarousel" data-bs-slide="next">
				<span class="carousel-control-next-icon" aria-hidden="true"></span>
				<span class="visually-hidden">Next</span>
			</button>
		</div>

		<a href="mailto:contact@example.com" class="btn btn-primary float-button">
			<i class="bi bi-envelope"></i> Contact Us
		</a>
	`;
	
	// Attach click event listeners to navigation frames
	document.querySelectorAll('.nav-frame').forEach(element => {
		element.addEventListener('click', () => {
			const path = element.getAttribute('data-path');
			navigateTo(path);
		});
	});
}
