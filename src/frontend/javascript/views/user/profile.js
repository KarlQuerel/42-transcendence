/* TO DO KARL

    - Modifier le bouton Signin/Signup dans la navbar pour qu'il affiche "Profile" à la place (et ca redirige vers profile of course)

    - Il y a plusieurs boutons sur cette page. Il y a juste une particularité qui est que le bouton "Update profile".
        const updateProfileButton = document.createElement('button');
        updateProfileButton.setAttribute('id', 'update-profile-button');
        updateProfileButton.textContent = 'Update profile';
    Ce bouton ne doit pas apparaitre si l'utilisateur est en mode édition de son profil.
    En gros, il doit disparaitre si l'utilisateur clique dessus, et réapparaitre une fois qu'il a fini de modifier son profil (après avoir cliqué sur "Save changes" et que la sauvegarde a été réussie).
*/


/***********************************************\
-		   IMPORTING VARIABLES/FUNCTIONS		-
\***********************************************/
import { DEBUG } from '../../main.js';
import { apiRequest, getCookie } from './signin.js';
import { getIdentifier, checkIdentifierType, allValuesAreValid, sendErrorToFrontend } from './signup.js';

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

    // Form element
    const avatarForm = document.createElement('form');
    avatarForm.setAttribute('id', 'avatar_form');

    // Error message container
    const errorMessageContainer = document.createElement('div');
    errorMessageContainer.setAttribute('id', 'error-messages-avatar');
    errorMessageContainer.classList.add('error-messages-avatar');
    avatarForm.appendChild(errorMessageContainer);


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


// Fetch game history data from the API
async function fetchGameHistoryData() {
    try {
        const userData = await apiRequest('/api/dashboard/getGameHistory/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (DEBUG) {
            console.log("userData = ", userData);
        }
        return userData;
    } catch (error) {
        console.error('Error: fetch userData', error);
        throw error; // Re-throw the error
    }
}


/***********************************************\
*           PROFILE EDIT MODE FUNCTIONS         *
\***********************************************/

async function profileEditMode(userData_edit, personalInfoSection)
{
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
        const avatarLabel = document.createElement('label');
        avatarLabel.setAttribute('for', 'avatar_input');
        avatarLabel.textContent = 'Upload avatar image (jpeg, jpg or png):';
        personalInfoSection.appendChild(avatarLabel);
    
        const avatarInput = document.createElement('input');
        avatarInput.setAttribute('type', 'file');
        avatarInput.setAttribute('id', 'avatar_input');
        avatarLabel.appendChild(avatarInput);
    
    
        // Save Button
        const saveButton = document.createElement('button');
        saveButton.setAttribute('id', 'save-profile-button');
        saveButton.textContent = 'Save changes';
        personalInfoSection.appendChild(saveButton);
        avatarLabel.appendChild(saveButton);
    
        saveButton.addEventListener('click', async (event) =>
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
    
            const avatarFile = document.getElementById('avatar_input').files[0];
    
            const isValidData = verifyProfileChanges();
    
            if (DEBUG)
                console.log('Updated values are valid:', isValidData);
    
            if (isValidData)
            {
                if (avatarFile && (verifyAvatarFile(avatarFile, saveButton, avatarLabel, avatarInput) == true))
                    await saveNewAvatar(avatarFile);
    
                await saveProfileChanges(userData_edit);
    
                // window.location.reload();
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

    if (DEBUG)
    {
        console.log('Verifying profile changes [checkIdentifierType]...');
        console.log('First name:', first_name_type);
        console.log('Last name:', last_name_type);
        console.log('Date of birth:', date_of_birth_type);
        console.log('Email:', email_type);
    }


    // Check if all values are valid
    const allValid = allValuesAreValid(first_name_type, last_name_type, username_type, date_of_birth_type, password_type, email_type);

    if (!allValid)
    {
        if (DEBUG)
            console.log('Profile changes are invalid.');

        // Send error messages to the frontend
        sendErrorToFrontend(first_name_type, last_name_type, username_type, date_of_birth_type, password_type, email_type);
        return false;
    }
    else
    {
        if (DEBUG)
            console.log('Profile changes are valid.');
        return true;
    }
}

async function verifyAvatarFile(avatarFile, saveButton, avatarLabel, avatarInput)
{
    if (DEBUG)
        console.log('Verifying avatar file...');

    let result = true;

    if (!saveButton || !avatarLabel)
    {
        console.error('Save button or avatar label not found.');
        return false;
    }

    if (!avatarLabel.contains(saveButton))
    {
        console.error('Save button is not a child of avatar label.');
        return false;
    }

    if (!avatarInput)
    {
        console.error('Avatar input not found.');
        return false;
    }

    const avatarForm = avatarInput.parentElement;

    // Remove existing error messages
    const existingError = avatarForm.querySelector('.error-messages-avatar');
    if (existingError)
        existingError.remove();

    // Check if the file is not empty
    if (!avatarFile || !avatarFile.size || avatarFile.name === '')
    {
        const errorMessage = document.createElement('p');
        errorMessage.className = 'error-messages-avatar';
        errorMessage.textContent = 'Select a file';
        avatarLabel.insertBefore(errorMessage, saveButton);
        result = false;
    }

    // Check if the file type is jpeg, jpg, or png
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!validTypes.includes(avatarFile.type))
    {
        const errorMessage = document.createElement('p');
        errorMessage.className = 'error-messages-avatar';
        errorMessage.textContent = 'File type not supported (only jpeg, jpg, png)';
        avatarLabel.insertBefore(errorMessage, saveButton);
        result = false;
    }

    // Check if the file size is no more than 1 MB
    if (avatarFile.size > 1000000)
    {
        const errorMessage = document.createElement('p');
        errorMessage.className = 'error-messages-avatar';
        errorMessage.textContent = 'File too large (max 1 MB)';
        avatarLabel.insertBefore(errorMessage, saveButton);
        result = false;
    }

    return result;
}



async function saveProfileChanges(userData_edit)
{
    if (DEBUG)
    {
        console.log('Saving profile changes...');
        console.log('Userdata =', userData_edit);
    }

    try
    {

        const response = await apiRequest('/api/users/updateProfile/',
        {
            method: 'PUT',
            headers: {  
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'X-CSRFToken': getCookie('csrftoken'),
            },
            body: JSON.stringify({
                email: userData_edit.email,
                date_of_birth: userData_edit.dob,
                first_name: userData_edit.first_name,
                last_name: userData_edit.last_name,
            }),
        });

        // console.log('Response JSON:', response); // DEBUG
    
        console.log('Profile updated successfully.');

    }
    catch (error)
    {
        console.error('Error updating profile:', error.message);
        alert('An error occurred while updating the profile.');
    }
}


async function saveNewAvatar(avatarFile)
{
    if (DEBUG)
        console.log('Saving new avatar...');

    if (avatarFile)
    {
        try
        {
            const reader = new FileReader();
            reader.onloadend = async () => {
                const base64data = reader.result.split(',')[1]; // Get base64 data without the prefix
                const response = await apiRequest('/api/users/updateAvatar/',
                {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'X-CSRFToken': getCookie('csrftoken'),
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ avatar_input: base64data }),
                });

            if (DEBUG)
            {
                console.log('Response:', response); // Log the entire response object
                console.log('Response status:', response.status);
                console.log('Response status text:', response.statusText);
            }
    
            console.log('Avatar updated successfully.');
            };
            reader.readAsDataURL(avatarFile); // Read the file as a data URL
        }
        catch (error)
        {
            console.error('Error updating avatar:', error);
            alert('An error occurred while updating the avatar.');
        }
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



// /***********************************************\

//  * CODE ANTOINE

// import { DEBUG, navigateTo } from '../app.js';
// import { getCookie } from './utils.js';

// function displayFriends(friends) {
//     console.log(friends);
//     const divListFriends = document.querySelector('.divListFriends');
//     divListFriends.innerHTML = '';
//     const ul = document.createElement('ul');
//     ul.className = 'list-unstyled d-flex flex-column';

//     divListFriends.appendChild(ul);
//     friends.forEach(friend => {
//         const li = document.createElement('li');
//         li.className = 'friendItem';
//         li.textContent = friend.nickname + ' (' + friend.status + ')';
//         ul.appendChild(li);
//     });
// }

// export function navigationBar(container) {
//     const div = document.createElement('div');
//     div.className = 'navigationBarDiv h-100 d-flex flex-column text-white';  // Utilisation des classes Bootstrap ici

//     // Get user data from backend
//     fetch(`/api/settings/`, {
//         method: 'GET',
//         headers: {
//             'Authorization': `Bearer ${localStorage.getItem('token')}`,
//             'Content-Type': 'application/json',
//             'X-CSRFToken': getCookie('csrftoken'),
//         },
//     })
//     .then(response => {
//         if (response.status === 200) {
//             return response.json();
//         } else if (response.status === 307) {
//             localStorage.removeItem('token');
//             fetch('/api/logout/', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'X-CSRFToken': getCookie('csrftoken'),
//                 },
//             }).then(() => navigateTo('/'));
//             return null;
//         } else {
//             console.error('Error:', response);
//             // throw new Error('Something went wrong');
//         }
//     })
//     .then(data => {
//         if (!data) {
//            console.error('No data received');
//             return;
//         }
//         const userData = {
//             username: data.username,
//             nickname: data.nickname,
//             email: data.email,
//             language: data.language,
//             font_size: data.font_size,
//             theme: data.dark_mode,
//             avatar: data.avatar,
//         };

//         const friends_websocket = new WebSocket(`ws://${window.location.host}/ws/friends/`);
//         friends_websocket.onopen = () => {
//             console.log('WebSocket connection established');
//             friends_websocket.send(JSON.stringify({ type: 'get_friends' }));
//         }

//         friends_websocket.onmessage = event => {
//             const message = JSON.parse(event.data);
//             if (message.type === 'get_friends') {
//                 // Display the list of friends
//                 displayFriends(message.friends);
//             }
//         };

//         friends_websocket.onclose = () => {
//             console.error('WebSocket connection closed.');
//         };

//         // On WebSocket error
//         friends_websocket.onerror = error => {
//             console.error('WebSocket error:', error);
//         };


//         // Creation of the navigation bar
//         const nav = document.createElement('nav');
//         nav.className = 'nav d-flex flex-column justify-content-start align-items-center shadow-lg';
//         nav.style.backgroundColor = '#435574';
//         div.appendChild(nav);

//         const divProfile = document.createElement('div');
//         divProfile.className = 'divProfile w-50 text-center';
//         nav.appendChild(divProfile);

//         const avatarItem = document.createElement('div');
//         avatarItem.className = 'avatarItem rounded-circle overflow-hidden';
//         avatarItem.style.display = 'flex';
//         avatarItem.style.alignItems = 'center';
//         avatarItem.style.justifyContent = 'center';
//         avatarItem.style.position = 'relative';
//         divProfile.appendChild(avatarItem);

//         const avatarImage = document.createElement('img');
//         avatarImage.src = `data:image/png;base64, ${userData.avatar}`;
//         avatarImage.className = 'avatarImage w-100 h-auto pb-2';
//         avatarImage.setAttribute('tabindex', '0');
//         avatarImage.setAttribute('role', 'button');
//         avatarImage.alt = 'Avatar';
//         avatarItem.appendChild(avatarImage);

//         const SVGModifyAvatar = document.createElement('svg');
//         SVGModifyAvatar.className = 'SVGModifyAvatar bi bi-pencil-fill position-absolute';
//         SVGModifyAvatar.setAttribute('xmlns', "http://www.w3.org/2000/svg");
//         SVGModifyAvatar.setAttribute('width', '32');
//         SVGModifyAvatar.setAttribute('height', '32');
//         SVGModifyAvatar.setAttribute('fill', 'white');
//         SVGModifyAvatar.setAttribute('viewBox', '0 0 16 16');
//         SVGModifyAvatar.style.opacity = '0';

//         SVGModifyAvatar.innerHTML = `
//             <path d="M12.146.854a.5.5 0 0 1 .708 0l2.292 2.292a.5.5 0 0 1 0 .708l-9.146 9.146L5 13.5l.5-.5 9.146-9.146zM4 13.5V15h1.5l.146-.146L4 13.5zm-3.5.5a.5.5 0 0 1 0-1H1V12.5H.5a.5.5 0 0 1 0-1H1V11H.5a.5.5 0 0 1 0-1H1V9.5H.5a.5.5 0 0 1 0-1H1V8.5H.5a.5.5 0 0 1 0-1H1V7.5H.5a.5.5 0 0 1 0-1H1V6.5H.5a.5.5 0 0 1 0-1H1V5.5H.5a.5.5 0 0 1 0-1H1V4.5H.5a.5.5 0 0 1 0-1H1V3.5H.5a.5.5 0 0 1 0-1H1V2.5H.5a.5.5 0 0 1 0-1H1V1.5H.5a.5.5 0 0 1 0-1H1V.5H.5a.5.5 0 0 1 0-1H1V0h-.5a.5.5 0 0 1 0 1H1V.5H.5z"/>
//         `;

//         avatarItem.appendChild(SVGModifyAvatar);

//         avatarImage.addEventListener('mouseover', () => {
//             avatarImage.style.filter = 'blur(5px)';
//             SVGModifyAvatar.style.opacity = '1';
//         });

//         avatarImage.addEventListener('mouseout', () => {
//             avatarImage.style.filter = 'none';
//             SVGModifyAvatar.style.opacity = '0';
//         });


//         avatarImage.addEventListener('click', () => {

//             const bootstrapModal = new bootstrap.Modal(modalAvatar);

//             const navBar = document.querySelector('.nav');
//             const rect = navBar.getBoundingClientRect();

//             modalAvatar.style.position = 'absolute';
//             modalAvatar.style.top = `${rect.top}px`;
//             modalAvatar.style.left = `${rect.right + 10}px`;

//             modalAvatar.style.margin = '0';
//             modalAvatar.style.transform = 'none';
//             modalAvatar.style.maxWidth = 'none';
//             bootstrapModal.show();
//         });

//         //////CREATION MODAL AVATAR TRY///////////////////////////////

//     const modalAvatar = document.createElement('div');
//     modalAvatar.className = 'modal fade modalAvatar';
//     modalAvatar.id = 'modalAvatar';
//     modalAvatar.setAttribute('tabindex', '-1');
//     modalAvatar.setAttribute('aria-labelledby', 'modalAvatarLabel');
//     modalAvatar.setAttribute('aria-hidden', 'true');
//     container.appendChild(modalAvatar);

//     const modalAvatarDialog = document.createElement('div');
//     modalAvatarDialog.className = "modal-dialog modalAvatarDialog";
//     modalAvatar.appendChild(modalAvatarDialog);

//     const modalAvatarContent = document.createElement('div');
//     modalAvatarContent.className = 'modal-content modalAvatarContent';
//     modalAvatarDialog.appendChild(modalAvatarContent);

//     const modalAvatarHeader = document.createElement('div');
//     modalAvatarHeader.className = 'modal-header border-bottom border-custom-color pb-2 modalAvatarHeader';
//     modalAvatarContent.appendChild(modalAvatarHeader);

//     const modalAvatarTitle = document.createElement('h2');
//     modalAvatarTitle.textContent = 'Avatar';
//     modalAvatarTitle.className = 'modal-title modalAvatarTitle';
//     modalAvatarHeader.appendChild(modalAvatarTitle);

//     const modalAvatarCloseButton = document.createElement('span');
//     modalAvatarCloseButton.id = 'closeButtonAvatar';
//     modalAvatarCloseButton.setAttribute('data-bs-dismiss', 'modal');
//     modalAvatarCloseButton.setAttribute('aria-label', 'Close');
//     modalAvatarCloseButton.textContent = '×';
//     modalAvatarHeader.appendChild(modalAvatarCloseButton);

//     modalAvatarCloseButton.addEventListener('click', () => {
//         modalAvatar.classList.remove('modalAvatar-show');
//         setTimeout(() => {
//             modalAvatar.style.display = 'none';
//         }, 500);
//     });

//     const modalAvatarBody = document.createElement('div');
//     modalAvatarBody.className = 'modal-body';
//     modalAvatarContent.appendChild(modalAvatarBody);

//     const avatarForm = document.createElement('form');
//     avatarForm.className = 'w-100';
//     modalAvatarBody.appendChild(avatarForm);

//     const newAvatar = document.createElement('input');
//     newAvatar.type = 'file';
//     newAvatar.id = 'avatar';
//     newAvatar.name = 'newAvatar';
//     newAvatar.className = 'form-control mb-4';
//     avatarForm.appendChild(newAvatar);

//     const avatarSubmitButton = document.createElement('button');
//     avatarSubmitButton.type = 'submit';
//     avatarSubmitButton.className = 'btn btn-primary w-100 mb-3 d-flex justify-content-center align-items-center';
//     avatarSubmitButton.textContent = 'Save avatar';
//     avatarForm.appendChild(avatarSubmitButton);

//     const removeAvatarButton = document.createElement('button');
//     removeAvatarButton.type = 'button';
//     removeAvatarButton.className = 'btn btn-danger w-100';
//     removeAvatarButton.textContent = 'Remove avatar';
//     avatarForm.appendChild(removeAvatarButton);

//     // Action du bouton "Save avatar"
//     avatarForm.addEventListener('submit', async (event) => {
//         event.preventDefault(); // Empêche la soumission par défaut du formulaire

//         // Suppression des messages précédents
//         const errorMessages = accessibilityForm.querySelectorAll('.text-danger');
//         errorMessages.forEach(message => message.remove());
//         const successMessages = accessibilityForm.querySelectorAll('.text-success');
//         successMessages.forEach(message => message.remove());

//         // Récupération du fichier sélectionné
//         const data = new FormData(avatarForm);
//         const avatarFile = data.get('newAvatar');

//         if (!avatarFile.size || avatarFile.name === '') {
//             const errorMessage = document.createElement('p');
//             errorMessage.className = 'text-danger';
//             errorMessage.textContent = 'Select a file';
//             avatarForm.insertBefore(errorMessage, avatarSubmitButton);
//             return;
//         }

//         //Check file type
//         if (!avatarFile.type.startsWith('image/')) {
//             const errorMessage = document.createElement('p');
//             errorMessage.className = 'text-danger';
//             errorMessage.textContent = 'File type not supported';
//             avatarForm.insertBefore(errorMessage, avatarSubmitButton);
//             return;
//         }

//         if (avatarFile.size > 1000000) { // Vérification de la taille (1 MB max)
//             const errorMessage = document.createElement('p');
//             errorMessage.className = 'text-danger';
//             errorMessage.textContent = 'File too large (max 1 MB)';
//             avatarForm.insertBefore(errorMessage, avatarSubmitButton);
//             return;
//         }

//         try {
//             const response = await fetch('/api/updateAvatar/', {
//                 method: 'PUT',
//                 headers: {
//                     'Authorization': `Bearer ${localStorage.getItem('token')}`,
//                     'X-CSRFToken': getCookie('csrftoken'),
//                 },
//                 body: avatarFile,
//             });

//             if (response.ok) {
//                 const result = await response.json(); // Suppose que l'URL de l'avatar est retournée

//                 // Message de succès
//                 const successMessage = document.createElement('p');
//                 successMessage.className = 'text-success';
//                 successMessage.textContent = 'Avatar successfully modified';
//                 avatarForm.appendChild(successMessage);

//                 setTimeout(() => {
//                     const modalElement = document.getElementById('modalAvatar');
//                     const modalInstance = bootstrap.Modal.getInstance(modalElement);
//                     modalInstance.hide();

//                     document.body.style.filter = 'blur(5px)';

//                     let location = window.location.href;
//                     const str_split = location.split('/');
//                     const length = str_split.length;
//                     const locationFinal = '/' + str_split[length - 1];
//                     navigateTo(locationFinal);

//                     let blurAmount = 4;
//                     const interval = setInterval(() => {
//                         blurAmount -= 0.1;
//                         document.body.style.filter = `blur(${Math.max(0, blurAmount)}px)`;

//                         if (blurAmount <= 0) {
//                             clearInterval(interval);
//                         }
//                     }, 25);
//                 }, 800);

//             } else {
//                 // Message d'erreur en cas d'échec
//                 const errorMessage = document.createElement('p');
//                 errorMessage.className = 'text-danger';
//                 errorMessage.textContent = 'Error when modifying the avatar';
//                 avatarForm.insertBefore(errorMessage, avatarSubmitButton);

//                 setTimeout(() => {
//                     const modalElement = document.getElementById('modalAvatar');
//                     const modalInstance = bootstrap.Modal.getInstance(modalElement);
//                     modalInstance.hide();

//                     document.body.style.filter = 'blur(5px)';

//                     let location = window.location.href;
//                     const str_split = location.split('/');
//                     const length = str_split.length;
//                     const locationFinal = '/' + str_split[length - 1];
//                     navigateTo(locationFinal);

//                     let blurAmount = 4;
//                     const interval = setInterval(() => {
//                         blurAmount -= 0.1;
//                         document.body.style.filter = `blur(${Math.max(0, blurAmount)}px)`;

//                         if (blurAmount <= 0) {
//                             clearInterval(interval);
//                         }
//                     }, 25);
//                 }, 800);
//             }
//         } catch (error) {
//             console.error('Error during the avatar update', error);
//             const errorMessage = document.createElement('p');
//             errorMessage.className = 'text-danger';
//             errorMessage.textContent = 'An error occurred while updating the avatar';
//             avatarForm.insertBefore(errorMessage, avatarSubmitButton);

//             setTimeout(() => {
//                 const modalElement = document.getElementById('modalAvatar');
//                 const modalInstance = bootstrap.Modal.getInstance(modalElement);
//                 modalInstance.hide();

//                 document.body.style.filter = 'blur(5px)';

//                 let location = window.location.href;
//                 const str_split = location.split('/');
//                 const length = str_split.length;
//                 const locationFinal = '/' + str_split[length - 1];
//                 navigateTo(locationFinal);

//                 let blurAmount = 4;
//                 const interval = setInterval(() => {
//                     blurAmount -= 0.1;
//                     document.body.style.filter = `blur(${Math.max(0, blurAmount)}px)`;

//                     if (blurAmount <= 0) {
//                         clearInterval(interval);
//                     }
//                 }, 25);
//             }, 800);
//         }
//     });

//     // Action du bouton "Remove avatar" pour supprimer l'avatar actuel
//     removeAvatarButton.addEventListener('click', async () => {
//         try {
//             const response = await fetch('/api/deleteAvatar/', {
//                 method: 'DELETE',
//                 headers: {
//                     'Authorization': `Bearer ${localStorage.getItem('token')}`,
//                     'X-CSRFToken': getCookie('csrftoken'),
//                 },
//             });

//             // Suppression des messages précédents
//             const errorMessages = accessibilityForm.querySelectorAll('.text-danger');
//             errorMessages.forEach(message => message.remove());
//             const successMessages = accessibilityForm.querySelectorAll('.text-success');
//             successMessages.forEach(message => message.remove());
//             if (response.ok) {
//                 // Mettre à jour l'avatar avec une image par défaut après suppression
//                 const avatarImage = document.querySelector('.avatarImage');
//                 avatarImage.src = '/path/to/default-avatar.png';  // Remplacer par l'URL de l'avatar par défaut

//                 // Afficher un message de succès
//                 const successMessage = document.createElement('p');
//                 successMessage.className = 'text-success';
//                 successMessage.textContent = 'Avatar successfully removed';
//                 avatarForm.appendChild(successMessage);

//                 setTimeout(() => {
//                     const modalElement = document.getElementById('modalAvatar');
//                     const modalInstance = bootstrap.Modal.getInstance(modalElement);
//                     modalInstance.hide();

//                     document.body.style.filter = 'blur(5px)';

//                     let location = window.location.href;
//                     const str_split = location.split('/');
//                     const length = str_split.length;
//                     const locationFinal = '/' + str_split[length - 1];
//                     navigateTo(locationFinal);

//                     let blurAmount = 4;
//                     const interval = setInterval(() => {
//                         blurAmount -= 0.1;
//                         document.body.style.filter = `blur(${Math.max(0, blurAmount)}px)`;

//                         if (blurAmount <= 0) {
//                             clearInterval(interval);
//                         }
//                     }, 25);
//                 }, 800);

//             } else {
//                 // Message d'erreur si suppression échoue
//                 const errorMessage = document.createElement('p');
//                 errorMessage.className = 'text-danger';
//                 errorMessage.textContent = 'Error when removing the avatar';
//                 avatarForm.appendChild(errorMessage);

//                 setTimeout(() => {
//                     const modalElement = document.getElementById('modalAvatar');
//                     const modalInstance = bootstrap.Modal.getInstance(modalElement);
//                     modalInstance.hide();

//                     document.body.style.filter = 'blur(5px)';

//                     let location = window.location.href;
//                     const str_split = location.split('/');
//                     const length = str_split.length;
//                     const locationFinal = '/' + str_split[length - 1];
//                     navigateTo(locationFinal);

//                     let blurAmount = 4;
//                     const interval = setInterval(() => {
//                         blurAmount -= 0.1;
//                         document.body.style.filter = `blur(${Math.max(0, blurAmount)}px)`;

//                         if (blurAmount <= 0) {
//                             clearInterval(interval);
//                         }
//                     }, 25);
//                 }, 800);
//             }

//         } catch (error) {
//             console.error('Error during the avatar removal', error);
//             const errorMessage = document.createElement('p');
//             errorMessage.className = 'text-danger';
//             errorMessage.textContent = 'An error occurred while removing the avatar';
//             avatarForm.appendChild(errorMessage);

//             setTimeout(() => {
//                 const modalElement = document.getElementById('modalAvatar');
//                 const modalInstance = bootstrap.Modal.getInstance(modalElement);
//                 modalInstance.hide();

//                 document.body.style.filter = 'blur(5px)';

//                 let location = window.location.href;
//                 const str_split = location.split('/');
//                 const length = str_split.length;
//                 const locationFinal = '/' + str_split[length - 1];
//                 navigateTo(locationFinal);

//                 let blurAmount = 4;
//                 const interval = setInterval(() => {
//                     blurAmount -= 0.1;
//                     document.body.style.filter = `blur(${Math.max(0, blurAmount)}px)`;

//                     if (blurAmount <= 0) {
//                         clearInterval(interval);
//                     }
//                 }, 25);
//             }, 800);
//         }
//     });
