//Connecting to Socket.io server
const socket = io();

//Login form from frontend 

const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', function (event) {
    event.preventDefault();

   const loginData = {
        email: document.getElementById('email').value.trim(),
        studentId: document.getElementById('studentId').value.trim(),
        password: document.getElementById('password').value
    };

    socket.emit('login', loginData);

});


//Register form from frontend
const registerForm = document.getElementById('registerForm');
registerForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const username = document.getElementById('newUsername').value.trim();
    const email = document.getElementById('newEmail').value.trim();
    const studentId = document.getElementById('newStudentId').value.trim();
    const password = document.getElementById('newPassword').value.trim();

    socket.emit("setup_first_time_profile", {

        username,
        email,
        studentId,
        password

    });

});


//Register response from backend
socket.on('setup_response', function (response){

    alert(response.message);
    if (response.success) {
        window.location.href = '/homepage.html';
    }

});



//login response from backend
socket.on('login_response', function (response) {

    alert(response.message);
    if (response.success) {
        window.location.href = '/homepage.html';
    }

});
