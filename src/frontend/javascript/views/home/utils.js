/***********************************************\
-					IMPORTS						-
\***********************************************/
import { DEBUG } from '../../main.js';

/***********************************************\
-					UTILS						-
\***********************************************/
export function createElementWithClass(tag, className)
{
	const	element = document.createElement(tag);
	element.className = className;
	return element;
}

export function createImage(src, alt, className)
{
	const	img = document.createElement('img');
	img.src = src;
	img.alt = alt;
	img.className = className;
	return img;
}

export function createTextElement(html)
{
	const	p = document.createElement('p');
	p.innerHTML = html;
	return p;
}

export function createCardHeader(button, headerId)
{
	const	cardHeader = createElementWithClass('div', 'card-header');
	cardHeader.id = headerId;
	cardHeader.appendChild(button);
	return cardHeader;
}

export function createButton({ className, type, text, dataToggle, dataTarget, ariaExpanded, ariaControls, dataDismiss, href, fontSize, padding, target })
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