const API_KEY = "06d2dd537200513df2ab8ae0c8fde074";
const COORDS = "coords";

function saveCoords(coordsObj) {
    // Save location in localstorage
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        /*
        latitude: latitude,
        longitude: longitude
        // Same with down stuffs
        */
        latitude,
        longitude
    }
    saveCoords(coordsObj);
}

function handleGeoError() {
    console.log("Can't access geo location");
}

function askForCoords() {
    // Get location from navigator web api
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError)
}

function loadCoords() {
    const loadedCords = localStorage.getItem(COORDS);
    if (loadedCords === null) {
        askForCoords();
    } else {
        // getWeather
    }
}

function init() {
    loadCoords();
}

init();