// Authentication Management
const ADMIN_EMAIL = "admin@gmail.com";
const ADMIN_PASSWORD = "12345";

function showLoginModal() {
    const authModal = document.getElementById('authModal');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    
    authModal.style.display = 'block';
    loginForm.style.display = 'block';
    signupForm.style.display = 'none';
}

function showSignup() {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    
    loginForm.style.display = 'none';
    signupForm.style.display = 'block';
}

function showLogin() {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    
    loginForm.style.display = 'block';
    signupForm.style.display = 'none';
}

function login() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        localStorage.setItem('userType', 'admin');
        window.location.href = 'dashboard.html';
    } else {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            localStorage.setItem('userType', 'user');
            window.location.href = 'index.html';
        } else {
            alert('Invalid credentials');
        }
    }
}

function signup() {
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const existingUser = users.find(u => u.email === email);

    if (existingUser) {
        alert('User already exists');
        return;
    }

    const newUser = { name, email, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    alert('Signup successful! Please login.');
    showLogin();
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    const loginLink = document.getElementById('loginLink');
    const cartLink = document.getElementById('cartLink');
    const closeModal = document.querySelector('.close');

    loginLink.addEventListener('click', showLoginModal);
    
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            document.getElementById('authModal').style.display = 'none';
        });
    }

    cartLink.addEventListener('click', () => {
        const userType = localStorage.getItem('userType');
        if (userType) {
            window.location.href = 'cart.html';
        } else {
            showLoginModal();
        }
    });
});