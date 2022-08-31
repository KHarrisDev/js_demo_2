const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false; // When page first load we want it to be false
let imagesLoaded = 0; // Counts for each image loaded
let totalImages = 0; // So we know we are done loading
let photosArray = [];

// Unsplash API
const count = 30;
const apiKey = 'jFgS8tteGD425f4oZfygQVaVnD6gt6GucN2yyz3xFek';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// From eventListener 'load' Checks if all images were loaded
function imageLoaded() {
    console.log('image loaded');
    imagesLoaded++;
    if (imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
        console.log('ready = ', ready);
    }
}

// Helper function for DRY principle when using setAttribute on DOM
// Key is the src, alt, title, etc...
// Attributes is an object that will contain both key & value
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
        // element in this case will be variables item & img
    }
}




// Create elements for photos & add to the DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    console.log('total images', totalImages);

    // Run function for each photo in array
    photosArray.forEach((photo) => {

        // Create a <a> element to Unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        // item.setAttribute("href", photo.links.html);
        // item.setAttribute("target", '_blank');

        //Create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        // img.setAttribute('src', photo.urls.regular);
        // img.setAttribute('alt', photo.alt_description);
        // img.setAttribute('title', photo.alt_description);

        // Add an eventListener for every time an image is done loading
        img.addEventListener('load', imageLoaded);

        // Put <img> inside <a>, then put <a> in container
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Get photos from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
        //console.log(photosArray);
    } catch (error) {
        //Catch error
    }
}

//Check to see if scrolling near bottom of page, Load more pages
window.addEventListener('scroll', () => {
    console.log('scrolled');
    //window.innerHeight = height of browser window
    // window.scrollY = how high we are from top of page
    // document.body.offsetHeight
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000) {
        ready = false;
        getPhotos();
    }
});

getPhotos();