/***********************************************\
-					IMPORTS						-
\***********************************************/
import { DEBUG }
from '../../main.js';

export function renderFooter()
{
	// Create footer element
	const	footer = document.createElement("footer");

	// Create footer content container
	const	footerContent = document.createElement("div");
	footerContent.classList.add("footer-content");

	// Footer title text
	const	footerTitle = document.createElement("p");
	footerTitle.classList.add("footer-title");
	footerTitle.textContent = "👾 © 2024 Django Déchainé. All rights reserved 👾";

	// Footer links container
	const	footerLinks = document.createElement("div");
	footerLinks.classList.add("footer-links");

	// 'Privacy Policy' link
	const	privacyLink = document.createElement("a");
	privacyLink.classList.add("nav-link");
	privacyLink.href = "/privacy-policy";
	privacyLink.textContent = "Privacy Policy";

	// 'Contact Us' link
	const	contactLink = document.createElement("a");
	contactLink.classList.add("nav-link");
	contactLink.href = "https://youtu.be/dQw4w9WgXcQ";
	contactLink.target = "_blank";
	contactLink.rel = "noopener noreferrer";
	contactLink.textContent = "Contact Us";

	// Append links to the footer container
	footerLinks.appendChild(privacyLink);
	footerLinks.appendChild(contactLink);

	// Assemble footer content
	footerContent.appendChild(footerTitle);
	footerContent.appendChild(footerLinks);
	footer.appendChild(footerContent);

	// Append footer to the body
	document.body.appendChild(footer);
}
