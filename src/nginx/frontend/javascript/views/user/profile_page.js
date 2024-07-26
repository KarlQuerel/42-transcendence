document.addEventListener('DOMContentLoaded', function() {
    loadUserData();
    loadFriendsList();
    setupEventListeners();
});



function loadUserData() {
    fetch('/api/profile/')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(userData => {
            displayUserData(userData);
        })
        .catch(error => console.error('Error fetching user data:', error));
}

function displayUserData(userData) {
    document.querySelector('.profile-header h1').textContent = `Welcome, ${userData.username}`;
    document.querySelector('.avatar').src = userData.avatar_url;
    document.querySelector('.status-online').textContent = userData.is_online ? 'Online' : 'Offline';
    document.querySelector('.status-online').classList.toggle('status-offline', !userData.is_online);
    document.querySelector('.col-md-9').innerHTML = `
        <p><strong>Username:</strong> ${userData.username}</p>
        <p><strong>Tournament Display Name:</strong> ${userData.display_name}</p>
        <p><strong>Email Address:</strong> ${userData.email}</p>
    `;
}



function displayFriendsList(friendsData) {
    const friendsListContainer = document.getElementById('friends-list-container');
    const pendingRequestsContainer = document.getElementById('pending-requests-container');
    
    friendsListContainer.innerHTML = ''; // Clear existing friends list
    pendingRequestsContainer.innerHTML = ''; // Clear existing pending requests

    friendsData.friends.forEach(friend => {
        const friendItem = document.createElement('li');
        friendItem.className = 'list-group-item';
        friendItem.textContent = friend.username;
        friendsListContainer.appendChild(friendItem);
    });

    friendsData.pendingRequests.forEach(request => {
        const requestItem = document.createElement('li');
        requestItem.className = 'list-group-item';
        requestItem.textContent = request.username;
        pendingRequestsContainer.appendChild(requestItem);
    });
}

function loadFriendsList() {
    fetch('/api/friends/')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(friendsData => {
            displayFriendsList(friendsData);
        })
        .catch(error => console.error('Error fetching friends list:', error));
}


function setupEventListeners() {
    document.getElementById('chart_icon').addEventListener('click', function() {
        $('#chartModal').modal('show');
    });
}
