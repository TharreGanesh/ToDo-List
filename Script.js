document.getElementById("addTaskButton").addEventListener("click", function() {
    const taskText = document.getElementById("taskInput").value;
    const priority = document.getElementById("prioritySelect").value;
    if (taskText !== "") {
        addTaskToList(taskText, priority);
        saveTasks();
    } else {
        alert("Please enter a task!");
    }
});

function addTaskToList(taskText, priority) {
    const taskElement = document.createElement("div");
    taskElement.classList.add("task");
    taskElement.classList.add(priority);
    taskElement.innerText = taskText;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.addEventListener("click", function() {
        toggleTaskCompletion(taskElement);
        saveTasks();
    });

    const editButton = document.createElement("button");
    editButton.innerText = "Edit";
    editButton.addEventListener("click", function() {
        editTask(taskElement);
    });

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.addEventListener("click", function() {
        deleteTask(taskElement);
        saveTasks();
    });

    taskElement.appendChild(checkbox);
    taskElement.appendChild(editButton);
    taskElement.appendChild(deleteButton);

    document.getElementById("taskList").appendChild(taskElement);
}

function toggleTaskCompletion(taskElement) {
    taskElement.classList.toggle("completed");
}

function deleteTask(taskElement) {
    taskElement.remove();
}

function editTask(taskElement) {
    const newTaskText = prompt("Edit your task:", taskElement.innerText);
    if (newTaskText !== null) {
        taskElement.innerText = newTaskText;
    }
}

function filterTasks(filter) {
    const allTasks = document.querySelectorAll(".task");
    allTasks.forEach(task => {
        if (filter === "all") {
            task.style.display = "block";
        } else if (filter === "completed" && task.classList.contains("completed")) {
            task.style.display = "block";
        } else if (filter === "incomplete" && !task.classList.contains("completed")) {
            task.style.display = "block";
        } else {
            task.style.display = "none";
        }
    });
}

function saveTasks() {
    const tasks = document.querySelectorAll(".task");
    const tasksArray = [];
    tasks.forEach(task => {
        tasksArray.push({ text: task.innerText, completed: task.classList.contains("completed") });
    });
    localStorage.setItem("tasks", JSON.stringify(tasksArray));
}

function loadTasks() {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
        const tasksArray = JSON.parse(storedTasks);
        tasksArray.forEach(taskData => {
            addTaskToList(taskData.text, taskData.completed ? "completed" : "incomplete");
        });
    }
}

document.getElementById("themeToggle").addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");
});

loadTasks();
