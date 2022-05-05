let addBtn = document.getElementById("addBtn");
let input = document.getElementById("input");
let tasksContainer = document.querySelector(".tasks .container");
let tasks = {};
//create a task template --------------------------------------------
function taskTemplate(id, title = "", isCompleted = false) {
  let completeClass = isCompleted ? "completed" : "";
  let completeTxt = isCompleted ? "undone" : "done";
  return `
    <div class='task ${completeClass}' data-id="${id}">
        <p>${title}</p>
        <button type="submit" class="deleteBtn" data-id="${id}">delete</button>
        <button type="submit" class="completeBtn" data-id="${id}">${completeTxt} </button>
    </div>
  `;
}
//-------------------------------------------------------------------
function displayTask(data) {
  let clone = taskTemplate(data.id, data.title, data.completed);
  tasksContainer.innerHTML += clone;
}
//initalizing local storage
//the localStorage dont support arrays
//for that I used JSON.parse and JSON stringify
let tasksList = JSON.parse(localStorage.getItem("tasksList"));
function setLocalStorage() {
  localStorage.setItem("tasksList", JSON.stringify(tasks));
}
//--------------------------------------------------------------------
addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let msg = "Please fill the chunck !";
  if (input.value !== "" && !input.classList.contains("alert")) {
    const data = {
      //the task detail
      id: Date.now(),
      completed: false,
      title: input.value,
    };
    displayTask(data);
    tasks.push(data);
    setLocalStorage();
  } else {
    input.classList.add("alert");
    input.value = msg;
    setTimeout(() => {
      input.classList.remove("alert");
      input.value = "";
    }, 700);
  }
});
//get tasks from localStorage
if (tasks) {
  tasks.forEach((task) => {
    displayTask(task);
  });
}
// js selector can't read DOM created after the script is runned
// than we used the e.target.matches to detect the button selector
function addGlobalEventListener(event, selector, callback) {
  document.addEventListener(event, (e) => {
    if (e.target.matches(selector)) callback(e);
  });
}
function getTaskId(id) {
  tasks.forEach((task, index) => {
    if (task.id === id) return index;
  });
}
addGlobalEventListener("click", "button.completeBtn", (e) => {
  let btn = e.target;
  btn.parentElement.classList.toggle("completed");
  let index = getTaskById(btn.getAttribute("data-id"));
  [tasks[index].completed, btn.innerText] = tasks[index].completed
    ? [false, "done"]
    : [true, "undone"];
  setLocalStorage();
});
addGlobalEventListener("click", "button.deleteBtn", (e) => {
  let btn = e.target;
  btn.parentElement.remove();
  let index = getTaskId(btn.getAttribute("data-id"));
  tasks.splice(index, 1); // delete the task from the array
  setLocalStorage();
});
