document.addEventListener('DOMContentLoaded',()=>{
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if(storedTasks){
        tasks.forEach((task)=>tasks.push(task));
        updateTask();
        updateState();
    }
});
// Create a empty array
let tasks = [];
//Addtask
function addTask(){
    const taskInput = document.getElementById('task-input');
    const text = taskInput.value.trim();
    if(text){
        tasks.push({text:text,completed:false});
        taskInput.value = "";
        updateTask();
        updateState();
    }
    
};
//Toggle Task
function toggleTaskCompleted(index){
    tasks[index].completed =!tasks[index].completed;
    updateTask();
    updateState();
}
//delete task
function deleteTask(index){
    tasks.splice(index,1);
    updateTask();
    updateState();
}
//edit Task
function editTask(index){
    const taskInput = document.getElementById('task-input');
    taskInput.value = tasks[index].text;
    tasks.splice(index,1);
    updateTask();
    updateState();
}
function updateState(){
    const completeTasks = tasks.filter(task=> task.completed).length;
    const totalTasks = tasks.length;
    const progress = (completeTasks/totalTasks)*100;
    const progressBar = document.getElementById('progress');
    progressBar.style.width = `${progress}%`;
    document.getElementById('numbers').innerText = `${completeTasks} / ${totalTasks}`;
}
// Create Update Task Function
function updateTask(){
    const taskList = document.getElementById('taskList');
    taskList.innerHTML="";
    tasks.forEach((task,index)=>{
        const listItem = document.createElement('li');
        listItem.innerHTML = `
        <div class="taskItem">
            <div class="task ${task.completed ? "completed" : ""}">
                <input type="checkbox" class="checkbox" ${task.completed ? "checked" : " "}/>
                <p>${task.text}</p>
            </div>
            <div class="icons">
                <img src="./img/edit.png" alt="edit-icon" onClick='editTask(${index})'>
                <img src="./img/bin.png" alt="Delete-icon" onClick='deleteTask(${index})'>
            </div>
        </div>
        `;
        taskList.addEventListener('change',()=>{toggleTaskCompleted(index)});
        taskList.appendChild(listItem);
    })
}
// Event listen function
document.getElementById('newTask').addEventListener('click',(e)=>{
    e.preventDefault();
    addTask();
});