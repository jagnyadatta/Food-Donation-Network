// Simulated database for users and requests
const users = {
    'donor1': { username: 'donor1', password: 'password1' },
    'donor2': { username: 'donor2', password: 'password2' }
};

const requests = [];

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('login-form').addEventListener('submit', loginUser);
    document.getElementById('register-form').addEventListener('submit', registerUser);
    document.getElementById('request-form').addEventListener('submit', submitRequest);
});

function showLoginPopup() {
    document.getElementById('login-popup').style.display = 'flex';
}

function showRegisterPopup() {
    document.getElementById('register-popup').style.display = 'flex';
}

function showRequestPopup() {
    document.getElementById('request-popup').style.display = 'flex';
}

function closePopup(popupId) {
    document.getElementById(popupId).style.display = 'none';
}

function loginUser(event) {
    event.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    if (users[username] && users[username].password === password) {
        alert('Login successful!');
        document.getElementById('login-popup').style.display = 'none';
        document.getElementById('dashboard').style.display = 'block';
        document.getElementById('user-name').innerText = username;
        updateRequestsCount();
        loadPendingRequests();
    } else {
        alert('Invalid username or password!');
    }
}

function registerUser(event) {
    event.preventDefault();
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;

    if (users[username]) {
        alert('Username already exists!');
    } else {
        users[username] = { username, password };
        alert('Registration successful!');
        document.getElementById('register-popup').style.display = 'none';
    }
}

function submitRequest(event) {
    event.preventDefault();
    const location = document.getElementById('request-location').value;
    requests.push({ location });
    alert('Request submitted successfully!');
    document.getElementById('request-popup').style.display = 'none';
    updateRequestsCount();
}

function updateRequestsCount() {
    document.getElementById('requests-count').innerText = `Total Requests: ${requests.length}`;
}

function loadPendingRequests() {
    const pendingRequestsDiv = document.getElementById('pending-requests');
    pendingRequestsDiv.innerHTML = '';
    requests.forEach((request, index) => {
        const requestDiv = document.createElement('div');
        requestDiv.innerHTML = `Request ${index + 1}: ${request.location}`;
        pendingRequestsDiv.appendChild(requestDiv);
    });
}

function showSection(sectionId) {
    document.querySelectorAll('.dashboard-section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
}

function logout() {
    document.getElementById('dashboard').style.display = 'none';
    alert('Logged out successfully!');
}

function cancelForm() {
    document.getElementById('donation-form').reset();
    showSection('dashboard-home');
}
