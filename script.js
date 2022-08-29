const count = 10;
const apiKey = '7jpYgCVx3XY0OYAGUQsgX_wv9kMK1e5OEbSHyiapBzM';
const apiUrl = `https://api.unsplash.com/photos/?client_id=${apiKey}&count=${count}`;

async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data);
    } catch (error) {
        //Catch error
    }
}

getPhotos();