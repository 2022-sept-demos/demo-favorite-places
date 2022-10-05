/* Imports */
// this will check if we have a user and set signout link if it exists
import '../auth/user.js';
import { getPlace } from '../fetch-utils.js';
// import { createComment, getPlace } from '../fetch-utils.js';
// import { renderComment } from '../render-utils.js';

/* Get DOM Elements */
const errorDisplay = document.getElementById('error-display');
const placeName = document.getElementById('place-name');
const placeImage = document.getElementById('place-image');
const placeDescription = document.getElementById('place-description');
const commentList = document.getElementById('comment-list');
const addCommentForm = document.getElementById('add-comment-form');

/* State */
let error = null;
let place = null;

/* Events */
window.addEventListener('load', async () => {
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');

    if (!id) {
        location.replace('/');
        return;
    }

    const response = await getPlace(id);
    error = response.error;
    place = response.data;

    if (error) {
        location.replace('/');
    } else {
        displayPlace();
    }
});

/* Display Functions */

function displayError() {
    if (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        errorDisplay.textContent = error.message;
    } else {
        errorDisplay.textContent = '';
    }
}

function displayPlace() {
    placeName.textContent = place.name;
    placeDescription.textContent = place.description;
    placeImage.src = place.image_url;
    placeImage.alt = `${place.name} image`;
}

function displayComments() {
    commentList.innerHTML = '';
    for (const comment of place.comments) {
        //
    }
}
