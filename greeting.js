const form = document.querySelector(".js-form"),
    input = form.querySelector("input"),
    greeting = document.querySelector(".js-greetings");
    editBtn = document.querySelector('.fa-edit');

const clock = document.querySelector('.js-clock h1');

const USER_LS = "currentUser",
    SHOWING_CN = "showing";

function saveName(text) {
    localStorage.setItem(USER_LS, text);
    // Save [currentUser : text] on user localstorage.
}

function enterName(event) {
    event.preventDefault();
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}
  
function toDisplay(element, boolean) {
    if (boolean) {
        element.style.display = "block";
    } else {
        element.style.display = "none";
    }
}

function askForName() {
    toDisplay(editBtn, false)
    greeting.classList.remove(SHOWING_CN);

    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", enterName);
}

function editName(event) {
    event.preventDefault();
    localStorage.removeItem(USER_LS);
  
    loadName();
}

function paintGreeting(text) {
    toDisplay(editBtn, true);
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    
    const clockArr = clock.textContent.split(":");
    const hour = parseInt(clockArr[0], 10);

    // Parse time for greeting text
    if (hour >= 5 && hour < 12) {
        greeting.innerText = `Good morning, ${text}!`;
    } else if (hour >= 12 && hour < 18) {
        greeting.innerText = `Good afternoon, ${text}!`;
    } else if (hour >= 18 && hour < 23) {
        greeting.innerText = `Good evening, ${text}!`;
    } else {
        greeting.innerText = `Hello, ${text}!`;
    }

    editBtn.addEventListener('click', editName);

}

function loadName() {
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null) {
        // Contain no User.
        askForName();

    } else {
        // Contain User
        paintGreeting(currentUser);
    }
}

function init() {
    loadName();
}

init();
