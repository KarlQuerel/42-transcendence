export default function renderHome()
{
	document.getElementById('app').innerHTML = `

	<h1>UNDER CONSTRUCTION</h1>

	`;
	
	// Attach click event listeners to navigation frames
	document.querySelectorAll('.nav-frame').forEach(element => {
	element.addEventListener('click', () => {
		const path = element.getAttribute('data-path');
		navigateTo(path);
	});
});
}
