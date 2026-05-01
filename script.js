const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";

    li.innerHTML = `
      <span>${task.text}</span>
      <div class="actions">
        <button class="complete">✔</button>
        <button class="delete">🗑</button>
      </div>
    `;

    li.querySelector(".complete").addEventListener("click", () => {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
      renderTasks();
    });

    li.querySelector(".delete").addEventListener("click", () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });

    taskList.appendChild(li);
  });
}

addBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();
  if (text === "") return;
  tasks.push({ text, completed: false });
  taskInput.value = "";
  saveTasks();
  renderTasks();
});

taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addBtn.click(); // ✅ Fixed
  }
});

renderTasks();
