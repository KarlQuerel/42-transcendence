/***********************************************\
-			IMPORTING GLOBAL VARIABLES			-
\***********************************************/
import { DEBUG } from '../../main.js';

let animationFrameId;

class Particle
{
	constructor(x, y, size, speedX, speedY, color)
	{
		this.x = x;
		this.y = y;
		this.size = size;
		this.speedX = speedX * 0.09; // SPEED MOVEMENT
		this.speedY = speedY * 0.09;
		this.color = color;
	}

	draw(ctx)
	{
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, this.size, this.size);
	}

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
				const	forceX = (dx / distance) * force * 5; // FORCE
				const	forceY = (dy / distance) * force * 5;

				this.x += forceX;
				this.y += forceY;
			}
		}

		this.x += this.speedX;
		this.y += this.speedY;

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

function setupMouseListeners(canvas, mouse)
{
	canvas.addEventListener('mousemove', (e) =>
	{
		const	rect = canvas.getBoundingClientRect();
		mouse.x = e.clientX - rect.left;
		mouse.y = e.clientY - rect.top;
	});

	canvas.addEventListener('mouseleave', () =>
	{
		mouse.x = null;
		mouse.y = null;
	});
}

export function initParticles()
{
	let	canvas = document.getElementById('particles-canvas');
	if (!canvas)
	{
		canvas = document.createElement('canvas');
		canvas.id = 'particles-canvas';
		const	ctx = canvas.getContext('2d');
		const	particlesArray = [];
		const	mouse = { x: null, y: null, radius: 150 }; // RADIUS

		// Set canvas to full window size
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		document.body.appendChild(canvas);

		// Ensure listeners are set up after canvas is added
		setupMouseListeners(canvas, mouse);

		// Create particles
		for (let i = 0; i < 6000; i++) // NUMBER
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
			animationFrameId = requestAnimationFrame(animateParticles);
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

export function destroyParticles()
{
	const	canvas = document.getElementById('particles-canvas');
	if (canvas)
	{
		cancelAnimationFrame(animationFrameId);
		canvas.remove();
		if (DEBUG)
			console.log('Particles effect destroyed');
	}
}

function getRandomGreen()
{
	const	green = Math.floor(Math.random() * 256);
	return `rgb(0, ${green}, 0)`;
}

/*					CONTAINERs					*/
export function createParticlesContainer()
{
	let particlesContainer = document.getElementById('particles-js');
	if (!particlesContainer)
	{
		particlesContainer = document.createElement('div');
		particlesContainer.id = 'particles-js';
		document.body.appendChild(particlesContainer);
	}
	return particlesContainer;
}