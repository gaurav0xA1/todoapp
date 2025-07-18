const form = document.querySelector("form");
const taskInput = document.getElementById("textbox");
const outputTasks = document.getElementById("outputtasks");

// Load tasks from localStorage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  outputTasks.innerHTML = ""; // Clear before reloading
  tasks.forEach((taskText, index) => {
    addTaskToDOM(taskText, index);
  });
}

// Save tasks to localStorage
function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Add task to DOM with delete/edit buttons
function addTaskToDOM(text, index) {
  const taskEl = document.createElement("p");
  const taskText = document.createElement("span");
  taskText.textContent = text;

  // Delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", () => {
    outputTasks.removeChild(taskEl);
    removeTask(index);
  });

  // Edit button
  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.addEventListener("click", () => editTask(index));

  taskEl.appendChild(taskText);
  taskEl.appendChild(deleteBtn);
  taskEl.appendChild(editBtn);
  outputTasks.appendChild(taskEl);
}

// Edit task by index
function editTask(index) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const newText = prompt("Edit task:", tasks[index]);
  if (newText !== null) {
    tasks[index] = newText.trim();
    saveTasks(tasks);
    loadTasks(); // Refresh the list
  }
}

// Remove task by index
function removeTask(index) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.splice(index, 1); // Remove task at index
  saveTasks(tasks);
}

// Form submit handler
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = taskInput.value.trim();
  if (text === "") return;

  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(text);
  saveTasks(tasks);
  addTaskToDOM(text, tasks.length - 1);
  taskInput.value = "";
});

// Initialize
loadTasks();