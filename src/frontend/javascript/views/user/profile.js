import { DEBUG } from '../../main.js';

/***********************************************\
 *             RENDERING                       *
 * *********************************************/

export default function renderProfile()
{
    return `
    
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User Profile</title>
    <link rel="stylesheet" href="/path/to/your/css/main.css">
</head>
<body>
    <div class="container">
        <div class="profile-header text-center">
            <h1>My Profile</h1>
        </div>

        <div class="section">
            <h2>User Information</h2>
            <div class="row">
                <div class="col-md-3 text-center">
                    <img src="avatar/default.png" alt="User Avatar" class="avatar img-fluid">
                    <p><strong>Status:</strong> <span class="status-online">Online</span></p>
                </div>
                <div class="col-md-9" id="user-info">
                </div>
            </div>
        </div>

        <div class="friends-list">
            <h2>Friends List</h2>
            <div class="row">
                <div class="col-md-6">
                    <ul class="list-group" id="friends-list-container">
                    </ul>
                </div>
            </div>
        </div>

        <div class="stats-display-section">
            <h2>Stats Display</h2>
            <div class="stats-container" id="stats-container">
            </div>
        </div>

        <div class="match-history-section">
            <h2>Match History</h2>
            <div class="match-history-container" id="match-history-container">
            </div>
        </div>
    </div>

    <script src="/path/to/your/javascript/profile.js"></script>
</body>
</html>
    `;
}


/*** Initialization Function ***/
export function initializeProfile()
{
    if (DEBUG)
        console.log("1. Calling fetchUserData");
    fetchUserData();

    if (DEBUG)
        console.log("2. Calling displayUserData");
    displayUserData();

}




async function fetchUserData()
{
    const token = localStorage.getItem('access_token');
    let response = await fetch('/api/profile/',
    {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    if (response.status === 401)
    {
        const newToken = await refreshToken();
        localStorage.setItem('access_token', newToken); // Update the stored token
        response = await fetch('/api/profile/', { // Retry the original request
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${newToken}`,
            },
        });
    }

    if (!response.ok)
        throw new Error('Network response was not ok');
    return response.json();
}


// src/frontend/javascript/views/user/profile.js

function displayUserData(userData)
{
    if (!userData)
    {
        document.querySelector('.profile-header h1').textContent = `Welcome, Player`;
        document.querySelector('.avatar').src = 'avatar/default.png'; // Specify a default avatar path
        document.querySelector('.status-online').textContent = 'Offline';
        document.querySelector('#user-info').innerHTML = `
            <p><strong>Username:</strong> </p>
            <p><strong>Email Address:</strong> </p>
        `;
        return;
    }

    document.querySelector('.profile-header h1').textContent = `Welcome, ${userData.username}`;
    document.querySelector('.avatar').src = userData.avatar_url;
    document.querySelector('.status-online').textContent = userData.is_online ? 'Online' : 'Offline';
    document.querySelector('.status-online').classList.toggle('status-offline', !userData.is_online);
    document.querySelector('#user-info').innerHTML = `
        <p><strong>Username:</strong> ${userData.username}</p>
        <p><strong>Email Address:</strong> ${userData.email}</p>
    `;
}

async function refreshToken()
{
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken)
        throw new Error('No refresh token found');

    return fetch('/api/token/refresh/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh: refreshToken }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.access) {
            localStorage.setItem('access_token', data.access);
            return data.access;
        }
		else
            throw new Error('Failed to refresh token');
    });
}
