/***********************************************\
-		   IMPORTING VARIABLES/FUNCTIONS		-
\***********************************************/
import { DEBUG } from '../../main.js';
import { apiRequest } from './signin.js';

/***********************************************\
*                   RENDERING                   *
\***********************************************/

export default function renderFriendsList()
{	
	const userContainer = document.createElement('div');
	userContainer.setAttribute('id', 'users-list');
	
	const friendsTitle = document.createElement('h1');
	friendsTitle.textContent = 'Friends';

	getAllUsers()
		.then(async other_users =>
		{
			if (DEBUG) {
				console.log('other_users: ', other_users);
				console.log('users length: ', other_users.length);
			}
			
			for (const other_user of other_users){
				if (DEBUG) {
					console.log('other_user: ', other_user.username);
					console.log('friendship: ', other_user.friendship_status);
					console.log('users length: ', other_users.length);
				}
				const userCard = await createUserCard(other_user);
				userContainer.appendChild(userCard);
			}
		})
		.catch(error => {
            console.error('Error:', error);
            userContainer.innerHTML = '<p>Failed to load friends page.</p>';
		});
	
	return userContainer;
}

async function createUserCard(other_user)
{
	const card = document.createElement('div');
	card.classList.add('user-card');

    const avatar = document.createElement('img');
    avatar.setAttribute('id', 'avatar');
    avatar.setAttribute('alt', 'User Avatar');
    avatar.style.width = '150px';
    avatar.style.height = '150px';
	getAvatar(other_user, avatar);
	card.appendChild(avatar);

	const username = document.createElement('h3');
	username.textContent = other_user.username;
	card.appendChild(username);

	const actionSection = document.createElement('div');
	actionSection.classList.add('actions');

	displayFriend(other_user, actionSection);

	card.appendChild(actionSection);
	return card;
}

async function getAllUsers()
{
	try {
		return await apiRequest('/api/users/users-list/', {
			method: 'GET',
		})
	} catch (error) {
		console.error('Error:', error);
	}
}

async function sendFriendRequest(other_user_id)
{
	try {
		await apiRequest('/api/users/friends/send-friend-request/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({receiver: other_user_id}),
		})
	} catch (error) {
		console.error('Error:', error);
	}
}

async function getFriendRequestStatus(other_user_id)
{
	try {
		return await apiRequest(`/api/users/friends/friend-request-status/${other_user_id}/`, {
			method: 'GET',
		})
	} catch (error) {
		console.error('Error:', error);
	}
}

async function getRequestID(other_user_id)
{
	try {
		return await apiRequest(`/api/users/friends/friend-request-id/${other_user_id}/`, {
			method: 'GET',
		})
	} catch (error) {
		console.error('Error:', error);
	}
}

async function acceptFriendRequest(request_id)
{
	try {
		await apiRequest(`/api/users/friends/accept-request/${request_id}/`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
		})
	} catch (error) {
		console.error('Error:', error);
	}
}

async function rejectFriendRequest(request_id)
{
	try {
		await apiRequest(`/api/users/friends/reject-request/${request_id}/`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
		})
	} catch (error) {
		console.error('Error:', error);
	}
}

async function removeFriend(other_user_id)
{
	try {
		await apiRequest(`/api/users/friends/remove-friend/${other_user_id}/`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
		})
	} catch (error) {
		console.error('Error:', error);
	}
}

function waitingForResponse(actionSection)
{
	const statusText = document.createElement('p');
	statusText.textContent = 'Request pending';
	actionSection.appendChild(statusText);
}

async function respondToRequest(other_user, actionSection)
{
	const request_id = await getRequestID(other_user.id);
		
	const friendText = document.createElement('p');
	friendText.textContent = `${other_user.username} sent you a friend request!`;
	actionSection.appendChild(friendText);

	const acceptButton = document.createElement('button');
	acceptButton.textContent = 'Accept';
	acceptButton.onclick = () => acceptFriendRequest(request_id);
	actionSection.appendChild(acceptButton);

	const rejectButton = document.createElement('button');
	rejectButton.textContent = 'Reject';
	rejectButton.onclick = () => rejectFriendRequest(request_id);
	actionSection.appendChild(rejectButton);
}

function sendingRequest(other_user, actionSection)
{
	const addButton = document.createElement('button');
	addButton.textContent = 'Send friend request';
	addButton.onclick = () => sendFriendRequest(other_user.id);
	actionSection.appendChild(addButton);
}

function alreadyFriends(other_user, actionSection)
{
	const friendText = document.createElement('p');
	friendText.textContent = 'You are already friends!';
	actionSection.appendChild(friendText);

	const online_status = document.createElement('p');
	if (other_user.online_status == true)
	{
		online_status.textContent = 'Online status: online'; //HERE KARL mettre "online" en vert
	}
	else
	{
		online_status.textContent = 'Online status: offline'; //HERE KARL mettre "offline" en rouge
	}
	actionSection.appendChild(online_status);

	const removeButton = document.createElement('button');
	removeButton.textContent = 'Remove friend';
	removeButton.onclick = () => removeFriend(other_user.id);
	actionSection.appendChild(removeButton);
}

function getAvatar(other_user, avatar)
{
	apiRequest(`/api/users/getFriendAvatar/${other_user.id}`, {
		method: 'GET',
	})
	.then(userData =>{
		if (userData || DEBUG)
			console.log(userData);
		else
			console.log('No user data found');

		avatar.src = `data:image/png;base64,${userData.avatar}`;
	})
	.catch(error => {
		console.error('Error fetching user data:', error);
	})
}

async function displayFriend(other_user, actionSection)
{
	if (other_user.friendship_status === 'not_friends')
		{
			const friend_request_status = await getFriendRequestStatus(other_user.id);
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