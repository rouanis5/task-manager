let addTask = document.getElementById("addTask");
let inputTask = document.getElementById("inputTask");
let autorization = false;
let taskContainer = document.querySelector(".tasks .container");
let tasks = [];
//initalizing local storage
//the localStorage dont support arrays
//for that I used JSON.parse and JSON stringify
let tasksList = JSON.parse(localStorage.getItem("tasksList"));
function setLocalStorage(){
    localStorage.setItem("tasksList", JSON.stringify(tasks));
    if (autorization) { // to check if the addTask btn is clicked or not
        inputTask.value = ""; //delte the previous value
        autorization = false;
    }
}
addTask.addEventListener("click",(e) =>{
    let msg = "Please fill the chunck !";
    autorization = true; //say that this btn is clicked
    if (inputTask.value !== "" && inputTask.value !== msg){
        const el = {                    //the task detail
            id : Date.now(),
            completed: false,
            title: inputTask.value
        }
        tasks.push(el);
        tasker(el);
        setLocalStorage();
    }
    else{
        e.preventDefault();
        inputTask.classList.add("alert");
        inputTask.value = msg;
        setTimeout(()=>{
            inputTask.classList.remove("alert");
            inputTask.value = "";
        }
        ,700)
    }
})
//create a task template --------------------------------------------
let task = document.createElement("div");
task.classList.add("task");
let p = document.createElement("p"); //first child
task.appendChild(p);

let deleteBtn = document.createElement("button"); //2nd child
deleteBtn.setAttribute("type","submit");
deleteBtn.classList.add("deleteBtn");
deleteBtn.innerText = "Delete";
task.appendChild(deleteBtn);

let completeBtn = document.createElement("button"); //last child
completeBtn.setAttribute("type","submit");
completeBtn.classList.add("completeBtn");
completeBtn.innerText = "done";
task.appendChild(completeBtn);

//-------------------------------------------------------------------
function tasker(data){
    let clone = task.cloneNode(true);
    clone.firstChild.innerText = data.title;
    clone.setAttribute("data-id", data.id);
    if (data.completed) {
        clone.classList.add("completed");
        clone.lastChild.innerText = "undone"
    }
    else{
        clone.lastChild.innerText = "done"
    }
    taskContainer.prepend(clone);
}

//get tasks from localStorage
if (tasksList) {
    tasks = tasksList;
    for (let i = 0; i < tasks.length; i++) {
        tasker(tasks[i]);
    }
}

// js selector can't read DOM created after the script is runned
// than we used the e.target to detect the button 
taskContainer.addEventListener("click",(e)=>{
    if (e.target.classList.contains("completeBtn")) {  //toggle complete 
        e.target.parentElement.classList.toggle("completed");
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].id ==  e.target.parentElement.getAttribute("data-id")) {
                if (tasks[i].completed) {
                    tasks[i].completed = false;
                    e.target.innerText = "done"
                }
                else{
                    tasks[i].completed = true;
                    e.target.innerText = "undone"
                }
                setLocalStorage();
                break;
            }
        }
    }
    else if (e.target.classList.contains("deleteBtn")) {
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].id ==  e.target.parentElement.getAttribute("data-id")) {
                tasks.splice(i, 1) // delete the task from the array
                setLocalStorage();
            }
        }
        e.target.parentElement.remove();
    }
})