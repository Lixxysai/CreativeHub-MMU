    const bcrypt = require('bcrypt');
    const User = require("./User.model.js");
    // User.model.js to connect the backend with the database

    module.exports = (socket, io, UsersList) => {
        socket.on('login', async (data) => {
            console.log('Received login event from client:', data);
            const { email, studentId, password } = data;

            if (!email || email.trim() === '') {
                socket.emit('login_response', { success: false, message: 'email cant be empty' });
                return;
            }

            if (!password || password.trim() === '') {
                socket.emit('login_response', { success: false, message: 'the password cant be empty' });
                return;
            }

            if (!studentId || studentId.trim() === '') {
                socket.emit('login_response', { success: false, message: 'Student ID cant be empty' });
                return;
            }

            try {
                const user = await User.findOne({ email, studentId });

                if (!user) {
                    socket.emit('login_response', { success: false, message: 'User not found in the system' });
                    return;
                }

                const PasswordMatching = await bcrypt.compare(password, user.password);

                if (!PasswordMatching) {
                    socket.emit('login_response', { success: false, message: 'Invalid password' });
                    return;
                }

                UsersList[user.username] = {
                    socketId: socket.id,
                    status: 'online',
                };

                socket.username = user.username;
                console.log('User logged in:', user.username);

                socket.emit('login_response', { success: true, message: 'Login access successful',
                username: user.username,
                email: user.email,
                studentId: user.studentId
           });
            } catch (error) {
                socket.emit('login_response', { success: false, message: 'An error occurred during login' });
                console.error('Error during login:', error);
            }
        });
    };
