const clockContainer = document.querySelector(".js-clock"),
    clockTitle = clockContainer.querySelector("h1");

function addZero(time) {
    return `${time < 10 ? `0${time}` : time}`
}
      
function getTime() {
    const date = new Date();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const secodnds = date.getSeconds();
    clockTitle.innerText = 
    `${addZero(hours)}:${addZero(minutes)}:${addZero(secodnds)}`;

    /*
    clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${
        minutes < 10 ? `0${minutes}` : minutes
    }:${secodnds < 10 ? `0${secodnds}` : secodnds}`;
    */
}

function init() {
    getTime();
    setInterval(getTime, 1000);
}

init();
