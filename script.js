// Select elements
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// Load tasks from local storage on page load
document.addEventListener("DOMContentLoaded", loadTasks);

// Add Task
addTaskBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addTask();
});

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === "") return;

    createTaskElement(taskText);
    saveTaskToLocalStorage(taskText);
    taskInput.value = "";
}

// Create Task Element
function createTaskElement(taskText) {
    const li = document.createElement("li");
    li.innerHTML = `
        <span>${taskText}</span>
        <button class="delete-btn">X</button>
    `;

    li.querySelector(".delete-btn").addEventListener("click", () => {
        li.remove();
        updateLocalStorage();
    });

    taskList.appendChild(li);
}

// Save to Local Storage
function saveTaskToLocalStorage(taskText) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load from Local Storage
function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(createTaskElement);
}

// Update Local Storage after deletion
function updateLocalStorage() {
    const tasks = [...taskList.querySelectorAll("li span")].map(task => task.textContent);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
