document.getElementById('signup-link').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('login-page').style.display = 'none';
    document.getElementById('signup-page').style.display = 'block';
});

document.getElementById('login-link').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('signup-page').style.display = 'none';
    document.getElementById('login-page').style.display = 'block';
});

document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    // Simple validation
    if (username && password) {
        document.getElementById('login-page').style.display = 'none';
        document.getElementById('main-page').style.display = 'block';
    } else {
        alert('Please enter both username and password.');
    }
});

document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;

    // Simple validation
    if (username && password) {
        alert('Sign up successful! Please login.');
        document.getElementById('signup-page').style.display = 'none';
        document.getElementById('login-page').style.display = 'block';
    } else {
        alert('Please enter both username and password.');
    }
});