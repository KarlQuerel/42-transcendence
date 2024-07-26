export default function renderHome()
{
	document.getElementById('app').innerHTML = `
	<div class="container mt-4">
		<div class="row">
			<div class="col-md-4">
				<div class="nav-frame bg-lightblue text-white text-center p-4 rounded" onclick="navigateTo('home')">
					<p>Home</p>
				</div>
			</div>
			<div class="col-md-4">
				<div class="nav-frame bg-lightgreen text-white text-center p-4 rounded" onclick="navigateTo('about')">
					<p>What is Pong?</p>
				</div>
			</div>
			<div class="col-md-4">
				<div class="nav-frame bg-lightcoral text-white text-center p-4 rounded" onclick="navigateTo('theteam')">
					<p>The Team</p>
				</div>
			</div>
			<div class="col-md-4">
				<div class="nav-frame bg-lightgoldenrodyellow text-white text-center p-4 rounded" onclick="navigateTo('play-pong')">
					<p>Play Pong</p>
				</div>
			</div>
			<div class="col-md-4">
				<div class="nav-frame bg-lightpink text-white text-center p-4 rounded" onclick="navigateTo('login')">
					<p>Log In</p>
				</div>
			</div>
		</div>
	</div>`;
}
