document.addEventListener("DOMContentLoaded", function() {
    const greetingContainer = document.getElementById("greeting-container");
    const greeting = document.getElementById("greeting");
    const taskCount = document.getElementById("task-count");
    const addTaskBtn = document.getElementById("add-task-btn");
    const completedTasksBtn = document.getElementById("completed-tasks-btn");
    const taskList = document.getElementById("task-list");
    const completedTasksList = document.getElementById("completed-tasks-list");
    const taskModal = document.getElementById("task-modal");
    const saveTaskBtn = document.getElementById("save-task-btn");

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let completedTasks = JSON.parse(localStorage.getItem("completedTasks")) || [];

    function openModal(modalId) {
        document.getElementById(modalId).style.display = "block";
    }

    function closeModal(modalId) {
        document.getElementById(modalId).style.display = "none";
    }

    document.querySelectorAll(".close").forEach(button => {
        button.addEventListener("click", function() {
            const modalId = this.getAttribute("data-close");
            closeModal(modalId);
        });
    });

    addTaskBtn.addEventListener("click", () => openModal("task-modal"));
    completedTasksBtn.addEventListener("click", showCompletedTasks);
    saveTaskBtn.addEventListener("click", addTask);

    function updateGreeting() {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            greetingContainer.classList.remove("hidden");
            greeting.innerHTML = `Hey, ${user.name}! Ready to plan the day?`;
            taskCount.innerHTML = `You have ${tasks.length} planned task(s).`;
        } else {
            greetingContainer.classList.add("hidden");
        }
    }

    function addTask() {
        const name = document.getElementById("task-name").value;
        const time = document.getElementById("task-time").value;
        const schedule = document.getElementById("task-schedule").value;
        const error = document.getElementById("task-error");

        if (!name || !time || !schedule) {
            error.textContent = "All fields are required.";
            return;
        }

        const task = { id: Date.now(), name, time, schedule };
        tasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(tasks));

        closeModal("task-modal");
        renderTasks();
    }

    function renderTasks() {
        taskList.innerHTML = "";
        tasks.forEach(task => {
            const taskDiv = document.createElement("div");
            taskDiv.className = "task";
            taskDiv.innerHTML = `
                <span>${task.name} - ${task.time} mins at ${task.schedule}</span>
                <div class="icons">
                    <i class="complete-icon" onclick="completeTask(${task.id})">&#10004;</i>
                    <i class="delete-icon" onclick="deleteTask(${task.id})">&#128465;</i>
                </div>
            `;
            taskList.appendChild(taskDiv);
        });
        updateGreeting();
    }

    function completeTask(id) {
        const task = tasks.find(t => t.id === id);
        completedTasks.push(task);
        tasks = tasks.filter(t => t.id !== id);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
        renderTasks();
    }

    function showCompletedTasks() {
        completedTasksList.innerHTML = completedTasks.map(t => `<li>${t.name} - ${t.time} mins</li>`).join("");
        openModal("completed-tasks-modal");
    }

    function deleteTask(id) {
        tasks = tasks.filter(t => t.id !== id);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        renderTasks();
    }

    renderTasks();
});
