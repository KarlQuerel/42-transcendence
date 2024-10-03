/***********************************************\
-			IMPORTING GLOBAL VARIABLES			-
\***********************************************/
import { DEBUG } from '../../main.js';

/***********************************************\
-				IMPORTING SCRIPTS				-
\***********************************************/
import { createElementWithClass, createImage, createTextElement,
createCardHeader, createButton }
from './utils.js'

/***********************************************\
-					CAROUSEL					-
\***********************************************/
export function createCarousel()
{
	const	carousel = createElementWithClass('div', 'carousel slide');
	carousel.id = 'TheyTrustedUsCarousel';
	carousel.setAttribute('data-bs-ride', 'carousel');

	// Carousel indicators
	const	indicators = createCarouselIndicators();
	carousel.appendChild(indicators);

	const	carouselInner = createCarouselInner();
	carousel.appendChild(carouselInner);

	// Optional controls
	const	prevButton = createCarouselControl('prev');
	const	nextButton = createCarouselControl('next');

	carousel.appendChild(prevButton);
	carousel.appendChild(nextButton);

	return carousel;
}

function createCarouselIndicators()
{
	const	indicators = createElementWithClass('div', 'carousel-indicators');
	const	itemsCount = 4; // Adjust based on the number of items

	for (let i = 0; i < itemsCount; i++) {
		const	indicator = createElementWithClass('button', '');
		indicator.type = 'button';
		indicator.setAttribute('data-bs-target', '#TheyTrustedUsCarousel');
		indicator.setAttribute('data-bs-slide-to', i);
		indicator.setAttribute('aria-label', `Slide ${i + 1}`);
		if (i === 0)
		{
			indicator.classList.add('active');
			indicator.setAttribute('aria-current', 'true');
		}
		indicators.appendChild(indicator);
	}

	return indicators;
}

function createCarouselInner()
{
	const	carouselInner = createElementWithClass('div', 'carousel-inner');

	const	items =
	[
		{ imgSrc: '../../../assets/images/home/they_trusted_us/caro_testimonial.jpg', alt: 'First Slide', caption: 'Caro Mango', text: 'I simply cannot sleep without it.' },
		{ imgSrc: '../../assets/images/home/they_trusted_us/karl_testimonial.jpeg', alt: 'Second Slide', caption: 'Karlo Tango', text: 'This website changed my life...' },
		{ imgSrc: '../../assets/images/home/they_trusted_us/karl_testimonial.jpeg', alt: 'Third Slide', caption: 'Third slide label', text: 'I use it almost every day!' },
		{ imgSrc: '../../assets/images/home/they_trusted_us/karl_testimonial.jpeg', alt: 'Third Slide', caption: 'Third slide label', text: 'Pong is so nice, I sold my kids to buy it' }
	];

	items.forEach((item, index) =>
	{
		const	carouselItem = createElementWithClass('div', 'carousel-item');
		if (index === 0) carouselItem.classList.add('active');

		const	img = createImage(item.imgSrc, item.alt, 'd-block w-50 img-fluid');
		carouselItem.appendChild(img);

		// Carousel caption
		const	caption = createElementWithClass('div', 'carousel-caption d-none d-md-block');
		const	captionTitle = createElementWithClass('h5', '');
		captionTitle.textContent = item.caption;
		const	captionText = createElementWithClass('p', '');
		captionText.textContent = item.text;

		caption.appendChild(captionTitle);
		caption.appendChild(captionText);
		carouselItem.appendChild(caption);

		carouselInner.appendChild(carouselItem);
	});

	return carouselInner;
}

function createCarouselControl(direction)
{
	const	button = createElementWithClass('button', `carousel-control-${direction}`);
	button.setAttribute('data-bs-target', '#TheyTrustedUsCarousel');
	button.setAttribute('data-bs-slide', direction);
	button.innerHTML = `
		<span class="carousel-control-${direction}-icon" aria-hidden="true"></span>
		<span class="visually-hidden">${direction === 'prev' ? 'Previous' : 'Next'}</span>
	`;
	return button;
}