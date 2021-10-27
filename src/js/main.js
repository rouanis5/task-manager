let addTask = document.getElementById("addTask");
let inputTask = document.getElementById("inputTask");
let taskContainer = document.querySelector(".tasks .container");
let tasks = [];
//initalizing local storage
//the localStorage dont support arrays
//for that I used JSON.parse and JSON stringify
let tasksList = JSON.parse(localStorage.getItem("tasksList"));
function setLocalStorage(){
    localStorage.setItem("tasksList", JSON.stringify(tasks));
    window.location.reload();
}
addTask.addEventListener("click",(e) =>{
    let msg = "Please fill the chunck !";
    if (inputTask.value !== "" && inputTask.value !== msg){
        tasks.push(inputTask.value);
        tasker(inputTask.value);
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
//create a task template
let task = document.createElement("div");
task.classList.add("task");
let p = document.createElement("p"); //first child
let btn = document.createElement("button"); //last child
btn.setAttribute("type","submit");
btn.innerText = "Delete";
task.appendChild(p);
task.appendChild(btn);

function tasker(input){
    let clone = task.cloneNode(true);
    clone.firstChild.innerText = input;
    taskContainer.prepend(clone);
}

//get tasks from localStorage
if (tasksList) {
    tasks = tasksList;
    for (let i = 0; i < tasks.length; i++) {
        tasker(tasks[i]);
    }
}

let btns = document.querySelectorAll(".tasks .task button");
for (let i = 0; i < btns.length; i++) {
    btns[i].onclick = ()=>{
        btns[i].parentNode.remove();
        let num = tasks.length - i - 1 ;
        tasks.splice(num, 1);
        setLocalStorage();
    }
}