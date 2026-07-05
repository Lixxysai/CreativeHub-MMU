//Connecting to Socket.io server
const socket = io();

//Login form from frontend 

const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value.trim();
    const studentId = document.getElementById('studentId').value.trim();
    const password = document.getElementById('password').value();

    socket.emit('login', {
        email,
        studentId,
        password
    });

});


//Register form from frontend
const registerForm = document.getElementById('registerForm');
registerForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const studentId = document.getElementById('studentId').value.trim();
    const password = document.getElementById('password').value();

    socket.emit("setup_first_time_profile", {

        username,
        email,
        studentId,
        password

    });

});


//Register response from backend
socket.on('setup.response', function (response){

    alert(response.message);
    if (response.success) {
        window.location.href = '/homepage.html';
    }

});



//login response from backend
socket.on('login.response', function (response) {

    alert(response.message);
    if (response.success) {
        window.location.href = '/homepage.html';
    }

});
