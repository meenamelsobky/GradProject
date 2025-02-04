const API_BASE_URL = 'https://localhost:44369'; // Replace with your API URL

// Login
document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();
        if (response.ok) {
            localStorage.setItem('jwtToken', data.token); // Store the token
            window.location.href = 'dashboard.html'; // Redirect to dashboard
        } else {
            showMessage(data.message || 'Login failed', 'error');
        }
    } catch (error) {
        showMessage('An error occurred', 'error');
    }
});

// Signup
document.getElementById('signupForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password })
        });

        const data = await response.json();
        if (response.ok) {
            showMessage('Registration successful! Please login.', 'success');
            setTimeout(() => window.location.href = 'login.html', 2000);
        } else {
            showMessage(data.errors?.[0]?.description || 'Registration failed', 'error');
        }
    } catch (error) {
        showMessage('An error occurred', 'error');
    }
});

// Show messages
function showMessage(message, type = 'info') {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = message;
    messageDiv.className = type;
}