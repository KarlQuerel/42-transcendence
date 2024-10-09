/***********************************************\
-		   IMPORTING VARIABLES/FUNCTIONS		-
\***********************************************/
import { DEBUG } from '../../main.js';
import { apiRequest, getCookie } from './signin.js';
import { getIdentifier, checkIdentifierType, allValuesAreValid, sendErrorToFrontend } from './signup.js';
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
            profileEditMode(userData_edit, personalInfoSection);
        });


        /***************** FRIENDS *****************/
        
        // bouton pour aller sur la page friends
        const friendsButton = document.createElement('button');
        friendsButton.setAttribute('id', 'friends-button');
        friendsButton.textContent = 'Friends';
        container.appendChild(friendsButton);


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


/***********************************************\
*           PROFILE EDIT MODE FUNCTIONS         *
\***********************************************/

async function profileEditMode(userData_edit, personalInfoSection)
{
    // Remove update profile button
    // updateProfileButton.removeChild(updateProfileButton);

    // Profile elements
    const firstNameElement = document.getElementById('first_name');
    const lastNameElement = document.getElementById('last_name');
    const usernameElement = document.getElementById('username');
    const dobElement = document.getElementById('date_of_birth');
    const emailElement = document.getElementById('email');

    // Fields displayed un edit-mode
    firstNameElement.innerHTML = `<label for="first_name_input">First Name:</label><input type="text" id="first_name_input" value="${userData_edit.first_name}">`;
    lastNameElement.innerHTML = `<label for="last_name_input">Last Name:</label><input type="text" id="last_name_input" value="${userData_edit.last_name}">`;
    usernameElement.textContent = `Username: ${userData_edit.username}`;
    dobElement.innerHTML = `<label for="dob_input">Date of Birth:</label><input type="date" id="dob_input" value="${userData_edit.date_of_birth}">`;
    emailElement.innerHTML = `<label for="email_input">Email:</label><input type="email" id="email_input" value="${userData_edit.email}">`;


    // File input for avatar
    if (!document.getElementById('avatar_input'))
    {
        const avatarLabel = document.createElement('label');
        avatarLabel.setAttribute('for', 'avatar_input');
        avatarLabel.textContent = 'Upload my avatar image:';
        personalInfoSection.appendChild(avatarLabel);

        const avatarInput = document.createElement('input');
        avatarInput.setAttribute('type', 'file');
        avatarInput.setAttribute('id', 'avatar_input');
        personalInfoSection.appendChild(avatarInput);
    }

    // Save Button
    const saveButton = document.createElement('button');
    saveButton.setAttribute('id', 'save-profile-button');
    saveButton.textContent = 'Save changes';
    personalInfoSection.appendChild(saveButton);

    saveButton.addEventListener('click', (event) =>
    {
        event.preventDefault();

        // Save new input data in userData_edit
        const updatedFirstName = document.getElementById('first_name_input').value;
        const updatedLastName = document.getElementById('last_name_input').value;
        const updatedDob = document.getElementById('dob_input').value;
        const updatedEmail = document.getElementById('email_input').value;

        userData_edit.first_name = updatedFirstName;
        userData_edit.last_name = updatedLastName;
        userData_edit.dob = updatedDob;
        userData_edit.email = updatedEmail;

        const isValid = verifyProfileChanges();

        if (DEBUG)
            console.log('Updated values are valid:', isValid);

        if (isValid)
        {
            const avatarFile = document.getElementById('avatar_input').files[0];
            saveProfileChanges(userData_edit, avatarFile, personalInfoSection);
        }
    });

}


async function verifyProfileChanges()
{
    // Fetch the values from the input fields
    const firstName = getIdentifier('first_name_input');
    const lastName = getIdentifier('last_name_input');
    const dob = getIdentifier('dob_input');
    const email = getIdentifier('email_input');
    const avatar = getIdentifier('avatar_input');

    if (DEBUG)
    {
        console.log('Verifying profile changes [getIdentifier]...');
        console.log('First name:', firstName);
        console.log('Last name:', lastName);
        console.log('Date of birth:', dob);
        console.log('Email:', email);
        console.log('Avatar:', avatar);
    }

    // Check the types based on validation logic
    const first_name_type = checkIdentifierType(firstName, 'first_name_input');
    const last_name_type = checkIdentifierType(lastName, 'last_name_input');
    const username_type = 'username';
    const date_of_birth_type = checkIdentifierType(dob, 'date_of_birth_input');
    const password_type = 'password';
    const email_type = checkIdentifierType(email, 'email_input');
    const avatar_type = checkIdentifierType(avatar, 'avatar_input');

    if (DEBUG)
    {
        console.log('Verifying profile changes [checkIdentifierType]...');
        console.log('First name:', first_name_type);
        console.log('Last name:', last_name_type);
        console.log('Date of birth:', date_of_birth_type);
        console.log('Email:', email_type);
        console.log('Avatar:', avatar_type);
    }


    // Check if all values are valid
    const allValid = allValuesAreValid(first_name_type, last_name_type, username_type, date_of_birth_type, password_type, email_type, avatar_type);

    if (!allValid)
    {
        if (DEBUG)
            console.log('Profile changes are invalid.');

        // Send error messages to the frontend
        sendErrorToFrontend(first_name_type, last_name_type, username_type, date_of_birth_type, password_type, email_type, avatar_type);
        return false;
    }
    else
    {
        if (DEBUG)
            console.log('Profile changes are valid.');
        return true;
    }
}



async function saveProfileChanges(userData_edit, avatarFile, personalInfoSection)
{

    if (DEBUG)
        console.log('Saving profile changes...');

    // Function to encode avatar to base64 string
    const encodeFileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                resolve(reader.result.split(',')[1]);  // Extract base64 string
            };
            reader.onerror = error => reject(error);
        });
    };

    let base64EncodedAvatarString = null;

    if (avatarFile)
    {
        try
        {
            base64EncodedAvatarString = await encodeFileToBase64(avatarFile);
        }
        catch (error)
        {
            console.error('Error encoding avatar file:', error);
            alert('An error occurred while encoding the avatar image.');
            return;
        }
    }

    if (DEBUG)
    {
        console.log('First Name:', userData_edit.first_name);
        console.log('Last Name:', userData_edit.last_name);
        console.log('Date of Birth:', userData_edit.dob);
        console.log('Email:', userData_edit.email);
        console.log('Avatar:', base64EncodedAvatarString);
    }

    try
    {
        const response = await apiRequest('/api/users/updateProfile/', {
            method: 'PUT',
            headers: {
                'X-CSRFToken': getCookie('csrftoken'),
            },
            body: JSON.stringify({
                email: userData_edit.email,
                date_of_birth: userData_edit.dob,
                first_name: userData_edit.first_name,
                last_name: userData_edit.last_name,
                avatar: base64EncodedAvatarString,
            })
        });

        if (!response.ok)
        {
            console.error('Error updating profile:', response);
            let errorMessage;

            if (response.status === 400)
                errorMessage = 'Validation error. Please check your input.';
            else
                errorMessage = 'An unexpected error occurred. Please try again later.';
            
            alert(errorMessage);
        }
        else
        {
            console.log('Profile updated successfully.');
            // personalInfoSection.appendChild(updateProfileButton);
            window.location.reload();
        }
    }
    catch (error)
    {
        console.error('Error updating profile:', error);
        alert('An error occurred while updating the profile.');
    }
}


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
