const toDoFrom = document.querySelector(".js-toDoFrom"),
    toDoInput = toDoFrom.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

const toDos = [];

function saveToDos() {  // Save todos with JSON in localstorage.
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text) {  // Create list in toDoList.
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    delBtn.innerText = "X"
    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
   
}

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null) {
        const parsedToDos = JSON.parse(loadedToDos);
        console.log(parsedToDos);
    }
}

function init() {
    loadToDos();
    toDoFrom.addEventListener("submit", handleSubmit);
}

init();
