const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

addTaskBtn.addEventListener("click", addTask);

function addTask() {
  const taskText = taskInput.value;

  if (taskText === "") {
    alert("Por favor escribe una tarea");
    return;
  }

  const li = document.createElement("li");
  li.textContent = taskText;
  li.addEventListener("click", function () {
  li.style.textDecoration = "line-through";
});

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "X";

  deleteBtn.addEventListener("click", function () {
    li.remove();
  });

  li.appendChild(deleteBtn);
  taskList.appendChild(li);

  taskInput.value = "";
}