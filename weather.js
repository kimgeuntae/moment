const weather = document.querySelector(".js-weather");
const weather_container = document.querySelector('.weather-container');

const API_KEY = "06d2dd537200513df2ab8ae0c8fde074"; //OpenWeatherMap
const COORDS = "coords";

function getWeather(lat, lng) {
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    ).then(function (responce) {
        return responce.json();
    }).then(function (json) {
        const temperature = json.main.temp;
        const place = json.name;
        const icon = json.weather[0].icon;
        img_tag = document.createElement('img');
        img_tag.src = `https://openweathermap.org/img/w/${icon}.png`;
        img_tag.className = 'js-icon';
        weather_container.appendChild(img_tag);
  
        weather.innerHTML = `<li>${temperature}°</li> <li>@${place}</li>`;
      })
}

function saveCoords(coordsObj) {
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
    getWeather(latitude, longitude);
}

function handleGeoError() {
    console.log("Can't access geo location");
}

function askForCoords() {
    // Get location from navigator web api
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError)
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if (loadedCoords === null) {
        askForCoords();
    } else {
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}

function init() {
    loadCoords();
}

init();