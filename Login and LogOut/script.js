document.addEventListener("DOMContentLoaded", function() {
    const loginBtn = document.getElementById("login-btn");
    const profileBtn = document.getElementById("profile-btn");
    const greeting = document.getElementById("greeting");
    const taskSection = document.getElementById("task-section");
    const taskTitle = document.getElementById("task-title");
    const taskCount = document.getElementById("task-count");
    const taskList = document.getElementById("task-list");

    function openModal(modal) {
        document.getElementById(modal).style.display = "flex";
    }

    function closeModal(modal) {
        document.getElementById(modal).style.display = "none";
    }

    loginBtn.addEventListener("click", () => openModal("login-modal"));
    profileBtn.addEventListener("click", () => openModal("profile-modal"));
    document.getElementById("add-task-btn").addEventListener("click", () => openModal("task-modal"));

    function validateLogin() {
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const error = document.getElementById("login-error");

        if (!email.includes("@") || !email.includes(".")) {
            error.textContent = "Provide a valid email";
            return;
        }
        if (password.length < 5) {
            error.textContent = "Password should be at least 5 characters";
            return;
        }

        localStorage.setItem("user", JSON.stringify({ name, email }));
        updateUI(name);
        closeModal("login-modal");
    }

    function updateUI(name) {
        greeting.textContent = `Hey, ${name}`;
        loginBtn.classList.add("hidden");
        profileBtn.classList.remove("hidden");
        taskSection.classList.remove("hidden");
        updateTaskTitle();
    }

    function updateProfile() {
        const name = document.getElementById("profile-name").value;
        const email = document.getElementById("profile-email").value;
        let user = JSON.parse(localStorage.getItem("user"));

        if (name) user.name = name;
        if (email) user.email = email;

        localStorage.setItem("user", JSON.stringify(user));
        updateUI(user.name);
        closeModal("profile-modal");
    }

    function logout() {
        localStorage.removeItem("user");
        greeting.textContent = "";
        loginBtn.classList.remove("hidden");
        profileBtn.classList.add("hidden");
        taskSection.classList.add("hidden");
    }

    function updateTaskTitle() {
        const user = JSON.parse(localStorage.getItem("user"));
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        taskTitle.textContent = `Hey ${user.name}, ready to plan the day?`;
        taskCount.textContent = `You have ${tasks.length} planned tasks`;
    }

    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) updateUI(storedUser.name);

    window.validateLogin = validateLogin;
    window.updateProfile = updateProfile;
    window.logout = logout;
    window.closeModal = closeModal;
});
