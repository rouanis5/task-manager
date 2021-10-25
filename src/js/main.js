let addTask = document.getElementById("addTask");
let inputTask = document.getElementById("inputTask");
let taskContainer = document.querySelector(".tasks .container");
let tasks = [];
addTask.onclick = () =>{
    if (inputTask.value !== ""){
        tasks.push(inputTask.value);
        tasker(inputTask.value)
        // inputTask.value = "";
    }
}
function tasker(input){
    let task = document.createElement("div");
    task.classList.add("task");
    let p = document.createElement("p");
    p.innerText = input;
    let btn = document.createElement("button");
    btn.setAttribute("type","submit");
    btn.classList.add("btn");
    btn.innerText = "Delete"
    task.appendChild(p);
    task.appendChild(btn);
    taskContainer.appendChild(task);
}