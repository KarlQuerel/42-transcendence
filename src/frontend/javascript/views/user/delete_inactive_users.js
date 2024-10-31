/***********************************************\
-		   IMPORTING VARIABLES/FUNCTIONS		-
\***********************************************/
import { DEBUG }
from '../../main.js';

import { getCookie }
from './signin.js';

/***********************************************\
-		   DELETE INACTIVE USERS FUNCTIONS		-
\***********************************************/

export async function manageInactiveUsers()
{
    let inactiveUsersID = await getInactiveID();
    deleteInactiveUsers(inactiveUsersID);
    deleteInactiveUsersFriendsAndRequests(inactiveUsersID);
}

export async function getInactiveID()
{
    try
    {
        const response = await fetch('/api/users/getInactiveUsersID/', {
            method: 'GET',
            headers: {
                'X-CSRFToken': getCookie('csrftoken'),
                'Content-Type': 'application/json',
        }});

        const data = await response.json();
        return data;

    }
    catch (error)
    {
        console.error('Error:', error);
    };
}


export async function deleteInactiveUsers(inactiveUsersID)
{
    try
    {
        const response = await fetch('/api/dashboard/deleteGameHistoryInactiveUsers/', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ inactiveUsersID })
        });
    }
    catch (error)
    {
        console.error('Failed to delete inactive users:', error);
    };
}


export async function deleteInactiveUsersFriendsAndRequests(inactiveUsersID)
{
    // delete inactive users' friend requests
    try
    {
        const response = await fetch('api/users/friends/DeleteInactiveUsersFriendRequests/', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ inactiveUsersID })
        });
    }
    catch (error)
    {
        console.error('Failed to delete inactive users friend requests:', error);
    };

    // delete inactive users' friends 
    try
    {
        const response = await fetch('api/users/deleteInactiveUsersFriends/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ inactiveUsersID })
        });
    }
    catch (error)
    {
        console.error('Failed to delete inactive users friends:', error);
    };
}
