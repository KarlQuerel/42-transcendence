/***********************************************\
-					IMPORTS						-
\***********************************************/
import { DEBUG } from '../../main.js';

/***********************************************\
-				IMPORTING SCRIPTS				-
\***********************************************/
import { createElementWithClass, createImage, createTextElement,
createCardHeader, createButton }
from './utils.js'

/***********************************************\
-				VARIABLES						-
\***********************************************/
let	buttonsDisabled = false;

/***********************************************\
-					BUTTONS						-
\***********************************************/
export function createWhatIsPongButton()
{
	return createButtonWithListener('What is Pong?', '#multiCollapseExample1', 'true');
}

export function createTheTeamButton()
{
	return createButtonWithListener('The Team', '#multiCollapseExample2', 'false');
}

export function createButtonWithListener(text, targetId, expanded)
{
	const	button = createButton(
	{
		className: 'btn btn-home',
		type: 'button',
		text: text,
		dataToggle: 'collapse',
		dataTarget: targetId,
		ariaExpanded: expanded,
		ariaControls: targetId
	});

	button.addEventListener('click', () =>
	{
		// moveButtonToCenter(button); // KARL TODO FIX IT
		toggleButtons(text);
	});

	return button;
}

function toggleButtons(clickedButton)
{
	if (buttonsDisabled)
	{
		enableButtons();
		buttonsDisabled = false;
	}
	else
	{
		disableOtherButtons(clickedButton);
		buttonsDisabled = true;
	}
}

function disableOtherButtons(clickedButton)
{
	const	buttons = ['What is Pong?', 'The Team'];

	buttons.forEach(buttonText =>
	{
		if (buttonText !== clickedButton)
		{
			const	buttonElement = Array.from(document.getElementsByClassName('btn btn-home')).find(btn => btn.textContent === buttonText);
			if (buttonElement)
			{
				buttonElement.disabled = true;
				buttonElement.style.display = 'none';
			}
		}
	});
}

function enableButtons()
{
	const	buttons = Array.from(document.getElementsByClassName('btn btn-home'));
	buttons.forEach(button =>
	{
		button.disabled = false;
		button.style.display = 'inline-block';
	});
}