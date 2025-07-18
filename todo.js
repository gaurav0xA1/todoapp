const form = document.querySelector("form");
const taskInput = document.getElementById("textbox");
const outputTasks = document.getElementById("outputtasks");

// Load tasks from localStorage and display
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(taskText => {
    addTaskToDOM(taskText);
  });
}

// Save tasks array to localStorage
function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Add a task element with delete button
function addTaskToDOM(text) {
  const taskEl = document.createElement("p");
  
  // Create a span to hold the task text
  const taskText = document.createElement("span");
  taskText.textContent = text;
  
  // Create delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.style.marginLeft = "10px";
  deleteBtn.addEventListener("click", function() {
    // Remove task from DOM
    outputTasks.removeChild(taskEl);

    // Remove task from localStorage
    removeTask(text);
  });

  taskEl.appendChild(taskText);
  taskEl.appendChild(deleteBtn);
  outputTasks.appendChild(taskEl);
}

// Remove task from localStorage array and save updated array
function removeTask(textToRemove) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter(task => task !== textToRemove);
  saveTasks(tasks);
}

form.addEventListener("submit", function(event) {
  event.preventDefault();

  const text = taskInput.value.trim();
  if (text === "") return;

  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(text);
  saveTasks(tasks);
  addTaskToDOM(text);

  taskInput.value = "";
});

loadTasks();
