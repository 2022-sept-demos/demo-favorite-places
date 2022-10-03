/* Imports */
import '../auth/user.js';
import { createPlace, uploadImage } from '../fetch-utils.js';

/* Get DOM Elements */
const placeForm = document.getElementById('place-form');
const errorDisplay = document.getElementById('error-display');
const imageInput = document.getElementById('image-input');
const preview = document.getElementById('preview');
const addButton = placeForm.querySelector('button');

/* State */
let error = null;

/* Events */
imageInput.addEventListener('change', () => {
    const file = imageInput.files[0];
    if (file) {
        preview.src = URL.createObjectURL(file);
    } else {
        preview.src = '/assets/favorite-place-logo.png';
    }
});

placeForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    addButton.disabled = true;

    const formData = new FormData(placeForm);

    const imageFile = formData.get('image');
    if (imageFile.size > 1000000) {
        alert('file is too big, must be < 10KB');
        return;
    }
    const randomFolder = Math.floor(Date.now() * Math.random());
    const imagePath = `places/${randomFolder}/${imageFile.name}`;

    const url = await uploadImage('images', imagePath, imageFile);

    const place = {
        name: formData.get('name'),
        description: formData.get('description'),
        category: formData.get('category'),
        image_url: url,
    };

    const response = await createPlace(place);
    error = response.error;
    addButton.disabled = false;

    if (error) {
        displayError();
    } else {
        location.assign('/');
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
