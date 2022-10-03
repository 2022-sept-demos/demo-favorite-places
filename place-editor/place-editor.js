/* Imports */
import '../auth/user.js';

/* Get DOM Elements */
const placeForm = document.getElementById('place-form');
const errorDisplay = document.getElementById('error-display');
const imageInput = document.getElementById('image-input');
const preview = document.getElementById('preview');

/* State */
let error = null;

/* Events */
imageInput.addEventListener('change', () => {
    const file = imageInput.files[0];
    if (file) {
        preview.src = URL.createObjectURL(file);
    } else {
        preview.src = '../assets/place-photo-placeholder.png';
    }
});

placeForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(placeForm);

    const imageFile = formData.get('image');
    const randomFolder = Math.floor(Date.now() * Math.random());
    const imagePath = `places/${randomFolder}/${imageFile.name}`;
    // > Part A: Call upload image with the bucket ("images"),
    // the imagePath, and the imageFile - and store the returned url

    const place = {
        // > Part B: add the name, bio, and image_url fields to the place object
    };

    // > Part B:
    //    - call function to create the place in the database
    //    - store the error and places state from the response
    //    - either display the error or redirect the user to the home page
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
