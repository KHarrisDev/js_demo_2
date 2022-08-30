const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];

// Unsplash API
const count = 10;
const apiKey = 'jFgS8tteGD425f4oZfygQVaVnD6gt6GucN2yyz3xFek';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Helper function for DRY principle when using setAttribute on DOM
function setAttributes(element, attributes) {
    // Key is the src, alt, title, etc...
    // Attributes is an object that will contain both key & value
    for (const key in attributes) {
        // element in this case will be variables item & img
        element.setAttribute(key, attributes[key])
    }
}

// Create elements for photos & add to the DOM
function displayPhotos() {
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
        img.setAttribute('src', photo.urls.regular);
        img.setAttribute('alt', photo.alt_description);
        img.setAttribute('title', photo.alt_description);

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

getPhotos();