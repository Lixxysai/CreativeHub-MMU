const bcrypt = require('bcrypt');
const User = require("./User.model.js");
// User.model.js to connect the backend with the database

module.exports = (socket, io, UsersList) => {

    socket.on('setup_first_time_profile', async (data) => {
        console.log('Received setup_first_time_profile event from client:', data);      
        const { username, email, studentId, password } = data;      

        if (!username || username.trim() === '') {
            socket.emit('setup_response', { success: false, message: 'name cant be empty' });
            return;
        }

        if (!email || email.trim() === '') {
            socket.emit('setup_response', { success: false, message: 'email cant be empty' });
            return;
        }

        if (!password || password.trim() === '') {
            socket.emit('setup_response', { success: false, message: 'the password cant be empty' });
            return;
        }

        if (!studentId || studentId.trim() === '') {
            socket.emit('setup_response', { success: false, message: 'Student ID cant be empty' });
            return;
        }

        if (password.length < 6 || password.length > 12) {
            socket.emit('setup_response', { success: false, message: 'the password must be between 6-12 characters' });
            return;
        }

         

        try {

            const existingUser = await User.findOne({
            $or: [
                { username },
                { email },
                { studentId }
            ]
        });

        if (existingUser) {
              if (existingUser.username === username) {
                socket.emit('setup_response', { success: false, message: 'username already exists' });
                return;
            }

              if (existingUser.email === email) {
                socket.emit('setup_response', { success: false, message: 'email already registered' });
                return;
            }

                if (existingUser.studentId === studentId) {
                socket.emit('setup_response', { success: false, message: 'Student ID already registered' });
                return;
            }

        }
        
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            const user = new User({

                username,
                email,
                studentId,
                password: hashedPassword

            });

            await user.save();

            UsersList[username] = {
                socketId: socket.id,
                status: "online"
            };

            socket.username = username;
            console.log(`${username} is done the setup of profile and saved to MongoDB`);
            
            socket.emit('setup_response', { success: true, message: 'User registered successfully', username });

        } catch (error) {   
            console.error("saving data to MongoDB error", error);
            socket.emit('setup_response', { success: false, message: 'Registration failed. Please try again.' });
        }
    }); 
};
