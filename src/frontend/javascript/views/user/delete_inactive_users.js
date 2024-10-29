/***********************************************\
-		   IMPORTING VARIABLES/FUNCTIONS		-
\***********************************************/
import { DEBUG }
from '../../main.js';

/***********************************************\
-		   DELETE INACTIVE USERS FUNCTIONS		-
\***********************************************/

export async function manageInactiveUsers()
{
    let inactiveUsersID = await getInactiveID();
    deleteInactiveUsers(inactiveUsersID);
}

export async function getInactiveID()
{
    try
    {
        const response = await fetch('/api/users/getInactiveUsersID/', {
            method: 'GET',
            headers: {
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
        const response = await fetch('/api/users/deleteInactiveUsers/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ inactiveUsersID })
        });

        if (DEBUG)
            console.log('Inactive users deleted successfully.');
    }
    catch (error)
    {
        console.error('Failed to delete inactive users:', error);
    };
}
