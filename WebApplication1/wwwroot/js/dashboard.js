// Check if the user is logged in
document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
        window.location.href = 'login.html'; // Redirect if no token
    } else {
        fetchUserData();
    }
});

// Fetch protected data from the API
async function fetchUserData() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/users/me`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
            }
        });

        if (response.ok) {
            const user = await response.json();
            document.getElementById('userData').textContent = `Hello, ${user.username}!`;
        } else {
            localStorage.removeItem('jwtToken');
            window.location.href = 'login.html';
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
}

// Logout
function logout() {
    localStorage.removeItem('jwtToken');
    window.location.href = 'login.html';
}