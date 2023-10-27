document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("taskInput");
    const addTaskButton = document.getElementById("addTaskButton");
    const taskList = document.getElementById("taskList");

    // Load tasks from local storage on page load
    loadTasks();

    addTaskButton.addEventListener("click", function () {
        const taskText = taskInput.value.trim();

        if (taskText === "") {
            alert("Task cannot be empty.");
            return;
        }

        // Create a new task element
        const li = document.createElement("li");
        li.innerHTML = `${taskText} <button class="delete">Delete</button>`;
        taskList.appendChild(li);

        // Save the task to local storage
        saveTask(taskText);

        // Clear the input field
        taskInput.value = "";

        // Add event listener to the delete button
        li.querySelector(".delete").addEventListener("click", function () {
            taskList.removeChild(li);
            // Remove the task from local storage
            removeTask(taskText);
        });
    });

    function saveTask(task) {
        let tasks = getTasks();
        tasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function removeTask(task) {
        let tasks = getTasks();
        tasks = tasks.filter(t => t !== task);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function loadTasks() {
        let tasks = getTasks();
        tasks.forEach(task => {
            const li = document.createElement("li");
            li.innerHTML = `${task} <button class="delete">Delete</button>`;
            taskList.appendChild(li);
            li.querySelector(".delete").addEventListener("click", function () {
                taskList.removeChild(li);
                removeTask(task);
            });
        });
    }

    function getTasks() {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        return tasks;
    }
});
