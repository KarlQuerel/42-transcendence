/***********************************************\
-					IMPORTS						-
\***********************************************/
import { DEBUG, navigateTo }
from '../../main.js';

import { resetTournament, setupEventListeners }
from './pong.js';

/***********************************************\
-				CREATING ELEMENTS				-
\***********************************************/
export function createContainer()
{
	const	container = document.createElement('div');
	container.id = 'pong-page';
	container.className = 'container-fluid p-0';
	return container;
}

export function createVideo()
{
	const	video = document.createElement('video');
	video.id = 'background-video';
	video.autoplay = true;
	video.muted = true;
	video.loop = true;

	const	source = document.createElement('source');
	source.src = '../../../assets/images/pong/tunnel_background.mp4';
	source.type = 'video/mp4';
	video.appendChild(source);

	return video;
}

export function createOverlay()
{
	const	overlay = document.createElement('div');
	overlay.id = 'menu-overlay';
	overlay.className = 'menu-overlay';

	const	menuButtonsContainer = document.createElement('div');
	menuButtonsContainer.className = 'menu-buttons-container';

	const	rowContainer = document.createElement('div');
	rowContainer.className = 'row-container';

	const	singlePlayerButton = createMenuButton('singleplayer-button', 'Single Player', '../../../assets/images/pong/menu/single_player.gif');
	const	twoPlayerButton = createMenuButton('twoplayer-button', 'Two Players', '../../../assets/images/pong/menu/two_players.gif');
	const	tournamentButton = createTournamentButton();
	const	howToPlayButton = createHowToPlayButton();
	const	howToPlayCard = createHowToPlayCard();

	rowContainer.appendChild(singlePlayerButton);
	rowContainer.appendChild(twoPlayerButton);

	menuButtonsContainer.appendChild(rowContainer);
	menuButtonsContainer.appendChild(tournamentButton);
	menuButtonsContainer.appendChild(howToPlayButton);
	menuButtonsContainer.appendChild(howToPlayCard);

	overlay.appendChild(menuButtonsContainer);

	return overlay;
}

export function createMenuButton(id, text, gifSrc)
{
	const	button = document.createElement('button');
	button.id = id;
	button.className = 'menu-button btn';
	button.textContent = text;

	const	gif = document.createElement('img');
	gif.src = gifSrc;
	gif.alt = `${text} GIF`;
	gif.className = 'menu-gif';

	button.appendChild(gif);
	return button;
}

export function createTournamentButton()
{
	const	button = document.createElement('button');
	button.id = 'tournament-button';
	button.className = 'menu-button btn';
	button.textContent = 'Tournament';

	const	gif1 = document.createElement('img');
	gif1.src = '../../../assets/images/pong/menu/tournament_blue.gif';
	gif1.alt = 'Tournament GIF 1';
	gif1.className = 'menu-gif tournament-gif-left';

	const	gif2 = document.createElement('img');
	gif2.src = '../../../assets/images/pong/menu/tournament_red.gif';
	gif2.alt = 'Tournament GIF 2';
	gif2.className = 'menu-gif tournament-gif-right';

	button.appendChild(gif1);
	button.appendChild(gif2);
	
	return button;
}

export function createHowToPlayButton()
{
	const	button = document.createElement('button');
	button.className = 'btn btn-home btn-howtoplay';
	button.textContent = 'How to Play';
	button.addEventListener('click', () =>
	{
		const	card = document.getElementById('how-to-play-card');
		if (card)
		{
			card.classList.toggle('show');
		}
	});

	return button;
}

export function createHowToPlayCard()
{
	const	cardDiv = document.createElement('div');
	cardDiv.id = 'how-to-play-card';
	cardDiv.className = 'card how-to-play-card';

	const	container = document.createElement('div');
	container.className = 'container';

	const	row = document.createElement('div');
	row.className = 'row';

	const	sections =
	[
		{
			title: 'Left Player',
			text: 'Press W or S to move',
			gifs: ['../../../assets/images/pong/how_to_play/W.gif', '../../../assets/images/pong/how_to_play/S.gif']
		},
		{
			title: 'Right Player',
			text: 'Press the UP or DOWN arrows to move',
			gifs: ['../../../assets/images/pong/how_to_play/UP.gif', '../../../assets/images/pong/how_to_play/DOWN.gif']
		},
		{
			title: 'Pause',
			text: 'Press ESC or P to pause',
			gifs: ['../../../assets/images/pong/how_to_play/ESC.gif', '../../../assets/images/pong/how_to_play/P.gif']
		}
	];

	sections.forEach(section =>
	{
		const	textCol = document.createElement('div');
		textCol.className = 'col';
		const	title = document.createElement('h6');
		title.textContent = section.title;
		const	text = document.createElement('p');
		text.textContent = section.text;
		textCol.appendChild(title);
		textCol.appendChild(text);

		const	gifCol = document.createElement('div');
		gifCol.className = 'col d-flex justify-content-center';
		section.gifs.forEach(src =>
		{
			const	gif = createCardGif(src, `How to Play ${section.title} GIF`);
			gif.classList.add('img-fluid', 'how-to-play-gif');
			gifCol.appendChild(gif);
		});

		row.appendChild(textCol);
		row.appendChild(gifCol);

		const	rowBreak = document.createElement('div');
		rowBreak.className = 'w-100';
		row.appendChild(rowBreak);
	});

	container.appendChild(row);
	cardDiv.appendChild(container);

	return cardDiv;
}

export function createCardGif(src, alt)
{
	const	gif = document.createElement('img');
	gif.src = src;
	gif.alt = alt;
	gif.className = 'img-fluid';
	return gif;
}

export function createWinningMessage()
{
	const	winningMessage = document.createElement('div');
	winningMessage.id = 'winning-message';
	winningMessage.className = 'hidden';
	return winningMessage;
}

export function createRematchButton()
{
	const	rematchButton = document.createElement('button');
	rematchButton.className = 'btn btn-home';
	rematchButton.id = 'rematch-button';
	rematchButton.appendChild(document.createTextNode('Rematch'));
	return rematchButton;
}

export function createBackToMenuButton()
{
	const	backButton = document.createElement('button');
	backButton.className = 'btn btn-home';
	backButton.id = 'back-to-menu-button';

	backButton.appendChild(document.createTextNode('Back to Menu'));

	const	gifElement = document.createElement('img');
	gifElement.src = '../../../assets/images/pong/menu/back_to_menu.gif';
	gifElement.alt = 'Back to Menu GIF';
	gifElement.className = 'back-to-menu-gif';
	gifElement.style.display = 'none';

	backButton.appendChild(gifElement);
	
	backButton.onmouseover = () =>
	{
		gifElement.style.display = 'block';
	};

	backButton.onmouseout = () =>
	{
		gifElement.style.display = 'none';
	};

	backButton.onclick = () =>
	{
		resetTournament();
		navigateTo('/pong');
	};
	
	return backButton;
}

export function createCanvas()
{
	const	canvas = document.createElement('canvas');
	canvas.id = 'pongCanvas';
	return canvas;
}

export function createPausedGifContainer()
{
	const	container = document.createElement('div');
	container.id = 'paused-gif-container';
	container.className = 'd-flex justify-content-center align-items-center hidden';

	const	pausedGif = document.createElement('img');
	pausedGif.id = 'paused-gif';
	pausedGif.src = '../../../assets/images/pong/paused.gif';
	pausedGif.alt = 'Paused GIF';

	container.appendChild(pausedGif);
	return container;
}