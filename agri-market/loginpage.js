// script.js

// Dummy credentials for demonstration purposes
const validUsername = 'farmer123';
const validPassword = 'password123';

// Function to validate the login
function validateLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');

    if (username === validUsername && password === validPassword) {
        // If credentials are correct, redirect to the dashboard
        window.location.href = 'agri-market.html';
    } else {
        // If credentials are incorrect, show an error message
        errorMessage.textContent = 'Invalid username or password. Please try again.';
    }

    // Prevent form submission (as this is just a demonstration)
    return false;
}
