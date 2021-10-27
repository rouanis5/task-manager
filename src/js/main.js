let addTask = document.getElementById("addTask");
let inputTask = document.getElementById("inputTask");
let taskContainer = document.querySelector(".tasks .container");
let tasks = [];
addTask.addEventListener("click",(e) =>{
    let msg = "Please fill the chunck !S";
    if (inputTask.value !== "" && inputTask.value !== msg){
        tasks.push(inputTask.value);
        tasker(inputTask.value)
        inputTask.value = "";
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
let btns;
function tasker(input){
    let task = document.createElement("div");
    task.classList.add("task");
    let p = document.createElement("p");
    p.innerText = input;
    let btn = document.createElement("button");
    btn.setAttribute("type","submit");
    btn.classList.add("btn");
    btn.innerText = "Delete";
    task.appendChild(p);
    task.appendChild(btn);
    taskContainer.prepend(task);
}