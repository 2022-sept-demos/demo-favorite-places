/* Imports */
// this will check if we have a user and set signout link if it exists
import './auth/user.js';
import { getPlaces } from './fetch-utils.js';
import { renderPlace } from './render-utils.js';

/* Get DOM Elements */
const errorDisplay = document.getElementById('error-display');
const placeList = document.getElementById('place-list');
const searchForm = document.getElementById('search-form');

/* State */
let error = null;
let places = [];

/* Events */
window.addEventListener('load', async () => {
    const response = await getPlaces();
    error = response.error;
    places = response.data;

    if (error) {
        displayError();
    } else {
        displayPlaces();
    }
});

searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(searchForm);
    const name = formData.get('name');

    const response = await getPlaces(name);
    error = response.error;

    if (error) {
        displayError();
    } else {
        places = response.data;
        displayPlaces();
    }
});

/* Display Functions */
function displayError() {
    errorDisplay.textContent = error.message;
}

function displayPlaces() {
    placeList.innerHTML = '';
    for (const place of places) {
        const placeEl = renderPlace(place);
        placeList.append(placeEl);
    }
}
