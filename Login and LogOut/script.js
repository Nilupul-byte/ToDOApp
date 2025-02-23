document.addEventListener("DOMContentLoaded", function() {
    const loginBtn = document.getElementById("login-btn");
    const profileBtn = document.getElementById("profile-btn");
    const greeting = document.getElementById("greeting");

    function openModal(modal) {
        document.getElementById(modal).style.display = "flex";
    }

    function closeModal(modal) {
        document.getElementById(modal).style.display = "none";
    }

    loginBtn.addEventListener("click", () => openModal("login-modal"));
    profileBtn.addEventListener("click", () => openModal("profile-modal"));

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
            error.textContent = "Password should consist of at least 5 characters";
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
    }

    function updateProfile() {
        const name = document.getElementById("profile-name").value;
        const email = document.getElementById("profile-email").value;
        const error = document.getElementById("profile-error");

        if (email && (!email.includes("@") || !email.includes("."))) {
            error.textContent = "Provide a valid email";
            return;
        }

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
    }

    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) updateUI(storedUser.name);

    window.validateLogin = validateLogin;
    window.updateProfile = updateProfile;
    window.logout = logout;
    window.closeModal = closeModal;
});