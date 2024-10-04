/***********************************************\
-		   IMPORTING VARIABLES/FUNCTIONS		-
\***********************************************/
import { DEBUG } from '../../main.js';
import { apiRequest } from './signin.js';
import { getIdentifier, checkIdentifierType} from './signup.js';
import { initializeChangePassword } from './change_password.js';

/***********************************************\
*                   RENDERING                   *
\***********************************************/

export default function renderProfile()
{
    // Create a container for the profile information
    const container = document.createElement('div');
    container.setAttribute('id', 'profile-container');

    // Create title for the profile
    const profileTitle = document.createElement('h1');
    profileTitle.textContent = 'My Profile';

    // Create an image element for the avatar
    const avatarElement = document.createElement('img');
    avatarElement.setAttribute('id', 'avatar');
    avatarElement.setAttribute('alt', 'User Avatar');
    avatarElement.style.width = '150px';
    avatarElement.style.height = '150px';

    container.appendChild(avatarElement);


    /********** PERSONAL INFORMATION **********/


    // Create section for personal information
    const personalInfoSection = document.createElement('section');
    personalInfoSection.setAttribute('id', 'personal-info');

    const personalInfoTitle = document.createElement('h2');
    personalInfoTitle.textContent = 'Personal Information';

    // Create elements for user data
    const firstNameElement = document.createElement('p');
    firstNameElement.setAttribute('id', 'first_name');

    const lastNameElement = document.createElement('p');
    lastNameElement.setAttribute('id', 'last_name');

    const usernameElement = document.createElement('p');
    usernameElement.setAttribute('id', 'username');
    
    const dobElement = document.createElement('p');
    dobElement.setAttribute('id', 'date_of_birth');

    const passwordElement = document.createElement('p');
    passwordElement.setAttribute('id', 'password');

    const changePasswordButton = document.createElement('button');
    changePasswordButton.setAttribute('id', 'change-password-button');
    changePasswordButton.textContent = 'Change Password';

    const emailElement = document.createElement('p');
    emailElement.setAttribute('id', 'email');

    // Append elements to container
    personalInfoSection.appendChild(personalInfoTitle);
    personalInfoSection.appendChild(firstNameElement);
    personalInfoSection.appendChild(lastNameElement);
    personalInfoSection.appendChild(usernameElement);
    personalInfoSection.appendChild(dobElement);
    personalInfoSection.appendChild(passwordElement);
    personalInfoSection.appendChild(changePasswordButton);
    personalInfoSection.appendChild(emailElement);

    // Create a logout button
    const logoutButton = document.createElement('button');
    logoutButton.setAttribute('id', 'logout-button');
    logoutButton.textContent = 'Log Out';

    // Create an Update Profile button
    const updateProfileButton = document.createElement('button');
    updateProfileButton.setAttribute('id', 'update-profile-button');
    updateProfileButton.textContent = 'Update profile';

    // Append all elements to container
    container.appendChild(profileTitle);
    container.appendChild(personalInfoSection);
    container.appendChild(logoutButton);
    container.appendChild(updateProfileButton);

    // Fetch user data and display it

    let userData_edit = null;

    fetchUserData()
        .then(userData =>
        {
            if (userData || DEBUG)
                console.log(userData);
            else
                console.log('No user data found');

            userData_edit = userData;

            firstNameElement.textContent = `First Name: ${userData.first_name}`;
            lastNameElement.textContent = `Last Name: ${userData.last_name}`;
            usernameElement.textContent = `Username: ${userData.username}`;
            dobElement.textContent = `Date of Birth: ${userData.date_of_birth || 'Not provided'}`;
            emailElement.textContent = `Email: ${userData.email}`;

            // Password display in asterisks
            const passwordLength = 8;
            const numAsterisks = Math.max(0, passwordLength);
            const passwordText = `Password: ${'*'.repeat(numAsterisks)}`;
            passwordElement.textContent = passwordText;

            avatarElement.src = `data:image/png;base64,${userData.avatar}`;

        })
        .catch(error =>
        {
            console.error('Error fetching user data:', error);
            container.innerHTML = '<p>Failed to load profile data.</p>';
        });


        // Event listener for change password button
        changePasswordButton.addEventListener('click', () =>
        {
            window.location.href = '/change-password';
        });

        

        /********** UPDATE PROFILE **********/

        // Event listener for update profile button
        updateProfileButton.addEventListener('click', () =>
        {
            if (DEBUG)
                console.log('Update profile button clicked.');

            firstNameElement.innerHTML = `<label for="first_name_input">First Name:</label><input type="text" id="first_name_input" value="${userData_edit.first_name}">`;
            lastNameElement.innerHTML = `<label for="last_name_input">Last Name:</label><input type="text" id="last_name_input" value="${userData_edit.last_name}">`;
            usernameElement.innerHTML = `<label for="username_input">Username:</label><input type="text" id="username_input" value="${userData_edit.username}">`;
            dobElement.innerHTML = `<label for="dob_input">Date of Birth:</label><input type="date" id="dob_input" value="${userData_edit.date_of_birth}">`;
            emailElement.innerHTML = `<label for="email_input">Email:</label><input type="email" id="email_input" value="${userData_edit.email}">`;

            // File input for avatar
            if (!document.getElementById('avatar_input'))
            {
                // Label
                const avatarLabel = document.createElement('label');
                avatarLabel.setAttribute('for', 'avatar_input');
                avatarLabel.textContent = 'Upload my avatar image:';
                personalInfoSection.appendChild(avatarLabel);

                // Button
                const avatarInput = document.createElement('input');
                avatarInput.setAttribute('type', 'file');
                avatarInput.setAttribute('id', 'avatar_input');
                personalInfoSection.appendChild(avatarInput);
            }

            if (DEBUG)
                console.log('Avatar button created.');

            // Save Button
            if (!document.getElementById('save-profile-button'))
            {
                const saveButton = document.createElement('button');
                saveButton.setAttribute('id', 'save-profile-button');
                saveButton.textContent = 'Save';
                personalInfoSection.appendChild(saveButton);

                if (DEBUG)
                    console.log('Save button created.');

                saveButton.addEventListener('click', (event) => {
                    event.preventDefault();
                    if (DEBUG)
                        console.log('Entering addEventListener.');
                    res = verifyProfileChanges();
                    if(res == true)
                    {
                        const avatarFile = document.getElementById('avatar_input').files[0];
                        saveProfileChanges(username_id, password, email_id, date_of_birth, first_name, last_name, avatar_id);
                    }
                });
            }
        });


        /***************** FRIENDS *****************/
        
        
        
        /************** MATCH HISTORY **************/
        
        // 1v1 games, dates, and relevant details, accessible to logged-in users.
        



        /***************** LOG OUT *****************/

        // Event listener for logout button
        logoutButton.addEventListener('click', () => {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            window.location.href = '/sign-in';
        });

    return container;
}



/***********************************************\
*              FETCH DATA FUNCTIONS             *
\***********************************************/

// Fetch user data from the API
export async function fetchUserData() {
    return apiRequest('/api/users/currentlyLoggedInUser/', {
        method: 'GET',
    })
    .catch(error => {
        console.error('Error fetching user profile data:', error);
    });
}


// // Fetch game history data from the API
// async function fetchGameHistoryData() {
//     try {
//         const userData = await apiRequest('/api/dashboard/getGameHistory/', {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         });
//         if (DEBUG) {
//             console.log("userData = ", userData);
//         }
//         return userData;
//     } catch (error) {
//         console.error('Error: fetch userData', error);
//         throw error; // Re-throw the error
//     }
// }


async function verifyProfileChanges()
{
    if (DEBUG)
        console.log('Verifying profile changes...');

    const firstName = document.getElementById('first_name_input').value;
    const lastName = document.getElementById('last_name_input').value;
    const username = document.getElementById('username_input').value;
    const dob = document.getElementById('dob_input').value;
    const email = document.getElementById('email_input').value;
    const avatarFile = document.getElementById('avatar_input').files[0];

    // First name
    let first_name = getIdentifier('first_name_input');
    let first_name_type = checkIdentifierType(first_name, 'first_name_input');

    // Last name
    let last_name = getIdentifier('last_name_input');
    let last_name_type = checkIdentifierType(last_name, 'last_name_input');

    // Username
    let username_id = getIdentifier('username_input');
    let username_type = checkIdentifierType(username, 'username_input');

    // Date of birth
    let date_of_birth = getIdentifier('date_of_birth_input');
    let date_of_birth_type = checkIdentifierType(date_of_birth, 'date_of_birth_input');

    // Email
    let email_id = getIdentifier('email_input');
    let email_type = checkIdentifierType(email, 'email_input');

    // Avatar
    let avatar_id = getIdentifier('avatar_input');
    let avatar_type = checkIdentifierType(avatarFile, 'avatar_input');

    if (DEBUG)
        console.log('First name:', first_name, first_name_type);
        console.log('Last name:', last_name, last_name_type);
        console.log('Username:', username_id, username_type);
        console.log('Date of birth:', date_of_birth, date_of_birth_type);
        console.log('Email:', email_id, email_type);
        console.log('Avatar:', avatar_id, avatar_type);

    if (!allValuesAreValid(first_name_type, last_name_type, username_type, date_of_birth_type, password_type, email_type, avatar_type))
    {
        if (DEBUG)
            console.log('Profile changes are invalid.');

        sendErrorToFrontend(first_name_type, last_name_type, username_type, date_of_birth_type, password_type, email_type, avatar_type);
        return false;
    }
    else
        return true;
        // saveProfileChanges(username_id, password, email_id, date_of_birth, first_name, last_name, avatar_id);
}



async function saveProfileChanges(username, password, email, date_of_birth, first_name, last_name, avatarFile)
{
    const formData = new FormData();
    formData.append('first_name', first_name);
    formData.append('last_name', last_name);
    formData.append('username', username);
    formData.append('date_of_birth', date_of_birth);
    formData.append('email', email);

    if (avatarFile) {
        formData.append('avatar', avatarFile);
    }

    try
    {
        const response = await apiRequest('/api/users/updateProfile/', {
            method: 'PUT',
            body: formData,
            // headers: {
            //     'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            // }
        });

        if (response.ok) {
            console.log('Profile updated successfully.');
            window.location.reload();
        } else {
            const errorData = await response.json();
            handleProfileErrors(errorData);
        }
    }
    catch (error)
    {
        console.error('Error updating profile:', error);
        alert('An error occurred while updating the profile.');
    };
}

    // // FormData object to handle image upload and form data
    // const formData = new FormData();
    // formData.append('first_name', firstName);
    // formData.append('last_name', lastName);
    // formData.append('username', username);
    // formData.append('date_of_birth', dob);
    // formData.append('email', email);

    // if (avatarFile)
    //     formData.append('avatar', avatarFile);

    // try
    // {
    //     const response = await apiRequest('/api/users/updateProfile/',
    //     {
    //         method: 'POST',
    //         body: formData,  // Use FormData to include both the avatar file and form fields
    //         headers: {
    //             'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    //         }
    //     });

    //     if (response.ok) 
    //     {
    //         // Successful profile update
    //         console.log('Profile updated successfully.');
    //         window.location.reload();  // Reload to reflect changes
    //     }
    //     else
    //     {
    //         // Handle error (username/email already in use, etc.)
    //         const errorData = await response.json();
    //         handleProfileErrors(errorData);
    //     }
    // }
    // catch (error)
    // {
    //     console.error('Error updating profile:', error);
    // }
// }

function handleProfileErrors(errors)
{

    if (errors.username) {
        console.log('Username is already in use.');
        // Display error message next to the username field
    }
    if (errors.email) {
        console.log('Email is already in use.');
        // Display error message next to the email field
    }
}


// OLD CODE
// async function fetchUserData()
// {
//     const token = localStorage.getItem('access_token');

//     if (!token)
//         throw new Error('No access token found');

//     return fetch('/api/users/currentlyLoggedInUser/',
//     {
//         method: 'GET',
//         headers: {
//             'Authorization': 'Bearer ' + token, // Add JWT to the Authorization header
//         }
//     })
//     .then(response =>
//     {
//         if (!response.ok)
//             throw new Error('Failed to fetch user data');
//         return response.json();
//     })
//     .then(data =>
//     {
//         if (DEBUG)
//             console.log('User data fetched:', data);
//         return data;
//     });
// }




// async function refreshToken()
// {
//     const refreshToken = localStorage.getItem('refresh_token');
//     if (!refreshToken)
//         throw new Error('No refresh token found');

//     return fetch('/api/token/refresh/', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ refresh: refreshToken }),
//     })
//     .then(response => response.json())
//     .then(data => {
//         if (data.access) {
//             localStorage.setItem('access_token', data.access);
//             return data.access;
//         }
// 		else
//             throw new Error('Failed to refresh token');
//     });
// }







