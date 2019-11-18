const toDoFrom = document.querySelector(".js-toDoForm"),
    toDoInput = toDoFrom.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = [];

function handleCheck(event) {
    const input_checkbox = event.target;
    const labelText = input_checkbox.nextSibling 
  
    if (input_checkbox.checked === true) {
      labelText.className = "line-through";
    } else {
      input_checkbox.removeAttribute('checked');
      labelText.className = '';
    }
}

function deleteTodo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);

    /*
    const cleanToDos = toDos.filter(function (toDo) {   // Filter return no selected li list.
        return toDo.id !== parseInt(li.id);
    });
    */

    const cleanToDos = toDos.filter(
        toDo => toDo.id !== JSON.parse(li.id) // Filtered no selected li list.
    );

    toDos = cleanToDos; // Change new todolist.
    saveToDos();
}

function saveToDos() {  // Save todos with JSON in localstorage.
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text) {  // Create list in toDoList.
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    //const span = document.createElement("span");
    const newId = toDos.length + 1;
    delBtn.innerText = "❌"
    delBtn.className = "delBtn"
    delBtn.addEventListener("click", deleteTodo);
    //span.innerText = text;
    const input = document.createElement('input');
    const label = document.createElement('label');
    input.type = "checkbox"
    input.id = text;
    input.name = text; 
    label.setAttribute("for", text);
    label.innerText = text; 
    input.addEventListener('click', handleCheck);
    li.appendChild(input);
    li.appendChild(label);
    li.appendChild(delBtn);
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
    if (loadedToDos !== null) {
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function (toDo) {
            paintToDo(toDo.text);
        });
    }
}

function init() {
    loadToDos();
    toDoFrom.addEventListener("submit", handleSubmit);
}

init();
