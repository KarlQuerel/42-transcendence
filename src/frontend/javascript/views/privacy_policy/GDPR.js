/***********************************************\
-			IMPORTING VARIABLES/FUNCTIONS	-
\***********************************************/
import { DEBUG }
from '../../main.js';

export function initGDPRModal()
{
	// Check if the GDPR consent has already been accepted
	const	GDPRAccepted = localStorage.getItem("GDPRAccepted");

	// KARL HERE - MAYBE ADD IT TO LOGOUT ? ASK OTHERS + TO REMOVE LATER - DEBUG
	if (DEBUG)
	{
		localStorage.setItem("GDPRAccepted", "false");
		console.log(GDPRAccepted);
	}

	if (GDPRAccepted === "false" || GDPRAccepted === null)
	{
		const	overlayDiv = document.createElement("div");
		overlayDiv.classList.add("GDPR-overlay");
		
		const	modalDiv = document.createElement("div");
		modalDiv.classList.add("modal", "fade");
		modalDiv.id = "gdprModal";
		modalDiv.tabIndex = -1;
		modalDiv.setAttribute("aria-labelledby", "gdprModalLabel");
		modalDiv.setAttribute("aria-hidden", "true");
		modalDiv.setAttribute("data-bs-backdrop", "static");
		modalDiv.setAttribute("data-bs-keyboard", "false");

		const	dialogDiv = document.createElement("div");
		dialogDiv.classList.add("modal-dialog", "GDPR-dialog");

		const	contentDiv = document.createElement("div");
		contentDiv.classList.add("modal-content", "GDPR-content");

		const	headerDiv = document.createElement("div");
		headerDiv.classList.add("modal-header", "GDPR-header");

		const	title = document.createElement("h5");
		title.classList.add("modal-title", "GDPR-title");
		title.id = "gdprModalLabel";
		title.textContent = "GDPR Consent";

		const	bodyDiv = document.createElement("div");
		bodyDiv.classList.add("modal-body");
		bodyDiv.style.position = 'relative';
		bodyDiv.innerHTML = "This site uses cookies for session management and user authentication.<br><br>Learn more in our Privacy Policy Page.<br><br><br><br><br><br><br><br><br><br><br>Do you accept?";
		// bodyDiv.innerHTML = "Welcome to our site! We use cookies that are strictly necessary for the proper functioning of our website, such as session management and user authentication. These cookies do not collect personal data for advertising or analytics purposes.By continuing to use our website, you agree to the use of these essential cookies, as outlined in our Privacy Policy.<br><br><br><br><br><br><br><br><br><br>Do you accept?";

		const	footerDiv = document.createElement("div");
		footerDiv.classList.add("modal-footer", "GDPR-footer");

		// Privacy Policy
		const	privacyPolicyButton = document.createElement("button");
		privacyPolicyButton.type = "button";
		privacyPolicyButton.classList.add("btn", "btn-primary", "btn-home", "GDPR-button");
		privacyPolicyButton.textContent = "Privacy Policy";

		const	privacyGif = document.createElement("img");
		privacyGif.src = "../../../assets/images/GDPR/privacy.gif";
		privacyGif.classList.add("img-fluid", "GDPR-gif", "priv-gif");

		privacyPolicyButton.onclick = () =>
		{
			// KARL HERE CHECK WITH OTHERS - open a new page OR go straight to the page
			window.open('/privacy-policy', "_blank");
		};

		// Accept
		const	acceptButton = document.createElement("button");
		acceptButton.type = "button";
		acceptButton.classList.add("btn", "btn-secondary", "btn-home", "GDPR-button");
		acceptButton.id = "acceptGDPR";
		acceptButton.textContent = "Accept";

		const	acceptGif = document.createElement("img");
		acceptGif.src = "../../../assets/images/GDPR/GDPR.gif";
		acceptGif.classList.add("img-fluid", "GDPR-gif");

		headerDiv.appendChild(title);
		bodyDiv.appendChild(privacyGif);
		bodyDiv.appendChild(acceptGif);
		contentDiv.appendChild(headerDiv);
		contentDiv.appendChild(bodyDiv);
		footerDiv.appendChild(privacyPolicyButton);
		footerDiv.appendChild(acceptButton);
		contentDiv.appendChild(footerDiv);
		dialogDiv.appendChild(contentDiv);
		modalDiv.appendChild(dialogDiv);
		
		document.body.appendChild(overlayDiv);
		document.body.appendChild(modalDiv);

		const	gdprModal = new bootstrap.Modal(modalDiv);
		gdprModal.show();
		overlayDiv.style.display = 'block';

		privacyPolicyButton.onmouseover = () =>
		{
			privacyGif.style.opacity = '1';
		};

		privacyPolicyButton.onmouseout = () =>
		{
			privacyGif.style.opacity = '0';
		};
		
		acceptButton.onmouseover = () =>
		{
			acceptGif.style.opacity = '1';
		};

		acceptButton.onmouseout = () =>
		{
			acceptGif.style.opacity = '0';
		};

		acceptButton.addEventListener("click", () =>
		{
			localStorage.setItem("GDPRAccepted", "true");
			gdprModal.hide();
			overlayDiv.style.display = 'none';
		});
	}
}