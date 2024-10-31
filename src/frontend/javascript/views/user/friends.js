/***********************************************\
-			IMPORTING VARIABLES/FUNCTIONS		-
\***********************************************/
import { DEBUG }
from '../../main.js';

import { apiRequest }
from './signin.js';

/***********************************************\
*					RENDERING					*
\***********************************************/

export function renderFriendsList()
{
	const	userContainer = document.createElement('div');
	userContainer.setAttribute('id', 'other-users-list');
	userContainer.className = 'container';

	const	friendsTitle = document.createElement('h1');
	friendsTitle.classList.add('friends-title');
	friendsTitle.textContent = 'Friends';
	userContainer.appendChild(friendsTitle);

	// Create a row for the user cards
	const	row = document.createElement('div');
	row.className = 'row row-cols-2 row-cols-lg-5 g-2 g-lg-3';

	getAllUsers()
		.then(async other_users =>
		{
			if (DEBUG)
			{
				console.log('other_users: ', other_users);
				console.log('users length: ', other_users.length);
			}

			for (const	other_user of other_users)
			{
				if (DEBUG)
				{
					console.log('other_user: ', other_user.username);
					console.log('friendship: ', other_user.friendship_status);
					console.log('users length: ', other_users.length);
				}
				const	userCard = await createUserCard(other_user);
				
				// Wrap the userCard in a Bootstrap column
				const	col = document.createElement('div');
				col.className = 'col-6 col-md-3';
				col.appendChild(userCard);

				// Append the column to the row
				row.appendChild(col);
			}
		})
		.catch(error =>
		{
			console.error('Error:', error);
			userContainer.innerHTML = '<p>Failed to load friends page.</p>';
		});

	// Append the row to the user container
	userContainer.appendChild(row);
	return userContainer;
}



async function createUserCard(other_user)
{
	const	card = document.createElement('div');
	card.classList.add('card', 'friends-card');
	

	const	avatar = document.createElement('img');
	avatar.setAttribute('id', 'avatar');
	avatar.classList.add('friends-avatar');
	avatar.setAttribute('alt', 'User Avatar');
	getAvatar(other_user, avatar);
	card.appendChild(avatar);

	const	username = document.createElement('h3');
	username.classList.add('friends-username');
	username.textContent = other_user.username;
	card.appendChild(username);

	const	actionSection = document.createElement('div');
	actionSection.classList.add('actions');

	displayFriend(other_user, actionSection);

	card.appendChild(actionSection);
	return card;
}

async function getAllUsers()
{
	try
	{
		return await apiRequest('/api/users/other-users-list/',
		{
			method: 'GET',
		})
	}
	catch (error)
	{
		console.error('Error:', error);
	}
}

async function sendFriendRequest(other_user_id)
{
	try
	{
		await apiRequest('/api/users/friends/send-friend-request/',
		{
			method: 'POST',
			headers:
			{
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({receiver: other_user_id}),
		})
	}
	catch (error)
	{
		console.error('Error:', error);
	}
}

async function getFriendRequestStatus(other_user_id)
{
	try
	{
		return await apiRequest(`/api/users/friends/friend-request-status/${other_user_id}/`,
		{
			method: 'GET',
		})
	}
	catch (error)
	{
		console.error('Error:', error);
	}
}

async function getRequestID(other_user_id)
{
	try
	{
		return await apiRequest(`/api/users/friends/friend-request-id/${other_user_id}/`,
		{
			method: 'GET',
		})
	}
	catch (error)
	{
		console.error('Error:', error);
	}
}

async function acceptFriendRequest(request_id)
{
	try
	{
		await apiRequest(`/api/users/friends/accept-request/${request_id}/`,
		{
			method: 'POST',
			headers:
			{
				'Content-Type': 'application/json',
			},
		})
	}
	catch (error)
	{
		console.error('Error:', error);
	}
}

async function rejectFriendRequest(request_id)
{
	try
	{
		await apiRequest(`/api/users/friends/reject-request/${request_id}/`,
		{
			method: 'POST',
			headers:
			{
				'Content-Type': 'application/json',
			},
		})
	}
	catch (error)
	{
		console.error('Error:', error);
	}
}

async function removeFriend(other_user_id)
{
	try
	{
		await apiRequest(`/api/users/friends/remove-friend/${other_user_id}/`,
		{
			method: 'POST',
			headers:
			{
				'Content-Type': 'application/json',
			},
		})
	}
	catch (error)
	{
		console.error('Error:', error);
	}
}

function waitingForResponse(actionSection)
{
	const	statusText = document.createElement('p');
	statusText.classList.add('friends-text');
	statusText.textContent = 'Request pending';
	actionSection.appendChild(statusText);
}

async function respondToRequest(other_user, actionSection)
{
	const	request_id = await getRequestID(other_user.id);
		
	const	friendText = document.createElement('p');
	friendText.classList.add('friends-text');
	friendText.textContent = `${other_user.username} sent you a friend request!`;
	actionSection.appendChild(friendText);

	const	acceptButton = document.createElement('button');
	acceptButton.classList.add('btn', 'btn-home', 'accept-button');
	acceptButton.textContent = 'Accept';
	acceptButton.onclick = () => acceptFriendRequest(request_id);
	actionSection.appendChild(acceptButton);

	const	rejectButton = document.createElement('button');
	rejectButton.textContent = 'Reject';
	rejectButton.classList.add('btn', 'btn-home', 'reject-button');
	rejectButton.onclick = () => rejectFriendRequest(request_id);
	actionSection.appendChild(rejectButton);
}

function sendingRequest(other_user, actionSection)
{
	const	addButton = document.createElement('button');
	addButton.classList.add('btn', 'btn-home', 'add-button');
	addButton.textContent = 'Send friend request';
	addButton.onclick = () => sendFriendRequest(other_user.id);
	actionSection.appendChild(addButton);
}

function alreadyFriends(other_user, actionSection)
{
	const	friendText = document.createElement('p');
	friendText.classList.add('already-friends-text');
	friendText.textContent = 'You are already friends!';
	actionSection.appendChild(friendText);

	const	online_status = document.createElement('p');
	if (other_user.online_status == true)
	{
		online_status.classList.remove('offline-friends');
		online_status.classList.add('online-friends');
		online_status.textContent = 'Online';
	}
	else
	{
		online_status.classList.remove('online-friends');
		online_status.classList.add('offline-friends');
		online_status.textContent = 'Offline';
	}
	actionSection.appendChild(online_status);

	const	removeButton = document.createElement('button');
	removeButton.classList.add('btn', 'btn-home', 'remove-button');
	removeButton.textContent = 'Remove friend';
	removeButton.onclick = () => removeFriend(other_user.id);
	actionSection.appendChild(removeButton);
}

function getAvatar(other_user, avatar)
{
	apiRequest(`/api/users/getFriendAvatar/${other_user.id}`,
	{
		method: 'GET',
	})
	.then(userData =>
	{
		if (userData || DEBUG)
			console.log(userData);
		else
			console.log('No user data found');

		avatar.src = `data:image/png;base64,${userData.avatar}`;
	})
	.catch(error =>
	{
		console.error('Error fetching user data:', error);
	})
}

async function displayFriend(other_user, actionSection)
{
	if (other_user.friendship_status === 'not_friends')
		{
			const	friend_request_status = await getFriendRequestStatus(other_user.id);
			if (friend_request_status == 'waiting_for_response')
			{
				waitingForResponse(actionSection);
			}
			else if (friend_request_status == 'respond_to_request')
			{
				respondToRequest(other_user, actionSection);
			}
			else
			{
				sendingRequest(other_user, actionSection);
			}
		}
		else
		{
			alreadyFriends(other_user, actionSection);
		}
}