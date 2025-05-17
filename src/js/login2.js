document.addEventListener("DOMContentLoaded", function () {
    const loginTab = document.getElementById("login-tab");
    const registerTab = document.getElementById("register-tab");
    const loginForm = document.getElementById("login-form");
    const registerForm = document.getElementById("register-form");

    // Switch tabs
    loginTab.addEventListener("click", function () {
        loginTab.classList.add("btn-primary", "text-white", "active-tab");
        loginTab.classList.remove("btn-light", "text-dark");
        registerTab.classList.add("btn-light", "text-dark");
        registerTab.classList.remove("btn-primary", "text-white", "active-tab");
        loginForm.classList.remove("d-none");
        registerForm.classList.add("d-none");
        clearErrors();
    });

    registerTab.addEventListener("click", function () {
        registerTab.classList.add("btn-primary", "text-white", "active-tab");
        registerTab.classList.remove("btn-light", "text-dark");
        loginTab.classList.add("btn-light", "text-dark");
        loginTab.classList.remove("btn-primary", "text-white", "active-tab");
        registerForm.classList.remove("d-none");
        loginForm.classList.add("d-none");
        clearErrors();
    });

    // Clear error messages
    function clearErrors() {
        document.querySelectorAll(".error-message").forEach((error) => (error.textContent = ""));
    }

    // Submit login form via AJAX
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();
        clearErrors();

        const formData = new FormData(loginForm);

        fetch(loginForm.action, {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert(data.message);
                window.location.href = 'index.html'; // Redirect after login
            } else {
                data.errors.forEach(error => {
                    if (error.toLowerCase().includes('email')) {
                        document.getElementById('loginEmailError').textContent = error;
                    } else if (error.toLowerCase().includes('password')) {
                        document.getElementById('loginPasswordError').textContent = error;
                    } else {
                        alert(error);
                    }
                });
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred during login');
        });
    });

    // Submit register form via AJAX
    registerForm.addEventListener("submit", function (e) {
        e.preventDefault();
        clearErrors();

        const formData = new FormData(registerForm);

        fetch(registerForm.action, {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert(data.message);
                loginTab.click(); // Switch to login tab
            } else {
                data.errors.forEach(error => {
                    if (error.toLowerCase().includes('first name')) {
                        document.getElementById('regFirstNameError').textContent = error;
                    } else if (error.toLowerCase().includes('last name')) {
                        document.getElementById('regLastNameError').textContent = error;
                    } else if (error.toLowerCase().includes('email')) {
                        document.getElementById('regEmailError').textContent = error;
                    } else if (error.toLowerCase().includes('confirm')) {
                        document.getElementById('regConfirmPasswordError').textContent = error;
                    } else if (error.toLowerCase().includes('password')) {
                        document.getElementById('regPasswordError').textContent = error;
                    } else {
                        alert(error);
                    }
                });
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred during registration');
        });
    });
});